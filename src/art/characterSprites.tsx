import React from "react";

interface CharacterSpriteProps {
  characterId: string;
  chapterId?: string;
  sceneId?: string;
  isSpeaking?: boolean;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  characterId,
  chapterId = "k0",
  sceneId = "",
  isSpeaking = true
}) => {
  // If narrator, don't show figure
  if (characterId === "narrator") return null;

  // Determine variant for Lan (factory worker in k1-c4 onwards)
  const isLanWorker = characterId === "lan" && (sceneId === "k1-c4" || sceneId === "k1-c5" || chapterId === "k2");
  // Determine variant for Minh (older in k1, k2)
  const isMinhOlder = characterId === "minh" && (chapterId === "k1" || chapterId === "k2");

  return (
    <div className={`relative transition-all duration-500 transform ${
      isSpeaking ? "scale-100 opacity-100 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]" : "scale-95 opacity-80"
    }`}>
      {/* 1. LÃNH TỤ NGUYỄN ÁI QUỐC */}
      {characterId === "nguyen-ai-quoc" && (
        <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2c2420" />
                <stop offset="100%" stopColor="#151210" />
              </linearGradient>
              <linearGradient id="skinGradNAQ" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8dfc2" />
                <stop offset="100%" stopColor="#e2be9b" />
              </linearGradient>
              <linearGradient id="tieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9e1b1b" />
                <stop offset="100%" stopColor="#5a0e0e" />
              </linearGradient>
            </defs>

            {/* Aura glow */}
            <circle cx="100" cy="90" r="75" fill="#c8a24a" opacity="0.15" />

            {/* Body / Suit */}
            <path d="M40 300 L55 190 L75 160 L125 160 L145 190 L160 300 Z" fill="url(#suitGrad)" />
            {/* White Shirt Collar */}
            <polygon points="85,155 100,195 115,155 100,165" fill="#fdfaf4" />
            {/* Red Tie */}
            <polygon points="96,165 104,165 107,220 100,235 93,220" fill="url(#tieGrad)" />
            {/* Lapels */}
            <polygon points="55,190 75,160 95,220 70,250" fill="#382e29" />
            <polygon points="145,190 125,160 105,220 130,250" fill="#382e29" />

            {/* Neck */}
            <rect x="88" y="130" width="24" height="30" fill="url(#skinGradNAQ)" rx="4" />

            {/* Head */}
            <ellipse cx="100" cy="95" rx="36" ry="44" fill="url(#skinGradNAQ)" />
            {/* Hair - neat parting */}
            <path d="M62 85 C62 48, 138 48, 138 85 C138 65, 120 52, 100 52 C78 52, 65 68, 62 85 Z" fill="#1a1412" />
            <path d="M62 85 C60 105, 68 115, 68 115 C64 95, 68 85, 75 75 Z" fill="#1a1412" />
            <path d="M138 85 C140 105, 132 115, 132 115 C136 95, 132 85, 125 75 Z" fill="#1a1412" />

            {/* Eyes - bright, focused, visionary */}
            <ellipse cx="85" cy="92" rx="6" ry="4" fill="#ffffff" />
            <circle cx="86" cy="92" r="3" fill="#1c1613" />
            <circle cx="87" cy="91" r="1" fill="#ffffff" />
            {/* Eyebrows */}
            <path d="M78 85 Q87 81 94 85" stroke="#251a14" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            <ellipse cx="115" cy="92" rx="6" ry="4" fill="#ffffff" />
            <circle cx="114" cy="92" r="3" fill="#1c1613" />
            <circle cx="115" cy="91" r="1" fill="#ffffff" />
            <path d="M106 85 Q113 81 122 85" stroke="#251a14" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Nose & Mouth - refined, determined */}
            <path d="M100 90 L98 105 L103 106" stroke="#c49a72" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M92 118 Q100 122 108 118" stroke="#a06848" strokeWidth="2.2" fill="none" strokeLinecap="round" />

            {/* Golden Star Lapel Pin */}
            <polygon points="68,205 70,211 76,211 71,215 73,221 68,217 63,221 65,215 60,211 66,211" fill="#c8a24a" />
          </svg>
        </div>
      )}

      {/* 2. MINH - NHÂN VẬT CHÍNH */}
      {characterId === "minh" && (
        <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="minhSkin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5d6b5" />
                <stop offset="100%" stopColor="#dbaa80" />
              </linearGradient>
            </defs>

            {/* Body */}
            {isMinhOlder ? (
              // Minh Kỳ 1-2: Vest gile thanh niên tri thức cách mạng
              <g>
                <path d="M45 300 L58 190 L80 165 L120 165 L142 190 L155 300 Z" fill="#3a2f29" />
                <polygon points="85,160 100,205 115,160" fill="#f5ede0" />
                <polygon points="97,175 103,175 105,230 100,240 95,230" fill="#7a221b" />
              </g>
            ) : (
              // Minh Kỳ 0: Áo nâu sồng mộc mạc người phụ bếp / thanh niên
              <g>
                <path d="M45 300 L55 185 L78 160 L122 160 L145 185 L155 300 Z" fill="#5c4436" />
                <path d="M80 160 Q100 180 120 160" fill="#e8dacb" />
                <path d="M96 170 L96 300" stroke="#453328" strokeWidth="3" />
              </g>
            )}

            {/* Neck */}
            <rect x="88" y="132" width="24" height="30" fill="url(#minhSkin)" rx="3" />

            {/* Head */}
            <ellipse cx="100" cy="95" rx="35" ry="42" fill="url(#minhSkin)" />
            {/* Hair */}
            <path d="M65 85 C62 50, 138 45, 135 85 C130 60, 115 50, 98 52 C80 54, 70 65, 65 85 Z" fill="#241a15" />
            <path d="M68 80 Q90 62 105 70" stroke="#241a15" strokeWidth="5" fill="none" />

            {/* Eyes - Youthful, determined */}
            <ellipse cx="84" cy="94" rx="5" ry="3.5" fill="#ffffff" />
            <circle cx="85" cy="94" r="2.8" fill="#1c1613" />
            <circle cx="86" cy="93" r="1" fill="#ffffff" />
            <path d="M78 88 Q85 84 92 87" stroke="#241a15" strokeWidth="2.2" fill="none" />

            <ellipse cx="116" cy="94" rx="5" ry="3.5" fill="#ffffff" />
            <circle cx="115" cy="94" r="2.8" fill="#1c1613" />
            <circle cx="116" cy="93" r="1" fill="#ffffff" />
            <path d="M108 87 Q115 84 122 88" stroke="#241a15" strokeWidth="2.2" fill="none" />

            {/* Nose & Mouth */}
            <path d="M100 93 L97 106 L102 107" stroke="#b88d65" strokeWidth="2" fill="none" />
            <path d="M93 118 Q100 121 107 118" stroke="#8c4e34" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )}

      {/* 3. LAN - NỮ SINH HÀ NỘI / CÔNG NHÂN */}
      {characterId === "lan" && (
        <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="lanSkin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fdf0e2" />
                <stop offset="100%" stopColor="#edd0b7" />
              </linearGradient>
            </defs>

            {/* Body */}
            {isLanWorker ? (
              // Áo xanh công nhân dệt Hải Phòng (phong trào vô sản hoá)
              <g>
                <path d="M48 300 L60 190 L82 165 L118 165 L140 190 L152 300 Z" fill="#2d4a5e" />
                <path d="M82 165 L100 185 L118 165" fill="#ffffff" />
                {/* Khăn quàng cổ bảo hộ lao động */}
                <path d="M80 165 Q100 195 120 165" stroke="#b23b3b" strokeWidth="4" fill="none" />
              </g>
            ) : (
              // Áo dài trắng truyền thống nữ sinh Hà Nội
              <g>
                <path d="M50 300 L62 185 L84 160 L116 160 L138 185 L150 300 Z" fill="#f8f4ea" />
                <path d="M84 160 Q100 175 116 160" stroke="#c8a24a" strokeWidth="1.5" fill="none" />
                {/* Dải khuy áo chéo */}
                <path d="M100 168 Q115 180 120 210" stroke="#baa68c" strokeWidth="1.5" fill="none" strokeDasharray="2,4" />
              </g>
            )}

            {/* Neck */}
            <rect x="90" y="132" width="20" height="30" fill="url(#lanSkin)" rx="3" />

            {/* Head */}
            <ellipse cx="100" cy="94" rx="32" ry="40" fill="url(#lanSkin)" />
            {/* Hair - Vietnamese traditional bun / flowing black hair */}
            <path d="M65 85 C62 45, 138 45, 135 85 C142 120, 140 160, 138 180 C132 150, 135 105, 130 90 C118 55, 82 55, 70 90 C65 105, 68 150, 62 180 C60 160, 58 120, 65 85 Z" fill="#181311" />
            {/* Hair band / Kẹp tóc */}
            <path d="M72 70 Q100 60 128 70" stroke="#9e1b1b" strokeWidth="3" fill="none" />

            {/* Eyes - Gentle, intelligent */}
            <ellipse cx="86" cy="93" rx="5" ry="3.5" fill="#ffffff" />
            <circle cx="87" cy="93" r="2.6" fill="#1c1613" />
            <circle cx="88" cy="92" r="1" fill="#ffffff" />
            <path d="M80 87 Q87 83 94 87" stroke="#241a15" strokeWidth="2" fill="none" />

            <ellipse cx="114" cy="93" rx="5" ry="3.5" fill="#ffffff" />
            <circle cx="113" cy="93" r="2.6" fill="#1c1613" />
            <circle cx="114" cy="92" r="1" fill="#ffffff" />
            <path d="M106 87 Q113 83 120 87" stroke="#241a15" strokeWidth="2" fill="none" />

            {/* Nose & Mouth - Graceful */}
            <path d="M100 93 L98 104 L102 105" stroke="#cfa380" strokeWidth="1.8" fill="none" />
            <path d="M94 116 Q100 120 106 116" stroke="#b25353" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {/* 4. BÁC TƯ - THỢ MÁY NAM KỲ LỚN TUỔI */}
      {characterId === "bac-tu" && (
        <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="tuSkin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#eecaa5" />
                <stop offset="100%" stopColor="#c5966a" />
              </linearGradient>
            </defs>

            {/* Body - Áo thợ máy dính dầu mỡ phong trần */}
            <path d="M42 300 L54 185 L76 160 L124 160 L146 185 L158 300 Z" fill="#3c4347" />
            <path d="M78 160 L100 195 L122 160" fill="#756254" />
            {/* Vết dầu máy mờ */}
            <circle cx="75" cy="225" r="9" fill="#1f2326" opacity="0.6" />
            <circle cx="128" cy="240" r="12" fill="#1f2326" opacity="0.5" />

            {/* Neck */}
            <rect x="86" y="130" width="28" height="32" fill="url(#tuSkin)" rx="4" />

            {/* Head - Vuông vức, phúc hậu */}
            <ellipse cx="100" cy="95" rx="38" ry="43" fill="url(#tuSkin)" />
            {/* Hair - Muối tiêu (55 tuổi) */}
            <path d="M60 85 C58 50, 142 50, 140 85 C138 65, 125 55, 100 55 C75 55, 62 65, 60 85 Z" fill="#4a4847" />
            {/* Các sợi bạc */}
            <path d="M68 70 Q100 58 132 70" stroke="#d5d5d5" strokeWidth="1.5" fill="none" />
            <path d="M62 82 Q75 75 88 80" stroke="#d5d5d5" strokeWidth="1.5" fill="none" />

            {/* Eyes - Warm, experienced crinkles */}
            <ellipse cx="83" cy="94" rx="5" ry="3" fill="#ffffff" />
            <circle cx="84" cy="94" r="2.5" fill="#1c1613" />
            {/* Nếp nhăn đuôi mắt */}
            <path d="M74 92 L70 91 M74 95 L69 96" stroke="#8a5c36" strokeWidth="1.5" />
            <path d="M76 86 Q84 83 91 86" stroke="#4a4847" strokeWidth="2.5" fill="none" />

            <ellipse cx="117" cy="94" rx="5" ry="3" fill="#ffffff" />
            <circle cx="116" cy="94" r="2.5" fill="#1c1613" />
            <path d="M125 92 L129 91 M125 95 L130 96" stroke="#8a5c36" strokeWidth="1.5" />
            <path d="M109 86 Q116 83 124 86" stroke="#4a4847" strokeWidth="2.5" fill="none" />

            {/* Mũi & Ria mép phong trần */}
            <path d="M100 93 L96 107 L104 107" stroke="#9e6e45" strokeWidth="2.2" fill="none" />
            {/* Ria mép */}
            <path d="M84 116 Q100 114 116 116 Q100 122 84 116" fill="#383635" />
            <path d="M92 124 Q100 126 108 124" stroke="#7a4224" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )}

      {/* 5. BẠN THỢ ẢNH & THỢ VIỆT KIỀU */}
      {(characterId === "ban-tho-anh" || characterId === "tho-viet-kieu") && (
        <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="workerSkin" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f2d3b3" />
                <stop offset="100%" stopColor="#cca27a" />
              </linearGradient>
            </defs>

            {/* Body */}
            <path d="M45 300 L58 190 L80 165 L120 165 L142 190 L155 300 Z" fill="#322d28" />
            <polygon points="85,160 100,200 115,160" fill="#e8dacb" />

            {/* Neck */}
            <rect x="88" y="132" width="24" height="30" fill="url(#workerSkin)" rx="3" />

            {/* Head */}
            <ellipse cx="100" cy="95" rx="35" ry="42" fill="url(#workerSkin)" />

            {/* French Beret (Mũ nồi thợ kiều) */}
            <path d="M58 80 C55 52, 145 45, 142 75 C142 85, 130 90, 100 88 C70 88, 58 85, 58 80 Z" fill="#1f2a36" />
            <circle cx="100" cy="50" r="3" fill="#1f2a36" />

            {/* Eyes */}
            <ellipse cx="85" cy="95" rx="5" ry="3.5" fill="#ffffff" />
            <circle cx="86" cy="95" r="2.5" fill="#1c1613" />
            <ellipse cx="115" cy="95" rx="5" ry="3.5" fill="#ffffff" />
            <circle cx="114" cy="95" r="2.5" fill="#1c1613" />

            {/* Nose & Mouth */}
            <path d="M100 95 L98 106 L102 107" stroke="#b0855f" strokeWidth="2" fill="none" />
            <path d="M93 118 Q100 121 107 118" stroke="#874a2f" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
};

