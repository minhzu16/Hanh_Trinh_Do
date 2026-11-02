import { content } from "../content";
import type { SceneHotspot } from "../engine/types";

export type { SceneHotspot };

// Khởi tạo từ dữ liệu data/hotspots.json chuẩn hoá qua schema
export const SCENE_HOTSPOTS: Record<string, SceneHotspot[]> = (content.hotspots ?? []).reduce(
  (acc, h) => {
    if (!acc[h.sceneId]) acc[h.sceneId] = [];
    acc[h.sceneId].push(h);
    return acc;
  },
  {} as Record<string, SceneHotspot[]>
);
