import React from "react";

/** Shared materials and lighting primitives for panoramic historical scenes. */
export const SharedBackgroundDefs: React.FC = () => (
  <>
    <pattern id="pattern-woodgrain" width="180" height="48" patternUnits="userSpaceOnUse">
      <rect width="180" height="48" fill="#2b1b12" />
      <path d="M0 10 C40 2 80 20 180 8 M0 30 C55 18 105 42 180 27" fill="none" stroke="#6b4227" strokeWidth="3" opacity="0.55" />
      <path d="M0 17 C55 10 110 28 180 15" fill="none" stroke="#160d08" strokeWidth="2" opacity="0.7" />
    </pattern>
    <pattern id="pattern-brick-wall" width="96" height="48" patternUnits="userSpaceOnUse">
      <rect width="96" height="48" fill="#49352d" />
      <path d="M0 1H96M0 47H96M1 0V24M49 0V24M95 0V24M25 24V48M73 24V48" fill="none" stroke="#1f1715" strokeWidth="3" opacity="0.75" />
      <path d="M3 5H45M52 5H91M28 29H68M76 29H92" stroke="#8b6653" strokeWidth="2" opacity="0.3" />
    </pattern>
    <pattern id="pattern-cobblestone" width="120" height="72" patternUnits="userSpaceOnUse">
      <rect width="120" height="72" fill="#20252a" />
      <path d="M0 18 Q30 4 60 18 T120 18 M-20 54 Q10 38 42 54 T104 54 T160 54 M28 0L18 36M84 0L74 36M52 36L42 72M108 36L98 72" fill="none" stroke="#64707a" strokeWidth="4" opacity="0.35" />
    </pattern>
    <pattern id="pattern-parchment" width="160" height="120" patternUnits="userSpaceOnUse">
      <rect width="160" height="120" fill="#c6a878" />
      <path d="M0 18 Q40 8 80 20 T160 14 M0 72 Q55 58 110 75 T160 68" fill="none" stroke="#7b5736" strokeWidth="2" opacity="0.18" />
      <circle cx="32" cy="48" r="2" fill="#6b4628" opacity="0.18" /><circle cx="132" cy="96" r="3" fill="#6b4628" opacity="0.16" />
    </pattern>
    <pattern id="pattern-encaustic-tile" width="96" height="96" patternUnits="userSpaceOnUse">
      <rect width="96" height="96" fill="#d9c2a0" />
      <path d="M48 4L92 48L48 92L4 48Z" fill="none" stroke="#8f4b39" strokeWidth="5" />
      <circle cx="48" cy="48" r="12" fill="none" stroke="#2d5360" strokeWidth="4" />
    </pattern>
    <filter id="filter-drop-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
      <feOffset dx="0" dy="12" result="offsetblur" />
      <feComponentTransfer><feFuncA type="linear" slope="0.48" /></feComponentTransfer>
      <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <filter id="filter-lantern-bloom" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="18" result="blur" />
      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.9  0 0.7 0 0 0.35  0 0 0.2 0 0  0 0 0 1 0" />
      <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
    <filter id="filter-water-reflection" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.015 0.08" numOctaves="2" seed="14" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="B" />
    </filter>
  </>
);
