import React from "react";

interface SceneBackgroundProps {
  bgId: string;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ bgId }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none vn-scene-drift">
      {/* 1. bg-boong-tau-dem: Tàu Đô đốc Latouche-Tréville rời cảng Sài Gòn, 5/6/1911 */}
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

          {/* Historical Steamship: Chargeurs Réunis "Amiral Latouche-Tréville" Twin Funnels */}
          {/* Funnel 1 */}
          <g>
            <path d="M710 320 L725 620 L805 620 L795 320 Z" fill="#141920" />
            {/* Chargeurs Réunis signature Red band and 5-pointed white star emblem */}
            <polygon points="718,410 798,410 801,460 721,460" fill="#991b1b" />
            <circle cx="760" cy="435" r="14" fill="#ffffff" />
            <polygon points="760,424 764,432 773,432 766,437 769,445 760,440 751,445 754,437 747,432 756,432" fill="#991b1b" />
          </g>
          {/* Funnel 2 */}
          <g>
            <path d="M825 340 L838 620 L912 620 L902 340 Z" fill="#181e26" />
            <polygon points="832,425 906,425 909,475 835,475" fill="#991b1b" />
            <circle cx="872" cy="450" r="14" fill="#ffffff" />
            <polygon points="872,439 876,447 885,447 878,452 881,460 872,455 863,460 866,452 859,447 868,447" fill="#991b1b" />
          </g>

          {/* Billowing Coal Smoke across night sky */}
          <path d="M710 320 C640 270 510 260 380 300 C280 330 160 340 50 320" stroke="#1c2533" strokeWidth="52" strokeLinecap="round" opacity="0.38" fill="none" />
          <path d="M825 340 C750 280 630 270 480 320" stroke="#253244" strokeWidth="38" strokeLinecap="round" opacity="0.28" fill="none" />

          {/* Cowl Ventilators (Ống thông gió cổ ngỗng đồng) on ship deck */}
          <g transform="translate(1040, 500)">
            <path d="M40 120 L40 50 Q40 0 90 0 Q130 0 130 40 Q130 70 80 70 L60 70 L60 120 Z" fill="#92400e" stroke="#78350f" strokeWidth="3" />
            <ellipse cx="110" cy="35" rx="20" ry="25" fill="#451a03" />
          </g>

          {/* Ship Mast & Rigging cables */}
          <rect x="1240" y="140" width="12" height="500" fill="#1f1814" />
          <line x1="1246" y1="160" x2="680" y2="620" stroke="#1b232e" strokeWidth="2.5" opacity="0.6" />
          <line x1="1246" y1="240" x2="1620" y2="620" stroke="#1b232e" strokeWidth="2" opacity="0.5" />
          <line x1="1246" y1="190" x2="1850" y2="620" stroke="#1b232e" strokeWidth="2" opacity="0.4" />

          {/* Rolling dark ocean waves */}
          <rect y="600" width="1920" height="220" fill="url(#seaNight11)" />
          <g className="vn-wave-swell" opacity="0.65">
            <path d="M0 640 Q300 625 600 640 T1200 640 T1800 640 T1920 640" stroke="#1e3a5f" strokeWidth="3" fill="none" />
            <path d="M0 670 Q240 655 480 670 T960 670 T1440 670 T1920 670" stroke="#24446e" strokeWidth="2.5" fill="none" />
            <path d="M0 710 Q320 695 640 710 T1280 710 T1920 710" stroke="#1b3252" strokeWidth="2" fill="none" />
          </g>

          {/* Moon shimmer trail on water */}
          <ellipse cx="1680" cy="630" rx="45" ry="4" fill="#fef3c7" opacity="0.35" />
          <ellipse cx="1680" cy="650" rx="70" ry="5" fill="#fef3c7" opacity="0.25" />
          <ellipse cx="1680" cy="675" rx="100" ry="6" fill="#fef3c7" opacity="0.18" />

          {/* Teak Wood Deck Planks in 1-Point Perspective */}
          <polygon points="0,750 1920,680 1920,1080 0,1080" fill="url(#deckWood11)" />
          {[-400, -100, 200, 500, 800, 1100, 1400, 1700, 2000, 2300].map((x, i) => (
            <line key={i} x1={x} y1={750} x2={x - 220} y2={1080} stroke="#221812" strokeWidth="2" opacity="0.75" />
          ))}

          {/* Ship Bulwark and Teak Wood Railing with Brass Top */}
          <line x1="0" y1="720" x2="1920" y2="650" stroke="#ca8a04" strokeWidth="12" />
          <line x1="0" y1="755" x2="1920" y2="685" stroke="#52361b" strokeWidth="7" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 102} y1={720 - i * 3.7} x2={i * 102} y2={785 - i * 3.3} stroke="#3e2918" strokeWidth="7" />
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
          </defs>

          {/* Attic walls with exposed timber beams */}
          <rect width="1920" height="1080" fill="url(#wallWood19)" />

          {/* Slanted Mansard Attic Roof & Charpente Beams */}
          <polygon points="0,0 1280,0 680,1080 0,1080" fill="#130e0b" />
          <line x1="0" y1="0" x2="680" y2="1080" stroke="#3d2b20" strokeWidth="28" />
          <line x1="380" y1="0" x2="880" y2="1080" stroke="#322319" strokeWidth="20" />
          <line x1="0" y1="360" x2="850" y2="360" stroke="#3d2b20" strokeWidth="18" />

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
          <g transform="translate(420, 580)">
            <line x1="90" y1="160" x2="20" y2="240" stroke="#78350f" strokeWidth="6" />
            <line x1="90" y1="160" x2="90" y2="240" stroke="#522507" strokeWidth="6" />
            <line x1="90" y1="160" x2="160" y2="240" stroke="#78350f" strokeWidth="6" />
            <rect x="55" y="80" width="70" height="80" rx="4" fill="#3f2314" stroke="#854d0e" strokeWidth="3" />
            <polygon points="125,95 180,110 180,140 125,155" fill="#1c1917" stroke="#78350f" strokeWidth="2" />
            <rect x="180" y="115" width="22" height="20" rx="3" fill="#d97706" />
            <circle cx="202" cy="125" r="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
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
          </g>

          {/* Kerosene Lamp glowing warmly */}
          <g className="vn-lamp-flicker">
            <circle cx="1280" cy="740" r="280" fill="url(#deskLamp19)" />
            <ellipse cx="1280" cy="800" rx="32" ry="12" fill="#78350f" />
            <path d="M1264 800 Q1260 760 1268 740 L1292 740 Q1300 760 1296 800 Z" fill="#b45309" />
            <ellipse cx="1280" cy="735" rx="14" ry="25" fill="#fef08a" opacity="0.9" />
            <path d="M1272 735 L1275 660 L1285 660 L1288 735 Z" fill="#ffffff" opacity="0.45" />
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
          </defs>

          {/* Parisian Bistro mahogany-paneled walls */}
          <rect width="1920" height="1080" fill="url(#cafeWall20)" />

          {/* Wainscoting Panels & Decorative Mouldings */}
          {Array.from({ length: 11 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 175 + 30}, 160)`}>
              <rect width="145" height="520" fill="#3a231b" rx="6" stroke="#4f3126" strokeWidth="4" />
              <rect x="14" y="20" width="117" height="480" fill="#291812" rx="4" stroke="#523428" strokeWidth="2" />
            </g>
          ))}

          {/* Belle Époque Wall Mirrors */}
          <rect x="420" y="200" width="340" height="420" rx="8" fill="#1b1d22" stroke="#b45309" strokeWidth="8" opacity="0.85" />
          <path d="M440 220 L740 600" stroke="#fcd34d" strokeWidth="1.5" opacity="0.15" />
          <rect x="1160" y="200" width="340" height="420" rx="8" fill="#1b1d22" stroke="#b45309" strokeWidth="8" opacity="0.85" />
          <path d="M1180 220 L1480 600" stroke="#fcd34d" strokeWidth="1.5" opacity="0.15" />

          {/* French Thonet Bentwood Chair Silhouette in background */}
          <g transform="translate(240, 520)" opacity="0.4">
            <path d="M60 0 Q100 0 100 80 L100 280 L80 280 L80 140 Q60 140 40 140 L40 280 L20 280 L20 80 Q20 0 60 0 Z" fill="#2d1a13" />
            <ellipse cx="60" cy="140" rx="45" ry="12" fill="#3f271d" />
          </g>

          {/* Glowing Wall Sconces */}
          <g className="vn-lamp-flicker">
            <circle cx="590" cy="190" r="260" fill="url(#cafeChandelier20)" />
            <ellipse cx="590" cy="180" rx="16" ry="12" fill="#fef08a" />
            <path d="M575 190 Q590 230 605 190 Z" fill="#92400e" />

            <circle cx="1330" cy="190" r="260" fill="url(#cafeChandelier20)" />
            <ellipse cx="1330" cy="180" rx="16" ry="12" fill="#fef08a" />
            <path d="M1315 190 Q1330 230 1345 190 Z" fill="#92400e" />
          </g>

          {/* Round Guéridon Marble Bistro Table with Brass Rim */}
          <ellipse cx="960" cy="940" rx="740" ry="260" fill="#21140e" />
          <ellipse cx="960" cy="920" rx="710" ry="240" fill="url(#marbleTable20)" stroke="#b45309" strokeWidth="9" />

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
          </defs>

          {/* Monumental Congress Hall Walls */}
          <rect width="1920" height="1080" fill="url(#toursHall4)" />

          {/* Eiffel-Style Industrial Iron Lattice Trusses of Salle du Manège */}
          <path d="M120 720 L120 280 Q960 40 1800 280 L1800 720 Z" fill="#24171f" opacity="0.85" />
          <path d="M260 720 L260 360 Q960 140 1660 360 L1660 720 Z" fill="#1a0f15" opacity="0.9" />

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

          {/* Massive Rows of Seated Delegates with Red Voting Cards (Cartes de vote) */}
          <ellipse cx="960" cy="840" rx="880" ry="180" fill="#180d15" />
          <ellipse cx="960" cy="940" rx="980" ry="200" fill="#11080f" />
          <ellipse cx="960" cy="1040" rx="1040" ry="200" fill="#0b0409" />

          {/* Raised red voting cards during historic vote to join Comintern */}
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`translate(${160 + i * 70}, ${750 + ((i % 4) * 12)})`}>
              <circle cx="0" cy="0" r="16" fill="#140a11" />
              {/* Hand holding red card */}
              <line x1="8" y1="-5" x2="16" y2="-30" stroke="#140a11" strokeWidth="4" />
              <rect x="10" y="-45" width="14" height="20" rx="1" fill="#dc2626" transform="rotate(-8)" />
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

          {/* French Steam Locomotive 231 "Pacific" Silhouette */}
          <g transform="translate(680, 420)">
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
          <line x1="0" y1="720" x2="1920" y2="720" stroke="#475569" strokeWidth="12" />
          <line x1="0" y1="755" x2="1920" y2="755" stroke="#334155" strokeWidth="10" />

          {/* Wicker Travel Suitcase (Vali mây bí mật) on platform */}
          <g transform="translate(460, 780)">
            <rect width="110" height="75" rx="8" fill="#78350f" stroke="#451a03" strokeWidth="4" />
            <line x1="0" y1="38" x2="110" y2="38" stroke="#451a03" strokeWidth="3" />
            <rect x="45" y="28" width="20" height="20" rx="3" fill="#ca8a04" />
            <path d="M40 0 L70 0 L70 28 L40 28 Z" fill="none" stroke="#451a03" strokeWidth="4" />
            <text x="55" y="55" fill="#fef3c7" fontSize="7" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
              PARIS - BERLIN
            </text>
          </g>

          {/* Cast-Iron Gas Lantern Post (Réverbère en fonte) */}
          <g transform="translate(360, 480)">
            <line x1="0" y1="0" x2="0" y2="280" stroke="#1e293b" strokeWidth="14" />
            <rect x="-24" y="-30" width="48" height="50" rx="8" fill="#fef08a" />
            <circle cx="0" cy="-5" r="140" fill="#fef08a" opacity="0.18" />
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

      {/* 6. bg-ban-do-hanh-trinh: Bản đồ hành trình Paris - Mátxcơva - Quảng Châu (1923–1924) */}
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

          {/* Aged parchment surface */}
          <rect width="1920" height="1080" fill="url(#mapParchment6)" />

          {/* Vintage Nautical Coordinate Grid */}
          <circle cx="960" cy="540" r="460" stroke="#71513a" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.45" />
          <circle cx="960" cy="540" r="300" stroke="#71513a" strokeWidth="1.5" strokeDasharray="6,6" fill="none" opacity="0.35" />
          <line x1="100" y1="540" x2="1820" y2="540" stroke="#71513a" strokeWidth="1.5" opacity="0.35" />
          <line x1="960" y1="80" x2="960" y2="1000" stroke="#71513a" strokeWidth="1.5" opacity="0.35" />

          {/* 16-point Compass Rose */}
          <g transform="translate(1620, 260) scale(1.1)">
            <circle cx="0" cy="0" r="75" stroke="#c8a24a" strokeWidth="2" fill="none" opacity="0.6" />
            <polygon points="0,-90 -16,-10 0,0" fill="#9e1b1b" />
            <polygon points="0,-90 16,-10 0,0" fill="#dc2626" />
            <polygon points="0,90 -16,10 0,0" fill="#523826" />
            <polygon points="0,90 16,10 0,0" fill="#785338" />
            <polygon points="90,0 10,-16 0,0" fill="#c8a24a" />
            <polygon points="90,0 10,16 0,0" fill="#eab308" />
            <polygon points="-90,0 -10,-16 0,0" fill="#523826" />
            <polygon points="-90,0 -10,16 0,0" fill="#785338" />
            <text x="-6" y="-102" fill="#c8a24a" fontSize="20" fontFamily="serif" fontWeight="bold">N</text>
          </g>

          {/* Continents Silhouettes */}
          <path
            d="M320 480 Q450 340 650 360 Q760 280 980 320 Q1240 260 1480 360 Q1720 520 1640 760 Q1420 860 1180 760 Q940 740 680 700 Q480 660 320 480 Z"
            fill="#4a3528"
            opacity="0.8"
            stroke="#634734"
            strokeWidth="3"
          />

          {/* Glowing Trans-Eurasian Revolutionary Route */}
          <path
            d="M440 460 Q720 340 880 350 Q1160 480 1380 640"
            stroke="#c8a24a"
            strokeWidth="6"
            strokeDasharray="14,10"
            fill="none"
          />

          {/* Waypoint 1: Paris */}
          <g transform="translate(440, 460)">
            <circle cx="0" cy="0" r="14" fill="#9e1b1b" stroke="#f3ead7" strokeWidth="4" />
            <circle cx="0" cy="0" r="26" stroke="#9e1b1b" strokeWidth="2" strokeDasharray="4,4" fill="none" opacity="0.7" />
            <text x="-30" y="-28" fill="#f3ead7" fontSize="22" fontFamily="serif" fontWeight="bold">
              Paris (6/1923)
            </text>
            <text x="-30" y="-8" fill="#c8a24a" fontSize="15" fontFamily="serif" fontStyle="italic">
              Rời Pháp bí mật sang Liên Xô
            </text>
          </g>

          {/* Waypoint 2: Mátxcơva */}
          <g transform="translate(880, 350)">
            <circle cx="0" cy="0" r="14" fill="#9e1b1b" stroke="#f3ead7" strokeWidth="4" />
            <circle cx="0" cy="0" r="26" stroke="#9e1b1b" strokeWidth="2" strokeDasharray="4,4" fill="none" opacity="0.7" />
            {/* Hammer & Sickle insignia */}
            <text x="-50" y="-30" fill="#f3ead7" fontSize="22" fontFamily="serif" fontWeight="bold">
              ☭ Mátxcơva (1923–1924)
            </text>
            <text x="-50" y="-10" fill="#c8a24a" fontSize="15" fontFamily="serif" fontStyle="italic">
              Đại hội V Quốc tế Cộng sản & Đại học Phương Đông
            </text>
          </g>

          {/* Waypoint 3: Quảng Châu */}
          <g transform="translate(1380, 640)">
            <circle cx="0" cy="0" r="18" fill="#c8a24a" stroke="#9e1b1b" strokeWidth="5" />
            <circle cx="0" cy="0" r="32" stroke="#c8a24a" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.8" />
            <text x="-40" y="45" fill="#fcd34d" fontSize="26" fontFamily="serif" fontWeight="bold">
              Quảng Châu (11/1924)
            </text>
            <text x="-40" y="70" fill="#f3ead7" fontSize="16" fontFamily="serif" fontStyle="italic">
              Trụ sở Tổng bộ Hội VN Cách mạng Thanh niên
            </text>
          </g>

          <rect width="1920" height="1080" fill="url(#vignetteMap6)" />
        </svg>
      )}

      {/* 7. bg-lop-hoc-van-minh: Số 13–13B đường Văn Minh, Quảng Châu (1925–1927) */}
      {bgId === "bg-lop-hoc-van-minh" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="classroomWall7" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#31231a" />
              <stop offset="60%" stopColor="#231811" />
              <stop offset="100%" stopColor="#18100a" />
            </linearGradient>
            <linearGradient id="sunbeam7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#fde047" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Cantonese Qilou arcade interior */}
          <rect width="1920" height="1080" fill="url(#classroomWall7)" />

          {/* Heavy Ceiling Beams & Vintage 3-Blade Ceiling Fan */}
          <line x1="0" y1="120" x2="1920" y2="120" stroke="#1c120d" strokeWidth="32" />
          <g transform="translate(960, 120)">
            <line x1="0" y1="0" x2="0" y2="70" stroke="#475569" strokeWidth="8" />
            <circle cx="0" cy="70" r="24" fill="#1e293b" />
            <ellipse cx="-80" cy="70" rx="70" ry="8" fill="#334155" />
            <ellipse cx="80" cy="70" rx="70" ry="8" fill="#334155" />
            <ellipse cx="0" cy="110" rx="8" ry="40" fill="#1e293b" />
          </g>

          {/* French/Lingnan Colonial Green Louvered Shutters (Cửa chớp lá sách) */}
          <g transform="translate(1380, 150)">
            <rect width="420" height="580" fill="#1b2a22" stroke="#3d2719" strokeWidth="18" rx="6" />
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={i} x1={20} y1={30 + i * 28} x2={390} y2={45 + i * 28} stroke="#2a4536" strokeWidth="10" />
            ))}
          </g>

          {/* Sunbeams Streaming Through Louvers */}
          <polygon points="1380,150 1800,150 1920,950 1020,950" fill="url(#sunbeam7)" className="vn-light-shaft" />

          {/* Blackboard with Đường Kách Mệnh Principles */}
          <g transform="translate(360, 180)">
            <rect width="900" height="480" fill="#1c2621" stroke="#5a3d28" strokeWidth="22" rx="12" />
            <rect x="15" y="15" width="870" height="450" fill="#16211c" rx="6" />
            {/* Address Banner */}
            <text x="435" y="60" fill="#ca8a04" fontSize="16" fontFamily="serif" textAnchor="middle" letterSpacing="2">
              SỐ 13–13B ĐƯỜNG VĂN MINH — QUẢNG CHÂU (1925–1927)
            </text>
            <text x="435" y="105" fill="#fef3c7" fontSize="36" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="3">
              ĐƯỜNG KÁCH MỆNH
            </text>
            <line x1="160" y1="125" x2="710" y2="125" stroke="#ca8a04" strokeWidth="3" />
            <text x="70" y="185" fill="#fde68a" fontSize="23" fontFamily="serif">
              ✦ Trước hết phải có ĐẢNG CÁCH MỆNH.
            </text>
            <text x="70" y="245" fill="#fde68a" fontSize="23" fontFamily="serif">
              ✦ CÔNG NÔNG là người chủ cách mệnh, là GỐC cách mệnh.
            </text>
            <text x="70" y="305" fill="#fde68a" fontSize="23" fontFamily="serif">
              ✦ Học trò, nhà buôn, điền chủ nhỏ là BẦU BẠN cách mệnh.
            </text>
            <text x="70" y="365" fill="#fde68a" fontSize="23" fontFamily="serif">
              ✦ Cách mệnh là việc chung của CẢ DÂN CHÚNG.
            </text>
            <rect x="0" y="475" width="900" height="18" fill="#3d2719" />
            <rect x="240" y="478" width="45" height="10" fill="#fef3c7" rx="2" />
          </g>

          {/* Wooden Student Desks */}
          <polygon points="80,820 1840,820 1920,1080 0,1080" fill="#2d1d15" />
          <line x1="80" y1="820" x2="1840" y2="820" stroke="#523522" strokeWidth="12" />

          {/* Gelatin Hectograph Printing Tray (Bàn in thạch) & Newspaper "Thanh Niên" No. 1 */}
          <g transform="translate(160, 830)">
            <rect width="210" height="150" fill="#442a1b" stroke="#78350f" strokeWidth="5" rx="5" />
            <rect x="15" y="15" width="180" height="120" fill="#fef3c7" rx="2" />
            <text x="105" y="45" fill="#991b1b" fontSize="18" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              THANH NIÊN
            </text>
            <text x="105" y="62" fill="#475569" fontSize="10" fontFamily="serif" textAnchor="middle">
              Số 1 — Ngày 21 tháng 6 năm 1925
            </text>
            <line x1="30" y1="72" x2="180" y2="72" stroke="#334155" strokeWidth="2" />
            <line x1="30" y1="86" x2="170" y2="86" stroke="#334155" strokeWidth="2" />
            <line x1="30" y1="100" x2="160" y2="100" stroke="#334155" strokeWidth="2" />
            {/* Ink roller */}
            <rect x="185" y="40" width="18" height="70" rx="3" fill="#0f172a" />
            <line x1="194" y1="20" x2="194" y2="130" stroke="#94a3b8" strokeWidth="4" />
          </g>
        </svg>
      )}

      {/* 8. bg-lop-hoc-chieu: Lớp học chiều tà Quảng Châu (1927) */}
      {bgId === "bg-lop-hoc-chieu" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="sunsetSky8" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#411306" />
              <stop offset="45%" stopColor="#7a2c11" />
              <stop offset="75%" stopColor="#bf3f0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="sunsetFloor8" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3c1c10" />
              <stop offset="100%" stopColor="#1a0a04" />
            </linearGradient>
          </defs>

          {/* Sunset room wall */}
          <rect width="1920" height="1080" fill="url(#sunsetSky8)" opacity="0.95" />

          {/* Diagonal Golden Sunset Rays */}
          <polygon points="0,180 1480,450 1480,950 0,980" fill="#fba742" opacity="0.22" />

          {/* Arched Window overlooking southern sunset */}
          <rect x="1350" y="100" width="460" height="620" fill="none" stroke="#2c1007" strokeWidth="26" />
          <line x1="1580" y1="100" x2="1580" y2="720" stroke="#2c1007" strokeWidth="16" />
          <line x1="1350" y1="410" x2="1810" y2="410" stroke="#2c1007" strokeWidth="16" />

          {/* Blackboard silhouetted with the legendary nautical quote */}
          <g transform="translate(360, 200)">
            <rect width="900" height="460" fill="#181311" stroke="#431407" strokeWidth="20" rx="10" />
            <text x="450" y="160" fill="#fed7aa" fontSize="32" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              "Đảng có vững cách mệnh mới thành công,"
            </text>
            <text x="450" y="240" fill="#fed7aa" fontSize="32" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              "cũng như người cầm lái có vững thuyền mới chạy."
            </text>
            <line x1="280" y1="310" x2="620" y2="310" stroke="#f97316" strokeWidth="2.5" />
            <text x="450" y="360" fill="#fdba74" fontSize="22" fontFamily="serif" textAnchor="middle">
              — Nguyễn Ái Quốc (Đường Kách mệnh, 1927) —
            </text>
          </g>

          {/* Teacher's podium and wooden floor with long shadows */}
          <polygon points="0,780 1920,780 1920,1080 0,1080" fill="url(#sunsetFloor8)" />
          <polygon points="820,740 1100,740 1140,880 780,880" fill="#2a1209" />
        </svg>
      )}

      {/* 9. bg-xuong-may: Nhà máy dệt / Xi măng (Phong trào Vô sản hoá 1928) */}
      {bgId === "bg-xuong-may" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          {/* Grimy industrial factory walls */}
          <rect width="1920" height="1080" fill="#171c24" />

          {/* Industrial Sawtooth Roof (Mái răng cưa công xưởng) */}
          <polygon points="0,0 480,240 480,0 960,240 960,0 1440,240 1440,0 1920,240 1920,0 1920,540 0,540" fill="#0e1319" />
          <polygon points="0,0 480,240 480,200 0,0" fill="#475569" opacity="0.3" />
          <polygon points="480,0 960,240 960,200 480,0" fill="#475569" opacity="0.3" />
          <polygon points="960,0 1440,240 1440,200 960,0" fill="#475569" opacity="0.3" />

          {/* Overhead Iron Drive Shafts & Leather Belts */}
          <line x1="0" y1="260" x2="1920" y2="260" stroke="#334155" strokeWidth="18" />
          <line x1="380" y1="260" x2="520" y2="720" stroke="#475569" strokeWidth="12" />
          <line x1="420" y1="260" x2="560" y2="720" stroke="#475569" strokeWidth="12" />
          <circle cx="400" cy="260" r="50" fill="#64748b" stroke="#1e293b" strokeWidth="8" />
          <circle cx="540" cy="720" r="75" fill="#64748b" stroke="#1e293b" strokeWidth="10" />

          <line x1="1280" y1="260" x2="1400" y2="700" stroke="#475569" strokeWidth="12" />
          <line x1="1320" y1="260" x2="1440" y2="700" stroke="#475569" strokeWidth="12" />
          <circle cx="1300" cy="260" r="50" fill="#64748b" stroke="#1e293b" strokeWidth="8" />
          <circle cx="1420" cy="700" r="75" fill="#64748b" stroke="#1e293b" strokeWidth="10" />

          {/* Industrial Cotton & Steam Haze */}
          <ellipse cx="960" cy="620" rx="880" ry="240" fill="#334155" opacity="0.35" />

          {/* Hanging Bare Incandescent Bulbs with Wire Cages */}
          <g className="vn-lamp-flicker">
            <line x1="840" y1="0" x2="840" y2="380" stroke="#000000" strokeWidth="4" />
            <circle cx="840" cy="400" r="160" fill="#fef08a" opacity="0.22" />
            <circle cx="840" cy="390" r="16" fill="#fef08a" />
          </g>

          {/* Cotton textile machines and thread bobbins */}
          <polygon points="0,700 1920,700 1920,1080 0,1080" fill="#0c1015" />
          <rect x="740" y="580" width="440" height="180" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="6" />
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={765 + i * 50} y="540" width="28" height="40" rx="4" fill="#cbd5e1" opacity="0.8" />
          ))}

          {/* Workers' blue coats & lunch metal tins (Camen) hanging on pillars */}
          <g transform="translate(240, 600)">
            <rect x="0" y="0" width="24" height="240" fill="#334155" />
            <ellipse cx="35" cy="40" rx="14" ry="35" fill="#1e3a8a" opacity="0.8" />
            <rect x="25" y="80" width="22" height="26" rx="4" fill="#94a3b8" />
          </g>
        </svg>
      )}

      {/* 10. bg-pho-kham-thien-dem: Số 312 Khâm Thiên & 5D Hàm Long, Hà Nội (1929) */}
      {bgId === "bg-pho-kham-thien-dem" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="hanoiNightSky10" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#080b12" />
              <stop offset="60%" stopColor="#131923" />
              <stop offset="100%" stopColor="#192230" />
            </linearGradient>
            <radialGradient id="houseGlow10" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Hanoi Drizzling Night Sky */}
          <rect width="1920" height="1080" fill="url(#hanoiNightSky10)" />

          {/* Traditional Yin-Yang Terracotta Roofs (Mái ngói ta âm dương rêu phong) */}
          <path
            d="M0 480 Q180 430 360 450 Q560 380 780 430 Q1000 350 1220 420 Q1460 360 1680 410 Q1820 370 1920 400 L1920 1080 L0 1080 Z"
            fill="#151113"
          />

          {/* Weathered Ochre French-Colonial Plaster Walls (Tường vàng vôi quét) */}
          <rect x="740" y="440" width="440" height="340" fill="#3e311c" stroke="#1e170e" strokeWidth="8" />

          {/* The Secret Meeting Room (312 Khâm Thiên / 5D Hàm Long) */}
          <rect x="880" y="480" width="160" height="180" fill="#1b130d" stroke="#52391b" strokeWidth="8" rx="4" />
          <g className="vn-lamp-flicker">
            <circle cx="960" cy="570" r="280" fill="url(#houseGlow10)" />
            {/* Window with warm curtain glow */}
            <rect x="895" y="495" width="130" height="150" fill="#f59e0b" opacity="0.92" rx="2" />
            <line x1="960" y1="495" x2="960" y2="645" stroke="#3d2815" strokeWidth="6" />
            <line x1="895" y1="570" x2="1025" y2="570" stroke="#3d2815" strokeWidth="6" />
            {/* Silhouettes of comrades conferring over Hammer and Sickle draft */}
            <ellipse cx="935" cy="580" rx="18" ry="24" fill="#2d1c0e" opacity="0.85" />
            <ellipse cx="985" cy="580" rx="18" ry="24" fill="#2d1c0e" opacity="0.85" />
          </g>

          {/* House 312 Khâm Thiên Name Plaque */}
          <rect x="895" y="455" width="130" height="20" rx="3" fill="#1e170e" stroke="#78350f" strokeWidth="2" />
          <text x="960" y="469" fill="#fef3c7" fontSize="10" fontFamily="serif" textAnchor="middle" fontWeight="bold">
            312 KHÂM THIÊN
          </text>

          {/* Wet Hanoi Cobblestone Street with rain reflections */}
          <polygon points="0,760 1920,740 1920,1080 0,1080" fill="#110d0f" />
          <ellipse cx="960" cy="880" rx="360" ry="40" fill="#f59e0b" opacity="0.12" />

          {/* Street French Gas Lantern on wrought-iron wall bracket */}
          <g transform="translate(240, 520)">
            <path d="M-40 120 L20 60 L20 0" stroke="#334155" strokeWidth="8" fill="none" />
            <polygon points="5,-40 35,-40 45,20 -5,20" fill="#fef08a" opacity="0.85" />
            <circle cx="20" cy="-10" r="140" fill="url(#houseGlow10)" opacity="0.5" />
          </g>
        </svg>
      )}

      {/* 11. bg-ben-cang-hong-kong: Vịnh Victoria, Bán đảo Cửu Long (Tháng 12/1929) */}
      {bgId === "bg-ben-cang-hong-kong" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="hkSky11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#101520" />
              <stop offset="50%" stopColor="#20293b" />
              <stop offset="100%" stopColor="#354359" />
            </linearGradient>
            <linearGradient id="hkWater11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#131b25" />
              <stop offset="100%" stopColor="#070b10" />
            </linearGradient>
          </defs>

          {/* Cold December harbor sky */}
          <rect width="1920" height="1080" fill="url(#hkSky11)" />

          {/* Victoria Peak (Thái Bình Sơn) in winter sea fog */}
          <path
            d="M0 560 Q340 310 760 340 Q1180 220 1560 380 Q1780 440 1920 480 L1920 720 L0 720 Z"
            fill="#0e1520"
            opacity="0.8"
          />

          {/* Victoria Harbour Waters */}
          <rect y="680" width="1920" height="400" fill="url(#hkWater11)" />

          {/* Animated Water Ripples */}
          <g className="vn-wave-swell" opacity="0.65">
            <line x1="200" y1="740" x2="680" y2="740" stroke="#475569" strokeWidth="2" />
            <line x1="840" y1="780" x2="1480" y2="780" stroke="#475569" strokeWidth="2.5" />
            <line x1="120" y1="840" x2="940" y2="840" stroke="#334155" strokeWidth="3" />
          </g>

          {/* Traditional Cantonese Junk Boat with Ribbed Batten Sails */}
          <g transform="translate(1240, 560)">
            <polygon points="0,170 180,170 210,210 -30,210" fill="#2a1a13" stroke="#442a1f" strokeWidth="3" />
            <line x1="90" y1="20" x2="90" y2="170" stroke="#5c3826" strokeWidth="6" />
            <polygon points="90,25 180,70 170,165 90,165" fill="#994d2c" opacity="0.85" />
            <line x1="90" y1="55" x2="175" y2="85" stroke="#3d2114" strokeWidth="2.5" />
            <line x1="90" y1="90" x2="175" y2="115" stroke="#3d2114" strokeWidth="2.5" />
            <line x1="90" y1="125" x2="172" y2="140" stroke="#3d2114" strokeWidth="2.5" />
            <line x1="25" y1="60" x2="25" y2="170" stroke="#5c3826" strokeWidth="4" />
            <polygon points="25,65 80,100 75,165 25,165" fill="#803d20" opacity="0.8" />
          </g>

          {/* Historic Star Ferry (Phà Ngôi Sao Cửu Long) green & white in distance */}
          <g transform="translate(420, 620)">
            <polygon points="0,40 180,40 160,65 20,65" fill="#14532d" />
            <rect x="25" y="15" width="130" height="25" fill="#f8fafc" />
            <line x1="90" y1="0" x2="90" y2="15" stroke="#1e293b" strokeWidth="3" />
            <circle cx="90" cy="5" r="3" fill="#fef08a" />
          </g>

          {/* Granite stone pier & iron bollard in foreground */}
          <polygon points="0,860 620,860 720,1080 0,1080" fill="#181f28" stroke="#2c3645" strokeWidth="6" />
          <rect x="480" y="820" width="45" height="55" rx="6" fill="#0e1318" stroke="#475569" strokeWidth="4" />
          <ellipse cx="440" cy="875" rx="35" ry="14" fill="none" stroke="#78350f" strokeWidth="8" />
        </svg>
      )}

      {/* 12. bg-goc-phong-den-dau: Hội nghị hợp nhất thành lập Đảng, Cửu Long (3/2/1930) */}
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

          {/* Secret meeting room with dark wood paneling */}
          <rect width="1920" height="1080" fill="#0d0906" />

          {/* Heavy drawn crimson curtains blocking colonial police surveillance */}
          <path d="M0 0 L420 0 L360 880 L0 880 Z" fill="#2b1115" opacity="0.85" />
          <path d="M1500 0 L1920 0 L1920 880 L1560 880 Z" fill="#2b1115" opacity="0.85" />

          {/* Master Centerpiece: Brass Hurricane Lantern casting dramatic Chiaroscuro */}
          <g className="vn-lamp-flicker">
            <circle cx="960" cy="520" r="540" fill="url(#kowloonLamp12)" />
            <line x1="960" y1="0" x2="960" y2="460" stroke="#78350f" strokeWidth="5" />
            <rect x="944" y="460" width="32" height="18" rx="4" fill="#92400e" />
            <ellipse cx="960" cy="520" rx="22" ry="34" fill="#ffffff" opacity="0.95" />
            <rect x="940" y="550" width="40" height="25" rx="5" fill="#78350f" />
          </g>

          {/* Round Rosewood Conference Table */}
          <ellipse cx="960" cy="850" rx="760" ry="240" fill="#25160e" stroke="#442617" strokeWidth="10" />

          {/* The 5 Historical Delegates seated around the table */}
          {/* Delegate 1: Đông Dương Cộng sản Đảng (Trịnh Đình Cửu) */}
          <g transform="translate(420, 700)">
            <circle cx="0" cy="0" r="45" fill="#090604" />
            <path d="M-60 45 Q0 15 60 45 L50 180 L-50 180 Z" fill="#090604" />
            <text x="0" y="110" fill="#fef3c7" fontSize="9" fontFamily="serif" textAnchor="middle" opacity="0.6">
              ĐDCSĐ
            </text>
          </g>
          {/* Delegate 2: Đông Dương Cộng sản Đảng (Nguyễn Đức Cảnh) */}
          <g transform="translate(680, 640)">
            <circle cx="0" cy="0" r="42" fill="#090604" />
            <path d="M-55 42 Q0 15 55 42 L45 160 L-45 160 Z" fill="#090604" />
          </g>
          {/* Leader Nguyễn Ái Quốc presiding in center */}
          <g transform="translate(960, 610)">
            <circle cx="0" cy="0" r="46" fill="#090604" stroke="#f59e0b" strokeWidth="2" />
            <path d="M-65 46 Q0 10 65 46 L55 180 L-55 180 Z" fill="#090604" />
            <text x="0" y="115" fill="#fde047" fontSize="10" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              Nguyễn Ái Quốc
            </text>
          </g>
          {/* Delegate 4: An Nam Cộng sản Đảng (Châu Văn Liêm) */}
          <g transform="translate(1240, 640)">
            <circle cx="0" cy="0" r="42" fill="#090604" />
            <path d="M-55 42 Q0 15 55 42 L45 160 L-45 160 Z" fill="#090604" />
          </g>
          {/* Delegate 5: An Nam Cộng sản Đảng (Nguyễn Thiệu) */}
          <g transform="translate(1500, 700)">
            <circle cx="0" cy="0" r="45" fill="#090604" />
            <path d="M-60 45 Q0 15 60 45 L50 180 L-50 180 Z" fill="#090604" />
            <text x="0" y="110" fill="#fef3c7" fontSize="9" fontFamily="serif" textAnchor="middle" opacity="0.6">
              ANCSĐ
            </text>
          </g>

          {/* Authentic Founding Documents on table: Chánh cương & Sách lược vắn tắt */}
          <g transform="translate(850, 805) rotate(-4)">
            <rect width="130" height="95" fill="#fef3c7" rx="3" stroke="#d97706" strokeWidth="2" />
            <text x="65" y="18" fill="#991b1b" fontSize="8" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              CHÁNH CƯƠNG VẮN TẮT
            </text>
            <line x1="12" y1="30" x2="118" y2="30" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="42" x2="110" y2="42" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="54" x2="115" y2="54" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="66" x2="95" y2="66" stroke="#475569" strokeWidth="2" />
          </g>
          <g transform="translate(980, 815) rotate(5)">
            <rect width="125" height="90" fill="#fef9c3" rx="3" stroke="#d97706" strokeWidth="2" />
            <text x="62" y="18" fill="#991b1b" fontSize="8" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              SÁCH LƯỢC VẮN TẮT
            </text>
            <line x1="12" y1="30" x2="112" y2="30" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="42" x2="105" y2="42" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="54" x2="98" y2="54" stroke="#475569" strokeWidth="2" />
          </g>

          {/* Porcelain Teapot & Teacups */}
          <g transform="translate(760, 830)">
            <ellipse cx="20" cy="20" rx="16" ry="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="48" cy="26" rx="8" ry="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          </g>
        </svg>
      )}

      {/* 13. bg-phong-rang-sang: Rạng sáng 7/2/1930 — Bế mạc Hội nghị hợp nhất */}
      {bgId === "bg-phong-rang-sang" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="dawnSky13" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#181126" />
              <stop offset="35%" stopColor="#401e3d" />
              <stop offset="70%" stopColor="#963311" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="dawnShaft13" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Violet-Rose Dawn Sky */}
          <rect width="1920" height="720" fill="url(#dawnSky13)" />

          {/* Dawn rays entering through parted curtains */}
          <polygon points="580,0 1340,0 1820,1080 340,1080" fill="url(#dawnShaft13)" className="vn-light-shaft" />

          {/* Window sill & room floor */}
          <polygon points="0,720 1920,720 1920,1080 0,1080" fill="#22150f" />

          {/* Desk with Final Unified Party Document: "ĐẢNG CỘNG SẢN VIỆT NAM" */}
          <polygon points="260,780 1660,780 1780,1080 140,1080" fill="#362117" stroke="#503023" strokeWidth="8" />

          {/* Stack of finalized documents & uncap fountain pen */}
          <g transform="translate(840, 825)">
            <rect width="240" height="150" fill="#fef3c7" rx="4" stroke="#ca8a04" strokeWidth="3" />
            <text x="120" y="36" fill="#991b1b" fontSize="19" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              ĐẢNG CỘNG SẢN VIỆT NAM
            </text>
            <text x="120" y="60" fill="#ca8a04" fontSize="11" fontFamily="serif" textAnchor="middle">
              Ngày 7 tháng 2 năm 1930
            </text>
            <text x="120" y="80" fill="#475569" fontSize="13" fontFamily="serif" textAnchor="middle">
              Chánh cương, Sách lược & Điều lệ vắn tắt
            </text>
            <line x1="30" y1="100" x2="210" y2="100" stroke="#94a3b8" strokeWidth="2" />
            <line x1="30" y1="118" x2="190" y2="118" stroke="#94a3b8" strokeWidth="2" />
            {/* Uncapped Fountain Pen */}
            <line x1="200" y1="70" x2="265" y2="135" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
            <polygon points="195,65 202,72 192,75" fill="#ca8a04" />
          </g>
        </svg>
      )}

      {/* 14. bg-boong-tau-binh-minh: Lời kêu gọi thành lập Đảng & Mùa xuân 1930 */}
      {bgId === "bg-boong-tau-binh-minh" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="sunriseSky14" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a102c" />
              <stop offset="35%" stopColor="#961a1a" />
              <stop offset="65%" stopColor="#e75b0b" />
              <stop offset="100%" stopColor="#fbbd23" />
            </linearGradient>
            <linearGradient id="sunriseSea14" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c03f0b" />
              <stop offset="50%" stopColor="#7a2c11" />
              <stop offset="100%" stopColor="#201008" />
            </linearGradient>
          </defs>

          {/* Sunrise Sky */}
          <rect width="1920" height="660" fill="url(#sunriseSky14)" />

          {/* Crimson Sun Rising on Horizon */}
          <circle cx="960" cy="620" r="105" fill="#dc2626" />
          <ellipse cx="960" cy="635" rx="180" ry="18" fill="#f59e0b" opacity="0.8" />

          {/* Golden Sunrays radiating into morning sky */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 11) * Math.PI;
            const x = 960 - Math.cos(angle) * 700;
            const y = 620 - Math.sin(angle) * 450;
            return <line key={i} x1={960} y1={620} x2={x} y2={y} stroke="#fef08a" strokeWidth="8" opacity="0.25" />;
          })}

          {/* Soaring Seabirds */}
          <g opacity="0.8">
            <path d="M520 280 Q535 260 550 280 Q565 260 580 280" stroke="#450a0a" strokeWidth="3" fill="none" />
            <path d="M640 230 Q652 215 665 230 Q678 215 690 230" stroke="#450a0a" strokeWidth="2.5" fill="none" />
            <path d="M1360 260 Q1375 240 1390 260 Q1405 240 1420 260" stroke="#450a0a" strokeWidth="3" fill="none" />
          </g>

          {/* Sea reflecting sunrise */}
          <rect y="640" width="1920" height="200" fill="url(#sunriseSea14)" />
          <g className="vn-wave-swell" opacity="0.7">
            <line x1="300" y1="670" x2="1620" y2="670" stroke="#fbbf24" strokeWidth="3" />
            <line x1="450" y1="710" x2="1470" y2="710" stroke="#f59e0b" strokeWidth="3" />
            <line x1="600" y1="760" x2="1320" y2="760" stroke="#ea580c" strokeWidth="4" />
          </g>

          {/* Ship Bow steering toward Vietnam */}
          <polygon points="0,810 1920,760 1920,1080 0,1080" fill="#301f16" />
          <line x1="0" y1="780" x2="1920" y2="730" stroke="#b45309" strokeWidth="12" />
          <line x1="0" y1="815" x2="1920" y2="765" stroke="#78350f" strokeWidth="7" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 102} y1={780 - i * 2.6} x2={i * 102} y2={845 - i * 2.4} stroke="#52361b" strokeWidth="7" />
          ))}
        </svg>
      )}

      {/* Fallback */}
      {!["bg-boong-tau-dem", "bg-phong-tro-paris", "bg-quan-ca-phe", "bg-hoi-truong-tours", "bg-ga-paris-tuyet", "bg-ban-do-hanh-trinh", "bg-lop-hoc-van-minh", "bg-lop-hoc-chieu", "bg-xuong-may", "bg-pho-kham-thien-dem", "bg-ben-cang-hong-kong", "bg-goc-phong-den-dau", "bg-phong-rang-sang", "bg-boong-tau-binh-minh"].includes(bgId) && (
        <div className="w-full h-full bg-gradient-to-b from-[#2a1b14] to-[#120d0a]" />
      )}
    </div>
  );
};
