#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Studio-grade Neural Vietnamese Voice Generator for "Hành Trình Đỏ" Visual Novel
Uses Microsoft Edge Neural TTS (vi-VN-NamMinhNeural & vi-VN-HoaiMyNeural)
to generate authentic human Vietnamese audio files for all dialogue, thought,
narration, and knowledge nodes with distinct character voice personas and prosody.
"""

import os
import sys
import re
import json
import asyncio
import hashlib
import edge_tts

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCENES_PATH = os.path.join(ROOT_DIR, "data", "scenes.json")
OUTPUT_DIR = os.path.join(ROOT_DIR, "public", "audio", "voices")
MANIFEST_SRC_PATH = os.path.join(ROOT_DIR, "src", "engine", "voiceManifest.json")
MANIFEST_PUB_PATH = os.path.join(OUTPUT_DIR, "manifest.json")

# Cấu hình âm sắc đặc thù cho từng nhân vật (phân tầng tính cách, độ tuổi, vai trò lịch sử, tránh đi ngang)
VOICE_CONFIG = {
    # 1. Minh (Thoại trực tiếp): Nam thanh niên 21 tuổi, trẻ trung, nhiệt huyết, tươi sáng, nhịp nói hoạt bát
    "minh": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "+4%",
        "pitch": "+10Hz",
    },
    # 2. Minh (Nội tâm - thought): Trầm tư, tự sự, sâu lắng, chậm rãi (âm lượng được điều chỉnh qua client)
    "minh-thought": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "-3%",
        "pitch": "+3Hz",
    },
    # 3. Bác Tư: Thợ máy lão thành (~55 tuổi), giọng trầm khàn gió sương biển cả, dày dặn, ấm áp, nhịp nói điềm đạm
    "bac-tu": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "-8%",
        "pitch": "-10Hz",
    },
    # 4. Nguyễn Ái Quốc (Bác Hồ / Văn Ba): Lãnh tụ, đĩnh đạc, ấm áp, uy nghiêm, truyền cảm, nhả chữ mạch lạc
    "nguyen-ai-quoc": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "-4%",
        "pitch": "-4Hz",
    },
    # 5. Lan: Nữ thanh niên công nhân dệt Hà Nội, trong trẻo, sắc sảo, kiên định, dũng cảm
    "lan": {
        "voice": "vi-VN-HoaiMyNeural",
        "rate": "+3%",
        "pitch": "+6Hz",
    },
    # 6. Bạn thợ ảnh (Ngõ Compoint, Paris): Đồng nghiệp thân thiện, cởi mở
    "ban-tho-anh": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "+1%",
        "pitch": "+4Hz",
    },
    # 7. Thợ Việt kiều: Mộc mạc, chân chất, cùng cảnh ngộ viễn xứ
    "tho-viet-kieu": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "-2%",
        "pitch": "-2Hz",
    },
    # 8. Người dẫn chuyện (Narrator): Thuyết minh tư liệu lịch sử, trầm ấm, truyền cảm, khúc chiết
    "narrator": {
        "voice": "vi-VN-HoaiMyNeural",
        "rate": "-3%",
        "pitch": "-4Hz",
    },
    # 9. Hộp kiến thức (Knowledge): Giáo trình lịch sử chính thống, rõ ràng, đĩnh đạc, chắc chắn
    "knowledge": {
        "voice": "vi-VN-HoaiMyNeural",
        "rate": "-6%",
        "pitch": "-8Hz",
    }
}

def clean_text(text: str) -> str:
    # Loại bỏ mã trích dẫn, số ngoặc vuông và ký tự đặc biệt gây cản trở đọc
    t = re.sub(r"\[GT-[^\]]+\]", "", text)
    t = re.sub(r"\[\d+\]", "", t)
    t = re.sub(r'["“”«»*]', " ", t)
    return " ".join(t.split()).strip()

def compute_hash(text: str, speaker: str = "") -> str:
    cleaned = clean_text(text)
    hash_input = f"{speaker}:{cleaned}" if speaker else cleaned
    return hashlib.md5(hash_input.encode("utf-8")).hexdigest()[:12]

def extract_nodes():
    with open(SCENES_PATH, "r", encoding="utf-8") as f:
        scenes = json.load(f)

    items = []
    seen_items = set()

    def process_node(node, scene_id):
        ntype = node.get("type")
        if ntype in ("line", "thought", "narration", "knowledge"):
            raw_text = node.get("text", "")
            cleaned = clean_text(raw_text)
            if not cleaned:
                return
            speaker = node.get("speaker")
            if ntype == "thought":
                speaker = "minh-thought"
            elif not speaker:
                if ntype == "narration":
                    speaker = "narrator"
                elif ntype == "knowledge":
                    speaker = "knowledge"
                else:
                    speaker = "narrator"

            dedupe_key = (speaker, cleaned)
            if dedupe_key in seen_items:
                return
            seen_items.add(dedupe_key)
            h = compute_hash(cleaned, speaker)

            items.append({
                "hash": h,
                "sceneId": scene_id,
                "type": ntype,
                "speaker": speaker,
                "text": cleaned,
                "filename": f"{h}.mp3"
            })

        if ntype == "choice":
            for opt in node.get("options", []):
                for sub_node in opt.get("nodes", []):
                    process_node(sub_node, scene_id)

    for s in scenes:
        for node in s.get("nodes", []):
            process_node(node, s["id"])

    return items

async def generate_single(item, idx, total, force=False):
    h = item["hash"]
    out_file = os.path.join(OUTPUT_DIR, f"{h}.mp3")
    if not force and os.path.exists(out_file) and os.path.getsize(out_file) > 1024:
        return item  # Đã tồn tại và không ép buộc tạo lại

    cfg = VOICE_CONFIG.get(item["speaker"], VOICE_CONFIG["narrator"])
    voice_name = cfg["voice"]
    rate = cfg.get("rate")
    pitch = cfg.get("pitch")

    kwargs = {}
    if rate and rate not in ("0%", "+0%"):
        kwargs["rate"] = rate
    if pitch and pitch not in ("0Hz", "+0Hz"):
        kwargs["pitch"] = pitch

    for attempt in range(1, 5):
        try:
            communicate = edge_tts.Communicate(
                text=item["text"],
                voice=voice_name,
                **kwargs
            )
            await asyncio.wait_for(communicate.save(out_file), timeout=15.0)
            if os.path.exists(out_file) and os.path.getsize(out_file) > 1024:
                print(f"[{idx}/{total}] [+] Đã tạo: {h}.mp3 ({item['speaker']} | {pitch} | {rate})", flush=True)
                await asyncio.sleep(0.35)
                return item
            else:
                if os.path.exists(out_file):
                    os.remove(out_file)
        except Exception as e:
            print(f"[{idx}/{total}] [!] [{attempt}/4] Lỗi khi tạo {h}.mp3: {e}", flush=True)
            if os.path.exists(out_file):
                try:
                    os.remove(out_file)
                except Exception:
                    pass
            await asyncio.sleep(1.2 * attempt)

    return item

async def main():
    force_regen = "--force" in sys.argv or "-f" in sys.argv
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(MANIFEST_SRC_PATH), exist_ok=True)

    items = extract_nodes()
    total = len(items)
    print(f"[*] Tổng số câu thoại/kiến thức: {total} (force={force_regen})", flush=True)

    sem = asyncio.Semaphore(2)

    async def worker(item, idx):
        async with sem:
            return await generate_single(item, idx, total, force=force_regen)

    tasks = [worker(item, idx) for idx, item in enumerate(items, 1)]
    await asyncio.gather(*tasks)

    # Xuất file manifest cho Frontend (tra cứu theo text và speaker:text).
    # Hash chỉ được dùng để đặt tên file, không cần lặp lại thành một khóa tra cứu.
    manifest = {}
    success_count = 0
    for item in items:
        file_path = os.path.join(OUTPUT_DIR, item["filename"])
        if os.path.exists(file_path) and os.path.getsize(file_path) > 1024:
            success_count += 1
            entry = {
                "url": f"/audio/voices/{item['filename']}",
                "speaker": item["speaker"],
                "type": item["type"],
                "hash": item["hash"]
            }
            manifest[item["text"]] = entry
            manifest[f"{item['speaker']}:{item['text']}"] = entry

    with open(MANIFEST_SRC_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, separators=(",", ":"))

    with open(MANIFEST_PUB_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, separators=(",", ":"))

    print(f"[✓] Đã tạo thành công {success_count}/{total} file giọng đọc tại {OUTPUT_DIR}", flush=True)
    print(f"[✓] Đã cập nhật manifest tại {MANIFEST_SRC_PATH}", flush=True)

if __name__ == "__main__":
    asyncio.run(main())
