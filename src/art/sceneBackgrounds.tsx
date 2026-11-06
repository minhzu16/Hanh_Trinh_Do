import React from "react";
import { BackgroundKy0 } from "./backgrounds/BackgroundKy0";
import { BackgroundKy1 } from "./backgrounds/BackgroundKy1";
import { BackgroundKy2 } from "./backgrounds/BackgroundKy2";

interface SceneBackgroundProps {
  bgId: string;
}

const KY0_BGS = new Set([
  "bg-boong-tau-dem",
  "bg-phong-tro-paris",
  "bg-quan-ca-phe",
  "bg-hoi-truong-tours",
  "bg-ga-paris-tuyet"
]);

const KY1_BGS = new Set([
  "bg-ban-do-hanh-trinh",
  "bg-lop-hoc-van-minh",
  "bg-lop-hoc-chieu",
  "bg-xuong-may",
  "bg-pho-kham-thien-dem"
]);

export const SceneBackground: React.FC<SceneBackgroundProps> = React.memo(({ bgId }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none vn-scene-drift">
      {KY0_BGS.has(bgId) && <BackgroundKy0 bgId={bgId} />}
      {KY1_BGS.has(bgId) && <BackgroundKy1 bgId={bgId} />}
      {!KY0_BGS.has(bgId) && !KY1_BGS.has(bgId) && <BackgroundKy2 bgId={bgId} />}
    </div>
  );
});
