#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Studio-grade Neural Vietnamese Voice Generator for "Hành Trình Đỏ" Visual Novel
Uses Microsoft Edge Neural TTS (vi-VN-NamMinhNeural & vi-VN-HoaiMyNeural)
to generate authentic human Vietnamese audio files for all dialogue, thought,
narration, and knowledge nodes.
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

VOICE_CONFIG = {
    # Nam giới & Lãnh tụ
    "nguyen-ai-quoc": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "-3%",
        "pitch": "-1Hz"
    },
    "bac-tu": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "-5%",
        "pitch": "-3Hz"
    },
    "minh": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "+2%",
        "pitch": "+1Hz"
    },
    "ban-tho-anh": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "0%",
        "pitch": "0Hz"
    },
    "tho-viet-kieu": {
        "voice": "vi-VN-NamMinhNeural",
        "rate": "0%",
        "pitch": "0Hz"
    },
    # Nữ giới & Giáo trình & Thuyết minh
    "lan": {
        "voice": "vi-VN-HoaiMyNeural",
        "rate": "+2%",
        "pitch": "+1Hz"
    },
    "narrator": {
        "voice": "vi-VN-HoaiMyNeural",
        "rate": "0%",
        "pitch": "0Hz"
    },
    "knowledge": {
        "voice": "vi-VN-HoaiMyNeural",
        "rate": "-3%",
        "pitch": "0Hz"
    }
}

def clean_text(text: str) -> str:
    t = re.sub(r"\[GT-[^\]]+\]", "", text)
    t = re.sub(r"\[\d+\]", "", t)
    t = re.sub(r'["“”«»*]', " ", t)
    return " ".join(t.split()).strip()

def compute_hash(text: str) -> str:
    cleaned = clean_text(text)
    return hashlib.md5(cleaned.encode("utf-8")).hexdigest()[:12]

def extract_nodes():
    with open(SCENES_PATH, "r", encoding="utf-8") as f:
        scenes = json.load(f)

    items = []
    seen_hashes = set()

    def process_node(node, scene_id):
        ntype = node.get("type")
        if ntype in ("line", "thought", "narration", "knowledge"):
            raw_text = node.get("text", "")
            cleaned = clean_text(raw_text)
            if not cleaned:
                return
            h = compute_hash(cleaned)
            if h in seen_hashes:
                return
            seen_hashes.add(h)

            speaker = node.get("speaker")
            if not speaker:
                if ntype == "narration":
                    speaker = "narrator"
                elif ntype == "thought":
                    speaker = "minh"
                elif ntype == "knowledge":
                    speaker = "knowledge"
                else:
                    speaker = "narrator"

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

async def generate_single(item, idx, total):
    h = item["hash"]
    out_file = os.path.join(OUTPUT_DIR, f"{h}.mp3")
    if os.path.exists(out_file) and os.path.getsize(out_file) > 1024:
        return item  # Đã tồn tại, bỏ qua

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
            await communicate.save(out_file)
            if os.path.exists(out_file) and os.path.getsize(out_file) > 1024:
                print(f"[{idx}/{total}] [+] Đã tạo: {h}.mp3 ({item['speaker']} - {len(item['text'])} ký tự)", flush=True)
                await asyncio.sleep(0.6)
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
            await asyncio.sleep(1.5 * attempt)

    return item

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(MANIFEST_SRC_PATH), exist_ok=True)

    items = extract_nodes()
    total = len(items)
    print(f"[*] Tổng số câu thoại/kiến thức: {total}", flush=True)

    for idx, item in enumerate(items, 1):
        await generate_single(item, idx, total)

    # Xuất file manifest cho Frontend (cho phép lookup bằng cả hash và text đã chuẩn hóa)
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
            manifest[item["hash"]] = entry
            manifest[item["text"]] = entry

    with open(MANIFEST_SRC_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    with open(MANIFEST_PUB_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"[✓] Đã tạo thành công {success_count}/{total} file giọng đọc tại {OUTPUT_DIR}", flush=True)
    print(f"[✓] Đã cập nhật manifest tại {MANIFEST_SRC_PATH}", flush=True)

    print(f"[✓] Đã tạo thành công {len(manifest)} file giọng đọc tại {OUTPUT_DIR}")
    print(f"[✓] Đã cập nhật manifest tại {MANIFEST_SRC_PATH}")

if __name__ == "__main__":
    asyncio.run(main())
