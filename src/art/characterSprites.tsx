import React from "react";

interface CharacterSpriteProps {
  characterId: string;
  chapterId?: string;
  sceneId?: string;
  isSpeaking?: boolean;
  expression?: string;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  characterId,
  chapterId = "k0",
  sceneId = "",
  isSpeaking = true,
  expression = "binh-thuong"
}) => {
  if (characterId === "narrator") return null;

  const isLanWorker = characterId === "lan" && (sceneId === "k1-c4" || sceneId === "k1-c5" || chapterId === "k2");
  const isMinhOlder = characterId === "minh" && (chapterId === "k1" || chapterId === "k2");

  return (
    <div
      className={`relative transition-all duration-500 transform vn-character-breathe ${
        isSpeaking
          ? "scale-100 opacity-100 filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
          : "scale-95 opacity-80"
      }`}
    >
      {/* 1. LÃNH TỤ NGUYỄN ÁI QUỐC - 3D CHIBI STYLIZED HEROIC */}
      {characterId === "nguyen-ai-quoc" && (
        <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="naqHead3D" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fff1e0" />
                <stop offset="60%" stopColor="#f5d5b3" />
                <stop offset="100%" stopColor="#dcab80" />
              </radialGradient>
              <radialGradient id="naqEyeIris" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#5a3d28" />
                <stop offset="60%" stopColor="#2c1a0e" />
                <stop offset="100%" stopColor="#120803" />
              </radialGradient>
              <linearGradient id="naqHair3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3d332d" />
                <stop offset="30%" stopColor="#1f1814" />
                <stop offset="100%" stopColor="#0d0907" />
              </linearGradient>
              <linearGradient id="naqSuit3D" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3a302a" />
                <stop offset="50%" stopColor="#251e1a" />
                <stop offset="100%" stopColor="#140f0c" />
              </linearGradient>
              <linearGradient id="naqTie3D" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b82424" />
                <stop offset="50%" stopColor="#e03636" />
                <stop offset="100%" stopColor="#821414" />
              </linearGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Aura hào quang cách mạng */}
            <circle cx="100" cy="95" r="82" fill="#c8a24a" opacity="0.18" />
            <circle cx="100" cy="95" r="70" fill="#f59e0b" opacity="0.10" />

            {/* Thân áo Suit 3D */}
            <path d="M42 300 L56 185 L76 155 L124 155 L144 185 L158 300 Z" fill="url(#naqSuit3D)" />
            {/* Cổ áo sơ mi trắng có bóng đổ */}
            <polygon points="84,152 100,192 116,152 100,162" fill="#ffffff" />
            <polygon points="90,154 100,186 110,154" fill="#ebe5dc" />
            {/* Cà vạt đỏ son 3D */}
            <polygon points="96,162 104,162 107,222 100,236 93,222" fill="url(#naqTie3D)" />
            {/* Ve áo vest hai bên tạo khối */}
            <polygon points="56,185 76,155 96,218 72,250" fill="#2d241f" />
            <polygon points="144,185 124,155 104,218 128,250" fill="#2d241f" />

            {/* Cổ */}
            <rect x="88" y="128" width="24" height="30" fill="url(#naqHead3D)" rx="4" />
            {/* Bóng đổ dưới cằm */}
            <ellipse cx="100" cy="138" rx="16" ry="6" fill="#c08a5c" opacity="0.45" />

            {/* Đầu Chibi 3D cân đối tỉ lệ Visual Novel */}
            <ellipse cx="100" cy="92" rx="42" ry="48" fill="url(#naqHead3D)" />

            {/* Má hồng phơn phớt tạo sức sống */}
            <ellipse cx="72" cy="106" rx="9" ry="5" fill="#f87171" opacity="0.22" />
            <ellipse cx="128" cy="106" rx="9" ry="5" fill="#f87171" opacity="0.22" />

            {/* Tóc rẽ ngôi 3D có dải sáng bóng (Halo Hair Highlight) */}
            <path d="M58 82 C56 42, 144 42, 142 82 C142 60, 124 46, 100 46 C76 46, 60 62, 58 82 Z" fill="url(#naqHair3D)" />
            <path d="M58 82 C56 102, 65 112, 65 112 C60 92, 66 82, 74 72 Z" fill="#181310" />
            <path d="M142 82 C144 102, 135 112, 135 112 C140 92, 134 82, 126 72 Z" fill="#181310" />
            {/* Dải sáng bóng tóc 3D */}
            <path d="M72 65 Q100 52 128 65" stroke="#68564c" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />

            {/* Đôi mắt Chibi 3D sáng ngời, có chiều sâu */}
            {/* Mắt trái */}
            <ellipse cx="82" cy="92" rx="8" ry="6" fill="#ffffff" />
            <ellipse cx="82" cy="92" rx="5.5" ry="5" fill="url(#naqEyeIris)" />
            <circle cx="80.5" cy="90" r="2.2" fill="#ffffff" />
            <circle cx="84" cy="93.5" r="1" fill="#ffffff" opacity="0.8" />
            <path d="M73 83 Q82 78 91 83" stroke="#2c1a0e" strokeWidth="2.8" fill="none" strokeLinecap="round" />

            {/* Mắt phải */}
            <ellipse cx="118" cy="92" rx="8" ry="6" fill="#ffffff" />
            <ellipse cx="118" cy="92" rx="5.5" ry="5" fill="url(#naqEyeIris)" />
            <circle cx="116.5" cy="90" r="2.2" fill="#ffffff" />
            <circle cx="120" cy="93.5" r="1" fill="#ffffff" opacity="0.8" />
            <path d="M109 83 Q118 78 127 83" stroke="#2c1a0e" strokeWidth="2.8" fill="none" strokeLinecap="round" />

            {/* Mũi & Nụ cười nhân hậu, kiên nghị */}
            <path d="M100 89 L98 102 L103 103" stroke="#b6835a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M92 114 Q100 120 108 114" stroke="#93462d" strokeWidth="2.4" fill="none" strokeLinecap="round" />

            {/* Huy hiệu Ngôi sao Vàng thếp trên ve áo */}
            <g transform="translate(68, 208) scale(0.9)">
              <polygon points="0,-8 2.4,-2.4 8,-2.4 3.6,1.2 5.2,7 0,3.6 -5.2,7 -3.6,1.2 -8,-2.4 -2.4,-2.4" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
            </g>
          </svg>
        </div>
      )}

      {/* 2. MINH - NHÂN VẬT CHÍNH (3D CHIBI THANH NIÊN YÊU NƯỚC) */}
      {characterId === "minh" && (
        <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="minhSkin3D" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fff5eb" />
                <stop offset="65%" stopColor="#f7d8bc" />
                <stop offset="100%" stopColor="#dcae84" />
              </radialGradient>
              <radialGradient id="minhEyeIris" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#634832" />
                <stop offset="60%" stopColor="#302014" />
                <stop offset="100%" stopColor="#140b05" />
              </radialGradient>
              <linearGradient id="minhHair3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#45342a" />
                <stop offset="40%" stopColor="#261b14" />
                <stop offset="100%" stopColor="#110b07" />
              </linearGradient>
              <linearGradient id="minhVest" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a3b32" />
                <stop offset="100%" stopColor="#251c17" />
              </linearGradient>
            </defs>

            {/* Body */}
            {isMinhOlder ? (
              // Minh Kỳ 1-2: Áo gile thanh niên trí thức
              <g>
                <path d="M45 300 L58 185 L80 158 L120 158 L142 185 L155 300 Z" fill="url(#minhVest)" />
                <polygon points="85,155 100,200 115,155" fill="#fdf8f0" />
                <polygon points="97,170 103,170 105,225 100,235 95,225" fill="#991b1b" />
                {/* 2 hàng cúc đồng 3D */}
                <circle cx="92" cy="220" r="2.5" fill="#ca8a04" />
                <circle cx="108" cy="220" r="2.5" fill="#ca8a04" />
                <circle cx="92" cy="250" r="2.5" fill="#ca8a04" />
                <circle cx="108" cy="250" r="2.5" fill="#ca8a04" />
              </g>
            ) : (
              // Minh Kỳ 0: Áo nâu sồng mộc mạc người phụ bếp
              <g>
                <path d="M45 300 L56 182 L78 156 L122 156 L144 182 L155 300 Z" fill="#6d4c38" />
                <path d="M80 156 Q100 178 120 156" fill="#efe2d3" />
                <path d="M96 166 L96 300" stroke="#4a3324" strokeWidth="3.5" />
              </g>
            )}

            {/* Cổ */}
            <rect x="88" y="128" width="24" height="30" fill="url(#minhSkin3D)" rx="4" />
            <ellipse cx="100" cy="136" rx="14" ry="5" fill="#c08a5c" opacity="0.4" />

            {/* Đầu Chibi 3D */}
            <ellipse cx="100" cy="92" rx="42" ry="46" fill="url(#minhSkin3D)" />

            {/* Má hồng hào tươi trẻ */}
            <ellipse cx="70" cy="104" rx="9" ry="5" fill="#f87171" opacity="0.28" />
            <ellipse cx="130" cy="104" rx="9" ry="5" fill="#f87171" opacity="0.28" />

            {/* Mái tóc thanh niên bồng bềnh 3D */}
            <path d="M60 82 C58 44, 142 42, 140 82 C134 56, 120 48, 98 50 C76 52, 65 62, 60 82 Z" fill="url(#minhHair3D)" />
            <path d="M64 76 Q92 56 110 65" stroke="#755845" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.55" />
            <path d="M60 82 Q56 100 68 108 Q63 90 72 80" fill="#221711" />

            {/* Mũi */}
            <path d="M100 91 L98 102 L102 103" stroke="#b6835a" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Expression-based Features for Minh */}
            {expression === "lo-lang" ? (
              <g data-testid="expr-lo-lang">
                {/* Lông mày lo lắng nhíu lại */}
                <path d="M72 83 Q80 87 89 86" stroke="#231710" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M111 86 Q120 87 128 83" stroke="#231710" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                {/* Mắt mở to lo lắng */}
                <ellipse cx="81" cy="94" rx="8" ry="6.6" fill="#ffffff" />
                <ellipse cx="81" cy="94" rx="5.2" ry="5.2" fill="url(#minhEyeIris)" />
                <circle cx="79.5" cy="92" r="2.2" fill="#ffffff" />
                <ellipse cx="119" cy="94" rx="8" ry="6.6" fill="#ffffff" />
                <ellipse cx="119" cy="94" rx="5.2" ry="5.2" fill="url(#minhEyeIris)" />
                <circle cx="117.5" cy="92" r="2.2" fill="#ffffff" />
                {/* Giọt mồ hôi căng thẳng */}
                <path d="M132 82 Q136 76 138 82 Q140 88 135 88 Q130 88 132 82 Z" fill="#38bdf8" opacity="0.85" />
                {/* Miệng mím lo âu */}
                <path d="M94 116 Q100 112 106 116" stroke="#93462d" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              </g>
            ) : expression === "quyet-tam" ? (
              <g data-testid="expr-quyet-tam">
                {/* Lông mày xếch quyết tâm kiên định */}
                <path d="M72 87 Q81 83 91 80" stroke="#231710" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M109 80 Q119 83 128 87" stroke="#231710" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                {/* Ánh mắt kiên cường sắc nét */}
                <ellipse cx="81" cy="93" rx="8" ry="5.8" fill="#ffffff" />
                <ellipse cx="81" cy="93" rx="5.5" ry="5.2" fill="url(#minhEyeIris)" />
                <circle cx="79.5" cy="91" r="2.4" fill="#ffffff" />
                <circle cx="83" cy="94.5" r="1.1" fill="#ffffff" opacity="0.9" />
                <ellipse cx="119" cy="93" rx="8" ry="5.8" fill="#ffffff" />
                <ellipse cx="119" cy="93" rx="5.5" ry="5.2" fill="url(#minhEyeIris)" />
                <circle cx="117.5" cy="91" r="2.4" fill="#ffffff" />
                <circle cx="121" cy="94.5" r="1.1" fill="#ffffff" opacity="0.9" />
                {/* Ngôi sao ý chí lấp lánh */}
                <polygon points="81,91 82,93 84,93 82.5,94.5 83,96.5 81,95 79,96.5 79.5,94.5 78,93 80,93" fill="#fde047" opacity="0.75" />
                {/* Miệng mím đanh thép kiên định */}
                <path d="M92 114 L108 114" stroke="#7f1d1d" strokeWidth="2.8" strokeLinecap="round" />
              </g>
            ) : (
              <g data-testid="expr-binh-thuong">
                {/* Lông mày bình thường */}
                <path d="M73 85 Q81 80 90 84" stroke="#231710" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                <path d="M110 84 Q119 80 127 85" stroke="#231710" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                {/* Mắt to tròn */}
                <ellipse cx="81" cy="93" rx="8" ry="6.2" fill="#ffffff" />
                <ellipse cx="81" cy="93" rx="5.5" ry="5.2" fill="url(#minhEyeIris)" />
                <circle cx="79.5" cy="91" r="2.2" fill="#ffffff" />
                <circle cx="83" cy="94.5" r="1.1" fill="#ffffff" opacity="0.85" />
                <ellipse cx="119" cy="93" rx="8" ry="6.2" fill="#ffffff" />
                <ellipse cx="119" cy="93" rx="5.5" ry="5.2" fill="url(#minhEyeIris)" />
                <circle cx="117.5" cy="91" r="2.2" fill="#ffffff" />
                <circle cx="121" cy="94.5" r="1.1" fill="#ffffff" opacity="0.85" />
                {/* Nụ cười nhiệt huyết */}
                <path d="M93 113 Q100 118 107 113" stroke="#93462d" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* 3. LAN - NỮ SINH / CÔNG NHÂN (3D CHIBI DUYÊN DÁNG) */}
      {characterId === "lan" && (
        <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="lanSkin3D" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fff8f2" />
                <stop offset="65%" stopColor="#fae2ce" />
                <stop offset="100%" stopColor="#e5ba94" />
              </radialGradient>
              <radialGradient id="lanEyeIris" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="65%" stopColor="#451a03" />
                <stop offset="100%" stopColor="#1c0a01" />
              </radialGradient>
              <linearGradient id="lanHair3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#35241e" />
                <stop offset="50%" stopColor="#1a110d" />
                <stop offset="100%" stopColor="#0d0806" />
              </linearGradient>
              <linearGradient id="lanAoDai" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#fbf6ee" />
                <stop offset="100%" stopColor="#ebdcc8" />
              </linearGradient>
            </defs>

            {/* Thân áo */}
            {isLanWorker ? (
              // Áo xanh công nhân dệt Hải Phòng
              <g>
                <path d="M48 300 L60 185 L82 158 L118 158 L140 185 L152 300 Z" fill="#2d4a5e" />
                <path d="M82 158 L100 180 L118 158" fill="#ffffff" />
                {/* Khăn quàng đỏ 3D */}
                <path d="M78 160 Q100 195 122 160 Q100 178 78 160" fill="#dc2626" />
              </g>
            ) : (
              // Áo dài trắng truyền thống nữ sinh Hà Nội
              <g>
                <path d="M50 300 L62 182 L84 156 L116 156 L138 182 L150 300 Z" fill="url(#lanAoDai)" />
                <path d="M84 156 Q100 172 116 156" stroke="#ca8a04" strokeWidth="2" fill="none" />
                <path d="M100 166 Q115 178 120 215" stroke="#ca8a04" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              </g>
            )}

            {/* Cổ */}
            <rect x="90" y="128" width="20" height="30" fill="url(#lanSkin3D)" rx="4" />
            <ellipse cx="100" cy="136" rx="12" ry="5" fill="#c08a5c" opacity="0.35" />

            {/* Tóc sau dài bồng bềnh */}
            <path d="M60 85 C55 125, 52 170, 58 200 C64 165, 62 120, 68 95 Z" fill="url(#lanHair3D)" />
            <path d="M140 85 C145 125, 148 170, 142 200 C136 165, 138 120, 132 95 Z" fill="url(#lanHair3D)" />

            {/* Đầu Chibi 3D */}
            <ellipse cx="100" cy="92" rx="40" ry="45" fill="url(#lanSkin3D)" />

            {/* Má hồng dễ thương */}
            <ellipse cx="70" cy="103" rx="9" ry="5.5" fill="#f43f5e" opacity="0.32" />
            <ellipse cx="130" cy="103" rx="9" ry="5.5" fill="#f43f5e" opacity="0.32" />

            {/* Mái tóc trước & kẹp tóc đỏ */}
            <path d="M62 82 C60 45, 140 45, 138 82 C134 58, 122 50, 100 50 C78 50, 66 58, 62 82 Z" fill="url(#lanHair3D)" />
            <path d="M70 66 Q100 56 130 66" stroke="#dc2626" strokeWidth="3.5" fill="none" />
            <circle cx="126" cy="67" r="4" fill="#fbbf24" />

            {/* Mũi */}
            <path d="M100 91 L98 101 L102 102" stroke="#b6835a" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Expression-based Features for Lan */}
            {expression === "lo-lang" ? (
              <g data-testid="expr-lo-lang">
                <path d="M74 83 Q82 86 90 85" stroke="#24140d" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                <path d="M110 85 Q118 86 126 83" stroke="#24140d" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                <ellipse cx="82" cy="94" rx="8" ry="6.6" fill="#ffffff" />
                <ellipse cx="82" cy="94" rx="5.4" ry="5.2" fill="url(#lanEyeIris)" />
                <circle cx="80.5" cy="92" r="2.2" fill="#ffffff" />
                <ellipse cx="118" cy="94" rx="8" ry="6.6" fill="#ffffff" />
                <ellipse cx="118" cy="94" rx="5.4" ry="5.2" fill="url(#lanEyeIris)" />
                <circle cx="116.5" cy="92" r="2.2" fill="#ffffff" />
                <path d="M132 80 Q135 75 137 80 Q139 85 135 85 Q131 85 132 80 Z" fill="#38bdf8" opacity="0.8" />
                <path d="M94 116 Q100 112 106 116" stroke="#991b1b" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              </g>
            ) : expression === "quyet-tam" ? (
              <g data-testid="expr-quyet-tam">
                <path d="M74 87 Q82 83 90 80" stroke="#24140d" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M110 80 Q118 83 126 87" stroke="#24140d" strokeWidth="3" fill="none" strokeLinecap="round" />
                <ellipse cx="82" cy="93" rx="8" ry="5.8" fill="#ffffff" />
                <ellipse cx="82" cy="93" rx="5.6" ry="5.2" fill="url(#lanEyeIris)" />
                <circle cx="80.5" cy="91" r="2.4" fill="#ffffff" />
                <ellipse cx="118" cy="93" rx="8" ry="5.8" fill="#ffffff" />
                <ellipse cx="118" cy="93" rx="5.6" ry="5.2" fill="url(#lanEyeIris)" />
                <circle cx="116.5" cy="91" r="2.4" fill="#ffffff" />
                <path d="M93 114 L107 114" stroke="#991b1b" strokeWidth="2.6" strokeLinecap="round" />
              </g>
            ) : (
              <g data-testid="expr-binh-thuong">
                <path d="M74 85 Q82 81 90 85" stroke="#24140d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M110 85 Q118 81 126 85" stroke="#24140d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <ellipse cx="82" cy="93" rx="8" ry="6.2" fill="#ffffff" />
                <ellipse cx="82" cy="93" rx="5.6" ry="5.2" fill="url(#lanEyeIris)" />
                <circle cx="80.5" cy="91" r="2.2" fill="#ffffff" />
                <circle cx="84" cy="94.5" r="1.1" fill="#ffffff" opacity="0.9" />
                <ellipse cx="118" cy="93" rx="8" ry="6.2" fill="#ffffff" />
                <ellipse cx="118" cy="93" rx="5.6" ry="5.2" fill="url(#lanEyeIris)" />
                <circle cx="116.5" cy="91" r="2.2" fill="#ffffff" />
                <circle cx="120" cy="94.5" r="1.1" fill="#ffffff" opacity="0.9" />
                <path d="M94 113 Q100 117 106 113" stroke="#b91c1c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* 4. BÁC TƯ - THỢ MÁY NAM KỲ PHÚC HẬU */}
      {characterId === "bac-tu" && (
        <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="tuSkin3D" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#faecd8" />
                <stop offset="65%" stopColor="#e2be98" />
                <stop offset="100%" stopColor="#bd8f64" />
              </radialGradient>
              <linearGradient id="tuVest" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>

            {/* Thân áo thợ máy có túi da và cúc đồng */}
            <path d="M42 300 L54 182 L76 156 L124 156 L146 182 L158 300 Z" fill="url(#tuVest)" />
            <path d="M78 156 L100 192 L122 156" fill="#78604d" />
            <circle cx="100" cy="225" r="3" fill="#ca8a04" />
            <circle cx="100" cy="255" r="3" fill="#ca8a04" />

            {/* Cổ */}
            <rect x="86" y="128" width="28" height="30" fill="url(#tuSkin3D)" rx="4" />
            {/* Đầu Chibi phúc hậu */}
            <ellipse cx="100" cy="92" rx="44" ry="46" fill="url(#tuSkin3D)" />

            {/* Mái tóc muối tiêu 3D */}
            <path d="M58 82 C56 42, 144 42, 142 82 C140 60, 126 50, 100 50 C74 50, 60 60, 58 82 Z" fill="#4b5563" />
            <path d="M66 68 Q100 54 134 68" stroke="#d1d5db" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M60 80 Q78 70 92 76" stroke="#e5e7eb" strokeWidth="1.5" fill="none" />

            {/* Ria mép phong trần */}
            <path d="M83 112 Q100 110 117 112 Q100 118 83 112" fill="#374151" />

            {/* Expression-based Features for Bac Tu */}
            {expression === "lo-lang" ? (
              <g data-testid="expr-lo-lang">
                <path d="M74 83 Q82 85 90 84" stroke="#374151" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M110 84 Q118 85 126 83" stroke="#374151" strokeWidth="3" fill="none" strokeLinecap="round" />
                <ellipse cx="81" cy="94" rx="7" ry="5.5" fill="#ffffff" />
                <circle cx="81" cy="94" r="3.2" fill="#1f2937" />
                <ellipse cx="119" cy="94" rx="7" ry="5.5" fill="#ffffff" />
                <circle cx="119" cy="94" r="3.2" fill="#1f2937" />
                <path d="M91 123 Q100 120 109 123" stroke="#854d0e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              </g>
            ) : expression === "quyet-tam" ? (
              <g data-testid="expr-quyet-tam">
                <path d="M74 87 Q82 83 90 80" stroke="#374151" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M110 80 Q118 83 126 87" stroke="#374151" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <ellipse cx="81" cy="93" rx="7" ry="4.8" fill="#ffffff" />
                <circle cx="81" cy="93" r="3.5" fill="#1f2937" />
                <circle cx="79.5" cy="91.5" r="1.5" fill="#ffffff" />
                <ellipse cx="119" cy="93" rx="7" ry="4.8" fill="#ffffff" />
                <circle cx="119" cy="93" r="3.5" fill="#1f2937" />
                <circle cx="117.5" cy="91.5" r="1.5" fill="#ffffff" />
                <path d="M91 122 L109 122" stroke="#854d0e" strokeWidth="2.6" strokeLinecap="round" />
              </g>
            ) : (
              <g data-testid="expr-binh-thuong">
                <path d="M74 85 Q82 82 90 85" stroke="#374151" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M110 85 Q118 82 126 85" stroke="#374151" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <ellipse cx="81" cy="93" rx="7" ry="5" fill="#ffffff" />
                <circle cx="81" cy="93" r="3.5" fill="#1f2937" />
                <circle cx="79.5" cy="91.5" r="1.5" fill="#ffffff" />
                <path d="M71 91 L67 90 M71 94 L66 95" stroke="#9a6941" strokeWidth="1.8" />
                <ellipse cx="119" cy="93" rx="7" ry="5" fill="#ffffff" />
                <circle cx="119" cy="93" r="3.5" fill="#1f2937" />
                <circle cx="117.5" cy="91.5" r="1.5" fill="#ffffff" />
                <path d="M127 91 L131 90 M127 94 L132 95" stroke="#9a6941" strokeWidth="1.8" />
                <path d="M91 122 Q100 126 109 122" stroke="#854d0e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* 5. BẠN THỢ ẢNH & THỢ VIỆT KIỀU PARIS (3D MŨ NỒI BERET PHÁP) */}
      {(characterId === "ban-tho-anh" || characterId === "tho-viet-kieu") && (
        <div className="relative w-56 h-80 sm:w-64 sm:h-96 flex flex-col items-center">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="workerSkin3D" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fff5eb" />
                <stop offset="65%" stopColor="#f5d6b8" />
                <stop offset="100%" stopColor="#d8a87b" />
              </radialGradient>
              <linearGradient id="beretGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="60%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Thân áo */}
            <path d="M45 300 L58 185 L80 158 L120 158 L142 185 L155 300 Z" fill="#332a24" />
            <polygon points="85,155 100,195 115,155" fill="#f1e7d8" />

            {/* Cổ */}
            <rect x="88" y="128" width="24" height="30" fill="url(#workerSkin3D)" rx="4" />

            {/* Đầu Chibi */}
            <ellipse cx="100" cy="92" rx="42" ry="46" fill="url(#workerSkin3D)" />
            <ellipse cx="71" cy="103" rx="8" ry="5" fill="#f87171" opacity="0.25" />
            <ellipse cx="129" cy="103" rx="8" ry="5" fill="#f87171" opacity="0.25" />

            {/* Mũ nồi Beret Pháp đặc trưng phong cách kiều bào */}
            <path d="M54 78 C50 48, 148 42, 146 72 C146 84, 132 88, 100 86 C68 86, 54 84, 54 78 Z" fill="url(#beretGrad)" />
            <circle cx="100" cy="46" r="3.5" fill="#0f172a" />

            {/* Mắt linh hoạt, quyết đoán */}
            <ellipse cx="82" cy="93" rx="7.5" ry="5.8" fill="#ffffff" />
            <circle cx="82" cy="93" r="3.8" fill="#1e293b" />
            <circle cx="80.5" cy="91" r="1.6" fill="#ffffff" />
            <path d="M74 85 Q82 81 90 85" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            <ellipse cx="118" cy="93" rx="7.5" ry="5.8" fill="#ffffff" />
            <circle cx="118" cy="93" r="3.8" fill="#1e293b" />
            <circle cx="116.5" cy="91" r="1.6" fill="#ffffff" />
            <path d="M110 85 Q118 81 126 85" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Nụ cười tin tưởng */}
            <path d="M100 91 L98 101 L102 102" stroke="#b6835a" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M93 113 Q100 118 107 113" stroke="#93462d" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
};
