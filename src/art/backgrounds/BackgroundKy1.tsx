import React from "react";

export const BackgroundKy1: React.FC<{ bgId: string }> = ({ bgId }) => {
  return (
    <>
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

    </>
  );
};
