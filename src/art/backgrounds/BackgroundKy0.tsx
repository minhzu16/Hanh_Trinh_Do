import React from "react";
import { SharedBackgroundDefs } from "./svgDefs";

export const BackgroundKy0: React.FC<{ bgId: string }> = ({ bgId }) => {
  return (
    <>
      {/* 1. bg-boong-tau-dem: Tàu Amiral Latouche-Tréville trên biển đêm (5/6/1911) */}
      {bgId === "bg-boong-tau-dem" && (
        <svg viewBox="0 0 3200 1200" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="skyNight11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#030712" />
              <stop offset="50%" stopColor="#0b1728" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="seaNight11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="45%" stopColor="#07131e" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="deckWood11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#543d2b" />
              <stop offset="40%" stopColor="#3d2b1f" />
              <stop offset="100%" stopColor="#1f150e" />
            </linearGradient>
            <radialGradient id="moonGlow11" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="1" />
              <stop offset="30%" stopColor="#fef3c7" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#fef08a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="lampGlow11" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#d97706" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="funnelOchre11" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="25%" stopColor="#d97706" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="wheelhouseWood11" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2c1a11" />
              <stop offset="50%" stopColor="#452a1c" />
              <stop offset="100%" stopColor="#27170f" />
            </linearGradient>
            <radialGradient id="beaconGlow11" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
                    <SharedBackgroundDefs />
          </defs>
          <g id="layer-sky-vista" transform="scale(1.6666667 1.1111111)">


          {/* Deep midnight sky */}
          <rect width="1920" height="660" fill="url(#skyNight11)" />

          {/* Starfield with Milky Way Cluster */}
          <g opacity="0.9">
            <circle cx="180" cy="120" r="1.8" fill="#ffffff" />
            <circle cx="320" cy="65" r="2.2" fill="#ffffff" />
            <circle cx="480" cy="140" r="1.4" fill="#ffffff" opacity="0.7" />
            <circle cx="680" cy="90" r="2.4" fill="#ffffff" />
            <circle cx="880" cy="50" r="1.6" fill="#ffffff" />
            <circle cx="1060" cy="130" r="2.2" fill="#ffffff" />
            <circle cx="1240" cy="70" r="1.5" fill="#ffffff" />
            <circle cx="1420" cy="110" r="2.5" fill="#ffffff" />
            <circle cx="1600" cy="60" r="1.8" fill="#ffffff" />
            <circle cx="1780" cy="100" r="2.2" fill="#ffffff" />
            <ellipse cx="960" cy="100" rx="420" ry="60" fill="#38bdf8" opacity="0.06" transform="rotate(-12 960 100)" />
          </g>

          {/* Radiant Crescent Moon */}
          <circle cx="1680" cy="120" r="95" fill="url(#moonGlow11)" />
          <circle cx="1680" cy="120" r="32" fill="#fef3c7" />
          <circle cx="1695" cy="112" r="28" fill="#0d1829" />

          {/* Cap Saint-Jacques / Cần Giờ Lighthouse Sweeping Beam */}
          <circle cx="320" cy="560" r="32" fill="url(#beaconGlow11)" />
          <circle cx="320" cy="560" r="4" fill="#ffffff" />
          <polygon points="320,560 0,530 0,580" fill="#fef08a" opacity="0.12" />

          {/* Dark rolling ocean waters */}
          <rect y="540" width="1920" height="260" fill="url(#seaNight11)" />

          {/* Foaming ocean waves & sea spray */}
          <g className="vn-wave-swell" opacity="0.8">
            <path d="M0 580 Q320 565 640 580 T1280 580 T1920 580" stroke="#1e3a5f" strokeWidth="4" fill="none" />
            <path d="M0 605 Q240 590 480 605 T960 605 T1440 605 T1920 605" stroke="#38bdf8" strokeWidth="2" strokeDasharray="14,14" fill="none" opacity="0.7" />
            <path d="M0 635 Q280 620 560 635 T1120 635 T1680 635 T1920 635" stroke="#24446e" strokeWidth="3" fill="none" />
            {/* White wake ripples */}
            <path d="M200 650 Q600 625 1000 645 T1800 640" stroke="#e0f2fe" strokeWidth="2.5" strokeDasharray="10,12" fill="none" opacity="0.5" />
          </g>

          {/* Moon shimmer trail across waves */}
          <ellipse cx="1680" cy="570" rx="55" ry="5" fill="#fef3c7" opacity="0.4" />
          <ellipse cx="1680" cy="595" rx="80" ry="6" fill="#fef3c7" opacity="0.3" />
          <ellipse cx="1680" cy="625" rx="110" ry="7" fill="#fef3c7" opacity="0.2" />

          {/* ========================================================
              RIGHT WING (x: 1260 - 1880): Iconic Chargeurs Réunis Funnel & Masts
              ======================================================== */}
          <g id="latouche-funnel-right" transform="translate(1360, 140)">
            {/* Funnel body (Ochre with 5-Star red band) */}
            <path d="M80 80 L110 440 L260 440 L220 80 Z" fill="url(#funnelOchre11)" stroke="#522e13" strokeWidth="3" />
            {/* Black soot rim at top */}
            <path d="M80 80 L86 140 L226 140 L220 80 Z" fill="#0f172a" />
            <line x1="80" y1="80" x2="220" y2="80" stroke="#000000" strokeWidth="4" />
            {/* Exhaust relief pipe */}
            <line x1="228" y1="65" x2="268" y2="440" stroke="#92400e" strokeWidth="6" />
            <polygon points="222,65 234,65 231,55 225,55" fill="#ca8a04" />
            {/* Red band with white medallion & 5-pointed red star */}
            <polygon points="90,195 230,195 236,265 96,265" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1.5" />
            <circle cx="163" cy="230" r="22" fill="#ffffff" />
            <polygon points="163,215 168,225 180,225 170,232 174,244 163,237 152,244 156,232 146,225 158,225" fill="#991b1b" />
            {/* Funnel wire stays */}
            <line x1="85" y1="120" x2="-80" y2="440" stroke="#334155" strokeWidth="2.5" opacity="0.6" />
            <line x1="222" y1="120" x2="380" y2="440" stroke="#334155" strokeWidth="2.5" opacity="0.6" />
            {/* Billowing Coal Smoke into night sky */}
            <path d="M150 80 C80 -10 -40 -30 -180 10 C-320 50 -480 30 -650 10" stroke="#0f172a" strokeWidth="70" strokeLinecap="round" opacity="0.5" fill="none" />
            <path d="M150 70 C70 -20 -60 -40 -200 0 C-350 40 -500 20 -700 0" stroke="#1e293b" strokeWidth="42" strokeLinecap="round" opacity="0.35" fill="none" />
          </g>

          {/* Tall Cargo Derrick Mainmast in Right Wing */}
          <g transform="translate(1780, 80)">
            <rect x="0" y="0" width="14" height="500" fill="#1f1814" />
            <line x1="-45" y1="110" x2="60" y2="110" stroke="#261b14" strokeWidth="6" />
            <line x1="7" y1="110" x2="140" y2="240" stroke="#3d281a" strokeWidth="6" />
            <line x1="7" y1="0" x2="-140" y2="500" stroke="#334155" strokeWidth="2" opacity="0.5" />
            <line x1="7" y1="0" x2="100" y2="500" stroke="#334155" strokeWidth="2" opacity="0.5" />
          </g>

          {/* T.S.F Wireless Telegraph Aerial Wire across top sky */}
          <path d="M120 110 Q960 180 1787 80" stroke="#475569" strokeWidth="2.5" fill="none" opacity="0.7" />

          {/* ========================================================
              LEFT WING (x: 60 - 640): Iconic Ship Wheelhouse & Bridge in Safe Zone
              ======================================================== */}
          <g id="latouche-wheelhouse-left" transform="translate(60, 220)">
            {/* Multi-story Teak Deckhouse structure */}
            <polygon points="0,420 480,380 480,140 0,160" fill="url(#wheelhouseWood11)" stroke="#1a0f0a" strokeWidth="4" />
            {/* Upper Navigation Bridge Roof & Railing */}
            <polygon points="-20,160 500,140 490,115 -10,135" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
            {/* Navigation Bridge Window Panes glowing with warm amber cabin light */}
            {[20, 100, 180, 260, 340, 420].map((wx, i) => (
              <g key={i}>
                <rect x={wx} y={180 - i * 3.5} width="55" height="75" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" opacity="0.9" />
                <line x1={wx + 27} y1={180 - i * 3.5} x2={wx + 27} y2={255 - i * 3.5} stroke="#52361b" strokeWidth="2" />
                <line x1={wx} y1={217 - i * 3.5} x2={wx + 55} y2={217 - i * 3.5} stroke="#52361b" strokeWidth="2" />
              </g>
            ))}
            {/* Heavy Brass Portholes below bridge */}
            {[60, 180, 300, 420].map((px, i) => (
              <circle key={i} cx={px} cy={310 - i * 4} r="18" fill="#fde047" stroke="#ca8a04" strokeWidth="5" opacity="0.85" />
            ))}
            {/* Brass Hurricane Kerosene Lantern mounted on ship wall */}
            <g transform="translate(360, 180)" className="vn-lamp-flicker">
              <circle cx="0" cy="60" r="180" fill="url(#lampGlow11)" />
              <line x1="0" y1="0" x2="0" y2="40" stroke="#78350f" strokeWidth="4" />
              <rect x="-14" y="40" width="28" height="12" rx="3" fill="#92400e" />
              <ellipse cx="0" cy="65" rx="14" ry="20" fill="#fef08a" opacity="0.95" />
              <rect x="-16" y="80" width="32" height="15" rx="3" fill="#78350f" />
            </g>
            {/* Authentic Lifebuoy mounted on bridge bulwark in clear sight */}
            <g transform="translate(180, 290)">
              <ellipse cx="50" cy="50" rx="45" ry="45" fill="#991b1b" stroke="#fef3c7" strokeWidth="5" />
              <ellipse cx="50" cy="50" rx="22" ry="22" fill="#31231a" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="#fef3c7" strokeWidth="5" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="#fef3c7" strokeWidth="5" />
              <text x="50" y="19" fill="#ffffff" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">
                LATOUCHE-TRÉVILLE
              </text>
              <text x="50" y="86" fill="#ffffff" fontSize="6.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                LE HAVRE
              </text>
            </g>
          </g>

          {/* Ship Deck Railing across lower-middle */}
          <line x1="0" y1="620" x2="1920" y2="560" stroke="#ca8a04" strokeWidth="14" />
          <line x1="0" y1="622" x2="1920" y2="562" stroke="#fef08a" strokeWidth="2.5" opacity="0.8" />
          <line x1="0" y1="655" x2="1920" y2="595" stroke="#52361b" strokeWidth="7" />
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={i} x1={i * 92} y1={620 - i * 2.7} x2={i * 92} y2={675 - i * 2.5} stroke="#3e2918" strokeWidth="7" />
          ))}

          {/* Teak Wood Deck Planks with Caulking Seams in 1-point perspective */}
          <polygon points="0,670 1920,610 1920,1080 0,1080" fill="url(#deckWood11)" />
          {[-400, -100, 200, 500, 800, 1100, 1400, 1700, 2000, 2300].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={670} x2={x - 240} y2={1080} stroke="#170f0a" strokeWidth="3.5" />
              <line x1={x + 2} y1={670} x2={x - 238} y2={1080} stroke="#5c4033" strokeWidth="1" opacity="0.35" />
            </g>
          ))}
          </g>
          <g id="layer-architecture-mid" aria-label="Kiến trúc trung cảnh">
            <path d="M0 760 Q520 690 980 755 T1900 735 T2800 760 T3200 720V1200H0Z" fill="#17283a" opacity="0.35" />
            <path d="M0 815 Q500 770 1000 810 T2000 800 T3200 780" fill="none" stroke="#8aa7b8" strokeWidth="8" opacity="0.35" />
            <g transform="translate(2500 420)" filter="url(#filter-drop-shadow)">
              <rect width="480" height="250" rx="18" fill="#321f16" stroke="#b48b55" strokeWidth="8" />
              <path d="M40 210V55H220V210M260 210V55H440V210" stroke="#f6d783" strokeWidth="10" fill="#13202b" />
              <path d="M30 35 Q240 -85 450 35" fill="#8f1d2c" stroke="#d7a552" strokeWidth="8" />
              <text x="240" y="175" textAnchor="middle" fill="#f6d783" fontSize="24" fontFamily="serif">BẾN NHÀ RỒNG</text>
            </g>
          </g>
          <g id="layer-historical-props-lod" aria-label="Đạo cụ lịch sử cận cảnh">
            <g transform="translate(2700 780)" filter="url(#filter-drop-shadow)">
              <ellipse cx="180" cy="65" rx="180" ry="48" fill="#38434b" />
              <path d="M25 55 Q180 10 335 55" stroke="#e9c46a" strokeWidth="5" fill="none" />
              <text x="180" y="62" textAnchor="middle" fill="#f7e7b0" fontSize="20" fontFamily="serif">AMIRAL LATOUCHE-TRÉVILLE</text>
              <text x="180" y="88" textAnchor="middle" fill="#f7e7b0" fontSize="15" fontFamily="serif">LE HAVRE • 1911</text>
            </g>
            <g transform="translate(1100 900)" opacity="0.8">
              <circle cx="0" cy="0" r="14" fill="#d9a441" /><circle cx="70" cy="0" r="14" fill="#d9a441" /><circle cx="140" cy="0" r="14" fill="#d9a441" />
            </g>
          </g>
          <g id="layer-foreground-vignette" aria-label="Tiền cảnh và ánh sáng">
            <path d="M0 0H190V1200H0ZM3200 0H3010V1200H3200Z" fill="#05080d" opacity="0.42" />
            <ellipse cx="2400" cy="560" rx="300" ry="250" fill="#fbbf24" opacity="0.08" filter="url(#filter-lantern-bloom)" />
          </g>
        </svg>
      )}

      {/* 2. bg-phong-tro-paris: Căn phòng áp mái Paris (Villa des Gobelins / Impasse Compoint, 1919) */}
      {bgId === "bg-phong-tro-paris" && (
        <svg viewBox="0 0 3200 1200" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="parisSky19" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e102e" />
              <stop offset="45%" stopColor="#4a1d48" />
              <stop offset="75%" stopColor="#882855" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
            <linearGradient id="wallWood19" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#17110e" />
              <stop offset="50%" stopColor="#2b1c15" />
              <stop offset="100%" stopColor="#18110e" />
            </linearGradient>
            <radialGradient id="deskLamp19" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="1" />
              <stop offset="25%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sunbeam19" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </linearGradient>
                    <SharedBackgroundDefs />
          </defs>
          <g id="layer-sky-vista" transform="scale(1.6666667 1.1111111)">


          {/* Attic room timber walls */}
          <rect width="1920" height="1080" fill="url(#wallWood19)" />

          {/* Exposed Red Brickwork behind peeling plaster on walls */}
          <g transform="translate(140, 160)" opacity="0.7">
            <rect width="180" height="120" rx="4" fill="#582a0b" />
            {[0, 24, 48, 72, 96, 120].map((y, row) => (
              <g key={row}>
                <line x1="0" y1={y} x2="180" y2={y} stroke="#2a1405" strokeWidth="2.5" />
                <line x1={(row % 2) * 30 + 20} y1={y} x2={(row % 2) * 30 + 20} y2={y + 24} stroke="#2a1405" strokeWidth="2" />
                <line x1={(row % 2) * 30 + 80} y1={y} x2={(row % 2) * 30 + 80} y2={y + 24} stroke="#2a1405" strokeWidth="2" />
                <line x1={(row % 2) * 30 + 140} y1={y} x2={(row % 2) * 30 + 140} y2={y + 24} stroke="#2a1405" strokeWidth="2" />
              </g>
            ))}
          </g>

          {/* Heavy Oak Rafters framing the top and ceiling angle */}
          <polygon points="0,0 1920,0 1920,70 0,95" fill="#1b120c" />
          <line x1="0" y1="95" x2="1920" y2="70" stroke="#3d2719" strokeWidth="8" />
          <line x1="0" y1="0" x2="680" y2="1080" stroke="#382317" strokeWidth="32" />
          <line x1="420" y1="0" x2="900" y2="1080" stroke="#2c1a10" strokeWidth="22" />

          {/* ========================================================
              RIGHT WING (x: 1180 - 1880): Grand Dormer Window framing Eiffel & Paris Sunset
              ======================================================== */}
          {/* Paris twilight sky inside window */}
          <rect x="1220" y="80" width="620" height="580" rx="8" fill="url(#parisSky19)" />

          {/* Paris Zinc Mansard Roofs & Chimney Pots */}
          <polygon points="1220,540 1340,460 1480,510 1600,440 1720,490 1840,450 1840,660 1220,660" fill="#1e1628" />
          <rect x="1310" y="430" width="22" height="45" fill="#150f1d" />
          <rect x="1340" y="440" width="18" height="35" fill="#150f1d" />
          <rect x="1570" y="410" width="25" height="50" fill="#150f1d" />

          {/* Towering Eiffel Tower with glowing golden searchlight */}
          <path d="M1510 540 L1520 260 L1524 160 L1528 260 L1538 540 Z" fill="#170c1f" />
          <line x1="1514" y1="400" x2="1534" y2="400" stroke="#170c1f" strokeWidth="6" />
          <line x1="1510" y1="480" x2="1538" y2="480" stroke="#170c1f" strokeWidth="8" />
          {/* Glowing beacon at top of Eiffel */}
          <circle cx="1524" cy="160" r="14" fill="#fef08a" opacity="0.6" />
          <circle cx="1524" cy="160" r="3" fill="#ffffff" />
          <polygon points="1524,160 1240,110 1240,180" fill="#fef08a" opacity="0.15" />

          {/* Volumetric Twilight Sunset Beam streaming across room */}
          <polygon points="1220,80 1840,80 1920,950 900,950" fill="url(#sunbeam19)" className="vn-light-shaft" />

          {/* Heavy Dormer Window Frame with French Casement Panes */}
          <rect x="1205" y="65" width="650" height="610" fill="none" stroke="#4a3525" strokeWidth="28" rx="10" />
          <line x1="1525" y1="65" x2="1525" y2="675" stroke="#4a3525" strokeWidth="18" />
          <line x1="1205" y1="365" x2="1855" y2="365" stroke="#4a3525" strokeWidth="18" />

          {/* ========================================================
              LEFT WING (x: 80 - 640): Historic Writing & Photo Desk in Safe Zone
              ======================================================== */}
          {/* Wall Bookshelf with Marxist volumes & French dictionaries */}
          <g transform="translate(180, 260)">
            <rect x="0" y="70" width="360" height="16" fill="#3d2719" stroke="#24170d" strokeWidth="2.5" />
            <polygon points="40,86 65,115 55,115 30,86" fill="#24170d" />
            <polygon points="310,86 335,115 325,115 300,86" fill="#24170d" />
            {/* Leather-bound books with gold foil spines */}
            <rect x="25" y="10" width="24" height="60" fill="#881337" rx="2" />
            <rect x="52" y="15" width="30" height="55" fill="#1e3a5f" rx="2" />
            <rect x="85" y="5" width="34" height="65" fill="#78350f" rx="2" />
            <rect x="122" y="18" width="22" height="52" fill="#14532d" rx="2" />
            <rect x="147" y="12" width="28" height="58" fill="#4c1d95" rx="2" />
            <line x1="87" y1="18" x2="117" y2="18" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="87" y1="24" x2="117" y2="24" stroke="#ca8a04" strokeWidth="1.5" />
          </g>

          {/* Hanging Summer Vest & Lightweight Jacket on Wooden Peg (Paris June 1919) */}
          <g transform="translate(100, 150)">
            <circle cx="20" cy="20" r="5" fill="#0f172a" />
            {/* Dark brown photographer's summer vest & cotton shirt */}
            <path d="M20 20 Q-10 50 -12 210 L52 210 Q42 50 20 20 Z" fill="#2d211a" stroke="#170f0a" strokeWidth="2.5" />
            <path d="M12 25 Q20 80 22 170 L35 168 Q30 75 22 25 Z" fill="#e2e8f0" opacity="0.9" />
          </g>

          {/* The Historic Writing & Retouching Desk raised into Left Wing (y: 440 - 680) */}
          <g transform="translate(160, 440)">
            <polygon points="0,180 440,160 480,240 -30,260" fill="#3b271d" stroke="#523826" strokeWidth="4" />

            {/* Kerosene Lamp radiating warm golden Chiaroscuro */}
            <g transform="translate(340, 60)" className="vn-lamp-flicker">
              <circle cx="25" cy="40" r="220" fill="url(#deskLamp19)" />
              <ellipse cx="25" cy="90" rx="26" ry="10" fill="#78350f" />
              <path d="M12 90 Q8 60 16 40 L34 40 Q42 60 38 90 Z" fill="#b45309" />
              <ellipse cx="25" cy="35" rx="12" ry="20" fill="#fef08a" opacity="0.95" />
              <path d="M18 35 L20 -20 L30 -20 L32 35 Z" fill="#ffffff" opacity="0.5" />
            </g>

            {/* Historic Manuscript: "YÊU SÁCH CỦA NHÂN DÂN AN NAM" (1919) in full view */}
            <g transform="translate(40, 110) rotate(-4)">
              <rect width="180" height="120" rx="3" fill="#fef3c7" stroke="#ca8a04" strokeWidth="2" />
              <text x="90" y="24" fill="#991b1b" fontSize="8" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                REVENDICATIONS DU PEUPLE ANNAMITE
              </text>
              <text x="90" y="36" fill="#78350f" fontSize="7" fontFamily="serif" textAnchor="middle" fontStyle="italic">
                (Yêu sách của nhân dân An Nam - 1919)
              </text>
              <line x1="15" y1="45" x2="165" y2="45" stroke="#451a03" strokeWidth="2" />
              <line x1="15" y1="58" x2="160" y2="58" stroke="#334155" strokeWidth="1.5" />
              <line x1="15" y1="70" x2="150" y2="70" stroke="#334155" strokeWidth="1.5" />
              <line x1="15" y1="82" x2="155" y2="82" stroke="#334155" strokeWidth="1.5" />
              <text x="90" y="105" fill="#991b1b" fontSize="7.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                Nguyễn Ái Quốc thay mặt Hội
              </text>
            </g>

            {/* Vintage French Stamped Envelope & Brass Magnifying Glass */}
            <g transform="translate(230, 140)">
              <rect width="70" height="45" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
              <rect x="52" y="4" width="14" height="18" fill="#1e3a5f" rx="1" />
              <line x1="8" y1="15" x2="45" y2="15" stroke="#475569" strokeWidth="1.5" />
              <line x1="8" y1="25" x2="40" y2="25" stroke="#475569" strokeWidth="1.5" />
              {/* Brass magnifying glass */}
              <ellipse cx="60" cy="50" rx="18" ry="18" fill="#fef08a" opacity="0.3" stroke="#ca8a04" strokeWidth="3" />
              <line x1="72" y1="62" x2="90" y2="80" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
            </g>
          </g>

          {/* Wooden floor at bottom */}
          <polygon points="0,740 1920,740 1920,1080 0,1080" fill="#20150f" />
          </g>
          <g id="layer-architecture-mid" aria-label="Kiến trúc trung cảnh">
            <path d="M0 280H3200V900H0Z" fill="url(#pattern-brick-wall)" opacity="0.18" />
            <path d="M2250 180L3200 120V820H2250Z" fill="#526273" opacity="0.42" />
            <path d="M2320 230L3110 190M2320 330L3110 290M2320 430L3110 390" stroke="#d4e4e9" strokeWidth="5" opacity="0.24" />
            <g transform="translate(2780 240)" stroke="#d7a552" fill="none" strokeWidth="8">
              <path d="M0 360V80L170 0L340 80V360M40 360V120M110 360V80M180 360V120M250 360V80M320 360V120" />
            </g>
          </g>
          <g id="layer-historical-props-lod" aria-label="Đạo cụ lịch sử cận cảnh">
            <g transform="translate(1220 710)" filter="url(#filter-drop-shadow)">
              <rect width="900" height="300" rx="18" fill="url(#pattern-woodgrain)" stroke="#b88a4a" strokeWidth="9" />
              <rect x="95" y="50" width="710" height="175" fill="url(#pattern-parchment)" stroke="#573c25" strokeWidth="7" />
              <text x="450" y="92" textAnchor="middle" fill="#3d2418" fontSize="28" fontWeight="bold" fontFamily="serif">REVENDICATIONS DU PEUPLE ANNAMITE</text>
              <text x="450" y="132" textAnchor="middle" fill="#3d2418" fontSize="25" fontFamily="serif">YÊU SÁCH CỦA NHÂN DÂN AN NAM</text>
              <text x="450" y="171" textAnchor="middle" fill="#5b3a23" fontSize="20" fontFamily="serif">8 ĐIỂM • LIBERTÉ • ÉGALITÉ • DROITS</text>
              <path d="M150 195H750M150 210H680" stroke="#63452b" strokeWidth="3" />
            </g>
            <circle cx="2160" cy="900" r="42" fill="#6f3b2b" stroke="#d1a85b" strokeWidth="7" />
            <path d="M2160 900L2190 875M2160 900L2140 930" stroke="#e7c77b" strokeWidth="6" />
          </g>
          <g id="layer-foreground-vignette" aria-label="Tiền cảnh và ánh sáng">
            <path d="M0 0H170V1200H0ZM3200 0H3030V1200H3200Z" fill="#261b21" opacity="0.38" />
            <path d="M2370 0L3200 0L3200 80L2440 180Z" fill="#fef3c7" opacity="0.08" />
          </g>
        </svg>
      )}

      {/* 3. bg-quan-ca-phe: Quán cà phê Paris, tháng 7/1920: Đọc tờ báo L'Humanité */}
      {bgId === "bg-quan-ca-phe" && (
        <svg viewBox="0 0 3200 1200" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="cafeWall20" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c1712" />
              <stop offset="50%" stopColor="#1e0f0b" />
              <stop offset="100%" stopColor="#120806" />
            </linearGradient>
            <radialGradient id="cafeChandelier20" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="1" />
              <stop offset="25%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="marbleTable20" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5c4436" />
              <stop offset="45%" stopColor="#6e5242" />
              <stop offset="100%" stopColor="#3d2b20" />
            </linearGradient>
            <linearGradient id="brassBevel20" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#854d0e" />
              <stop offset="40%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
                    <SharedBackgroundDefs />
          </defs>
          <g id="layer-sky-vista" transform="scale(1.6666667 1.1111111)">


          {/* Rich mahogany bistro interior */}
          <rect width="1920" height="1080" fill="url(#cafeWall20)" />

          {/* ========================================================
              RIGHT WING (x: 1160 - 1880): Grand Arched Window overlooking Paris Boulevard
              ======================================================== */}
          <g transform="translate(1220, 90)">
            {/* Arched Window with View of Paris Boulevard */}
            <path d="M0 580 L0 220 Q280 40 560 220 L560 580 Z" fill="#1e293b" stroke="#3d2217" strokeWidth="24" />
            {/* Boulevard view: twilight, Haussmann facade, plane tree, gas lamp */}
            <rect x="15" y="180" width="530" height="390" fill="#1c2534" />
            {/* Distant Parisian Haussmannian building facade with glowing windows */}
            <rect x="30" y="200" width="280" height="200" fill="#0f172a" />
            {[50, 110, 170, 230].map((bx, idx) => (
              <rect key={idx} x={bx} y="220" width="35" height="45" rx="3" fill="#fef08a" opacity="0.75" />
            ))}
            {/* Cobblestone street & outdoor gas lantern */}
            <circle cx="420" cy="330" r="28" fill="#fef08a" opacity="0.6" />
            <circle cx="420" cy="330" r="5" fill="#ffffff" />
            <line x1="420" y1="330" x2="420" y2="560" stroke="#0f172a" strokeWidth="6" />
            {/* Lush summer Parisian plane tree (Platane en été, Juillet 1920) */}
            <path d="M340 560 L345 380 Q350 280 300 220 M345 360 Q390 300 440 250" stroke="#0f172a" strokeWidth="8" fill="none" />
            <circle cx="310" cy="220" r="45" fill="#14532d" opacity="0.85" />
            <circle cx="370" cy="200" r="50" fill="#166534" opacity="0.88" />
            <circle cx="430" cy="240" r="42" fill="#15803d" opacity="0.85" />
            <circle cx="340" cy="180" r="38" fill="#15803d" opacity="0.9" />
            {/* Window muntin bars */}
            <line x1="280" y1="130" x2="280" y2="570" stroke="#3d2217" strokeWidth="12" />
            <line x1="15" y1="340" x2="545" y2="340" stroke="#3d2217" strokeWidth="12" />
          </g>

          {/* ========================================================
              LEFT WING (x: 60 - 640): Wainscoting, Bistro Blackboard Menu & Table
              ======================================================== */}
          {/* Ornate Beveled Wall Mirror with Gold Leaf Frame reflecting chandeliers */}
          <rect x="80" y="160" width="320" height="440" rx="8" fill="#1c1f24" stroke="url(#brassBevel20)" strokeWidth="12" />
          <path d="M100 180 L380 580" stroke="#fef08a" strokeWidth="2" opacity="0.15" />
          <circle cx="240" cy="280" r="60" fill="#fef08a" opacity="0.12" />

          {/* French Bistro Chalkboard Menu (Ardoise de Café) in full view */}
          <g transform="translate(430, 160)">
            <rect width="200" height="280" rx="6" fill="#18181b" stroke="#92400e" strokeWidth="10" />
            <text x="100" y="45" fill="#fef3c7" fontSize="15" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              CAFÉ DE PARIS
            </text>
            <line x1="30" y1="58" x2="170" y2="58" stroke="#ca8a04" strokeWidth="2" />
            <text x="35" y="90" fill="#fef2f2" fontSize="11" fontFamily="sans-serif">Café au lait ... 0.20 F</text>
            <text x="35" y="125" fill="#fef2f2" fontSize="11" fontFamily="sans-serif">Chocolat chaud ... 0.25 F</text>
            <text x="35" y="160" fill="#fef2f2" fontSize="11" fontFamily="sans-serif">Croissant frais ... 0.15 F</text>
            <text x="35" y="195" fill="#fef08a" fontSize="11" fontFamily="serif" fontWeight="bold">L'HUMANITÉ ... 0.10 F</text>
            <text x="35" y="230" fill="#93c5fd" fontSize="10" fontFamily="sans-serif">Vins & Liqueurs</text>
          </g>

          {/* Top Arch: Glowing Crystal Wall Sconces & Chandeliers */}
          <g className="vn-lamp-flicker">
            <circle cx="530" cy="110" r="240" fill="url(#cafeChandelier20)" />
            <circle cx="1120" cy="110" r="240" fill="url(#cafeChandelier20)" />
          </g>

          {/* Marble Guéridon Bistro Table raised into Left Wing (y: 450 - 680) */}
          <g transform="translate(140, 470)">
            <ellipse cx="260" cy="120" rx="260" ry="90" fill="#1e120b" />
            <ellipse cx="260" cy="110" rx="250" ry="82" fill="url(#marbleTable20)" stroke="url(#brassBevel20)" strokeWidth="10" />

            {/* Steaming French Faience Cup with Drip Filter (Café filtre) */}
            <g transform="translate(380, 50)">
              <ellipse cx="30" cy="35" rx="30" ry="16" fill="#fdfcf8" stroke="#cbd5e1" strokeWidth="2" />
              <ellipse cx="30" cy="33" rx="22" ry="11" fill="#78350f" />
              <rect x="18" y="5" width="24" height="28" rx="2" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
              {/* Steaming wisps */}
              <path d="M25 0 Q20 -15 28 -25" stroke="#fef08a" strokeWidth="2.5" fill="none" opacity="0.7" />
              <path d="M35 -5 Q40 -20 32 -30" stroke="#fef08a" strokeWidth="2.5" fill="none" opacity="0.7" />
            </g>

            {/* Historic Issue of L'HUMANITÉ (16-17 Juillet 1920) with Lenin's Theses */}
            <g transform="translate(40, 45) rotate(-5)">
              <polygon points="0,0 260,0 290,110 15,110" fill="#fef3c7" stroke="#d5c7aa" strokeWidth="2" />
              {/* Header */}
              <rect x="15" y="10" width="230" height="22" fill="#881337" rx="2" />
              <text x="25" y="26" fill="#ffffff" fontSize="13" fontFamily="serif" fontWeight="bold" letterSpacing="2">
                L'HUMANITÉ
              </text>
              <text x="160" y="25" fill="#fecdd3" fontSize="8" fontFamily="sans-serif">
                16–17 JUILLET 1920
              </text>
              {/* Headline */}
              <rect x="18" y="38" width="225" height="14" fill="#1f2937" rx="2" />
              <text x="22" y="48" fill="#fef08a" fontSize="7.5" fontFamily="serif" fontWeight="bold">
                PREMIÈRE ESQUISSE DES THÈSES - V. I. LÉNINE
              </text>
              <text x="18" y="64" fill="#111827" fontSize="7" fontFamily="serif" fontWeight="bold">
                (Sơ thảo Luận cương về vấn đề dân tộc và thuộc địa)
              </text>
              <line x1="18" y1="74" x2="260" y2="74" stroke="#4b5563" strokeWidth="1.5" />
              <line x1="18" y1="84" x2="250" y2="84" stroke="#4b5563" strokeWidth="1.5" />
              <line x1="18" y1="94" x2="240" y2="94" stroke="#4b5563" strokeWidth="1.5" />
            </g>

            {/* Saucer with antique French Franc coins */}
            <ellipse cx="340" cy="115" rx="24" ry="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="335" cy="115" r="7" fill="#ca8a04" stroke="#854d0e" strokeWidth="1" />
            <circle cx="346" cy="116" r="6" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
          </g>

          {/* Hydraulic encaustic tile floor pattern at bottom */}
          <polygon points="0,720 1920,720 1920,1080 0,1080" fill="#1a110d" />
          </g>
          <g id="layer-architecture-mid" aria-label="Kiến trúc trung cảnh">
            <path d="M0 340 Q500 250 980 350 T1900 320 T2800 350 T3200 280V820H0Z" fill="#597b52" opacity="0.26" />
            <g transform="translate(2450 180)" fill="#506d47" opacity="0.8">
              <circle cx="120" cy="160" r="120" /><circle cx="300" cy="130" r="150" /><circle cx="510" cy="170" r="140" />
            </g>
            <path d="M2450 700V270M2750 700V230M3070 700V260" stroke="#4b3023" strokeWidth="24" />
            <path d="M2370 720H3200" stroke="#b49b77" strokeWidth="22" />
          </g>
          <g id="layer-historical-props-lod" aria-label="Đạo cụ lịch sử cận cảnh">
            <g transform="translate(980 700)" filter="url(#filter-drop-shadow)">
              <ellipse cx="540" cy="260" rx="540" ry="95" fill="#d8d1c2" stroke="#8d877d" strokeWidth="10" />
              <text x="540" y="175" textAnchor="middle" fill="#241b17" fontSize="34" fontWeight="bold" fontFamily="serif">L'HUMANITÉ</text>
              <text x="540" y="215" textAnchor="middle" fill="#33241b" fontSize="22" fontFamily="serif">16–17 JUILLET 1920</text>
              <text x="540" y="250" textAnchor="middle" fill="#33241b" fontSize="20" fontFamily="serif">PREMIÈRE ESQUISSE DES THÈSES SUR LES QUESTIONS</text>
              <text x="540" y="282" textAnchor="middle" fill="#33241b" fontSize="20" fontFamily="serif">NATIONALE ET COLONIALE — V.I. LÉNINE</text>
            </g>
            <path d="M1510 850Q1580 790 1650 850T1790 850" fill="none" stroke="#f5d38a" strokeWidth="12" opacity="0.8" />
          </g>
          <g id="layer-foreground-vignette" aria-label="Tiền cảnh và ánh sáng">
            <path d="M0 0H160V1200H0ZM3200 0H3040V1200H3200Z" fill="#17120f" opacity="0.32" />
            <ellipse cx="2440" cy="410" rx="440" ry="280" fill="#fbbf24" opacity="0.07" filter="url(#filter-lantern-bloom)" />
          </g>
        </svg>
      )}

      {/* 4. bg-hoi-truong-tours: Salle du Manège, Đại hội XVIII Đảng Xã hội Pháp tại Tours, 12/1920 */}
      {bgId === "bg-hoi-truong-tours" && (
        <svg viewBox="0 0 3200 1200" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="toursHall4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#191117" />
              <stop offset="50%" stopColor="#2c1a26" />
              <stop offset="100%" stopColor="#140c12" />
            </linearGradient>
            <radialGradient id="toursChandelier4" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="1" />
              <stop offset="25%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="toursBeam4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#fde047" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
                    <SharedBackgroundDefs />
          </defs>
          <g id="layer-sky-vista" transform="scale(1.6666667 1.1111111)">


          {/* Monumental Congress Hall Walls */}
          <rect width="1920" height="1080" fill="url(#toursHall4)" />

          {/* Eiffel-Style Industrial Iron Lattice Trusses across the top */}
          <path d="M80 720 L80 260 Q960 20 1840 260 L1840 720 Z" fill="#241720" opacity="0.9" />
          <path d="M220 720 L220 340 Q960 110 1700 340 L1700 720 Z" fill="#190e16" />
          <path d="M80 260 Q960 20 1840 260" stroke="#374151" strokeWidth="26" fill="none" />
          <path d="M220 340 Q960 110 1700 340" stroke="#374151" strokeWidth="18" fill="none" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1={220 + i * 98} y1={340 - Math.sin((i / 15) * Math.PI) * 230} x2={220 + i * 98} y2={260 - Math.sin((i / 15) * Math.PI) * 240} stroke="#4b5563" strokeWidth="5" />
          ))}

          {/* Volumetric Light Beams streaming through smoke from skylights */}
          <polygon points="560,40 740,40 1080,780 680,780" fill="url(#toursBeam4)" className="vn-light-shaft" />
          <polygon points="1180,40 1360,40 1620,780 1260,780" fill="url(#toursBeam4)" className="vn-light-shaft" />

          {/* Historic Velvet Congress Banner across top: "18e CONGRÈS NATIONAL - TOURS" */}
          <g transform="translate(320, 100)" opacity="0.98">
            <polygon points="0,0 1280,0 1240,110 40,110" fill="#881337" stroke="#fcd34d" strokeWidth="5" />
            <text x="640" y="55" fill="#fef2f2" fontSize="30" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="3">
              18e CONGRÈS NATIONAL - TOURS (25–30 DÉCEMBRE 1920)
            </text>
            <text x="640" y="90" fill="#fde047" fontSize="20" fontFamily="serif" textAnchor="middle" fontStyle="italic">
              "Prolétaires de tous les pays, unissez-vous !"
            </text>
          </g>

          {/* Crystal Chandelier at center ceiling */}
          <circle cx="960" cy="140" r="320" fill="url(#toursChandelier4)" />
          <line x1="960" y1="0" x2="960" y2="100" stroke="#f59e0b" strokeWidth="5" />
          <ellipse cx="960" cy="100" rx="80" ry="22" fill="#d97706" />
          <path d="M890 100 Q960 180 1030 100 Z" fill="#fef08a" opacity="0.85" />

          {/* ========================================================
              LEFT WING (x: 80 - 640): Elevated Tribune & Speaker's Podium
              ======================================================== */}
          <g transform="translate(120, 360)">
            {/* Side crimson velvet drapery */}
            <polygon points="0,0 100,0 80,360 40,320 0,360" fill="#9f1239" stroke="#be123c" strokeWidth="2" />
            {/* Wooden podium tribune */}
            <polygon points="120,240 440,240 480,380 80,380" fill="#3b241c" stroke="#5c382a" strokeWidth="6" />
            <polygon points="160,200 400,200 420,240 140,240" fill="#4d3025" />
            <rect x="240" y="160" width="80" height="45" fill="#633c2a" rx="4" />
            {/* Crystal decanter & glass on podium */}
            <ellipse cx="360" cy="220" rx="9" ry="16" fill="#93c5fd" opacity="0.85" />
            <rect x="357" y="200" width="6" height="8" fill="#93c5fd" opacity="0.85" />
            {/* Chairman's brass bell */}
            <ellipse cx="200" cy="225" rx="10" ry="8" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
            <line x1="200" y1="225" x2="200" y2="215" stroke="#854d0e" strokeWidth="3" />
          </g>

          {/* ========================================================
              RIGHT WING (x: 1260 - 1880): Balcony & Delegate Rows raising 24 Red Cards
              ======================================================== */}
          <g transform="translate(1260, 320)">
            {/* Upper Balcony with French flags */}
            <rect x="0" y="0" width="600" height="120" fill="#24141d" stroke="#4a2539" strokeWidth="4" />
            <line x1="0" y1="120" x2="600" y2="120" stroke="#fcd34d" strokeWidth="6" />
            {/* Delegate rows with raised red voting cards (SFIO - 18e CONGRÈS) */}
            {Array.from({ length: 16 }).map((_, i) => (
              <g key={i} transform={`translate(${(i % 8) * 72 + 20}, ${Math.floor(i / 8) * 110 + 160})`}>
                <circle cx="0" cy="0" r="18" fill="#140a11" />
                <line x1="8" y1="-5" x2="18" y2="-35" stroke="#140a11" strokeWidth="4" />
                <rect x="10" y="-55" width="20" height="26" rx="2" fill="#dc2626" transform="rotate(-8)" />
                <line x1="13" y1="-46" x2="26" y2="-46" stroke="#fef2f2" strokeWidth="1.5" transform="rotate(-8)" />
              </g>
            ))}
          </g>

          {/* Delegate seats silhouettes at bottom */}
          <ellipse cx="960" cy="850" rx="880" ry="180" fill="#180d15" />
          <ellipse cx="960" cy="980" rx="980" ry="200" fill="#0d050c" />
          </g>
          <g id="layer-architecture-mid" aria-label="Kiến trúc trung cảnh">
            <path d="M0 180Q500 80 1000 180T2000 160T3200 120V760H0Z" fill="#5a3541" opacity="0.35" />
            <path d="M280 650V210M720 650V210M1160 650V210M1600 650V210M2040 650V210M2480 650V210M2920 650V210" stroke="#d1a052" strokeWidth="16" opacity="0.5" />
            <path d="M100 210Q1600 20 3100 210" fill="none" stroke="#d9b36b" strokeWidth="22" opacity="0.55" />
          </g>
          <g id="layer-historical-props-lod" aria-label="Đạo cụ lịch sử cận cảnh">
            <g transform="translate(1050 260)" filter="url(#filter-drop-shadow)">
              <rect width="1100" height="170" rx="12" fill="#7f1d2d" stroke="#e5bd69" strokeWidth="8" />
              <text x="550" y="72" textAnchor="middle" fill="#f9e3a8" fontSize="30" fontWeight="bold" fontFamily="serif">PARTI SOCIALISTE (S.F.I.O.)</text>
              <text x="550" y="112" textAnchor="middle" fill="#f9e3a8" fontSize="28" fontFamily="serif">18e CONGRÈS NATIONAL — TOURS</text>
              <text x="550" y="147" textAnchor="middle" fill="#f9e3a8" fontSize="22" fontFamily="serif">25–30 DÉCEMBRE 1920</text>
            </g>
            <g transform="translate(2350 780)">
              <rect width="90" height="120" rx="8" fill="#b91c1c" stroke="#f5d38a" strokeWidth="5" /><text x="45" y="75" textAnchor="middle" fill="#fff1c1" fontSize="30">OUI</text>
            </g>
          </g>
          <g id="layer-foreground-vignette" aria-label="Tiền cảnh và ánh sáng">
            <path d="M0 0H180V1200H0ZM3200 0H3020V1200H3200Z" fill="#190c13" opacity="0.36" />
            <path d="M700 0L1160 0L1780 820L1640 820Z" fill="#fff4c2" opacity="0.08" />
          </g>
        </svg>
      )}

      {/* 5. bg-ga-paris-tuyet: Gare du Nord / Hành trình bí mật sang Liên Xô, 1923 */}
      {bgId === "bg-ga-paris-tuyet" && (
        <svg viewBox="0 0 3200 1200" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="snowSky5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="snowGround5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="45%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <radialGradient id="locoLamp5" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="1" />
              <stop offset="25%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
                    <SharedBackgroundDefs />
          </defs>
          <g id="layer-sky-vista" transform="scale(1.6666667 1.1111111)">


          {/* Slate winter twilight sky */}
          <rect width="1920" height="680" fill="url(#snowSky5)" />

          {/* Grand Victorian Iron-and-Glass Vaulted Train Shed (Verrière de gare) */}
          <path d="M60 680 Q960 40 1860 680" stroke="#1e293b" strokeWidth="36" fill="none" />
          <path d="M240 680 Q960 160 1680 680" stroke="#1e293b" strokeWidth="24" fill="none" />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 15) * Math.PI;
            const x = 960 - Math.cos(angle) * 800;
            const y = 640 - Math.sin(angle) * 480;
            return <line key={i} x1={960} y1={100} x2={x} y2={y} stroke="#475569" strokeWidth="5" opacity="0.6" />;
          })}

          {/* ========================================================
              RIGHT WING (x: 1060 - 1880): French Steam Locomotive 231 "Pacific"
              ======================================================== */}
          <g transform="translate(1060, 240)">
            {/* Passenger coaches behind locomotive with warm glowing windows */}
            <rect x="520" y="140" width="360" height="200" rx="8" fill="#1c1917" stroke="#334155" strokeWidth="4" />
            {[550, 630, 710, 790].map((wx, i) => (
              <g key={i}>
                <rect x={wx} y="170" width="55" height="70" rx="4" fill="#fef08a" opacity="0.9" />
                <line x1={wx + 27} y1={170} x2={wx + 27} y2={240} stroke="#451a03" strokeWidth="2.5" />
                <line x1={wx} y1={205} x2={wx + 55} y2={205} stroke="#451a03" strokeWidth="2.5" />
              </g>
            ))}

            {/* Locomotive Boiler & Cab */}
            <rect x="40" y="160" width="460" height="180" rx="20" fill="#0f172a" />
            <rect x="420" y="100" width="140" height="240" rx="10" fill="#0f172a" />
            <rect x="110" y="100" width="55" height="75" rx="6" fill="#1e293b" />

            {/* Massive Billowing Steam hiding French surveillance */}
            <path d="M130 100 C70 10 10 -40 -60 -10 C-140 20 -220 -50 -320 -20" stroke="#f1f5f9" strokeWidth="75" strokeLinecap="round" opacity="0.65" fill="none" />
            <path d="M150 90 C210 -10 280 -40 380 -10" stroke="#e2e8f0" strokeWidth="60" strokeLinecap="round" opacity="0.45" fill="none" />

            {/* Giant Headlamp cutting through the snowstorm */}
            <circle cx="50" cy="240" r="160" fill="url(#locoLamp5)" />
            <circle cx="50" cy="240" r="32" fill="#fef08a" />
            <polygon points="50,240 -450,120 -450,360" fill="#fef08a" opacity="0.2" />

            {/* Heavy Driving Wheels and Connecting Rods */}
            <circle cx="160" cy="340" r="58" fill="#1e293b" stroke="#475569" strokeWidth="10" />
            <circle cx="300" cy="340" r="58" fill="#1e293b" stroke="#475569" strokeWidth="10" />
            <circle cx="440" cy="340" r="58" fill="#1e293b" stroke="#475569" strokeWidth="10" />
            <line x1="160" y1="340" x2="440" y2="340" stroke="#cbd5e1" strokeWidth="14" />
          </g>

          {/* ========================================================
              LEFT WING (x: 80 - 640): Station Gas Lamp, 19:00 Clock & Suitcase in Safe Zone
              ======================================================== */}
          {/* Antique 2-Faced Station Clock indicating 19:00 Departure */}
          <g transform="translate(480, 220)">
            <line x1="0" y1="-100" x2="0" y2="0" stroke="#1e293b" strokeWidth="8" />
            <circle cx="0" cy="0" r="52" fill="#ffffff" stroke="#1e293b" strokeWidth="10" />
            <circle cx="0" cy="0" r="44" fill="none" stroke="#64748b" strokeWidth="2.5" />
            {/* Clock hands: 7:00 PM */}
            <line x1="0" y1="0" x2="0" y2="-32" stroke="#0f172a" strokeWidth="5" />
            <line x1="0" y1="0" x2="0" y2="24" stroke="#0f172a" strokeWidth="6" />
            <circle cx="0" cy="0" r="6" fill="#991b1b" />
          </g>

          {/* Cast-Iron Gas Lamp Post in Left Wing */}
          <g transform="translate(240, 320)">
            <line x1="0" y1="0" x2="0" y2="360" stroke="#1e293b" strokeWidth="16" />
            <rect x="-30" y="-40" width="60" height="60" rx="8" fill="#fef08a" stroke="#0f172a" strokeWidth="4" />
            <circle cx="0" cy="-10" r="180" fill="url(#locoLamp5)" opacity="0.4" />
          </g>

          {/* Wicker Suitcase "TOURS - PARIS" & Snowy Umbrella (Returning from Tours, Dec 1920 - Grounded on Platform) */}
          <g transform="translate(340, 590)">
            <rect width="130" height="90" rx="8" fill="#854d0e" stroke="#451a03" strokeWidth="5" />
            <line x1="0" y1="45" x2="130" y2="45" stroke="#451a03" strokeWidth="3.5" />
            <rect x="55" y="35" width="20" height="20" rx="3" fill="#ca8a04" />
            <path d="M45 0 L85 0 L85 35 L45 35 Z" fill="none" stroke="#451a03" strokeWidth="5" />
            <text x="65" y="66" fill="#fef3c7" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
              TOURS - PARIS
            </text>
            {/* Black umbrella with snow on top */}
            <line x1="-15" y1="90" x2="40" y2="10" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="42" cy="22" rx="12" ry="5" fill="#ffffff" />
          </g>

          {/* Snow-Covered Platform & Railway Ballast Tracks */}
          <rect y="680" width="1920" height="400" fill="url(#snowGround5)" />
          <line x1="0" y1="700" x2="1920" y2="700" stroke="#334155" strokeWidth="16" />
          <line x1="0" y1="730" x2="1920" y2="730" stroke="#475569" strokeWidth="14" />
          <line x1="0" y1="770" x2="1920" y2="770" stroke="#1e293b" strokeWidth="10" />

          {/* Footprints in snow along platform */}
          <g opacity="0.5">
            {[260, 320, 390, 470, 560, 650].map((fx, i) => (
              <ellipse key={i} cx={fx} cy={760 + (i % 2) * 14} rx="14" ry="6" fill="#64748b" transform={`rotate(15 ${fx} ${760 + (i % 2) * 14})`} />
            ))}
          </g>

          {/* Drifting Snow Particles throughout scene */}
          <g>
            {Array.from({ length: 55 }).map((_, i) => (
              <circle
                key={i}
                cx={(i * 47) % 1920}
                cy={(i * 31) % 720}
                r={(i % 3) + 2.2}
                fill="#ffffff"
                className="vn-snow-particle"
                style={{ animationDelay: `${(i % 10) * 0.7}s` }}
              />
            ))}
          </g>
          </g>
          <g id="layer-architecture-mid" aria-label="Kiến trúc trung cảnh">
            <path d="M0 240H3200V850H0Z" fill="#9aa7b2" opacity="0.18" />
            <path d="M180 820V120M560 820V120M940 820V120M1320 820V120M1700 820V120M2080 820V120M2460 820V120M2840 820V120" stroke="#d7e1e6" strokeWidth="18" opacity="0.4" />
            <path d="M0 120Q1600 -40 3200 120" fill="none" stroke="#dbe5e8" strokeWidth="28" opacity="0.45" />
          </g>
          <g id="layer-historical-props-lod" aria-label="Đạo cụ lịch sử cận cảnh">
            <g transform="translate(1160 350)" filter="url(#filter-drop-shadow)">
              <circle cx="440" cy="80" r="78" fill="#d4b16a" stroke="#5d4831" strokeWidth="9" />
              <circle cx="440" cy="80" r="62" fill="#eee2bd" />
              <path d="M440 80V35M440 80L475 100" stroke="#3b3028" strokeWidth="7" />
              <text x="440" y="180" textAnchor="middle" fill="#f5e7bc" fontSize="25" fontFamily="serif">GARE DU NORD • 19:00</text>
            </g>
            <g transform="translate(2380 700)">
              <rect width="580" height="190" rx="12" fill="#111820" stroke="#52616d" strokeWidth="12" />
              <text x="290" y="68" textAnchor="middle" fill="#f0d48a" fontSize="28" fontFamily="serif">BILLETS INTERNATIONAUX</text>
              <text x="290" y="112" textAnchor="middle" fill="#f0d48a" fontSize="25" fontFamily="serif">PARIS — BERLIN — MOSCOU</text>
              <text x="290" y="153" textAnchor="middle" fill="#dce8ee" fontSize="20" fontFamily="serif">231 PACIFIC • VOIE 4</text>
            </g>
          </g>
          <g id="layer-foreground-vignette" aria-label="Tiền cảnh và ánh sáng">
            <path d="M0 0H170V1200H0ZM3200 0H3030V1200H3200Z" fill="#0b1016" opacity="0.4" />
            <path d="M2260 820L3200 560V700L2400 900Z" fill="#fef3c7" opacity="0.1" filter="url(#filter-lantern-bloom)" />
          </g>
        </svg>
      )}
    </>
  );
};
