import React from "react";
import { BackgroundKy0 } from "./backgrounds/BackgroundKy0";
import { BackgroundKy1 } from "./backgrounds/BackgroundKy1";
import { BackgroundKy2 } from "./backgrounds/BackgroundKy2";

interface SceneBackgroundProps {
  bgId: string;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ bgId }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none vn-scene-drift">
      <BackgroundKy0 bgId={bgId} />
      <BackgroundKy1 bgId={bgId} />
      <BackgroundKy2 bgId={bgId} />
    </div>
  );
};
