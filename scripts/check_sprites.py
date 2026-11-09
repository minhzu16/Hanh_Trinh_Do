import json
import os
import re

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root, 'data', 'scenes.json'), encoding='utf-8') as f:
    scenes = json.load(f)

with open(os.path.join(root, 'src', 'art', 'characterSprites.tsx'), encoding='utf-8') as f:
    sprites_code = f.read()

used_sprites = set()
for s in scenes:
    for n in s.get('nodes', []):
        spk = n.get('speaker')
        expr = n.get('expression', 'default')
        if spk:
            used_sprites.add((spk, expr))
        if n.get('type') == 'choice':
            for o in n.get('options', []):
                for onode in o.get('nodes', []):
                    ospk = onode.get('speaker')
                    oexpr = onode.get('expression', 'default')
                    if ospk:
                        used_sprites.add((ospk, oexpr))

print(f"Total unique (speaker, expression) pairs used in scenes: {len(used_sprites)}")
for spk, expr in sorted(used_sprites):
    # Check if speaker and expression exist in characterSprites.tsx
    has_spk = f'characterId === "{spk}"' in sprites_code or f'"{spk}"' in sprites_code
    has_expr = f'expression === "{expr}"' in sprites_code or f'"{expr}"' in sprites_code
    print(f"  {spk:15} | {expr:15} -> Speaker in code: {has_spk}, Expr in code: {has_expr}")
