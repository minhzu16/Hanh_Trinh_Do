import React from "react";

interface SceneBackgroundProps {
  bgId: string;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ bgId }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none vn-scene-drift">
      {/* 1. bg-boong-tau-dem: Trên boong tàu Đô đốc Latouche-Tréville, đêm 1911 */}
      {bgId === "bg-boong-tau-dem" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="skyNight11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#050a14" />
              <stop offset="45%" stopColor="#0b1626" />
              <stop offset="100%" stopColor="#15263d" />
            </linearGradient>
            <linearGradient id="seaNight11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0d1b2a" />
              <stop offset="60%" stopColor="#07101a" />
              <stop offset="100%" stopColor="#03080e" />
            </linearGradient>
            <linearGradient id="deckWood11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#443226" />
              <stop offset="40%" stopColor="#32241b" />
              <stop offset="100%" stopColor="#19120e" />
            </linearGradient>
            <radialGradient id="moonGlow11" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#fef3c7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="lampGlow11" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep starry night sky */}
          <rect width="1920" height="660" fill="url(#skyNight11)" />

          {/* Stars */}
          <g opacity="0.85">
            <circle cx="180" cy="140" r="1.5" fill="#ffffff" />
            <circle cx="340" cy="75" r="2.2" fill="#ffffff" opacity="0.9" />
            <circle cx="560" cy="180" r="1.2" fill="#ffffff" opacity="0.6" />
            <circle cx="780" cy="110" r="1.8" fill="#ffffff" />
            <circle cx="950" cy="60" r="2" fill="#ffffff" opacity="0.9" />
            <circle cx="1180" cy="150" r="1.5" fill="#ffffff" />
            <circle cx="1360" cy="85" r="2" fill="#ffffff" opacity="0.85" />
            <circle cx="1540" cy="160" r="1.4" fill="#ffffff" opacity="0.7" />
            <circle cx="1720" cy="95" r="2.4" fill="#ffffff" />
            <circle cx="1850" cy="170" r="1.2" fill="#ffffff" opacity="0.6" />
          </g>

          {/* Crescent Moon & Atmospheric Halo */}
          <circle cx="1680" cy="140" r="85" fill="url(#moonGlow11)" />
          <circle cx="1680" cy="140" r="32" fill="#fef3c7" />
          <circle cx="1695" cy="132" r="28" fill="#0d1829" />

          {/* Steamship Latouche-Tréville twin smoke funnels in silhouette */}
          <path d="M720 340 L735 620 L810 620 L800 340 Z" fill="#141920" />
          <path d="M830 360 L842 620 L910 620 L900 360 Z" fill="#181e26" />
          <line x1="710" y1="365" x2="815" y2="365" stroke="#991b1b" strokeWidth="8" />
          <line x1="822" y1="385" x2="915" y2="385" stroke="#991b1b" strokeWidth="8" />

          {/* Billowing coal smoke trails */}
          <path d="M720 340 C650 290 520 280 400 320 C320 350 200 360 80 340" stroke="#1c2533" strokeWidth="48" strokeLinecap="round" opacity="0.35" fill="none" />
          <path d="M830 360 C760 300 640 290 500 340" stroke="#253244" strokeWidth="36" strokeLinecap="round" opacity="0.25" fill="none" />

          {/* Ship Mast & Rigging wires */}
          <rect x="1220" y="160" width="10" height="480" fill="#201a16" />
          <line x1="1225" y1="180" x2="680" y2="620" stroke="#1b232e" strokeWidth="2.5" opacity="0.6" />
          <line x1="1225" y1="260" x2="1600" y2="620" stroke="#1b232e" strokeWidth="2" opacity="0.5" />
          <line x1="1225" y1="210" x2="1820" y2="620" stroke="#1b232e" strokeWidth="2" opacity="0.4" />

          {/* Rolling dark ocean waves */}
          <rect y="600" width="1920" height="220" fill="url(#seaNight11)" />
          <g className="vn-wave-swell" opacity="0.6">
            <path d="M0 640 Q300 625 600 640 T1200 640 T1800 640 T1920 640" stroke="#1e3a5f" strokeWidth="3" fill="none" />
            <path d="M0 670 Q240 655 480 670 T960 670 T1440 670 T1920 670" stroke="#24446e" strokeWidth="2.5" fill="none" />
            <path d="M0 710 Q320 695 640 710 T1280 710 T1920 710" stroke="#1b3252" strokeWidth="2" fill="none" />
          </g>

          {/* Moon reflection shimmering track on the sea */}
          <ellipse cx="1680" cy="630" rx="45" ry="4" fill="#fef3c7" opacity="0.35" />
          <ellipse cx="1680" cy="650" rx="70" ry="5" fill="#fef3c7" opacity="0.25" />
          <ellipse cx="1680" cy="675" rx="100" ry="6" fill="#fef3c7" opacity="0.18" />
          <ellipse cx="1680" cy="705" rx="130" ry="8" fill="#fef3c7" opacity="0.12" />

          {/* Wooden Deck Planks in Perspective */}
          <polygon points="0,750 1920,680 1920,1080 0,1080" fill="url(#deckWood11)" />
          {/* Deck seams */}
          {[-400, -100, 200, 500, 800, 1100, 1400, 1700, 2000, 2300].map((x, i) => (
            <line key={i} x1={x} y1={750} x2={x - 220} y2={1080} stroke="#221812" strokeWidth="2" opacity="0.75" />
          ))}

          {/* Ship Bulwark and Railings */}
          <line x1="0" y1="720" x2="1920" y2="650" stroke="#854d0e" strokeWidth="12" />
          <line x1="0" y1="755" x2="1920" y2="685" stroke="#52361b" strokeWidth="7" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 102} y1={720 - i * 3.7} x2={i * 102} y2={785 - i * 3.3} stroke="#3e2918" strokeWidth="7" />
          ))}

          {/* Hanging Ship Brass Hurricane Lantern */}
          <g className="vn-lamp-flicker">
            <line x1="320" y1="520" x2="320" y2="590" stroke="#78350f" strokeWidth="4" />
            <circle cx="320" cy="640" r="240" fill="url(#lampGlow11)" />
            {/* Lantern frame */}
            <rect x="306" y="590" width="28" height="12" rx="3" fill="#92400e" />
            <path d="M302 602 L338 602 L334 650 L306 650 Z" fill="#fef08a" opacity="0.9" />
            <rect x="304" y="650" width="32" height="18" rx="4" fill="#78350f" />
            {/* Lantern glass guard wires */}
            <line x1="312" y1="602" x2="314" y2="650" stroke="#78350f" strokeWidth="2" />
            <line x1="328" y1="602" x2="326" y2="650" stroke="#78350f" strokeWidth="2" />
          </g>

          {/* Lifebuoy on bulkhead */}
          <g transform="translate(140, 770)">
            <ellipse cx="60" cy="60" rx="50" ry="50" fill="#991b1b" stroke="#fef3c7" strokeWidth="5" />
            <ellipse cx="60" cy="60" rx="26" ry="26" fill="#32241b" />
            <line x1="10" y1="60" x2="110" y2="60" stroke="#fef3c7" strokeWidth="6" />
            <line x1="60" y1="10" x2="60" y2="110" stroke="#fef3c7" strokeWidth="6" />
          </g>
        </svg>
      )}

      {/* 2. bg-phong-tro-paris: Căn phòng áp mái Paris, tháng 6/1919 */}
      {bgId === "bg-phong-tro-paris" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="parisSky19" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1329" />
              <stop offset="60%" stopColor="#3d2042" />
              <stop offset="100%" stopColor="#63314f" />
            </linearGradient>
            <linearGradient id="wallWood19" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#181310" />
              <stop offset="40%" stopColor="#2b1f18" />
              <stop offset="100%" stopColor="#1c1410" />
            </linearGradient>
            <radialGradient id="deskLamp19" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="65%" stopColor="#d97706" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Attic room walls with heavy rafters */}
          <rect width="1920" height="1080" fill="url(#wallWood19)" />

          {/* Slanted Mansard Roof & Exposed Timber Beams */}
          <polygon points="0,0 1280,0 680,1080 0,1080" fill="#140f0c" />
          <line x1="0" y1="0" x2="680" y2="1080" stroke="#3d2b20" strokeWidth="28" />
          <line x1="380" y1="0" x2="880" y2="1080" stroke="#322319" strokeWidth="20" />
          <line x1="0" y1="360" x2="850" y2="360" stroke="#3d2b20" strokeWidth="18" />

          {/* Large Dormer Attic Window looking out to Paris */}
          <polygon points="1220,110 1780,110 1780,720 1220,720" fill="url(#parisSky19)" />

          {/* Paris Zinc Rooftops & Chimney Pots outside */}
          <polygon points="1220,620 1340,540 1480,590 1590,520 1710,570 1780,530 1780,720 1220,720" fill="#1b1220" />
          <rect x="1310" y="510" width="18" height="40" fill="#150e19" />
          <rect x="1335" y="520" width="16" height="30" fill="#150e19" />
          <rect x="1570" y="490" width="22" height="42" fill="#150e19" />

          {/* Eiffel Tower Silhouette in Paris Evening Mist */}
          <path d="M1492 610 L1502 360 L1506 280 L1510 360 L1520 610 Z" fill="#140b18" opacity="0.8" />
          <line x1="1496" y1="480" x2="1516" y2="480" stroke="#140b18" strokeWidth="5" opacity="0.8" />
          <line x1="1490" y1="560" x2="1522" y2="560" stroke="#140b18" strokeWidth="7" opacity="0.8" />

          {/* Volumetric Moonbeam / Dusk Light Shaft through window */}
          <polygon points="1220,110 1780,110 1920,1080 920,1080" fill="#fcd34d" className="vn-light-shaft" />

          {/* Heavy Window Frame & Mullions */}
          <rect x="1205" y="95" width="590" height="640" fill="none" stroke="#4a3525" strokeWidth="26" />
          <line x1="1500" y1="95" x2="1500" y2="735" stroke="#4a3525" strokeWidth="16" />
          <line x1="1205" y1="415" x2="1795" y2="415" stroke="#4a3525" strokeWidth="16" />

          {/* Vintage Writing / Photography Retouching Desk */}
          <polygon points="120,780 1820,780 1920,1080 60,1080" fill="#2d1e16" />
          <polygon points="120,780 1820,780 1800,810 140,810" fill="#442e22" />

          {/* Vintage Bellows Folding Camera on Wooden Tripod */}
          <g transform="translate(420, 580)">
            {/* Tripod legs */}
            <line x1="90" y1="160" x2="20" y2="240" stroke="#78350f" strokeWidth="6" />
            <line x1="90" y1="160" x2="90" y2="240" stroke="#522507" strokeWidth="6" />
            <line x1="90" y1="160" x2="160" y2="240" stroke="#78350f" strokeWidth="6" />
            {/* Camera Body & Leather Bellows */}
            <rect x="55" y="80" width="70" height="80" rx="4" fill="#3f2314" stroke="#854d0e" strokeWidth="3" />
            <polygon points="125,95 180,110 180,140 125,155" fill="#1c1917" stroke="#78350f" strokeWidth="2" />
            {/* Brass lens */}
            <rect x="180" y="115" width="22" height="20" rx="3" fill="#d97706" />
            <circle cx="202" cy="125" r="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
          </g>

          {/* Manuscripts & Draft of 8-Point Claims on desk */}
          <g transform="translate(860, 810) rotate(-4)">
            <rect x="0" y="0" width="160" height="210" fill="#f5eedc" rx="3" stroke="#d5c7aa" strokeWidth="2" />
            <rect x="15" y="20" width="130" height="8" fill="#991b1b" />
            <line x1="20" y1="45" x2="140" y2="45" stroke="#44392e" strokeWidth="3" />
            <line x1="20" y1="65" x2="135" y2="65" stroke="#44392e" strokeWidth="2.5" />
            <line x1="20" y1="85" x2="140" y2="85" stroke="#44392e" strokeWidth="2.5" />
            <line x1="20" y1="105" x2="120" y2="105" stroke="#44392e" strokeWidth="2.5" />
          </g>
          {/* Second overlapping paper */}
          <g transform="translate(1010, 825) rotate(6)">
            <rect x="0" y="0" width="150" height="200" fill="#ede2cc" rx="3" stroke="#c8ba9a" strokeWidth="2" />
            <line x1="20" y1="30" x2="130" y2="30" stroke="#55483b" strokeWidth="2" />
            <line x1="20" y1="50" x2="125" y2="50" stroke="#55483b" strokeWidth="2" />
            <line x1="20" y1="70" x2="110" y2="70" stroke="#55483b" strokeWidth="2" />
          </g>

          {/* Kerosene Lamp glowing warmly on the desk */}
          <g className="vn-lamp-flicker">
            <circle cx="1280" cy="740" r="280" fill="url(#deskLamp19)" />
            {/* Lamp base & glass chimney */}
            <ellipse cx="1280" cy="800" rx="32" ry="12" fill="#78350f" />
            <path d="M1264 800 Q1260 760 1268 740 L1292 740 Q1300 760 1296 800 Z" fill="#b45309" />
            <ellipse cx="1280" cy="735" rx="14" ry="25" fill="#fef08a" opacity="0.9" />
            <path d="M1272 735 L1275 660 L1285 660 L1288 735 Z" fill="#ffffff" opacity="0.45" />
          </g>

          {/* Ink bottles and retouching pens */}
          <rect x="760" y="840" width="28" height="38" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <line x1="774" y1="835" x2="774" y2="820" stroke="#92400e" strokeWidth="4" />
          <line x1="730" y1="870" x2="780" y2="830" stroke="#b45309" strokeWidth="3" />
        </svg>
      )}

      {/* 3. bg-quan-ca-phe: Quán cà phê Paris, tháng 7/1920: Đọc tờ báo Nhân đạo */}
      {bgId === "bg-quan-ca-phe" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="cafeWall20" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c1a16" />
              <stop offset="50%" stopColor="#211310" />
              <stop offset="100%" stopColor="#140a08" />
            </linearGradient>
            <radialGradient id="cafeChandelier20" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="marbleTable20" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f382a" />
              <stop offset="50%" stopColor="#5d4333" />
              <stop offset="100%" stopColor="#3d2b20" />
            </linearGradient>
          </defs>

          {/* Classic Parisian cafe wood-paneled walls */}
          <rect width="1920" height="1080" fill="url(#cafeWall20)" />

          {/* Wainscoting Panels & Decorative Mouldings */}
          {Array.from({ length: 11 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 175 + 30}, 160)`}>
              <rect width="145" height="520" fill="#3a231b" rx="6" stroke="#4f3126" strokeWidth="4" />
              <rect x="14" y="20" width="117" height="480" fill="#291812" rx="4" stroke="#523428" strokeWidth="2" />
            </g>
          ))}

          {/* Large Belle Époque Wall Mirrors */}
          <rect x="420" y="200" width="340" height="420" rx="8" fill="#1b1d22" stroke="#b45309" strokeWidth="8" opacity="0.85" />
          <path d="M440 220 L740 600" stroke="#fcd34d" strokeWidth="1.5" opacity="0.15" />

          <rect x="1160" y="200" width="340" height="420" rx="8" fill="#1b1d22" stroke="#b45309" strokeWidth="8" opacity="0.85" />
          <path d="M1180 220 L1480 600" stroke="#fcd34d" strokeWidth="1.5" opacity="0.15" />

          {/* Glowing Wall Sconces & Chandeliers */}
          <g className="vn-lamp-flicker">
            <circle cx="590" cy="190" r="260" fill="url(#cafeChandelier20)" />
            <ellipse cx="590" cy="180" rx="16" ry="12" fill="#fef08a" />
            <path d="M575 190 Q590 230 605 190 Z" fill="#92400e" />

            <circle cx="1330" cy="190" r="260" fill="url(#cafeChandelier20)" />
            <ellipse cx="1330" cy="180" rx="16" ry="12" fill="#fef08a" />
            <path d="M1315 190 Q1330 230 1345 190 Z" fill="#92400e" />
          </g>

          {/* Round Mahogany / Marble Cafe Table */}
          <ellipse cx="960" cy="940" rx="720" ry="260" fill="#21140e" />
          <ellipse cx="960" cy="920" rx="690" ry="240" fill="url(#marbleTable20)" stroke="#78350f" strokeWidth="8" />

          {/* Folded Newspaper: L'Humanité (16-17/7/1920) */}
          <g transform="translate(680, 810) rotate(-6)">
            {/* Shadow */}
            <polygon points="-5,12 375,12 435,162 25,162" fill="#140a08" opacity="0.6" />
            {/* Paper body */}
            <polygon points="0,0 360,0 410,140 20,140" fill="#f4ebd9" stroke="#d5c3a3" strokeWidth="2" />
            {/* Masthead Banner: L'HUMANITÉ */}
            <rect x="25" y="16" width="310" height="26" fill="#881337" rx="3" />
            <text x="40" y="35" fill="#fef2f2" fontSize="17" fontFamily="serif" fontWeight="bold" letterSpacing="4">
              L'HUMANITÉ
            </text>
            <text x="210" y="34" fill="#fecdd3" fontSize="10" fontFamily="sans-serif">
              16-17 JUILLET 1920
            </text>
            {/* Sơ thảo Luận cương của Lênin headline */}
            <rect x="28" y="52" width="220" height="8" fill="#1f2937" />
            <rect x="28" y="66" width="340" height="5" fill="#4b5563" />
            <line x1="28" y1="80" x2="360" y2="80" stroke="#6b7280" strokeWidth="2" />
            <line x1="28" y1="92" x2="350" y2="92" stroke="#6b7280" strokeWidth="2" />
            <line x1="28" y1="104" x2="340" y2="104" stroke="#6b7280" strokeWidth="2" />
            <line x1="28" y1="116" x2="280" y2="116" stroke="#6b7280" strokeWidth="2" />
          </g>

          {/* Vintage Porcelain Cup of Cafe au Lait & Brass Spoon */}
          <g transform="translate(1180, 850)">
            <ellipse cx="60" cy="50" rx="46" ry="24" fill="#faf5ef" stroke="#d4c3b3" strokeWidth="3" />
            <ellipse cx="60" cy="46" rx="34" ry="18" fill="#78350f" />
            <ellipse cx="60" cy="46" rx="28" ry="14" fill="#542307" />
            {/* Spoon */}
            <line x1="10" y1="70" x2="80" y2="30" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {/* 4. bg-hoi-truong-tours: Đại hội Đảng Xã hội Pháp ở Tours, tháng 12/1920 */}
      {bgId === "bg-hoi-truong-tours" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="toursHall4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1217" />
              <stop offset="50%" stopColor="#291a22" />
              <stop offset="100%" stopColor="#140c11" />
            </linearGradient>
            <radialGradient id="toursChandelier4" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Monumental Congress Hall Walls */}
          <rect width="1920" height="1080" fill="url(#toursHall4)" />

          {/* Neoclassical Arches & High Ribbed Vaults */}
          <path d="M120 720 L120 280 Q960 40 1800 280 L1800 720 Z" fill="#24171f" opacity="0.85" />
          <path d="M260 720 L260 360 Q960 140 1660 360 L1660 720 Z" fill="#1b1016" opacity="0.9" />

          {/* Stone Columns / Pilasters */}
          <rect x="220" y="240" width="70" height="500" fill="#35232d" />
          <rect x="1630" y="240" width="70" height="500" fill="#35232d" />
          <rect x="520" y="200" width="45" height="540" fill="#2d1c25" opacity="0.6" />
          <rect x="1355" y="200" width="45" height="540" fill="#2d1c25" opacity="0.6" />

          {/* Velvet Crimson Congress Banners hanging from balconies */}
          <g opacity="0.9">
            <polygon points="340,160 520,160 500,560 430,500 360,560" fill="#881337" />
            <polygon points="360,180 500,180 485,530 430,480 375,530" fill="#9f1239" />
            <line x1="340" y1="160" x2="520" y2="160" stroke="#fcd34d" strokeWidth="8" />

            <polygon points="1400,160 1580,160 1560,560 1490,500 1420,560" fill="#881337" />
            <polygon points="1420,180 1560,180 1545,530 1490,480 1435,530" fill="#9f1239" />
            <line x1="1400" y1="160" x2="1580" y2="160" stroke="#fcd34d" strokeWidth="8" />
          </g>

          {/* Ornate Crystal Chandeliers radiating warm light */}
          <circle cx="960" cy="180" r="380" fill="url(#toursChandelier4)" />
          <line x1="960" y1="0" x2="960" y2="120" stroke="#f59e0b" strokeWidth="4" />
          <ellipse cx="960" cy="120" rx="90" ry="24" fill="#d97706" />
          <path d="M880 120 Q960 210 1040 120 Z" fill="#fef08a" opacity="0.8" />

          {/* Side chandeliers */}
          <circle cx="480" cy="220" r="220" fill="url(#toursChandelier4)" opacity="0.6" />
          <circle cx="1440" cy="220" r="220" fill="url(#toursChandelier4)" opacity="0.6" />

          {/* Speaker's Elevated Podium */}
          <polygon points="720,520 1200,520 1280,740 640,740" fill="#3b241c" stroke="#5c382a" strokeWidth="6" />
          <polygon points="780,480 1140,480 1160,520 760,520" fill="#4d3025" />
          {/* Lectern on podium */}
          <rect x="910" y="440" width="100" height="70" fill="#633c2a" rx="4" />
          <polygon points="900,440 1020,440 1010,410 910,410" fill="#7a4b35" />

          {/* Massive Rows of Seated Delegates (Dark atmospheric silhouettes) */}
          <ellipse cx="960" cy="840" rx="880" ry="180" fill="#190e16" />
          <ellipse cx="960" cy="940" rx="980" ry="200" fill="#120910" />
          <ellipse cx="960" cy="1040" rx="1040" ry="200" fill="#0c050a" />

          {/* Silhouettes of delegate heads */}
          {Array.from({ length: 32 }).map((_, i) => (
            <circle key={i} cx={120 + i * 54} cy={760 + ((i % 5) * 8)} r={18} fill="#140a11" />
          ))}
          {Array.from({ length: 36 }).map((_, i) => (
            <circle key={i} cx={80 + i * 50} cy={860 + ((i % 4) * 10)} r={22} fill="#0d060b" />
          ))}
        </svg>
      )}

      {/* 5. bg-ga-paris-tuyet: Ga xe lửa tuyết trắng, tháng 6/1923 */}
      {bgId === "bg-ga-paris-tuyet" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="snowSky5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141a24" />
              <stop offset="60%" stopColor="#283344" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="snowGround5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="40%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>

          {/* Winter slate twilight sky */}
          <rect width="1920" height="700" fill="url(#snowSky5)" />

          {/* Victorian Arched Iron-and-Glass Train Shed Trusses */}
          <path d="M80 700 Q960 60 1840 700" stroke="#1e2634" strokeWidth="32" fill="none" />
          <path d="M260 700 Q960 180 1660 700" stroke="#1e2634" strokeWidth="22" fill="none" />
          {/* Iron cross-ribs */}
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 13) * Math.PI;
            const x = 960 - Math.cos(angle) * 780;
            const y = 620 - Math.sin(angle) * 440;
            return <line key={i} x1={960} y1={120} x2={x} y2={y} stroke="#334155" strokeWidth="4" opacity="0.6" />;
          })}

          {/* Majestic Steam Locomotive Silhouette */}
          <g transform="translate(680, 420)">
            {/* Boiler & Cab */}
            <rect x="40" y="100" width="460" height="180" rx="20" fill="#0f172a" />
            <rect x="420" y="40" width="160" height="240" rx="10" fill="#0f172a" />
            {/* Smoke stack */}
            <rect x="110" y="40" width="50" height="80" rx="6" fill="#1e293b" />
            {/* Huge billowing white/grey steam clouds */}
            <path d="M120 40 C70 -40 20 -100 -50 -70 C-120 -40 -180 -120 -260 -90" stroke="#e2e8f0" strokeWidth="60" strokeLinecap="round" opacity="0.4" fill="none" />
            <path d="M140 30 C190 -60 260 -90 340 -60" stroke="#cbd5e1" strokeWidth="50" strokeLinecap="round" opacity="0.3" fill="none" />
            {/* Locomotive glowing brass headlamp cutting the snow */}
            <circle cx="50" cy="180" r="28" fill="#fef08a" />
            <polygon points="50,180 -380,80 -380,280" fill="#fef08a" opacity="0.15" />
            {/* Massive iron driving wheels */}
            <circle cx="160" cy="280" r="54" fill="#1e293b" stroke="#475569" strokeWidth="8" />
            <circle cx="300" cy="280" r="54" fill="#1e293b" stroke="#475569" strokeWidth="8" />
            <circle cx="440" cy="280" r="54" fill="#1e293b" stroke="#475569" strokeWidth="8" />
            <line x1="160" y1="280" x2="440" y2="280" stroke="#94a3b8" strokeWidth="12" />
          </g>

          {/* Snow-covered Station Platform & Railway Tracks */}
          <rect y="700" width="1920" height="380" fill="url(#snowGround5)" />
          {/* Iron rails */}
          <line x1="0" y1="720" x2="1920" y2="720" stroke="#475569" strokeWidth="12" />
          <line x1="0" y1="755" x2="1920" y2="755" stroke="#334155" strokeWidth="10" />

          {/* Platform Victorian Cast-Iron Gas Lantern Post */}
          <g transform="translate(360, 480)">
            <line x1="0" y1="0" x2="0" y2="280" stroke="#1e293b" strokeWidth="14" />
            <rect x="-24" y="-30" width="48" height="50" rx="8" fill="#fef08a" />
            <circle cx="0" cy="-5" r="140" fill="#fef08a" opacity="0.18" />
          </g>

          {/* Drifting Snow Particles with animations */}
          <g>
            {Array.from({ length: 48 }).map((_, i) => (
              <circle
                key={i}
                cx={(i * 47) % 1920}
                cy={(i * 31) % 720}
                r={(i % 3) + 2}
                fill="#ffffff"
                className="vn-snow-particle"
                style={{ animationDelay: `${(i % 10) * 0.7}s` }}
              />
            ))}
          </g>
        </svg>
      )}

      {/* 6. bg-ban-do-hanh-trinh: Bản đồ cổ từ Paris qua Mátxcơva đến Quảng Châu */}
      {bgId === "bg-ban-do-hanh-trinh" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="mapParchment6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c1e16" />
              <stop offset="50%" stopColor="#3d2b20" />
              <stop offset="100%" stopColor="#241912" />
            </linearGradient>
            <radialGradient id="vignetteMap6" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
            </radialGradient>
          </defs>

          {/* Aged parchment leather surface */}
          <rect width="1920" height="1080" fill="url(#mapParchment6)" />

          {/* Vintage Nautical Coordinate Grid & Rhumb Lines */}
          <circle cx="960" cy="540" r="460" stroke="#71513a" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.45" />
          <circle cx="960" cy="540" r="300" stroke="#71513a" strokeWidth="1.5" strokeDasharray="6,6" fill="none" opacity="0.35" />
          <line x1="100" y1="540" x2="1820" y2="540" stroke="#71513a" strokeWidth="1.5" opacity="0.35" />
          <line x1="960" y1="80" x2="960" y2="1000" stroke="#71513a" strokeWidth="1.5" opacity="0.35" />
          <line x1="200" y1="140" x2="1720" y2="940" stroke="#71513a" strokeWidth="1" opacity="0.25" />
          <line x1="200" y1="940" x2="1720" y2="140" stroke="#71513a" strokeWidth="1" opacity="0.25" />

          {/* Elaborate 16-point Compass Rose (Hoa tiêu) */}
          <g transform="translate(1620, 260) scale(1.1)">
            <circle cx="0" cy="0" r="75" stroke="#c8a24a" strokeWidth="2" fill="none" opacity="0.6" />
            {/* North Point */}
            <polygon points="0,-90 -16,-10 0,0" fill="#9e1b1b" />
            <polygon points="0,-90 16,-10 0,0" fill="#dc2626" />
            {/* South Point */}
            <polygon points="0,90 -16,10 0,0" fill="#523826" />
            <polygon points="0,90 16,10 0,0" fill="#785338" />
            {/* East / West */}
            <polygon points="90,0 10,-16 0,0" fill="#c8a24a" />
            <polygon points="90,0 10,16 0,0" fill="#eab308" />
            <polygon points="-90,0 -10,-16 0,0" fill="#523826" />
            <polygon points="-90,0 -10,16 0,0" fill="#785338" />
            <text x="-6" y="-102" fill="#c8a24a" fontSize="20" fontFamily="serif" fontWeight="bold">N</text>
          </g>

          {/* Continents Silhouettes (Europe & Asia) */}
          <path
            d="M320 480 Q450 340 650 360 Q760 280 980 320 Q1240 260 1480 360 Q1720 520 1640 760 Q1420 860 1180 760 Q940 740 680 700 Q480 660 320 480 Z"
            fill="#4a3528"
            opacity="0.8"
            stroke="#634734"
            strokeWidth="3"
          />

          {/* Glowing Historical Voyage Route */}
          <path
            d="M440 460 Q720 340 880 350 Q1160 480 1380 640"
            stroke="#c8a24a"
            strokeWidth="6"
            strokeDasharray="14,10"
            fill="none"
          />

          {/* Waypoints with glowing nodes & rich typography */}
          {/* 1. Paris */}
          <g transform="translate(440, 460)">
            <circle cx="0" cy="0" r="14" fill="#9e1b1b" stroke="#f3ead7" strokeWidth="4" />
            <circle cx="0" cy="0" r="26" stroke="#9e1b1b" strokeWidth="2" strokeDasharray="4,4" fill="none" opacity="0.7" />
            <text x="-30" y="-28" fill="#f3ead7" fontSize="22" fontFamily="serif" fontWeight="bold">
              Paris (6/1923)
            </text>
            <text x="-30" y="-8" fill="#c8a24a" fontSize="15" fontFamily="serif" fontStyle="italic">
              Rời Pháp bí mật
            </text>
          </g>

          {/* 2. Mátxcơva */}
          <g transform="translate(880, 350)">
            <circle cx="0" cy="0" r="14" fill="#9e1b1b" stroke="#f3ead7" strokeWidth="4" />
            <circle cx="0" cy="0" r="26" stroke="#9e1b1b" strokeWidth="2" strokeDasharray="4,4" fill="none" opacity="0.7" />
            <text x="-50" y="-30" fill="#f3ead7" fontSize="22" fontFamily="serif" fontWeight="bold">
              Mátxcơva (1923–1924)
            </text>
            <text x="-50" y="-10" fill="#c8a24a" fontSize="15" fontFamily="serif" fontStyle="italic">
              Đại hội V Quốc tế Cộng sản
            </text>
          </g>

          {/* 3. Quảng Châu */}
          <g transform="translate(1380, 640)">
            <circle cx="0" cy="0" r="18" fill="#c8a24a" stroke="#9e1b1b" strokeWidth="5" />
            <circle cx="0" cy="0" r="32" stroke="#c8a24a" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.8" />
            <text x="-40" y="45" fill="#fcd34d" fontSize="26" fontFamily="serif" fontWeight="bold">
              Quảng Châu (11/1924)
            </text>
            <text x="-40" y="70" fill="#f3ead7" fontSize="16" fontFamily="serif" fontStyle="italic">
              Hạt giống cách mạng nảy mầm
            </text>
          </g>

          {/* Dark Vignette Frame */}
          <rect width="1920" height="1080" fill="url(#vignetteMap6)" />
        </svg>
      )}

      {/* 7. bg-lop-hoc-van-minh: Lớp huấn luyện Quảng Châu (1925–1927) */}
      {bgId === "bg-lop-hoc-van-minh" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="classroomWall7" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#32241b" />
              <stop offset="60%" stopColor="#241912" />
              <stop offset="100%" stopColor="#1a110b" />
            </linearGradient>
            <linearGradient id="sunbeam7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#fde047" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Colonial wooden classroom interior */}
          <rect width="1920" height="1080" fill="url(#classroomWall7)" />

          {/* Heavy Ceiling Beams & Vintage 3-Blade Ceiling Fan */}
          <line x1="0" y1="120" x2="1920" y2="120" stroke="#1d130e" strokeWidth="32" />
          <g transform="translate(960, 120)">
            <line x1="0" y1="0" x2="0" y2="70" stroke="#475569" strokeWidth="8" />
            <circle cx="0" cy="70" r="24" fill="#1e293b" />
            <ellipse cx="-80" cy="70" rx="70" ry="8" fill="#334155" />
            <ellipse cx="80" cy="70" rx="70" ry="8" fill="#334155" />
            <ellipse cx="0" cy="110" rx="8" ry="40" fill="#1e293b" />
          </g>

          {/* French Colonial Green Louvered Windows (Cửa chớp lá sách) */}
          <g transform="translate(1380, 150)">
            <rect width="420" height="580" fill="#1b2a22" stroke="#3d2719" strokeWidth="18" rx="6" />
            {/* Louver slats */}
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={i} x1={20} y1={30 + i * 28} x2={390} y2={45 + i * 28} stroke="#2a4536" strokeWidth="10" />
            ))}
          </g>

          {/* Volumetric Warm Southern Sunbeams Streaming Through Louvers */}
          <polygon points="1380,150 1800,150 1920,950 1020,950" fill="url(#sunbeam7)" className="vn-light-shaft" />

          {/* Historical Blackboard with Đường Cách mệnh Principles */}
          <g transform="translate(360, 180)">
            {/* Wooden frame with brass corner brackets */}
            <rect width="900" height="480" fill="#1c2621" stroke="#5a3d28" strokeWidth="22" rx="12" />
            <rect x="15" y="15" width="870" height="450" fill="#17221d" rx="6" />
            {/* Title */}
            <text x="435" y="90" fill="#fef3c7" fontSize="38" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="3">
              ĐƯỜNG CÁCH MỆNH (1927)
            </text>
            <line x1="160" y1="115" x2="710" y2="115" stroke="#ca8a04" strokeWidth="3" />
            {/* Core Teaching Points */}
            <text x="70" y="175" fill="#fde68a" fontSize="24" fontFamily="serif">
              ✦ Cách mệnh trước hết phải có ĐẢNG CÁCH MỆNH.
            </text>
            <text x="70" y="235" fill="#fde68a" fontSize="24" fontFamily="serif">
              ✦ CÔNG NÔNG là người chủ cách mệnh, là GỐC cách mệnh.
            </text>
            <text x="70" y="295" fill="#fde68a" fontSize="24" fontFamily="serif">
              ✦ Học trò, nhà buôn, điền chủ nhỏ là BẦU BẠN cách mệnh.
            </text>
            <text x="70" y="355" fill="#fde68a" fontSize="24" fontFamily="serif">
              ✦ Cách mệnh là việc chung của CẢ DÂN CHÚNG.
            </text>
            {/* Chalk tray */}
            <rect x="0" y="475" width="900" height="18" fill="#3d2719" />
            <rect x="240" y="478" width="45" height="10" fill="#fef3c7" rx="2" />
          </g>

          {/* Long Wooden Student Desks */}
          <polygon points="80,820 1840,820 1920,1080 0,1080" fill="#2d1d15" />
          <line x1="80" y1="820" x2="1840" y2="820" stroke="#523522" strokeWidth="12" />

          {/* Gelatin hectograph printing tray & Newspaper "Thanh Niên" */}
          <g transform="translate(180, 840)">
            <rect width="180" height="130" fill="#442a1b" stroke="#78350f" strokeWidth="4" rx="4" />
            {/* Paper sheet */}
            <rect x="15" y="15" width="150" height="100" fill="#fef3c7" rx="2" />
            <text x="30" y="45" fill="#991b1b" fontSize="16" fontFamily="serif" fontWeight="bold">
              THANH NIÊN
            </text>
            <line x1="30" y1="60" x2="145" y2="60" stroke="#334155" strokeWidth="2" />
            <line x1="30" y1="75" x2="135" y2="75" stroke="#334155" strokeWidth="2" />
            {/* Ink roller */}
            <rect x="160" y="40" width="16" height="60" rx="3" fill="#0f172a" />
            <line x1="168" y1="20" x2="168" y2="120" stroke="#94a3b8" strokeWidth="4" />
          </g>
        </svg>
      )}

      {/* 8. bg-lop-hoc-chieu: Lớp học chiều tà Quảng Châu */}
      {bgId === "bg-lop-hoc-chieu" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="sunsetSky8" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#431407" />
              <stop offset="45%" stopColor="#7c2d12" />
              <stop offset="75%" stopColor="#c2410c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="sunsetFloor8" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d1d11" />
              <stop offset="100%" stopColor="#1c0b05" />
            </linearGradient>
          </defs>

          {/* Sunset room wall */}
          <rect width="1920" height="1080" fill="url(#sunsetSky8)" opacity="0.95" />

          {/* Dramatic Diagonal Golden Sunset Rays */}
          <polygon points="0,180 1480,450 1480,950 0,980" fill="#fba742" opacity="0.22" />

          {/* Window opening overlooking southern sunset */}
          <rect x="1350" y="100" width="460" height="620" fill="none" stroke="#2c1007" strokeWidth="26" />
          <line x1="1580" y1="100" x2="1580" y2="720" stroke="#2c1007" strokeWidth="16" />
          <line x1="1350" y1="410" x2="1810" y2="410" stroke="#2c1007" strokeWidth="16" />

          {/* Blackboard silhouetted with the legendary nautical quote */}
          <g transform="translate(360, 200)">
            <rect width="900" height="460" fill="#1a1412" stroke="#431407" strokeWidth="20" rx="10" />
            <text x="450" y="160" fill="#fed7aa" fontSize="32" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              "Đảng có vững cách mệnh mới thành công,"
            </text>
            <text x="450" y="240" fill="#fed7aa" fontSize="32" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              "cũng như người cầm lái có vững thuyền mới chạy."
            </text>
            <line x1="280" y1="310" x2="620" y2="310" stroke="#f97316" strokeWidth="2.5" />
            <text x="450" y="360" fill="#fdba74" fontSize="22" fontFamily="serif" textAnchor="middle">
              — Nguyễn Ái Quốc (Đường Cách mệnh, 1927) —
            </text>
          </g>

          {/* Teacher's podium and wooden floor with long shadows */}
          <polygon points="0,780 1920,780 1920,1080 0,1080" fill="url(#sunsetFloor8)" />
          <polygon points="820,740 1100,740 1140,880 780,880" fill="#2a1209" />
        </svg>
      )}

      {/* 9. bg-xuong-may: Xưởng máy dệt / Xi măng Hải Phòng (Vô sản hoá 1928) */}
      {bgId === "bg-xuong-may" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="factorySky9" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Grimy industrial factory walls */}
          <rect width="1920" height="1080" fill="#181e26" />

          {/* Industrial Sawtooth Roof (Mái răng cưa công xưởng) */}
          <polygon points="0,0 480,240 480,0 960,240 960,0 1440,240 1440,0 1920,240 1920,0 1920,540 0,540" fill="#0f141a" />
          {/* Glass skylight panes on north slopes */}
          <polygon points="0,0 480,240 480,200 0,0" fill="#475569" opacity="0.3" />
          <polygon points="480,0 960,240 960,200 480,0" fill="#475569" opacity="0.3" />
          <polygon points="960,0 1440,240 1440,200 960,0" fill="#475569" opacity="0.3" />

          {/* Overhead Iron Drive Shafts, Pulleys & Leather Belts */}
          <line x1="0" y1="260" x2="1920" y2="260" stroke="#334155" strokeWidth="18" />
          {/* Belt 1 */}
          <line x1="380" y1="260" x2="520" y2="720" stroke="#475569" strokeWidth="12" />
          <line x1="420" y1="260" x2="560" y2="720" stroke="#475569" strokeWidth="12" />
          <circle cx="400" cy="260" r="50" fill="#64748b" stroke="#1e293b" strokeWidth="8" />
          <circle cx="540" cy="720" r="75" fill="#64748b" stroke="#1e293b" strokeWidth="10" />

          {/* Belt 2 */}
          <line x1="1280" y1="260" x2="1400" y2="700" stroke="#475569" strokeWidth="12" />
          <line x1="1320" y1="260" x2="1440" y2="700" stroke="#475569" strokeWidth="12" />
          <circle cx="1300" cy="260" r="50" fill="#64748b" stroke="#1e293b" strokeWidth="8" />
          <circle cx="1420" cy="700" r="75" fill="#64748b" stroke="#1e293b" strokeWidth="10" />

          {/* Industrial Steam & Soot Haze */}
          <ellipse cx="960" cy="620" rx="880" ry="240" fill="#334155" opacity="0.35" />

          {/* Hanging Bare Incandescent Bulbs with Wire Cages */}
          <g className="vn-lamp-flicker">
            <line x1="840" y1="0" x2="840" y2="380" stroke="#000000" strokeWidth="4" />
            <circle cx="840" cy="400" r="160" fill="#fef08a" opacity="0.22" />
            <circle cx="840" cy="390" r="16" fill="#fef08a" />
          </g>

          {/* Mechanical Looms / Cotton Textile Machines on factory floor */}
          <polygon points="0,700 1920,700 1920,1080 0,1080" fill="#0d1116" />
          <rect x="740" y="580" width="440" height="180" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="6" />
          {/* Thread bobbins */}
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={765 + i * 50} y="540" width="28" height="40" rx="4" fill="#cbd5e1" opacity="0.8" />
          ))}
        </svg>
      )}

      {/* 10. bg-pho-kham-thien-dem: Phố Khâm Thiên đêm mùa xuân 1929 */}
      {bgId === "bg-pho-kham-thien-dem" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="hanoiNightSky10" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#090c13" />
              <stop offset="60%" stopColor="#141a24" />
              <stop offset="100%" stopColor="#1a2332" />
            </linearGradient>
            <radialGradient id="houseGlow10" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Hanoi Rainy Night Sky */}
          <rect width="1920" height="1080" fill="url(#hanoiNightSky10)" />

          {/* Hanoi Old Quarter Undulating Tiled Roofs (Mái ngói ta âm dương) */}
          <path
            d="M0 480 Q180 430 360 450 Q560 380 780 430 Q1000 350 1220 420 Q1460 360 1680 410 Q1820 370 1920 400 L1920 1080 L0 1080 Z"
            fill="#161214"
          />
          {/* Weathered yellow colonial walls */}
          <rect x="740" y="440" width="440" height="340" fill="#3f321d" stroke="#1f180f" strokeWidth="8" />

          {/* The Secret Meeting Room Window (Chi bộ 5D Hàm Long / 312 Khâm Thiên) */}
          <rect x="880" y="480" width="160" height="180" fill="#1c140e" stroke="#52391b" strokeWidth="8" rx="4" />
          <g className="vn-lamp-flicker">
            <circle cx="960" cy="570" r="280" fill="url(#houseGlow10)" />
            {/* Window pane with sheer curtain */}
            <rect x="895" y="495" width="130" height="150" fill="#f59e0b" opacity="0.92" rx="2" />
            {/* Window wooden grid */}
            <line x1="960" y1="495" x2="960" y2="645" stroke="#3d2815" strokeWidth="6" />
            <line x1="895" y1="570" x2="1025" y2="570" stroke="#3d2815" strokeWidth="6" />
            {/* Shadows of comrades conferring inside */}
            <ellipse cx="935" cy="580" rx="18" ry="24" fill="#2d1c0e" opacity="0.8" />
            <ellipse cx="985" cy="580" rx="18" ry="24" fill="#2d1c0e" opacity="0.8" />
          </g>

          {/* Wet Cobblestone Street reflecting the night glow */}
          <polygon points="0,760 1920,740 1920,1080 0,1080" fill="#120e10" />
          {/* Water puddle reflection */}
          <ellipse cx="960" cy="880" rx="360" ry="40" fill="#f59e0b" opacity="0.12" />

          {/* Street French Gas Lantern on wrought-iron bracket */}
          <g transform="translate(240, 520)">
            <path d="M-40 120 L20 60 L20 0" stroke="#334155" strokeWidth="8" fill="none" />
            <polygon points="5,-40 35,-40 45,20 -5,20" fill="#fef08a" opacity="0.85" />
            <circle cx="20" cy="-10" r="140" fill="url(#houseGlow10)" opacity="0.5" />
          </g>
        </svg>
      )}

      {/* 11. bg-ben-cang-hong-kong: Bến cảng Hồng Kông, mùa đông 1929 */}
      {bgId === "bg-ben-cang-hong-kong" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="hkSky11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#111622" />
              <stop offset="50%" stopColor="#212a3d" />
              <stop offset="100%" stopColor="#37455d" />
            </linearGradient>
            <linearGradient id="hkWater11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141c27" />
              <stop offset="100%" stopColor="#080c12" />
            </linearGradient>
          </defs>

          {/* Cold December harbor sky */}
          <rect width="1920" height="1080" fill="url(#hkSky11)" />

          {/* Victoria Peak Mountain Ridge in Winter Mist */}
          <path
            d="M0 560 Q340 310 760 340 Q1180 220 1560 380 Q1780 440 1920 480 L1920 720 L0 720 Z"
            fill="#0f1622"
            opacity="0.8"
          />

          {/* Victoria Harbour Waters */}
          <rect y="680" width="1920" height="400" fill="url(#hkWater11)" />

          {/* Animated Water Ripples */}
          <g className="vn-wave-swell" opacity="0.6">
            <line x1="200" y1="740" x2="680" y2="740" stroke="#475569" strokeWidth="2" />
            <line x1="840" y1="780" x2="1480" y2="780" stroke="#475569" strokeWidth="2.5" />
            <line x1="120" y1="840" x2="940" y2="840" stroke="#334155" strokeWidth="3" />
          </g>

          {/* Traditional Cantonese Junk Boat with Ribbed Batten Sails */}
          <g transform="translate(1240, 560)">
            {/* Hull */}
            <polygon points="0,170 180,170 210,210 -30,210" fill="#2b1b14" stroke="#442a1f" strokeWidth="3" />
            {/* Main mast & Battened fan sail */}
            <line x1="90" y1="20" x2="90" y2="170" stroke="#5c3826" strokeWidth="6" />
            <polygon points="90,25 180,70 170,165 90,165" fill="#994d2c" opacity="0.85" />
            {/* Bamboo battens */}
            <line x1="90" y1="55" x2="175" y2="85" stroke="#3d2114" strokeWidth="2.5" />
            <line x1="90" y1="90" x2="175" y2="115" stroke="#3d2114" strokeWidth="2.5" />
            <line x1="90" y1="125" x2="172" y2="140" stroke="#3d2114" strokeWidth="2.5" />
            {/* Fore mast & sail */}
            <line x1="25" y1="60" x2="25" y2="170" stroke="#5c3826" strokeWidth="4" />
            <polygon points="25,65 80,100 75,165 25,165" fill="#803d20" opacity="0.8" />
          </g>

          {/* Distant British Steam Freighters with glowing masts */}
          <rect x="420" y="620" width="220" height="60" fill="#141c24" />
          <line x1="530" y1="560" x2="530" y2="620" stroke="#222f3e" strokeWidth="4" />
          <circle cx="530" cy="565" r="4" fill="#fef08a" />

          {/* Stone pier & mooring iron bollard in foreground */}
          <polygon points="0,860 620,860 720,1080 0,1080" fill="#19202a" stroke="#2c3645" strokeWidth="6" />
          <rect x="480" y="820" width="45" height="55" rx="6" fill="#0f141a" stroke="#475569" strokeWidth="4" />
          {/* Thick coiled mooring rope */}
          <ellipse cx="440" cy="875" rx="35" ry="14" fill="none" stroke="#78350f" strokeWidth="8" />
        </svg>
      )}

      {/* 12. bg-goc-phong-den-dau: Hội nghị Cửu Long thành lập Đảng (3/2/1930) */}
      {bgId === "bg-goc-phong-den-dau" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <radialGradient id="kowloonLamp12" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="1" />
              <stop offset="15%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.55" />
              <stop offset="65%" stopColor="#d97706" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep intimate dark room interior */}
          <rect width="1920" height="1080" fill="#0e0a07" />

          {/* Heavy drawn crimson velvet curtains */}
          <path d="M0 0 L420 0 L360 880 L0 880 Z" fill="#2d1217" opacity="0.8" />
          <path d="M1500 0 L1920 0 L1920 880 L1560 880 Z" fill="#2d1217" opacity="0.8" />

          {/* Master Centerpiece: Brass Hurricane Lamp casting dramatic Chiaroscuro */}
          <g className="vn-lamp-flicker">
            <circle cx="960" cy="520" r="540" fill="url(#kowloonLamp12)" />
            {/* Hanging chain */}
            <line x1="960" y1="0" x2="960" y2="460" stroke="#78350f" strokeWidth="5" />
            {/* Lamp housing */}
            <rect x="944" y="460" width="32" height="18" rx="4" fill="#92400e" />
            <ellipse cx="960" cy="520" rx="22" ry="34" fill="#ffffff" opacity="0.95" />
            <rect x="940" y="550" width="40" height="25" rx="5" fill="#78350f" />
          </g>

          {/* Round Rosewood Conference Table */}
          <ellipse cx="960" cy="850" rx="760" ry="240" fill="#27170f" stroke="#452718" strokeWidth="10" />

          {/* Dramatic Silhouettes of the 5 Historical Delegates seated around the table */}
          {/* Delegate 1: Left */}
          <g transform="translate(420, 700)">
            <circle cx="0" cy="0" r="45" fill="#0a0705" />
            <path d="M-60 45 Q0 15 60 45 L50 180 L-50 180 Z" fill="#0a0705" />
          </g>
          {/* Delegate 2 */}
          <g transform="translate(680, 640)">
            <circle cx="0" cy="0" r="42" fill="#0a0705" />
            <path d="M-55 42 Q0 15 55 42 L45 160 L-45 160 Z" fill="#0a0705" />
          </g>
          {/* Leader Nguyễn Ái Quốc presiding: Center */}
          <g transform="translate(960, 610)">
            <circle cx="0" cy="0" r="46" fill="#0a0705" stroke="#f59e0b" strokeWidth="1.5" />
            <path d="M-65 46 Q0 10 65 46 L55 180 L-55 180 Z" fill="#0a0705" />
          </g>
          {/* Delegate 4 */}
          <g transform="translate(1240, 640)">
            <circle cx="0" cy="0" r="42" fill="#0a0705" />
            <path d="M-55 42 Q0 15 55 42 L45 160 L-45 160 Z" fill="#0a0705" />
          </g>
          {/* Delegate 5: Right */}
          <g transform="translate(1500, 700)">
            <circle cx="0" cy="0" r="45" fill="#0a0705" />
            <path d="M-60 45 Q0 15 60 45 L50 180 L-50 180 Z" fill="#0a0705" />
          </g>

          {/* Founding Documents on the Table: Chánh cương & Sách lược */}
          <g transform="translate(860, 810) rotate(-4)">
            <rect width="120" height="90" fill="#fef3c7" rx="3" stroke="#d97706" strokeWidth="2" />
            <rect x="10" y="10" width="100" height="6" fill="#991b1b" />
            <line x1="10" y1="26" x2="110" y2="26" stroke="#475569" strokeWidth="2" />
            <line x1="10" y1="38" x2="100" y2="38" stroke="#475569" strokeWidth="2" />
          </g>
          <g transform="translate(980, 820) rotate(5)">
            <rect width="110" height="85" fill="#fef9c3" rx="3" stroke="#d97706" strokeWidth="2" />
            <line x1="10" y1="18" x2="100" y2="18" stroke="#475569" strokeWidth="2" />
            <line x1="10" y1="30" x2="90" y2="30" stroke="#475569" strokeWidth="2" />
          </g>
        </svg>
      )}

      {/* 13. bg-phong-rang-sang: Rạng sáng ngày 7/2/1930 — Bế mạc Hội nghị hợp nhất */}
      {bgId === "bg-phong-rang-sang" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="dawnSky13" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1228" />
              <stop offset="35%" stopColor="#431f3f" />
              <stop offset="70%" stopColor="#9a3412" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="dawnShaft13" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.3" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Magnificent Violet-Rose Dawn Sky */}
          <rect width="1920" height="720" fill="url(#dawnSky13)" />

          {/* Rays of Historic Dawn entering through parted curtains */}
          <polygon points="580,0 1340,0 1820,1080 340,1080" fill="url(#dawnShaft13)" className="vn-light-shaft" />

          {/* Wooden window sill & room floor */}
          <polygon points="0,720 1920,720 1920,1080 0,1080" fill="#241610" />

          {/* Conference Desk with Final Adopted Documents */}
          <polygon points="260,780 1660,780 1780,1080 140,1080" fill="#382218" stroke="#523224" strokeWidth="8" />

          {/* Stack of finalized documents & resting fountain pen */}
          <g transform="translate(860, 830)">
            <rect width="200" height="140" fill="#fef3c7" rx="4" stroke="#ca8a04" strokeWidth="3" />
            <text x="100" y="38" fill="#991b1b" fontSize="16" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              ĐẢNG CỘNG SẢN VIỆT NAM
            </text>
            <text x="100" y="65" fill="#475569" fontSize="13" fontFamily="serif" textAnchor="middle">
              Chánh cương & Sách lược vắn tắt
            </text>
            <line x1="30" y1="85" x2="170" y2="85" stroke="#94a3b8" strokeWidth="2" />
            <line x1="30" y1="105" x2="160" y2="105" stroke="#94a3b8" strokeWidth="2" />
            {/* Fountain pen */}
            <line x1="170" y1="60" x2="240" y2="130" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
            <polygon points="165,55 172,62 162,65" fill="#ca8a04" />
          </g>
        </svg>
      )}

      {/* 14. bg-boong-tau-binh-minh: Trở về và Lời kêu gọi (Mùa xuân 1930) */}
      {bgId === "bg-boong-tau-binh-minh" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="sunriseSky14" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c112e" />
              <stop offset="35%" stopColor="#991b1b" />
              <stop offset="65%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="sunriseSea14" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c2410c" />
              <stop offset="50%" stopColor="#7c2d12" />
              <stop offset="100%" stopColor="#221109" />
            </linearGradient>
          </defs>

          {/* Blazing Red Sunrise Sky */}
          <rect width="1920" height="660" fill="url(#sunriseSky14)" />

          {/* Crimson Sun Rising on Horizon */}
          <circle cx="960" cy="620" r="105" fill="#dc2626" />
          <ellipse cx="960" cy="635" rx="180" ry="18" fill="#f59e0b" opacity="0.8" />

          {/* Golden Sunrays radiating into the morning sky */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 11) * Math.PI;
            const x = 960 - Math.cos(angle) * 700;
            const y = 620 - Math.sin(angle) * 450;
            return <line key={i} x1={960} y1={620} x2={x} y2={y} stroke="#fef08a" strokeWidth="8" opacity="0.25" />;
          })}

          {/* Soaring Seabirds silhouetted against the morning glow */}
          <g opacity="0.8">
            <path d="M520 280 Q535 260 550 280 Q565 260 580 280" stroke="#450a0a" strokeWidth="3" fill="none" />
            <path d="M640 230 Q652 215 665 230 Q678 215 690 230" stroke="#450a0a" strokeWidth="2.5" fill="none" />
            <path d="M1360 260 Q1375 240 1390 260 Q1405 240 1420 260" stroke="#450a0a" strokeWidth="3" fill="none" />
          </g>

          {/* Sea reflecting red & golden dawn */}
          <rect y="640" width="1920" height="200" fill="url(#sunriseSea14)" />
          <g className="vn-wave-swell" opacity="0.7">
            <line x1="300" y1="670" x2="1620" y2="670" stroke="#fbbf24" strokeWidth="3" />
            <line x1="450" y1="710" x2="1470" y2="710" stroke="#f59e0b" strokeWidth="3" />
            <line x1="600" y1="760" x2="1320" y2="760" stroke="#ea580c" strokeWidth="4" />
          </g>

          {/* Ship's Bow Pointing Toward Vietnam */}
          <polygon points="0,810 1920,760 1920,1080 0,1080" fill="#322017" />
          {/* Deck Planks with Morning Highlights */}
          <line x1="0" y1="780" x2="1920" y2="730" stroke="#b45309" strokeWidth="12" />
          <line x1="0" y1="815" x2="1920" y2="765" stroke="#78350f" strokeWidth="7" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 102} y1={780 - i * 2.6} x2={i * 102} y2={845 - i * 2.4} stroke="#52361b" strokeWidth="7" />
          ))}
        </svg>
      )}

      {/* Fallback for unknown IDs */}
      {!["bg-boong-tau-dem", "bg-phong-tro-paris", "bg-quan-ca-phe", "bg-hoi-truong-tours", "bg-ga-paris-tuyet", "bg-ban-do-hanh-trinh", "bg-lop-hoc-van-minh", "bg-lop-hoc-chieu", "bg-xuong-may", "bg-pho-kham-thien-dem", "bg-ben-cang-hong-kong", "bg-goc-phong-den-dau", "bg-phong-rang-sang", "bg-boong-tau-binh-minh"].includes(bgId) && (
        <div className="w-full h-full bg-gradient-to-b from-[#2a1b14] to-[#120d0a]" />
      )}
    </div>
  );
};
