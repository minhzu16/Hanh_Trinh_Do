import { content } from "../content";
import type { HistoricalVideo } from "../engine/types";

export type HistoricalVideoRecord = HistoricalVideo;

// Khởi tạo từ dữ liệu data/videos.json chuẩn hoá qua schema
export const HISTORICAL_VIDEOS: Record<string, HistoricalVideoRecord> = (content.videos ?? []).reduce(
  (acc, v) => {
    acc[v.sceneId] = v;
    return acc;
  },
  {} as Record<string, HistoricalVideoRecord>
);
