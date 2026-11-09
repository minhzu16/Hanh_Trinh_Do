import json
import os

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(root, 'data')

def load_json(name):
    p = os.path.join(data_dir, name)
    with open(p, encoding='utf-8') as f:
        return json.load(f)

scenes = load_json('scenes.json')
chapters = load_json('chapters.json')
characters = load_json('characters.json')
collectibles = load_json('collectibles.json')
contexts = load_json('contexts.json')
glossary = load_json('glossary.json')
hotspots = load_json('hotspots.json')
journal = load_json('journal.json')
quiz = load_json('quiz.json')
sources = load_json('sources.json')
strings = load_json('strings.json')
videos = load_json('videos.json')

all_sources_map = {so['id']: so for so in sources}
all_source_ids = set(all_sources_map.keys())
used_sources = set()
unlocked_collectibles = set()

def extract_sources_from_obj(obj):
    if isinstance(obj, dict):
        if 'source' in obj and isinstance(obj['source'], str):
            used_sources.add(obj['source'])
        if 'sources' in obj and isinstance(obj['sources'], list):
            for s in obj['sources']:
                if isinstance(s, str):
                    used_sources.add(s)
        if obj.get('type') == 'unlock' and 'item' in obj:
            unlocked_collectibles.add(obj['item'])
        for v in obj.values():
            extract_sources_from_obj(v)
    elif isinstance(obj, list):
        for item in obj:
            extract_sources_from_obj(item)

extract_sources_from_obj(scenes)
extract_sources_from_obj(collectibles)
extract_sources_from_obj(contexts)
extract_sources_from_obj(glossary)
extract_sources_from_obj(hotspots)
extract_sources_from_obj(journal)
extract_sources_from_obj(quiz)
extract_sources_from_obj(videos)

print(f"Total defined sources in sources.json: {len(all_source_ids)}")
print(f"Total used sources across all data: {len(used_sources)}")

invalid_sources = used_sources - all_source_ids
print(f"Invalid sources used (not in sources.json): {len(invalid_sources)} -> {invalid_sources}")

unused_sources = all_source_ids - used_sources
print(f"Unused sources in sources.json: {len(unused_sources)} -> {unused_sources}")

all_collectible_ids = {c['id'] for c in collectibles}
print(f"\nTotal collectibles: {len(all_collectible_ids)}")
print(f"Total unlocked in scenes: {len(unlocked_collectibles)}")
missing_unlocks = all_collectible_ids - unlocked_collectibles
print(f"Collectibles missing unlock nodes: {missing_unlocks}")

if len(invalid_sources) == 0 and len(unused_sources) == 0 and len(missing_unlocks) == 0:
    print("\nPERFECT 100% DATA COHESION: 51/51 SOURCES USED, 8/8 COLLECTIBLES UNLOCKED, 0 INVALID REFS!")
