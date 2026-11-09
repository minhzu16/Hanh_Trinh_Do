import json
import os
import re

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
public_dir = os.path.join(root, 'public')

missing = []
checked_count = 0

def check_url(source, url):
    global checked_count
    if not url or not isinstance(url, str):
        return
    if url.startswith('/'):
        checked_count += 1
        rel_path = url.lstrip('/')
        full_path = os.path.join(public_dir, rel_path.replace('/', os.sep))
        if not os.path.exists(full_path):
            missing.append((source, url, full_path))

# 1. Check historicalMedia.ts
hm_file = os.path.join(root, 'src', 'data', 'historicalMedia.ts')
if os.path.exists(hm_file):
    with open(hm_file, encoding='utf-8') as f:
        hm_content = f.read()
    urls = re.findall(r'photoUrl:\s*["\'](/[^"\']+)["\']', hm_content)
    for url in urls:
        check_url('src/data/historicalMedia.ts', url)

# 2. Check videos.json
videos_file = os.path.join(root, 'data', 'videos.json')
if os.path.exists(videos_file):
    with open(videos_file, encoding='utf-8') as f:
        videos = json.load(f)
    for v in videos:
        for key in ['videoUrl', 'fallbackUrl', 'posterUrl', 'audioTrack']:
            val = v.get(key)
            if val:
                check_url(f'data/videos.json ({v.get("id")}.{key})', val)

# 3. Check audio.ts
audio_file = os.path.join(root, 'src', 'audio.ts')
if os.path.exists(audio_file):
    with open(audio_file, encoding='utf-8') as f:
        audio_content = f.read()
    audio_urls = re.findall(r'["\'](/audio/[^"\']+)["\']', audio_content)
    for url in audio_urls:
        check_url('src/audio.ts', url)

# 4. Check all BGMs referenced in scenes.json and code
scenes_file = os.path.join(root, 'data', 'scenes.json')
if os.path.exists(scenes_file):
    with open(scenes_file, encoding='utf-8') as f:
        scenes = json.load(f)
    for s in scenes:
        bgm = s.get('bgm')
        if bgm:
            # audio.ts loads `/audio/${bgmName}.mp3`
            check_url(f'scenes.json ({s.get("id")}.bgm)', f'/audio/{bgm}.mp3')

# 5. Check all voice lines in voiceManifest.json
manifest_file = os.path.join(root, 'src', 'engine', 'voiceManifest.json')
if os.path.exists(manifest_file):
    with open(manifest_file, encoding='utf-8') as f:
        manifest = json.load(f)
    for k, v in manifest.items():
        if isinstance(v, dict) and 'url' in v:
            check_url(f'voiceManifest ({k[:30]})', v['url'])

# 6. Check manifest.json and sw.js
pwa_manifest = os.path.join(public_dir, 'manifest.json')
if os.path.exists(pwa_manifest):
    with open(pwa_manifest, encoding='utf-8') as f:
        try:
            m = json.load(f)
            for icon in m.get('icons', []):
                src = icon.get('src')
                if src:
                    check_url('public/manifest.json', src)
        except Exception as e:
            missing.append(('manifest.json', str(e), ''))

sw_file = os.path.join(public_dir, 'sw.js')
if os.path.exists(sw_file):
    with open(sw_file, encoding='utf-8') as f:
        sw_content = f.read()
    sw_urls = re.findall(r'["\'](/[^"\'\s]+?\.(?:webp|png|jpg|mp3|mp4|webm|svg|woff2|woff))["\']', sw_content)
    for url in sw_urls:
        check_url('public/sw.js', url)

# 7. Check all files in data/ for image/video/audio URLs
for fname in os.listdir(os.path.join(root, 'data')):
    if fname.endswith('.json'):
        fpath = os.path.join(root, 'data', fname)
        with open(fpath, encoding='utf-8') as f:
            text = f.read()
        urls = re.findall(r'["\'](/[^"\'\s]+?\.(?:webp|png|jpg|mp3|mp4|webm|svg|woff2|woff))["\']', text)
        for url in urls:
            check_url(f'data/{fname}', url)

print(f"Total assets verified: {checked_count}")
print(f"Total missing assets: {len(missing)}")
for src, url, path in missing:
    print(f"  FAILED: [{src}] {url} -> not found at {path}")

if len(missing) == 0:
    print("ALL REFERENCED MEDIA ASSETS EXIST! 100% OK.")
else:
    exit(1)
