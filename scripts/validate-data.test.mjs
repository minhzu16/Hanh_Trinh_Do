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

function runWith(mutate) {
	const dir = mkdtempSync(join(tmpdir(), "htd-"));
	cpSync(dataDir, dir, { recursive: true });
	const scenes = JSON.parse(readFileSync(join(dir, "scenes.json"), "utf8"));
	mutate(scenes, dir);
	writeFileSync(join(dir, "scenes.json"), JSON.stringify(scenes));
	const r = spawnSync(process.execPath, [script, "--data", dir], { encoding: "utf8" });
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
