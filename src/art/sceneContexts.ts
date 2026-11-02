import { content } from "../content";
import type { SceneContext } from "../engine/types";

export type SceneContextInfo = SceneContext;

// Khởi tạo từ dữ liệu data/contexts.json chuẩn hoá qua schema
export const SCENE_CONTEXTS: Record<string, SceneContextInfo> = (content.contexts ?? []).reduce(
  (acc, c) => {
    acc[c.sceneId] = c;
    return acc;
  },
  {} as Record<string, SceneContextInfo>
);
