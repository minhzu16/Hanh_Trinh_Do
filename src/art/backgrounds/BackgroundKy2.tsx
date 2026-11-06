import React from "react";

export const BackgroundKy2: React.FC<{ bgId: string }> = ({ bgId }) => {
  return (
    <>
      {/* 11. bg-ben-cang-hong-kong: Bến cảng Cửu Long / Victoria Harbour (1930) */}
      {bgId === "bg-ben-cang-hong-kong" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="hkSky11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c1017" />
              <stop offset="45%" stopColor="#182030" />
              <stop offset="80%" stopColor="#293548" />
              <stop offset="100%" stopColor="#3d4f68" />
            </linearGradient>
            <linearGradient id="hkWater11" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#131e2b" />
              <stop offset="50%" stopColor="#0a121c" />
              <stop offset="100%" stopColor="#03060a" />
            </linearGradient>
            <radialGradient id="pierLamp11" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#d97706" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="granitePier11" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#252f3e" />
              <stop offset="50%" stopColor="#1c2430" />
              <stop offset="100%" stopColor="#121820" />
            </linearGradient>
          </defs>

          {/* Cold December harbor night sky */}
          <rect width="1920" height="1080" fill="url(#hkSky11)" />

          {/* Victoria Peak (Thái Bình Sơn) in winter sea fog with distant glowing villa lights */}
          <path
            d="M0 560 Q340 310 760 340 Q1180 220 1560 380 Q1780 440 1920 480 L1920 720 L0 720 Z"
            fill="#0e1520"
            opacity="0.9"
          />
          {/* Sea fog layer across mountain foot */}
          <ellipse cx="960" cy="560" rx="960" ry="120" fill="#94a3b8" opacity="0.15" />
          {/* Distant colonial hill villas amber window lights */}
          <g opacity="0.8">
            <circle cx="580" cy="380" r="2.5" fill="#fef08a" />
            <circle cx="610" cy="375" r="2" fill="#fef08a" />
            <circle cx="920" cy="310" r="3" fill="#fef08a" />
            <circle cx="950" cy="315" r="2" fill="#fef08a" />
            <circle cx="1140" cy="290" r="2.5" fill="#fef08a" />
            <circle cx="1380" cy="380" r="2" fill="#fef08a" />
          </g>

          {/* Victoria Harbour Waters */}
          <rect y="660" width="1920" height="420" fill="url(#hkWater11)" />

          {/* Harbor Water Ripples & City Light Reflections */}
          <g className="vn-wave-swell" opacity="0.65">
            <line x1="200" y1="710" x2="680" y2="710" stroke="#38bdf8" strokeWidth="2" strokeDasharray="16,8" opacity="0.4" />
            <line x1="840" y1="750" x2="1480" y2="750" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="18,10" opacity="0.4" />
            <line x1="120" y1="810" x2="940" y2="810" stroke="#334155" strokeWidth="3" />
            <line x1="680" y1="860" x2="1620" y2="860" stroke="#1e293b" strokeWidth="3.5" />
          </g>

          {/* Traditional Cantonese Junk Boat with Ribbed Batten Sails */}
          <g transform="translate(1240, 520)">
            {/* Wooden hull */}
            <polygon points="0,170 180,170 210,210 -30,210" fill="#2a1a13" stroke="#442a1f" strokeWidth="3" />
            <line x1="90" y1="10" x2="90" y2="170" stroke="#5c3826" strokeWidth="7" />
            {/* Main batten sail */}
            <polygon points="90,15 190,65 180,165 90,165" fill="#994d2c" opacity="0.9" />
            <line x1="90" y1="45" x2="185" y2="80" stroke="#3d2114" strokeWidth="3" />
            <line x1="90" y1="80" x2="185" y2="110" stroke="#3d2114" strokeWidth="3" />
            <line x1="90" y1="115" x2="182" y2="135" stroke="#3d2114" strokeWidth="3" />
            <line x1="90" y1="145" x2="180" y2="155" stroke="#3d2114" strokeWidth="3" />
            {/* Foremast & sail */}
            <line x1="25" y1="50" x2="25" y2="170" stroke="#5c3826" strokeWidth="5" />
            <polygon points="25,55 85,95 80,165 25,165" fill="#803d20" opacity="0.85" />
            <line x1="25" y1="85" x2="83" y2="115" stroke="#3d2114" strokeWidth="2.5" />
            <line x1="25" y1="120" x2="81" y2="140" stroke="#3d2114" strokeWidth="2.5" />
          </g>

          {/* Historic Star Ferry (Phà Ngôi Sao Cửu Long) green & white in distance */}
          <g transform="translate(420, 600)">
            <polygon points="0,40 200,40 180,68 20,68" fill="#14532d" stroke="#052e16" strokeWidth="2" />
            <rect x="25" y="15" width="150" height="25" fill="#f8fafc" />
            <line x1="100" y1="0" x2="100" y2="15" stroke="#1e293b" strokeWidth="3" />
            <circle cx="100" cy="5" r="4" fill="#fef08a" />
            {/* White windows */}
            {[35, 60, 85, 110, 135].map((wx, idx) => (
              <rect key={idx} x={wx} y="20" width="16" height="15" rx="2" fill="#fef08a" opacity="0.85" />
            ))}
          </g>

          {/* Granite Stone Pier Quay in Foreground (Tiền cảnh Cầu tàu đá) */}
          <polygon points="0,820 680,820 800,1080 0,1080" fill="url(#granitePier11)" stroke="#334155" strokeWidth="6" />
          {/* Granite block seams */}
          {[880, 940, 1000].map((y, idx) => (
            <line key={idx} x1="0" y1={y} x2={680 + (idx + 1) * 35} y2={y} stroke="#0f172a" strokeWidth="4" />
          ))}

          {/* Heavy Cast-Iron Bollard wrapped in thick hemp hawser */}
          <g transform="translate(520, 770)">
            <ellipse cx="30" cy="90" rx="36" ry="16" fill="#090d14" />
            <path d="M5 85 L12 25 Q30 20 48 25 L55 85 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
            <ellipse cx="30" cy="25" rx="24" ry="10" fill="#334155" />
            {/* Hemp hawser coiled around bollard */}
            <ellipse cx="30" cy="65" rx="34" ry="12" fill="none" stroke="#92400e" strokeWidth="12" strokeDasharray="10,5" />
            <ellipse cx="30" cy="75" rx="38" ry="14" fill="none" stroke="#92400e" strokeWidth="12" strokeDasharray="10,5" />
          </g>

          {/* Stacked Oak Cargo Crates & Jute Sacks on Pier */}
          <g transform="translate(180, 780)">
            {/* Jute sacks */}
            <ellipse cx="50" cy="95" rx="45" ry="24" fill="#785338" stroke="#523826" strokeWidth="2" />
            <ellipse cx="110" cy="98" rx="42" ry="22" fill="#8c6242" stroke="#523826" strokeWidth="2" />
            <ellipse cx="80" cy="72" rx="40" ry="20" fill="#a0714c" stroke="#523826" strokeWidth="2" />
            {/* Oak shipping crate stenciled "HONG KONG DOCK CO." */}
            <rect x="150" y="20" width="120" height="90" fill="#52361b" stroke="#382413" strokeWidth="4" rx="4" />
            <line x1="150" y1="20" x2="270" y2="110" stroke="#382413" strokeWidth="3" />
            <line x1="150" y1="110" x2="270" y2="20" stroke="#382413" strokeWidth="3" />
            <rect x="155" y="48" width="110" height="34" fill="#382413" opacity="0.6" />
            <text x="210" y="62" fill="#fef3c7" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
              HONG KONG
            </text>
            <text x="210" y="74" fill="#fef3c7" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
              DOCK CO.
            </text>
          </g>

          {/* Colonial Bronze Bilingual Pier Signpost: "PIER 3 / 碼頭" */}
          <g transform="translate(60, 680)">
            <line x1="25" y1="0" x2="25" y2="240" stroke="#1e293b" strokeWidth="10" />
            <rect x="-10" y="20" width="85" height="60" rx="4" fill="#1e293b" stroke="#ca8a04" strokeWidth="3" />
            <text x="32" y="44" fill="#fef3c7" fontSize="13" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              PIER 3
            </text>
            <text x="32" y="66" fill="#ca8a04" fontSize="15" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              三號碼頭
            </text>
          </g>

          {/* Hanging Brass Hurricane Lantern on Post */}
          <g className="vn-lamp-flicker">
            <circle cx="85" cy="700" r="180" fill="url(#pierLamp11)" />
            <rect x="74" y="685" width="22" height="30" rx="4" fill="#fef08a" />
            <rect x="70" y="715" width="30" height="10" rx="2" fill="#78350f" />
          </g>
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
            <linearGradient id="rosewoodTable12" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d1d11" />
              <stop offset="45%" stopColor="#2c140b" />
              <stop offset="100%" stopColor="#180b06" />
            </linearGradient>
          </defs>

          {/* Secret meeting room with dark teak wood paneling */}
          <rect width="1920" height="1080" fill="#0d0906" />

          {/* Wall panel mouldings */}
          {[240, 520, 800, 1080, 1360, 1640].map((x, idx) => (
            <line key={idx} x1={x} y1="0" x2={x} y2="600" stroke="#1c0f08" strokeWidth="6" />
          ))}

          {/* Heavy Drawn Crimson Velvet Curtains blocking British-French colonial surveillance */}
          <path d="M0 0 L420 0 L360 880 L0 880 Z" fill="#2b1115" opacity="0.9" />
          <path d="M1500 0 L1920 0 L1920 880 L1560 880 Z" fill="#2b1115" opacity="0.9" />
          {/* Curtain vertical folds */}
          <line x1="120" y1="0" x2="100" y2="880" stroke="#18090b" strokeWidth="12" />
          <line x1="240" y1="0" x2="210" y2="880" stroke="#18090b" strokeWidth="12" />
          <line x1="1680" y1="0" x2="1710" y2="880" stroke="#18090b" strokeWidth="12" />
          <line x1="1800" y1="0" x2="1820" y2="880" stroke="#18090b" strokeWidth="12" />

          {/* Antique Wall Clock Striking Midnight (Đồng hồ điểm nửa đêm) */}
          <g transform="translate(960, 150)">
            <rect x="-35" y="-50" width="70" height="120" rx="6" fill="#3b2114" stroke="#1a0e08" strokeWidth="4" />
            <circle cx="0" cy="-10" r="26" fill="#fef3c7" stroke="#ca8a04" strokeWidth="3" />
            {/* Clock hands: 12:00 Midnight */}
            <line x1="0" y1="-10" x2="0" y2="-28" stroke="#0f172a" strokeWidth="3.5" />
            <line x1="0" y1="-10" x2="0" y2="-22" stroke="#0f172a" strokeWidth="4" />
            {/* Brass pendulum */}
            <line x1="0" y1="15" x2="0" y2="55" stroke="#ca8a04" strokeWidth="3" />
            <circle cx="0" cy="55" r="8" fill="#ca8a04" />
          </g>

          {/* Master Centerpiece: Brass Hurricane Lantern casting dramatic Chiaroscuro */}
          <g className="vn-lamp-flicker">
            <circle cx="960" cy="520" r="540" fill="url(#kowloonLamp12)" />
            <line x1="960" y1="0" x2="960" y2="460" stroke="#78350f" strokeWidth="5" />
            <rect x="944" y="460" width="32" height="18" rx="4" fill="#92400e" />
            <ellipse cx="960" cy="520" rx="22" ry="34" fill="#ffffff" opacity="0.95" />
            <rect x="940" y="550" width="40" height="25" rx="5" fill="#78350f" />
          </g>

          {/* Round Rosewood Conference Table with Deep Edge Reflection */}
          <ellipse cx="960" cy="850" rx="760" ry="240" fill="url(#rosewoodTable12)" stroke="#442617" strokeWidth="10" />

          {/* The 5 Historical Delegates seated around the table */}
          {/* Delegate 1: Đông Dương Cộng sản Đảng (Trịnh Đình Cửu) */}
          <g transform="translate(420, 700)">
            <circle cx="0" cy="0" r="45" fill="#090604" />
            <path d="M-60 45 Q0 15 60 45 L50 180 L-50 180 Z" fill="#090604" />
            <text x="0" y="110" fill="#fef3c7" fontSize="10" fontFamily="serif" textAnchor="middle" opacity="0.65">
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
            <circle cx="0" cy="0" r="46" fill="#090604" stroke="#f59e0b" strokeWidth="2.5" />
            <path d="M-65 46 Q0 10 65 46 L55 180 L-55 180 Z" fill="#090604" />
            <text x="0" y="115" fill="#fde047" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
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
            <text x="0" y="110" fill="#fef3c7" fontSize="10" fontFamily="serif" textAnchor="middle" opacity="0.65">
              ANCSĐ
            </text>
          </g>

          {/* Authentic Founding Documents on table: Chánh cương & Sách lược vắn tắt */}
          <g transform="translate(840, 805) rotate(-4)">
            <rect width="135" height="100" fill="#fef3c7" rx="3" stroke="#d97706" strokeWidth="2" />
            <text x="67" y="20" fill="#991b1b" fontSize="8" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              CHÁNH CƯƠNG VẮN TẮT
            </text>
            <line x1="12" y1="32" x2="122" y2="32" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="44" x2="115" y2="44" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="56" x2="120" y2="56" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="68" x2="100" y2="68" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="80" x2="110" y2="80" stroke="#475569" strokeWidth="2" />
          </g>
          <g transform="translate(980, 815) rotate(5)">
            <rect width="130" height="95" fill="#fef9c3" rx="3" stroke="#d97706" strokeWidth="2" />
            <text x="65" y="20" fill="#991b1b" fontSize="8" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              SÁCH LƯỢC VẮN TẮT
            </text>
            <line x1="12" y1="32" x2="118" y2="32" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="44" x2="110" y2="44" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="56" x2="105" y2="56" stroke="#475569" strokeWidth="2" />
            <line x1="12" y1="68" x2="112" y2="68" stroke="#475569" strokeWidth="2" />
          </g>

          {/* Delicate Pink Peach Blossom Branch (Cành hoa đào xuân phớt hồng Tết Canh Ngọ 1930) */}
          <g transform="translate(680, 800)">
            {/* Small ceramic vase */}
            <ellipse cx="20" cy="50" rx="14" ry="24" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <ellipse cx="20" cy="30" rx="8" ry="4" fill="#38bdf8" />
            {/* Dark woody branch */}
            <path d="M20 30 Q10 0 35 -30 M22 8 Q45 -8 55 -25" stroke="#451a03" strokeWidth="3" fill="none" />
            {/* Pink peach blossom petals */}
            <circle cx="35" cy="-30" r="7" fill="#f472b6" opacity="0.9" />
            <circle cx="35" cy="-30" r="3" fill="#fbbf24" />
            <circle cx="20" cy="-12" r="6" fill="#f472b6" opacity="0.9" />
            <circle cx="55" cy="-25" r="7" fill="#f472b6" opacity="0.9" />
            <circle cx="55" cy="-25" r="3" fill="#fbbf24" />
            <circle cx="42" cy="-5" r="5" fill="#f472b6" opacity="0.85" />
          </g>

          {/* Steaming Blue-and-White Porcelain Teapot & Teacups */}
          <g transform="translate(1160, 825)">
            <ellipse cx="30" cy="30" rx="24" ry="20" fill="#f8fafc" stroke="#0284c7" strokeWidth="2.5" />
            <ellipse cx="65" cy="38" rx="12" ry="8" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
            <ellipse cx="65" cy="36" rx="8" ry="5" fill="#78350f" />
            {/* Vintage matchbox & porcelain ashtray */}
            <rect x="85" y="45" width="28" height="18" fill="#ca8a04" stroke="#78350f" strokeWidth="1.5" rx="2" />
            <ellipse cx="130" cy="52" rx="18" ry="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
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
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.34" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Violet-Rose Dawn Sky */}
          <rect width="1920" height="720" fill="url(#dawnSky13)" />

          {/* Panoramic View of Kowloon Peninsula through Window: Misty Traditional Rooftops */}
          <g transform="translate(0, 480)" opacity="0.6">
            <path
              d="M0 180 Q200 120 400 160 Q700 90 1000 150 Q1300 80 1600 140 Q1800 110 1920 130 L1920 240 L0 240 Z"
              fill="#180e22"
            />
          </g>

          {/* Springtime Swallows (Đàn én xuân) Soaring into the Dawn Sky */}
          <g opacity="0.85">
            <path d="M720 220 Q735 200 750 220 Q765 200 780 220" stroke="#fef08a" strokeWidth="3" fill="none" />
            <path d="M840 180 Q852 165 865 180 Q878 165 890 180" stroke="#fef08a" strokeWidth="2.5" fill="none" />
            <path d="M960 210 Q975 190 990 210 Q1005 190 1020 210" stroke="#fef08a" strokeWidth="3" fill="none" />
          </g>

          {/* Arched Window Frame with Drawn-Back Crimson Curtains */}
          <g transform="translate(560, 60)">
            <path d="M0 660 L0 200 Q400 40 800 200 L800 660 Z" fill="none" stroke="#2a160e" strokeWidth="28" />
            <line x1="400" y1="120" x2="400" y2="660" stroke="#2a160e" strokeWidth="16" />
            <line x1="0" y1="380" x2="800" y2="380" stroke="#2a160e" strokeWidth="16" />
            {/* Drawn-back curtains */}
            <path d="M-20 0 Q60 300 -20 660" stroke="#881337" strokeWidth="48" fill="none" />
            <path d="M820 0 Q740 300 820 660" stroke="#881337" strokeWidth="48" fill="none" />
          </g>

          {/* Dawn rays entering through parted curtains (Tia nắng rạng đông) */}
          <polygon points="580,0 1340,0 1820,1080 340,1080" fill="url(#dawnShaft13)" className="vn-light-shaft" />

          {/* Window sill & room floor */}
          <polygon points="0,720 1920,720 1920,1080 0,1080" fill="#22150f" />

          {/* Desk with Final Unified Party Document: "ĐẢNG CỘNG SẢN VIỆT NAM" */}
          <polygon points="260,780 1660,780 1780,1080 140,1080" fill="#362117" stroke="#503023" strokeWidth="8" />

          {/* Stack of finalized documents & uncapped fountain pen */}
          <g transform="translate(800, 810)">
            <rect width="280" height="175" fill="#fef3c7" rx="4" stroke="#ca8a04" strokeWidth="3" />
            <text x="140" y="42" fill="#991b1b" fontSize="21" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              ĐẢNG CỘNG SẢN VIỆT NAM
            </text>
            <text x="140" y="70" fill="#ca8a04" fontSize="13" fontFamily="serif" textAnchor="middle">
              Ngày 7 tháng 2 năm 1930
            </text>
            <text x="140" y="94" fill="#334155" fontSize="13" fontFamily="serif" textAnchor="middle">
              Chánh cương, Sách lược & Điều lệ vắn tắt
            </text>
            <line x1="30" y1="114" x2="250" y2="114" stroke="#94a3b8" strokeWidth="2" />
            <line x1="30" y1="132" x2="230" y2="132" stroke="#94a3b8" strokeWidth="2" />
            {/* Red stamp seal at bottom right */}
            <circle cx="230" cy="145" r="16" fill="#dc2626" opacity="0.85" />
            <polygon points="230,135 233,142 240,142 234,146 236,153 230,149 224,153 226,146 220,142 227,142" fill="#fef08a" />
            {/* Uncapped Ebonite Fountain Pen (Cây bút máy ebonite đen cài vàng) */}
            <line x1="240" y1="80" x2="310" y2="150" stroke="#0f172a" strokeWidth="9" strokeLinecap="round" />
            <polygon points="235,75 242,82 232,85" fill="#ca8a04" />
          </g>

          {/* Antique Brass Desk Clock Reading 5:30 AM */}
          <g transform="translate(1320, 820)">
            <rect width="70" height="65" rx="6" fill="#ca8a04" stroke="#78350f" strokeWidth="3" />
            <circle cx="35" cy="32" r="24" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
            {/* Hands: 5:30 AM */}
            <line x1="35" y1="32" x2="35" y2="48" stroke="#0f172a" strokeWidth="3" />
            <line x1="35" y1="32" x2="48" y2="40" stroke="#0f172a" strokeWidth="3.5" />
          </g>

          {/* Cooled Teacup with tea leaves & spent matches on desk */}
          <g transform="translate(480, 840)">
            <ellipse cx="30" cy="30" rx="25" ry="15" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <ellipse cx="30" cy="28" rx="18" ry="10" fill="#78350f" opacity="0.6" />
            {/* Spent matchsticks */}
            <line x1="65" y1="40" x2="95" y2="28" stroke="#ca8a04" strokeWidth="2.5" />
            <circle cx="95" cy="28" r="2.5" fill="#0f172a" />
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
            <radialGradient id="sunAura14" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="1" />
              <stop offset="35%" stopColor="#fef08a" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sunrise Sky */}
          <rect width="1920" height="660" fill="url(#sunriseSky14)" />

          {/* Golden Sunrays Radiating into Morning Sky */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 15) * Math.PI;
            const x = 960 - Math.cos(angle) * 850;
            const y = 620 - Math.sin(angle) * 550;
            return <line key={i} x1={960} y1={620} x2={x} y2={y} stroke="#fef08a" strokeWidth="12" opacity="0.25" />;
          })}

          {/* Crimson Sun Rising on Horizon */}
          <circle cx="960" cy="620" r="130" fill="url(#sunAura14)" />
          <circle cx="960" cy="620" r="75" fill="#fef08a" />
          <ellipse cx="960" cy="635" rx="220" ry="20" fill="#f59e0b" opacity="0.8" />

          {/* Pink-edged Gold Dawn Clouds */}
          <ellipse cx="520" cy="480" rx="320" ry="35" fill="#fbcfe8" opacity="0.25" />
          <ellipse cx="1400" cy="510" rx="380" ry="40" fill="#fbcfe8" opacity="0.25" />

          {/* Flight of Seabirds Wheeling Overhead Leading Ship Home (Đàn hải âu tung cánh) */}
          <g opacity="0.85">
            <path d="M420 260 Q435 240 450 260 Q465 240 480 260" stroke="#450a0a" strokeWidth="3" fill="none" />
            <path d="M540 210 Q552 195 565 210 Q578 195 590 210" stroke="#450a0a" strokeWidth="2.5" fill="none" />
            <path d="M680 270 Q695 250 710 270 Q725 250 740 270" stroke="#450a0a" strokeWidth="2.5" fill="none" />
            <path d="M1260 230 Q1275 210 1290 230 Q1305 210 1320 230" stroke="#450a0a" strokeWidth="3" fill="none" />
            <path d="M1380 280 Q1395 260 1410 280 Q1425 260 1440 280" stroke="#450a0a" strokeWidth="3" fill="none" />
          </g>

          {/* Vast East Sea Reflecting Sunrise */}
          <rect y="640" width="1920" height="200" fill="url(#sunriseSea14)" />

          {/* Golden Sun Glitter Trail on Waters Stretching to Bow (Dải lụa vàng lấp lánh) */}
          <g className="vn-wave-swell" opacity="0.85">
            <line x1="860" y1="645" x2="1060" y2="645" stroke="#fef08a" strokeWidth="4" />
            <line x1="780" y1="660" x2="1140" y2="660" stroke="#fef08a" strokeWidth="5" />
            <line x1="680" y1="680" x2="1240" y2="680" stroke="#fde047" strokeWidth="5" />
            <line x1="560" y1="710" x2="1360" y2="710" stroke="#f59e0b" strokeWidth="6" />
            <line x1="420" y1="745" x2="1500" y2="745" stroke="#ea580c" strokeWidth="6" />
          </g>

          {/* Plumes of Foaming White Bow Waves (Bọt sóng mũi tàu trắng xoá) */}
          <g opacity="0.75">
            <path d="M200 780 Q560 740 960 770" stroke="#ffffff" strokeWidth="5" strokeDasharray="16,8" fill="none" />
            <path d="M1720 780 Q1360 740 960 770" stroke="#ffffff" strokeWidth="5" strokeDasharray="16,8" fill="none" />
          </g>

          {/* Ship Bow Deck Steering toward Homeland */}
          <polygon points="0,810 1920,760 1920,1080 0,1080" fill="#301f16" />
          <line x1="0" y1="780" x2="1920" y2="730" stroke="#ca8a04" strokeWidth="14" />
          <line x1="0" y1="782" x2="1920" y2="732" stroke="#fef08a" strokeWidth="2.5" opacity="0.8" />
          <line x1="0" y1="815" x2="1920" y2="765" stroke="#78350f" strokeWidth="7" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 102} y1={780 - i * 2.6} x2={i * 102} y2={845 - i * 2.4} stroke="#52361b" strokeWidth="7" />
          ))}

          {/* Heavy Steam Anchor Windlass & Anchor Chain (Tời neo & xích neo) */}
          <g transform="translate(860, 780)">
            <rect width="200" height="90" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="4" />
            <circle cx="60" cy="45" r="32" fill="#334155" stroke="#0f172a" strokeWidth="6" />
            <circle cx="140" cy="45" r="32" fill="#334155" stroke="#0f172a" strokeWidth="6" />
            {/* Heavy iron chain links */}
            {[20, 50, 80, 110, 140, 170].map((cx, idx) => (
              <ellipse key={idx} cx={cx} cy={45} rx="12" ry="7" fill="none" stroke="#64748b" strokeWidth="5" />
            ))}
          </g>

          {/* Ship's Polished Brass Bell Stamped "1930" in Foreground */}
          <g transform="translate(360, 740)">
            <line x1="30" y1="0" x2="30" y2="35" stroke="#78350f" strokeWidth="6" />
            <path d="M12 75 Q15 45 30 40 Q45 45 48 75 Z" fill="#ca8a04" stroke="#854d0e" strokeWidth="3" />
            <ellipse cx="30" cy="75" rx="18" ry="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
            <line x1="30" y1="75" x2="30" y2="92" stroke="#78350f" strokeWidth="4" />
            <circle cx="30" cy="94" r="5" fill="#ca8a04" />
            <text x="30" y="65" fill="#78350f" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
              1930
            </text>
          </g>

          {/* Lifebuoy with Red and White Stripes */}
          <g transform="translate(1560, 780)">
            <ellipse cx="65" cy="65" rx="55" ry="55" fill="#dc2626" stroke="#f8fafc" strokeWidth="6" />
            <ellipse cx="65" cy="65" rx="28" ry="28" fill="#301f16" />
            <line x1="10" y1="65" x2="120" y2="65" stroke="#f8fafc" strokeWidth="8" />
            <line x1="65" y1="10" x2="65" y2="120" stroke="#f8fafc" strokeWidth="8" />
          </g>
        </svg>
      )}
    </>
  );
};
