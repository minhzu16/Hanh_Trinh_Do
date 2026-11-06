import React from "react";

export const BackgroundKy0: React.FC<{ bgId: string }> = ({ bgId }) => {
  return (
    <>
      {/* 1. bg-boong-tau-dem: Tàu Amiral Latouche-Tréville trên biển đêm (5/6/1911) */}
      {bgId === "bg-boong-tau-dem" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="skyNight11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#040812" />
              <stop offset="45%" stopColor="#0a1525" />
              <stop offset="100%" stopColor="#14243b" />
            </linearGradient>
            <linearGradient id="seaNight11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0b1726" />
              <stop offset="60%" stopColor="#060e18" />
              <stop offset="100%" stopColor="#02060b" />
            </linearGradient>
            <linearGradient id="deckWood11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#453327" />
              <stop offset="40%" stopColor="#31231a" />
              <stop offset="100%" stopColor="#18110d" />
            </linearGradient>
            <radialGradient id="moonGlow11" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#fef3c7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#fef3c7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="lampGlow11" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="beaconGlow11" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="funnelOchre11" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="20%" stopColor="#b45309" />
              <stop offset="60%" stopColor="#d97706" />
              <stop offset="85%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="funnelRim11" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a0a0c" />
              <stop offset="45%" stopColor="#1f242d" />
              <stop offset="100%" stopColor="#0a0a0c" />
            </linearGradient>
            <linearGradient id="bollardSteel11" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="35%" stopColor="#475569" />
              <stop offset="70%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="ropeCoil11" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#854d0e" />
              <stop offset="50%" stopColor="#a16207" />
              <stop offset="100%" stopColor="#583107" />
            </linearGradient>
          </defs>

          {/* Deep midnight sky */}
          <rect width="1920" height="660" fill="url(#skyNight11)" />

          {/* Starfield */}
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

          {/* Crescent Moon */}
          <circle cx="1680" cy="130" r="85" fill="url(#moonGlow11)" />
          <circle cx="1680" cy="130" r="32" fill="#fef3c7" />
          <circle cx="1695" cy="122" r="28" fill="#0c1626" />

          {/* Distant Cap Saint-Jacques / Cần Giờ Lighthouse Beacon on horizon */}
          <circle cx="360" cy="605" r="30" fill="url(#beaconGlow11)" />
          <circle cx="360" cy="605" r="3" fill="#ffffff" />
          <polygon points="360,605 0,590 0,620" fill="#fef08a" opacity="0.08" />

          {/* Historical Steamship: Chargeurs Réunis "Amiral Latouche-Tréville" Single Central Funnel */}
          <g id="latouche-funnel">
            {/* Funnel body (Golden Ochre / Vàng đất đặc trưng của Hãng Năm Sao) */}
            <path d="M745 295 L765 620 L885 620 L855 295 Z" fill="url(#funnelOchre11)" stroke="#522e13" strokeWidth="2" />

            {/* Top black soot rim */}
            <path d="M745 295 L749 350 L859 350 L855 295 Z" fill="url(#funnelRim11)" />
            <line x1="745" y1="295" x2="855" y2="295" stroke="#000000" strokeWidth="3" />

            {/* Steam relief exhaust pipe running alongside funnel */}
            <line x1="862" y1="280" x2="888" y2="620" stroke="#92400e" strokeWidth="4.5" />
            <polygon points="858,280 866,280 864,272 860,272" fill="#ca8a04" />

            {/* Signature Chargeurs Réunis Red Band with 5-Pointed White Medallion & Red Star */}
            <polygon points="752,395 862,395 866,455 756,455" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1" />
            <circle cx="810" cy="425" r="18" fill="#ffffff" />
            {/* 5-pointed red star emblem */}
            <polygon points="810,412 814,421 824,421 816,427 819,437 810,431 801,437 804,427 796,421 806,421" fill="#991b1b" />

            {/* Funnel Guy Wires / Wire Stays */}
            <line x1="750" y1="335" x2="630" y2="620" stroke="#1b232e" strokeWidth="2" opacity="0.6" />
            <line x1="854" y1="335" x2="980" y2="620" stroke="#1b232e" strokeWidth="2" opacity="0.6" />
          </g>

          {/* Billowing Coal Smoke across night sky from single central funnel */}
          <path d="M790 295 C710 220 540 215 370 255 C230 285 110 295 0 275" stroke="#141a24" strokeWidth="60" strokeLinecap="round" opacity="0.45" fill="none" />
          <path d="M795 295 C730 230 580 230 420 265 C290 290 170 300 0 280" stroke="#1f2937" strokeWidth="36" strokeLinecap="round" opacity="0.32" fill="none" />

          {/* Cowl Ventilators (Ống thông gió cổ ngỗng đồng) on ship deck */}
          <g transform="translate(1040, 500)">
            <path d="M40 120 L40 50 Q40 0 90 0 Q130 0 130 40 Q130 70 80 70 L60 70 L60 120 Z" fill="#92400e" stroke="#78350f" strokeWidth="3" />
            <ellipse cx="110" cy="35" rx="20" ry="25" fill="#451a03" />
          </g>

          {/* Steam cargo winch / capstan silhouette behind mast */}
          <g transform="translate(610, 550)" opacity="0.85">
            <rect x="0" y="30" width="80" height="40" rx="4" fill="#1e293b" />
            <circle cx="40" cy="30" r="24" fill="#334155" stroke="#0f172a" strokeWidth="4" />
            <rect x="15" y="10" width="50" height="15" rx="2" fill="#475569" />
            <line x1="40" y1="30" x2="120" y2="70" stroke="#1e293b" strokeWidth="4" />
          </g>

          {/* Two Historical Tall Cargo Masts / Derricks (Foremast & Mainmast) */}
          {/* 1. Foremast (Cột buồm trước / Cột cẩu hàng mũi tàu) */}
          <g id="latouche-foremast">
            <rect x="474" y="110" width="12" height="510" fill="#1f1814" />
            <rect x="470" y="105" width="20" height="8" rx="2" fill="#ca8a04" />
            <line x1="435" y1="225" x2="525" y2="225" stroke="#261b14" strokeWidth="5" />
            <line x1="480" y1="520" x2="350" y2="340" stroke="#3d281a" strokeWidth="5.5" />
            <line x1="480" y1="225" x2="350" y2="340" stroke="#1b232e" strokeWidth="2" opacity="0.7" />
            <line x1="480" y1="115" x2="260" y2="620" stroke="#1b232e" strokeWidth="2.2" opacity="0.6" />
            <line x1="480" y1="225" x2="360" y2="620" stroke="#1b232e" strokeWidth="1.8" opacity="0.5" />
            <line x1="480" y1="225" x2="590" y2="620" stroke="#1b232e" strokeWidth="1.8" opacity="0.5" />
          </g>

          {/* 2. Mainmast (Cột buồm sau / Cột cẩu hàng đuôi tàu) */}
          <g id="latouche-mainmast">
            <rect x="1314" y="130" width="12" height="490" fill="#1f1814" />
            <rect x="1310" y="125" width="20" height="8" rx="2" fill="#ca8a04" />
            <line x1="1275" y1="245" x2="1365" y2="245" stroke="#261b14" strokeWidth="5" />
            <line x1="1320" y1="530" x2="1455" y2="355" stroke="#3d281a" strokeWidth="5.5" />
            <line x1="1320" y1="245" x2="1455" y2="355" stroke="#1b232e" strokeWidth="2" opacity="0.7" />
            <line x1="1320" y1="135" x2="1120" y2="620" stroke="#1b232e" strokeWidth="2.2" opacity="0.6" />
            <line x1="1320" y1="245" x2="1520" y2="620" stroke="#1b232e" strokeWidth="1.8" opacity="0.5" />
            <line x1="1320" y1="135" x2="1780" y2="620" stroke="#1b232e" strokeWidth="1.8" opacity="0.45" />
          </g>

          {/* T.S.F Wireless Telegraph Aerial Wire connecting both masts */}
          <path d="M480 115 Q897 165 1320 135" stroke="#334155" strokeWidth="2" fill="none" opacity="0.65" />
          <line x1="897" y1="165" x2="897" y2="400" stroke="#334155" strokeWidth="1.5" opacity="0.45" />

          {/* Rolling dark ocean waves */}
          <rect y="600" width="1920" height="220" fill="url(#seaNight11)" />

          {/* Foaming White Bow Wake & Ocean Swell */}
          <g className="vn-wave-swell" opacity="0.75">
            <path d="M0 635 Q300 620 600 635 T1200 635 T1800 635 T1920 635" stroke="#1e3a5f" strokeWidth="3.5" fill="none" />
            <path d="M0 655 Q180 645 420 660 T980 655 T1520 660 T1920 655" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="12,18" fill="none" opacity="0.6" />
            <path d="M0 670 Q240 655 480 670 T960 670 T1440 670 T1920 670" stroke="#24446e" strokeWidth="2.5" fill="none" />
            <path d="M0 710 Q320 695 640 710 T1280 710 T1920 710" stroke="#1b3252" strokeWidth="2" fill="none" />
            {/* White froth lines along ship hull */}
            <path d="M120 695 Q380 675 720 690 T1420 680 T1920 690" stroke="#e0f2fe" strokeWidth="2" strokeDasharray="8,12" fill="none" opacity="0.5" />
          </g>

          {/* Moon shimmer trail on water */}
          <ellipse cx="1680" cy="630" rx="45" ry="4" fill="#fef3c7" opacity="0.35" />
          <ellipse cx="1680" cy="650" rx="70" ry="5" fill="#fef3c7" opacity="0.25" />
          <ellipse cx="1680" cy="675" rx="100" ry="6" fill="#fef3c7" opacity="0.18" />

          {/* Cargo Hatch with Canvas Tarpaulin and Wooden Wedges (Nắp hầm hàng phủ bạt) */}
          <g transform="translate(860, 640)">
            <polygon points="0,40 320,25 340,90 20,110" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
            <polygon points="5,45 315,30 330,85 20,102" fill="#334155" opacity="0.9" />
            {/* Wooden battens & tie-down straps */}
            <line x1="80" y1="38" x2="95" y2="105" stroke="#78350f" strokeWidth="4" />
            <line x1="160" y1="35" x2="175" y2="100" stroke="#78350f" strokeWidth="4" />
            <line x1="240" y1="32" x2="255" y2="95" stroke="#78350f" strokeWidth="4" />
          </g>

          {/* Teak Wood Deck Planks in 1-Point Perspective with Caulking Seams */}
          <polygon points="0,750 1920,680 1920,1080 0,1080" fill="url(#deckWood11)" />
          {[-400, -100, 200, 500, 800, 1100, 1400, 1700, 2000, 2300].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={750} x2={x - 220} y2={1080} stroke="#170f0a" strokeWidth="3.5" />
              <line x1={x + 2} y1={750} x2={x - 218} y2={1080} stroke="#5c4033" strokeWidth="1" opacity="0.4" />
            </g>
          ))}

          {/* Ship Bulwark and Teak Wood Railing with Brass Top */}
          <line x1="0" y1="720" x2="1920" y2="650" stroke="#ca8a04" strokeWidth="14" />
          <line x1="0" y1="722" x2="1920" y2="652" stroke="#fef08a" strokeWidth="2" opacity="0.7" />
          <line x1="0" y1="755" x2="1920" y2="685" stroke="#52361b" strokeWidth="7" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 102} y1={720 - i * 3.7} x2={i * 102} y2={785 - i * 3.3} stroke="#3e2918" strokeWidth="8" />
          ))}

          {/* Hanging Hurricane Kerosene Lantern */}
          <g className="vn-lamp-flicker">
            <line x1="320" y1="500" x2="320" y2="580" stroke="#78350f" strokeWidth="4" />
            <circle cx="320" cy="630" r="260" fill="url(#lampGlow11)" />
            {/* Brass lantern cap & base */}
            <rect x="306" y="580" width="28" height="12" rx="3" fill="#92400e" />
            <path d="M302 592 L338 592 L334 640 L306 640 Z" fill="#fef08a" opacity="0.95" />
            <rect x="304" y="640" width="32" height="18" rx="4" fill="#78350f" />
            <line x1="312" y1="592" x2="314" y2="640" stroke="#78350f" strokeWidth="2" />
            <line x1="328" y1="592" x2="326" y2="640" stroke="#78350f" strokeWidth="2" />
          </g>

          {/* Heavy Cast-Iron Mooring Bollard with Rivets & Brass Top (Tiền cảnh Cọc bích) */}
          <g transform="translate(1640, 820)">
            <ellipse cx="60" cy="180" rx="65" ry="24" fill="#0c1117" />
            <path d="M15 170 L25 50 Q60 40 95 50 L105 170 Z" fill="url(#bollardSteel11)" stroke="#0f172a" strokeWidth="3" />
            <ellipse cx="60" cy="50" rx="40" ry="15" fill="#334155" stroke="#475569" strokeWidth="2" />
            <ellipse cx="60" cy="46" rx="28" ry="10" fill="#cbd5e1" opacity="0.25" />
            {/* Steel rivets along bollard flange */}
            {[-35, -18, 0, 18, 35].map((dx, i) => (
              <circle key={i} cx={60 + dx} cy={165 + Math.abs(dx) * 0.15} r="3" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            ))}
          </g>

          {/* Coiled Mooring Hawser Rope (Cuộn dây thừng gai neo tàu) in Foreground */}
          <g transform="translate(1520, 890)">
            <ellipse cx="120" cy="90" rx="140" ry="55" fill="#0f172a" opacity="0.6" />
            <ellipse cx="120" cy="85" rx="130" ry="50" fill="none" stroke="url(#ropeCoil11)" strokeWidth="16" strokeDasharray="14,6" />
            <ellipse cx="120" cy="82" rx="100" ry="38" fill="none" stroke="url(#ropeCoil11)" strokeWidth="15" strokeDasharray="14,6" />
            <ellipse cx="120" cy="80" rx="70" ry="26" fill="none" stroke="url(#ropeCoil11)" strokeWidth="14" strokeDasharray="12,5" />
            <ellipse cx="120" cy="78" rx="40" ry="16" fill="none" stroke="url(#ropeCoil11)" strokeWidth="12" strokeDasharray="10,4" />
            <path d="M160 85 Q220 110 320 140" stroke="url(#ropeCoil11)" strokeWidth="15" strokeDasharray="14,6" fill="none" />
          </g>

          {/* Lifebuoy with Authentic Inscription: "AMIRAL LATOUCHE-TRÉVILLE" */}
          <g transform="translate(120, 760)">
            <ellipse cx="65" cy="65" rx="55" ry="55" fill="#991b1b" stroke="#fef3c7" strokeWidth="5" />
            <ellipse cx="65" cy="65" rx="28" ry="28" fill="#31231a" />
            <line x1="10" y1="65" x2="120" y2="65" stroke="#fef3c7" strokeWidth="6" />
            <line x1="65" y1="10" x2="65" y2="120" stroke="#fef3c7" strokeWidth="6" />
            <text x="65" y="24" fill="#ffffff" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              AMIRAL LATOUCHE-TRÉVILLE
            </text>
            <text x="65" y="112" fill="#ffffff" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
              LE HAVRE
            </text>
          </g>
        </svg>
      )}

      {/* 2. bg-phong-tro-paris: Căn phòng áp mái Paris (Villa des Gobelins / Impasse Compoint, 1919) */}
      {bgId === "bg-phong-tro-paris" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="parisSky19" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1126" />
              <stop offset="60%" stopColor="#3b1d40" />
              <stop offset="100%" stopColor="#5f2d4c" />
            </linearGradient>
            <linearGradient id="wallWood19" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#17120f" />
              <stop offset="40%" stopColor="#281d16" />
              <stop offset="100%" stopColor="#1a130f" />
            </linearGradient>
            <radialGradient id="deskLamp19" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="65%" stopColor="#d97706" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="plasterPeel19" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#854d0e" />
              <stop offset="100%" stopColor="#582a0b" />
            </linearGradient>
          </defs>

          {/* Attic walls with exposed timber beams */}
          <rect width="1920" height="1080" fill="url(#wallWood19)" />

          {/* Exposed Old Red Brickwork under Peeling Plaster */}
          <g transform="translate(180, 220)" opacity="0.6">
            <rect x="0" y="0" width="160" height="110" fill="url(#plasterPeel19)" rx="4" />
            {[0, 24, 48, 72, 96].map((y, row) => (
              <g key={row}>
                <line x1="0" y1={y} x2="160" y2={y} stroke="#2c1a0e" strokeWidth="2.5" />
                <line x1={(row % 2) * 25 + 20} y1={y} x2={(row % 2) * 25 + 20} y2={y + 24} stroke="#2c1a0e" strokeWidth="2" />
                <line x1={(row % 2) * 25 + 75} y1={y} x2={(row % 2) * 25 + 75} y2={y + 24} stroke="#2c1a0e" strokeWidth="2" />
                <line x1={(row % 2) * 25 + 130} y1={y} x2={(row % 2) * 25 + 130} y2={y + 24} stroke="#2c1a0e" strokeWidth="2" />
              </g>
            ))}
          </g>

          {/* Bookshelf on Wall with Marxist Texts & French-Vietnamese Dictionary */}
          <g transform="translate(680, 260)">
            <rect x="0" y="70" width="340" height="14" fill="#3d2719" stroke="#24170d" strokeWidth="2" />
            <polygon points="40,84 60,110 50,110 30,84" fill="#24170d" />
            <polygon points="290,84 310,110 300,110 280,84" fill="#24170d" />
            {/* Books on shelf */}
            <rect x="25" y="10" width="22" height="60" fill="#881337" rx="2" />
            <rect x="50" y="15" width="28" height="55" fill="#1e3a5f" rx="2" />
            <rect x="81" y="5" width="32" height="65" fill="#78350f" rx="2" />
            <rect x="116" y="20" width="20" height="50" fill="#14532d" rx="2" />
            <rect x="139" y="12" width="26" height="58" fill="#4c1d95" rx="2" />
            {/* Gold foil lines on book spines */}
            <line x1="83" y1="18" x2="111" y2="18" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="83" y1="24" x2="111" y2="24" stroke="#ca8a04" strokeWidth="1.5" />
          </g>

          {/* Slanted Mansard Attic Roof & Charpente Beams */}
          <polygon points="0,0 1280,0 680,1080 0,1080" fill="#130e0b" />
          <line x1="0" y1="0" x2="680" y2="1080" stroke="#3d2b20" strokeWidth="28" />
          <line x1="380" y1="0" x2="880" y2="1080" stroke="#322319" strokeWidth="20" />
          <line x1="0" y1="360" x2="850" y2="360" stroke="#3d2b20" strokeWidth="18" />

          {/* Heavy Oak Rafters framing the top edge (Tiền cảnh Xà gồ) */}
          <polygon points="0,0 1920,0 1920,65 0,90" fill="#1b120c" />
          <line x1="0" y1="90" x2="1920" y2="65" stroke="#382417" strokeWidth="6" />

          {/* Hanging Winter Overcoat & Wool Scarf on Iron Peg */}
          <g transform="translate(180, 110)">
            <circle cx="20" cy="20" r="5" fill="#0f172a" />
            <path d="M20 20 Q-10 60 -15 280 L55 280 Q45 60 20 20 Z" fill="#1c2536" stroke="#0f172a" strokeWidth="2" />
            <path d="M12 25 Q25 90 28 210 L42 205 Q35 85 24 25 Z" fill="#991b1b" opacity="0.85" />
            <ellipse cx="20" cy="35" rx="14" ry="10" fill="#2d3748" />
          </g>

          {/* Small Iron Bedstead with rough woolen blanket in corner */}
          <g transform="translate(40, 720)">
            <line x1="0" y1="60" x2="260" y2="60" stroke="#475569" strokeWidth="8" />
            <line x1="0" y1="0" x2="0" y2="140" stroke="#334155" strokeWidth="12" />
            <line x1="260" y1="30" x2="260" y2="140" stroke="#334155" strokeWidth="10" />
            {/* Mattress & Blanket */}
            <polygon points="10,60 250,60 270,110 5,110" fill="#64748b" opacity="0.85" />
            <polygon points="10,45 80,45 80,60 10,60" fill="#cbd5e1" opacity="0.9" />

            {/* The Famous Heated Brick (Viên gạch sưởi mùa đông Paris) wrapped in old newspaper */}
            <g transform="translate(180, 115)">
              <rect width="65" height="32" rx="4" fill="#991b1b" stroke="#78350f" strokeWidth="2" />
              <rect x="5" y="4" width="55" height="24" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <line x1="10" y1="12" x2="50" y2="12" stroke="#475569" strokeWidth="1.5" />
              <line x1="10" y1="18" x2="45" y2="18" stroke="#475569" strokeWidth="1" />
              <text x="32" y="22" fill="#991b1b" fontSize="5" fontFamily="serif" textAnchor="middle" fontWeight="bold">
                LE POPULAIRE
              </text>
            </g>
          </g>

          {/* Dormer Attic Window looking out to Paris */}
          <polygon points="1220,110 1780,110 1780,720 1220,720" fill="url(#parisSky19)" />

          {/* Paris Zinc Mansard Roofs & Terracotta Chimney Pots */}
          <polygon points="1220,620 1340,540 1480,590 1590,520 1710,570 1780,530 1780,720 1220,720" fill="#1b1220" />
          <rect x="1310" y="510" width="18" height="40" fill="#150e19" />
          <rect x="1335" y="520" width="16" height="30" fill="#150e19" />
          <rect x="1570" y="490" width="22" height="42" fill="#150e19" />

          {/* Eiffel Tower Silhouette in Paris Evening Twilight */}
          <path d="M1492 610 L1502 360 L1506 280 L1510 360 L1520 610 Z" fill="#140b18" opacity="0.8" />
          <line x1="1496" y1="480" x2="1516" y2="480" stroke="#140b18" strokeWidth="5" opacity="0.8" />
          <line x1="1490" y1="560" x2="1522" y2="560" stroke="#140b18" strokeWidth="7" opacity="0.8" />

          {/* Volumetric Twilight Light Shaft */}
          <polygon points="1220,110 1780,110 1920,1080 920,1080" fill="#fcd34d" className="vn-light-shaft" />

          {/* Heavy Window Frame */}
          <rect x="1205" y="95" width="590" height="640" fill="none" stroke="#4a3525" strokeWidth="26" />
          <line x1="1500" y1="95" x2="1500" y2="735" stroke="#4a3525" strokeWidth="16" />
          <line x1="1205" y1="415" x2="1795" y2="415" stroke="#4a3525" strokeWidth="16" />

          {/* Writing & Photography Retouching Desk */}
          <polygon points="120,780 1820,780 1920,1080 60,1080" fill="#2d1e16" />
          <polygon points="120,780 1820,780 1800,810 140,810" fill="#442e22" />

          {/* Vintage Bellows Folding Camera on Tripod (Thợ ảnh Nguyễn Ái Quốc) */}
          <g transform="translate(380, 580)">
            <line x1="90" y1="160" x2="20" y2="240" stroke="#78350f" strokeWidth="6" />
            <line x1="90" y1="160" x2="90" y2="240" stroke="#522507" strokeWidth="6" />
            <line x1="90" y1="160" x2="160" y2="240" stroke="#78350f" strokeWidth="6" />
            <rect x="55" y="80" width="70" height="80" rx="4" fill="#3f2314" stroke="#854d0e" strokeWidth="3" />
            <polygon points="125,95 180,110 180,140 125,155" fill="#1c1917" stroke="#78350f" strokeWidth="2" />
            <rect x="180" y="115" width="22" height="20" rx="3" fill="#d97706" />
            <circle cx="202" cy="125" r="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
          </g>

          {/* Photographer's Enamel Developer Tray, Tongs & Retouching Brushes on Desk */}
          <g transform="translate(620, 810)">
            <rect width="130" height="95" rx="5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
            <rect x="8" y="8" width="114" height="79" rx="3" fill="#334155" opacity="0.6" />
            {/* Photographic paper floating in chemical solution */}
            <rect x="25" y="20" width="75" height="52" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <ellipse cx="62" cy="46" rx="14" ry="18" fill="#64748b" opacity="0.4" />
            {/* Darkroom bamboo tongs */}
            <line x1="95" y1="15" x2="135" y2="5" stroke="#a16207" strokeWidth="3.5" />
            <line x1="95" y1="22" x2="135" y2="10" stroke="#a16207" strokeWidth="3.5" />
            {/* Fine squirrel hair retouching brushes */}
            <line x1="140" y1="70" x2="200" y2="55" stroke="#78350f" strokeWidth="3" />
            <line x1="140" y1="80" x2="205" y2="68" stroke="#78350f" strokeWidth="2.5" />
            <polygon points="135,71 142,69 140,73" fill="#0f172a" />
          </g>

          {/* Historic Manuscript: "Yêu sách của nhân dân An Nam" (Revendications du Peuple Annamite, 1919) */}
          <g transform="translate(860, 810) rotate(-4)">
            <rect x="0" y="0" width="170" height="220" fill="#f5eedc" rx="3" stroke="#d5c7aa" strokeWidth="2" />
            <text x="85" y="25" fill="#991b1b" fontSize="8" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              REVENDICATIONS DU PEUPLE ANNAMITE
            </text>
            <text x="85" y="40" fill="#44392e" fontSize="7" fontFamily="serif" textAnchor="middle" fontStyle="italic">
              (Yêu sách của nhân dân An Nam - 1919)
            </text>
            <line x1="20" y1="52" x2="150" y2="52" stroke="#44392e" strokeWidth="2.5" />
            <text x="22" y="70" fill="#1f2937" fontSize="7" fontFamily="serif">1. Tổng ân xá các phạm nhân chính trị</text>
            <text x="22" y="90" fill="#1f2937" fontSize="7" fontFamily="serif">2. Cải cách nền pháp lý Đông Dương</text>
            <text x="22" y="110" fill="#1f2937" fontSize="7" fontFamily="serif">3. Tự do báo chí và tự do ngôn luận</text>
            <text x="22" y="130" fill="#1f2937" fontSize="7" fontFamily="serif">4. Tự do lập hội và tự do hội họp</text>
            <text x="22" y="150" fill="#1f2937" fontSize="7" fontFamily="serif">5. Tự do cư trú và xuất ngoại</text>
            <text x="22" y="170" fill="#1f2937" fontSize="7" fontFamily="serif">6. Tự do học tập, mở trường học</text>
            <text x="22" y="190" fill="#1f2937" fontSize="7" fontFamily="serif">7. Thay chế độ sắc lệnh bằng chế độ luật</text>
            <text x="22" y="210" fill="#991b1b" fontSize="7" fontFamily="serif" fontWeight="bold">Nguyễn Ái Quốc thay mặt Hội</text>

            {/* Vintage French Stamped Envelope on side */}
            <g transform="translate(145, 140) rotate(12)">
              <rect width="70" height="45" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
              <rect x="52" y="4" width="14" height="18" fill="#1e3a5f" rx="1" />
              <line x1="8" y1="15" x2="45" y2="15" stroke="#475569" strokeWidth="1.5" />
              <line x1="8" y1="25" x2="40" y2="25" stroke="#475569" strokeWidth="1" />
            </g>
          </g>

          {/* Kerosene Lamp glowing warmly */}
          <g className="vn-lamp-flicker">
            <circle cx="1280" cy="740" r="280" fill="url(#deskLamp19)" />
            <ellipse cx="1280" cy="800" rx="32" ry="12" fill="#78350f" />
            <path d="M1264 800 Q1260 760 1268 740 L1292 740 Q1300 760 1296 800 Z" fill="#b45309" />
            <ellipse cx="1280" cy="735" rx="14" ry="25" fill="#fef08a" opacity="0.9" />
            <path d="M1272 735 L1275 660 L1285 660 L1288 735 Z" fill="#ffffff" opacity="0.45" />
          </g>

          {/* Brass Magnifying Glass on Desk (Tiền cảnh Kính lúp đồng) */}
          <g transform="translate(1080, 850)">
            <ellipse cx="25" cy="25" rx="22" ry="22" fill="#fef08a" opacity="0.25" stroke="#ca8a04" strokeWidth="4" />
            <line x1="42" y1="42" x2="70" y2="70" stroke="#854d0e" strokeWidth="6" strokeLinecap="round" />
            <line x1="42" y1="42" x2="48" y2="48" stroke="#ca8a04" strokeWidth="6" />
          </g>

          {/* Glass inkwell & dip pen */}
          <rect x="760" y="840" width="28" height="38" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <line x1="774" y1="835" x2="774" y2="815" stroke="#92400e" strokeWidth="4" />
          <line x1="730" y1="870" x2="780" y2="830" stroke="#b45309" strokeWidth="3" />
        </svg>
      )}

      {/* 3. bg-quan-ca-phe: Quán cà phê Paris, tháng 7/1920: Đọc tờ báo L'Humanité */}
      {bgId === "bg-quan-ca-phe" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="cafeWall20" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2b1915" />
              <stop offset="50%" stopColor="#20120f" />
              <stop offset="100%" stopColor="#140a08" />
            </linearGradient>
            <radialGradient id="cafeChandelier20" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="marbleTable20" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#553e30" />
              <stop offset="50%" stopColor="#634838" />
              <stop offset="100%" stopColor="#3d2b20" />
            </linearGradient>
            <linearGradient id="brassRim20" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#854d0e" />
              <stop offset="45%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* Parisian Bistro mahogany-paneled walls */}
          <rect width="1920" height="1080" fill="url(#cafeWall20)" />

          {/* Arched Window to Cobblestone Paris Street (Deep Background) */}
          <g transform="translate(760, 100)">
            <path d="M0 450 L0 180 Q200 40 400 180 L400 450 Z" fill="#111827" stroke="#3d2218" strokeWidth="18" />
            {/* Street outside: evening twilight, plane tree & gas lantern */}
            <rect x="15" y="150" width="370" height="290" fill="#1f2937" />
            {/* Bare winter plane tree silhouette */}
            <path d="M110 440 L115 300 Q120 220 80 180 M115 280 Q150 230 180 190" stroke="#0f172a" strokeWidth="6" fill="none" />
            {/* Parisian cobblestones */}
            {[0, 20, 40, 60].map((dy, idx) => (
              <line key={idx} x1="20" y1={360 + dy} x2="380" y2={360 + dy} stroke="#111827" strokeWidth="2" strokeDasharray="14,6" opacity="0.6" />
            ))}
            {/* Distant street gas lantern glowing */}
            <circle cx="280" cy="270" r="18" fill="#fef08a" opacity="0.5" />
            <circle cx="280" cy="270" r="3" fill="#ffffff" />
            <line x1="280" y1="270" x2="280" y2="440" stroke="#0f172a" strokeWidth="4" />
            {/* Window muntin bars */}
            <line x1="200" y1="90" x2="200" y2="445" stroke="#3d2218" strokeWidth="10" />
            <line x1="15" y1="260" x2="385" y2="260" stroke="#3d2218" strokeWidth="10" />
          </g>

          {/* Wainscoting Panels & Decorative Mouldings */}
          {Array.from({ length: 11 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 175 + 30}, 160)`}>
              <rect width="145" height="520" fill="#3a231b" rx="6" stroke="#4f3126" strokeWidth="4" />
              <rect x="14" y="20" width="117" height="480" fill="#291812" rx="4" stroke="#523428" strokeWidth="2" />
            </g>
          ))}

          {/* Belle Époque Wall Mirrors */}
          <rect x="360" y="190" width="340" height="440" rx="8" fill="#1b1d22" stroke="#b45309" strokeWidth="8" opacity="0.85" />
          <path d="M380 210 L680 610" stroke="#fcd34d" strokeWidth="1.5" opacity="0.15" />
          <rect x="1220" y="190" width="340" height="440" rx="8" fill="#1b1d22" stroke="#b45309" strokeWidth="8" opacity="0.85" />
          <path d="M1240 210 L1540 610" stroke="#fcd34d" strokeWidth="1.5" opacity="0.15" />

          {/* French Bistro Chalkboard Menu (Ardoise de café) */}
          <g transform="translate(120, 240)">
            <rect width="180" height="260" rx="6" fill="#18181b" stroke="#854d0e" strokeWidth="8" />
            <text x="90" y="45" fill="#fef3c7" fontSize="13" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              CAFÉ DE PARIS
            </text>
            <line x1="30" y1="55" x2="150" y2="55" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="35" y="85" fill="#e4e4e7" fontSize="10" fontFamily="sans-serif">Café noir ... 0.15 F</text>
            <text x="35" y="115" fill="#e4e4e7" fontSize="10" fontFamily="sans-serif">Chocolat ... 0.20 F</text>
            <text x="35" y="145" fill="#e4e4e7" fontSize="10" fontFamily="sans-serif">Brioche ... 0.10 F</text>
            <text x="35" y="175" fill="#e4e4e7" fontSize="10" fontFamily="sans-serif">Liqueur ... 0.35 F</text>
          </g>

          {/* French Thonet Bentwood Chair Silhouette in background */}
          <g transform="translate(260, 520)" opacity="0.45">
            <path d="M60 0 Q100 0 100 80 L100 280 L80 280 L80 140 Q60 140 40 140 L40 280 L20 280 L20 80 Q20 0 60 0 Z" fill="#2d1a13" />
            <ellipse cx="60" cy="140" rx="45" ry="12" fill="#3f271d" />
          </g>

          {/* Glowing Wall Sconces */}
          <g className="vn-lamp-flicker">
            <circle cx="530" cy="180" r="260" fill="url(#cafeChandelier20)" />
            <ellipse cx="530" cy="170" rx="16" ry="12" fill="#fef08a" />
            <path d="M515 180 Q530 220 545 180 Z" fill="#92400e" />

            <circle cx="1390" cy="180" r="260" fill="url(#cafeChandelier20)" />
            <ellipse cx="1390" cy="170" rx="16" ry="12" fill="#fef08a" />
            <path d="M1375 180 Q1390 220 1405 180 Z" fill="#92400e" />
          </g>

          {/* Hydraulic Encaustic Cement Floor Tiles peeking below table */}
          <g transform="translate(0, 800)" opacity="0.35">
            {Array.from({ length: 16 }).map((_, i) => (
              <g key={i} transform={`translate(${i * 125}, 0)`}>
                <rect width="120" height="280" fill={i % 2 === 0 ? "#1c1917" : "#292524"} />
                <polygon points="60,20 100,80 60,140 20,80" fill="#881337" opacity="0.4" />
                <circle cx="60" cy="80" r="15" fill="#d97706" opacity="0.3" />
              </g>
            ))}
          </g>

          {/* Round Guéridon Marble Bistro Table with Beveled Brass Rim */}
          <ellipse cx="960" cy="940" rx="740" ry="260" fill="#21140e" />
          <ellipse cx="960" cy="920" rx="710" ry="240" fill="url(#marbleTable20)" stroke="url(#brassRim20)" strokeWidth="12" />

          {/* Authentic Historic Issue: L'Humanité (16-17 Juillet 1920) */}
          <g transform="translate(640, 800) rotate(-5)">
            <polygon points="-5,12 430,12 490,180 30,180" fill="#140a08" opacity="0.6" />
            <polygon points="0,0 420,0 470,165 20,165" fill="#f5eedc" stroke="#d5c3a3" strokeWidth="2" />
            {/* Masthead Banner */}
            <rect x="25" y="14" width="370" height="30" fill="#881337" rx="3" />
            <text x="35" y="35" fill="#fef2f2" fontSize="19" fontFamily="serif" fontWeight="bold" letterSpacing="4">
              L'HUMANITÉ
            </text>
            <text x="240" y="34" fill="#fecdd3" fontSize="10" fontFamily="sans-serif">
              16–17 JUILLET 1920
            </text>
            {/* Lenin's Theses on National & Colonial Questions Headline */}
            <rect x="28" y="52" width="360" height="18" fill="#1f2937" rx="2" />
            <text x="35" y="65" fill="#fef08a" fontSize="10" fontFamily="serif" fontWeight="bold">
              PREMIÈRE ESQUISSE DES THÈSES - V. I. LÉNINE
            </text>
            <text x="28" y="85" fill="#111827" fontSize="9" fontFamily="serif" fontWeight="bold">
              (Sơ thảo lần thứ nhất Luận cương về vấn đề dân tộc và thuộc địa)
            </text>
            <line x1="28" y1="96" x2="410" y2="96" stroke="#4b5563" strokeWidth="2" />
            <line x1="28" y1="108" x2="400" y2="108" stroke="#4b5563" strokeWidth="2" />
            <line x1="28" y1="120" x2="390" y2="120" stroke="#4b5563" strokeWidth="2" />
            <line x1="28" y1="132" x2="350" y2="132" stroke="#4b5563" strokeWidth="2" />
            <line x1="28" y1="144" x2="380" y2="144" stroke="#4b5563" strokeWidth="2" />
          </g>

          {/* Classic French Faience Cup with Drip Coffee Filter (Café filtre) */}
          <g transform="translate(1220, 840)">
            <ellipse cx="60" cy="50" rx="46" ry="24" fill="#faf5ef" stroke="#d4c3b3" strokeWidth="3" />
            <ellipse cx="60" cy="46" rx="34" ry="18" fill="#78350f" />
            <ellipse cx="60" cy="46" rx="28" ry="14" fill="#542307" />
            {/* Tin drip cylinder */}
            <rect x="42" y="10" width="36" height="35" fill="#94a3b8" stroke="#64748b" strokeWidth="2" rx="3" />
            <ellipse cx="60" cy="10" rx="18" ry="6" fill="#cbd5e1" />
            {/* Brass spoon */}
            <line x1="10" y1="70" x2="80" y2="30" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* Glass Sugar Dispenser & Antique French Franc Coins on Saucer */}
          <g transform="translate(480, 840)">
            {/* Ceramic saucer */}
            <ellipse cx="40" cy="40" rx="35" ry="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            {/* Glass dispenser */}
            <path d="M25 36 L28 10 Q40 5 52 10 L55 36 Z" fill="#e0f2fe" opacity="0.75" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="36,10 44,10 42,0 38,0" fill="#cbd5e1" />
            {/* Antique Franc Coins */}
            <ellipse cx="90" cy="46" rx="12" ry="7" fill="#ca8a04" stroke="#854d0e" strokeWidth="1.5" />
            <ellipse cx="106" cy="48" rx="10" ry="6" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          </g>
        </svg>
      )}

      {/* 4. bg-hoi-truong-tours: Salle du Manège, Đại hội XVIII Đảng Xã hội Pháp tại Tours, 12/1920 */}
      {bgId === "bg-hoi-truong-tours" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="toursHall4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#191116" />
              <stop offset="50%" stopColor="#271821" />
              <stop offset="100%" stopColor="#130b10" />
            </linearGradient>
            <radialGradient id="toursChandelier4" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="toursLightBeam4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#fde047" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Monumental Congress Hall Walls */}
          <rect width="1920" height="1080" fill="url(#toursHall4)" />

          {/* Eiffel-Style Industrial Iron Lattice Trusses of Salle du Manège */}
          <path d="M120 720 L120 280 Q960 40 1800 280 L1800 720 Z" fill="#24171f" opacity="0.85" />
          <path d="M260 720 L260 360 Q960 140 1660 360 L1660 720 Z" fill="#1a0f15" opacity="0.9" />

          {/* Skylight Glass Panes in Ceiling */}
          <g opacity="0.3">
            {[420, 600, 780, 960, 1140, 1320, 1500].map((x, i) => (
              <polygon key={i} points={`${x - 40},80 ${x + 40},80 ${x + 30},140 ${x - 30},140`} fill="#93c5fd" />
            ))}
          </g>

          {/* Volumetric Light Beams streaming through smoke (Tia sáng thể tích) */}
          <polygon points="600,80 780,80 1120,780 720,780" fill="url(#toursLightBeam4)" className="vn-light-shaft" />
          <polygon points="1140,80 1320,80 1560,780 1200,780" fill="url(#toursLightBeam4)" className="vn-light-shaft" />

          {/* Iron Girders with Rivets */}
          <path d="M120 280 Q960 40 1800 280" stroke="#374151" strokeWidth="24" fill="none" />
          <path d="M260 360 Q960 140 1660 360" stroke="#374151" strokeWidth="16" fill="none" />
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={260 + i * 105} y1={360 - Math.sin((i / 13) * Math.PI) * 200} x2={260 + i * 105} y2={280 - Math.sin((i / 13) * Math.PI) * 220} stroke="#4b5563" strokeWidth="4" />
          ))}

          {/* Historic Velvet Congress Banner: "PROLÉTAIRES DE TOUS LES PAYS, UNISSEZ-VOUS!" */}
          <g opacity="0.95">
            <polygon points="320,150 1600,150 1560,240 360,240" fill="#881337" stroke="#fcd34d" strokeWidth="4" />
            <text x="960" y="200" fill="#fef2f2" fontSize="26" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="3">
              18e CONGRÈS NATIONAL - TOURS (25–30 DÉCEMBRE 1920)
            </text>
            <text x="960" y="228" fill="#fde047" fontSize="18" fontFamily="serif" textAnchor="middle" fontStyle="italic">
              "Prolétaires de tous les pays, unissez-vous !"
            </text>
          </g>

          {/* Side Crimson Drapes with Gold Tassels */}
          <g opacity="0.9">
            <polygon points="180,220 300,220 280,600 240,560 200,600" fill="#9f1239" />
            <polygon points="1620,220 1740,220 1720,600 1680,560 1640,600" fill="#9f1239" />
          </g>

          {/* Ornate Crystal Chandelier radiating golden light */}
          <circle cx="960" cy="180" r="380" fill="url(#toursChandelier4)" />
          <line x1="960" y1="0" x2="960" y2="120" stroke="#f59e0b" strokeWidth="4" />
          <ellipse cx="960" cy="120" rx="90" ry="24" fill="#d97706" />
          <path d="M880 120 Q960 210 1040 120 Z" fill="#fef08a" opacity="0.8" />

          {/* Speaker's Elevated Podium (Tribune) where Nguyễn Ái Quốc spoke */}
          <polygon points="720,520 1200,520 1280,740 640,740" fill="#3b241c" stroke="#5c382a" strokeWidth="6" />
          <polygon points="780,480 1140,480 1160,520 760,520" fill="#4d3025" />
          <rect x="910" y="440" width="100" height="70" fill="#633c2a" rx="4" />
          <polygon points="900,440 1020,440 1010,410 910,410" fill="#7a4b35" />
          {/* Glass water decanter on podium */}
          <ellipse cx="1060" cy="500" rx="8" ry="14" fill="#93c5fd" opacity="0.75" />
          {/* Chairman's Brass Bell */}
          <ellipse cx="850" cy="506" rx="9" ry="7" fill="#ca8a04" stroke="#854d0e" strokeWidth="1.5" />
          <line x1="850" y1="500" x2="850" y2="492" stroke="#854d0e" strokeWidth="3" />

          {/* Massive Rows of Seated Delegates with Red Voting Cards (Cartes de vote) */}
          <ellipse cx="960" cy="840" rx="880" ry="180" fill="#180d15" />
          <ellipse cx="960" cy="940" rx="980" ry="200" fill="#11080f" />
          <ellipse cx="960" cy="1040" rx="1040" ry="200" fill="#0b0409" />

          {/* Raised red voting cards during historic vote to join Comintern (SFIO - 18e CONGRÈS) */}
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`translate(${160 + i * 70}, ${750 + ((i % 4) * 12)})`}>
              <circle cx="0" cy="0" r="16" fill="#140a11" />
              {/* Hand holding red card */}
              <line x1="8" y1="-5" x2="16" y2="-30" stroke="#140a11" strokeWidth="4" />
              <rect x="10" y="-45" width="16" height="22" rx="1" fill="#dc2626" transform="rotate(-8)" />
              <line x1="12" y1="-38" x2="22" y2="-38" stroke="#fef2f2" strokeWidth="1" transform="rotate(-8)" />
            </g>
          ))}
        </svg>
      )}

      {/* 5. bg-ga-paris-tuyet: Gare du Nord / Hành trình bí mật sang Liên Xô, 1923 */}
      {bgId === "bg-ga-paris-tuyet" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="snowSky5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#131923" />
              <stop offset="60%" stopColor="#263142" />
              <stop offset="100%" stopColor="#455366" />
            </linearGradient>
            <linearGradient id="snowGround5" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="40%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>

          {/* Winter slate twilight sky */}
          <rect width="1920" height="700" fill="url(#snowSky5)" />

          {/* Victorian Arched Iron-and-Glass Train Shed Trusses (Verrière de gare) */}
          <path d="M80 700 Q960 60 1840 700" stroke="#1e2634" strokeWidth="32" fill="none" />
          <path d="M260 700 Q960 180 1660 700" stroke="#1e2634" strokeWidth="22" fill="none" />
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 13) * Math.PI;
            const x = 960 - Math.cos(angle) * 780;
            const y = 620 - Math.sin(angle) * 440;
            return <line key={i} x1={960} y1={120} x2={x} y2={y} stroke="#334155" strokeWidth="4" opacity="0.6" />;
          })}

          {/* Antique Two-Faced Station Clock hanging from arched roof (Đồng hồ nhà ga 19:00) */}
          <g transform="translate(960, 240)">
            <line x1="0" y1="-80" x2="0" y2="0" stroke="#1e293b" strokeWidth="6" />
            <circle cx="0" cy="0" r="45" fill="#f8fafc" stroke="#1e293b" strokeWidth="8" />
            <circle cx="0" cy="0" r="38" fill="none" stroke="#475569" strokeWidth="2" />
            {/* Clock hands: 7:00 PM departure */}
            <line x1="0" y1="0" x2="0" y2="-26" stroke="#0f172a" strokeWidth="4" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="#0f172a" strokeWidth="5" />
            <circle cx="0" cy="0" r="5" fill="#991b1b" />
          </g>

          {/* French Steam Locomotive 231 "Pacific" Silhouette */}
          <g transform="translate(680, 420)">
            {/* Passenger coaches attached to rear (Toa tàu khách vách gỗ) */}
            <rect x="580" y="80" width="480" height="200" rx="8" fill="#1c1917" stroke="#292524" strokeWidth="4" />
            {[610, 710, 810, 910].map((wx, i) => (
              <g key={i}>
                <rect x={wx} y="110" width="65" height="75" rx="4" fill="#fef08a" opacity="0.85" />
                <line x1={wx + 32} y1="110" x2={wx + 32} y2="185" stroke="#451a03" strokeWidth="3" />
                <line x1={wx} y1="145" x2={wx + 65} y2="145" stroke="#451a03" strokeWidth="3" />
              </g>
            ))}

            <rect x="40" y="100" width="460" height="180" rx="20" fill="#0f172a" />
            <rect x="420" y="40" width="160" height="240" rx="10" fill="#0f172a" />
            <rect x="110" y="40" width="50" height="80" rx="6" fill="#1e293b" />
            {/* Massive Billowing Steam obscuring French surveillance */}
            <path d="M120 40 C70 -40 20 -100 -50 -70 C-120 -40 -180 -120 -260 -90" stroke="#e2e8f0" strokeWidth="60" strokeLinecap="round" opacity="0.45" fill="none" />
            <path d="M140 30 C190 -60 260 -90 340 -60" stroke="#cbd5e1" strokeWidth="50" strokeLinecap="round" opacity="0.35" fill="none" />
            {/* Locomotive Headlamp */}
            <circle cx="50" cy="180" r="28" fill="#fef08a" />
            <polygon points="50,180 -380,80 -380,280" fill="#fef08a" opacity="0.15" />
            {/* Driving wheels */}
            <circle cx="160" cy="280" r="54" fill="#1e293b" stroke="#475569" strokeWidth="8" />
            <circle cx="300" cy="280" r="54" fill="#1e293b" stroke="#475569" strokeWidth="8" />
            <circle cx="440" cy="280" r="54" fill="#1e293b" stroke="#475569" strokeWidth="8" />
            <line x1="160" y1="280" x2="440" y2="280" stroke="#94a3b8" strokeWidth="12" />
          </g>

          {/* Snow Platform & Railway Tracks */}
          <rect y="700" width="1920" height="380" fill="url(#snowGround5)" />
          {/* Ballast stones and frosty tracks */}
          <line x1="0" y1="710" x2="1920" y2="710" stroke="#334155" strokeWidth="14" />
          <line x1="0" y1="735" x2="1920" y2="735" stroke="#475569" strokeWidth="12" />
          <line x1="0" y1="770" x2="1920" y2="770" stroke="#1e293b" strokeWidth="10" />

          {/* Footprints in the snow along platform edge */}
          <g opacity="0.45">
            {[280, 340, 400, 480, 560, 640].map((fx, i) => (
              <g key={i}>
                <ellipse cx={fx} cy={820 + (i % 2) * 12} rx="12" ry="5" fill="#64748b" transform={`rotate(${15 - (i % 2) * 8} ${fx} ${820 + (i % 2) * 12})`} />
                <circle cx={fx + 10} cy={819 + (i % 2) * 12} r="3" fill="#64748b" />
              </g>
            ))}
          </g>

          {/* Cast-Iron Gas Lantern Post (Réverbère en fonte) */}
          <g transform="translate(360, 480)">
            <line x1="0" y1="0" x2="0" y2="280" stroke="#1e293b" strokeWidth="14" />
            <rect x="-24" y="-30" width="48" height="50" rx="8" fill="#fef08a" />
            <circle cx="0" cy="-5" r="140" fill="#fef08a" opacity="0.18" />
          </g>

          {/* Wicker Travel Suitcase & Snowy Umbrella in Foreground */}
          <g transform="translate(460, 770)">
            <rect width="120" height="85" rx="8" fill="#78350f" stroke="#451a03" strokeWidth="4" />
            <line x1="0" y1="42" x2="120" y2="42" stroke="#451a03" strokeWidth="3" />
            <rect x="50" y="32" width="20" height="20" rx="3" fill="#ca8a04" />
            <path d="M42 0 L78 0 L78 32 L42 32 Z" fill="none" stroke="#451a03" strokeWidth="4" />
            <text x="60" y="60" fill="#fef3c7" fontSize="8" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
              PARIS - BERLIN
            </text>
            {/* Snowy Umbrella leaning against suitcase */}
            <line x1="-15" y1="85" x2="35" y2="10" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />
            <path d="M10 30 Q28 15 45 35 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            {/* Snow on umbrella tip */}
            <ellipse cx="38" cy="22" rx="10" ry="4" fill="#ffffff" opacity="0.9" />
          </g>

          {/* Drifting Snow Particles */}
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
    </>
  );
};
