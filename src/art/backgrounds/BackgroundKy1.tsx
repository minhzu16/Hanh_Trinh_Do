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
              <stop offset="0%" stopColor="#2e2017" />
              <stop offset="50%" stopColor="#3d2b20" />
              <stop offset="100%" stopColor="#261b13" />
            </linearGradient>
            <radialGradient id="vignetteMap6" cx="50%" cy="50%" r="50%">
              <stop offset="55%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
            </radialGradient>
            <linearGradient id="brassDividers6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
          </defs>

          {/* Heavy Oak Desk Frame with Corner Brass Brackets */}
          <rect width="1920" height="1080" fill="url(#oakDesk6)" />
          {/* Wood grain lines */}
          {[120, 260, 410, 580, 750, 920].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="1920" y2={y + 15} stroke="#3d2719" strokeWidth="2.5" opacity="0.4" />
          ))}

          {/* Aged Parchment Map Surface with Burned Edges */}
          <rect x="100" y="50" width="1720" height="980" rx="16" fill="url(#mapParchment6)" stroke="#523826" strokeWidth="6" />

          {/* Corner Ornamental Flourishes */}
          <g transform="translate(140, 90)">
            <path d="M0 60 Q0 0 60 0 M10 60 Q10 10 60 10" stroke="#c8a24a" strokeWidth="3" fill="none" opacity="0.6" />
          </g>
          <g transform="translate(1780, 90) scale(-1, 1)">
            <path d="M0 60 Q0 0 60 0 M10 60 Q10 10 60 10" stroke="#c8a24a" strokeWidth="3" fill="none" opacity="0.6" />
          </g>
          <g transform="translate(140, 990) scale(1, -1)">
            <path d="M0 60 Q0 0 60 0 M10 60 Q10 10 60 10" stroke="#c8a24a" strokeWidth="3" fill="none" opacity="0.6" />
          </g>
          <g transform="translate(1780, 990) scale(-1, -1)">
            <path d="M0 60 Q0 0 60 0 M10 60 Q10 10 60 10" stroke="#c8a24a" strokeWidth="3" fill="none" opacity="0.6" />
          </g>

          {/* Vintage Nautical Coordinate Grid */}
          <circle cx="960" cy="540" r="460" stroke="#71513a" strokeWidth="2" strokeDasharray="8,8" fill="none" opacity="0.45" />
          <circle cx="960" cy="540" r="300" stroke="#71513a" strokeWidth="1.5" strokeDasharray="6,6" fill="none" opacity="0.35" />
          <line x1="120" y1="540" x2="1800" y2="540" stroke="#71513a" strokeWidth="1.5" opacity="0.35" />
          <line x1="960" y1="70" x2="960" y2="1010" stroke="#71513a" strokeWidth="1.5" opacity="0.35" />

          {/* 16-point Compass Rose */}
          <g transform="translate(1600, 240) scale(1.15)">
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

          {/* Continents Silhouettes: Europe, Eurasia, Asia, Indochina */}
          <path
            d="M320 480 Q450 340 650 360 Q760 280 980 320 Q1240 260 1480 360 Q1720 520 1640 760 Q1420 860 1180 760 Q940 740 680 700 Q480 660 320 480 Z"
            fill="#4a3528"
            opacity="0.8"
            stroke="#634734"
            strokeWidth="3"
          />
          {/* Indochina outline */}
          <path
            d="M1360 670 Q1380 720 1370 790 Q1390 850 1370 910 Q1350 940 1330 920 Q1340 850 1330 780 Z"
            fill="#5c4033"
            stroke="#c8a24a"
            strokeWidth="2"
            opacity="0.9"
          />

          {/* Glowing Trans-Eurasian Revolutionary Route */}
          <path
            d="M440 460 Q660 360 880 350 Q1160 480 1380 640"
            stroke="#c8a24a"
            strokeWidth="6"
            strokeDasharray="14,10"
            fill="none"
          />
          <path
            d="M440 460 Q660 360 880 350 Q1160 480 1380 640"
            stroke="#fde047"
            strokeWidth="2"
            strokeDasharray="14,10"
            fill="none"
            opacity="0.8"
          />

          {/* Waypoint 1: Paris */}
          <g transform="translate(440, 460)">
            <circle cx="0" cy="0" r="14" fill="#9e1b1b" stroke="#f3ead7" strokeWidth="4" />
            <circle cx="0" cy="0" r="26" stroke="#9e1b1b" strokeWidth="2" strokeDasharray="4,4" fill="none" opacity="0.7" />
            {/* Eiffel mini icon */}
            <path d="M-5 -45 L0 -65 L5 -45 L-5 -45 Z" fill="#c8a24a" opacity="0.8" />
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

          {/* Brass Navigation Dividers / Compas de Marine (Tiền cảnh góc trái) */}
          <g transform="translate(260, 780) rotate(25)">
            <circle cx="30" cy="30" r="12" fill="url(#brassDividers6)" stroke="#522e13" strokeWidth="2" />
            {/* Two legs */}
            <line x1="30" y1="30" x2="-20" y2="190" stroke="url(#brassDividers6)" strokeWidth="6" strokeLinecap="round" />
            <line x1="30" y1="30" x2="80" y2="185" stroke="url(#brassDividers6)" strokeWidth="6" strokeLinecap="round" />
            {/* Fine needle tips */}
            <line x1="-20" y1="190" x2="-25" y2="210" stroke="#e2e8f0" strokeWidth="2.5" />
            <line x1="80" y1="185" x2="85" y2="205" stroke="#e2e8f0" strokeWidth="2.5" />
          </g>

          {/* Brass Naval Scale Ruler (Thước đo hải lý viền đồng) */}
          <g transform="translate(680, 920)">
            <rect width="360" height="42" fill="#ca8a04" stroke="#78350f" strokeWidth="2.5" rx="3" />
            {Array.from({ length: 35 }).map((_, i) => (
              <line key={i} x1={10 + i * 10} y1="0" x2={10 + i * 10} y2={i % 5 === 0 ? "20" : "10"} stroke="#451a03" strokeWidth="1.5" />
            ))}
            <text x="180" y="32" fill="#451a03" fontSize="10" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              ECHELLE EN MILLES MARINS — 1:5,000,000
            </text>
          </g>

          {/* Red Wax Seal with Hammer & Sickle / Star Impression */}
          <g transform="translate(1680, 860)">
            <ellipse cx="45" cy="45" rx="42" ry="40" fill="#991b1b" stroke="#7f1d1d" strokeWidth="3" />
            <ellipse cx="45" cy="45" rx="30" ry="28" fill="#b91c1c" />
            <polygon points="45,28 49,38 59,38 51,44 54,54 45,48 36,54 39,44 31,38 41,38" fill="#fef08a" opacity="0.9" />
          </g>

          {/* Wooden Handled Magnifying Glass (Tiền cảnh kính lúp) */}
          <g transform="translate(1180, 780) rotate(-35)">
            <ellipse cx="40" cy="40" rx="35" ry="35" fill="#fef08a" opacity="0.2" stroke="#ca8a04" strokeWidth="6" />
            <line x1="65" y1="65" x2="135" y2="135" stroke="#78350f" strokeWidth="12" strokeLinecap="round" />
            <line x1="65" y1="65" x2="75" y2="75" stroke="#ca8a04" strokeWidth="12" />
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
            <linearGradient id="cantonBricks7" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="sunbeam7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.36" />
              <stop offset="50%" stopColor="#fde047" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gelatinTray7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ca8a04" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
          </defs>

          {/* Cantonese Qilou arcade interior walls with Cantonese blue brick texture */}
          <rect width="1920" height="1080" fill="url(#classroomWall7)" />

          {/* Blue-grey brick pattern on left wall */}
          <g opacity="0.35">
            {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((y, row) => (
              <g key={row}>
                <line x1="0" y1={y} x2="340" y2={y} stroke="#0f172a" strokeWidth="2" />
                <line x1={(row % 2) * 50 + 40} y1={y} x2={(row % 2) * 50 + 40} y2={y + 40} stroke="#0f172a" strokeWidth="2" />
                <line x1={(row % 2) * 50 + 140} y1={y} x2={(row % 2) * 50 + 140} y2={y + 40} stroke="#0f172a" strokeWidth="2" />
                <line x1={(row % 2) * 50 + 240} y1={y} x2={(row % 2) * 50 + 240} y2={y + 40} stroke="#0f172a" strokeWidth="2" />
              </g>
            ))}
          </g>

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
          <g transform="translate(1380, 140)">
            <rect width="440" height="600" fill="#1b2a22" stroke="#3d2719" strokeWidth="18" rx="6" />
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={i} x1={20} y1={25 + i * 28} x2={410} y2={40 + i * 28} stroke="#2a4536" strokeWidth="11" />
            ))}
          </g>

          {/* Sunbeams Streaming Through Louvers into Classroom */}
          <polygon points="1380,140 1820,140 1920,950 980,950" fill="url(#sunbeam7)" className="vn-light-shaft" />

          {/* Blackboard with Đường Kách Mệnh Principles */}
          <g transform="translate(360, 170)">
            <rect width="920" height="500" fill="#1c2621" stroke="#5a3d28" strokeWidth="22" rx="12" />
            <rect x="15" y="15" width="890" height="470" fill="#16211c" rx="6" />
            {/* Address Banner */}
            <text x="445" y="55" fill="#ca8a04" fontSize="16" fontFamily="serif" textAnchor="middle" letterSpacing="2">
              SỐ 13–13B ĐƯỜNG VĂN MINH — QUẢNG CHÂU (1925–1927)
            </text>
            <text x="445" y="105" fill="#fef3c7" fontSize="36" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="3">
              ĐƯỜNG KÁCH MỆNH
            </text>
            <line x1="160" y1="125" x2="730" y2="125" stroke="#ca8a04" strokeWidth="3" />
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
            <rect x="0" y="495" width="920" height="18" fill="#3d2719" />
            {/* White chalk piece on chalk tray */}
            <rect x="240" y="498" width="45" height="10" fill="#fef3c7" rx="2" />
            <rect x="300" y="500" width="30" height="8" fill="#fde68a" rx="2" />
          </g>

          {/* Wooden Student Desks & Benches with Rich Grain */}
          <polygon points="60,820 1860,820 1920,1080 0,1080" fill="#2d1d15" />
          <line x1="60" y1="820" x2="1860" y2="820" stroke="#523522" strokeWidth="12" />

          {/* Gelatin Hectograph Printing Tray (Bàn in thạch gelatin) & "Thanh Niên" No. 1 */}
          <g transform="translate(140, 810)">
            {/* Wooden tray */}
            <rect width="250" height="180" fill="#442a1b" stroke="#78350f" strokeWidth="6" rx="6" />
            {/* Gelatin surface */}
            <rect x="15" y="15" width="220" height="150" fill="url(#gelatinTray7)" opacity="0.85" rx="3" />
            {/* Sheet of paper: Báo Thanh Niên Số 1 */}
            <rect x="25" y="20" width="190" height="135" fill="#fef3c7" rx="2" stroke="#d5c7aa" strokeWidth="1.5" />
            <text x="120" y="52" fill="#991b1b" fontSize="19" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              THANH NIÊN
            </text>
            <text x="120" y="70" fill="#475569" fontSize="11" fontFamily="serif" textAnchor="middle">
              Số 1 — Ngày 21 tháng 6 năm 1925
            </text>
            <line x1="40" y1="80" x2="200" y2="80" stroke="#334155" strokeWidth="2" />
            <line x1="40" y1="94" x2="190" y2="94" stroke="#334155" strokeWidth="2" />
            <line x1="40" y1="108" x2="180" y2="108" stroke="#334155" strokeWidth="2" />
            <line x1="40" y1="122" x2="195" y2="122" stroke="#334155" strokeWidth="2" />
            <line x1="40" y1="136" x2="160" y2="136" stroke="#334155" strokeWidth="2" />
            {/* Rubber ink roller (Con lăn mực cao su) */}
            <g transform="translate(200, 25)">
              <rect x="0" y="20" width="22" height="90" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              <line x1="11" y1="0" x2="11" y2="130" stroke="#94a3b8" strokeWidth="5" />
              <circle cx="11" cy="0" r="7" fill="#78350f" />
              <circle cx="11" cy="130" r="7" fill="#78350f" />
            </g>
          </g>

          {/* Stacks of Booklets with Thread Binding (Tài liệu đóng chỉ) on desk */}
          <g transform="translate(1380, 835)">
            <rect width="160" height="110" rx="3" fill="#3b271d" />
            <rect x="6" y="-8" width="160" height="110" rx="3" fill="#4d3527" />
            <rect x="12" y="-16" width="160" height="110" rx="3" fill="#fef3c7" stroke="#ca8a04" strokeWidth="2" />
            <text x="92" y="16" fill="#991b1b" fontSize="13" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              TÀI LIỆU HUẤN LUYỆN
            </text>
            <line x1="30" y1="30" x2="150" y2="30" stroke="#475569" strokeWidth="2" />
            <line x1="30" y1="44" x2="140" y2="44" stroke="#475569" strokeWidth="2" />
            {/* Red traditional bookbinding thread */}
            <line x1="24" y1="-16" x2="24" y2="94" stroke="#dc2626" strokeWidth="2.5" />
            {[0, 25, 55, 85].map((sy, idx) => (
              <circle key={idx} cx="24" cy={sy} r="3" fill="#7f1d1d" />
            ))}
          </g>

          {/* Chinese inkstone & bamboo brush next to French fountain pen */}
          <g transform="translate(860, 840)">
            <rect width="60" height="90" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <ellipse cx="30" cy="35" rx="20" ry="24" fill="#020617" />
            {/* Bamboo brush */}
            <line x1="85" y1="10" x2="160" y2="85" stroke="#a16207" strokeWidth="4.5" strokeLinecap="round" />
            <polygon points="78,5 88,12 82,16" fill="#0f172a" />
          </g>
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
          </defs>

          {/* Sunset room wall */}
          <rect width="1920" height="1080" fill="url(#sunsetSky8)" opacity="0.95" />

          {/* Double Arched Balcony overlooking the Pearl River (Châu Giang) */}
          <g transform="translate(1180, 80)">
            {/* Arches opening to river sky */}
            <path d="M0 640 L0 180 Q160 20 320 180 L320 640 Z" fill="url(#sunsetSky8)" stroke="#2c1007" strokeWidth="22" />
            <path d="M340 640 L340 180 Q500 20 660 180 L660 640 Z" fill="url(#sunsetSky8)" stroke="#2c1007" strokeWidth="22" />

            {/* Pearl River (Sông Châu Giang) Waters */}
            <rect x="0" y="440" width="660" height="200" fill="url(#sunsetRiver8)" />

            {/* Traditional Sampan Boat with Batten Sail gliding at dusk */}
            <g transform="translate(160, 410)">
              <polygon points="0,50 120,50 140,75 -20,75" fill="#1c0f08" />
              <line x1="60" y1="0" x2="60" y2="50" stroke="#1c0f08" strokeWidth="4" />
              <polygon points="60,5 110,25 105,48 60,48" fill="#78350f" opacity="0.9" />
            </g>

            {/* Curved Cantonese Pagoda Eaves Silhouette on horizon */}
            <path d="M420 440 L450 390 Q480 370 510 390 L540 440 Z" fill="#1a0904" />
            <path d="M400 390 Q480 340 560 390 Z" fill="#1a0904" />
          </g>

          {/* Diagonal Golden Sunset Rays Streaming Across Classroom */}
          <polygon points="0,180 1480,450 1480,950 0,980" fill="#fba742" opacity="0.22" />

          {/* Blackboard silhouetted with the legendary nautical quote */}
          <g transform="translate(300, 180)">
            <rect width="840" height="480" fill="#181311" stroke="#431407" strokeWidth="22" rx="12" />
            <text x="420" y="150" fill="#fed7aa" fontSize="32" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              "Đảng có vững cách mệnh mới thành công,"
            </text>
            <text x="420" y="230" fill="#fed7aa" fontSize="32" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              "cũng như người cầm lái có vững thuyền mới chạy."
            </text>
            <line x1="240" y1="290" x2="600" y2="290" stroke="#f97316" strokeWidth="3" />
            <text x="420" y="340" fill="#fdba74" fontSize="22" fontFamily="serif" textAnchor="middle">
              — Nguyễn Ái Quốc (Đường Kách mệnh, 1927) —
            </text>
          </g>

          {/* Teacher's podium and wooden floor with long shadows */}
          <polygon points="0,780 1920,780 1920,1080 0,1080" fill="url(#sunsetFloor8)" />
          <polygon points="760,740 1140,740 1190,880 710,880" fill="#2a1209" stroke="#3d1b0d" strokeWidth="4" />

          {/* Teacher's Desk in Foreground with Manuscript & Steaming Cup */}
          <g transform="translate(820, 780)">
            {/* Handwritten Đường Kách Mệnh draft */}
            <rect width="180" height="120" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="2" transform="rotate(-6)" />
            <text x="90" y="30" fill="#78350f" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle" transform="rotate(-6)">
              ĐƯỜNG KÁCH MỆNH (1927)
            </text>
            <line x1="20" y1="46" x2="160" y2="46" stroke="#451a03" strokeWidth="1.5" transform="rotate(-6)" />
            <line x1="20" y1="60" x2="150" y2="60" stroke="#451a03" strokeWidth="1.5" transform="rotate(-6)" />
            {/* Antique Brass Alarm Clock (Đồng hồ báo thức cơ khí) */}
            <g transform="translate(220, 20)">
              <circle cx="30" cy="30" r="28" fill="#ca8a04" stroke="#78350f" strokeWidth="3" />
              <circle cx="30" cy="30" r="22" fill="#fef3c7" />
              {/* Twin bell top */}
              <circle cx="16" cy="6" r="8" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />
              <circle cx="44" cy="6" r="8" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />
              {/* Clock hands: 5:45 PM */}
              <line x1="30" y1="30" x2="38" y2="15" stroke="#451a03" strokeWidth="2.5" />
              <line x1="30" y1="30" x2="15" y2="35" stroke="#451a03" strokeWidth="2.5" />
            </g>
            {/* Steaming Celadon Teacup */}
            <g transform="translate(-80, 30)">
              <ellipse cx="25" cy="20" rx="20" ry="12" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
              <ellipse cx="25" cy="18" rx="14" ry="8" fill="#78350f" />
              {/* Steam wisps */}
              <path d="M20 10 Q15 0 22 -10" stroke="#fef08a" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M28 8 Q33 -2 27 -12" stroke="#fef08a" strokeWidth="2" fill="none" opacity="0.6" />
            </g>
          </g>
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
          </defs>

          {/* Grimy industrial factory walls */}
          <rect width="1920" height="1080" fill="url(#factoryWall9)" />

          {/* Industrial Sawtooth Roof (Mái răng cưa công xưởng) with Soot-Dusted Skylights */}
          <polygon points="0,0 480,240 480,0 960,240 960,0 1440,240 1440,0 1920,240 1920,0 1920,540 0,540" fill="#0e1319" />
          <polygon points="0,0 480,240 480,200 0,0" fill="#475569" opacity="0.3" />
          <polygon points="480,0 960,240 960,200 480,0" fill="#475569" opacity="0.3" />
          <polygon points="960,0 1440,240 1440,200 960,0" fill="#475569" opacity="0.3" />

          {/* Overhead Iron Drive Shafts & Leather Belts (Trục truyền động & dây curoa da) */}
          <line x1="0" y1="260" x2="1920" y2="260" stroke="#334155" strokeWidth="18" />
          <line x1="380" y1="260" x2="520" y2="720" stroke="#78350f" strokeWidth="14" />
          <line x1="420" y1="260" x2="560" y2="720" stroke="#78350f" strokeWidth="14" />
          <circle cx="400" cy="260" r="50" fill="url(#gearSteel9)" stroke="#0f172a" strokeWidth="8" />
          <circle cx="540" cy="720" r="75" fill="url(#gearSteel9)" stroke="#0f172a" strokeWidth="10" />

          <line x1="1280" y1="260" x2="1400" y2="700" stroke="#78350f" strokeWidth="14" />
          <line x1="1320" y1="260" x2="1440" y2="700" stroke="#78350f" strokeWidth="14" />
          <circle cx="1300" cy="260" r="50" fill="url(#gearSteel9)" stroke="#0f172a" strokeWidth="8" />
          <circle cx="1420" cy="700" r="75" fill="url(#gearSteel9)" stroke="#0f172a" strokeWidth="10" />

          {/* Boiler High-Pressure Steam Haze escaping */}
          <ellipse cx="960" cy="460" rx="720" ry="180" fill="#e2e8f0" opacity="0.12" />
          <ellipse cx="1480" cy="520" rx="360" ry="120" fill="#cbd5e1" opacity="0.15" />

          {/* Hanging Bare Incandescent Bulbs with Wire Cages */}
          <g className="vn-lamp-flicker">
            <line x1="840" y1="0" x2="840" y2="380" stroke="#000000" strokeWidth="4" />
            <circle cx="840" cy="400" r="180" fill="#fef08a" opacity="0.2" />
            <circle cx="840" cy="390" r="16" fill="#fef08a" />
            {/* Wire protective cage */}
            <ellipse cx="840" cy="395" rx="22" ry="26" fill="none" stroke="#475569" strokeWidth="2.5" />
          </g>

          {/* Massive Mechanical Weaving Looms with Cotton Spools & Shuttles */}
          <polygon points="0,700 1920,700 1920,1080 0,1080" fill="#0c1015" />
          <rect x="700" y="560" width="520" height="200" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="6" />
          {/* Spools of cotton thread (Cuộn sợi dệt) */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i} transform={`translate(${730 + i * 48}, 520)`}>
              <rect width="32" height="42" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="0" y1="21" x2="32" y2="21" stroke="#cbd5e1" strokeWidth="1" />
            </g>
          ))}
          {/* Interlocking gear teeth on machine */}
          <circle cx="700" cy="660" r="45" fill="none" stroke="#64748b" strokeWidth="12" strokeDasharray="10,6" />
          <circle cx="1220" cy="660" r="45" fill="none" stroke="#64748b" strokeWidth="12" strokeDasharray="10,6" />

          {/* Cast-Iron Pillar with French Factory Harsh Regulation Sign */}
          <g transform="translate(240, 480)">
            <rect x="0" y="0" width="32" height="600" fill="#334155" stroke="#1e293b" strokeWidth="4" />
            {/* Regulation sign */}
            <rect x="-30" y="80" width="92" height="120" rx="4" fill="#fef3c7" stroke="#991b1b" strokeWidth="3" />
            <text x="16" y="105" fill="#991b1b" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
              RÈGLEMENT
            </text>
            <text x="16" y="118" fill="#991b1b" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
              D'ATELIER
            </text>
            <line x1="-15" y1="126" x2="47" y2="126" stroke="#475569" strokeWidth="1.5" />
            <text x="16" y="145" fill="#1e293b" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
              Amende de retard
            </text>
            <text x="16" y="165" fill="#1e293b" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
              12h de travail
            </text>
            <text x="16" y="185" fill="#991b1b" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
              CẤM HỘI HỌP
            </text>
          </g>

          {/* Anvil & Blacksmith Hammer in Foreground (Tiền cảnh Đe sắt & búa tạ) */}
          <g transform="translate(1540, 840)">
            {/* Heavy cast-iron anvil */}
            <path d="M0 120 L180 120 L160 80 L140 70 L200 60 L140 50 L30 50 L0 80 Z" fill="#334155" stroke="#0f172a" strokeWidth="4" />
            <rect x="40" y="120" width="100" height="80" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
            {/* Sledgehammer resting on anvil */}
            <line x1="70" y1="35" x2="160" y2="-20" stroke="#78350f" strokeWidth="8" strokeLinecap="round" />
            <rect x="50" y="25" width="40" height="25" rx="3" fill="#64748b" stroke="#0f172a" strokeWidth="3" />
          </g>

          {/* Workers' Aluminum Lunch Tin (Camen) & Tin Canteen */}
          <g transform="translate(420, 860)">
            {/* 3-tier aluminum lunch tin */}
            <rect x="0" y="40" width="55" height="25" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
            <rect x="0" y="15" width="55" height="25" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
            <rect x="0" y="-10" width="55" height="25" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
            {/* Handle frame */}
            <path d="M-6 40 L-6 -20 L61 -20 L61 40" stroke="#64748b" strokeWidth="3" fill="none" />
            <rect x="18" y="-28" width="20" height="8" rx="2" fill="#78350f" />
            {/* Scratched worker canteen */}
            <ellipse cx="90" cy="35" rx="22" ry="30" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
            <rect x="83" y="0" width="14" height="10" fill="#cbd5e1" />
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
            <linearGradient id="wetStreet10" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#141820" />
              <stop offset="50%" stopColor="#0d1117" />
              <stop offset="100%" stopColor="#05080c" />
            </linearGradient>
          </defs>

          {/* Hanoi Drizzling Night Sky */}
          <rect width="1920" height="1080" fill="url(#hanoiNightSky10)" />

          {/* Rhythmic Undulating Yin-Yang Terracotta Roofs (Mái ngói ta âm dương rêu phong) */}
          <path
            d="M0 480 Q180 430 360 450 Q560 380 780 430 Q1000 350 1220 420 Q1460 360 1680 410 Q1820 370 1920 400 L1920 1080 L0 1080 Z"
            fill="#151113"
          />
          {/* Mossy tile ridges */}
          <path d="M0 480 Q180 430 360 450" stroke="#374151" strokeWidth="8" fill="none" />
          <path d="M360 450 Q560 380 780 430" stroke="#374151" strokeWidth="8" fill="none" />
          <path d="M780 430 Q1000 350 1220 420" stroke="#374151" strokeWidth="8" fill="none" />
          <path d="M1220 420 Q1460 360 1680 410" stroke="#374151" strokeWidth="8" fill="none" />

          {/* Wooden Utility Pole with Tangled Wire & Ceramic Insulators */}
          <g transform="translate(1480, 280)">
            <line x1="0" y1="0" x2="0" y2="520" stroke="#241710" strokeWidth="18" />
            <line x1="-60" y1="60" x2="60" y2="60" stroke="#241710" strokeWidth="8" />
            <circle cx="-50" cy="50" r="6" fill="#f8fafc" />
            <circle cx="0" cy="50" r="6" fill="#f8fafc" />
            <circle cx="50" cy="50" r="6" fill="#f8fafc" />
            {/* Electrical wires drooping */}
            <path d="M-50 50 Q-400 120 -800 80" stroke="#0f172a" strokeWidth="2.5" fill="none" />
            <path d="M0 50 Q-350 140 -800 110" stroke="#0f172a" strokeWidth="2.5" fill="none" />
            <path d="M50 50 Q400 110 440 90" stroke="#0f172a" strokeWidth="2.5" fill="none" />
          </g>

          {/* Weathered Ochre French-Colonial Plaster Walls (Tường vàng vôi quét) */}
          <rect x="720" y="420" width="480" height="360" fill="#3e311c" stroke="#1e170e" strokeWidth="8" />

          {/* Disguise Shop Sign: "HIỆU MAY ĐỨC PHONG" */}
          <g transform="translate(860, 435)">
            <rect width="200" height="34" rx="4" fill="#1e170e" stroke="#ca8a04" strokeWidth="2.5" />
            <text x="100" y="22" fill="#fef3c7" fontSize="13" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              HIỆU MAY ĐỨC PHONG
            </text>
          </g>

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
            {/* Small secret Hammer and Sickle flag draft pinned to wall */}
            <rect x="910" y="515" width="28" height="18" fill="#dc2626" opacity="0.9" />
          </g>

          {/* Wet Hanoi Cobblestone Street with rain reflections & tram tracks */}
          <polygon points="0,760 1920,740 1920,1080 0,1080" fill="url(#wetStreet10)" />
          {/* Electric Tram Tracks (Đường ray tàu điện Bờ Hồ - Hà Đông) */}
          <line x1="0" y1="840" x2="1920" y2="820" stroke="#475569" strokeWidth="8" />
          <line x1="0" y1="885" x2="1920" y2="865" stroke="#475569" strokeWidth="8" />
          <line x1="0" y1="842" x2="1920" y2="822" stroke="#94a3b8" strokeWidth="2" opacity="0.6" />
          <line x1="0" y1="887" x2="1920" y2="867" stroke="#94a3b8" strokeWidth="2" opacity="0.6" />

          {/* Amber Light Puddle Reflection on Wet Asphalt */}
          <ellipse cx="960" cy="880" rx="380" ry="45" fill="#f59e0b" opacity="0.14" />

          {/* Street French Gas Lantern on Wrought-Iron Wall Bracket (Tiền cảnh đèn đường Pháp) */}
          <g transform="translate(260, 480)">
            <path d="M-60 140 Q-20 80 30 60 L30 -20" stroke="#334155" strokeWidth="10" fill="none" />
            <polygon points="10,-60 50,-60 60,10 0,10" fill="#fef08a" opacity="0.9" stroke="#1e293b" strokeWidth="3" />
            <circle cx="30" cy="-25" r="160" fill="url(#houseGlow10)" opacity="0.6" />
          </g>

          {/* Hand-Pulled Rickshaw (Xe kéo tay / Pousse-pousse) Parked by Mossy Wall */}
          <g transform="translate(480, 750)">
            {/* Wooden spoked wheels */}
            <circle cx="90" cy="110" r="60" fill="none" stroke="#78350f" strokeWidth="6" />
            <circle cx="90" cy="110" r="14" fill="#451a03" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="90" y1="110" x2={90 + Math.cos((i / 8) * Math.PI * 2) * 60} y2={110 + Math.sin((i / 8) * Math.PI * 2) * 60} stroke="#78350f" strokeWidth="2.5" />
            ))}
            {/* Rickshaw seat and folding canopy */}
            <polygon points="60,80 120,80 140,40 50,40" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
            <path d="M50 40 Q70 10 120 20 L135 45 Z" fill="#334155" />
            {/* Pull shafts (càng xe kéo) resting on cobblestone */}
            <line x1="90" y1="90" x2="-20" y2="150" stroke="#78350f" strokeWidth="5" />
          </g>

          {/* Drizzling Rain Strands */}
          <g opacity="0.3">
            {Array.from({ length: 30 }).map((_, i) => (
              <line
                key={i}
                x1={(i * 68) % 1920}
                y1={(i * 47) % 700}
                x2={((i * 68) % 1920) - 15}
                y2={((i * 47) % 700) + 45}
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
