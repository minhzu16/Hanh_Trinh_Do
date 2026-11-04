// Test đột biến: bản thân validate-data.mjs có bắt được lỗi không.
// Chạy: node --test scripts/
// Mỗi test chép data/ ra thư mục tạm, cài một lỗi, rồi kiểm tra script báo đỏ đúng chỗ.

import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "data");
const script = join(here, "validate-data.mjs");

function runWith(mutate, extraArgs = []) {
	const dir = mkdtempSync(join(tmpdir(), "htd-"));
	cpSync(dataDir, dir, { recursive: true });
	const scenes = JSON.parse(readFileSync(join(dir, "scenes.json"), "utf8"));
	mutate(scenes, dir);
	writeFileSync(join(dir, "scenes.json"), JSON.stringify(scenes));
	const r = spawnSync(process.execPath, [script, "--data", dir, ...extraArgs], { encoding: "utf8" });
	rmSync(dir, { recursive: true, force: true });
	return { code: r.status, out: r.stdout };
}
const choice = (s) => s[0].nodes.find((n) => n.type === "choice");

test("V-00 dữ liệu hiện tại xanh", () => {
	const r = runWith(() => {});
	assert.equal(r.code, 0, r.out);
});

test("V-01 nhân vật lịch sử nói câu không có nguồn → đỏ", () => {
	const r = runWith((s) => s[0].nodes.push({ type: "line", speaker: "nguyen-ai-quoc", text: "Câu bịa." }));
	assert.equal(r.code, 1);
	assert.match(r.out, /nhân vật lịch sử "nguyen-ai-quoc" nói câu không có nguồn/);
});

test("V-02 nhân vật lịch sử nói câu có nguồn loại fact → đỏ", () => {
	const r = runWith((s) => s[0].nodes.push({ type: "line", speaker: "nguyen-ai-quoc", text: "…", source: "GT-51-TOURS" }));
	assert.equal(r.code, 1);
	assert.match(r.out, /không phải loại quote/);
});

test("V-03 hai phương án đúng → đỏ", () => {
	const r = runWith((s) => {
		const c = choice(s);
		c.options[0].correct = true;
		c.options[0].nodes.pop();
	});
	assert.equal(r.code, 1);
	assert.match(r.out, /phải có đúng 1 phương án đúng/);
});

test("V-04 phương án sai thiếu retry → đỏ", () => {
	const r = runWith((s) => choice(s).options[1].nodes.pop());
	assert.equal(r.code, 1);
	assert.match(r.out, /phương án sai phải kết thúc bằng retry/);
});

test("V-05 phương án không có hộp kiến thức → đỏ", () => {
	const r = runWith((s) => {
		const o = choice(s).options[2];
		o.nodes = o.nodes.filter((n) => n.type !== "knowledge");
	});
	assert.equal(r.code, 1);
	assert.match(r.out, /ít nhất một hộp kiến thức/);
});

test("V-06 nguồn không tồn tại → đỏ", () => {
	const r = runWith((s) => s[0].nodes.push({ type: "knowledge", sources: ["GT-99-KHONG-CO"], text: "x" }));
	assert.equal(r.code, 1);
	assert.match(r.out, /nguồn "GT-99-KHONG-CO" không có/);
});

test("V-07 nhân vật không tồn tại → đỏ", () => {
	const r = runWith((s) => s[0].nodes.push({ type: "line", speaker: "ai-do", text: "x" }));
	assert.equal(r.code, 1);
	assert.match(r.out, /nhân vật "ai-do" không có/);
});

test("V-08 loại nút lạ → đỏ ở tầng 1", () => {
	const r = runWith((s) => s[0].nodes.push({ type: "video", src: "x" }));
	assert.equal(r.code, 1);
	assert.match(r.out, /loại nút không hợp lệ/);
});

test("V-09 còn TODO → đỏ", () => {
	const r = runWith((s) => (s[0].title = "TODO"));
	assert.equal(r.code, 1);
	assert.match(r.out, /còn TODO/);
});

test("V-26 validate-data: if trỏ tới mã lựa chọn không tồn tại → đỏ ở tầng 2", () => {
	const r = runWith((s) => s[0].nodes.push({ type: "narration", text: "Test if", if: "k99-l99:A" }));
	assert.equal(r.code, 1);
	assert.match(r.out, /điều kiện if trỏ tới lựa chọn không tồn tại "k99-l99"/);
});

test("S-02 validate-data: Minh ít hơn 2 câu thoại thành lời trên tuyến chính → đỏ khi chạy --strict", () => {
	const r = runWith((s) => {
		s[0].nodes = s[0].nodes.filter((n) => !(n.type === "line" && n.speaker === "minh"));
		const c = choice(s);
		if (c) {
			const ok = c.options.find((o) => o.correct);
			if (ok) ok.nodes = ok.nodes.filter((n) => !(n.type === "line" && n.speaker === "minh"));
		}
	}, ["--strict"]);
	assert.equal(r.code, 1);
	assert.match(r.out, /Minh chỉ có 0 câu thoại thành lời trên tuyến chính/);
});

test("S-02 validate-data: Tỷ lệ thoại dưới 50% trên tuyến chính → đỏ khi chạy --strict", () => {
	const r = runWith((s) => {
		for (let i = 0; i < 15; i++) {
			s[0].nodes.unshift({ type: "narration", text: `Lời dẫn thêm ${i}` });
		}
	}, ["--strict"]);
	assert.equal(r.code, 1);
	assert.match(r.out, /tỷ lệ thoại trên tuyến chính là/);
});

test("S-02 validate-data: Nhiều hơn 1 hộp kiến thức trên tuyến chính → đỏ khi chạy --strict", () => {
	const r = runWith((s) => {
		s[0].nodes.push({ type: "knowledge", sources: ["GT-38-PATONOT"], text: "Hộp kiến thức thứ 2" });
	}, ["--strict"]);
	assert.equal(r.code, 1);
	assert.match(r.out, /có 2 hộp kiến thức trên tuyến chính/);
});

test("V-27 validate-data: Độ dài phương án lệch quá 30% → đỏ khi chạy --strict", () => {
	const r = runWith((s) => {
		const c = choice(s);
		c.options[0].text = "Phương án A siêu dài vượt quá mức cho phép của kiểm tra độ dài phương án ".repeat(5);
	}, ["--strict"]);
	assert.equal(r.code, 1);
	assert.match(r.out, /chênh lệch độ dài các phương án quá 30%/);
});

test("V-27 validate-data: Vị trí đáp án đúng xuất hiện quá 3 lần → đỏ khi chạy --strict", () => {
	const r = runWith((s) => {
		for (const sc of s) {
			for (const node of sc.nodes) {
				if (node.type === "choice") {
					for (const opt of node.options) {
						opt.correct = opt.key === "A";
						if (opt.key === "A") {
							opt.nodes = opt.nodes.filter((n) => n.type !== "retry");
						} else {
							if (opt.nodes[opt.nodes.length - 1]?.type !== "retry") {
								opt.nodes.push({ type: "retry" });
							}
						}
					}
				}
			}
		}
	}, ["--strict"]);
	assert.equal(r.code, 1);
	assert.match(r.out, /đáp án đúng ở vị trí "A" xuất hiện .* lần/);
});

test("V-28 check-hardcoded-text: Báo lỗi đỏ khi phát hiện chuỗi tiếng Việt dài hardcoded ngoài allowlist", () => {
	const checkScript = join(here, "check-hardcoded-text.mjs");
	// 1. Chạy trên code thực tế -> xanh
	const r1 = spawnSync(process.execPath, [checkScript], { encoding: "utf8" });
	assert.equal(r1.status, 0, r1.stdout + r1.stderr);

	// 2. Chạy đột biến: tạo thư mục tạm chứa file .tsx có chuỗi tiếng Việt dài hardcoded -> đỏ
	const dir = mkdtempSync(join(tmpdir(), "htd-check-"));
	writeFileSync(
		join(dir, "FakeScreen.tsx"),
		`export const FakeScreen = () => <div>Mật thám Paul Arnoux đang bám theo Người qua các ngả phố Paris không có trong giáo trình</div>;`
	);
	const r2 = spawnSync(process.execPath, [checkScript, "--dir", dir], { encoding: "utf8" });
	rmSync(dir, { recursive: true, force: true });
	assert.equal(r2.status, 1);
	assert.match(r2.stderr, /chuỗi tiếng Việt dài/);
});

test("V-29 validate-data: Mọi nguồn trong quiz.json phải hợp lệ trong sources.json", () => {
	const dir = mkdtempSync(join(tmpdir(), "htd-quiz-"));
	cpSync(dataDir, dir, { recursive: true });
	const quiz = JSON.parse(readFileSync(join(dir, "quiz.json"), "utf8"));
	quiz[0].source = "GT-99-KHONG-CO-TRONG-GIAO-TRINH";
	writeFileSync(join(dir, "quiz.json"), JSON.stringify(quiz));
	const r = spawnSync(process.execPath, [script, "--data", dir], { encoding: "utf8" });
	rmSync(dir, { recursive: true, force: true });
	assert.equal(r.status, 1);
	assert.match(r.stdout, /nguồn "GT-99-KHONG-CO-TRONG-GIAO-TRINH" không có/);
});

test("A-04 validate-data: expression không có trong sprites của nhân vật → đỏ", () => {
	const r = runWith((s) => {
		s[0].nodes.push({ type: "line", speaker: "minh", text: "Xin chào", expression: "gian-du-khong-co" });
	});
	assert.equal(r.code, 1);
	assert.match(r.out, /biểu cảm "gian-du-khong-co" không có trong sprites của "minh"/);
});

test("L-01 validate-data: Mọi mục trong glossary.json phải có nguồn hợp lệ", () => {
	const dir = mkdtempSync(join(tmpdir(), "htd-glossary-"));
	cpSync(dataDir, dir, { recursive: true });
	const glossary = JSON.parse(readFileSync(join(dir, "glossary.json"), "utf8"));
	glossary[0].sources = ["GT-99-INVALID-SOURCE"];
	writeFileSync(join(dir, "glossary.json"), JSON.stringify(glossary));
	const r = spawnSync(process.execPath, [script, "--data", dir], { encoding: "utf8" });
	rmSync(dir, { recursive: true, force: true });
	assert.equal(r.status, 1);
	assert.match(r.stdout, /nguồn "GT-99-INVALID-SOURCE" không có trong sources.json \(L-01\)/);
});

test("L-03 validate-data: collectibles.json image_credit không được ghi bảo tàng khi dùng SVG", () => {
	const dir = mkdtempSync(join(tmpdir(), "htd-coll-"));
	cpSync(dataDir, dir, { recursive: true });
	const coll = JSON.parse(readFileSync(join(dir, "collectibles.json"), "utf8"));
	coll[0].image_credit = "Bảo tàng Lịch sử Quốc gia";
	writeFileSync(join(dir, "collectibles.json"), JSON.stringify(coll));
	const r = spawnSync(process.execPath, [script, "--data", dir], { encoding: "utf8" });
	rmSync(dir, { recursive: true, force: true });
	assert.equal(r.status, 1);
	assert.match(r.stdout, /image_credit không được ghi bảo tàng\/di tích khi hình ảnh là SVG minh hoạ \(F-02, L-03\)/);
});

test("V-30 validate-data: câu hỏi fill_blank thiếu options hoặc blanks → đỏ", () => {
	const dir = mkdtempSync(join(tmpdir(), "htd-quiz-fb-"));
	cpSync(dataDir, dir, { recursive: true });
	const quiz = JSON.parse(readFileSync(join(dir, "quiz.json"), "utf8"));
	quiz.push({
		id: "q99",
		type: "fill_blank",
		question: "Điền vào chỗ trống thử nghiệm",
		source: "GT-64-MUC-TIEU"
	});
	writeFileSync(join(dir, "quiz.json"), JSON.stringify(quiz));
	const r = spawnSync(process.execPath, [script, "--data", dir], { encoding: "utf8" });
	rmSync(dir, { recursive: true, force: true });
	assert.equal(r.status, 1);
	assert.match(r.stdout, /câu hỏi fill_blank thiếu template/);
});

test("V-31 validate-data: câu hỏi word_match thiếu pairs → đỏ", () => {
	const dir = mkdtempSync(join(tmpdir(), "htd-quiz-wm-"));
	cpSync(dataDir, dir, { recursive: true });
	const quiz = JSON.parse(readFileSync(join(dir, "quiz.json"), "utf8"));
	quiz.push({
		id: "q99",
		type: "word_match",
		question: "Ghép cặp thử nghiệm",
		source: "GT-59-BA-TO-CHUC",
		pairs: [{ left: "Chỉ một vế", right: "Thiếu cặp thứ 2" }]
	});
	writeFileSync(join(dir, "quiz.json"), JSON.stringify(quiz));
	const r = spawnSync(process.execPath, [script, "--data", dir], { encoding: "utf8" });
	rmSync(dir, { recursive: true, force: true });
	assert.equal(r.status, 1);
	assert.match(r.stdout, /câu hỏi word_match phải có ít nhất 2 pairs/);
});

test("V-32 validate-data: contexts.json time mâu thuẫn với năm của nguồn → đỏ", () => {
	const dir = mkdtempSync(join(tmpdir(), "htd-ctx-"));
	cpSync(dataDir, dir, { recursive: true });
	const ctxs = JSON.parse(readFileSync(join(dir, "contexts.json"), "utf8"));
	const c5 = ctxs.find((c) => c.sceneId === "k0-c5");
	c5.time = "Mùa đông 1923";
	c5.sources = ["GT-51-TOURS"];
	writeFileSync(join(dir, "contexts.json"), JSON.stringify(ctxs));
	const r = spawnSync(process.execPath, [script, "--data", dir], { encoding: "utf8" });
	rmSync(dir, { recursive: true, force: true });
	assert.equal(r.status, 1);
	assert.match(r.stdout, /mâu thuẫn với năm trong nguồn "GT-51-TOURS"/);
});

test("V-33 validate-data: contexts.json mùa đông mâu thuẫn với tháng hè trong nguồn → đỏ", () => {
	const dir = mkdtempSync(join(tmpdir(), "htd-ctx-season-"));
	cpSync(dataDir, dir, { recursive: true });
	const ctxs = JSON.parse(readFileSync(join(dir, "contexts.json"), "utf8"));
	const c5 = ctxs.find((c) => c.sceneId === "k0-c5");
	c5.time = "Mùa đông 1923";
	c5.sources = ["GT-52-LIEN-XO"];
	writeFileSync(join(dir, "contexts.json"), JSON.stringify(ctxs));
	const r = spawnSync(process.execPath, [script, "--data", dir], { encoding: "utf8" });
	rmSync(dir, { recursive: true, force: true });
	assert.equal(r.status, 1);
	assert.match(r.stdout, /ghi mùa đông nhưng nguồn "GT-52-LIEN-XO" ghi ngày\/tháng 6\/1923/);
});

test("P12 validate-data: nhân vật có nhiều sprites mà không dùng expression nào → cảnh báo", () => {
	const dir = mkdtempSync(join(tmpdir(), "htd-expr-"));
	cpSync(dataDir, dir, { recursive: true });
	const scenes = JSON.parse(readFileSync(join(dir, "scenes.json"), "utf8"));
	for (const sc of scenes) {
		for (const n of sc.nodes) {
			if (n.speaker === "lan") delete n.expression;
			if (n.type === "choice") {
				for (const o of n.options || []) {
					for (const on of o.nodes || []) {
						if (on.speaker === "lan") delete on.expression;
					}
				}
			}
		}
	}
	writeFileSync(join(dir, "scenes.json"), JSON.stringify(scenes));
	const r = spawnSync(process.execPath, [script, "--data", dir], { encoding: "utf8" });
	rmSync(dir, { recursive: true, force: true });
	assert.match(r.stdout, /nhân vật "lan" có 4 biểu cảm trong characters.json nhưng chưa dùng biểu cảm nào/);
});
