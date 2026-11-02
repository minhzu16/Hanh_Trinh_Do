#!/usr/bin/env node
// Kiểm tra dữ liệu game 3 tầng. Không cần cài gói nào (Node >= 20).
//
//   node scripts/validate-data.mjs                  kiểm tra data/
//   node scripts/validate-data.mjs --data <thư mục>  kiểm tra thư mục khác (phải có schema/ bên trong)
//   node scripts/validate-data.mjs --strict          file rỗng cũng tính là lỗi (dùng ở cổng P4 trở đi)
//
// Tầng 1: cấu trúc theo data/schema/*.schema.json
// Tầng 2: tham chiếu chéo (mã cảnh, nhân vật, nguồn, tư liệu)
// Tầng 3: ràng buộc thiết kế (luật lựa chọn, nhân vật lịch sử chỉ nói câu trích, thời lượng)
// Luật: docs/03-story-spec.md

import { readFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const dataDir = resolve(args.includes("--data") ? args[args.indexOf("--data") + 1] : join(here, "..", "data"));
const strict = args.includes("--strict");

const FILES = ["chapters", "scenes", "characters", "sources", "collectibles", "quiz", "strings"];
const errors = [];
const warnings = [];
const err = (file, path, msg) => errors.push(`${file}${path ? " " + path : ""}: ${msg}`);
const warn = (file, path, msg) => warnings.push(`${file}${path ? " " + path : ""}: ${msg}`);

// ---------- Tầng 1: bộ kiểm tra JSON Schema rút gọn ----------
// Hỗ trợ: type, const, enum, pattern, minLength, minimum, minItems, maxItems, required,
// properties, additionalProperties, items, $ref (#/$defs/...), oneOf + discriminator "type".

function typeOf(v) {
	if (v === null) return "null";
	if (Array.isArray(v)) return "array";
	return typeof v;
}

function check(file, schema, root, value, path, out) {
	if (schema.$ref) {
		const name = schema.$ref.replace("#/$defs/", "");
		return check(file, root.$defs[name], root, value, path, out);
	}
	if (schema.oneOf) {
		if (schema.discriminator && typeOf(value) === "object") {
			const branch = schema.oneOf
				.map((s) => (s.$ref ? root.$defs[s.$ref.replace("#/$defs/", "")] : s))
				.find((s) => s.properties?.[schema.discriminator]?.const === value[schema.discriminator]);
			if (!branch) return out.push([path, `loại nút không hợp lệ: "${value[schema.discriminator]}"`]);
			return check(file, branch, root, value, path, out);
		}
		const ok = schema.oneOf.some((s) => {
			const tmp = [];
			check(file, s, root, value, path, tmp);
			return tmp.length === 0;
		});
		if (!ok) out.push([path, "không khớp dạng nào cho phép"]);
		return;
	}
	if (schema.const !== undefined && value !== schema.const) return out.push([path, `phải là "${schema.const}"`]);
	if (schema.enum && !schema.enum.includes(value)) return out.push([path, `phải là một trong ${schema.enum.join(", ")}`]);
	if (schema.type) {
		const t = typeOf(value);
		const want = schema.type === "number" ? ["number"] : [schema.type];
		if (!want.includes(t)) return out.push([path, `phải là ${schema.type}, đang là ${t}`]);
	}
	if (typeof value === "string") {
		if (schema.minLength && value.length < schema.minLength) out.push([path, "không được rỗng"]);
		if (schema.pattern && !new RegExp(schema.pattern).test(value)) out.push([path, `"${value}" sai định dạng mã (${schema.pattern})`]);
		if (value === "TODO") out.push([path, "còn TODO"]);
	}
	if (typeof value === "number" && schema.minimum !== undefined && value < schema.minimum) out.push([path, `phải >= ${schema.minimum}`]);
	if (Array.isArray(value)) {
		if (schema.minItems && value.length < schema.minItems) out.push([path, `phải có ít nhất ${schema.minItems} phần tử`]);
		if (schema.maxItems && value.length > schema.maxItems) out.push([path, `chỉ được tối đa ${schema.maxItems} phần tử`]);
		if (schema.items) value.forEach((v, i) => check(file, schema.items, root, v, `${path}[${i}]`, out));
	}
	if (typeOf(value) === "object") {
		for (const k of schema.required ?? []) if (!(k in value)) out.push([path, `thiếu trường bắt buộc "${k}"`]);
		for (const [k, v] of Object.entries(value)) {
			if (schema.properties?.[k]) check(file, schema.properties[k], root, v, `${path}.${k}`, out);
			else if (schema.additionalProperties === false) out.push([path, `trường lạ "${k}"`]);
			else if (typeof schema.additionalProperties === "object") check(file, schema.additionalProperties, root, v, `${path}.${k}`, out);
		}
	}
}

const data = {};
const pending = new Set();
console.log(`Thư mục dữ liệu: ${dataDir}\n`);
console.log("Tầng 1 — cấu trúc");
let green = 0;
for (const name of FILES) {
	const f = join(dataDir, `${name}.json`);
	const s = join(dataDir, "schema", `${name}.schema.json`);
	if (!existsSync(f) || !existsSync(s)) {
		err(`${name}.json`, "", "thiếu file dữ liệu hoặc schema");
		console.log(`  ✗ ${name}.json — thiếu file`);
		continue;
	}
	let value;
	try {
		value = JSON.parse(readFileSync(f, "utf8"));
	} catch (e) {
		err(`${name}.json`, "", `JSON hỏng: ${e.message}`);
		console.log(`  ✗ ${name}.json — JSON hỏng`);
		continue;
	}
	data[name] = value;
	const empty = Array.isArray(value) ? value.length === 0 : Object.keys(value).length === 0;
	if (empty && !strict) {
		pending.add(name);
		console.log(`  … ${name}.json — chưa có nội dung (bỏ qua; dùng --strict để tính là lỗi)`);
		continue;
	}
	const schema = JSON.parse(readFileSync(s, "utf8"));
	const out = [];
	check(`${name}.json`, schema, schema, value, "", out);
	for (const [p, m] of out) err(`${name}.json`, p, m);
	if (out.length === 0) green++;
	const count = Array.isArray(value) ? `${value.length} phần tử` : `${Object.keys(value).length} khoá`;
	console.log(`  ${out.length ? "✗" : "✓"} ${name}.json (${count})${out.length ? ` — ${out.length} lỗi` : ""}`);
}
console.log(`  Tầng 1: ${green}/${FILES.length} file xanh, ${pending.size} file chờ nội dung.\n`);

// ---------- Tầng 2: tham chiếu chéo ----------
console.log("Tầng 2 — tham chiếu chéo");
const has = (n) => Array.isArray(data[n]) && data[n].length > 0;
const ids = (n) => new Set((Array.isArray(data[n]) ? data[n] : []).map((x) => x.id));
const t2start = errors.length;

for (const n of ["chapters", "scenes", "characters", "sources", "collectibles", "quiz"]) {
	if (!has(n)) continue;
	const seen = new Set();
	for (const x of data[n]) {
		if (seen.has(x.id)) err(`${n}.json`, x.id, "mã bị trùng");
		seen.add(x.id);
	}
}

const sourceIds = ids("sources");
const charById = new Map((data.characters ?? []).map?.((c) => [c.id, c]) ?? []);
const sourceById = new Map((data.sources ?? []).map?.((s) => [s.id, s]) ?? []);
const collectibleIds = ids("collectibles");
const usedSources = new Set();
const unlocked = new Set();

function walk(nodes, fn, path) {
	nodes.forEach((n, i) => {
		const p = `${path}[${i}]`;
		fn(n, p);
		if (n.type === "choice") n.options?.forEach((o, j) => walk(o.nodes ?? [], fn, `${p}.options[${j}].nodes`));
	});
}

if (has("scenes")) {
	const chapterIds = ids("chapters");
	const sceneIds = ids("scenes");
	for (const sc of data.scenes) {
		if (has("chapters") && !chapterIds.has(sc.chapter)) err("scenes.json", sc.id, `kỳ "${sc.chapter}" không có trong chapters.json`);
		if (has("chapters")) {
			const owner = data.chapters.find((c) => c.scenes.includes(sc.id));
			if (!owner) err("scenes.json", sc.id, "cảnh không nằm trong thứ tự cảnh của kỳ nào");
			else if (owner.id !== sc.chapter) err("scenes.json", sc.id, `ghi kỳ ${sc.chapter} nhưng nằm trong ${owner.id}`);
		}
		walk(sc.nodes ?? [], (n, p) => {
			const at = `${sc.id}${p}`;
			if (n.type === "line") {
				if (has("characters") && !charById.has(n.speaker)) err("scenes.json", at, `nhân vật "${n.speaker}" không có trong characters.json`);
				if (n.source) usedSources.add(n.source);
				if (n.source && has("sources") && !sourceIds.has(n.source)) err("scenes.json", at, `nguồn "${n.source}" không có trong sources.json`);
			}
			if (n.type === "knowledge" || n.type === "narration")
				for (const s of n.sources ?? []) {
					usedSources.add(s);
					if (has("sources") && !sourceIds.has(s)) err("scenes.json", at, `nguồn "${s}" không có trong sources.json`);
				}
			if (n.type === "cards")
				for (const c of n.items ?? []) {
					usedSources.add(c.source);
					if (has("sources") && !sourceIds.has(c.source)) err("scenes.json", at, `nguồn "${c.source}" không có trong sources.json`);
				}
			if (n.type === "unlock") {
				unlocked.add(n.item);
				if (has("collectibles") && !collectibleIds.has(n.item)) err("scenes.json", at, `tư liệu "${n.item}" không có trong collectibles.json`);
			}
		}, ".nodes");
	}
	if (has("chapters"))
		for (const c of data.chapters)
			for (const s of c.scenes) if (!sceneIds.has(s)) err("chapters.json", c.id, `cảnh "${s}" không có trong scenes.json`);
}
if (has("quiz"))
	for (const q of data.quiz) {
		usedSources.add(q.source);
		if (has("sources") && !sourceIds.has(q.source)) err("quiz.json", q.id, `nguồn "${q.source}" không có trong sources.json`);
	}
if (has("collectibles"))
	for (const c of data.collectibles) {
		if (c.source && has("sources") && !sourceIds.has(c.source)) err("collectibles.json", c.id, `nguồn "${c.source}" không có`);
		if (has("scenes") && !unlocked.has(c.id)) warn("collectibles.json", c.id, "chưa có cảnh nào mở khoá tư liệu này");
	}
if (has("sources") && has("scenes") && has("quiz"))
	for (const s of data.sources) if (!usedSources.has(s.id)) warn("sources.json", s.id, "nguồn chưa được dùng ở đâu");

const t2 = errors.length - t2start;
console.log(`  ${t2 ? "✗" : "✓"} ${t2} lỗi tham chiếu\n`);

// ---------- Tầng 3: ràng buộc thiết kế ----------
console.log("Tầng 3 — ràng buộc thiết kế");
const t3start = errors.length;
const choiceIds = new Set();
const WPM = 180; // tốc độ đọc tiếng Việt ước tính, từ/phút
const words = (s) => (s ? s.trim().split(/\s+/).length : 0);
const perChapterSec = new Map();

if (has("scenes")) {
	for (const sc of data.scenes) {
		let sec = 0;
		const top = sc.nodes ?? [];
		top.forEach((n, i) => {
			const at = `${sc.id}.nodes[${i}]`;
			if (n.type === "retry") err("scenes.json", at, "retry chỉ được nằm ở cuối phương án sai");
			if (n.type !== "choice") return;
			if (choiceIds.has(n.id)) err("scenes.json", at, `mã lựa chọn "${n.id}" bị trùng`);
			choiceIds.add(n.id);
			const opts = n.options ?? [];
			const keys = opts.map((o) => o.key).join("");
			if (keys !== "ABC") err("scenes.json", at, `phương án phải là A, B, C theo thứ tự (đang là "${keys}")`);
			const correct = opts.filter((o) => o.correct);
			if (correct.length !== 1) err("scenes.json", at, `phải có đúng 1 phương án đúng (đang có ${correct.length})`);
			for (const o of opts) {
				const on = o.nodes ?? [];
				const oat = `${at}.${o.key}`;
				if (!on.some((x) => x.type === "knowledge")) err("scenes.json", oat, "phương án phải có ít nhất một hộp kiến thức");
				if (on.some((x) => x.type === "choice")) err("scenes.json", oat, "không được lồng lựa chọn trong lựa chọn");
				const retries = on.filter((x) => x.type === "retry").length;
				if (o.correct && retries) err("scenes.json", oat, "phương án đúng không được có retry");
				if (!o.correct && on[on.length - 1]?.type !== "retry") err("scenes.json", oat, "phương án sai phải kết thúc bằng retry");
				if (!o.correct && retries > 1) err("scenes.json", oat, "chỉ được một retry");
			}
		});
		walk(top, (n, p) => {
			if (n.type === "line" && charById.get(n.speaker)?.kind === "historical") {
				if (!n.source) err("scenes.json", `${sc.id}${p}`, `nhân vật lịch sử "${n.speaker}" nói câu không có nguồn (03 mục 4)`);
				else if (has("sources") && sourceById.get(n.source)?.kind !== "quote")
					err("scenes.json", `${sc.id}${p}`, `nguồn "${n.source}" không phải loại quote, nhân vật lịch sử không được nói (03 mục 4)`);
			}
		}, ".nodes");
		// Ước tính thời lượng theo nhánh đúng: chữ trên đường đi + 8 giây mỗi lựa chọn + 3 giây mỗi CG/mở khoá
		const pathSec = (nodes) =>
			nodes.reduce((t, n) => {
				if (n.type === "choice") {
					const ok = n.options?.find((o) => o.correct);
					return t + 8 + words(n.prompt) / WPM * 60 + (n.options ?? []).reduce((a, o) => a + words(o.text), 0) / WPM * 60 + (ok ? pathSec(ok.nodes) : 0);
				}
				if (n.type === "cg" || n.type === "unlock") return t + 3 + words(n.caption) / WPM * 60;
				if (n.type === "timeline" || n.type === "cards") return t + n.items.reduce((a, x) => a + words(x.text) + words(x.title ?? x.date), 0) / WPM * 60 + 2 * n.items.length;
				return t + words(n.text) / WPM * 60 + 1.5;
			}, 0);
		sec = pathSec(top);
		perChapterSec.set(sc.chapter, (perChapterSec.get(sc.chapter) ?? 0) + sec);
	}
	let total = 0;
	for (const [ch, sec] of perChapterSec) {
		total += sec;
		const target = data.chapters?.find?.((c) => c.id === ch)?.minutes_target;
		const line = `  ${ch}: ~${(sec / 60).toFixed(1)} phút theo nhánh đúng${target ? ` (mục tiêu ${target})` : ""}`;
		console.log(line);
		if (target && sec / 60 > target * 1.5) warn("scenes.json", ch, `dài gấp rưỡi mục tiêu ${target} phút`);
	}
	if (has("quiz")) total += data.quiz.length * 18;
	console.log(`  Tổng ước tính: ~${(total / 60).toFixed(1)} phút${has("quiz") ? " (đã gồm câu hỏi củng cố)" : ""}`);
	if (strict && total / 60 > 22) err("scenes.json", "", `tổng thời lượng ~${(total / 60).toFixed(1)} phút vượt 22 phút (00-idea mục 4)`);
	if (strict && choiceIds.size !== 7) warn("scenes.json", "", `MVP dự kiến 7 lựa chọn, đang có ${choiceIds.size}`);
}
if (has("quiz"))
	for (const q of data.quiz) {
		if (q.distractors.includes(q.answer)) err("quiz.json", q.id, "phương án nhiễu trùng đáp án đúng");
		if (new Set(q.distractors).size !== q.distractors.length) err("quiz.json", q.id, "phương án nhiễu bị trùng nhau");
	}
const t3 = errors.length - t3start;
console.log(`  ${t3 ? "✗" : "✓"} ${t3} lỗi thiết kế\n`);

// ---------- Kết quả ----------
for (const w of warnings) console.log(`  ⚠ ${w}`);
for (const e of errors) console.log(`  ✗ ${e}`);
console.log(errors.length ? `\nĐỎ: ${errors.length} lỗi, ${warnings.length} cảnh báo.` : `\nXANH: 0 lỗi, ${warnings.length} cảnh báo.`);
process.exit(errors.length ? 1 : 0);
