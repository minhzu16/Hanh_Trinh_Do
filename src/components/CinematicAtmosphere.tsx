import React, { useMemo } from "react";

interface CinematicAtmosphereProps {
  bgId: string;
  chapterId?: string;
  prefersReducedMotion?: boolean;
}

export const CinematicAtmosphere: React.FC<CinematicAtmosphereProps> = React.memo(({
  bgId,
  chapterId = "k0",
  prefersReducedMotion = false
}) => {
  // Determine weather/atmosphere type based on scene
  const atmosphereType = useMemo(() => {
    switch (bgId) {
      case "bg-ga-paris-tuyet":
      case "bg-phong-tro-paris":
        return "snow";
      case "bg-boong-tau-dem":
      case "bg-xuong-may":
      case "bg-pho-kham-thien-dem":
        return "embers";
      case "bg-lop-hoc-van-minh":
      case "bg-lop-hoc-chieu":
      case "bg-phong-rang-sang":
        return "dust";
      case "bg-ben-cang-hong-kong":
      case "bg-boong-tau-binh-minh":
        return "mist";
      case "bg-quan-ca-phe":
      case "bg-hoi-truong-tours":
      case "bg-goc-phong-den-dau":
      default:
        return "warm-haze";
    }
  }, [bgId]);

  // Era color grading class
  const eraClass = useMemo(() => {
    if (chapterId === "k2") return "vn-era-grading-k2";
    if (chapterId === "k1") return "vn-era-grading-k1";
    return "vn-era-grading-k0";
  }, [chapterId]);

  if (prefersReducedMotion) {
    return (
      <div className={`absolute inset-0 pointer-events-none ${eraClass}`}>
        <div className="absolute inset-0 vn-texture-deai-overlay opacity-80" />
        <div className="absolute inset-0 vn-film-grain opacity-40" />
        <div className="absolute inset-0 vn-cinematic-vignette" />
        <div className="absolute inset-0 vn-chromatic-aberration" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-10 ${eraClass}`}>
      {/* De-AI Micro-Texture: Vân xơ giấy Dó và toan tranh dập chìm xóa bỏ độ nhựa bóng */}
      <div className="absolute inset-0 vn-texture-deai-overlay opacity-85" />
      {/* 1. Snow Particles (Paris Winter) */}
      {atmosphereType === "snow" && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => {
            const left = (i * 5.6 + (i % 3) * 2) % 100;
            const size = 2 + (i % 4) * 1.5;
            const duration = 5 + (i % 5) * 1.5;
            const delay = (i * 0.45) % 4;
            const opacity = 0.35 + (i % 4) * 0.15;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white vn-snow-particle"
                style={{
                  left: `${left}%`,
                  top: `-10px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`
                }}
              />
            );
          })}
        </div>
      )}

      {/* 2. Embers / Fiery Sparks / Coal Smoke Motes (Night Harbor & Factories) */}
      {atmosphereType === "embers" && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => {
            const left = 15 + (i * 5.2) % 75;
            const bottom = 5 + (i % 5) * 10;
            const size = 2 + (i % 3) * 1.8;
            const duration = 4.5 + (i % 4) * 1.2;
            const delay = (i * 0.5) % 3.5;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-amber-400 vn-ember-particle blur-[0.5px]"
                style={
                  {
                    left: `${left}%`,
                    bottom: `${bottom}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    boxShadow: "0 0 8px #f59e0b",
                    "--ember-dur": `${duration}s`,
                    "--ember-delay": `${delay}s`
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      )}

      {/* 3. Golden Dust Motes in Sunbeams (Classrooms & Meeting Rooms) */}
      {atmosphereType === "dust" && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => {
            const left = 20 + (i * 4.2) % 65;
            const top = 15 + (i * 4.8) % 65;
            const size = 2 + (i % 3) * 1.4;
            const duration = 6 + (i % 4) * 1.5;
            const delay = (i * 0.4) % 3;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-amber-200 vn-dust-mote blur-[0.4px]"
                style={
                  {
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    boxShadow: "0 0 6px #fde047",
                    "--dust-dur": `${duration}s`,
                    "--dust-delay": `${delay}s`
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      )}

      {/* 4. Rolling Sea and Harbor Mist (Hong Kong & Maritime Scenes) */}
      {atmosphereType === "mist" && (
        <div className="absolute bottom-0 left-0 right-0 h-72 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-10 -left-1/4 w-[150%] h-48 bg-gradient-to-t from-slate-200/15 via-slate-300/8 to-transparent blur-2xl vn-mist-roll" />
          <div className="absolute -bottom-16 -left-1/3 w-[160%] h-40 bg-gradient-to-t from-amber-100/10 via-amber-200/5 to-transparent blur-3xl vn-mist-roll [animation-delay:-9s]" />
        </div>
      )}

      {/* 5. Warm Haze & Lamp Radiance for Interiors */}
      {atmosphereType === "warm-haze" && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/8 blur-3xl vn-ambient-bloom" />
        </div>
      )}

      {/* 6. Authentic 1920s Vintage Film Grain Texture Overlay */}
      <div className="absolute inset-0 vn-film-grain opacity-55 mix-blend-overlay" />

      {/* 7. Cinematic Depth Vignette & Vintage Lens Chromatic Dispersion */}
      <div className="absolute inset-0 vn-cinematic-vignette" />
      <div className="absolute inset-0 vn-chromatic-aberration" />
    </div>
  );
});
