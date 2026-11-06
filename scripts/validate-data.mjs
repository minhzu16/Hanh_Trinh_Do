#!/usr/bin/env node
// Kiểm tra dữ liệu game 3 tầng. Không cần cài gói nào (Node >= 20).
//
//   node scripts/validate-data.mjs                  kiểm tra data/
//   node scripts/validate-data.mjs --data <thư mục>  kiểm tra thư mục khác (phải có schema/ bên trong)
//   node scripts/validate-data.mjs --strict          file rỗng cũng tính là lỗi (dùng ở cổng P4 trở đi)
//
// Tầng 1: cấu trúc theo data/schema/*.schema.json
// Tầng 2: tham chiếu chéo (mã cảnh, nhân vật, nguồn, tư liệu, điều kiện if, biểu cảm)
// Tầng 3: ràng buộc thiết kế (luật lựa chọn, nhân vật lịch sử chỉ nói câu trích, thời lượng)
// Luật: docs/03-story-spec.md

import { readFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const dataDir = resolve(args.includes("--data") ? args[args.indexOf("--data") + 1] : join(here, "..", "data"));
const strict = args.includes("--strict");

const FILES = ["chapters", "scenes", "characters", "sources", "collectibles", "quiz", "strings", "videos", "hotspots", "contexts", "glossary", "journal"];
const errors = [];
const warnings = [];
const err = (file, path, msg) => errors.push(`${file}${path ? " " + path : ""}: ${msg}`);
const warn = (file, path, msg) => warnings.push(`${file}${path ? " " + path : ""}: ${msg}`);

// ---------- Tầng 1: bộ kiểm tra JSON Schema rút gọn ----------
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
	if (name === "strings" && typeof value === "object") {
		for (const [key, text] of Object.entries(value)) {
			if (typeof text === "string" && text.length === 0) {
				err("strings.json", key, "giá trị không được rỗng");
			}
		}
	}
	if (out.length === 0) green++;
	const count = Array.isArray(value) ? `${value.length} phần tử` : `${Object.keys(value).length} khoá`;
	console.log(`  ${out.length ? "✗" : "✓"} ${name}.json (${count})${out.length ? ` — ${out.length} lỗi` : ""}`);
}
console.log(`  Tầng 1: ${green}/${FILES.length} file xanh, ${pending.size} file chờ nội dung.\n`);

function scanForbiddenTerms(value, path, file) {
	if (typeof value === "string") {
		if (/hương cảng/i.test(value)) {
			err(file, path, "Vi phạm 02-bible.md: Dùng 'Cửu Long (Hồng Kông)' thay cho 'Hương Cảng'");
		}
		return;
	}
	if (Array.isArray(value)) {
		value.forEach((item, index) => scanForbiddenTerms(item, `${path}[${index}]`, file));
		return;
	}
	if (value && typeof value === "object") {
		for (const [key, item] of Object.entries(value)) {
			scanForbiddenTerms(item, path ? `${path}.${key}` : key, file);
		}
	}
}

for (const name of FILES) {
	if (data[name] !== undefined) scanForbiddenTerms(data[name], "", `${name}.json`);
}

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
	const allChoiceIds = new Set();
	for (const sc of data.scenes) {
		walk(sc.nodes ?? [], (n) => {
			if (n.type === "choice") allChoiceIds.add(n.id);
		}, ".nodes");
	}

	for (const sc of data.scenes) {
		if (has("chapters") && !chapterIds.has(sc.chapter)) err("scenes.json", sc.id, `kỳ "${sc.chapter}" không có trong chapters.json`);
		if (has("chapters")) {
			const owner = data.chapters.find((c) => c.scenes.includes(sc.id));
			if (!owner) err("scenes.json", sc.id, "cảnh không nằm trong thứ tự cảnh của kỳ nào");
			else if (owner.id !== sc.chapter) err("scenes.json", sc.id, `ghi kỳ ${sc.chapter} nhưng nằm trong ${owner.id}`);
		}
		walk(sc.nodes ?? [], (n, p) => {
			const at = `${sc.id}${p}`;
			if (n.if) {
				const targetChoice = n.if.replace(/^!/, "").split(":")[0];
				if (!allChoiceIds.has(targetChoice)) {
					err("scenes.json", at, `điều kiện if trỏ tới lựa chọn không tồn tại "${targetChoice}"`);
				}
			}
			if (n.type === "line") {
				if (has("characters") && !charById.has(n.speaker)) err("scenes.json", at, `nhân vật "${n.speaker}" không có trong characters.json`);
				if (n.expression && has("characters")) {
					const char = charById.get(n.speaker);
					if (char && !char.sprites?.includes(n.expression)) {
						err("scenes.json", at, `biểu cảm "${n.expression}" không có trong sprites của "${n.speaker}"`);
					}
				}
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
if (has("quiz")) {
	const sceneIds = ids("scenes");
	for (const q of data.quiz) {
		usedSources.add(q.source);
		if (has("sources") && !sourceIds.has(q.source)) err("quiz.json", q.id, `nguồn "${q.source}" không có trong sources.json`);
		if (q.scene && has("scenes") && !sceneIds.has(q.scene)) err("quiz.json", q.id, `cảnh "${q.scene}" không có trong scenes.json`);

		const qType = q.type || "multiple_choice";
		if (qType === "multiple_choice") {
			if (!q.answer) err("quiz.json", q.id, "câu hỏi multiple_choice thiếu answer");
			if (!Array.isArray(q.distractors) || q.distractors.length < 3) err("quiz.json", q.id, "câu hỏi multiple_choice phải có ít nhất 3 distractors");
		} else if (qType === "word_match") {
			if (!Array.isArray(q.pairs) || q.pairs.length < 2) err("quiz.json", q.id, "câu hỏi word_match phải có ít nhất 2 pairs");
		} else if (qType === "fill_blank") {
			if (!q.template) err("quiz.json", q.id, "câu hỏi fill_blank thiếu template");
			if (!Array.isArray(q.blanks) || q.blanks.length < 1) err("quiz.json", q.id, "câu hỏi fill_blank phải có ít nhất 1 blank");
			if (!Array.isArray(q.options) || q.options.length < 2) err("quiz.json", q.id, "câu hỏi fill_blank phải có ít nhất 2 options");
			if (q.blanks && q.options) {
				for (const b of q.blanks) {
					if (!q.options.includes(b.answer)) err("quiz.json", q.id, `đáp án blank "${b.answer}" không có trong options`);
				}
			}
		} else if (qType === "visual_clue") {
			if (!q.asset) err("quiz.json", q.id, "câu hỏi visual_clue thiếu asset");
			if (!q.answer) err("quiz.json", q.id, "câu hỏi visual_clue thiếu answer");
			if (!Array.isArray(q.distractors) || q.distractors.length < 2) err("quiz.json", q.id, "câu hỏi visual_clue phải có ít nhất 2 distractors");
		}
	}
}
if (has("collectibles")) {
	for (const c of data.collectibles) {
		if (c.source) usedSources.add(c.source);
		if (c.source && has("sources") && !sourceIds.has(c.source)) err("collectibles.json", c.id, `nguồn "${c.source}" không có`);
		if (has("scenes") && !unlocked.has(c.id)) warn("collectibles.json", c.id, "chưa có cảnh nào mở khoá tư liệu này");
		if (c.image_credit && (c.image_credit.includes("Bảo tàng") || c.image_credit.includes("Di tích"))) {
			err("collectibles.json", c.id, "image_credit không được ghi bảo tàng/di tích khi hình ảnh là SVG minh hoạ (F-02, L-03)");
		}
	}
}
if (has("glossary")) {
	for (const g of data.glossary) {
		for (const s of g.sources ?? []) {
			usedSources.add(s);
			if (has("sources") && !sourceIds.has(s)) err("glossary.json", g.id, `nguồn "${s}" không có trong sources.json (L-01)`);
		}
	}
}
if (has("journal")) {
	const chapterIds = ids("chapters");
	for (const j of data.journal) {
		if (has("chapters") && !chapterIds.has(j.chapterId)) err("journal.json", j.chapterId, `kỳ "${j.chapterId}" không có trong chapters.json`);
		for (const entry of j.entries ?? []) {
			for (const s of entry.sources ?? []) {
				usedSources.add(s);
				if (has("sources") && !sourceIds.has(s)) err("journal.json", entry.id, `nguồn "${s}" không có trong sources.json`);
			}
		}
	}
}
if (has("videos")) {
	const sceneIds = ids("scenes");
	for (const v of data.videos) {
		if (has("scenes") && !sceneIds.has(v.sceneId)) err("videos.json", v.id, `cảnh "${v.sceneId}" không có trong scenes.json`);
		for (const s of v.sources ?? []) {
			usedSources.add(s);
			if (has("sources") && !sourceIds.has(s)) err("videos.json", v.id, `nguồn "${s}" không có trong sources.json`);
		}
	}
}
if (has("hotspots")) {
	const sceneIds = ids("scenes");
	for (const h of data.hotspots) {
		if (has("scenes") && !sceneIds.has(h.sceneId)) err("hotspots.json", h.id, `cảnh "${h.sceneId}" không có trong scenes.json`);
		for (const s of h.sources ?? []) {
			usedSources.add(s);
			if (has("sources") && !sourceIds.has(s)) err("hotspots.json", h.id, `nguồn "${s}" không có trong sources.json`);
		}
	}
}
if (has("contexts")) {
	const sceneIds = ids("scenes");
	for (const ctx of data.contexts) {
		if (has("scenes") && !sceneIds.has(ctx.sceneId)) err("contexts.json", ctx.sceneId, `cảnh "${ctx.sceneId}" không có trong scenes.json`);
		for (const s of ctx.sources ?? []) {
			usedSources.add(s);
			if (has("sources") && !sourceIds.has(s)) {
				err("contexts.json", ctx.sceneId, `nguồn "${s}" không có trong sources.json`);
			} else if (has("sources") && ctx.time) {
				const src = sourceById.get(s);
				if (src?.text) {
					const text = src.text;
					const ctxYears = (ctx.time.match(/\b(18\d\d|19\d\d|20\d\d)\b/g) ?? []).map(Number);
					const srcYears = (text.match(/\b(18\d\d|19\d\d|20\d\d)\b/g) ?? []).map(Number);
					const isWinter = /mùa đông/i.test(ctx.time);
					const isSummer = /mùa hè|mùa hạ/i.test(ctx.time);

					const dateMatches = [...text.matchAll(/(?:ngày\s*)?(\d{1,2})\/(\d{1,2})\/(\d{4})|(\d{1,2})\/(\d{4})|tháng\s*(\d{1,2})\/(\d{4})/gi)];
					for (const m of dateMatches) {
						const month = Number(m[2] || m[4] || m[6]);
						const year = Number(m[3] || m[5] || m[7]);
						if (isWinter && month >= 5 && month <= 8 && (!ctxYears.length || ctxYears.includes(year))) {
							err("contexts.json", ctx.sceneId, `thời gian "${ctx.time}" ghi mùa đông nhưng nguồn "${s}" ghi ngày/tháng ${month}/${year} (mùa hè)`);
						}
						if (isSummer && (month === 12 || month <= 2) && (!ctxYears.length || ctxYears.includes(year))) {
							err("contexts.json", ctx.sceneId, `thời gian "${ctx.time}" ghi mùa hè nhưng nguồn "${s}" ghi ngày/tháng ${month}/${year} (mùa đông)`);
						}
					}

					if (ctxYears.length > 0 && srcYears.length > 0 && s !== "GT-61-NGAY-3-2") {
						const minCtx = Math.min(...ctxYears);
						const maxCtx = Math.max(...ctxYears);
						const minSrc = Math.min(...srcYears);
						const maxSrc = Math.max(...srcYears);
						const overlaps = srcYears.some((sy) => sy >= minCtx && sy <= maxCtx) || ctxYears.some((cy) => cy >= minSrc && cy <= maxSrc);
						if (!overlaps) {
							err("contexts.json", ctx.sceneId, `thời gian "${ctx.time}" (năm ${ctxYears.join(", ")}) mâu thuẫn với năm trong nguồn "${s}" (${srcYears.join(", ")})`);
						}
					}
				}
			}
		}
	}
}
if (has("sources") && has("scenes") && has("quiz"))
	for (const s of data.sources) if (!usedSources.has(s.id)) warn("sources.json", s.id, "nguồn chưa được dùng ở đâu");

const t2 = errors.length - t2start;
console.log(`  ${t2 ? "✗" : "✓"} ${t2} lỗi tham chiếu\n`);

// ---------- Tầng 3: ràng buộc thiết kế ----------
console.log("Tầng 3 — ràng buộc thiết kế");
const t3start = errors.length;
const choiceIds = new Set();
const historicalChoiceIds = new Set();
const correctCounts = { A: 0, B: 0, C: 0 };
const expressionsUsedByChar = new Map();
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
			if (n.kind === "personal") {
				if (!["AB", "ABC"].includes(keys)) err("scenes.json", at, `lựa chọn đời tư phương án phải là AB hoặc ABC (đang là "${keys}")`);
				return;
			}
			historicalChoiceIds.add(n.id);
			if (keys !== "ABC") err("scenes.json", at, `phương án phải là A, B, C theo thứ tự (đang là "${keys}")`);
			const correct = opts.filter((o) => o.correct);
			if (correct.length !== 1) err("scenes.json", at, `phải có đúng 1 phương án đúng (đang có ${correct.length})`);
			else correctCounts[correct[0].key] = (correctCounts[correct[0].key] || 0) + 1;
			const lens = opts.map((o) => o.text.length);
			const minLen = Math.min(...lens);
			const maxLen = Math.max(...lens);
			const delta = maxLen > 0 ? (maxLen - minLen) / maxLen : 0;
			if (delta > 0.3) {
				const msg = `chênh lệch độ dài các phương án quá 30% (${(delta * 100).toFixed(1)}%) (V-27)`;
				if (strict) err("scenes.json", at, msg);
				else warn("scenes.json", at, msg);
			}
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
			if (n.type === "line") {
				if (n.speaker && n.expression) {
					if (!expressionsUsedByChar.has(n.speaker)) expressionsUsedByChar.set(n.speaker, new Set());
					expressionsUsedByChar.get(n.speaker).add(n.expression);
				}
				if (charById.get(n.speaker)?.kind === "historical") {
					if (!n.source) err("scenes.json", `${sc.id}${p}`, `nhân vật lịch sử "${n.speaker}" nói câu không có nguồn (03 mục 4)`);
					else if (has("sources") && sourceById.get(n.source)?.kind !== "quote")
						err("scenes.json", `${sc.id}${p}`, `nguồn "${n.source}" không phải loại quote, nhân vật lịch sử không được nói (03 mục 4)`);
				}
			}
		}, ".nodes");
		// S-02: Kiểm tra tỷ lệ thoại và nhân vật Minh trên tuyến chính
		const mainNodes = [];
		for (const n of top) {
			if (n.type === "choice") {
				const ok = n.options?.find((o) => o.correct);
				if (ok?.nodes) mainNodes.push(...ok.nodes);
			} else {
				mainNodes.push(n);
			}
		}
		const minhLines = mainNodes.filter((n) => n.type === "line" && n.speaker === "minh").length;
		const dialogueNodes = mainNodes.filter((n) => n.type === "line" || n.type === "thought").length;
		const textNodes = mainNodes.filter((n) => ["narration", "line", "thought", "knowledge"].includes(n.type)).length;
		const kbCount = mainNodes.filter((n) => n.type === "knowledge").length;
		const dialogueRatio = textNodes > 0 ? dialogueNodes / textNodes : 0;
		if (minhLines < 2) {
			const msg = `Minh chỉ có ${minhLines} câu thoại thành lời trên tuyến chính, yêu cầu >= 2 (S-02)`;
			if (strict) err("scenes.json", sc.id, msg);
			else warn("scenes.json", sc.id, msg);
		}
		if (dialogueRatio < 0.5) {
			const msg = `tỷ lệ thoại trên tuyến chính là ${(dialogueRatio * 100).toFixed(1)}%, yêu cầu >= 50% (S-02)`;
			if (strict) err("scenes.json", sc.id, msg);
			else warn("scenes.json", sc.id, msg);
		}
		if (kbCount > 1) {
			const msg = `có ${kbCount} hộp kiến thức trên tuyến chính, yêu cầu <= 1 (S-02)`;
			if (strict) err("scenes.json", sc.id, msg);
			else warn("scenes.json", sc.id, msg);
		}
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
	if (strict && historicalChoiceIds.size !== 7) warn("scenes.json", "", `MVP dự kiến 7 lựa chọn lịch sử, đang có ${historicalChoiceIds.size}`);
	for (const key of ["A", "B", "C"]) {
		const count = correctCounts[key] || 0;
		if (count < 2 || count > 3) {
			const msg = `đáp án đúng ở vị trí "${key}" xuất hiện ${count} lần, yêu cầu mỗi vị trí 2-3 lần (V-27)`;
			if (strict) err("scenes.json", "", msg);
			else warn("scenes.json", "", msg);
		}
	}
	if (has("characters")) {
		for (const c of data.characters) {
			const spriteCount = Array.isArray(c.sprites) ? c.sprites.length : 0;
			if (spriteCount > 1) {
				const used = expressionsUsedByChar.get(c.id);
				if (!used || used.size === 0) {
					warn("scenes.json", c.id, `nhân vật "${c.id}" có ${spriteCount} biểu cảm trong characters.json nhưng chưa dùng biểu cảm nào trong cảnh (P12)`);
				}
			}
		}
	}
}
if (has("quiz"))
	for (const q of data.quiz) {
		if (Array.isArray(q.distractors)) {
			if (q.answer && q.distractors.includes(q.answer)) err("quiz.json", q.id, "phương án nhiễu trùng đáp án đúng");
			if (new Set(q.distractors).size !== q.distractors.length) err("quiz.json", q.id, "phương án nhiễu bị trùng nhau");
		}
	}
const t3 = errors.length - t3start;
console.log(`  ${t3 ? "✗" : "✓"} ${t3} lỗi thiết kế\n`);

// ---------- Kết quả ----------
for (const w of warnings) console.log(`  ⚠ ${w}`);
for (const e of errors) console.log(`  ✗ ${e}`);
console.log(errors.length ? `\nĐỎ: ${errors.length} lỗi, ${warnings.length} cảnh báo.` : `\nXANH: 0 lỗi, ${warnings.length} cảnh báo.`);
process.exit(errors.length ? 1 : 0);
