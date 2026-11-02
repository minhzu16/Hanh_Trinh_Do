import React from "react";

export const BackgroundKy2: React.FC<{ bgId: string }> = ({ bgId }) => {
  return (
    <>
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
    </>
  );
};
