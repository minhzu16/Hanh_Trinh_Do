import React from "react";

interface SceneBackgroundProps {
  bgId: string;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ bgId }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* 1. bg-boong-tau-dem: Trên boong tàu, năm 1911 */}
      {bgId === "bg-boong-tau-dem" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="skyNight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#080d1a" />
              <stop offset="50%" stopColor="#0f192b" />
              <stop offset="100%" stopColor="#1a273d" />
            </linearGradient>
            <linearGradient id="seaNight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0b1726" />
              <stop offset="100%" stopColor="#040912" />
            </linearGradient>
            <linearGradient id="deckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#30231c" />
              <stop offset="100%" stopColor="#18110d" />
            </linearGradient>
          </defs>
          <rect width="1920" height="650" fill="url(#skyNight)" />
          {/* Stars */}
          <circle cx="200" cy="150" r="1.5" fill="#ffffff" opacity="0.8" />
          <circle cx="450" cy="90" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="850" cy="120" r="1" fill="#ffffff" opacity="0.6" />
          <circle cx="1200" cy="80" r="2.5" fill="#ffffff" opacity="0.8" />
          <circle cx="1550" cy="140" r="1.5" fill="#ffffff" opacity="0.7" />
          <circle cx="1780" cy="100" r="2" fill="#ffffff" opacity="0.9" />
          {/* Moon crescent */}
          <circle cx="1650" cy="120" r="35" fill="#f4ebd9" opacity="0.85" />
          <circle cx="1662" cy="112" r="30" fill="#0c1424" />
          {/* Ocean */}
          <rect y="600" width="1920" height="250" fill="url(#seaNight)" />
          {/* Ship Mast & Funnel in distance */}
          <rect x="900" y="250" width="120" height="380" fill="#151210" opacity="0.7" />
          <path d="M850 300 Q1050 200 1200 120 Q1450 60 1800 50" stroke="#221b16" strokeWidth="3" opacity="0.4" fill="none" />
          <path d="M920 250 Q1100 150 1400 100" stroke="#221b16" strokeWidth="2" opacity="0.3" fill="none" />
          {/* Ship Deck Wooden Planks */}
          <polygon points="0,750 1920,680 1920,1080 0,1080" fill="url(#deckGrad)" />
          {/* Deck Railing */}
          <line x1="0" y1="720" x2="1920" y2="650" stroke="#68503e" strokeWidth="8" />
          <line x1="0" y1="755" x2="1920" y2="685" stroke="#4a3729" strokeWidth="5" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1={i * 125} y1={720 - (i * 4.5)} x2={i * 125} y2={790 - (i * 4)} stroke="#564030" strokeWidth="6" />
          ))}
          {/* Deck lamp glow */}
          <circle cx="280" cy="620" r="160" fill="#f4c46b" opacity="0.12" />
          <circle cx="280" cy="620" r="12" fill="#ffecb3" opacity="0.9" />
        </svg>
      )}

      {/* 2. bg-phong-tro-paris: Paris, tháng 6/1919 */}
      {bgId === "bg-phong-tro-paris" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="parisSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c2138" />
              <stop offset="100%" stopColor="#5c3a4d" />
            </linearGradient>
            <linearGradient id="atticWall" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#231c18" />
              <stop offset="100%" stopColor="#352922" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#atticWall)" />
          {/* Sloped attic roof */}
          <polygon points="0,0 1200,0 600,1080 0,1080" fill="#1c1613" />
          {/* Attic Window looking out to Paris */}
          <polygon points="1250,150 1750,150 1750,750 1250,750" fill="url(#parisSky)" />
          {/* Window pane frame */}
          <rect x="1240" y="140" width="520" height="620" fill="none" stroke="#48362b" strokeWidth="20" />
          <line x1="1500" y1="140" x2="1500" y2="760" stroke="#48362b" strokeWidth="12" />
          <line x1="1240" y1="450" x2="1760" y2="450" stroke="#48362b" strokeWidth="12" />
          {/* Eiffel Tower silhouette through window */}
          <path d="M1480 650 L1495 380 L1500 320 L1505 380 L1520 650 Z" fill="#1c121f" opacity="0.65" />
          <line x1="1485" y1="520" x2="1515" y2="520" stroke="#1c121f" strokeWidth="4" opacity="0.65" />
          {/* Desk with oil lamp & printing sheets */}
          <polygon points="200,800 1800,800 1920,1080 100,1080" fill="#38291f" />
          <circle cx="850" cy="740" r="140" fill="#e0a94e" opacity="0.18" />
          <rect x="835" y="720" width="30" height="60" fill="#d99938" rx="6" opacity="0.8" />
        </svg>
      )}

      {/* 3. bg-quan-ca-phe: Tháng 7/1920: tờ báo Nhân đạo */}
      {bgId === "bg-quan-ca-phe" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="cafeWall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c1a16" />
              <stop offset="100%" stopColor="#1a0f0d" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#cafeWall)" />
          {/* Wood paneling */}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 165} y="150" width="150" height="550" fill="#3a251e" opacity="0.5" rx="4" />
          ))}
          {/* Chandelier lights */}
          <circle cx="500" cy="220" r="180" fill="#e8a846" opacity="0.15" />
          <circle cx="1400" cy="220" r="180" fill="#e8a846" opacity="0.15" />
          {/* Cafe Table */}
          <ellipse cx="960" cy="920" rx="650" ry="250" fill="#4a3124" />
          <ellipse cx="960" cy="900" rx="630" ry="230" fill="#583c2e" />
          {/* L'Humanité newspaper folded on table */}
          <polygon points="800,820 1150,790 1200,880 840,910" fill="#eae2d1" />
          <rect x="830" y="810" width="120" height="15" fill="#b02a2a" transform="rotate(-5 830 810)" />
          <line x1="830" y1="840" x2="1140" y2="815" stroke="#50453d" strokeWidth="3" />
          <line x1="835" y1="855" x2="1150" y2="830" stroke="#50453d" strokeWidth="2" />
        </svg>
      )}

      {/* 4. bg-hoi-truong-tours: Tháng 12/1920: Tua (Tours) */}
      {bgId === "bg-hoi-truong-tours" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="1920" height="1080" fill="#1d171b" />
          {/* Assembly hall archways */}
          <path d="M200 700 L200 300 Q960 100 1720 300 L1720 700 Z" fill="#2d2229" opacity="0.6" />
          {/* Red Banners of the Congress */}
          <polygon points="300,180 460,180 440,550 380,500 320,550" fill="#8e1b1b" opacity="0.8" />
          <polygon points="1460,180 1620,180 1600,550 1540,500 1480,550" fill="#8e1b1b" opacity="0.8" />
          {/* Podium */}
          <polygon points="760,520 1160,520 1250,750 670,750" fill="#3d2a20" />
          {/* Delegates seated rows */}
          <ellipse cx="960" cy="850" rx="800" ry="180" fill="#140f12" />
          <ellipse cx="960" cy="980" rx="950" ry="200" fill="#100b0e" />
        </svg>
      )}

      {/* 5. bg-ga-paris-tuyet: Ga xe lửa tuyết trắng */}
      {bgId === "bg-ga-paris-tuyet" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="snowSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a202c" />
              <stop offset="100%" stopColor="#3d4959" />
            </linearGradient>
          </defs>
          <rect width="1920" height="700" fill="url(#snowSky)" />
          {/* Railway Iron Arches */}
          <path d="M100 700 Q960 100 1820 700" stroke="#252c38" strokeWidth="24" fill="none" />
          <path d="M300 700 Q960 220 1620 700" stroke="#252c38" strokeWidth="16" fill="none" />
          {/* Steam train silhouette */}
          <rect x="750" y="480" width="420" height="240" fill="#11161d" />
          <circle cx="820" cy="560" r="28" fill="#e2a849" opacity="0.8" />
          {/* Snow floor */}
          <rect y="700" width="1920" height="380" fill="#cbd5e1" />
          <polygon points="0,700 1920,700 1920,760 0,780" fill="#94a3b8" />
          {/* Falling snow particles */}
          {Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={(i * 49) % 1920} cy={(i * 37) % 750} r={(i % 3) + 1.5} fill="#ffffff" opacity={0.6 + (i % 4) * 0.1} />
          ))}
        </svg>
      )}

      {/* 6. bg-ban-do-hanh-trinh: Từ Paris đến Quảng Châu */}
      {bgId === "bg-ban-do-hanh-trinh" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="1920" height="1080" fill="#241a15" />
          {/* Vintage Map Grid Lines */}
          <circle cx="960" cy="540" r="420" stroke="#523c2c" strokeWidth="2" strokeDasharray="6,6" fill="none" opacity="0.4" />
          <circle cx="960" cy="540" r="280" stroke="#523c2c" strokeWidth="2" strokeDasharray="6,6" fill="none" opacity="0.3" />
          <line x1="200" y1="540" x2="1720" y2="540" stroke="#523c2c" strokeWidth="1.5" opacity="0.3" />
          <line x1="960" y1="100" x2="960" y2="980" stroke="#523c2c" strokeWidth="1.5" opacity="0.3" />
          {/* Eurasia Outline Mock */}
          <path d="M400 450 Q550 350 750 380 Q900 320 1150 400 Q1450 480 1600 650 Q1350 780 1100 700 Q800 680 550 620 Z" fill="#3a2b22" opacity="0.7" />
          {/* Journey Line: Paris -> Moscow -> Guangzhou */}
          <path d="M480 430 Q780 320 920 340 Q1180 450 1380 620" stroke="#c8a24a" strokeWidth="5" strokeDasharray="10,8" fill="none" />
          {/* Waypoints */}
          <circle cx="480" cy="430" r="10" fill="#9e1b1b" stroke="#f3ead7" strokeWidth="3" />
          <text x="450" y="410" fill="#f3ead7" fontSize="20" fontFamily="serif" fontWeight="bold">Paris (1923)</text>
          
          <circle cx="920" cy="340" r="10" fill="#9e1b1b" stroke="#f3ead7" strokeWidth="3" />
          <text x="880" y="315" fill="#f3ead7" fontSize="20" fontFamily="serif" fontWeight="bold">Mátxcơva (1923–1924)</text>

          <circle cx="1380" cy="620" r="12" fill="#c8a24a" stroke="#9e1b1b" strokeWidth="4" />
          <text x="1310" y="665" fill="#c8a24a" fontSize="24" fontFamily="serif" fontWeight="bold">Quảng Châu (11/1924)</text>
        </svg>
      )}

      {/* 7. bg-lop-hoc-van-minh: Lớp huấn luyện Quảng Châu 1926 */}
      {bgId === "bg-lop-hoc-van-minh" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="1920" height="1080" fill="#2d221b" />
          {/* Sunbeam through window */}
          <polygon points="1200,0 1700,0 1920,800 1350,800" fill="#f5d487" opacity="0.12" />
          {/* Wooden Window */}
          <rect x="1350" y="120" width="360" height="480" fill="#4a3628" />
          <rect x="1370" y="140" width="150" height="210" fill="#755a45" />
          <rect x="1540" y="140" width="150" height="210" fill="#755a45" />
          {/* Blackboard */}
          <rect x="420" y="160" width="820" height="420" fill="#1f2824" stroke="#523927" strokeWidth="18" rx="8" />
          <text x="500" y="240" fill="#f4eedf" fontSize="32" fontFamily="serif" opacity="0.9">ĐƯỜNG CÁCH MỆNH</text>
          <text x="500" y="300" fill="#e8dac5" fontSize="22" fontFamily="serif" opacity="0.8">• Công nông là gốc cách mệnh</text>
          <text x="500" y="345" fill="#e8dac5" fontSize="22" fontFamily="serif" opacity="0.8">• Trước hết phải có Đảng cách mệnh</text>
          <text x="500" y="390" fill="#e8dac5" fontSize="22" fontFamily="serif" opacity="0.8">• Cách mệnh là việc chung của cả dân chúng</text>
          {/* Student Desks */}
          <polygon points="150,820 1770,820 1850,1080 70,1080" fill="#3f2e23" />
        </svg>
      )}

      {/* 8. bg-lop-hoc-chieu: Lớp học chiều tà */}
      {bgId === "bg-lop-hoc-chieu" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="sunsetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a1e17" />
              <stop offset="60%" stopColor="#5c2e1f" />
              <stop offset="100%" stopColor="#28150f" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#sunsetGrad)" />
          {/* Golden sunset rays */}
          <polygon points="0,200 1200,400 1200,800 0,900" fill="#e28743" opacity="0.15" />
          {/* Blackboard silhouette */}
          <rect x="520" y="180" width="880" height="450" fill="#1a1c1a" stroke="#48291a" strokeWidth="16" />
          <text x="600" y="320" fill="#f0c27b" fontSize="28" fontFamily="serif" fontStyle="italic">"Đảng có vững cách mệnh mới thành công,</text>
          <text x="640" y="380" fill="#f0c27b" fontSize="28" fontFamily="serif" fontStyle="italic">cũng như người cầm lái có vững thuyền mới chạy."</text>
        </svg>
      )}

      {/* 9. bg-xuong-may: Xưởng máy dệt Hải Phòng (Vô sản hoá) */}
      {bgId === "bg-xuong-may" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="1920" height="1080" fill="#1e2226" />
          {/* Factory sawtooth roof */}
          <polygon points="0,0 450,220 450,0 900,220 900,0 1350,220 1350,0 1800,220 1800,0 1920,0 1920,500 0,500" fill="#14181c" />
          {/* Mechanical belts & looms */}
          <line x1="300" y1="200" x2="480" y2="700" stroke="#374151" strokeWidth="10" />
          <line x1="340" y1="200" x2="520" y2="700" stroke="#374151" strokeWidth="10" />
          <circle cx="320" cy="200" r="50" fill="#4b5563" />
          <circle cx="500" cy="700" r="70" fill="#4b5563" />
          {/* Industrial steam haze */}
          <ellipse cx="960" cy="650" rx="900" ry="250" fill="#334155" opacity="0.3" />
          {/* Factory floor */}
          <polygon points="0,720 1920,720 1920,1080 0,1080" fill="#111417" />
        </svg>
      )}

      {/* 10. bg-pho-kham-thien-dem: Phố Khâm Thiên đêm 1929 */}
      {bgId === "bg-pho-kham-thien-dem" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="1920" height="1080" fill="#110d10" />
          {/* Hanoi Old Quarter roofs */}
          <polygon points="0,480 320,380 500,440 750,340 950,420 1300,320 1600,430 1920,360 1920,1080 0,1080" fill="#1d161a" />
          {/* House 312 Khâm Thiên - glowing amber window */}
          <rect x="850" y="470" width="180" height="220" fill="#291e23" />
          <rect x="890" y="510" width="100" height="90" fill="#dc7d38" opacity="0.9" />
          <line x1="940" y1="510" x2="940" y2="600" stroke="#291e23" strokeWidth="5" />
          <line x1="890" y1="555" x2="990" y2="555" stroke="#291e23" strokeWidth="5" />
          <circle cx="940" cy="555" r="160" fill="#f59e0b" opacity="0.12" />
        </svg>
      )}

      {/* 11. bg-ben-cang-hong-kong: Hồng Kông, cuối tháng 12/1929 */}
      {bgId === "bg-ben-cang-hong-kong" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="hkMist" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e2230" />
              <stop offset="60%" stopColor="#303b4d" />
              <stop offset="100%" stopColor="#171e28" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#hkMist)" />
          {/* Victoria Peak mountain silhouette */}
          <path d="M0 580 Q400 320 850 350 Q1300 240 1920 480 L1920 700 L0 700 Z" fill="#121720" opacity="0.75" />
          {/* Victoria Harbour Waters */}
          <rect y="680" width="1920" height="400" fill="#0d131a" />
          {/* Traditional Junk Boat & Steamers */}
          <polygon points="1200,690 1280,690 1300,740 1170,740" fill="#231a14" />
          <polygon points="1240,580 1285,690 1240,690" fill="#884227" opacity="0.8" />
          <polygon points="1235,610 1195,690 1235,690" fill="#6f321d" opacity="0.8" />
        </svg>
      )}

      {/* 12. bg-goc-phong-den-dau: Bản Chánh cương / Cửu Long ban đêm */}
      {bgId === "bg-goc-phong-den-dau" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="1920" height="1080" fill="#15100d" />
          {/* Warm dramatic oil-lamp lantern light centered */}
          <circle cx="960" cy="520" r="500" fill="#ea8d35" opacity="0.14" />
          <circle cx="960" cy="520" r="280" fill="#f9bc60" opacity="0.18" />
          <circle cx="960" cy="520" r="30" fill="#ffe082" opacity="0.85" />
          {/* Wooden secret round meeting table */}
          <ellipse cx="960" cy="850" rx="750" ry="240" fill="#2d1d16" stroke="#482d20" strokeWidth="8" />
          {/* Five delegate shadows around table */}
          <ellipse cx="480" cy="780" rx="90" ry="120" fill="#0d0907" opacity="0.9" />
          <ellipse cx="720" cy="720" rx="80" ry="110" fill="#0d0907" opacity="0.9" />
          <ellipse cx="960" cy="690" rx="85" ry="115" fill="#0d0907" opacity="0.9" />
          <ellipse cx="1200" cy="720" rx="80" ry="110" fill="#0d0907" opacity="0.9" />
          <ellipse cx="1440" cy="780" rx="90" ry="120" fill="#0d0907" opacity="0.9" />
        </svg>
      )}

      {/* 13. bg-phong-rang-sang: Sách lược & Cương lĩnh lúc rạng sáng */}
      {bgId === "bg-phong-rang-sang" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="dawnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22182b" />
              <stop offset="50%" stopColor="#4f2e3a" />
              <stop offset="100%" stopColor="#854c38" />
            </linearGradient>
          </defs>
          <rect width="1920" height="750" fill="url(#dawnGrad)" />
          {/* Dawn rays entering window */}
          <polygon points="600,0 1320,0 1720,1080 300,1080" fill="#fcd34d" opacity="0.16" />
          <rect y="750" width="1920" height="330" fill="#281a14" />
        </svg>
      )}

      {/* 14. bg-boong-tau-binh-minh: Trở về và Lời kêu gọi (1930) */}
      {bgId === "bg-boong-tau-binh-minh" && (
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="sunriseSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b1d3d" />
              <stop offset="40%" stopColor="#9e2a2b" />
              <stop offset="70%" stopColor="#d96b27" />
              <stop offset="100%" stopColor="#f4a261" />
            </linearGradient>
            <linearGradient id="sunriseSea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b85d19" />
              <stop offset="100%" stopColor="#26160e" />
            </linearGradient>
          </defs>
          <rect width="1920" height="650" fill="url(#sunriseSky)" />
          {/* Brilliant Red Sun Rising on Horizon */}
          <circle cx="960" cy="620" r="90" fill="#e63946" />
          <ellipse cx="960" cy="635" rx="140" ry="15" fill="#f77f00" opacity="0.8" />
          {/* Ocean reflecting red dawn */}
          <rect y="640" width="1920" height="180" fill="url(#sunriseSea)" />
          {/* Ship Deck returning home */}
          <polygon points="0,820 1920,770 1920,1080 0,1080" fill="#35231a" />
          <line x1="0" y1="790" x2="1920" y2="740" stroke="#7a553e" strokeWidth="8" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1={i * 125} y1={790 - (i * 3.5)} x2={i * 125} y2={860 - (i * 3)} stroke="#5a3d2c" strokeWidth="6" />
          ))}
        </svg>
      )}

      {/* Default fallback if unknown ID */}
      {!["bg-boong-tau-dem", "bg-phong-tro-paris", "bg-quan-ca-phe", "bg-hoi-truong-tours", "bg-ga-paris-tuyet", "bg-ban-do-hanh-trinh", "bg-lop-hoc-van-minh", "bg-lop-hoc-chieu", "bg-xuong-may", "bg-pho-kham-thien-dem", "bg-ben-cang-hong-kong", "bg-goc-phong-den-dau", "bg-phong-rang-sang", "bg-boong-tau-binh-minh"].includes(bgId) && (
        <div className="w-full h-full bg-gradient-to-b from-[#2a1b14] to-[#120d0a]" />
      )}
    </div>
  );
};
