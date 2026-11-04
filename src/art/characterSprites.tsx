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
          ? "scale-100 opacity-100 filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.9)]"
          : "scale-95 opacity-80"
      }`}
    >
      {/* 1. LÃNH TỤ NGUYỄN ÁI QUỐC - CHÂN DUNG MINH HOẠ LỊCH SỬ TRANG NGHIÊM (1920 PARIS / TOURS) */}
      {characterId === "nguyen-ai-quoc" && (
        <div className="relative w-64 h-96 sm:w-72 sm:h-[420px] flex flex-col items-center">
          <svg viewBox="0 0 240 340" className="w-full h-full drop-shadow-2xl">
            <defs>
              {/* Làn da ánh ngà sang trọng với khối đổ bóng chân thực */}
              <radialGradient id="naqSkinReal" cx="42%" cy="36%" r="65%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="55%" stopColor="#f5ddc5" />
                <stop offset="85%" stopColor="#e2be9b" />
                <stop offset="100%" stopColor="#c79972" />
              </radialGradient>
              {/* Ánh mắt sáng ngời nhân hậu và kiên định */}
              <radialGradient id="naqIrisReal" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#543725" />
                <stop offset="60%" stopColor="#29180d" />
                <stop offset="100%" stopColor="#0f0703" />
              </radialGradient>
              {/* Mái tóc đen chải mượt phong thái trí thức yêu nước thập niên 1920 */}
              <linearGradient id="naqHairReal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3c3028" />
                <stop offset="35%" stopColor="#1e1612" />
                <stop offset="100%" stopColor="#0b0806" />
              </linearGradient>
              {/* Bộ Âu phục len dạ Pháp cắt may chuẩn mực */}
              <linearGradient id="naqSuitReal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#382e27" />
                <stop offset="50%" stopColor="#221b16" />
                <stop offset="100%" stopColor="#120e0b" />
              </linearGradient>
              {/* Cà vạt đỏ thẫm cách mạng */}
              <linearGradient id="naqTieReal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#991b1b" />
                <stop offset="45%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>
              {/* Ánh sáng ven vàng kim (Golden Rim Light) */}
              <linearGradient id="naqRimLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="30%" stopColor="#f59e0b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Hào quang ánh sáng rực rỡ cách mạng phía sau */}
            <circle cx="120" cy="115" r="95" fill="#c8a24a" opacity="0.16" />
            <circle cx="120" cy="115" r="80" fill="#f59e0b" opacity="0.10" />

            {/* Thân áo vest Tây âu - Tỉ lệ vai người lớn thanh thoát */}
            <path
              d="M28 340 L38 235 L70 185 L120 180 L170 185 L202 235 L212 340 Z"
              fill="url(#naqSuitReal)"
            />
            {/* Vạt áo và nếp gấp vải dạ len */}
            <path d="M70 185 L98 260 L120 340 L142 260 L170 185" fill="#181310" opacity="0.8" />

            {/* Áo sơ mi trắng cổ cao đứng dáng (High winged collar) */}
            <polygon points="102,175 120,222 138,175 120,186" fill="#fdfbf7" />
            <polygon points="108,177 120,215 132,177" fill="#ebe4d8" />

            {/* Cà vạt đỏ son lịch lãm */}
            <polygon points="116,186 124,186 127,250 120,265 113,250" fill="url(#naqTieReal)" />
            <line x1="120" y1="188" x2="120" y2="255" stroke="#ef4444" strokeWidth="1" opacity="0.6" />

            {/* Ve áo vest hai bên tạo chiều sâu lập thể 3D */}
            <polygon points="44,230 72,185 106,248 80,285" fill="#29201a" />
            <polygon points="196,230 168,185 134,248 160,285" fill="#29201a" />
            {/* Đường may và túi áo ngực */}
            <line x1="62" y1="245" x2="88" y2="242" stroke="#4a3b32" strokeWidth="1.8" />
            <rect x="66" y="240" width="16" height="5" fill="#fdfbf7" opacity="0.8" rx="1" />

            {/* Cổ và thanh quản tạo khối trang nghiêm */}
            <path d="M106 142 L106 182 L134 182 L134 142 Z" fill="url(#naqSkinReal)" />
            <path d="M112 152 Q120 162 128 152" stroke="#b4835a" strokeWidth="1.5" fill="none" opacity="0.5" />
            {/* Đổ bóng cằm sắc nét */}
            <ellipse cx="120" cy="148" rx="20" ry="7" fill="#ad764d" opacity="0.45" />

            {/* Khuôn mặt thanh tú, xương quai hàm sắc sảo (Proportional Head) */}
            <path
              d="M84 95 C82 60 158 60 156 95 C156 128 138 148 120 148 C102 148 84 128 84 95 Z"
              fill="url(#naqSkinReal)"
            />

            {/* Tai hai bên tinh tế */}
            <path d="M83 95 Q80 108 84 120 Q86 110 85 98 Z" fill="#e2be9b" />
            <path d="M157 95 Q160 108 156 120 Q154 110 155 98 Z" fill="#e2be9b" />

            {/* Mái tóc thanh nhã rẽ ngôi trí thức thời trẻ */}
            <path
              d="M80 88 C76 45 164 42 160 88 C158 65 145 52 120 52 C95 52 82 65 80 88 Z"
              fill="url(#naqHairReal)"
            />
            {/* Lọn tóc tạo khối tự nhiên */}
            <path d="M80 88 C78 110 86 118 86 118 C83 100 87 90 94 82 Z" fill="#140f0c" />
            <path d="M160 88 C162 110 154 118 154 118 C157 100 153 90 146 82 Z" fill="#140f0c" />
            {/* Ánh sáng bóng trên tóc (Hair Specular Highlight) */}
            <path d="M96 66 Q120 56 144 66" stroke="#5c483c" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.65" />

            {/* Vầng trán cao thông tuệ */}
            <path d="M96 74 Q120 70 144 74" stroke="#e8caa8" strokeWidth="1.2" fill="none" opacity="0.5" />

            {/* Đôi mắt sáng ngời nhân ái, tầm nhìn xuyên thời đại với nhịp chớp tự nhiên và ánh sáng lấp lánh */}
            <g className="vn-eye-blink">
              {/* Mắt trái */}
              <path d="M96 98 Q107 94 115 99 Q107 105 96 98 Z" fill="#ffffff" />
              <circle cx="107" cy="98.5" r="4.2" fill="url(#naqIrisReal)" />
              <circle className="vn-eye-shimmer" cx="105.8" cy="97" r="1.5" fill="#ffffff" />
              <circle cx="108.5" cy="100" r="0.8" fill="#ffffff" opacity="0.8" />
              <path d="M94 93 Q106 87 116 93" stroke="#26170d" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <path d="M96 96 Q107 92 115 97" stroke="#8c5835" strokeWidth="1" fill="none" opacity="0.6" />

              {/* Mắt phải */}
              <path d="M125 99 Q133 94 144 98 Q133 105 125 99 Z" fill="#ffffff" />
              <circle cx="133" cy="98.5" r="4.2" fill="url(#naqIrisReal)" />
              <circle className="vn-eye-shimmer" cx="131.8" cy="97" r="1.5" fill="#ffffff" />
              <circle cx="134.5" cy="100" r="0.8" fill="#ffffff" opacity="0.8" />
              <path d="M124 93 Q134 87 146 93" stroke="#26170d" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              <path d="M125 97 Q133 92 144 96" stroke="#8c5835" strokeWidth="1" fill="none" opacity="0.6" />
            </g>

            {/* Chiều sâu gò má */}
            <ellipse cx="102" cy="115" rx="7" ry="3.5" fill="#c79972" opacity="0.22" />
            <ellipse cx="138" cy="115" rx="7" ry="3.5" fill="#c79972" opacity="0.22" />

            {/* Sống mũi cao thanh thoát */}
            <path d="M120 95 L118 114 L123 116" stroke="#ad7247" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <ellipse cx="116" cy="116" rx="2" ry="1.2" fill="#ad7247" opacity="0.6" />

            {/* Nụ cười kiên nghị, bao dung */}
            <path d="M112 128 Q120 134 128 128" stroke="#8c3d28" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M116 135 Q120 137 124 135" stroke="#b47852" strokeWidth="1.2" fill="none" opacity="0.5" />

            {/* Ánh sáng ven vàng kim tôn nghiêm phía bên trái */}
            <path
              d="M78 88 C74 45 120 42 120 42 C95 42 76 65 74 120 L34 235 L26 340"
              stroke="url(#naqRimLight)"
              strokeWidth="3.5"
              fill="none"
              opacity="0.85"
            />
          </svg>
        </div>
      )}

      {/* 2. MINH - THANH NIÊN YÊU NƯỚC (CHÂN DUNG TỶ LỆ CHUẨN VISUAL NOVEL) */}
      {characterId === "minh" && (
        <div className="relative w-64 h-96 sm:w-72 sm:h-[420px] flex flex-col items-center">
          <svg viewBox="0 0 240 340" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="minhSkinReal" cx="42%" cy="36%" r="65%">
                <stop offset="0%" stopColor="#fff8f0" />
                <stop offset="55%" stopColor="#f7dec6" />
                <stop offset="85%" stopColor="#e2bc98" />
                <stop offset="100%" stopColor="#c5946c" />
              </radialGradient>
              <radialGradient id="minhIrisReal" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#5c4028" />
                <stop offset="60%" stopColor="#2c1a0e" />
                <stop offset="100%" stopColor="#120803" />
              </radialGradient>
              <linearGradient id="minhHairReal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#453328" />
                <stop offset="40%" stopColor="#241a13" />
                <stop offset="100%" stopColor="#0f0a07" />
              </linearGradient>
              <linearGradient id="minhGileReal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4c392c" />
                <stop offset="50%" stopColor="#31231a" />
                <stop offset="100%" stopColor="#1c130d" />
              </linearGradient>
              <linearGradient id="minhPeasant" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6e4f3a" />
                <stop offset="50%" stopColor="#543b2a" />
                <stop offset="100%" stopColor="#382518" />
              </linearGradient>
            </defs>

            {/* Trang phục theo thời kỳ lịch sử */}
            {isMinhOlder ? (
              // Minh Kỳ 1-2: Áo gile thanh niên trí thức thập niên 1920
              <g>
                <path d="M28 340 L38 235 L70 185 L120 180 L170 185 L202 235 L212 340 Z" fill="url(#minhGileReal)" />
                {/* Áo sơ mi trắng cổ bẻ bên trong */}
                <polygon points="102,175 120,225 138,175" fill="#fdfbf7" />
                <polygon points="114,185 120,240 126,185" fill="#991b1b" />
                {/* Đường may vạt áo gile và cúc đồng */}
                <line x1="120" y1="235" x2="120" y2="340" stroke="#1f1610" strokeWidth="2.5" />
                <circle cx="112" cy="255" r="3" fill="#ca8a04" stroke="#a16207" strokeWidth="0.8" />
                <circle cx="128" cy="255" r="3" fill="#ca8a04" stroke="#a16207" strokeWidth="0.8" />
                <circle cx="112" cy="285" r="3" fill="#ca8a04" stroke="#a16207" strokeWidth="0.8" />
                <circle cx="128" cy="285" r="3" fill="#ca8a04" stroke="#a16207" strokeWidth="0.8" />
                {/* Dây xích đồng hồ quả quýt */}
                <path d="M128 285 Q145 295 155 280" stroke="#ca8a04" strokeWidth="1.8" fill="none" />
              </g>
            ) : (
              // Minh Kỳ 0: Áo nâu sồng mộc mạc người phụ bếp trên tàu buôn
              <g>
                <path d="M28 340 L38 235 L70 185 L120 180 L170 185 L202 235 L212 340 Z" fill="url(#minhPeasant)" />
                <path d="M98 178 Q120 205 142 178" fill="#efe4d6" />
                <path d="M116 195 L116 340" stroke="#332115" strokeWidth="3" />
                {/* Nút cài áo vải truyền thống */}
                <circle cx="116" cy="225" r="3" fill="#332115" />
                <circle cx="116" cy="260" r="3" fill="#332115" />
                <circle cx="116" cy="295" r="3" fill="#332115" />
              </g>
            )}

            {/* Cổ và cơ cổ thanh niên vững chãi */}
            <path d="M106 142 L106 182 L134 182 L134 142 Z" fill="url(#minhSkinReal)" />
            <ellipse cx="120" cy="148" rx="18" ry="6" fill="#aa7248" opacity="0.4" />

            {/* Khuôn mặt thanh niên trẻ trung, cương trực (Proportional Realistic Head) */}
            <path
              d="M84 94 C82 60 158 60 156 94 C156 128 138 148 120 148 C102 148 84 128 84 94 Z"
              fill="url(#minhSkinReal)"
            />

            {/* Tai hai bên */}
            <path d="M83 95 Q80 108 84 120 Q86 110 85 98 Z" fill="#e2bc98" />
            <path d="M157 95 Q160 108 156 120 Q154 110 155 98 Z" fill="#e2bc98" />

            {/* Mái tóc bồng bềnh thanh niên thời đại */}
            <path
              d="M82 86 C78 44 162 42 158 86 C152 60 138 52 118 52 C94 52 84 62 82 86 Z"
              fill="url(#minhHairReal)"
            />
            <path d="M82 86 Q78 104 88 112 Q83 94 92 84" fill="#1b120c" />
            <path d="M158 86 Q162 104 152 112 Q157 94 148 84" fill="#1b120c" />
            {/* Lọn tóc trán */}
            <path d="M88 78 Q115 58 134 68" stroke="#684e3c" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />

            {/* Sống mũi thanh niên */}
            <path d="M120 95 L118 114 L123 116" stroke="#aa7248" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Expression Features for Minh (Bảo toàn 3 data-testid) */}
            {expression === "lo-lang" ? (
              <g data-testid="expr-lo-lang">
                {/* Lông mày nhíu lo lắng */}
                <path d="M92 92 Q105 97 116 94" stroke="#241710" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                <path d="M124 94 Q135 97 148 92" stroke="#241710" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                {/* Đôi mắt mở to căng thẳng có nhịp chớp */}
                <g className="vn-eye-blink">
                  <path d="M96 99 Q106 94 115 99 Q106 106 96 99 Z" fill="#ffffff" />
                  <circle cx="106" cy="99" r="4.2" fill="url(#minhIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="97.5" r="1.4" fill="#ffffff" />
                  <path d="M125 99 Q134 94 144 99 Q134 106 125 99 Z" fill="#ffffff" />
                  <circle cx="134" cy="99" r="4.2" fill="url(#minhIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="97.5" r="1.4" fill="#ffffff" />
                </g>
                {/* Gò má căng thẳng */}
                <ellipse cx="101" cy="114" rx="7" ry="3.5" fill="#c5946c" opacity="0.3" />
                <ellipse cx="139" cy="114" rx="7" ry="3.5" fill="#c5946c" opacity="0.3" />
                {/* Môi mím chặt lo âu */}
                <path d="M113 130 Q120 126 127 130" stroke="#8c3e28" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>
            ) : expression === "quyet-tam" ? (
              <g data-testid="expr-quyet-tam">
                {/* Lông mày xếch mạnh mẽ kiên định */}
                <path d="M92 96 Q105 90 117 87" stroke="#241710" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M123 87 Q135 90 148 96" stroke="#241710" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Ánh mắt kiên cường bừng sáng có nhịp chớp */}
                <g className="vn-eye-blink">
                  <path d="M96 98 Q106 93 115 98 Q106 104 96 98 Z" fill="#ffffff" />
                  <circle cx="106" cy="98.5" r="4.4" fill="url(#minhIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="97" r="1.6" fill="#ffffff" />
                  <circle cx="107.5" cy="100" r="0.8" fill="#ffffff" opacity="0.8" />
                  <path d="M125 98 Q134 93 144 98 Q134 104 125 98 Z" fill="#ffffff" />
                  <circle cx="134" cy="98.5" r="4.4" fill="url(#minhIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="97" r="1.6" fill="#ffffff" />
                  <circle cx="135.5" cy="100" r="0.8" fill="#ffffff" opacity="0.8" />
                </g>
                {/* Gò má cương nghị */}
                <ellipse cx="101" cy="114" rx="7" ry="3.5" fill="#c5946c" opacity="0.25" />
                <ellipse cx="139" cy="114" rx="7" ry="3.5" fill="#c5946c" opacity="0.25" />
                {/* Môi mím thẳng đanh thép */}
                <line x1="112" y1="128" x2="128" y2="128" stroke="#7a2618" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            ) : (
              <g data-testid="expr-binh-thuong">
                {/* Lông mày tự nhiên */}
                <path d="M93 94 Q105 89 116 93" stroke="#241710" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M124 93 Q135 89 147 94" stroke="#241710" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Đôi mắt điềm tĩnh, sáng ngời có nhịp chớp */}
                <g className="vn-eye-blink">
                  <path d="M96 98 Q106 94 115 99 Q106 105 96 98 Z" fill="#ffffff" />
                  <circle cx="106" cy="98.5" r="4.2" fill="url(#minhIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="97" r="1.4" fill="#ffffff" />
                  <path d="M125 99 Q134 94 144 98 Q134 105 125 99 Z" fill="#ffffff" />
                  <circle cx="134" cy="98.5" r="4.2" fill="url(#minhIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="97" r="1.4" fill="#ffffff" />
                </g>
                {/* Gò má tự nhiên */}
                <ellipse cx="101" cy="114" rx="7" ry="3.5" fill="#c5946c" opacity="0.2" />
                <ellipse cx="139" cy="114" rx="7" ry="3.5" fill="#c5946c" opacity="0.2" />
                {/* Khóe miệng tự tin nhiệt huyết */}
                <path d="M113 128 Q120 133 127 128" stroke="#8c3e28" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* 3. LAN - NỮ THANH NIÊN / CÔNG NHÂN (CHÂN DUNG ÁO DÀI & ĐỒNG PHỤC VÔ SẢN HOÁ) */}
      {characterId === "lan" && (
        <div className="relative w-64 h-96 sm:w-72 sm:h-[420px] flex flex-col items-center">
          <svg viewBox="0 0 240 340" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="lanSkinReal" cx="42%" cy="36%" r="65%">
                <stop offset="0%" stopColor="#fffaf5" />
                <stop offset="55%" stopColor="#fae5d4" />
                <stop offset="85%" stopColor="#e8c2a2" />
                <stop offset="100%" stopColor="#cca17d" />
              </radialGradient>
              <radialGradient id="lanIrisReal" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#693d25" />
                <stop offset="65%" stopColor="#381c0e" />
                <stop offset="100%" stopColor="#170903" />
              </radialGradient>
              <linearGradient id="lanHairReal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#35241b" />
                <stop offset="45%" stopColor="#1c120c" />
                <stop offset="100%" stopColor="#0b0604" />
              </linearGradient>
              <linearGradient id="lanAoDaiReal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#fbf6ee" />
                <stop offset="100%" stopColor="#ede0cc" />
              </linearGradient>
              <linearGradient id="lanWorkerReal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#33536b" />
                <stop offset="60%" stopColor="#223a4d" />
                <stop offset="100%" stopColor="#142430" />
              </linearGradient>
            </defs>

            {/* Thân áo theo bối cảnh */}
            {isLanWorker ? (
              // Áo xanh công nhân dệt Hải Phòng (Vô sản hóa)
              <g>
                <path d="M32 340 L42 235 L74 185 L120 180 L166 185 L198 235 L208 340 Z" fill="url(#lanWorkerReal)" />
                <polygon points="104,180 120,208 136,180" fill="#fdfbf7" />
                {/* Khăn quàng đỏ rực rỡ */}
                <path d="M96 184 Q120 225 144 184 Q120 205 96 184" fill="#dc2626" />
                <line x1="120" y1="210" x2="120" y2="340" stroke="#162531" strokeWidth="2" />
              </g>
            ) : (
              // Áo dài lụa trắng nữ sinh Hà Nội thanh lịch
              <g>
                <path d="M34 340 L44 235 L76 185 L120 180 L164 185 L196 235 L206 340 Z" fill="url(#lanAoDaiReal)" />
                {/* Cổ áo dài cao truyền thống 3 phân */}
                <path d="M102 170 Q120 186 138 170" stroke="#ca8a04" strokeWidth="1.8" fill="none" />
                <path d="M120 180 Q138 195 142 245" stroke="#ca8a04" strokeWidth="1.2" fill="none" strokeDasharray="3,3" />
              </g>
            )}

            {/* Cổ thanh tú */}
            <path d="M108 144 L108 180 L132 180 L132 144 Z" fill="url(#lanSkinReal)" />
            <ellipse cx="120" cy="148" rx="16" ry="5" fill="#a87046" opacity="0.35" />

            {/* Mái tóc dài đen tuyền thả sau lưng */}
            <path d="M80 92 C74 140 70 190 76 235 C84 190 82 135 88 105 Z" fill="url(#lanHairReal)" />
            <path d="M160 92 C166 140 170 190 164 235 C156 190 158 135 152 105 Z" fill="url(#lanHairReal)" />

            {/* Khuôn mặt trái xoan thanh tú */}
            <path
              d="M86 94 C84 62 156 62 154 94 C154 126 136 146 120 146 C104 146 86 126 86 94 Z"
              fill="url(#lanSkinReal)"
            />

            {/* Tóc trước và trâm cài tinh nhã */}
            <path
              d="M84 88 C80 46 160 46 156 88 C150 62 138 52 120 52 C102 52 90 62 84 88 Z"
              fill="url(#lanHairReal)"
            />
            {/* Cài tóc màu đỏ thắm */}
            <path d="M92 68 Q120 58 148 68" stroke="#dc2626" strokeWidth="2.8" fill="none" />
            <circle cx="144" cy="69" r="3.5" fill="#f59e0b" />

            {/* Sống mũi thon gọn */}
            <path d="M120 95 L119 113 L122 115" stroke="#a87046" strokeWidth="1.6" fill="none" strokeLinecap="round" />

            {/* Expression Features for Lan (Bảo toàn 3 data-testid) */}
            {expression === "lo-lang" ? (
              <g data-testid="expr-lo-lang">
                <path d="M94 92 Q105 96 115 94" stroke="#22130c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M125 94 Q135 96 146 92" stroke="#22130c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-lan">
                  <path d="M97 99 Q106 94 115 99 Q106 106 97 99 Z" fill="#ffffff" />
                  <circle cx="106" cy="99" r="4.2" fill="url(#lanIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="104.8" cy="97.5" r="1.4" fill="#ffffff" />
                  <path d="M125 99 Q134 94 143 99 Q134 106 125 99 Z" fill="#ffffff" />
                  <circle cx="134" cy="99" r="4.2" fill="url(#lanIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="132.8" cy="97.5" r="1.4" fill="#ffffff" />
                </g>
                <ellipse cx="100" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.18" />
                <ellipse cx="140" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.18" />
                <path d="M114 130 Q120 126 126 130" stroke="#991b1b" strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
            ) : expression === "quyet-tam" ? (
              <g data-testid="expr-quyet-tam">
                <path d="M94 96 Q105 91 116 88" stroke="#22130c" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M124 88 Q135 91 146 96" stroke="#22130c" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-lan">
                  <path d="M97 98 Q106 93 115 98 Q106 104 97 98 Z" fill="#ffffff" />
                  <circle cx="106" cy="98.5" r="4.4" fill="url(#lanIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="104.8" cy="97" r="1.6" fill="#ffffff" />
                  <path d="M125 98 Q134 93 143 98 Q134 104 125 98 Z" fill="#ffffff" />
                  <circle cx="134" cy="98.5" r="4.4" fill="url(#lanIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="132.8" cy="97" r="1.6" fill="#ffffff" />
                </g>
                <ellipse cx="100" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.15" />
                <ellipse cx="140" cy="114" rx="8" ry="4" fill="#f43f5e" opacity="0.15" />
                <line x1="113" y1="128" x2="127" y2="128" stroke="#991b1b" strokeWidth="2.4" strokeLinecap="round" />
              </g>
            ) : (
              <g data-testid="expr-binh-thuong">
                <path d="M94 93 Q105 89 115 93" stroke="#22130c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M125 93 Q135 89 146 93" stroke="#22130c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-lan">
                  <path d="M97 98 Q106 94 115 99 Q106 105 97 98 Z" fill="#ffffff" />
                  <circle cx="106" cy="98.5" r="4.2" fill="url(#lanIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="104.8" cy="97" r="1.4" fill="#ffffff" />
                  <circle cx="108" cy="100" r="0.7" fill="#ffffff" opacity="0.8" />
                  <path d="M125 99 Q134 94 143 98 Q134 105 125 99 Z" fill="#ffffff" />
                  <circle cx="134" cy="98.5" r="4.2" fill="url(#lanIrisReal)" />
                  <circle className="vn-eye-shimmer" cx="132.8" cy="97" r="1.4" fill="#ffffff" />
                  <circle cx="136" cy="100" r="0.7" fill="#ffffff" opacity="0.8" />
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

      {/* 4. BÁC TƯ - THỢ MÁY NAM KỲ PHONG TRẦN */}
      {characterId === "bac-tu" && (
        <div className="relative w-64 h-96 sm:w-72 sm:h-[420px] flex flex-col items-center">
          <svg viewBox="0 0 240 340" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="tuSkinReal" cx="42%" cy="36%" r="65%">
                <stop offset="0%" stopColor="#fdf0e2" />
                <stop offset="55%" stopColor="#e5c09a" />
                <stop offset="85%" stopColor="#c5966c" />
                <stop offset="100%" stopColor="#a3734a" />
              </radialGradient>
              <linearGradient id="tuVestReal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3d4a58" />
                <stop offset="60%" stopColor="#25303c" />
                <stop offset="100%" stopColor="#141c24" />
              </linearGradient>
            </defs>

            {/* Thân áo thợ máy dập đinh tán và quai da */}
            <path d="M24 340 L34 235 L68 185 L120 180 L172 185 L206 235 L216 340 Z" fill="url(#tuVestReal)" />
            {/* Cổ áo len nâu lót ấm bên trong */}
            <polygon points="100,180 120,215 140,180" fill="#694e39" />
            {/* Đai đeo túi da chéo ngực đặc trưng người thợ tàu */}
            <path d="M64 195 L170 340" stroke="#78350f" strokeWidth="12" opacity="0.9" />
            <rect x="110" y="258" width="14" height="18" fill="#ca8a04" rx="2" stroke="#78350f" strokeWidth="2" />

            {/* Cổ khỏe khoắn */}
            <path d="M104 142 L104 182 L136 182 L136 142 Z" fill="url(#tuSkinReal)" />
            <ellipse cx="120" cy="148" rx="20" ry="7" fill="#8c5a32" opacity="0.45" />

            {/* Khuôn mặt chữ điền từng trải, phong trần */}
            <path
              d="M82 94 C80 60 160 60 158 94 C158 128 140 148 120 148 C100 148 82 128 82 94 Z"
              fill="url(#tuSkinReal)"
            />

            {/* Mái tóc muối tiêu từng trải */}
            <path
              d="M78 86 C74 44 166 44 162 86 C156 60 140 50 120 50 C96 50 82 60 78 86 Z"
              fill="#374151"
            />
            {/* Vài sợi bạc điểm hoa râm */}
            <path d="M86 70 Q120 56 154 70" stroke="#9ca3af" strokeWidth="1.8" fill="none" opacity="0.8" />
            <path d="M80 82 Q96 72 110 78" stroke="#d1d5db" strokeWidth="1.4" fill="none" />

            {/* Ria mép phong trần của người lao động miền Nam */}
            <path d="M102 120 Q120 117 138 120 Q120 127 102 120" fill="#2d3748" />

            {/* Sống mũi to khỏe khoắn */}
            <path d="M120 95 L117 114 L123 115" stroke="#8c5a32" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Expression Features for Bac Tu (Bảo toàn 3 data-testid) */}
            {expression === "lo-lang" ? (
              <g data-testid="expr-lo-lang">
                <path d="M92 91 Q105 95 116 93" stroke="#1f2937" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M124 93 Q135 95 148 91" stroke="#1f2937" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-bactu">
                  <ellipse cx="106" cy="99" rx="5" ry="4" fill="#ffffff" />
                  <circle cx="106" cy="99" r="2.8" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="97.5" r="1" fill="#ffffff" />
                  <ellipse cx="134" cy="99" rx="5" ry="4" fill="#ffffff" />
                  <circle cx="134" cy="99" r="2.8" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="97.5" r="1" fill="#ffffff" />
                </g>
                <path d="M112 131 Q120 127 128 131" stroke="#694426" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              </g>
            ) : expression === "quyet-tam" ? (
              <g data-testid="expr-quyet-tam">
                <path d="M92 95 Q105 89 117 86" stroke="#1f2937" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <path d="M123 86 Q135 89 148 95" stroke="#1f2937" strokeWidth="3.2" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-bactu">
                  <ellipse cx="106" cy="98" rx="5" ry="3.8" fill="#ffffff" />
                  <circle cx="106" cy="98" r="3" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="96.8" r="1.2" fill="#ffffff" />
                  <ellipse cx="134" cy="98" rx="5" ry="3.8" fill="#ffffff" />
                  <circle cx="134" cy="98" r="3" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="96.8" r="1.2" fill="#ffffff" />
                </g>
                <line x1="112" y1="130" x2="128" y2="130" stroke="#694426" strokeWidth="2.6" strokeLinecap="round" />
              </g>
            ) : (
              <g data-testid="expr-binh-thuong">
                <path d="M92 93 Q105 89 116 93" stroke="#1f2937" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <path d="M124 93 Q135 89 148 93" stroke="#1f2937" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                <g className="vn-eye-blink-bactu">
                  <ellipse cx="106" cy="98" rx="5" ry="4" fill="#ffffff" />
                  <circle cx="106" cy="98" r="2.8" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="104.5" cy="96.8" r="1" fill="#ffffff" />
                  <ellipse cx="134" cy="98" rx="5" ry="4" fill="#ffffff" />
                  <circle cx="134" cy="98" r="2.8" fill="#111827" />
                  <circle className="vn-eye-shimmer" cx="132.5" cy="96.8" r="1" fill="#ffffff" />
                </g>
                {/* Nếp nhăn đuôi mắt người lao động từng trải */}
                <line x1="97" y1="96" x2="93" y2="95" stroke="#8c5a32" strokeWidth="1.4" />
                <line x1="97" y1="100" x2="92" y2="101" stroke="#8c5a32" strokeWidth="1.4" />
                <line x1="143" y1="96" x2="147" y2="95" stroke="#8c5a32" strokeWidth="1.4" />
                <line x1="143" y1="100" x2="148" y2="101" stroke="#8c5a32" strokeWidth="1.4" />
                <path d="M112 130 Q120 134 128 130" stroke="#694426" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>
      )}

      {/* 5. BẠN THỢ ẢNH & THỢ VIỆT KIỀU PARIS (CHÂN DUNG KIỀU BÀO YÊU NƯỚC) */}
      {(characterId === "ban-tho-anh" || characterId === "tho-viet-kieu") && (
        <div className="relative w-64 h-96 sm:w-72 sm:h-[420px] flex flex-col items-center">
          <svg viewBox="0 0 240 340" className="w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="workerSkinReal" cx="42%" cy="36%" r="65%">
                <stop offset="0%" stopColor="#fff8f2" />
                <stop offset="55%" stopColor="#f5ddc5" />
                <stop offset="85%" stopColor="#dbb08c" />
                <stop offset="100%" stopColor="#bf8f67" />
              </radialGradient>
              <linearGradient id="beretReal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="60%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Thân áo dạ mùa đông Paris */}
            <path d="M28 340 L38 235 L70 185 L120 180 L170 185 L202 235 L212 340 Z" fill="#2d221b" />
            <polygon points="102,175 120,218 138,175" fill="#fdfbf7" />
            {/* Dây da máy ảnh cổ điển vắt chéo */}
            <line x1="58" y1="210" x2="182" y2="340" stroke="#78350f" strokeWidth="6" />

            {/* Cổ */}
            <path d="M106 142 L106 182 L134 182 L134 142 Z" fill="url(#workerSkinReal)" />

            {/* Khuôn mặt thanh niên trí thức/thợ ảnh */}
            <path
              d="M84 94 C82 60 158 60 156 94 C156 128 138 148 120 148 C102 148 84 128 84 94 Z"
              fill="url(#workerSkinReal)"
            />

            {/* Mũ nồi Beret Pháp đặc trưng phong cách kiều bào Paris */}
            <path
              d="M66 78 C60 42 178 36 174 72 C174 86 156 90 120 88 C84 88 66 84 66 78 Z"
              fill="url(#beretReal)"
            />
            <circle cx="120" cy="42" r="3.5" fill="#0f172a" />

            {/* Kính gọng đồi mồi trí thức của người thợ ảnh */}
            <circle cx="106" cy="98" r="10" stroke="#ca8a04" strokeWidth="2" fill="none" opacity="0.9" />
            <circle cx="134" cy="98" r="10" stroke="#ca8a04" strokeWidth="2" fill="none" opacity="0.9" />
            <line x1="116" y1="98" x2="124" y2="98" stroke="#ca8a04" strokeWidth="2" />
            {/* Ánh phản quang mắt kính */}
            <line x1="102" y1="92" x2="110" y2="92" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />

            {/* Đôi mắt tinh anh qua kính có nhịp chớp */}
            <g className="vn-eye-blink">
              <circle cx="106" cy="98" r="3.5" fill="#1e293b" />
              <circle className="vn-eye-shimmer" cx="105" cy="96.8" r="1" fill="#ffffff" />
              <circle cx="134" cy="98" r="3.5" fill="#1e293b" />
              <circle className="vn-eye-shimmer" cx="133" cy="96.8" r="1" fill="#ffffff" />
            </g>

            {/* Nụ cười ấm áp của kiều bào */}
            <path d="M120 95 L118 114 L123 115" stroke="#ad7549" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M113 128 Q120 133 127 128" stroke="#8c3e28" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
};
