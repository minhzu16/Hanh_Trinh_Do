#!/usr/bin/env node
// Kiểm tra chuỗi tiếng Việt dài hardcoded trong các thành phần giao diện src/.
// Phục vụ kỷ luật nội dung (F-08, F-09, V-28 trong docs/11-lo-trinh-hoan-thien.md).
// Mọi nội dung lịch sử phải nằm trong data/*.json, có schema và nguồn GT-.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(join(here, ".."));
const args = process.argv.slice(2);
const dirIdx = args.indexOf("--dir");
const targetDirs = dirIdx !== -1
  ? [resolve(args[dirIdx + 1])]
  : [join(rootDir, "src", "screens"), join(rootDir, "src", "components"), join(rootDir, "src", "App.tsx")];

const VIETNAMESE_DIACRITICS = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

// Danh sách các chuỗi giao diện hệ thống cho phép (chỉ thông báo UI/kỹ thuật, không phải nội dung lịch sử)
const ALLOWLIST = new Set([
  "Trò chơi gặp lỗi không mong muốn trong quá trình kết xuất giao diện. Bộ sưu tập tư liệu của bạn vẫn được lưu giữ an toàn.",
  "Đang ẩn giao diện — Nhấp chuột hoặc bấm H để hiện lại",
  "Kéo chuột di chuyển • Di chuột tạo chiều sâu 3D",
  "Nhấp chuột bất kỳ hoặc gõ Space để tiếp tục",
  "Căn cứ học thuật: Giáo trình Lịch sử Đảng Cộng sản Việt Nam",
  "Xem danh sách tư liệu lịch sử quý giá đã mở khóa được trong suốt hành trình",
  "Kiểm tra tiến trình và danh hiệu của bạn sau khi hoàn thành các kỳ lịch sử",
  "Đang lưu dữ liệu hành trình... Vui lòng không đóng trang",
  "Khôi phục hành trình từ bản lưu gần nhất trên thiết bị này",
  "Khám phá bối cảnh lịch sử qua các thước phim tài liệu tư liệu quý",
  "Ảnh minh hoạ, không phải tư liệu",
  "🖼️ Minh hoạ sự kiện lịch sử",
  "Vui lòng đọc kỹ nội dung",
  "LỊCH SỬ GIẢ ĐỊNH — Diễn biến này không có thật trong lịch sử",
  "Đã tìm đủ",
  "Khám phá: ",
  "Đã tìm đủ ${sceneHotspots.length}/${sceneHotspots.length} manh mối!",
  "Khám phá: ${sceneHotspots.filter((s) => discoveredHotspots.has(s.id)).length}/${sceneHotspots.length} manh mối",
  "Vui lòng đọc kỹ nội dung (${countdown}s)...",
  "Trình chiếu: Nhảy nhanh tới cảnh (Ctrl + P)",
  "Đã mở khoá: ${unlockedIds.length} / ${content.collectibles.length} tư liệu",
  "Đã mở khoá: ${unlockedList.length} / ${content.collectibles.length} tư liệu",
  "Thước phim tư liệu lịch sử: ${content.videos?.length || 7} đoạn phim",
  "Ảnh tư liệu: ${HISTORICAL_PORTRAITS.length + HISTORICAL_SCENE_PHOTOS.length} ảnh",
  "Chuyển chế độ xem video hoặc thẻ tóm tắt bối cảnh",
  "Tốc độ máy quay phim câm thời kỳ 1920 (0.75x vs 1.0x)",
  "Mẹo: Click vào khung hình hoặc phím Space để Phát/Dừng, ESC để đóng"
]);

function getFiles(dir) {
  if (statSync(dir).isFile()) {
    return dir.endsWith(".tsx") && !dir.endsWith(".test.tsx") ? [dir] : [];
  }
  const results = [];
  const list = readdirSync(dir);
  for (const item of list) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...getFiles(fullPath));
    } else if (fullPath.endsWith(".tsx") && !fullPath.endsWith(".test.tsx")) {
      results.push(fullPath);
    }
  }
  return results;
}

const errors = [];

for (const dir of targetDirs) {
  const files = getFiles(dir);
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const lines = content.split("\n");

    // Trích xuất các chuỗi trong file: JSX text giữa > và <, và chuỗi trong ngoặc kép/đơn/backticks
    lines.forEach((line, lineIdx) => {
      // 1. Chuỗi giữa các dấu ngoặc kép hoặc backticks
      const quoteMatches = line.matchAll(/(["'`])([^"'`\\]*(?:\\.[^"'`\\]*)*)\1/g);
      for (const m of quoteMatches) {
        const text = m[2].trim();
        if (text.length > 40 && VIETNAMESE_DIACRITICS.test(text)) {
          if (!ALLOWLIST.has(text)) {
            errors.push({
              file: relative(rootDir, file),
              line: lineIdx + 1,
              text
            });
          }
        }
      }

      // 2. JSX Text giữa > và <
      const jsxMatches = line.matchAll(/>([^<>{}]*)<\//g);
      for (const m of jsxMatches) {
        const text = m[1].trim();
        if (text.length > 40 && VIETNAMESE_DIACRITICS.test(text)) {
          if (!ALLOWLIST.has(text)) {
            errors.push({
              file: relative(rootDir, file),
              line: lineIdx + 1,
              text
            });
          }
        }
      }
    });
  }
}

if (errors.length > 0) {
  console.error(`\n❌ Phát hiện ${errors.length} chuỗi tiếng Việt dài (> 40 ký tự) hardcoded trong src/:`);
  for (const e of errors) {
    console.error(`  - ${e.file}:${e.line} -> "${e.text}"`);
  }
  console.error("\nLuật mới (P9b): Mọi nội dung lịch sử và câu dẫn phải nằm trong data/*.json có schema và nguồn GT-.");
  process.exit(1);
} else {
  console.log("✓ Kỷ luật nội dung: Không có chuỗi tiếng Việt dài hardcoded ngoài allowlist trong src/.");
  process.exit(0);
}
