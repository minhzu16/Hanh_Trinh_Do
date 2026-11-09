import json
import os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root, 'data', 'scenes.json'), encoding='utf-8') as f:
    scenes = json.load(f)

bg_ids = {s.get('bg') for s in scenes if s.get('bg')}

with open(os.path.join(root, 'src', 'art', 'sceneBackgrounds.tsx'), encoding='utf-8') as f:
    sb_code = f.read()

with open(os.path.join(root, 'src', 'art', 'backgrounds', 'BackgroundKy0.tsx'), encoding='utf-8') as f:
    ky0_code = f.read()
with open(os.path.join(root, 'src', 'art', 'backgrounds', 'BackgroundKy1.tsx'), encoding='utf-8') as f:
    ky1_code = f.read()
with open(os.path.join(root, 'src', 'art', 'backgrounds', 'BackgroundKy2.tsx'), encoding='utf-8') as f:
    ky2_code = f.read()

all_bg_code = sb_code + ky0_code + ky1_code + ky2_code

missing_bgs = []
print(f"Total backgrounds used in scenes: {len(bg_ids)}")
for bg in sorted(bg_ids):
    has_bg = f'"{bg}"' in all_bg_code
    print(f"  {bg:30} -> In background code: {has_bg}")
    if not has_bg:
        missing_bgs.append(bg)

if not missing_bgs:
    print("ALL BACKGROUNDS ARE FULLY IMPLEMENTED!")
else:
    print(f"MISSING BGs: {missing_bgs}")
