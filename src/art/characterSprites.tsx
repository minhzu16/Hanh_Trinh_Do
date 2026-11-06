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
          ? "scale-100 opacity-100 filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.92)]"
          : "scale-95 opacity-80"
      }`}
    >
      {/* =========================================================================
          1. LÃNH TỤ NGUYỄN ÁI QUỐC (PARIS / TOURS 1919 - 1920)
          Phong thái trí thức yêu nước thanh tao, kiên định, vầng trán cao thông tuệ
          ========================================================================= */}
      {characterId === "nguyen-ai-quoc" && (
        <div className="relative w-64 h-96 sm:w-72 sm:h-[420px] flex flex-col items-center">
          <svg viewBox="0 0 240 340" className="w-full h-full drop-shadow-2xl">
            <defs>
              {/* Làn da ánh ngà trí thức Đông Dương với khối sáng tối ba chiều */}
              <radialGradient id="naqSkinReal" cx="44%" cy="38%" r="62%">
                <stop offset="0%" stopColor="#fffaf2" />
                <stop offset="45%" stopColor="#f7e5d2" />
                <stop offset="78%" stopColor="#e5c5a4" />
                <stop offset="100%" stopColor="#bf936f" />
              </radialGradient>
              {/* Đổ bóng xương quai hàm và cằm */}
              <linearGradient id="naqJawShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#9a6742" stopOpacity="0" />
                <stop offset="100%" stopColor="#805030" stopOpacity="0.45" />
              </linearGradient>
              {/* Mống mắt hổ phách sâu thẳm, có vân sáng và con ngươi trung tâm */}
              <radialGradient id="naqIrisReal" cx="36%" cy="34%" r="68%">
                <stop offset="0%" stopColor="#6d482c" />
                <stop offset="50%" stopColor="#3d2212" />
                <stop offset="85%" stopColor="#1a0c06" />
                <stop offset="100%" stopColor="#080301" />
              </radialGradient>
              {/* Mái tóc đen rẽ ngôi 7/3 thanh lịch thời trang Paris 1920 */}
              <linearGradient id="naqHairReal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b2f27" />
                <stop offset="35%" stopColor="#1f1814" />
                <stop offset="100%" stopColor="#0a0705" />
              </linearGradient>
              {/* Âu phục dạ tweed cao cấp của Pháp */}
              <linearGradient id="naqSuitReal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#352c26" />
                <stop offset="45%" stopColor="#211a15" />
                <stop offset="100%" stopColor="#110d0a" />
              </linearGradient>
              {/* Cà vạt đỏ son cách mạng thắt nút Four-in-hand */}
              <linearGradient id="naqTieReal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#991b1b" />
                <stop offset="40%" stopColor="#b91c1c" />
                <stop offset="80%" stopColor="#7f1d1d" />
                <stop offset="100%" stopColor="#541212" />
              </linearGradient>
              {/* Hào quang cách mạng ấm áp bao bọc phía sau */}
              <radialGradient id="naqAuraGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.28" />
                <stop offset="45%" stopColor="#d97706" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
              </radialGradient>
              {/* Ánh sáng ven vàng kim (Golden Rim Light) */}
              <linearGradient id="naqRimLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Hào quang cách mạng cao quý */}
            <circle cx="120" cy="115" r="105" fill="url(#naqAuraGlow)" />
            <circle cx="120" cy="115" r="75" fill="#fef08a" opacity="0.08" />

            {/* Bờ vai và thân áo vest Tây âu dạ len cắt may thanh thoát */}
            <path
              d="M26 340 L38 232 L70 184 L120 180 L170 184 L202 232 L214 340 Z"
              fill="url(#naqSuitReal)"
            />
            {/* Vạt áo vest và nếp gấp rủ mềm mại */}
            <path d="M70 184 L96 258 L120 340 L144 258 L170 184" fill="#15100c" opacity="0.85" />
            <path d="M42 245 Q58 290 62 340" stroke="#120d0a" strokeWidth="2.5" fill="none" opacity="0.6" />
            <path d="M198 245 Q182 290 178 340" stroke="#120d0a" strokeWidth="2.5" fill="none" opacity="0.6" />

            {/* Cổ áo sơ mi rời hồ cứng (Detachable Stiff Collar) cao 3.5cm thời kỳ 1920 */}
            <polygon points="100,172 120,224 140,172 120,185" fill="#faf6ee" stroke="#ded4c3" strokeWidth="1" />
            <polygon points="106,174 120,216 134,174" fill="#f0e7d8" />

            {/* Nút thắt cà vạt Four-in-hand 3D sắc sảo */}
            <polygon points="115,185 125,185 128,212 120,216 112,212" fill="url(#naqTieReal)" />
            {/* Thân cà vạt đỏ son rủ xuống */}
            <polygon points="113,213 127,213 130,268 120,282 110,268" fill="url(#naqTieReal)" />
            <line x1="120" y1="186" x2="120" y2="276" stroke="#ef4444" strokeWidth="1.2" opacity="0.65" />
            {/* Kẹp cà vạt bằng đồng mạ vàng tinh tế */}
            <line x1="112" y1="240" x2="128" y2="240" stroke="#ca8a04" strokeWidth="2" strokeLinecap="round" />

            {/* Ve áo vest uốn lượn đa diện (Rolled Notched Lapels) */}
            <polygon points="42,230 72,184 104,248 78,288" fill="#2c221b" stroke="#18120e" strokeWidth="1" />
            <polygon points="198,230 168,184 136,248 162,288" fill="#2c221b" stroke="#18120e" strokeWidth="1" />

            {/* Túi áo ngực với khăn mùi xoa trắng (Pocket Square) và bút cài ngực */}
            <line x1="62" y1="244" x2="88" y2="241" stroke="#4a392e" strokeWidth="2.2" />
            <polygon points="66,243 73,235 80,243" fill="#ffffff" opacity="0.9" />
            <rect x="83" y="236" width="3" height="8" rx="1" fill="#ca8a04" />

            {/* Cổ cao thanh nhã với yết hầu tạo khối trang nghiêm */}
            <path d="M106 140 L106 182 L134 182 L134 140 Z" fill="url(#naqSkinReal)" />
            <path d="M112 153 Q120 164 128 153" stroke="#9e6d47" strokeWidth="1.6" fill="none" opacity="0.55" />
            <ellipse cx="120" cy="147" rx="22" ry="8" fill="url(#naqJawShadow)" />

            {/* Khuôn mặt thanh tú, xương gò má sắc sảo, vầng trán cao rộng thông tuệ */}
            <path
              d="M84 94 C82 58 158 58 156 94 C156 128 138 148 120 148 C102 148 84 128 84 94 Z"
              fill="url(#naqSkinReal)"
            />

            {/* Đôi tai tạo khối tự nhiên */}
            <path d="M83 94 Q79 108 84 120 Q86 110 85 98 Z" fill="#e5c5a4" stroke="#ad7d57" strokeWidth="0.8" />
            <path d="M157 94 Q161 108 156 120 Q154 110 155 98 Z" fill="#e5c5a4" stroke="#ad7d57" strokeWidth="0.8" />

            {/* Mái tóc đen chải mượt rẽ ngôi 7/3 phong thái trí thức yêu nước */}
            <path
              d="M79 86 C75 42 165 40 161 86 C158 64 144 50 120 50 C96 50 82 64 79 86 Z"
              fill="url(#naqHairReal)"
            />
            {/* Lọn tóc mai và chân tóc trán */}
            <path d="M79 86 C77 108 85 116 85 116 C82 98 86 88 94 80 Z" fill="#130d09" />
            <path d="M161 86 C163 108 155 116 155 116 C158 98 154 88 146 80 Z" fill="#130d09" />
            <path d="M96 64 Q120 54 144 64" stroke="#544134" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.75" />

            {/* Vầng trán cao sáng ngời */}
            <path d="M96 72 Q120 68 144 72" stroke="#fae5d2" strokeWidth="1.4" fill="none" opacity="0.65" />

            {/* Lông mày chữ nhất cương nghị, sắc sảo */}
            <path d="M93 91 Q105 85 117 90" stroke="#1f140e" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M123 90 Q135 85 147 91" stroke="#1f140e" strokeWidth="2.8" fill="none" strokeLinecap="round" />

            {/* Đôi mắt sáng ngời nhân hậu, tầm nhìn thời đại (Đa tầng: Củng mạc, mống mắt, con ngươi, catchlights) */}
            <g className="vn-eye-blink">
              {/* Mắt trái */}
              <path d="M95 98 Q106 93 116 98 Q106 105 95 98 Z" fill="#f8f5ee" />
              {/* Bóng đổ mi mắt trên */}
              <path d="M95 98 Q106 93 116 98 Q106 96 95 98 Z" fill="#301e14" opacity="0.35" />
              {/* Nếp mí đôi */}
              <path d="M94 94 Q106 88 116 94" stroke="#875333" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              {/* Đường mi trên sắc nét */}
              <path d="M94 97 Q106 92 117 97" stroke="#1a0f09" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              {/* Mống mắt */}
              <circle cx="106.5" cy="98.5" r="4.3" fill="url(#naqIrisReal)" />
              {/* Con ngươi đen sâu thẳm */}
              <circle cx="106.5" cy="98.5" r="2.2" fill="#000000" />
              {/* Điểm sáng bắt sáng kép */}
              <circle className="vn-eye-shimmer" cx="105" cy="96.8" r="1.5" fill="#ffffff" />
              <circle cx="108" cy="99.8" r="0.8" fill="#ffffff" opacity="0.85" />

              {/* Mắt phải */}
              <path d="M124 98 Q134 93 145 98 Q134 105 124 98 Z" fill="#f8f5ee" />
              <path d="M124 98 Q134 93 145 98 Q134 96 124 98 Z" fill="#301e14" opacity="0.35" />
              <path d="M124 94 Q134 88 146 94" stroke="#875333" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M123 97 Q134 92 146 97" stroke="#1a0f09" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <circle cx="133.5" cy="98.5" r="4.3" fill="url(#naqIrisReal)" />
              <circle cx="133.5" cy="98.5" r="2.2" fill="#000000" />
              <circle className="vn-eye-shimmer" cx="132" cy="96.8" r="1.5" fill="#ffffff" />
              <circle cx="135" cy="99.8" r="0.8" fill="#ffffff" opacity="0.85" />
            </g>

            {/* Chiều sâu gò má và hốc mũi 3D */}
            <ellipse cx="101" cy="114" rx="7" ry="3.5" fill="#bf936f" opacity="0.22" />
            <ellipse cx="139" cy="114" rx="7" ry="3.5" fill="#bf936f" opacity="0.22" />

            {/* Sống mũi thanh thoát nổi khối */}
            <path d="M120 94 L117 114 L123 116" stroke="#9e6d47" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M117 114 L119 116" stroke="#fce7d5" strokeWidth="1.2" fill="none" opacity="0.7" />
            <ellipse cx="115" cy="116" rx="2.2" ry="1.2" fill="#784c2d" opacity="0.65" />

            {/* Nụ cười bao dung, kiên nghị với bờ môi đầy đặn */}
            <path d="M112 128 Q120 134 128 128" stroke="#7a2a1a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M115 132 Q120 135 125 132" stroke="#a6543d" strokeWidth="1.4" fill="none" opacity="0.6" />

            {/* Ánh sáng ven vàng kim tôn nghiêm phía bên trái */}
            <path
              d="M77 86 C73 42 120 38 120 38 C95 38 75 62 73 118 L32 232 L24 340"
              stroke="url(#naqRimLight)"
              strokeWidth="3.5"
              fill="none"
              opacity="0.9"
            />
          </svg>
        </div>
      )}

      {/* =========================================================================
          2. MINH - THANH NIÊN YÊU NƯỚC (NHÂN VẬT CHÍNH)
          Kỳ 0: Phụ bếp áo nâu sồng; Kỳ 1-2: Áo gile trí thức, đồng hồ quả quýt
          ========================================================================= */}
      {characterId === "minh" && (
        <div className="relative w-64 h-96 sm:w-72 sm:h-[420px] flex flex-col items-center">
          <svg viewBox="0 0 240 340" className="w-full h-full drop-shadow-2xl">
            <defs>
              {/* Làn da thanh niên khỏe khoắn, rạng rỡ */}
              <radialGradient id="minhSkinReal" cx="44%" cy="38%" r="62%">
                <stop offset="0%" stopColor="#fffaf4" />
                <stop offset="48%" stopColor="#f8e2cf" />
                <stop offset="80%" stopColor="#e2be99" />
                <stop offset="100%" stopColor="#bd8e66" />
              </radialGradient>
              <radialGradient id="minhIrisReal" cx="36%" cy="34%" r="68%">
                <stop offset="0%" stopColor="#6e4627" />
                <stop offset="55%" stopColor="#3d2110" />
                <stop offset="100%" stopColor="#120803" />
              </radialGradient>
              <linearGradient id="minhHairReal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#483427" />
                <stop offset="40%" stopColor="#241811" />
                <stop offset="100%" stopColor="#0d0805" />
              </linearGradient>
              {/* Gile len dệt vân chìm của thanh niên trí thức */}
              <linearGradient id="minhGileReal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4d3a2d" />
                <stop offset="50%" stopColor="#33241b" />
                <stop offset="100%" stopColor="#1a110a" />
              </linearGradient>
              {/* Vải đũi nhuộm củ nâu truyền thống của người lao động phụ bếp */}
              <linearGradient id="minhPeasant" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6b4c37" />
                <stop offset="50%" stopColor="#523928" />
                <stop offset="100%" stopColor="#352215" />
              </linearGradient>
            </defs>

            {/* Trang phục theo thời kỳ lịch sử */}
            {isMinhOlder ? (
              // Minh Kỳ 1-2: Áo gile thanh niên trí thức thập niên 1920
              <g>
                <path d="M26 340 L38 232 L70 184 L120 180 L170 184 L202 232 L214 340 Z" fill="url(#minhGileReal)" />
                {/* Áo sơ mi trắng cổ bẻ bên trong */}
                <polygon points="100,172 120,224 140,172" fill="#faf7f0" stroke="#ddd1be" strokeWidth="1" />
                <polygon points="113,184 120,242 127,184" fill="#991b1b" />
                {/* Đường may nẹp vạt áo gile */}
                <line x1="120" y1="230" x2="120" y2="340" stroke="#1a110a" strokeWidth="2.5" />
                {/* Cúc đồng đúc có hoa văn phản quang */}
                <circle cx="112" cy="252" r="3.2" fill="#ca8a04" stroke="#78350f" strokeWidth="0.8" />
                <circle cx="128" cy="252" r="3.2" fill="#ca8a04" stroke="#78350f" strokeWidth="0.8" />
                <circle cx="112" cy="282" r="3.2" fill="#ca8a04" stroke="#78350f" strokeWidth="0.8" />
                <circle cx="128" cy="282" r="3.2" fill="#ca8a04" stroke="#78350f" strokeWidth="0.8" />
                {/* Dây xích đồng hồ quả quýt uốn lượn có móc chữ T gài khuy áo */}
                <path d="M128 282 Q148 296 160 278" stroke="#ca8a04" strokeWidth="2" fill="none" strokeDasharray="3,1.5" />
                <circle cx="160" cy="278" r="2" fill="#fef08a" />
              </g>
            ) : (
              // Minh Kỳ 0: Áo nâu sồng mộc mạc người phụ bếp trên tàu buôn
              <g>
                <path d="M26 340 L38 232 L70 184 L120 180 L170 184 L202 232 L214 340 Z" fill="url(#minhPeasant)" />
                {/* Cổ áo cánh mộc xẻ ngực */}
                <path d="M96 178 Q120 208 144 178" fill="#efe4d4" stroke="#d5c3ab" strokeWidth="1" />
                <path d="M116 194 L116 340" stroke="#2c1a0e" strokeWidth="3" />
                {/* Khăn rằn lau mồ hôi vắt vai người thợ thuyền */}
                <path d="M60 195 Q80 230 75 340" stroke="#e5e7eb" strokeWidth="9" fill="none" strokeDasharray="6,4" />
                <path d="M60 195 Q80 230 75 340" stroke="#374151" strokeWidth="9" fill="none" strokeDasharray="2,8" opacity="0.6" />
                {/* Nút tết con bướm bằng vải truyền thống */}
                <circle cx="116" cy="225" r="3.5" fill="#2c1a0e" />
                <circle cx="116" cy="260" r="3.5" fill="#2c1a0e" />
                <circle cx="116" cy="295" r="3.5" fill="#2c1a0e" />
              </g>
            )}

            {/* Cổ thanh niên vững chãi */}
            <path d="M106 140 L106 182 L134 182 L134 140 Z" fill="url(#minhSkinReal)" />
            <ellipse cx="120" cy="147" rx="20" ry="7" fill="#a47248" opacity="0.45" />

            {/* Khuôn mặt thanh niên trẻ trung, cương trực */}
            <path
              d="M84 94 C82 58 158 58 156 94 C156 128 138 148 120 148 C102 148 84 128 84 94 Z"
              fill="url(#minhSkinReal)"
            />

            {/* Đôi tai */}
            <path d="M83 94 Q79 108 84 120 Q86 110 85 98 Z" fill="#e2be99" stroke="#aa7248" strokeWidth="0.8" />
            <path d="M157 94 Q161 108 156 120 Q154 110 155 98 Z" fill="#e2be99" stroke="#aa7248" strokeWidth="0.8" />

            {/* Mái tóc bồng bềnh thanh niên thời đại có từng lọn tóc */}
            <path
              d="M81 85 C77 42 163 40 159 85 C153 58 138 48 118 48 C94 48 83 58 81 85 Z"
              fill="url(#minhHairReal)"
            />
            <path d="M81 85 Q76 105 87 113 Q82 94 91 83" fill="#180f0a" />
            <path d="M159 85 Q164 105 153 113 Q158 94 149 83" fill="#180f0a" />
            {/* Lọn tóc trán tơ tự nhiên */}
            <path d="M88 74 Q116 54 136 65" stroke="#684a36" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.75" />
            <path d="M100 80 Q118 64 130 84" stroke="#362217" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Sống mũi thanh niên cao thẳng */}
            <path d="M120 94 L117 114 L123 116" stroke="#9e673e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <ellipse cx="115" cy="116" rx="2" ry="1.2" fill="#7d4b27" opacity="0.65" />

            {/* Cụm biểu cảm hoàn chỉnh cho Minh (Bảo toàn đầy đủ data-testid) */}
            {expression === "lo-lang" ? (
              <g data-testid="expr-lo-lang">
                {/* Lông mày nhíu lo lắng */}
                <path d="M91 92 Q105 97 116 93" stroke="#22150e" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M124 93 Q135 97 149 92" stroke="#22150e" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                {/* Đôi mắt mở to căng thẳng có nhịp chớp */}
                <g className="vn-eye-blink">
                  <path d="M95 99 Q106 93 116 99 Q106 107 95 99 Z" fill="#fcf8f2" />
                  <path d="M94 96 Q106 91 117 96" stroke="#1c100a" strokeWidth="2.4" fill="none" />
                  <circle cx="106" cy="99" r="4.3" fill="url(#minhIrisReal)" />
                  <circle cx="106" cy="99" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="97.2" r="1.4" fill="#ffffff" />
                  <path d="M124 99 Q134 93 145 99 Q134 107 124 99 Z" fill="#fcf8f2" />
                  <path d="M123 96 Q134 91 146 96" stroke="#1c100a" strokeWidth="2.4" fill="none" />
                  <circle cx="134" cy="99" r="4.3" fill="url(#minhIrisReal)" />
                  <circle cx="134" cy="99" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="97.2" r="1.4" fill="#ffffff" />
                </g>
                <ellipse cx="101" cy="114" rx="7" ry="3.5" fill="#bd8e66" opacity="0.32" />
                <ellipse cx="139" cy="114" rx="7" ry="3.5" fill="#bd8e66" opacity="0.32" />
                {/* Môi mím chặt lo âu */}
                <path d="M113 130 Q120 125 127 130" stroke="#7e3220" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>
            ) : expression === "quyet-tam" ? (
              <g data-testid="expr-quyet-tam">
                {/* Lông mày xếch đanh thép kiên định */}
                <path d="M91 96 Q105 89 117 86" stroke="#22150e" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M123 86 Q135 89 149 96" stroke="#22150e" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                {/* Ánh mắt kiên cường bừng sáng */}
                <g className="vn-eye-blink">
                  <path d="M95 98 Q106 93 116 98 Q106 104 95 98 Z" fill="#fcf8f2" />
                  <path d="M94 96 Q106 91 117 96" stroke="#1c100a" strokeWidth="2.6" fill="none" />
                  <circle cx="106" cy="98.5" r="4.4" fill="url(#minhIrisReal)" />
                  <circle cx="106" cy="98.5" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="96.8" r="1.6" fill="#ffffff" />
                  <circle cx="107.5" cy="100" r="0.8" fill="#ffffff" opacity="0.85" />
                  <path d="M124 98 Q134 93 145 98 Q134 104 124 98 Z" fill="#fcf8f2" />
                  <path d="M123 96 Q134 91 146 96" stroke="#1c100a" strokeWidth="2.6" fill="none" />
                  <circle cx="134" cy="98.5" r="4.4" fill="url(#minhIrisReal)" />
                  <circle cx="134" cy="98.5" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="96.8" r="1.6" fill="#ffffff" />
                  <circle cx="135.5" cy="100" r="0.8" fill="#ffffff" opacity="0.85" />
                </g>
                <ellipse cx="101" cy="114" rx="7" ry="3.5" fill="#bd8e66" opacity="0.25" />
                <ellipse cx="139" cy="114" rx="7" ry="3.5" fill="#bd8e66" opacity="0.25" />
                {/* Môi mím thẳng đanh thép */}
                <line x1="112" y1="128" x2="128" y2="128" stroke="#7a2414" strokeWidth="2.6" strokeLinecap="round" />
              </g>
            ) : expression === "vui" ? (
              <g data-testid="expr-vui">
                {/* Lông mày nâng nhẹ vui tươi */}
                <path d="M92 92 Q105 87 116 91" stroke="#22150e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                <path d="M124 91 Q135 87 148 92" stroke="#22150e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                {/* Đôi mắt cười rạng rỡ */}
                <g className="vn-eye-blink">
                  <path d="M95 98 Q106 94 116 99 Q106 104 95 98 Z" fill="#fcf8f2" />
                  <path d="M94 96 Q106 92 117 96" stroke="#1c100a" strokeWidth="2.4" fill="none" />
                  <circle cx="106" cy="98" r="4.2" fill="url(#minhIrisReal)" />
                  <circle cx="106" cy="98" r="2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="96.5" r="1.5" fill="#ffffff" />
                  <path d="M124 99 Q134 94 145 98 Q134 104 124 99 Z" fill="#fcf8f2" />
                  <path d="M123 96 Q134 92 146 96" stroke="#1c100a" strokeWidth="2.4" fill="none" />
                  <circle cx="134" cy="98" r="4.2" fill="url(#minhIrisReal)" />
                  <circle cx="134" cy="98" r="2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="96.5" r="1.5" fill="#ffffff" />
                </g>
                <ellipse cx="100" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.22" />
                <ellipse cx="140" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.22" />
                {/* Nụ cười rạng rỡ hé mở */}
                <path d="M112 127 Q120 136 128 127 Z" fill="#8c2e1b" stroke="#701a09" strokeWidth="1.5" />
                <path d="M115 128 Q120 131 125 128" fill="#ffffff" />
              </g>
            ) : (
              <g data-testid="expr-binh-thuong">
                {/* Lông mày tự nhiên */}
                <path d="M92 93 Q105 88 116 92" stroke="#22150e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                <path d="M124 92 Q135 88 148 93" stroke="#22150e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                {/* Đôi mắt điềm tĩnh, sáng ngời có nhịp chớp */}
                <g className="vn-eye-blink">
                  <path d="M95 98 Q106 93 116 98 Q106 105 95 98 Z" fill="#fcf8f2" />
                  <path d="M94 96 Q106 92 117 96" stroke="#1c100a" strokeWidth="2.4" fill="none" />
                  <circle cx="106" cy="98.5" r="4.3" fill="url(#minhIrisReal)" />
                  <circle cx="106" cy="98.5" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="96.8" r="1.5" fill="#ffffff" />
                  <path d="M124 98 Q134 93 145 98 Q134 105 124 98 Z" fill="#fcf8f2" />
                  <path d="M123 96 Q134 92 146 96" stroke="#1c100a" strokeWidth="2.4" fill="none" />
                  <circle cx="134" cy="98.5" r="4.3" fill="url(#minhIrisReal)" />
                  <circle cx="134" cy="98.5" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="96.8" r="1.5" fill="#ffffff" />
                </g>
                <ellipse cx="101" cy="114" rx="7" ry="3.5" fill="#bd8e66" opacity="0.2" />
                <ellipse cx="139" cy="114" rx="7" ry="3.5" fill="#bd8e66" opacity="0.2" />
                {/* Khóe miệng tự tin nhiệt huyết */}
                <path d="M113 128 Q120 133 127 128" stroke="#7e3220" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* =========================================================================
          3. LAN - NỮ THANH NIÊN / NỮ CÔNG NHÂN VÔ SẢN HÓA
          Nữ sinh Hà Nội áo dài lụa trắng hoặc nữ công nhân dệt Hải Phòng khăn đỏ
          ========================================================================= */}
      {characterId === "lan" && (
        <div className="relative w-64 h-96 sm:w-72 sm:h-[420px] flex flex-col items-center">
          <svg viewBox="0 0 240 340" className="w-full h-full drop-shadow-2xl">
            <defs>
              {/* Làn da trắng hồng mịn màng thiếu nữ Việt Nam */}
              <radialGradient id="lanSkinReal" cx="44%" cy="38%" r="62%">
                <stop offset="0%" stopColor="#fffbf7" />
                <stop offset="50%" stopColor="#fbe8db" />
                <stop offset="82%" stopColor="#eac4a7" />
                <stop offset="100%" stopColor="#c79979" />
              </radialGradient>
              <radialGradient id="lanIrisReal" cx="36%" cy="34%" r="68%">
                <stop offset="0%" stopColor="#7a4428" />
                <stop offset="60%" stopColor="#452110" />
                <stop offset="100%" stopColor="#1a0903" />
              </radialGradient>
              <linearGradient id="lanHairReal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38261e" />
                <stop offset="45%" stopColor="#1e130d" />
                <stop offset="100%" stopColor="#0c0704" />
              </linearGradient>
              {/* Áo dài lụa trắng Hà Đông với dải bắt sáng óng ả (Silk Luster) */}
              <linearGradient id="lanAoDaiReal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#fcf9f2" />
                <stop offset="70%" stopColor="#f3e8d6" />
                <stop offset="100%" stopColor="#e5d4be" />
              </linearGradient>
              {/* Áo bảo hộ xanh chàm thợ dệt Hải Phòng */}
              <linearGradient id="lanWorkerReal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#365973" />
                <stop offset="60%" stopColor="#243f54" />
                <stop offset="100%" stopColor="#162938" />
              </linearGradient>
            </defs>

            {/* Thân áo theo bối cảnh */}
            {isLanWorker ? (
              // Áo xanh công nhân dệt Hải Phòng (Vô sản hóa 1928 - 1930)
              <g>
                <path d="M30 340 L42 232 L74 184 L120 180 L166 184 L198 232 L210 340 Z" fill="url(#lanWorkerReal)" />
                <polygon points="102,178 120,210 138,178" fill="#fdfbf7" />
                {/* Khăn quàng đỏ thắm thắt nút có nếp rủ tự nhiên */}
                <path d="M94 182 Q120 228 146 182 Q120 205 94 182" fill="#dc2626" />
                <polygon points="116,204 124,204 126,242 120,250 114,242" fill="#b91c1c" />
                <line x1="120" y1="210" x2="120" y2="340" stroke="#12212d" strokeWidth="2" />
              </g>
            ) : (
              // Áo dài lụa trắng nữ sinh Hà Nội thanh lịch
              <g>
                <path d="M32 340 L44 232 L76 184 L120 180 L164 184 L196 232 L208 340 Z" fill="url(#lanAoDaiReal)" />
                {/* Cổ áo dài cao truyền thống 3 phân */}
                <path d="M102 170 Q120 186 138 170" stroke="#ca8a04" strokeWidth="2" fill="none" />
                {/* Hàng khuy bấm lượn sườn phải với cúc ngọc trai lấp lánh */}
                <path d="M120 180 Q138 195 142 245" stroke="#ca8a04" strokeWidth="1.2" fill="none" strokeDasharray="3,3" />
                <circle cx="123" cy="184" r="1.5" fill="#ffffff" />
                <circle cx="130" cy="194" r="1.5" fill="#ffffff" />
                <circle cx="136" cy="208" r="1.5" fill="#ffffff" />
                <circle cx="140" cy="226" r="1.5" fill="#ffffff" />
              </g>
            )}

            {/* Cổ thanh tú */}
            <path d="M108 142 L108 180 L132 180 L132 142 Z" fill="url(#lanSkinReal)" />
            <ellipse cx="120" cy="147" rx="16" ry="5.5" fill="#9e663e" opacity="0.35" />

            {/* Mái tóc dài đen tuyền buông rủ sau lưng */}
            <path d="M79 90 C73 140 68 190 75 235 C83 190 81 135 87 104 Z" fill="url(#lanHairReal)" />
            <path d="M161 90 C167 140 172 190 165 235 C157 190 159 135 153 104 Z" fill="url(#lanHairReal)" />

            {/* Khuôn mặt trái xoan thanh tú của thiếu nữ Hà Nội */}
            <path
              d="M86 94 C84 60 156 60 154 94 C154 126 136 146 120 146 C104 146 86 126 86 94 Z"
              fill="url(#lanSkinReal)"
            />

            {/* Tóc trước và trâm cài tóc tinh nhã */}
            <path
              d="M83 86 C79 44 161 44 157 86 C151 60 138 50 120 50 C102 50 89 60 83 86 Z"
              fill="url(#lanHairReal)"
            />
            {/* Cài tóc màu đỏ thắm với hoa nhỏ */}
            <path d="M91 66 Q120 56 149 66" stroke="#dc2626" strokeWidth="2.8" fill="none" />
            <circle cx="145" cy="67" r="3.8" fill="#f59e0b" />
            <circle cx="145" cy="67" r="1.5" fill="#ffffff" />

            {/* Sống mũi thon gọn thanh tú */}
            <path d="M120 94 L119 113 L122 115" stroke="#9e663e" strokeWidth="1.6" fill="none" strokeLinecap="round" />

            {/* Cụm biểu cảm hoàn chỉnh cho Lan (Bảo toàn đầy đủ data-testid) */}
            {expression === "lo-lang" ? (
              <g data-testid="expr-lo-lang">
                <path d="M93 92 Q105 96 115 94" stroke="#1f120a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M125 94 Q135 96 147 92" stroke="#1f120a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-lan">
                  <path d="M96 99 Q106 93 116 99 Q106 106 96 99 Z" fill="#fcf9f4" />
                  <path d="M95 97 Q106 92 117 97" stroke="#1c0f08" strokeWidth="2.2" fill="none" />
                  <circle cx="106" cy="99" r="4.3" fill="url(#lanIrisReal)" />
                  <circle cx="106" cy="99" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="104.8" cy="97.4" r="1.4" fill="#ffffff" />
                  <path d="M124 99 Q134 93 144 99 Q134 106 124 99 Z" fill="#fcf9f4" />
                  <path d="M123 97 Q134 92 145 97" stroke="#1c0f08" strokeWidth="2.2" fill="none" />
                  <circle cx="134" cy="99" r="4.3" fill="url(#lanIrisReal)" />
                  <circle cx="134" cy="99" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="132.8" cy="97.4" r="1.4" fill="#ffffff" />
                </g>
                <ellipse cx="100" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.22" />
                <ellipse cx="140" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.22" />
                <path d="M114 130 Q120 126 126 130" stroke="#991b1b" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            ) : expression === "quyet-tam" ? (
              <g data-testid="expr-quyet-tam">
                <path d="M93 96 Q105 90 116 87" stroke="#1f120a" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M124 87 Q135 90 147 96" stroke="#1f120a" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-lan">
                  <path d="M96 98 Q106 93 116 98 Q106 104 96 98 Z" fill="#fcf9f4" />
                  <path d="M95 96 Q106 91 117 96" stroke="#1c0f08" strokeWidth="2.6" fill="none" />
                  <circle cx="106" cy="98.5" r="4.4" fill="url(#lanIrisReal)" />
                  <circle cx="106" cy="98.5" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="104.8" cy="96.8" r="1.6" fill="#ffffff" />
                  <path d="M124 98 Q134 93 144 98 Q134 104 124 98 Z" fill="#fcf9f4" />
                  <path d="M123 96 Q134 91 145 96" stroke="#1c0f08" strokeWidth="2.6" fill="none" />
                  <circle cx="134" cy="98.5" r="4.4" fill="url(#lanIrisReal)" />
                  <circle cx="134" cy="98.5" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="132.8" cy="96.8" r="1.6" fill="#ffffff" />
                </g>
                <ellipse cx="100" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.18" />
                <ellipse cx="140" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.18" />
                <line x1="113" y1="128" x2="127" y2="128" stroke="#991b1b" strokeWidth="2.4" strokeLinecap="round" />
              </g>
            ) : expression === "vui" ? (
              <g data-testid="expr-vui">
                <path d="M93 92 Q105 87 115 91" stroke="#1f120a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M125 91 Q135 87 147 92" stroke="#1f120a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                {/* Đôi mắt cười long lanh */}
                <g className="vn-eye-blink-lan">
                  <path d="M96 98 Q106 93 116 99 Q106 104 96 98 Z" fill="#fcf9f4" />
                  <path d="M95 96 Q106 91 117 96" stroke="#1c0f08" strokeWidth="2.4" fill="none" />
                  <circle cx="106" cy="98" r="4.2" fill="url(#lanIrisReal)" />
                  <circle cx="106" cy="98" r="2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="104.8" cy="96.5" r="1.5" fill="#ffffff" />
                  <path d="M124 99 Q134 93 144 98 Q134 104 124 99 Z" fill="#fcf9f4" />
                  <path d="M123 96 Q134 91 145 96" stroke="#1c0f08" strokeWidth="2.4" fill="none" />
                  <circle cx="134" cy="98" r="4.2" fill="url(#lanIrisReal)" />
                  <circle cx="134" cy="98" r="2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="132.8" cy="96.5" r="1.5" fill="#ffffff" />
                </g>
                {/* Má lúm đồng tiền duyên dáng */}
                <ellipse cx="100" cy="114" rx="9" ry="4.5" fill="#f43f5e" opacity="0.28" />
                <ellipse cx="140" cy="114" rx="9" ry="4.5" fill="#f43f5e" opacity="0.28" />
                <circle cx="98" cy="122" r="1.2" fill="#e11d48" opacity="0.5" />
                <circle cx="142" cy="122" r="1.2" fill="#e11d48" opacity="0.5" />
                {/* Nụ cười duyên dáng hé mở */}
                <path d="M113 126 Q120 135 127 126 Z" fill="#b91c1c" stroke="#991b1b" strokeWidth="1.2" />
                <path d="M115 127 Q120 130 125 127" fill="#ffffff" />
              </g>
            ) : (
              <g data-testid="expr-binh-thuong">
                <path d="M93 93 Q105 88 115 92" stroke="#1f120a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M125 92 Q135 88 147 93" stroke="#1f120a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-lan">
                  <path d="M96 98 Q106 93 116 98 Q106 105 96 98 Z" fill="#fcf9f4" />
                  <path d="M95 96 Q106 91 117 96" stroke="#1c0f08" strokeWidth="2.2" fill="none" />
                  <circle cx="106" cy="98.5" r="4.3" fill="url(#lanIrisReal)" />
                  <circle cx="106" cy="98.5" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="104.8" cy="96.8" r="1.4" fill="#ffffff" />
                  <circle cx="108" cy="100" r="0.7" fill="#ffffff" opacity="0.85" />
                  <path d="M124 98 Q134 93 144 98 Q134 105 124 98 Z" fill="#fcf9f4" />
                  <path d="M123 96 Q134 91 145 96" stroke="#1c0f08" strokeWidth="2.2" fill="none" />
                  <circle cx="134" cy="98.5" r="4.3" fill="url(#lanIrisReal)" />
                  <circle cx="134" cy="98.5" r="2.2" fill="#000000" />
                  <circle className="vn-eye-shimmer" cx="132.8" cy="96.8" r="1.4" fill="#ffffff" />
                  <circle cx="136" cy="100" r="0.7" fill="#ffffff" opacity="0.85" />
                </g>
                <ellipse cx="100" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.22" />
                <ellipse cx="140" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.22" />
                {/* Nụ cười duyên dáng thanh tú */}
                <path d="M114 127 Q120 132 126 127" stroke="#b91c1c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* =========================================================================
          4. BÁC TƯ - THỢ MÁY NAM KỲ PHONG TRẦN (CÓ KHĂN RẰN NAM BỘ)
          Gương mặt chữ điền rắn rỏi, ria mép muối tiêu, khăn rằn sọc caro quàng cổ
          ========================================================================= */}
      {characterId === "bac-tu" && (
        <div className="relative w-64 h-96 sm:w-72 sm:h-[420px] flex flex-col items-center">
          <svg viewBox="0 0 240 340" className="w-full h-full drop-shadow-2xl">
            <defs>
              {/* Làn da bánh mật đượm nắng gió biển cả */}
              <radialGradient id="tuSkinReal" cx="44%" cy="38%" r="62%">
                <stop offset="0%" stopColor="#fef0e0" />
                <stop offset="50%" stopColor="#e2bc94" />
                <stop offset="82%" stopColor="#bf8e62" />
                <stop offset="100%" stopColor="#9a6c42" />
              </radialGradient>
              <linearGradient id="tuVestReal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3d4c5c" />
                <stop offset="60%" stopColor="#243240" />
                <stop offset="100%" stopColor="#131e28" />
              </linearGradient>
              {/* Pattern Khăn rằn Nam Bộ sọc caro đen trắng truyền thống */}
              <pattern id="khanRanPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#f3f4f6" />
                <rect width="5" height="5" fill="#1f2937" />
                <rect x="5" y="5" width="5" height="5" fill="#1f2937" />
              </pattern>
            </defs>

            {/* Thân áo thợ máy viễn dương dày dặn */}
            <path d="M22 340 L34 232 L68 184 L120 180 L172 184 L206 232 L218 340 Z" fill="url(#tuVestReal)" />
            {/* Đệm vai da chịu lực có đinh tán đồng */}
            <path d="M34 232 L68 184 L90 200 L56 250 Z" fill="#78350f" opacity="0.9" />
            <circle cx="58" cy="215" r="2.5" fill="#ca8a04" stroke="#451a03" strokeWidth="0.8" />
            <circle cx="72" cy="198" r="2.5" fill="#ca8a04" stroke="#451a03" strokeWidth="0.8" />

            {/* Quai đeo túi da đồ nghề vắt chéo ngực có đường chỉ khâu */}
            <path d="M60 190 L176 340" stroke="#78350f" strokeWidth="13" strokeLinecap="round" />
            <path d="M60 190 L176 340" stroke="#fef08a" strokeWidth="1" strokeDasharray="4,3" opacity="0.75" />
            <rect x="110" y="254" width="16" height="20" rx="3" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />

            {/* CHIẾC KHĂN RẰN NAM BỘ SỌC CARO QUÀNG CỔ ĐẶC TRƯNG PHƯƠNG NAM */}
            <g id="khan-ran-nam-bo">
              {/* Vòng khăn quấn quanh cổ */}
              <path
                d="M84 172 Q120 200 156 172 Q164 196 150 206 Q120 220 90 206 Q76 196 84 172 Z"
                fill="url(#khanRanPattern)"
                stroke="#1f2937"
                strokeWidth="1.5"
              />
              {/* Dải khăn rằn rủ xuống ngực bên trái */}
              <path
                d="M96 200 L90 290 L108 290 L112 205 Z"
                fill="url(#khanRanPattern)"
                stroke="#1f2937"
                strokeWidth="1.2"
              />
              {/* Tua rua ở đuôi khăn */}
              <line x1="90" y1="290" x2="90" y2="296" stroke="#374151" strokeWidth="1.5" />
              <line x1="94" y1="290" x2="94" y2="297" stroke="#374151" strokeWidth="1.5" />
              <line x1="98" y1="290" x2="98" y2="296" stroke="#374151" strokeWidth="1.5" />
              <line x1="102" y1="290" x2="102" y2="297" stroke="#374151" strokeWidth="1.5" />
              <line x1="106" y1="290" x2="106" y2="296" stroke="#374151" strokeWidth="1.5" />
            </g>

            {/* Cổ vạm vỡ của người thợ già */}
            <path d="M104 140 L104 175 L136 175 L136 140 Z" fill="url(#tuSkinReal)" />
            <ellipse cx="120" cy="147" rx="20" ry="7" fill="#8c5a32" opacity="0.45" />

            {/* Khuôn mặt chữ điền rắn rỏi, từng trải */}
            <path
              d="M82 94 C80 58 160 58 158 94 C158 128 140 148 120 148 C100 148 82 128 82 94 Z"
              fill="url(#tuSkinReal)"
            />

            {/* Mái tóc muối tiêu từng trải */}
            <path
              d="M77 85 C73 42 167 42 163 85 C157 58 140 48 120 48 C96 48 82 58 77 85 Z"
              fill="#374151"
            />
            {/* Vài sợi tóc bạc điểm hoa râm */}
            <path d="M85 68 Q120 54 155 68" stroke="#d1d5db" strokeWidth="1.8" fill="none" opacity="0.85" />
            <path d="M79 80 Q96 70 110 76" stroke="#f3f4f6" strokeWidth="1.4" fill="none" opacity="0.7" />

            {/* Ria mép muối tiêu rậm rạp của người lao động Nam Kỳ */}
            <path d="M100 119 Q120 115 140 119 Q120 128 100 119" fill="#1f2937" />
            <path d="M104 119 Q120 116 136 119" stroke="#9ca3af" strokeWidth="1" fill="none" />

            {/* Sống mũi to khỏe khoắn */}
            <path d="M120 94 L117 113 L123 114" stroke="#8c5a32" strokeWidth="2.2" fill="none" strokeLinecap="round" />

            {/* Cụm biểu cảm hoàn chỉnh cho Bác Tư (Bảo toàn đầy đủ data-testid) */}
            {expression === "lo-lang" ? (
              <g data-testid="expr-lo-lang">
                <path d="M91 91 Q105 95 116 93" stroke="#111827" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M124 93 Q135 95 149 91" stroke="#111827" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-bactu">
                  <ellipse cx="106" cy="99" rx="5" ry="4" fill="#ffffff" />
                  <circle cx="106" cy="99" r="2.8" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="97.5" r="1" fill="#ffffff" />
                  <ellipse cx="134" cy="99" rx="5" ry="4" fill="#ffffff" />
                  <circle cx="134" cy="99" r="2.8" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="97.5" r="1" fill="#ffffff" />
                </g>
                <path d="M112 131 Q120 127 128 131" stroke="#54331a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              </g>
            ) : expression === "quyet-tam" ? (
              <g data-testid="expr-quyet-tam">
                <path d="M91 95 Q105 89 117 86" stroke="#111827" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M123 86 Q135 89 149 95" stroke="#111827" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-bactu">
                  <ellipse cx="106" cy="98" rx="5" ry="3.8" fill="#ffffff" />
                  <circle cx="106" cy="98" r="3" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="96.8" r="1.2" fill="#ffffff" />
                  <ellipse cx="134" cy="98" rx="5" ry="3.8" fill="#ffffff" />
                  <circle cx="134" cy="98" r="3" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="96.8" r="1.2" fill="#ffffff" />
                </g>
                <line x1="112" y1="130" x2="128" y2="130" stroke="#54331a" strokeWidth="2.6" strokeLinecap="round" />
              </g>
            ) : expression === "vui" ? (
              <g data-testid="expr-vui">
                <path d="M91 92 Q105 87 116 91" stroke="#111827" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M124 91 Q135 87 149 92" stroke="#111827" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                {/* Đôi mắt cười híp hào sảng của người già Nam Bộ */}
                <g className="vn-eye-blink-bactu">
                  <path d="M100 99 Q106 94 112 99" stroke="#111827" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                  <path d="M128 99 Q134 94 140 99" stroke="#111827" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                </g>
                {/* Nếp nhăn đuôi mắt sâu */}
                <line x1="97" y1="96" x2="92" y2="95" stroke="#784724" strokeWidth="1.6" />
                <line x1="97" y1="100" x2="91" y2="101" stroke="#784724" strokeWidth="1.6" />
                <line x1="143" y1="96" x2="148" y2="95" stroke="#784724" strokeWidth="1.6" />
                <line x1="143" y1="100" x2="149" y2="101" stroke="#784724" strokeWidth="1.6" />
                {/* Nụ cười hào sảng đôn hậu */}
                <path d="M112 129 Q120 136 128 129" stroke="#54331a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
              </g>
            ) : (
              <g data-testid="expr-binh-thuong">
                <path d="M91 93 Q105 89 116 93" stroke="#111827" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M124 93 Q135 89 149 93" stroke="#111827" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-bactu">
                  <ellipse cx="106" cy="98" rx="5" ry="4" fill="#ffffff" />
                  <circle cx="106" cy="98" r="2.8" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="96.8" r="1" fill="#ffffff" />
                  <ellipse cx="134" cy="98" rx="5" ry="4" fill="#ffffff" />
                  <circle cx="134" cy="98" r="2.8" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="96.8" r="1" fill="#ffffff" />
                </g>
                <line x1="97" y1="96" x2="93" y2="95" stroke="#784724" strokeWidth="1.4" />
                <line x1="97" y1="100" x2="92" y2="101" stroke="#784724" strokeWidth="1.4" />
                <line x1="143" y1="96" x2="147" y2="95" stroke="#784724" strokeWidth="1.4" />
                <line x1="143" y1="100" x2="148" y2="101" stroke="#784724" strokeWidth="1.4" />
                <path d="M112 130 Q120 134 128 130" stroke="#54331a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* =========================================================================
          5. BẠN THỢ ẢNH & THỢ VIỆT KIỀU PARIS
          Bạn thợ ảnh: Kính đồi mồi, mũ nồi Beret, máy ảnh hộp xếp cổ điển
          Thợ Việt kiều: Áo dạ ấm công nhân, phong thái giác ngộ cách mạng
          ========================================================================= */}
      {(characterId === "ban-tho-anh" || characterId === "tho-viet-kieu") && (
        <div className="relative w-64 h-96 sm:w-72 sm:h-[420px] flex flex-col items-center">
          <svg viewBox="0 0 240 340" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="workerSkinReal" cx="44%" cy="38%" r="62%">
                <stop offset="0%" stopColor="#fff8f2" />
                <stop offset="50%" stopColor="#f5ddc5" />
                <stop offset="82%" stopColor="#dbb08c" />
                <stop offset="100%" stopColor="#bf8f67" />
              </radialGradient>
              <linearGradient id="beretReal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="60%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Thân áo dạ mùa đông Paris */}
            <path d="M26 340 L38 232 L70 184 L120 180 L170 184 L202 232 L214 340 Z" fill="#2d221b" />
            <polygon points="100,172 120,218 140,172" fill="#faf7f2" stroke="#ddd1c3" strokeWidth="1" />

            {/* Phân biệt đạo cụ: Chỉ Bạn thợ ảnh mới có dây da máy ảnh hộp xếp cổ điển */}
            {characterId === "ban-tho-anh" && (
              <g id="folding-camera-strap">
                <line x1="56" y1="208" x2="184" y2="340" stroke="#78350f" strokeWidth="6.5" />
                <line x1="56" y1="208" x2="184" y2="340" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3,2" />
                {/* Hộp máy ảnh xếp đặt ở hông */}
                <rect x="150" y="300" width="38" height="40" rx="3" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
                <circle cx="169" cy="320" r="10" fill="#292524" stroke="#ca8a04" strokeWidth="1.5" />
                <circle cx="169" cy="320" r="5" fill="#0c0a09" />
              </g>
            )}

            {/* Cổ */}
            <path d="M106 140 L106 180 L134 180 L134 140 Z" fill="url(#workerSkinReal)" />

            {/* Khuôn mặt thanh niên trí thức/thợ ảnh kiều bào */}
            <path
              d="M84 94 C82 58 158 58 156 94 C156 128 138 148 120 148 C102 148 84 128 84 94 Z"
              fill="url(#workerSkinReal)"
            />

            {/* Mũ nồi Beret Pháp đặc trưng phong cách kiều bào Paris */}
            <path
              d="M64 78 C58 40 180 34 176 72 C176 86 156 90 120 88 C84 88 64 84 64 78 Z"
              fill="url(#beretReal)"
            />
            <circle cx="120" cy="40" r="3.5" fill="#0f172a" />

            {/* Kính gọng tròn đồi mồi 3D có ve kính và gọng tai */}
            <circle cx="106" cy="98" r="10.5" stroke="#ca8a04" strokeWidth="2.2" fill="none" opacity="0.95" />
            <circle cx="134" cy="98" r="10.5" stroke="#ca8a04" strokeWidth="2.2" fill="none" opacity="0.95" />
            <line x1="116.5" y1="98" x2="123.5" y2="98" stroke="#ca8a04" strokeWidth="2.4" />
            {/* Ánh phản quang tròng kính quang học */}
            <line x1="102" y1="92" x2="110" y2="92" stroke="#ffffff" strokeWidth="1.6" opacity="0.75" />

            {/* Cụm biểu cảm cho thợ ảnh / kiều bào */}
            {expression === "lo-lang" ? (
              <g data-testid="expr-lo-lang">
                <path d="M92 90 Q105 95 116 93" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M124 93 Q135 95 148 90" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink">
                  <circle cx="106" cy="98" r="3.6" fill="#1e293b" />
                  <circle className="vn-eye-shimmer" cx="105" cy="96.5" r="1.2" fill="#ffffff" />
                  <circle cx="134" cy="98" r="3.6" fill="#1e293b" />
                  <circle className="vn-eye-shimmer" cx="133" cy="96.5" r="1.2" fill="#ffffff" />
                </g>
                <path d="M114 130 Q120 125 126 130" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            ) : (
              <g data-testid="expr-binh-thuong">
                <path d="M92 92 Q105 87 116 91" stroke="#1e293b" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M124 91 Q135 87 148 92" stroke="#1e293b" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink">
                  <circle cx="106" cy="98" r="3.5" fill="#1e293b" />
                  <circle className="vn-eye-shimmer" cx="105" cy="96.8" r="1.2" fill="#ffffff" />
                  <circle cx="134" cy="98" r="3.5" fill="#1e293b" />
                  <circle className="vn-eye-shimmer" cx="133" cy="96.8" r="1.2" fill="#ffffff" />
                </g>
                <path d="M113 128 Q120 133 127 128" stroke="#78350f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* Sống mũi */}
            <path d="M120 94 L118 113 L123 115" stroke="#9e663e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
};
