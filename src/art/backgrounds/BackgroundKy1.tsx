import React from "react";

export const BackgroundKy1: React.FC<{ bgId: string }> = ({ bgId }) => {
  return (
    <>
      {/* 6. bg-ban-do-hanh-trinh: Bản đồ hành trình xuyên Á – Âu (Paris - Mátxcơva - Quảng Châu 1923–1924) */}
      {bgId === "bg-ban-do-hanh-trinh" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="oakDesk6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a110a" />
              <stop offset="50%" stopColor="#2c1a0e" />
              <stop offset="100%" stopColor="#140b06" />
            </linearGradient>
            <linearGradient id="mapParchment6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#302219" />
              <stop offset="50%" stopColor="#423023" />
              <stop offset="100%" stopColor="#281d14" />
            </linearGradient>
            <radialGradient id="vignetteMap6" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
            </radialGradient>
            <linearGradient id="brassDividers6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
            <radialGradient id="waypointGlow6" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#dc2626" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Heavy Oak Desk Frame with Rich Woodgrain */}
          <rect width="1920" height="1080" fill="url(#oakDesk6)" />
          {[120, 260, 410, 580, 750, 920].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="1920" y2={y + 15} stroke="#3d2719" strokeWidth="2.5" opacity="0.45" />
          ))}

          {/* Aged Parchment Map Surface with Burnished Edges */}
          <rect x="80" y="40" width="1760" height="1000" rx="16" fill="url(#mapParchment6)" stroke="#5c3f2b" strokeWidth="6" />

          {/* Corner Ornamental Cartographic Flourishes */}
          <g transform="translate(120, 80)">
            <path d="M0 60 Q0 0 60 0 M10 60 Q10 10 60 10" stroke="#c8a24a" strokeWidth="3" fill="none" opacity="0.7" />
          </g>
          <g transform="translate(1800, 80) scale(-1, 1)">
            <path d="M0 60 Q0 0 60 0 M10 60 Q10 10 60 10" stroke="#c8a24a" strokeWidth="3" fill="none" opacity="0.7" />
          </g>
          <g transform="translate(120, 1000) scale(1, -1)">
            <path d="M0 60 Q0 0 60 0 M10 60 Q10 10 60 10" stroke="#c8a24a" strokeWidth="3" fill="none" opacity="0.7" />
          </g>
          <g transform="translate(1800, 1000) scale(-1, -1)">
            <path d="M0 60 Q0 0 60 0 M10 60 Q10 10 60 10" stroke="#c8a24a" strokeWidth="3" fill="none" opacity="0.7" />
          </g>

          {/* Vintage Rhumb Lines & Graticule */}
          <circle cx="960" cy="540" r="480" stroke="#78553d" strokeWidth="1.5" strokeDasharray="8,8" fill="none" opacity="0.4" />
          <circle cx="960" cy="540" r="320" stroke="#78553d" strokeWidth="1.2" strokeDasharray="6,6" fill="none" opacity="0.3" />
          <line x1="100" y1="540" x2="1820" y2="540" stroke="#78553d" strokeWidth="1.2" opacity="0.3" />
          <line x1="960" y1="60" x2="960" y2="1020" stroke="#78553d" strokeWidth="1.2" opacity="0.3" />

          {/* Continents Silhouettes: Europe, Eurasia, Asia, Indochina */}
          <path
            d="M260 440 Q380 320 580 340 Q720 260 960 300 Q1240 240 1520 340 Q1740 480 1660 740 Q1440 840 1200 760 Q960 720 680 680 Q440 640 260 440 Z"
            fill="#523b2c"
            opacity="0.85"
            stroke="#6e4f3c"
            strokeWidth="3"
          />
          {/* Indochina Peninsula & Pearl River Delta */}
          <path
            d="M1420 620 Q1460 670 1450 750 Q1470 820 1440 890 Q1410 920 1390 890 Q1410 820 1390 740 Z"
            fill="#634533"
            stroke="#ca8a04"
            strokeWidth="2.5"
            opacity="0.95"
          />

          {/* Trans-Eurasian Revolutionary Route Arc */}
          <path
            d="M320 380 Q560 220 860 180 Q1180 220 1520 460"
            stroke="#ca8a04"
            strokeWidth="7"
            strokeDasharray="14,10"
            fill="none"
          />
          <path
            d="M320 380 Q560 220 860 180 Q1180 220 1520 460"
            stroke="#fde047"
            strokeWidth="2.5"
            strokeDasharray="14,10"
            fill="none"
            opacity="0.9"
          />

          {/* === TOP ARCH: WAYPOINT 2 - MÁTXCƠVA (1923–1924) elevated above character sprite === */}
          <g transform="translate(860, 180)">
            <circle cx="0" cy="0" r="40" fill="url(#waypointGlow6)" />
            <circle cx="0" cy="0" r="14" fill="#991b1b" stroke="#fef3c7" strokeWidth="4" />
            <circle cx="0" cy="0" r="26" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            <text x="0" y="-36" fill="#fef3c7" fontSize="23" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              ☭ Mátxcơva (1923–1924)
            </text>
            <text x="0" y="-14" fill="#fde047" fontSize="14" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              Đại hội V Quốc tế Cộng sản & Đại học Phương Đông
            </text>
          </g>

          {/* === LEFT WING: SAFE ZONE (x: 80 - 640, y: 160 - 680) === */}
          {/* Waypoint 1: Paris (6/1923) */}
          <g transform="translate(320, 380)">
            <circle cx="0" cy="0" r="40" fill="url(#waypointGlow6)" />
            <circle cx="0" cy="0" r="14" fill="#991b1b" stroke="#fef3c7" strokeWidth="4" />
            <circle cx="0" cy="0" r="24" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4,4" fill="none" />
            {/* Eiffel mini silhouette icon */}
            <path d="M-6 -45 L0 -70 L6 -45 L-6 -45 Z M-10 -45 L10 -45" stroke="#fde047" strokeWidth="2" fill="#ca8a04" />
            <text x="-40" y="-28" fill="#fef3c7" fontSize="24" fontFamily="serif" fontWeight="bold">
              Paris (6/1923)
            </text>
            <text x="-40" y="-6" fill="#fde047" fontSize="15" fontFamily="serif" fontStyle="italic">
              Rời Pháp bí mật sang Liên Xô
            </text>
          </g>

          {/* Brass Navigation Dividers / Compas de Marine (Elevated into Left Wing Safe Zone) */}
          <g transform="translate(180, 480) rotate(22)">
            <circle cx="30" cy="30" r="14" fill="url(#brassDividers6)" stroke="#451a03" strokeWidth="2.5" />
            {/* Two Brass legs */}
            <line x1="30" y1="30" x2="-25" y2="175" stroke="url(#brassDividers6)" strokeWidth="7" strokeLinecap="round" />
            <line x1="30" y1="30" x2="85" y2="170" stroke="url(#brassDividers6)" strokeWidth="7" strokeLinecap="round" />
            {/* Fine needle tips */}
            <line x1="-25" y1="175" x2="-30" y2="195" stroke="#e2e8f0" strokeWidth="3" />
            <line x1="85" y1="170" x2="90" y2="190" stroke="#e2e8f0" strokeWidth="3" />
          </g>

          {/* Brass Nautical Scale Ruler (Elevated into Left Wing Safe Zone) */}
          <g transform="translate(130, 620)">
            <rect width="360" height="42" fill="#ca8a04" stroke="#78350f" strokeWidth="2.5" rx="4" />
            {Array.from({ length: 35 }).map((_, i) => (
              <line key={i} x1={10 + i * 10} y1="0" x2={10 + i * 10} y2={i % 5 === 0 ? "20" : "10"} stroke="#451a03" strokeWidth="1.5" />
            ))}
            <text x="180" y="32" fill="#451a03" fontSize="10" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              ECHELLE EN MILLES MARINS — 1:5,000,000
            </text>
          </g>

          {/* Antique Brass Pocket Watch on Map Border */}
          <g transform="translate(520, 560)">
            <circle cx="28" cy="28" r="26" fill="url(#brassDividers6)" stroke="#78350f" strokeWidth="3" />
            <circle cx="28" cy="28" r="21" fill="#fef3c7" stroke="#ca8a04" strokeWidth="1.5" />
            <line x1="28" y1="28" x2="28" y2="14" stroke="#0f172a" strokeWidth="2.5" />
            <line x1="28" y1="28" x2="38" y2="28" stroke="#0f172a" strokeWidth="2" />
            <circle cx="28" cy="28" r="3" fill="#ca8a04" />
            <circle cx="28" cy="2" r="5" fill="none" stroke="#ca8a04" strokeWidth="2" />
          </g>

          {/* === RIGHT WING: SAFE ZONE (x: 1250 - 1880, y: 160 - 680) === */}
          {/* 16-point Vintage Nautical Compass Rose */}
          <g transform="translate(1660, 220) scale(1.15)">
            <circle cx="0" cy="0" r="75" stroke="#ca8a04" strokeWidth="2.5" fill="none" opacity="0.7" />
            <polygon points="0,-90 -16,-10 0,0" fill="#991b1b" />
            <polygon points="0,-90 16,-10 0,0" fill="#dc2626" />
            <polygon points="0,90 -16,10 0,0" fill="#523826" />
            <polygon points="0,90 16,10 0,0" fill="#785338" />
            <polygon points="90,0 10,-16 0,0" fill="#c8a24a" />
            <polygon points="90,0 10,16 0,0" fill="#eab308" />
            <polygon points="-90,0 -10,-16 0,0" fill="#523826" />
            <polygon points="-90,0 -10,16 0,0" fill="#785338" />
            <text x="-7" y="-102" fill="#fef08a" fontSize="22" fontFamily="serif" fontWeight="bold">N</text>
          </g>

          {/* Waypoint 3: Quảng Châu (11/1924) */}
          <g transform="translate(1520, 460)">
            <circle cx="0" cy="0" r="48" fill="url(#waypointGlow6)" />
            <circle cx="0" cy="0" r="18" fill="#ca8a04" stroke="#991b1b" strokeWidth="5" />
            <circle cx="0" cy="0" r="32" stroke="#fde047" strokeWidth="2.5" strokeDasharray="5,5" fill="none" />
            <text x="-40" y="44" fill="#fef08a" fontSize="26" fontFamily="serif" fontWeight="bold">
              Quảng Châu (11/1924)
            </text>
            <text x="-40" y="68" fill="#fef3c7" fontSize="15" fontFamily="serif" fontStyle="italic">
              Trụ sở Tổng bộ Hội VN Cách mạng Thanh niên
            </text>
          </g>

          {/* Brass-Rimmed Wooden Magnifying Glass over Indochina */}
          <g transform="translate(1360, 530) rotate(-30)">
            <ellipse cx="40" cy="40" rx="38" ry="38" fill="#fef08a" opacity="0.22" stroke="#ca8a04" strokeWidth="7" />
            <line x1="68" y1="68" x2="140" y2="140" stroke="#78350f" strokeWidth="14" strokeLinecap="round" />
            <line x1="68" y1="68" x2="80" y2="80" stroke="#ca8a04" strokeWidth="14" />
          </g>

          {/* Red Wax Seal with Hammer & Sickle / Star Impression */}
          <g transform="translate(1620, 580)">
            <ellipse cx="45" cy="45" rx="44" ry="42" fill="#991b1b" stroke="#7f1d1d" strokeWidth="3.5" />
            <ellipse cx="45" cy="45" rx="32" ry="30" fill="#b91c1c" />
            <polygon points="45,26 49,37 60,37 51,43 54,54 45,47 36,54 39,43 30,37 41,37" fill="#fef08a" opacity="0.95" />
          </g>

          <rect width="1920" height="1080" fill="url(#vignetteMap6)" />
        </svg>
      )}

      {/* 7. bg-lop-hoc-van-minh: Số 13–13B đường Văn Minh, Quảng Châu (1925–1927) */}
      {bgId === "bg-lop-hoc-van-minh" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="classroomWall7" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c2219" />
              <stop offset="60%" stopColor="#1f1811" />
              <stop offset="100%" stopColor="#140f0a" />
            </linearGradient>
            <linearGradient id="sunbeam7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.38" />
              <stop offset="50%" stopColor="#fde047" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gelatinTray7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ca8a04" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
            <radialGradient id="deskLampGlow7" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Cantonese Qilou arcade interior walls with Lingnan blue brick texture */}
          <rect width="1920" height="1080" fill="url(#classroomWall7)" />

          {/* Blue-grey brick pattern on walls */}
          <g opacity="0.32">
            {[0, 45, 90, 135, 180, 225, 270, 315, 360].map((y, row) => (
              <g key={row}>
                <line x1="0" y1={y} x2="480" y2={y} stroke="#0f172a" strokeWidth="2" />
                <line x1={(row % 2) * 60 + 50} y1={y} x2={(row % 2) * 60 + 50} y2={y + 45} stroke="#0f172a" strokeWidth="2" />
                <line x1={(row % 2) * 60 + 170} y1={y} x2={(row % 2) * 60 + 170} y2={y + 45} stroke="#0f172a" strokeWidth="2" />
                <line x1={(row % 2) * 60 + 290} y1={y} x2={(row % 2) * 60 + 290} y2={y + 45} stroke="#0f172a" strokeWidth="2" />
                <line x1={(row % 2) * 60 + 410} y1={y} x2={(row % 2) * 60 + 410} y2={y + 45} stroke="#0f172a" strokeWidth="2" />
              </g>
            ))}
          </g>

          {/* Ceiling Heavy Teak Beams & Vintage 3-Blade Ceiling Fan */}
          <line x1="0" y1="110" x2="1920" y2="110" stroke="#1c120d" strokeWidth="28" />
          <g transform="translate(960, 110)">
            <line x1="0" y1="0" x2="0" y2="70" stroke="#475569" strokeWidth="8" />
            <circle cx="0" cy="70" r="22" fill="#1e293b" />
            <ellipse cx="-80" cy="70" rx="75" ry="8" fill="#334155" />
            <ellipse cx="80" cy="70" rx="75" ry="8" fill="#334155" />
            <ellipse cx="0" cy="115" rx="8" ry="42" fill="#1e293b" />
          </g>

          {/* === LEFT WING: SAFE ZONE (x: 80 - 640, y: 140 - 680) === */}
          {/* Authentic Wooden Blackboard with Đường Kách Mệnh Principles */}
          <g transform="translate(80, 140)">
            <rect width="540" height="330" fill="#1c2621" stroke="#5a3d28" strokeWidth="18" rx="10" />
            <rect x="10" y="10" width="520" height="310" fill="#15201b" rx="6" />
            {/* Header Banner */}
            <text x="270" y="38" fill="#ca8a04" fontSize="12" fontFamily="serif" textAnchor="middle" letterSpacing="1.5">
              SỐ 13–13B ĐƯỜNG VĂN MINH — QUẢNG CHÂU
            </text>
            <text x="270" y="70" fill="#fef3c7" fontSize="21" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
              HỘI VIỆT NAM CÁCH MẠNG THANH NIÊN
            </text>
            <text x="270" y="90" fill="#fde68a" fontSize="13" fontFamily="serif" textAnchor="middle" fontStyle="italic">
              (Lớp huấn luyện chính trị cán bộ — 1925–1926)
            </text>
            <line x1="40" y1="102" x2="500" y2="102" stroke="#ca8a04" strokeWidth="2" />
            {/* 4 Principles in glowing chalk */}
            <text x="28" y="140" fill="#fde68a" fontSize="16" fontFamily="serif">
              ✦ Trước hết phải có ĐẢNG CÁCH MỆNH.
            </text>
            <text x="28" y="184" fill="#fde68a" fontSize="16" fontFamily="serif">
              ✦ CÔNG NÔNG là người chủ, là GỐC cách mệnh.
            </text>
            <text x="28" y="228" fill="#fde68a" fontSize="16" fontFamily="serif">
              ✦ Học trò, nhà buôn, điền chủ nhỏ là BẦU BẠN.
            </text>
            <text x="28" y="272" fill="#fde68a" fontSize="16" fontFamily="serif">
              ✦ Cách mệnh là việc chung của CẢ DÂN CHÚNG.
            </text>
            {/* Chalk tray & chalk sticks */}
            <rect x="0" y="325" width="540" height="14" fill="#3d2719" />
            <rect x="120" y="327" width="35" height="8" fill="#fef3c7" rx="2" />
            <rect x="170" y="329" width="24" height="6" fill="#fde68a" rx="2" />
          </g>

          {/* Elevated Left Wing Table for Printing & Writing Props */}
          <g transform="translate(80, 480)">
            <polygon points="0,40 560,40 560,200 0,200" fill="#362217" stroke="#4a2e1d" strokeWidth="4" />
            <line x1="0" y1="40" x2="560" y2="40" stroke="#6b442b" strokeWidth="6" />

            {/* Gelatin Hectograph Printing Tray (Bàn in thạch gelatin) */}
            <g transform="translate(40, 20)">
              {/* Wooden tray */}
              <rect width="250" height="150" fill="#442a1b" stroke="#78350f" strokeWidth="5" rx="5" />
              {/* Gelatin surface */}
              <rect x="12" y="12" width="226" height="126" fill="url(#gelatinTray7)" opacity="0.88" rx="3" />
              {/* Printed sheet: Báo Thanh Niên Số 1 */}
              <rect x="22" y="16" width="186" height="118" fill="#fef3c7" rx="2" stroke="#d5c7aa" strokeWidth="1.5" />
              <text x="115" y="44" fill="#991b1b" fontSize="18" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                THANH NIÊN
              </text>
              <text x="115" y="60" fill="#475569" fontSize="10" fontFamily="serif" textAnchor="middle">
                Số 1 — Ngày 21 tháng 6 năm 1925
              </text>
              <line x1="36" y1="70" x2="194" y2="70" stroke="#334155" strokeWidth="2" />
              <line x1="36" y1="82" x2="184" y2="82" stroke="#334155" strokeWidth="2" />
              <line x1="36" y1="94" x2="178" y2="94" stroke="#334155" strokeWidth="2" />
              <line x1="36" y1="106" x2="190" y2="106" stroke="#334155" strokeWidth="2" />
              {/* Rubber ink roller (Con lăn mực cao su) */}
              <g transform="translate(196, 20)">
                <rect x="0" y="15" width="20" height="75" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <line x1="10" y1="0" x2="10" y2="105" stroke="#94a3b8" strokeWidth="4" />
                <circle cx="10" cy="0" r="6" fill="#78350f" />
                <circle cx="10" cy="105" r="6" fill="#78350f" />
              </g>
            </g>

            {/* Chinese Inkstone & Bamboo Brush */}
            <g transform="translate(360, 45)">
              <rect width="60" height="85" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              <ellipse cx="30" cy="32" rx="20" ry="22" fill="#020617" />
              {/* Bamboo calligraphy brush */}
              <line x1="75" y1="10" x2="140" y2="75" stroke="#a16207" strokeWidth="4.5" strokeLinecap="round" />
              <polygon points="68,5 78,12 72,16" fill="#0f172a" />
            </g>
          </g>

          {/* === RIGHT WING: SAFE ZONE (x: 1260 - 1860, y: 140 - 680) === */}
          {/* French/Lingnan Colonial Green Louvered Shutters (Cửa chớp lá sách Indochine) */}
          <g transform="translate(1360, 140)">
            <rect width="440" height="380" fill="#1b2a22" stroke="#3d2719" strokeWidth="16" rx="6" />
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={i} x1={20} y1={25 + i * 26} x2={420} y2={38 + i * 26} stroke="#2a4536" strokeWidth="11" />
            ))}
          </g>

          {/* Diagonal Volumetric Sunbeams Streaming Through Louvers */}
          <polygon points="1360,140 1800,140 1920,800 1140,800" fill="url(#sunbeam7)" className="vn-light-shaft" />

          {/* Bookshelf with Thread-Bound Revolutionary Training Booklets */}
          <g transform="translate(1360, 530)">
            <rect width="420" height="150" fill="#301f16" stroke="#4d3224" strokeWidth="5" rx="4" />
            {/* Shelf partition */}
            <line x1="0" y1="75" x2="420" y2="75" stroke="#4d3224" strokeWidth="4" />
            {/* Stack 1: Training booklets */}
            <g transform="translate(30, 20)">
              <rect width="140" height="42" rx="2" fill="#3b271d" />
              <rect x="4" y="-8" width="140" height="42" rx="2" fill="#fef3c7" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="74" y="16" fill="#991b1b" fontSize="10" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                TÀI LIỆU HUẤN LUYỆN
              </text>
              <line x1="20" y1="-8" x2="20" y2="34" stroke="#dc2626" strokeWidth="2" />
            </g>
            {/* Kerosene study lamp glowing on shelf */}
            <g transform="translate(260, 10)" className="vn-lamp-flicker">
              <circle cx="40" cy="30" r="80" fill="url(#deskLampGlow7)" />
              <ellipse cx="40" cy="50" rx="24" ry="12" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />
              <ellipse cx="40" cy="25" rx="14" ry="24" fill="#ffffff" opacity="0.95" />
            </g>
          </g>

          {/* Classroom floorboards extending into background */}
          <polygon points="0,780 1920,780 1920,1080 0,1080" fill="#241812" />
          <line x1="0" y1="780" x2="1920" y2="780" stroke="#452a1c" strokeWidth="8" />
        </svg>
      )}

      {/* 8. bg-lop-hoc-chieu: Lớp học chiều tà Quảng Châu (1927) */}
      {bgId === "bg-lop-hoc-chieu" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="sunsetSky8" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b0f0a" />
              <stop offset="35%" stopColor="#7a260d" />
              <stop offset="65%" stopColor="#b43a0e" />
              <stop offset="85%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="sunsetRiver8" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="sunsetFloor8" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3c1c10" />
              <stop offset="100%" stopColor="#1a0a04" />
            </linearGradient>
            <radialGradient id="sunsetLampGlow8" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#ea580c" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7a260d" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep Twilight Amber Classroom Wall */}
          <rect width="1920" height="1080" fill="#24130d" />

          {/* === RIGHT WING: SAFE ZONE (x: 1240 - 1880, y: 120 - 680) === */}
          {/* Double Arched Balcony overlooking the Pearl River (Sông Châu Giang) */}
          <g transform="translate(1240, 90)">
            {/* Arches opening to sunset sky */}
            <path d="M0 580 L0 160 Q145 20 290 160 L290 580 Z" fill="url(#sunsetSky8)" stroke="#2c1007" strokeWidth="20" />
            <path d="M310 580 L310 160 Q455 20 600 160 L600 580 Z" fill="url(#sunsetSky8)" stroke="#2c1007" strokeWidth="20" />

            {/* Pearl River (Sông Châu Giang) Waters with Sunset Shimmer */}
            <rect x="0" y="380" width="600" height="200" fill="url(#sunsetRiver8)" />
            <line x1="40" y1="410" x2="220" y2="410" stroke="#fde047" strokeWidth="2.5" opacity="0.6" />
            <line x1="340" y1="430" x2="520" y2="430" stroke="#fde047" strokeWidth="2.5" opacity="0.6" />

            {/* Traditional Sampan & Batten Sail gliding downriver */}
            <g transform="translate(140, 340)">
              <polygon points="0,50 110,50 130,72 -20,72" fill="#1c0f08" />
              <line x1="55" y1="0" x2="55" y2="50" stroke="#1c0f08" strokeWidth="4" />
              <polygon points="55,5 100,22 96,48 55,48" fill="#78350f" opacity="0.9" />
              <line x1="55" y1="20" x2="98" y2="35" stroke="#3d1b0d" strokeWidth="2" />
            </g>

            {/* Lingnan Pagoda Silhouette on horizon */}
            <path d="M380 380 L410 330 Q435 310 460 330 L490 380 Z" fill="#1a0904" />
            <path d="M360 330 Q435 280 510 330 Z" fill="#1a0904" />

            {/* Balustrade railing */}
            <rect x="0" y="520" width="600" height="60" fill="#2c1007" />
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={i} x1={20 + i * 40} y1="520" x2={20 + i * 40} y2="580" stroke="#431407" strokeWidth="6" />
            ))}
          </g>

          {/* Diagonal Golden Sunset Rays Streaming Across Room */}
          <polygon points="1240,160 1840,160 1440,780 400,780" fill="#fbbf24" opacity="0.18" className="vn-light-shaft" />

          {/* === LEFT WING: SAFE ZONE (x: 80 - 640, y: 140 - 680) === */}
          {/* Framed Blackboard with the Legendary Nautical Quote */}
          <g transform="translate(80, 150)">
            <rect width="560" height="300" fill="#181311" stroke="#431407" strokeWidth="18" rx="10" />
            <rect x="10" y="10" width="540" height="280" fill="#120c0a" rx="6" />
            <text x="280" y="70" fill="#fed7aa" fontSize="22" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              "Đảng có vững cách mệnh mới thành công,"
            </text>
            <text x="280" y="120" fill="#fed7aa" fontSize="22" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              "cũng như người cầm lái có vững thuyền mới chạy."
            </text>
            <line x1="140" y1="160" x2="420" y2="160" stroke="#f97316" strokeWidth="2.5" />
            <text x="280" y="210" fill="#fdba74" fontSize="18" fontFamily="serif" textAnchor="middle">
              — Nguyễn Ái Quốc —
            </text>
            <text x="280" y="245" fill="#ca8a04" fontSize="15" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              (Đường Kách mệnh, 1927)
            </text>
          </g>

          {/* Elevated Instructor's Desk with Historic Study Props */}
          <g transform="translate(80, 480)">
            <polygon points="0,35 560,35 560,190 0,190" fill="#2d160c" stroke="#431d10" strokeWidth="4" />
            <line x1="0" y1="35" x2="560" y2="35" stroke="#5a2a16" strokeWidth="6" />

            {/* Handwritten Đường Kách Mệnh draft */}
            <g transform="translate(180, 40) rotate(-4)">
              <rect width="180" height="110" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
              <text x="90" y="26" fill="#78350f" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                ĐƯỜNG KÁCH MỆNH (1927)
              </text>
              <line x1="20" y1="42" x2="160" y2="42" stroke="#451a03" strokeWidth="1.5" />
              <line x1="20" y1="56" x2="150" y2="56" stroke="#451a03" strokeWidth="1.5" />
              <line x1="20" y1="70" x2="155" y2="70" stroke="#451a03" strokeWidth="1.5" />
            </g>

            {/* Antique Brass Alarm Clock (Đồng hồ báo thức cơ khí: 5:45 PM) */}
            <g transform="translate(420, 45)">
              <circle cx="30" cy="30" r="28" fill="#ca8a04" stroke="#78350f" strokeWidth="3" />
              <circle cx="30" cy="30" r="22" fill="#fef3c7" />
              {/* Twin bell top */}
              <circle cx="16" cy="6" r="8" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />
              <circle cx="44" cy="6" r="8" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />
              {/* Clock hands: 5:45 PM */}
              <line x1="30" y1="30" x2="38" y2="15" stroke="#451a03" strokeWidth="2.5" />
              <line x1="30" y1="30" x2="14" y2="34" stroke="#451a03" strokeWidth="2.5" />
            </g>

            {/* Steaming Celadon Teacup & Kerosene Desk Lamp */}
            <g transform="translate(60, 50)">
              <ellipse cx="25" cy="20" rx="20" ry="12" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
              <ellipse cx="25" cy="18" rx="14" ry="8" fill="#78350f" />
              {/* Steam wisps */}
              <path d="M20 10 Q15 0 22 -10" stroke="#fef08a" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M28 8 Q33 -2 27 -12" stroke="#fef08a" strokeWidth="2" fill="none" opacity="0.6" />
            </g>
          </g>

          {/* Wooden floor with sunset shadows */}
          <polygon points="0,780 1920,780 1920,1080 0,1080" fill="url(#sunsetFloor8)" />
          <line x1="0" y1="780" x2="1920" y2="780" stroke="#3d180b" strokeWidth="8" />
        </svg>
      )}

      {/* 9. bg-xuong-may: Nhà máy dệt / Xi măng (Phong trào Vô sản hoá 1928) */}
      {bgId === "bg-xuong-may" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="factoryWall9" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#11161d" />
              <stop offset="50%" stopColor="#18202a" />
              <stop offset="100%" stopColor="#0c1015" />
            </linearGradient>
            <linearGradient id="gearSteel9" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <radialGradient id="sparkAura9" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grimy industrial factory walls */}
          <rect width="1920" height="1080" fill="url(#factoryWall9)" />

          {/* Industrial Sawtooth Roof (Mái răng cưa công xưởng) with Frosted Skylights */}
          <polygon points="0,0 480,220 480,0 960,220 960,0 1440,220 1440,0 1920,220 1920,0 1920,500 0,500" fill="#0e1319" />
          <polygon points="0,0 480,220 480,180 0,0" fill="#475569" opacity="0.32" />
          <polygon points="480,0 960,220 960,180 480,0" fill="#475569" opacity="0.32" />
          <polygon points="960,0 1440,220 1440,180 960,0" fill="#475569" opacity="0.32" />

          {/* Overhead Iron Drive Shafts & Leather Belts */}
          <line x1="0" y1="240" x2="1920" y2="240" stroke="#334155" strokeWidth="18" />
          <circle cx="360" cy="240" r="48" fill="url(#gearSteel9)" stroke="#0f172a" strokeWidth="8" />
          <circle cx="1560" cy="240" r="48" fill="url(#gearSteel9)" stroke="#0f172a" strokeWidth="8" />

          {/* Hanging Bare Incandescent Bulbs with Wire Cages */}
          <g transform="translate(860, 0)" className="vn-lamp-flicker">
            <line x1="0" y1="0" x2="0" y2="340" stroke="#000000" strokeWidth="4" />
            <circle cx="0" cy="355" r="160" fill="#fef08a" opacity="0.18" />
            <circle cx="0" cy="350" r="16" fill="#fef08a" />
            <ellipse cx="0" cy="354" rx="22" ry="26" fill="none" stroke="#475569" strokeWidth="2.5" />
          </g>

          {/* Factory Steam Haze Layer */}
          <ellipse cx="960" cy="420" rx="680" ry="140" fill="#e2e8f0" opacity="0.1" />

          {/* === LEFT WING: SAFE ZONE (x: 80 - 620, y: 150 - 680) === */}
          {/* Riveted Industrial Column & Colonial Harsh Regulation Signboard */}
          <g transform="translate(100, 160)">
            {/* Cast-iron I-beam column */}
            <rect x="0" y="0" width="45" height="580" fill="#334155" stroke="#1e293b" strokeWidth="5" />
            {[40, 120, 200, 280, 360, 440, 520].map((ry, i) => (
              <circle key={i} cx="22" cy={ry} r="5" fill="#64748b" stroke="#0f172a" strokeWidth="1.5" />
            ))}

            {/* Colonial Harsh Regulation Signboard (Clear, High-Contrast) */}
            <g transform="translate(65, 30)">
              <rect width="280" height="230" rx="6" fill="#fef3c7" stroke="#991b1b" strokeWidth="4" />
              <rect x="8" y="8" width="264" height="214" fill="#fffbeb" rx="4" />
              <text x="140" y="34" fill="#991b1b" fontSize="15" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                FILATURE DE HAÏPHONG
              </text>
              <text x="140" y="54" fill="#78350f" fontSize="12" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                NỘI QUY XƯỞNG THỢ (1928)
              </text>
              <line x1="25" y1="68" x2="255" y2="68" stroke="#991b1b" strokeWidth="2" />
              <text x="25" y="98" fill="#1e293b" fontSize="13" fontFamily="sans-serif" fontWeight="bold">
                ✦ GIỜ LÀM VIỆC: 12H / NGÀY
              </text>
              <text x="25" y="128" fill="#1e293b" fontSize="13" fontFamily="sans-serif">
                ✦ PHẠT TIỀN ĐI TRỄ & HƯ HAO
              </text>
              <text x="25" y="158" fill="#1e293b" fontSize="13" fontFamily="sans-serif">
                ✦ KHÔNG ĐƯỢC NÓI CHUYỆN
              </text>
              <rect x="20" y="174" width="240" height="34" rx="4" fill="#991b1b" />
              <text x="140" y="196" fill="#fef08a" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                NGHIÊM CẤM HỘI HỌP & ĐÌNH CÔNG
              </text>
            </g>

            {/* High-Pressure Steam Pipe & Brass Pressure Gauge */}
            <g transform="translate(365, 60)">
              <line x1="0" y1="0" x2="0" y2="280" stroke="#64748b" strokeWidth="14" />
              <circle cx="0" cy="80" r="26" fill="#ca8a04" stroke="#78350f" strokeWidth="3" />
              <circle cx="0" cy="80" r="20" fill="#fef3c7" />
              <line x1="0" y1="80" x2="12" y2="70" stroke="#dc2626" strokeWidth="2.5" />
              {/* Red valve handwheel */}
              <circle cx="0" cy="180" r="18" fill="none" stroke="#dc2626" strokeWidth="5" />
              <line x1="-18" y1="180" x2="18" y2="180" stroke="#dc2626" strokeWidth="3" />
              <line x1="0" y1="162" x2="0" y2="198" stroke="#dc2626" strokeWidth="3" />
            </g>

            {/* Worker's 3-Tier Aluminum Lunch Tin (Cà-mên) & Canteen Hung on Iron Peg */}
            <g transform="translate(70, 290)">
              {/* Iron hanging peg */}
              <line x1="-25" y1="20" x2="0" y2="20" stroke="#64748b" strokeWidth="6" />
              {/* 3-tier aluminum lunch tin */}
              <rect x="10" y="60" width="70" height="30" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="2.5" />
              <rect x="10" y="30" width="70" height="30" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="2.5" />
              <rect x="10" y="0" width="70" height="30" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="2.5" />
              {/* Handle frame */}
              <path d="M2 60 L2 -12 L88 -12 L88 60" stroke="#64748b" strokeWidth="3.5" fill="none" />
              <rect x="35" y="-20" width="20" height="10" rx="2" fill="#78350f" />
              {/* Dented worker canteen */}
              <ellipse cx="125" cy="50" rx="26" ry="36" fill="#94a3b8" stroke="#475569" strokeWidth="2.5" />
              <rect x="117" y="10" width="16" height="12" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
            </g>
          </g>

          {/* === RIGHT WING: SAFE ZONE (x: 1250 - 1880, y: 150 - 680) === */}
          {/* Textile Loom Mechanism with Cotton Spools & Large Spur Gears */}
          <g transform="translate(1320, 180)">
            <rect width="480" height="180" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="5" />
            {/* Cotton spools row */}
            {Array.from({ length: 9 }).map((_, i) => (
              <g key={i} transform={`translate(${20 + i * 50}, -30)`}>
                <rect width="34" height="46" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="0" y1="23" x2="34" y2="23" stroke="#cbd5e1" strokeWidth="1.5" />
              </g>
            ))}
            {/* Spur gear teeth */}
            <circle cx="80" cy="90" r="50" fill="none" stroke="#64748b" strokeWidth="14" strokeDasharray="12,8" />
            <circle cx="80" cy="90" r="20" fill="#334155" stroke="#0f172a" strokeWidth="4" />
            <circle cx="400" cy="90" r="50" fill="none" stroke="#64748b" strokeWidth="14" strokeDasharray="12,8" />
            <circle cx="400" cy="90" r="20" fill="#334155" stroke="#0f172a" strokeWidth="4" />
          </g>

          {/* Blacksmith Anvil Elevated to Safe Zone Waist Height with Glowing Sparks */}
          <g transform="translate(1420, 430)">
            {/* Oak chopping block base */}
            <rect x="50" y="130" width="160" height="110" fill="#452a1b" stroke="#2c1a10" strokeWidth="4" rx="4" />
            {/* Heavy cast-iron anvil */}
            <path d="M0 130 L260 130 L230 80 L200 70 L280 55 L200 45 L40 45 L0 80 Z" fill="#334155" stroke="#0f172a" strokeWidth="5" />
            {/* Glowing red-hot forged iron bar on anvil horn */}
            <rect x="180" y="47" width="90" height="12" rx="3" fill="#ef4444" stroke="#fde047" strokeWidth="2" />
            {/* Sledgehammer resting on anvil */}
            <line x1="100" y1="30" x2="210" y2="-30" stroke="#78350f" strokeWidth="10" strokeLinecap="round" />
            <rect x="75" y="15" width="46" height="30" rx="4" fill="#64748b" stroke="#0f172a" strokeWidth="3" />
            {/* Explosive shower of bright forging sparks */}
            <g className="vn-lamp-flicker">
              <circle cx="210" cy="45" r="45" fill="url(#sparkAura9)" />
              <line x1="210" y1="45" x2="250" y2="10" stroke="#fef08a" strokeWidth="2.5" />
              <line x1="210" y1="45" x2="270" y2="30" stroke="#fde047" strokeWidth="2" />
              <line x1="210" y1="45" x2="240" y2="-10" stroke="#f97316" strokeWidth="2.5" />
              <line x1="210" y1="45" x2="190" y2="0" stroke="#fef08a" strokeWidth="2" />
              <line x1="210" y1="45" x2="225" y2="-25" stroke="#ffffff" strokeWidth="2" />
            </g>
          </g>

          {/* Grimy Concrete Factory Floor */}
          <polygon points="0,760 1920,760 1920,1080 0,1080" fill="#0c1015" />
          <line x1="0" y1="760" x2="1920" y2="760" stroke="#1e293b" strokeWidth="8" />
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
            <linearGradient id="wetStreet10" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141820" />
              <stop offset="50%" stopColor="#0d1117" />
              <stop offset="100%" stopColor="#05080c" />
            </linearGradient>
          </defs>

          {/* Hanoi Drizzling Night Sky */}
          <rect width="1920" height="1080" fill="url(#hanoiNightSky10)" />

          {/* Layered Rhythmic Undulating Yin-Yang Terracotta Roofs across midground */}
          <path
            d="M0 460 Q180 410 360 430 Q560 360 780 410 Q1000 340 1220 400 Q1460 340 1680 390 Q1820 350 1920 380 L1920 780 L0 780 Z"
            fill="#151113"
          />
          {/* Mossy roof ridge lines */}
          <path d="M0 460 Q180 410 360 430" stroke="#374151" strokeWidth="7" fill="none" />
          <path d="M360 430 Q560 360 780 410" stroke="#374151" strokeWidth="7" fill="none" />
          <path d="M780 410 Q1000 340 1220 400" stroke="#374151" strokeWidth="7" fill="none" />
          <path d="M1220 400 Q1460 340 1680 390" stroke="#374151" strokeWidth="7" fill="none" />

          {/* === RIGHT WING: SAFE ZONE (x: 1250 - 1880, y: 140 - 680) === */}
          {/* Wooden Utility Pole with Tangled Wires & White Porcelain Insulators */}
          <g transform="translate(1640, 160)">
            <line x1="0" y1="0" x2="0" y2="580" stroke="#241710" strokeWidth="20" />
            <line x1="-80" y1="80" x2="80" y2="80" stroke="#241710" strokeWidth="10" />
            <circle cx="-60" cy="68" r="7" fill="#f8fafc" />
            <circle cx="0" cy="68" r="7" fill="#f8fafc" />
            <circle cx="60" cy="68" r="7" fill="#f8fafc" />
            {/* Tangled drooping electrical cables */}
            <path d="M-60 68 Q-380 140 -800 100" stroke="#0f172a" strokeWidth="3" fill="none" />
            <path d="M0 68 Q-340 160 -800 130" stroke="#0f172a" strokeWidth="3" fill="none" />
            <path d="M60 68 Q220 130 280 110" stroke="#0f172a" strokeWidth="3" fill="none" />
          </g>

          {/* === LEFT WING: SAFE ZONE (x: 80 - 640, y: 140 - 680) === */}
          {/* Weathered Ochre French-Colonial Shophouse Facade (312 Khâm Thiên / 5D Hàm Long) */}
          <g transform="translate(80, 140)">
            <rect width="520" height="580" fill="#3e311c" stroke="#1e170e" strokeWidth="8" rx="4" />

            {/* Colonial Street Plaque of the Historic Railway Worker's Home */}
            <g transform="translate(40, 30)">
              <rect width="440" height="65" rx="6" fill="#1e293b" stroke="#ca8a04" strokeWidth="4" />
              <rect x="6" y="6" width="428" height="53" fill="#0f172a" rx="3" />
              <text x="220" y="34" fill="#fef3c7" fontSize="20" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                312 PHỐ KHÂM THIÊN
              </text>
              <text x="220" y="52" fill="#ca8a04" fontSize="12" fontFamily="serif" textAnchor="middle" letterSpacing="1">
                Nhà đồng chí Nguyễn Tài Thủ — Thành lập ĐDCSĐ (17/6/1929)
              </text>
            </g>

            {/* Secret Upstairs Meeting Window with Warm Amber Curtain Glow */}
            <g transform="translate(90, 120)">
              <rect width="220" height="200" fill="#1b130d" stroke="#52391b" strokeWidth="8" rx="4" />
              <g className="vn-lamp-flicker">
                <circle cx="110" cy="100" r="180" fill="url(#houseGlow10)" />
                {/* Window interior glow */}
                <rect x="12" y="12" width="196" height="176" fill="#f59e0b" opacity="0.92" rx="2" />
                <line x1="110" y1="12" x2="110" y2="188" stroke="#3d2815" strokeWidth="7" />
                <line x1="12" y1="100" x2="208" y2="100" stroke="#3d2815" strokeWidth="7" />
                {/* Silhouettes of comrades conferring over founding documents */}
                <ellipse cx="65" cy="120" rx="22" ry="30" fill="#2d1c0e" opacity="0.88" />
                <ellipse cx="155" cy="120" rx="22" ry="30" fill="#2d1c0e" opacity="0.88" />
                {/* Secret Printing of Báo BÚA LIỀM No. 1 and Hammer & Sickle draft */}
                <g transform="translate(25, 25)">
                  <rect width="52" height="34" rx="2" fill="#fef3c7" stroke="#dc2626" strokeWidth="1.5" />
                  <text x="26" y="15" fill="#991b1b" fontSize="7" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                    BÚA LIỀM
                  </text>
                  <text x="26" y="26" fill="#0f172a" fontSize="5.5" fontFamily="sans-serif" textAnchor="middle">
                    Số 1 — 17/6/1929
                  </text>
                </g>
              </g>
            </g>

            {/* French Wrought-Iron Street Gas Lantern mounted on brick facade */}
            <g transform="translate(370, 130)">
              <path d="M-40 120 Q0 60 50 40 L50 -20" stroke="#334155" strokeWidth="10" fill="none" />
              <polygon points="30,-60 70,-60 80,10 20,10" fill="#fef08a" opacity="0.92" stroke="#1e293b" strokeWidth="3" />
              <circle cx="50" cy="-25" r="160" fill="url(#houseGlow10)" opacity="0.65" />
            </g>

            {/* Hand-Pulled Rickshaw (Xe kéo tay / Pousse-pousse) Parked by Curb */}
            <g transform="translate(100, 360)">
              {/* Wooden spoked wheels */}
              <circle cx="90" cy="110" r="62" fill="none" stroke="#78350f" strokeWidth="6" />
              <circle cx="90" cy="110" r="15" fill="#451a03" />
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={i}
                  x1="90"
                  y1="110"
                  x2={90 + Math.cos((i / 8) * Math.PI * 2) * 62}
                  y2={110 + Math.sin((i / 8) * Math.PI * 2) * 62}
                  stroke="#78350f"
                  strokeWidth="2.5"
                />
              ))}
              {/* Rickshaw seat and folding canopy */}
              <polygon points="55,80 125,80 145,35 45,35" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
              <path d="M45 35 Q70 5 125 15 L140 40 Z" fill="#334155" />
              {/* Wooden pull shafts resting on pavement */}
              <line x1="90" y1="90" x2="-25" y2="155" stroke="#78350f" strokeWidth="5.5" />
            </g>
          </g>

          {/* Wet Hanoi Cobblestone Street with rain reflections & tram tracks */}
          <polygon points="0,740 1920,740 1920,1080 0,1080" fill="url(#wetStreet10)" />
          {/* Electric Tram Tracks (Đường ray tàu điện Bờ Hồ - Hà Đông) */}
          <line x1="0" y1="810" x2="1920" y2="800" stroke="#475569" strokeWidth="8" />
          <line x1="0" y1="855" x2="1920" y2="845" stroke="#475569" strokeWidth="8" />
          <line x1="0" y1="812" x2="1920" y2="802" stroke="#94a3b8" strokeWidth="2" opacity="0.6" />
          <line x1="0" y1="857" x2="1920" y2="847" stroke="#94a3b8" strokeWidth="2" opacity="0.6" />

          {/* Amber Puddle Reflections on Wet Asphalt */}
          <ellipse cx="450" cy="840" rx="280" ry="35" fill="#f59e0b" opacity="0.16" />

          {/* Atmospheric Drizzling Rain Strands */}
          <g opacity="0.35">
            {Array.from({ length: 32 }).map((_, i) => (
              <line
                key={i}
                x1={(i * 64) % 1920}
                y1={(i * 49) % 720}
                x2={((i * 64) % 1920) - 16}
                y2={((i * 49) % 720) + 48}
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
            ))}
          </g>
        </svg>
      )}
    </>
  );
};
