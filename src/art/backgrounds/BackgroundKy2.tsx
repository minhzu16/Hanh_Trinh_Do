import React from "react";
import { SharedBackgroundDefs } from "./svgDefs";

export const BackgroundKy2: React.FC<{ bgId: string }> = ({ bgId }) => {
  return (
    <>
      {/* 11. bg-ben-cang-hong-kong: Bến cảng Cửu Long / Victoria Harbour (1930) */}
      {bgId === "bg-ben-cang-hong-kong" && (
        <svg viewBox="0 0 3200 1200" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
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
                    <SharedBackgroundDefs />
          </defs>
          <g id="layer-sky-vista" transform="scale(1.6666667 1.1111111)">


          {/* Cold December harbor night sky */}
          <rect width="1920" height="1080" fill="url(#hkSky11)" />

          {/* Victoria Peak (Thái Bình Sơn) in winter sea fog with distant colonial villas */}
          <path
            d="M0 520 Q340 280 760 310 Q1180 200 1560 350 Q1780 420 1920 450 L1920 680 L0 680 Z"
            fill="#0e1520"
            opacity="0.92"
          />
          {/* Sea fog layer across mountain foot */}
          <ellipse cx="960" cy="530" rx="960" ry="110" fill="#94a3b8" opacity="0.15" />
          {/* Distant hillside villas amber window lights */}
          <g opacity="0.85">
            <circle cx="580" cy="360" r="2.5" fill="#fef08a" />
            <circle cx="610" cy="355" r="2" fill="#fef08a" />
            <circle cx="920" cy="290" r="3" fill="#fef08a" />
            <circle cx="950" cy="295" r="2" fill="#fef08a" />
            <circle cx="1140" cy="270" r="2.5" fill="#fef08a" />
            <circle cx="1380" cy="360" r="2" fill="#fef08a" />
          </g>

          {/* Victoria Harbour Waters */}
          <rect y="640" width="1920" height="440" fill="url(#hkWater11)" />

          {/* Harbor Water Ripples & City Light Reflections */}
          <g className="vn-wave-swell" opacity="0.7">
            <line x1="200" y1="690" x2="680" y2="690" stroke="#38bdf8" strokeWidth="2" strokeDasharray="16,8" opacity="0.4" />
            <line x1="840" y1="730" x2="1480" y2="730" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="18,10" opacity="0.4" />
            <line x1="120" y1="780" x2="940" y2="780" stroke="#334155" strokeWidth="3" />
            <line x1="680" y1="830" x2="1620" y2="830" stroke="#1e293b" strokeWidth="3.5" />
          </g>

          {/* === RIGHT WING: SAFE ZONE (x: 1250 - 1880, y: 140 - 680) === */}
          {/* Traditional Cantonese Sea Junk with Ribbed Batten Sails */}
          <g transform="translate(1360, 200)">
            {/* Wooden hull */}
            <polygon points="0,260 260,260 300,310 -40,310" fill="#2a1a13" stroke="#442a1f" strokeWidth="4" />
            <line x1="130" y1="20" x2="130" y2="260" stroke="#5c3826" strokeWidth="9" />
            {/* Main ribbed batten sail */}
            <polygon points="130,25 270,95 260,255 130,255" fill="#994d2c" opacity="0.92" />
            <line x1="130" y1="70" x2="265" y2="120" stroke="#3d2114" strokeWidth="3.5" />
            <line x1="130" y1="120" x2="265" y2="160" stroke="#3d2114" strokeWidth="3.5" />
            <line x1="130" y1="170" x2="262" y2="200" stroke="#3d2114" strokeWidth="3.5" />
            <line x1="130" y1="215" x2="260" y2="235" stroke="#3d2114" strokeWidth="3.5" />
            {/* Foremast & sail */}
            <line x1="35" y1="80" x2="35" y2="260" stroke="#5c3826" strokeWidth="7" />
            <polygon points="35,85 120,140 115,255 35,255" fill="#803d20" opacity="0.88" />
            <line x1="35" y1="130" x2="118" y2="170" stroke="#3d2114" strokeWidth="3" />
            <line x1="35" y1="175" x2="116" y2="205" stroke="#3d2114" strokeWidth="3" />
          </g>

          {/* Historic Star Ferry (Phà Ngôi Sao Cửu Long) cruising in mid-ground */}
          <g transform="translate(1260, 520)">
            <polygon points="0,35 180,35 160,60 20,60" fill="#14532d" stroke="#052e16" strokeWidth="2" />
            <rect x="20" y="12" width="140" height="23" fill="#f8fafc" />
            <line x1="90" y1="0" x2="90" y2="12" stroke="#1e293b" strokeWidth="3" />
            <circle cx="90" cy="4" r="3.5" fill="#fef08a" />
            {[30, 52, 74, 96, 118, 140].map((wx, idx) => (
              <rect key={idx} x={wx} y="16" width="14" height="14" rx="2" fill="#fef08a" opacity="0.9" />
            ))}
          </g>

          {/* === LEFT WING: SAFE ZONE (x: 80 - 640, y: 160 - 680) === */}
          {/* Granite Stone Pier Horizontal Walking Quay in Perspective */}
          <polygon points="0,340 500,340 600,490 0,510" fill="#243042" stroke="#1e293b" strokeWidth="3" />
          <line x1="0" y1="410" x2="540" y2="400" stroke="#334155" strokeWidth="2" opacity="0.6" />

          {/* Vertical Seawall Plunging into Victoria Harbour */}
          <polygon points="0,510 600,490 680,780 0,780" fill="url(#granitePier11)" stroke="#334155" strokeWidth="5" />
          {/* Granite stone block mortar seams */}
          {[550, 610, 670, 730].map((y, idx) => (
            <line key={idx} x1="0" y1={y} x2={600 + (idx + 1) * 20} y2={y} stroke="#0f172a" strokeWidth="3.5" />
          ))}

          {/* Colonial Bronze Bilingual Pier Signpost: "PIER 3 / 三號碼頭" */}
          <g transform="translate(120, 320)">
            <line x1="30" y1="0" x2="30" y2="340" stroke="#1e293b" strokeWidth="12" />
            <rect x="-15" y="10" width="130" height="85" rx="6" fill="#1e293b" stroke="#ca8a04" strokeWidth="3.5" />
            <rect x="-8" y="16" width="116" height="73" fill="#0f172a" rx="4" />
            <text x="50" y="44" fill="#fef3c7" fontSize="16" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              PIER 3
            </text>
            <text x="50" y="74" fill="#ca8a04" fontSize="21" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              三號碼頭
            </text>
          </g>

          {/* Hanging Brass Hurricane Lantern with Warm Glowing Halo */}
          <g transform="translate(240, 310)" className="vn-lamp-flicker">
            <circle cx="20" cy="40" r="140" fill="url(#pierLamp11)" />
            <line x1="20" y1="0" x2="20" y2="25" stroke="#78350f" strokeWidth="4" />
            <rect x="8" y="25" width="24" height="32" rx="4" fill="#fef08a" />
            <rect x="5" y="55" width="30" height="10" rx="2" fill="#78350f" />
          </g>

          {/* Heavy Cast-Iron Bollard wrapped in thick hemp hawser rope */}
          <g transform="translate(460, 440)">
            <ellipse cx="30" cy="90" rx="36" ry="16" fill="#090d14" />
            <path d="M5 85 L12 25 Q30 20 48 25 L55 85 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />
            <ellipse cx="30" cy="25" rx="24" ry="10" fill="#334155" />
            {/* Hemp hawser rope coil */}
            <ellipse cx="30" cy="65" rx="34" ry="12" fill="none" stroke="#92400e" strokeWidth="12" strokeDasharray="10,5" />
            <ellipse cx="30" cy="75" rx="38" ry="14" fill="none" stroke="#92400e" strokeWidth="12" strokeDasharray="10,5" />
          </g>

          {/* Stacked Oak Cargo Shipping Crates on Pier */}
          <g transform="translate(180, 470)">
            {/* Oak crate 1: Stenciled HONG KONG DOCK CO. */}
            <rect width="170" height="120" rx="4" fill="#52361b" stroke="#382413" strokeWidth="4" />
            <line x1="0" y1="0" x2="170" y2="120" stroke="#382413" strokeWidth="3" />
            <line x1="0" y1="120" x2="170" y2="0" stroke="#382413" strokeWidth="3" />
            <rect x="15" y="42" width="140" height="42" fill="#382413" opacity="0.7" rx="2" />
            <text x="85" y="60" fill="#fef3c7" fontSize="11" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              HONG KONG
            </text>
            <text x="85" y="75" fill="#fef3c7" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
              DOCK CO. — CARGO
            </text>
          </g>

          {/* Pier floor extending below dialog box */}
          <polygon points="0,780 1920,780 1920,1080 0,1080" fill="#121820" />
          </g>
          <g id="layer-architecture-mid" aria-label="Victoria Harbour và cảng Cửu Long">
            <path d="M0 180Q520 60 1050 220T2100 180T3200 220V820H0Z" fill="#121d2b" opacity="0.5" />
            <path d="M0 800Q600 740 1200 800T2400 780T3200 810V1200H0Z" fill="url(#pattern-cobblestone)" opacity="0.35" />
            <g transform="translate(2150 180)">
              <rect width="360" height="520" fill="#7e3327" stroke="#d09c61" strokeWidth="12" />
              <path d="M0 120H360M0 240H360M0 360H360" stroke="#4b201c" strokeWidth="13" />
              <rect x="110" y="50" width="140" height="80" fill="#f3d37a" stroke="#4b201c" strokeWidth="8" />
              <text x="180" y="102" textAnchor="middle" fill="#4b201c" fontSize="22" fontFamily="serif">KCR</text>
              <path d="M180 0V-130" stroke="#d09c61" strokeWidth="14" /><circle cx="180" cy="-155" r="28" fill="#f3d37a" />
            </g>
            <g transform="translate(1120 520)" filter="url(#filter-water-reflection)">
              <rect width="360" height="100" rx="20" fill="#e8e1c7" stroke="#62452c" strokeWidth="8" />
              <rect x="25" y="35" width="310" height="45" fill="#283f42" />
              {[55, 100, 145, 190, 235, 280].map((x) => <rect key={x} x={x} y="42" width="22" height="28" fill="#f8d77d" />)}
              <text x="180" y="125" textAnchor="middle" fill="#f3d37a" fontSize="22" fontFamily="serif">STAR FERRY</text>
            </g>
          </g>
          <g id="layer-historical-props-lod" aria-label="Cảng và hàng hóa lịch sử">
            <g transform="translate(260 650)" filter="url(#filter-drop-shadow)">
              <rect width="540" height="220" fill="url(#pattern-woodgrain)" stroke="#b88d51" strokeWidth="9" />
              <text x="270" y="75" textAnchor="middle" fill="#f5dc9a" fontSize="30" fontWeight="bold" fontFamily="serif">PIER 3 / 三號碼頭</text>
              <text x="270" y="125" textAnchor="middle" fill="#f5dc9a" fontSize="24" fontFamily="serif">KOWLOON DOCK CO.</text>
              <path d="M60 165H480" stroke="#d4ae68" strokeWidth="4" />
            </g>
            <g transform="translate(2700 700)">
              <path d="M0 140Q150 80 300 140L270 205H30Z" fill="#422319" stroke="#b47c42" strokeWidth="8" />
              <path d="M150 140V-100M150 -90L285 -30L265 125L150 125Z" fill="#843d28" stroke="#d09c61" strokeWidth="7" />
              <path d="M150 -40L270 10M150 25L270 65M150 85L270 105" stroke="#3b1b16" strokeWidth="6" />
            </g>
          </g>
          <g id="layer-foreground-vignette" aria-label="Sương và ánh đèn cảng">
            <path d="M0 0H180V1200H0ZM3200 0H3020V1200H3200Z" fill="#05090f" opacity="0.4" />
            <ellipse cx="600" cy="500" rx="360" ry="260" fill="#fbbf24" opacity="0.08" filter="url(#filter-lantern-bloom)" />
          </g>
        </svg>
      )}

      {/* 12. bg-goc-phong-den-dau: Hội nghị hợp nhất thành lập Đảng, Cửu Long (3/2/1930) */}
      {bgId === "bg-goc-phong-den-dau" && (
        <svg viewBox="0 0 3200 1200" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
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
                    <SharedBackgroundDefs />
          </defs>
          <g id="layer-sky-vista" transform="scale(1.6666667 1.1111111)">


          {/* Secret meeting room with dark teak wood paneling */}
          <rect width="1920" height="1080" fill="#0d0906" />

          {/* Wall panel mouldings */}
          {[240, 520, 800, 1080, 1360, 1640].map((x, idx) => (
            <line key={idx} x1={x} y1="0" x2={x} y2="600" stroke="#1c0f08" strokeWidth="6" />
          ))}

          {/* Heavy Drawn Crimson Velvet Curtains blocking British surveillance */}
          <path d="M0 0 L320 0 L260 780 L0 780 Z" fill="#2b1115" opacity="0.92" />
          <path d="M1620 0 L1920 0 L1920 780 L1680 780 Z" fill="#2b1115" opacity="0.92" />
          <line x1="120" y1="0" x2="100" y2="780" stroke="#18090b" strokeWidth="12" />
          <line x1="1800" y1="0" x2="1820" y2="780" stroke="#18090b" strokeWidth="12" />

          {/* Master Hanging Brass Hurricane Lantern casting Chiaroscuro Light over Conference Table */}
          <g transform="translate(340, 140)" className="vn-lamp-flicker">
            <circle cx="0" cy="180" r="380" fill="url(#kowloonLamp12)" />
            <line x1="0" y1="-140" x2="0" y2="120" stroke="#78350f" strokeWidth="5" />
            <rect x="-16" y="120" width="32" height="18" rx="4" fill="#92400e" />
            <ellipse cx="0" cy="180" rx="22" ry="34" fill="#ffffff" opacity="0.95" />
            <rect x="-20" y="210" width="40" height="25" rx="5" fill="#78350f" />
          </g>

          {/* === RIGHT WING: SAFE ZONE (x: 1250 - 1880, y: 160 - 680) === */}
          {/* Antique Wall Clock Striking Midnight (Đồng hồ điểm nửa đêm) */}
          <g transform="translate(1620, 180)">
            <rect x="-35" y="-50" width="70" height="120" rx="6" fill="#3b2114" stroke="#1a0e08" strokeWidth="4" />
            <circle cx="0" cy="-10" r="26" fill="#fef3c7" stroke="#ca8a04" strokeWidth="3" />
            {/* Clock hands: 12:00 Midnight */}
            <line x1="0" y1="-10" x2="0" y2="-28" stroke="#0f172a" strokeWidth="3.5" />
            <line x1="0" y1="-10" x2="0" y2="-22" stroke="#0f172a" strokeWidth="4" />
            {/* Brass pendulum */}
            <line x1="0" y1="15" x2="0" y2="55" stroke="#ca8a04" strokeWidth="3" />
            <circle cx="0" cy="55" r="8" fill="#ca8a04" />
          </g>

          {/* Solemn Conference Delegate Silhouettes Seated in Deep Consultation */}
          <g transform="translate(1420, 380)">
            {/* Delegate Đông Dương Cộng sản Đảng */}
            <g transform="translate(0, 40)">
              <circle cx="0" cy="0" r="42" fill="#090604" />
              <path d="M-55 42 Q0 15 55 42 L45 160 L-45 160 Z" fill="#090604" />
              <text x="0" y="95" fill="#fef3c7" fontSize="11" fontFamily="serif" textAnchor="middle" opacity="0.75">
                ĐDCSĐ
              </text>
            </g>
            {/* Delegate An Nam Cộng sản Đảng */}
            <g transform="translate(180, 20)">
              <circle cx="0" cy="0" r="45" fill="#090604" />
              <path d="M-60 45 Q0 15 60 45 L50 180 L-50 180 Z" fill="#090604" />
              <text x="0" y="105" fill="#fef3c7" fontSize="11" fontFamily="serif" textAnchor="middle" opacity="0.75">
                ANCSĐ
              </text>
            </g>
          </g>

          {/* === LEFT WING: SAFE ZONE (x: 80 - 640, y: 160 - 680) === */}
          {/* Round Rosewood Conference Table Edge elevated into Left Wing */}
          <g transform="translate(80, 360)">
            <ellipse cx="280" cy="240" rx="340" ry="160" fill="url(#rosewoodTable12)" stroke="#442617" strokeWidth="8" />

            {/* Delicate Pink Peach Blossom Branch (Cành hoa đào xuân phớt hồng Tết Canh Ngọ 1930) */}
            <g transform="translate(90, 40)">
              {/* Celadon ceramic vase */}
              <ellipse cx="25" cy="80" rx="18" ry="32" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
              <ellipse cx="25" cy="52" rx="10" ry="5" fill="#38bdf8" />
              {/* Dark woody branch spreading gracefully */}
              <path d="M25 52 Q12 10 45 -30 M28 20 Q58 -5 70 -26 M20 32 Q-10 10 -5 -15" stroke="#451a03" strokeWidth="3.5" fill="none" />
              {/* Blooming soft-pink peach blossom petals */}
              <circle cx="45" cy="-30" r="8" fill="#f472b6" opacity="0.95" />
              <circle cx="45" cy="-30" r="3" fill="#fbbf24" />
              <circle cx="28" cy="-5" r="7" fill="#f472b6" opacity="0.95" />
              <circle cx="70" cy="-26" r="8" fill="#f472b6" opacity="0.95" />
              <circle cx="70" cy="-26" r="3" fill="#fbbf24" />
              <circle cx="-5" cy="-15" r="7" fill="#f472b6" opacity="0.9" />
              <circle cx="55" cy="2" r="6" fill="#f472b6" opacity="0.9" />
            </g>

            {/* Sacred Founding Documents clearly displayed on Rosewood Table */}
            <g transform="translate(230, 80) rotate(-5)">
              <rect width="180" height="125" fill="#fef3c7" rx="4" stroke="#d97706" strokeWidth="2.5" />
              <text x="90" y="28" fill="#991b1b" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                CHÁNH CƯƠNG VẮN TẮT
              </text>
              <line x1="20" y1="42" x2="160" y2="42" stroke="#475569" strokeWidth="2" />
              <line x1="20" y1="56" x2="150" y2="56" stroke="#475569" strokeWidth="2" />
              <line x1="20" y1="70" x2="155" y2="70" stroke="#475569" strokeWidth="2" />
              <line x1="20" y1="84" x2="135" y2="84" stroke="#475569" strokeWidth="2" />
              <line x1="20" y1="98" x2="145" y2="98" stroke="#475569" strokeWidth="2" />
            </g>

            <g transform="translate(390, 110) rotate(6)">
              <rect width="165" height="115" fill="#fef9c3" rx="4" stroke="#d97706" strokeWidth="2.5" />
              <text x="82" y="26" fill="#991b1b" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                SÁCH LƯỢC VẮN TẮT
              </text>
              <line x1="16" y1="40" x2="148" y2="40" stroke="#475569" strokeWidth="2" />
              <line x1="16" y1="54" x2="140" y2="54" stroke="#475569" strokeWidth="2" />
              <line x1="16" y1="68" x2="135" y2="68" stroke="#475569" strokeWidth="2" />
              <line x1="16" y1="82" x2="142" y2="82" stroke="#475569" strokeWidth="2" />
            </g>

            {/* Steaming Celadon Teapot & Porcelain Teacup */}
            <g transform="translate(130, 180)">
              <ellipse cx="30" cy="30" rx="26" ry="22" fill="#f8fafc" stroke="#0284c7" strokeWidth="2.5" />
              <ellipse cx="68" cy="38" rx="14" ry="9" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
              <ellipse cx="68" cy="36" rx="9" ry="6" fill="#78350f" />
              {/* Matchbox & brass candlestick */}
              <rect x="90" y="42" width="30" height="20" fill="#ca8a04" stroke="#78350f" strokeWidth="1.5" rx="2" />
            </g>
          </g>

          {/* Room floor extending below dialog box */}
          <polygon points="0,780 1920,780 1920,1080 0,1080" fill="#180e09" />
          </g>
          <g id="layer-architecture-mid" aria-label="Phòng hội nghị Cửu Long">
            <path d="M0 150H3200V820H0Z" fill="url(#pattern-woodgrain)" opacity="0.26" />
            <path d="M0 180H3200M0 300H3200M0 420H3200M0 540H3200" stroke="#9e7042" strokeWidth="8" opacity="0.28" />
            <path d="M2350 180V760M2650 180V760M2950 180V760" stroke="#c89b5b" strokeWidth="16" opacity="0.45" />
            <path d="M2300 180Q2650 20 3200 180" fill="none" stroke="#d7b674" strokeWidth="18" opacity="0.5" />
          </g>
          <g id="layer-historical-props-lod" aria-label="Văn kiện Hội nghị hợp nhất">
            <g transform="translate(950 650)" filter="url(#filter-drop-shadow)">
              <ellipse cx="620" cy="210" rx="620" ry="180" fill="url(#rosewoodTable12)" stroke="#d29b56" strokeWidth="12" />
              <g transform="translate(280 70) rotate(-5)">
                <rect width="330" height="210" fill="url(#pattern-parchment)" stroke="#d2a15b" strokeWidth="7" />
                <text x="165" y="48" textAnchor="middle" fill="#7f1d1d" fontSize="25" fontWeight="bold" fontFamily="serif">CHÁNH CƯƠNG</text>
                <text x="165" y="82" textAnchor="middle" fill="#7f1d1d" fontSize="24" fontFamily="serif">VẮN TẮT</text>
                <text x="165" y="125" textAnchor="middle" fill="#4a3221" fontSize="18" fontFamily="serif">Làm tư sản dân quyền</text>
                <text x="165" y="153" textAnchor="middle" fill="#4a3221" fontSize="18" fontFamily="serif">và thổ địa cách mạng</text>
              </g>
              <g transform="translate(690 80) rotate(6)">
                <rect width="300" height="195" fill="url(#pattern-parchment)" stroke="#d2a15b" strokeWidth="7" />
                <text x="150" y="55" textAnchor="middle" fill="#7f1d1d" fontSize="24" fontWeight="bold" fontFamily="serif">SÁCH LƯỢC</text>
                <text x="150" y="90" textAnchor="middle" fill="#7f1d1d" fontSize="24" fontFamily="serif">VẮN TẮT</text>
                <path d="M35 125H265M35 150H240" stroke="#65452e" strokeWidth="4" />
              </g>
            </g>
            <g transform="translate(2420 350)">
              <rect width="170" height="260" fill="#3b2114" stroke="#bd8c4d" strokeWidth="9" />
              <circle cx="85" cy="55" r="48" fill="#f4e3b2" stroke="#bd8c4d" strokeWidth="7" />
              <path d="M85 55V25M85 55L110 70" stroke="#38271b" strokeWidth="7" />
              <path d="M85 103V220" stroke="#d2a15b" strokeWidth="6" />
            </g>
          </g>
          <g id="layer-foreground-vignette" aria-label="Rèm nhung và đèn dầu">
            <path d="M0 0H230V1200H0ZM3200 0H2970V1200H3200Z" fill="#260b13" opacity="0.5" />
            <ellipse cx="1600" cy="420" rx="460" ry="360" fill="#fbbf24" opacity="0.08" filter="url(#filter-lantern-bloom)" />
          </g>
        </svg>
      )}

      {/* 13. bg-phong-rang-sang: Rạng sáng 7/2/1930 — Bế mạc Hội nghị hợp nhất */}
      {bgId === "bg-phong-rang-sang" && (
        <svg viewBox="0 0 3200 1200" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="dawnSky13" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#181126" />
              <stop offset="35%" stopColor="#401e3d" />
              <stop offset="70%" stopColor="#963311" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="dawnShaft13" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.38" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </linearGradient>
                    <SharedBackgroundDefs />
          </defs>
          <g id="layer-sky-vista" transform="scale(1.6666667 1.1111111)">


          {/* Violet-Rose Dawn Room Walls */}
          <rect width="1920" height="1080" fill="#20131d" />

          {/* === RIGHT WING: SAFE ZONE (x: 1240 - 1880, y: 120 - 680) === */}
          {/* Majestic Arched French Window overlooking Kowloon Dawn */}
          <g transform="translate(1260, 80)">
            {/* Arched window opening to dawn sky */}
            <path d="M0 620 L0 180 Q280 20 560 180 L560 620 Z" fill="url(#dawnSky13)" stroke="#2a160e" strokeWidth="24" />
            <line x1="280" y1="100" x2="280" y2="620" stroke="#2a160e" strokeWidth="14" />
            <line x1="0" y1="360" x2="560" y2="360" stroke="#2a160e" strokeWidth="14" />

            {/* Misty Traditional Kowloon Rooftops on horizon */}
            <path
              d="M0 480 Q140 430 280 450 Q420 410 560 440 L560 620 L0 620 Z"
              fill="#180e22"
              opacity="0.8"
            />

            {/* Flight of Springtime Swallows (Đàn én xuân) Soaring into Dawn Sky */}
            <g opacity="0.9">
              <path d="M120 220 Q135 200 150 220 Q165 200 180 220" stroke="#fef08a" strokeWidth="3" fill="none" />
              <path d="M240 180 Q252 165 265 180 Q278 165 290 180" stroke="#fef08a" strokeWidth="2.5" fill="none" />
              <path d="M380 210 Q395 190 410 210 Q425 190 440 210" stroke="#fef08a" strokeWidth="3" fill="none" />
            </g>

            {/* Parted Crimson Velvet Window Drapes */}
            <path d="M-20 0 Q60 260 -20 620" stroke="#881337" strokeWidth="48" fill="none" />
            <path d="M580 0 Q500 260 580 620" stroke="#881337" strokeWidth="48" fill="none" />
          </g>

          {/* Diagonal Volumetric Dawn Sunbeams Streaming Across Room */}
          <polygon points="1260,80 1820,80 1520,780 420,780" fill="url(#dawnShaft13)" className="vn-light-shaft" />

          {/* === LEFT WING: SAFE ZONE (x: 80 - 640, y: 150 - 680) === */}
          {/* Historic Mahogany Desk with Finalized Party Founding Document (Grounded at y=780) */}
          <g transform="translate(80, 380)">
            {/* Sturdy Carved Mahogany Desk Legs reaching floor at y=780 */}
            <rect x="25" y="240" width="45" height="160" fill="#24140e" stroke="#3b1f15" strokeWidth="4" />
            <rect x="510" y="240" width="45" height="160" fill="#24140e" stroke="#3b1f15" strokeWidth="4" />
            <polygon points="0,50 580,50 580,240 0,240" fill="#362117" stroke="#4a2c1e" strokeWidth="5" />
            <line x1="0" y1="50" x2="580" y2="50" stroke="#633c2a" strokeWidth="7" />

            {/* Finalized Founding Document of the Communist Party of Vietnam */}
            <g transform="translate(100, 20)">
              <rect width="360" height="210" fill="#fef3c7" rx="5" stroke="#ca8a04" strokeWidth="3.5" />
              <text x="180" y="44" fill="#991b1b" fontSize="23" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                ĐẢNG CỘNG SẢN VIỆT NAM
              </text>
              <text x="180" y="74" fill="#ca8a04" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                Ngày 7 tháng 2 năm 1930
              </text>
              <text x="180" y="102" fill="#334155" fontSize="13" fontFamily="serif" textAnchor="middle">
                Chánh cương, Sách lược & Điều lệ vắn tắt
              </text>
              <line x1="35" y1="120" x2="325" y2="120" stroke="#94a3b8" strokeWidth="2" />
              <line x1="35" y1="140" x2="300" y2="140" stroke="#94a3b8" strokeWidth="2" />
              <line x1="35" y1="160" x2="280" y2="160" stroke="#94a3b8" strokeWidth="2" />

              {/* Authentic Historical Signature & Manuscript Notation (Nguyễn Ái Quốc, 1930) */}
              <g transform="translate(220, 160)">
                <text x="35" y="14" fill="#0f172a" fontSize="13" fontFamily="cursive, 'Brush Script MT', serif" fontStyle="italic" fontWeight="bold">
                  Nguyễn Ái Quốc
                </text>
                <path d="M15 22 Q40 17 75 22 Q95 24 110 19" stroke="#0f172a" strokeWidth="1.5" fill="none" />
                <rect x="0" y="2" width="22" height="22" fill="#991b1b" opacity="0.18" rx="2" />
                <text x="11" y="17" fill="#991b1b" fontSize="10" fontFamily="serif" fontWeight="bold" textAnchor="middle">
                  NAQ
                </text>
              </g>

              {/* Uncapped Ebonite Black & Gold Fountain Pen */}
              <line x1="310" y1="90" x2="390" y2="170" stroke="#0f172a" strokeWidth="10" strokeLinecap="round" />
              <polygon points="305,85 313,93 301,97" fill="#ca8a04" />
            </g>

            {/* Antique Brass Desk Clock Reading 5:30 AM */}
            <g transform="translate(18, 40)">
              <rect width="68" height="64" rx="6" fill="#ca8a04" stroke="#78350f" strokeWidth="3" />
              <circle cx="34" cy="32" r="23" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
              {/* Hands: 5:30 AM */}
              <line x1="34" y1="32" x2="34" y2="48" stroke="#0f172a" strokeWidth="3" />
              <line x1="34" y1="32" x2="47" y2="40" stroke="#0f172a" strokeWidth="3.5" />
            </g>

            {/* Cooled Porcelain Teacup & Spent Matchsticks */}
            <g transform="translate(480, 80)">
              <ellipse cx="25" cy="25" rx="22" ry="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <ellipse cx="25" cy="23" rx="16" ry="9" fill="#78350f" opacity="0.6" />
              <line x1="55" y1="32" x2="85" y2="22" stroke="#ca8a04" strokeWidth="2.5" />
              <circle cx="85" cy="22" r="2.5" fill="#0f172a" />
            </g>
          </g>

          {/* Wooden floorboards extending into background */}
          <polygon points="0,780 1920,780 1920,1080 0,1080" fill="#22150f" />
          <line x1="0" y1="780" x2="1920" y2="780" stroke="#452a1d" strokeWidth="8" />
          </g>
          <g id="layer-architecture-mid" aria-label="Bình minh trên bán đảo Cửu Long">
            <path d="M0 180H3200V820H0Z" fill="#5b3048" opacity="0.22" />
            <path d="M2200 600Q2400 360 2600 610T3200 570V820H2200Z" fill="#493044" opacity="0.7" />
            <path d="M2200 720Q2500 680 2800 720T3200 700" stroke="#f8b96d" strokeWidth="12" fill="none" opacity="0.75" />
            <path d="M2460 820V300M2780 820V350M3060 820V330" stroke="#6b422c" strokeWidth="18" />
            <path d="M2380 320L3200 180V260L2440 410Z" fill="#f6c978" opacity="0.13" />
          </g>
          <g id="layer-historical-props-lod" aria-label="Cương lĩnh đầu tiên">
            <g transform="translate(900 690)" filter="url(#filter-drop-shadow)">
              <rect width="1150" height="290" rx="15" fill="url(#pattern-woodgrain)" stroke="#c49858" strokeWidth="10" />
              <rect x="100" y="45" width="950" height="185" fill="url(#pattern-parchment)" stroke="#70482b" strokeWidth="7" />
              <text x="575" y="92" textAnchor="middle" fill="#7f1d1d" fontSize="32" fontWeight="bold" fontFamily="serif">ĐẢNG CỘNG SẢN VIỆT NAM</text>
              <text x="575" y="135" textAnchor="middle" fill="#3d2b1f" fontSize="24" fontFamily="serif">CHÁNH CƯƠNG VẮN TẮT &amp; SÁCH LƯỢC VẮN TẮT</text>
              <text x="575" y="178" textAnchor="middle" fill="#3d2b1f" fontSize="20" fontFamily="serif">Làm tư sản dân quyền cách mạng và thổ địa cách mạng</text>
            </g>
            <g transform="translate(360 570)">
              <circle cx="70" cy="70" r="64" fill="#d0a65e" stroke="#70482b" strokeWidth="8" />
              <circle cx="70" cy="70" r="48" fill="#f4dfaa" />
              <path d="M70 70V40M70 70L98 85" stroke="#4a3022" strokeWidth="7" />
              <text x="70" y="155" textAnchor="middle" fill="#f2d394" fontSize="21" fontFamily="serif">05:30</text>
            </g>
          </g>
          <g id="layer-foreground-vignette" aria-label="Tia nắng bình minh">
            <path d="M0 0H170V1200H0ZM3200 0H3030V1200H3200Z" fill="#291126" opacity="0.3" />
            <path d="M2300 0L3200 0L3200 100L2400 450Z" fill="#ffd58d" opacity="0.14" />
            <path d="M2550 260Q2570 230 2590 260Q2610 230 2630 260M2820 180Q2840 150 2860 180Q2880 150 2900 180" stroke="#40253d" strokeWidth="7" fill="none" />
          </g>
        </svg>
      )}

      {/* 14. bg-boong-tau-binh-minh: Lời kêu gọi thành lập Đảng & Mùa xuân 1930 */}
      {bgId === "bg-boong-tau-binh-minh" && (
        <svg viewBox="0 0 3200 1200" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
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
              <stop offset="35%" stopColor="#fef08a" stopOpacity="0.88" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
            </radialGradient>
                    <SharedBackgroundDefs />
          </defs>
          <g id="layer-sky-vista" transform="scale(1.6666667 1.1111111)">


          {/* Sunrise Sky */}
          <rect width="1920" height="660" fill="url(#sunriseSky14)" />

          {/* Vast East Sea Reflecting Sunrise */}
          <rect y="640" width="1920" height="200" fill="url(#sunriseSea14)" />

          {/* === RIGHT WING: SAFE ZONE (x: 1240 - 1880, y: 140 - 680) === */}
          {/* Glorious Crimson & Gold Rising Sun positioned on Right Wing (Unobstructed by Character Sprite) */}
          <g transform="translate(1540, 320)">
            {/* 16 Golden Sunrays Radiating into Morning Sky */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 15) * Math.PI;
              const x = -Math.cos(angle) * 600;
              const y = -Math.sin(angle) * 450;
              return <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="#fef08a" strokeWidth="12" opacity="0.3" />;
            })}
            {/* Sun Corona Aura & Solar Disc */}
            <circle cx="0" cy="0" r="140" fill="url(#sunAura14)" />
            <circle cx="0" cy="0" r="75" fill="#fef08a" />
            <ellipse cx="0" cy="15" rx="200" ry="20" fill="#f59e0b" opacity="0.8" />
          </g>

          {/* Flight of Seabirds Wheeling Overhead Leading Ship Home (Đàn hải âu tung cánh) */}
          <g opacity="0.9">
            <path d="M1280 200 Q1295 180 1310 200 Q1325 180 1340 200" stroke="#450a0a" strokeWidth="3" fill="none" />
            <path d="M1400 160 Q1412 145 1425 160 Q1438 145 1450 160" stroke="#450a0a" strokeWidth="2.5" fill="none" />
            <path d="M1520 220 Q1535 200 1550 220 Q1565 200 1580 220" stroke="#450a0a" strokeWidth="3" fill="none" />
            <path d="M1660 170 Q1675 150 1690 170 Q1705 150 1720 170" stroke="#450a0a" strokeWidth="3" fill="none" />
          </g>

          {/* Golden Sun Glitter Trail on Waters (Dải lụa vàng lấp lánh) */}
          <g className="vn-wave-swell" opacity="0.88">
            <line x1="1440" y1="645" x2="1640" y2="645" stroke="#fef08a" strokeWidth="4" />
            <line x1="1360" y1="660" x2="1720" y2="660" stroke="#fef08a" strokeWidth="5" />
            <line x1="1260" y1="680" x2="1820" y2="680" stroke="#fde047" strokeWidth="5" />
            <line x1="1140" y1="710" x2="1900" y2="710" stroke="#f59e0b" strokeWidth="6" />
          </g>

          {/* Lifebuoy with Red and White Quadrant Stripes Mounted Firmly on Right Railing */}
          <g transform="translate(1660, 590)">
            <ellipse cx="65" cy="65" rx="55" ry="55" fill="#dc2626" stroke="#f8fafc" strokeWidth="6" />
            <ellipse cx="65" cy="65" rx="28" ry="28" fill="#301f16" />
            <line x1="10" y1="65" x2="120" y2="65" stroke="#f8fafc" strokeWidth="8" />
            <line x1="65" y1="10" x2="65" y2="120" stroke="#f8fafc" strokeWidth="8" />
          </g>

          {/* === LEFT WING: SAFE ZONE (x: 80 - 640, y: 160 - 680) === */}
          {/* Raised Forecastle Bow Deck Structure Grounded to Main Deck at y=720 */}
          <polygon points="0,490 580,460 620,740 0,740" fill="#241812" stroke="#452a1d" strokeWidth="6" />
          <line x1="0" y1="490" x2="580" y2="460" stroke="#ca8a04" strokeWidth="8" />

          {/* Forecastle Ship Bow Deck cutting through ocean waves */}
          <g transform="translate(80, 260)">
            {/* Polished Ship Brass Bell Stamped "1930" */}
            <g transform="translate(120, 20)">
              {/* Brass stanchion post extending to forecastle deck at y=490 */}
              <line x1="30" y1="0" x2="30" y2="210" stroke="#ca8a04" strokeWidth="8" />
              <path d="M10 80 Q15 45 30 40 Q45 45 50 80 Z" fill="#ca8a04" stroke="#854d0e" strokeWidth="3" />
              <ellipse cx="30" cy="80" rx="20" ry="7" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
              <line x1="30" y1="80" x2="30" y2="105" stroke="#78350f" strokeWidth="4" />
              <circle cx="30" cy="107" r="5" fill="#ca8a04" />
              <text x="30" y="68" fill="#78350f" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                1930
              </text>
            </g>

            {/* Heavy Steam Anchor Windlass & Anchor Chain */}
            <g transform="translate(260, 180)">
              <rect width="220" height="95" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="4" />
              <circle cx="65" cy="48" r="34" fill="#334155" stroke="#0f172a" strokeWidth="6" />
              <circle cx="155" cy="48" r="34" fill="#334155" stroke="#0f172a" strokeWidth="6" />
              {/* Heavy iron chain links */}
              {[25, 55, 85, 115, 145, 175, 205].map((cx, idx) => (
                <ellipse key={idx} cx={cx} cy={48} rx="13" ry="8" fill="none" stroke="#64748b" strokeWidth="5.5" />
              ))}
            </g>
          </g>

          {/* Plumes of Foaming White Bow Waves (Bọt sóng mũi tàu trắng xoá) */}
          <g opacity="0.8">
            <path d="M120 720 Q480 680 960 710" stroke="#ffffff" strokeWidth="6" strokeDasharray="16,8" fill="none" />
            <path d="M1800 720 Q1440 680 960 710" stroke="#ffffff" strokeWidth="6" strokeDasharray="16,8" fill="none" />
          </g>

          {/* Ship Bow Deck Handrails & Planking extending below dialog box */}
          <polygon points="0,750 1920,720 1920,1080 0,1080" fill="#301f16" />
          <line x1="0" y1="720" x2="1920" y2="690" stroke="#ca8a04" strokeWidth="14" />
          <line x1="0" y1="722" x2="1920" y2="692" stroke="#fef08a" strokeWidth="2.5" opacity="0.8" />
          <line x1="0" y1="755" x2="1920" y2="725" stroke="#78350f" strokeWidth="7" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={i * 102} y1={720 - i * 1.5} x2={i * 102} y2={785 - i * 1.5} stroke="#52361b" strokeWidth="7" />
          ))}
          </g>
          <g id="layer-architecture-mid" aria-label="Boong tàu hướng về Tổ quốc">
            <path d="M0 420Q600 350 1200 430T2400 410T3200 430V820H0Z" fill="#31506a" opacity="0.28" />
            <path d="M0 820Q600 760 1200 820T2400 800T3200 820V1200H0Z" fill="url(#pattern-woodgrain)" opacity="0.6" />
            <path d="M300 760L1600 620L2900 760" stroke="#c9954d" strokeWidth="16" fill="none" />
            <path d="M600 760L620 1080M1000 720L1020 1080M1400 690L1420 1080M1800 690L1820 1080M2200 720L2220 1080M2600 760L2620 1080" stroke="#6a421f" strokeWidth="8" />
            <path d="M2400 430Q2700 250 3200 400" stroke="#18384b" strokeWidth="80" fill="none" opacity="0.8" />
          </g>
          <g id="layer-historical-props-lod" aria-label="Chuông tàu và lời kêu gọi">
            <g transform="translate(350 520)">
              <line x1="80" y1="0" x2="80" y2="260" stroke="#bd8d4a" strokeWidth="12" />
              <path d="M35 120Q45 55 80 45Q115 55 125 120Z" fill="#ca984e" stroke="#70482b" strokeWidth="7" />
              <ellipse cx="80" cy="120" rx="48" ry="13" fill="#f4d47e" stroke="#bd8d4a" strokeWidth="6" />
              <text x="80" y="109" textAnchor="middle" fill="#70482b" fontSize="22" fontWeight="bold">1930</text>
            </g>
            <g transform="translate(1250 470)" filter="url(#filter-drop-shadow)">
              <rect width="680" height="270" fill="#9b1d2b" stroke="#e8c879" strokeWidth="9" />
              <text x="340" y="78" textAnchor="middle" fill="#ffe5a1" fontSize="30" fontWeight="bold" fontFamily="serif">LỜI KÊU GỌI</text>
              <text x="340" y="125" textAnchor="middle" fill="#ffe5a1" fontSize="25" fontFamily="serif">THÀNH LẬP ĐẢNG</text>
              <text x="340" y="180" textAnchor="middle" fill="#fff0bd" fontSize="20" fontFamily="serif">MÙA XUÂN 1930</text>
            </g>
            <path d="M1800 790Q2150 730 2500 790T3200 770" stroke="#f8d574" strokeWidth="14" fill="none" opacity="0.65" />
          </g>
          <g id="layer-foreground-vignette" aria-label="Ánh bình minh và hải âu">
            <path d="M0 0H170V1200H0ZM3200 0H3030V1200H3200Z" fill="#24102a" opacity="0.3" />
            <path d="M1900 0L3200 0L3200 180L2050 500Z" fill="#fff0a8" opacity="0.12" />
            <path d="M2200 220Q2220 190 2240 220Q2260 190 2280 220M2500 160Q2520 130 2540 160Q2560 130 2580 160M2800 280Q2820 250 2840 280Q2860 250 2880 280" stroke="#54203c" strokeWidth="7" fill="none" />
          </g>
        </svg>
      )}
    </>
  );
};
