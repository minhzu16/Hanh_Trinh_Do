import json
import os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root, 'data', 'scenes.json'), encoding='utf-8') as f:
    scenes = json.load(f)

cg_assets = set()
for s in scenes:
    for n in s.get('nodes', []):
        if n.get('type') == 'cg' and n.get('asset'):
            cg_assets.add(n.get('asset'))
        if n.get('type') == 'choice':
            for o in n.get('options', []):
                for onode in o.get('nodes', []):
                    if onode.get('type') == 'cg' and onode.get('asset'):
                        cg_assets.add(onode.get('asset'))

with open(os.path.join(root, 'src', 'art', 'cgIllustrations.tsx'), encoding='utf-8') as f:
    cg_code = f.read()

missing_cgs = []
print(f"Total CG assets used in scenes: {len(cg_assets)}")
for asset in sorted(cg_assets):
    has_asset = f'"{asset}"' in cg_code
    print(f"  {asset:30} -> In cgIllustrations.tsx: {has_asset}")
    if not has_asset:
        missing_cgs.append(asset)

if not missing_cgs:
    print("ALL CG ASSETS ARE FULLY IMPLEMENTED IN cgIllustrations.tsx!")
else:
    print(f"MISSING CGs: {missing_cgs}")
