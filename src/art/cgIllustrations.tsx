import React from "react";

interface CgIllustrationProps {
  assetId: string;
  className?: string;
}

export const CgIllustration: React.FC<CgIllustrationProps> = ({
  assetId,
  className = "w-full h-64 sm:h-80 md:h-96 my-2"
}) => {
  return (
    <div className={`${className} relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#0d0907] border-2 border-amber-600/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)] select-none pointer-events-none`}>
      {/* 1. cg-con-thuyen: Con thuyền giữa sóng, người cầm lái đứng vững (k1-c3) */}
      {assetId === "cg-con-thuyen" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Con thuyền giữa sóng">
          <defs>
            <linearGradient id="ctSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#081018" />
              <stop offset="40%" stopColor="#142636" />
              <stop offset="75%" stopColor="#2c3e50" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <radialGradient id="ctSun" cx="65%" cy="65%" r="60%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#b45309" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ctSeaFar" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#0a192f" />
            </linearGradient>
            <linearGradient id="ctSeaFore" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#162e4a" />
              <stop offset="100%" stopColor="#050e18" />
            </linearGradient>
            <linearGradient id="ctWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#543018" />
              <stop offset="50%" stopColor="#3d2110" />
              <stop offset="100%" stopColor="#221208" />
            </linearGradient>
            <linearGradient id="ctSail" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="60%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Dramatic storm sky */}
          <rect width="800" height="450" fill="url(#ctSky)" />

          {/* Golden revolutionary sunrise piercing the storm */}
          <circle cx="560" cy="270" r="180" fill="url(#ctSun)" />
          <polygon points="560,90 480,450 640,450" fill="#fef08a" opacity="0.12" />
          <polygon points="560,90 350,450 450,450" fill="#fef08a" opacity="0.08" />
          <polygon points="560,90 680,450 780,450" fill="#fef08a" opacity="0.08" />

          {/* Distant lightning and thunderhead clouds */}
          <path d="M0 60 Q120 40 240 70 T480 50 T720 80 T800 60 L800 240 L0 240 Z" fill="#081018" opacity="0.75" />

          {/* Far ocean waves */}
          <path d="M0 260 Q100 240 200 260 T400 250 T600 265 T800 250 L800 450 L0 450 Z" fill="url(#ctSeaFar)" />

          {/* Mid ocean crests */}
          <path d="M0 310 Q160 270 320 320 T640 290 T800 330 L800 450 L0 450 Z" fill="url(#ctSeaFore)" />
          <path d="M280 305 Q320 295 360 318" stroke="#bae6fd" strokeWidth="4" fill="none" opacity="0.7" />
          <path d="M600 285 Q640 275 680 298" stroke="#bae6fd" strokeWidth="3" fill="none" opacity="0.6" />

          {/* Revolutionary ship hull (gỗ kiên cố vượt bão) */}
          <g transform="translate(180, 160)">
            {/* Mast and rigging */}
            <line x1="200" y1="180" x2="200" y2="-20" stroke="#854d0e" strokeWidth="10" strokeLinecap="round" />
            <line x1="200" y1="-20" x2="80" y2="180" stroke="#ca8a04" strokeWidth="2.5" opacity="0.8" />
            <line x1="200" y1="-20" x2="330" y2="180" stroke="#ca8a04" strokeWidth="2.5" opacity="0.8" />
            <line x1="200" y1="30" x2="110" y2="180" stroke="#ca8a04" strokeWidth="1.8" opacity="0.6" />

            {/* Billowing mainsail */}
            <path d="M205 -10 Q310 50 330 160 Q260 145 205 155 Z" fill="url(#ctSail)" opacity="0.95" />
            <path d="M205 10 Q280 60 295 145" stroke="#78350f" strokeWidth="2.5" fill="none" opacity="0.6" />

            {/* Jib sail */}
            <path d="M195 10 Q120 70 85 170 Q145 155 195 150 Z" fill="url(#ctSail)" opacity="0.85" />

            {/* Wooden ship hull */}
            <path d="M60 170 Q180 185 350 170 L380 155 Q200 230 40 190 Z" fill="url(#ctWood)" stroke="#78350f" strokeWidth="3" />
            {/* Hull plank lines */}
            <path d="M50 180 Q190 205 365 162" stroke="#1f140c" strokeWidth="2" fill="none" />
            <path d="M45 186 Q190 215 355 170" stroke="#1f140c" strokeWidth="2" fill="none" />

            {/* Helmsman (Người cầm lái đứng vững vàng bên bánh lái) */}
            <g transform="translate(150, 105)">
              {/* Wooden steering helm */}
              <circle cx="36" cy="46" r="18" stroke="#ca8a04" strokeWidth="4" fill="none" />
              <line x1="36" y1="22" x2="36" y2="70" stroke="#ca8a04" strokeWidth="3" />
              <line x1="12" y1="46" x2="60" y2="46" stroke="#ca8a04" strokeWidth="3" />
              <line x1="19" y1="29" x2="53" y2="63" stroke="#ca8a04" strokeWidth="3" />
              <line x1="19" y1="63" x2="53" y2="29" stroke="#ca8a04" strokeWidth="3" />

              {/* Helmsman body & determination posture */}
              <ellipse cx="20" cy="20" rx="9" ry="11" fill="#fde68a" />
              {/* Working cap / hair */}
              <path d="M11 18 Q20 10 29 18 Q25 12 11 18 Z" fill="#1e1814" />
              {/* Dark working coat flapping in storm wind */}
              <path d="M11 30 Q20 28 29 30 L34 68 Q20 72 6 68 Z" fill="#7f1d1d" />
              {/* Coat tail blowing back */}
              <path d="M6 55 Q-15 62 -25 72 Q-10 65 6 68 Z" fill="#991b1b" />
              {/* Arms gripping the wheel firmly */}
              <path d="M25 36 L38 44" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
              <path d="M15 38 L32 48" stroke="#fde68a" strokeWidth="5" strokeLinecap="round" />
            </g>
          </g>

          {/* Crashing foreground foam and tidal surge */}
          <path d="M0 380 Q200 320 400 390 T800 360 L800 450 L0 450 Z" fill="#081420" />
          <path d="M80 380 Q160 340 240 375 T420 360" stroke="#f0f9ff" strokeWidth="5" fill="none" opacity="0.85" />
          <path d="M420 375 Q520 345 620 380 T800 365" stroke="#f0f9ff" strokeWidth="4" fill="none" opacity="0.75" />

          {/* Subtitle banner */}
          <rect y="405" width="800" height="45" fill="#000000" opacity="0.65" />
          <text x="400" y="432" fill="#fef08a" fontSize="15" fontFamily="serif" fontStyle="italic" fontWeight="bold" textAnchor="middle">
            "Không có lý luận cách mệnh thì không có phong trào cách mệnh" — Người cầm lái dẫn đường
          </text>
        </svg>
      )}

      {/* 2. cg-ba-la-co-nhap-mot: Ba lá cờ đỏ nhập lại thành một (k2-c5) */}
      {assetId === "cg-ba-la-co-nhap-mot" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Ba lá cờ đỏ nhập làm một">
          <defs>
            <radialGradient id="sunBurst" cx="50%" cy="46%" r="55%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#b91c1c" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#180b08" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="flagRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="45%" stopColor="#dc2626" />
              <stop offset="85%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
            <linearGradient id="goldHammer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="40%" stopColor="#fde047" />
              <stop offset="80%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="streamNorth" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#b91c1c" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="streamSouth" x1="0%" y1="100%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#991b1b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Deep dignified background */}
          <rect width="800" height="450" fill="#140806" />

          {/* Glorious Sunburst of the New Era */}
          <circle cx="400" cy="205" r="230" fill="url(#sunBurst)" />

          {/* 3 Converging Revolutionary Silk Streams (Bắc - Trung - Nam hoà làm một) */}
          <path d="M0 60 Q200 110 320 180 L320 230 Q180 150 0 110 Z" fill="url(#streamNorth)" />
          <path d="M0 200 Q200 200 320 205 L320 250 Q180 240 0 250 Z" fill="#b91c1c" opacity="0.6" />
          <path d="M0 360 Q200 310 320 230 L320 270 Q180 340 0 400 Z" fill="url(#streamSouth)" />

          {/* Central Glorious Red Banner with silky waving folds */}
          <g transform="translate(230, 75)" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.75))">
            {/* Flag mast */}
            <rect x="0" y="-15" width="12" height="300" fill="#ca8a04" rx="3" />
            <circle cx="6" cy="-18" r="10" fill="#facc15" />
            <polygon points="6,-30 0,-18 12,-18" fill="#fef08a" />

            {/* Silk Flag */}
            <path d="M12 0 Q100 -12 180 5 Q260 22 340 0 L340 220 Q260 245 180 225 Q100 205 12 220 Z" fill="url(#flagRed)" />
            {/* Silk shadow waves */}
            <path d="M100 -6 Q180 12 260 -2 L260 222 Q180 236 100 218 Z" fill="#000000" opacity="0.12" />

            {/* Golden Hammer & Sickle (Biểu tượng Búa Liềm chuẩn mực, trang nghiêm) */}
            <g transform="translate(175, 110)">
              {/* Sickle (Liềm) */}
              <path d="M-30 25 C-30 -25 15 -45 42 -22 C48 -17 48 -10 40 -12 C18 -28 -15 -10 -15 25 C-15 32 -25 32 -30 25 Z" fill="url(#goldHammer)" />
              {/* Sickle handle */}
              <path d="M-28 22 L-42 46 C-45 52 -38 56 -33 52 L-20 28 Z" fill="#92400e" stroke="#fde047" strokeWidth="1" />

              {/* Hammer (Búa) */}
              {/* Handle */}
              <line x1="-35" y1="38" x2="38" y2="-35" stroke="#92400e" strokeWidth="9" strokeLinecap="round" />
              <line x1="-35" y1="38" x2="38" y2="-35" stroke="#fde047" strokeWidth="7" strokeLinecap="round" />
              {/* Head */}
              <polygon points="20,-48 48,-20 40,-12 12,-40" fill="url(#goldHammer)" stroke="#ca8a04" strokeWidth="1.5" />
            </g>

            {/* Golden Laurel branches around the banner */}
            <g stroke="#fef08a" strokeWidth="2" fill="none" opacity="0.85">
              <path d="M70 200 Q175 235 280 200" />
            </g>
          </g>

          {/* Banner bottom text */}
          <rect y="390" width="800" height="60" fill="#0c0504" opacity="0.9" />
          <text x="400" y="422" fill="#fef08a" fontSize="20" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
            ĐẢNG CỘNG SẢN VIỆT NAM (3/2/1930)
          </text>
          <text x="400" y="442" fill="#fde68a" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Chấm dứt thời kỳ khủng hoảng sâu sắc về đường lối cứu nước và tổ chức lãnh đạo
          </text>
        </svg>
      )}

      {/* 3. cg-ba-la-co: Ba lá cờ đỏ đặt rời nhau trên 3 kỳ (k1-c5) */}
      {assetId === "cg-ba-la-co" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Ba lá cờ đỏ chia rẽ năm 1929">
          <defs>
            <linearGradient id="blSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#180e0c" />
              <stop offset="60%" stopColor="#2a1612" />
              <stop offset="100%" stopColor="#0d0807" />
            </linearGradient>
            <linearGradient id="blCard" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#581010" />
            </linearGradient>
          </defs>

          <rect width="800" height="450" fill="url(#blSky)" />

          {/* Ominous storm clouds & lightning fractures */}
          <path d="M400 40 L380 140 L420 180 L370 270 L410 320 L390 400" stroke="#f87171" strokeWidth="2.5" fill="none" opacity="0.4" strokeDasharray="6,4" />

          {/* Stylized Map of Vietnam (Bắc Kỳ - Trung Kỳ - Nam Kỳ) */}
          <g transform="translate(180, 25)" opacity="0.75">
            {/* North */}
            <path d="M180 30 Q260 20 300 70 Q270 120 220 120 Q160 100 180 30 Z" fill="#3b2219" stroke="#78350f" strokeWidth="2" />
            {/* Center stripe */}
            <path d="M220 120 Q240 180 270 230 Q230 240 210 180 Z" fill="#331c15" stroke="#78350f" strokeWidth="2" />
            {/* South */}
            <path d="M270 230 Q310 270 280 340 Q220 350 200 300 Q210 240 270 230 Z" fill="#3b2219" stroke="#78350f" strokeWidth="2" />
          </g>

          {/* Flag 1: Bắc Kỳ - Đông Dương Cộng sản Đảng (6/1929) */}
          <g transform="translate(120, 50)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.8))">
            <rect width="180" height="100" rx="8" fill="url(#blCard)" stroke="#dc2626" strokeWidth="2" />
            <rect x="15" y="15" width="45" height="30" fill="#dc2626" rx="2" />
            <line x1="15" y1="12" x2="15" y2="55" stroke="#fde047" strokeWidth="3" />
            <text x="75" y="35" fill="#fef08a" fontSize="13" fontFamily="serif" fontWeight="bold">BẮC KỲ</text>
            <text x="15" y="72" fill="#ffffff" fontSize="13" fontFamily="serif" fontWeight="bold">Đông Dương CSĐ</text>
            <text x="15" y="90" fill="#fca5a5" fontSize="10.5" fontFamily="sans-serif">Hà Nội • Tháng 6/1929</text>
          </g>

          {/* Flag 2: Trung Kỳ - Đông Dương Cộng sản Liên đoàn (9/1929) */}
          <g transform="translate(500, 150)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.8))">
            <rect width="185" height="100" rx="8" fill="url(#blCard)" stroke="#dc2626" strokeWidth="2" />
            <rect x="15" y="15" width="45" height="30" fill="#dc2626" rx="2" />
            <line x1="15" y1="12" x2="15" y2="55" stroke="#fde047" strokeWidth="3" />
            <text x="75" y="35" fill="#fef08a" fontSize="13" fontFamily="serif" fontWeight="bold">TRUNG KỲ</text>
            <text x="15" y="72" fill="#ffffff" fontSize="13" fontFamily="serif" fontWeight="bold">ĐDCS Liên đoàn</text>
            <text x="15" y="90" fill="#fca5a5" fontSize="10.5" fontFamily="sans-serif">Trung Kỳ • Tháng 9/1929</text>
          </g>

          {/* Flag 3: Nam Kỳ - An Nam Cộng sản Đảng (11/1929) */}
          <g transform="translate(130, 270)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.8))">
            <rect width="180" height="100" rx="8" fill="url(#blCard)" stroke="#dc2626" strokeWidth="2" />
            <rect x="15" y="15" width="45" height="30" fill="#dc2626" rx="2" />
            <line x1="15" y1="12" x2="15" y2="55" stroke="#fde047" strokeWidth="3" />
            <text x="75" y="35" fill="#fef08a" fontSize="13" fontFamily="serif" fontWeight="bold">NAM KỲ</text>
            <text x="15" y="72" fill="#ffffff" fontSize="13" fontFamily="serif" fontWeight="bold">An Nam CSĐ</text>
            <text x="15" y="90" fill="#fca5a5" fontSize="10.5" fontFamily="sans-serif">Sài Gòn • Tháng 11/1929</text>
          </g>

          {/* Danger Warning Overlay */}
          <rect y="395" width="800" height="55" fill="#220b08" opacity="0.95" />
          <text x="400" y="420" fill="#f87171" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            ⚠️ NGUY CƠ CHIA RẼ: Ba tổ chức hoạt động biệt lập, tranh giành ảnh hưởng và quần chúng
          </text>
          <text x="400" y="438" fill="#fde68a" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Yêu cầu bức thiết: Phải có một chính đảng duy nhất để thống nhất ý chí và hành động
          </text>
        </svg>
      )}

      {/* 4. cg-phong-cuu-long: Căn phòng nhỏ ở Cửu Long, năm bóng người quanh bàn (k2-c1) */}
      {assetId === "cg-phong-cuu-long" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Hội nghị thành lập Đảng tại Cửu Long">
          <defs>
            <radialGradient id="lampLight" cx="50%" cy="52%" r="48%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#78350f" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0a0604" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="rainWindow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0c1724" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Dark tenement wall */}
          <rect width="800" height="450" fill="#100a08" />

          {/* Wooden louvered window with Hong Kong stormy rain outside */}
          <rect x="80" y="50" width="160" height="220" fill="url(#rainWindow)" stroke="#3d281a" strokeWidth="8" rx="4" />
          {/* Window mullions & rain streaks */}
          <line x1="160" y1="50" x2="160" y2="270" stroke="#3d281a" strokeWidth="4" />
          <line x1="80" y1="160" x2="240" y2="160" stroke="#3d281a" strokeWidth="4" />
          <g stroke="#94a3b8" strokeWidth="1" opacity="0.35">
            <line x1="90" y1="60" x2="80" y2="120" /><line x1="130" y1="70" x2="120" y2="140" /><line x1="190" y1="80" x2="180" y2="150" />
          </g>

          {/* Wooden table surface */}
          <ellipse cx="400" cy="300" rx="280" ry="85" fill="#2c1a11" stroke="#4a2c1b" strokeWidth="4" />

          {/* Warm Kerosene Lamp glow */}
          <circle cx="400" cy="225" r="220" fill="url(#lampLight)" />

          {/* The Antique Kerosene Lamp */}
          <g transform="translate(385, 170)">
            <ellipse cx="15" cy="55" rx="16" ry="7" fill="#b45309" />
            <path d="M5 55 Q15 35 15 20 Q15 35 25 55 Z" fill="#fef08a" opacity="0.9" />
            <ellipse cx="15" cy="22" rx="4" ry="10" fill="#ffffff" />
            {/* Glass chimney */}
            <path d="M8 55 Q15 0 22 55" stroke="#fde68a" strokeWidth="2" fill="none" opacity="0.6" />
          </g>

          {/* Handwritten Documents on table */}
          <rect x="310" y="275" width="75" height="45" fill="#fef3c7" rx="2" transform="rotate(-8 310 275)" opacity="0.9" />
          <line x1="318" y1="285" x2="370" y2="278" stroke="#78350f" strokeWidth="2" />
          <line x1="318" y1="295" x2="370" y2="288" stroke="#78350f" strokeWidth="1.5" />
          <line x1="318" y1="305" x2="355" y2="298" stroke="#78350f" strokeWidth="1.5" />

          <rect x="420" y="275" width="75" height="45" fill="#fef3c7" rx="2" transform="rotate(12 420 275)" opacity="0.9" />
          <line x1="428" y1="285" x2="480" y2="295" stroke="#78350f" strokeWidth="2" />
          <line x1="428" y1="295" x2="480" y2="305" stroke="#78350f" strokeWidth="1.5" />

          {/* The 5 Historical Figures (Nguyễn Ái Quốc chủ trì ở giữa & 4 đại biểu) */}
          {/* 1. Leader Nguyễn Ái Quốc (Trung tâm bàn, đỉnh đạc, chủ trì) */}
          <g transform="translate(370, 100)">
            <ellipse cx="30" cy="30" rx="18" ry="24" fill="#0d0806" />
            {/* Intellect forehead & collar */}
            <path d="M22 45 L30 55 L38 45" stroke="#fde68a" strokeWidth="2.5" fill="none" />
            <path d="M10 50 Q30 46 50 50 L60 145 Q30 152 0 145 Z" fill="#1a110c" />
          </g>

          {/* 2. Đại biểu Đông Dương CSĐ 1 (Trịnh Đình Cửu - bên trái gần) */}
          <g transform="translate(260, 160)">
            <ellipse cx="25" cy="25" rx="16" ry="22" fill="#0d0806" />
            <path d="M5 45 Q25 42 45 45 L50 140 Q25 145 0 140 Z" fill="#140d09" />
          </g>

          {/* 3. Đại biểu Đông Dương CSĐ 2 (Nguyễn Đức Cảnh - ngoài cùng bên trái) */}
          <g transform="translate(170, 210)">
            <ellipse cx="25" cy="25" rx="17" ry="23" fill="#080504" />
            <path d="M0 45 Q25 42 50 45 L55 140 Q25 145 -5 140 Z" fill="#0e0805" />
          </g>

          {/* 4. Đại biểu An Nam CSĐ 1 (Châu Văn Liêm - bên phải gần) */}
          <g transform="translate(480, 160)">
            <ellipse cx="25" cy="25" rx="16" ry="22" fill="#0d0806" />
            <path d="M5 45 Q25 42 45 45 L50 140 Q25 145 0 140 Z" fill="#140d09" />
          </g>

          {/* 5. Đại biểu An Nam CSĐ 2 (Nguyễn Thiệu - ngoài cùng bên phải) */}
          <g transform="translate(570, 210)">
            <ellipse cx="25" cy="25" rx="17" ry="23" fill="#080504" />
            <path d="M0 45 Q25 42 50 45 L55 140 Q25 145 -5 140 Z" fill="#0e0805" />
          </g>

          {/* Caption banner */}
          <rect y="400" width="800" height="50" fill="#080403" opacity="0.9" />
          <text x="400" y="425" fill="#fef08a" fontSize="16" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            HỘI NGHỊ HỢP NHẤT THÀNH LẬP ĐẢNG — CỬU LONG (HỒNG KÔNG, 1930)
          </text>
          <text x="400" y="442" fill="#d6d3d1" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Đồng chí Nguyễn Ái Quốc chủ trì cùng 4 đại biểu của Đông Dương CSĐ và An Nam CSĐ
          </text>
        </svg>
      )}

      {/* 5. cg-vong-doan-ket: Vòng đại đoàn kết toàn dân tộc (k2-c3) */}
      {assetId === "cg-vong-doan-ket" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Mặt trận đoàn kết toàn dân">
          <defs>
            <radialGradient id="vdkCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </radialGradient>
            <radialGradient id="vdkAlly" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
            </radialGradient>
            <radialGradient id="vdkBroad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          <rect width="800" height="450" fill="#130e0b" />

          {/* Outer Ring: Trung lập & tranh thủ lực lượng yêu nước */}
          <circle cx="400" cy="210" r="175" fill="url(#vdkBroad)" stroke="#60a5fa" strokeWidth="2.5" strokeDasharray="8,6" />
          <text x="400" y="65" fill="#93c5fd" fontSize="13" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            TƯ SẢN DÂN TỘC • TRUNG - TIỂU ĐỊA CHỦ YÊU NƯỚC • PHÚ NÔNG
          </text>
          <text x="400" y="82" fill="#bfdbfe" fontSize="11" fontFamily="sans-serif" fontStyle="italic" textAnchor="middle">
            (Tranh thủ, lôi kéo về phía cách mạng; bộ phận nào đã lộ mặt phản cách mạng mới đánh đổ)
          </text>

          {/* Middle Ring: Bầu bạn cách mệnh */}
          <circle cx="400" cy="210" r="120" fill="url(#vdkAlly)" stroke="#facc15" strokeWidth="3" />
          <text x="400" y="125" fill="#fef08a" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            TIỂU TƯ SẢN • TRÍ THỨC • HỌC TRÒ • NHÀ BUÔN NHỎ
          </text>
          <text x="400" y="142" fill="#fde68a" fontSize="11" fontFamily="sans-serif" fontStyle="italic" textAnchor="middle">
            (Đồng minh thân cận, bầu bạn cách mạng của Công Nông)
          </text>

          {/* Core: Gốc cách mệnh */}
          <circle cx="400" cy="210" r="68" fill="url(#vdkCore)" stroke="#fef08a" strokeWidth="4" filter="drop-shadow(0 0 15px rgba(239,68,68,0.7))" />
          <text x="400" y="205" fill="#ffffff" fontSize="16" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            CÔNG NHÂN
          </text>
          <text x="400" y="224" fill="#ffffff" fontSize="16" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            & NÔNG DÂN
          </text>
          <text x="400" y="242" fill="#fef08a" fontSize="11.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
            ★ GỐC CÁCH MỆNH ★
          </text>

          {/* Outer Enemies Being Isolated */}
          <g transform="translate(680, 210)">
            <rect x="-60" y="-30" width="120" height="60" rx="6" fill="#1c1917" stroke="#ef4444" strokeWidth="2" />
            <text x="0" y="-8" fill="#f87171" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">ĐẾ QUỐC PHÁP</text>
            <text x="0" y="12" fill="#f87171" fontSize="10" fontFamily="serif" textAnchor="middle">& TAY SAI</text>
            <text x="0" y="24" fill="#fca5a5" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle">(Kẻ thù chính)</text>
          </g>

          {/* Footer note */}
          <rect y="400" width="800" height="50" fill="#090605" opacity="0.9" />
          <text x="400" y="425" fill="#fef08a" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            CHIẾN LƯỢC ĐẠI ĐOÀN KẾT TOÀN DÂN TỘC — SÁCH LƯỢC VẮN TẮT (1930)
          </text>
          <text x="400" y="442" fill="#d6d3d1" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Cô lập tối đa kẻ thù, quy tụ mọi lực lượng yêu nước tiến bộ dưới ngọn cờ lãnh đạo của Đảng
          </text>
        </svg>
      )}

      {/* 6. cg-to-yeu-sach: Bản Yêu sách của nhân dân An Nam (k0-c2) */}
      {assetId === "cg-to-yeu-sach" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Bản Yêu sách 8 điểm">
          <defs>
            <linearGradient id="parchment" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fdfbf7" />
              <stop offset="50%" stopColor="#f7f1e1" />
              <stop offset="100%" stopColor="#ede1c7" />
            </linearGradient>
          </defs>

          <rect width="800" height="450" fill="#1c1511" />

          {/* The Document Sheet */}
          <g transform="translate(140, 20)" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.85))">
            <rect width="520" height="385" rx="6" fill="url(#parchment)" stroke="#c5b08c" strokeWidth="2.5" />
            {/* Header border */}
            <rect x="20" y="16" width="480" height="32" fill="#8f1d2c" rx="3" />
            <text x="260" y="38" fill="#fef08a" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
              REVENDICATIONS DU PEUPLE ANNAMITE
            </text>
            <text x="260" y="66" fill="#442a19" fontSize="13" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              BẢN YÊU SÁCH CỦA NHÂN DÂN AN NAM (18/6/1919)
            </text>
            <line x1="60" y1="76" x2="460" y2="76" stroke="#b48b55" strokeWidth="1.5" />

            {/* 8 Specific Historic Demands (Đủ 8 điểm giáo trình yêu cầu) */}
            <g transform="translate(35, 95)" fontSize="10.5" fontFamily="serif" fill="#29180f" opacity="0.95">
              <text y="0">1. Tổng ân xá cho tất cả những người bản xứ bị án tù chính trị</text>
              <text y="22">2. Cải cách nền pháp lý ở Đông Dương, người bản xứ được quyền hưởng bảo đảm pháp lý</text>
              <text y="44">3. Tự do báo chí và tự do ngôn luận</text>
              <text y="66">4. Tự do lập hội và tự do hội họp</text>
              <text y="88">5. Tự do cư trú và tự do xuất ngoại</text>
              <text y="110">6. Tự do học tập, mở các trường kỹ thuật và chuyên nghiệp tại các tỉnh</text>
              <text y="132">7. Thay thế chế độ ra các sắc lệnh bằng chế độ ra các đạo luật</text>
              <text y="154">8. Có đại biểu thường trực của người bản xứ do người bản xứ bầu tại Nghị viện Pháp</text>
            </g>

            {/* Red Wax Seal & Historic Signature */}
            <g transform="translate(360, 280)">
              {/* Red Wax Seal */}
              <circle cx="100" cy="50" r="28" fill="#991b1b" stroke="#7f1d1d" strokeWidth="2" opacity="0.85" />
              <text x="100" y="54" fill="#fef08a" fontSize="9" fontFamily="serif" fontWeight="bold" textAnchor="middle">VERSAILLES</text>
              {/* Signature */}
              <text x="35" y="42" fill="#78350f" fontSize="12" fontFamily="serif" fontStyle="italic">Thay mặt Nhóm người An Nam yêu nước</text>
              <text x="35" y="65" fill="#991b1b" fontSize="16" fontFamily="serif" fontWeight="bold">Nguyễn Ái Quốc</text>
            </g>
          </g>

          <text x="400" y="432" fill="#fde68a" fontSize="12.5" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Lần đầu tiên ngọn cờ đấu tranh đòi quyền dân tộc cơ bản được giương cao tại diễn đàn quốc tế
          </text>
        </svg>
      )}

      {/* 7. cg-bang-den: Dòng chữ trên bảng đen lớp học Văn Minh (k1-c2) */}
      {assetId === "cg-bang-den" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Bảng đen lớp học Quảng Châu">
          <defs>
            <linearGradient id="chalkboardWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#452414" />
              <stop offset="50%" stopColor="#2e170c" />
              <stop offset="100%" stopColor="#1a0c06" />
            </linearGradient>
            <radialGradient id="chalkGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#1e3325" />
              <stop offset="100%" stopColor="#0a140d" />
            </radialGradient>
          </defs>

          <rect width="800" height="450" fill="#18110e" />

          {/* Wooden Frame */}
          <rect x="50" y="25" width="700" height="380" rx="14" fill="url(#chalkboardWood)" stroke="#78350f" strokeWidth="12" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.85))" />

          {/* Chalkboard Slate with dust */}
          <rect x="75" y="50" width="650" height="330" fill="url(#chalkGlow)" rx="6" />

          {/* Sunbeam pouring from classroom window */}
          <polygon points="120,50 260,50 480,380 340,380" fill="#fef08a" opacity="0.06" />

          {/* Chalk Calligraphy (Lời dạy kinh điển trong Đường Kách mệnh) */}
          <text x="400" y="115" fill="#fef08a" fontSize="14" fontFamily="mono" letterSpacing="4" textAnchor="middle" opacity="0.8">
            • LỚP HUẤN LUYỆN CHÍNH TRỊ QUẢNG CHÂU (1925–1927) •
          </text>

          <text x="400" y="175" fill="#ffffff" fontSize="26" fontFamily="serif" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0 0 4px rgba(255,255,255,0.7))">
            "CÔNG NÔNG LÀ GỐC CÁCH MỆNH"
          </text>

          <text x="400" y="235" fill="#e2e8f0" fontSize="19" fontFamily="serif" textAnchor="middle">
            Còn học trò, nhà buôn nhỏ, điền chủ nhỏ...
          </text>
          <text x="400" y="275" fill="#fef08a" fontSize="21" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            là BẦU BẠN CÁCH MỆNH của công nông!
          </text>

          <line x1="250" y1="310" x2="550" y2="310" stroke="#facc15" strokeWidth="2" strokeDasharray="10,6" opacity="0.7" />

          <text x="400" y="345" fill="#facc15" fontSize="15" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            — Nguyễn Ái Quốc • Đường cách mệnh (1927) —
          </text>

          {/* Chalk ledge with chalk sticks and eraser */}
          <rect x="70" y="375" width="660" height="15" fill="#3a1e10" />
          <rect x="220" y="368" width="30" height="8" rx="2" fill="#ffffff" opacity="0.9" />
          <rect x="260" y="369" width="22" height="7" rx="2" fill="#fef08a" opacity="0.9" />
          <rect x="520" y="366" width="60" height="10" rx="3" fill="#1e1814" stroke="#78350f" strokeWidth="1" />
        </svg>
      )}

      {/* 8. cg-cang-bien-truc-xuat: Nhóm du học sinh bị lính áp giải xuống tàu (k0-c1) */}
      {assetId === "cg-cang-bien-truc-xuat" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Du học sinh Đông Du bị trục xuất">
          <defs>
            <linearGradient id="cbFog" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="cbSea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>

          {/* Cold foggy sky */}
          <rect width="800" height="450" fill="url(#cbFog)" />

          {/* Giant black steel hull of deportation ship */}
          <polygon points="420,60 800,100 800,340 320,340" fill="#0b0f17" />
          {/* Steam funnel pumping dark soot */}
          <rect x="580" y="20" width="55" height="70" fill="#1e293b" />
          <path d="M570 15 Q630 -15 720 -5 Q660 30 620 25 Z" fill="#334155" opacity="0.6" />

          {/* Freezing choppy waves */}
          <path d="M0 240 Q200 220 400 245 T800 230 L800 450 L0 450 Z" fill="url(#cbSea)" />

          {/* Wooden Yokohama wharf and gangplank */}
          <polygon points="0,320 450,320 480,450 0,450" fill="#24160f" />
          <polygon points="260,330 460,220 480,230 280,345" fill="#3d251a" stroke="#78350f" strokeWidth="2" />

          {/* Japanese police with sabres escorting */}
          <g transform="translate(210, 240)">
            <ellipse cx="20" cy="20" rx="10" ry="12" fill="#090d16" />
            <polygon points="10,32 30,32 35,80 5,80" fill="#090d16" />
            <line x1="32" y1="45" x2="48" y2="75" stroke="#94a3b8" strokeWidth="3" /> {/* Sabre */}
          </g>

          {/* Vietnamese Đông Du students bowing heads, carrying bundles */}
          <g transform="translate(320, 185)">
            <ellipse cx="20" cy="20" rx="9" ry="12" fill="#020617" />
            <path d="M12 28 Q20 25 28 28 L32 75 Q20 80 8 75 Z" fill="#18110d" />
            <circle cx="34" cy="55" r="9" fill="#78350f" /> {/* Hành lý tay nải */}
          </g>

          <g transform="translate(380, 150)">
            <ellipse cx="20" cy="20" rx="9" ry="12" fill="#020617" />
            <path d="M12 28 Q20 25 28 28 L32 75 Q20 80 8 75 Z" fill="#18110d" />
          </g>

          {/* Subtitle */}
          <rect y="400" width="800" height="50" fill="#090605" opacity="0.9" />
          <text x="400" y="425" fill="#fca5a5" fontSize="15" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            PHONG TRÀO ĐÔNG DU TAN RÃ (1908–1909)
          </text>
          <text x="400" y="442" fill="#d6d3d1" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Du học sinh bị trục xuất — Con đường cầu viện ngoại bang bộc lộ sự bế tắc hoàn toàn
          </text>
        </svg>
      )}

      {/* 9. cg-chong-thue: Đoàn biểu tình chống thuế bị đàn áp (k0-c1) */}
      {assetId === "cg-chong-thue" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Đoàn biểu tình chống thuế 1908">
          <defs>
            <linearGradient id="ctDust" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="50%" stopColor="#2e1005" />
              <stop offset="100%" stopColor="#140602" />
            </linearGradient>
          </defs>

          <rect width="800" height="450" fill="url(#ctDust)" />

          {/* Arid scorched earth and tear-gas / gunfire smoke */}
          <path d="M0 270 Q200 240 400 275 T800 260 L800 450 L0 450 Z" fill="#241107" />
          <circle cx="500" cy="240" r="80" fill="#78350f" opacity="0.3" filter="blur(20px)" />

          {/* Masses of peasants in conical hats (nón lá) */}
          {[60, 110, 160, 200, 240, 280, 320, 360].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${230 + (i % 3) * 12})`}>
              <polygon points="0,20 30,20 15,2" fill="#ca8a04" opacity="0.95" />
              <path d="M6,20 Q15,18 24,20 L27,70 Q15,75 3,70 Z" fill="#0f0703" />
            </g>
          ))}

          {/* Colonial troops line with rifles & bayonets leveled */}
          <line x1="480" y1="285" x2="720" y2="285" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,4" />
          {[520, 580, 640, 700].map((x, i) => (
            <g key={i} transform={`translate(${x}, 240)`}>
              <ellipse cx="15" cy="18" rx="8" ry="11" fill="#1e293b" />
              <polygon points="5,28 25,28 28,75 2,75" fill="#0f172a" />
              <line x1="5" y1="36" x2="-35" y2="36" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
              <polygon points="-35,33 -48,36 -35,39" fill="#e2e8f0" /> {/* Bayonet */}
            </g>
          ))}

          {/* Subtitle */}
          <rect y="400" width="800" height="50" fill="#090605" opacity="0.9" />
          <text x="400" y="425" fill="#fca5a5" fontSize="15" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            PHONG TRÀO CHỐNG SƯU THUẾ TRUNG KỲ (1908)
          </text>
          <text x="400" y="442" fill="#d6d3d1" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Cuộc đấu tranh tự phát của nông dân bị thực dân Pháp đàn áp dã man trong biển máu
          </text>
        </svg>
      )}

      {/* 10. cg-bao-nhan-dao: Tờ báo L'Humanité (k0-c3) */}
      {assetId === "cg-bao-nhan-dao" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Báo L'Humanité 1920">
          <defs>
            <radialGradient id="nhanDaoGlow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#ea580c" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#78350f" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="800" height="450" fill="#140c09" />

          {/* Radiant halo illuminating the room */}
          <circle cx="400" cy="200" r="240" fill="url(#nhanDaoGlow)" />

          {/* Vintage French Newspaper Sheet */}
          <g transform="translate(180, 25)" filter="drop-shadow(0 15px 30px rgba(0,0,0,0.85))">
            <rect width="440" height="360" rx="4" fill="#fbf7ec" stroke="#d5c39c" strokeWidth="2.5" />

            {/* Red Masthead Bar */}
            <rect x="20" y="16" width="400" height="34" fill="#991b1b" rx="2" />
            <text x="220" y="40" fill="#fef08a" fontSize="20" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="4">
              L'HUMANITÉ
            </text>
            <text x="220" y="62" fill="#57534e" fontSize="10.5" fontFamily="serif" textAnchor="middle">
              ORGANE SOCIALISTE QUOTIDIEN • VENDREDI 16 & SAMEDI 17 JUILLET 1920
            </text>
            <line x1="20" y1="70" x2="420" y2="70" stroke="#78716c" strokeWidth="1.5" />

            {/* Historic Article Banner */}
            <rect x="20" y="80" width="400" height="42" fill="#292524" rx="2" />
            <text x="220" y="98" fill="#fde047" fontSize="12" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              PREMIÈRE ÉBAUCHE DES THÈSES
            </text>
            <text x="220" y="114" fill="#fef08a" fontSize="10.5" fontFamily="serif" textAnchor="middle">
              SUR LES QUESTIONS NATIONALES ET COLONIALES
            </text>

            {/* Author */}
            <text x="220" y="145" fill="#991b1b" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              Par V. I. LÉNINE
            </text>

            {/* Two text columns */}
            <g opacity="0.75" stroke="#78716c" strokeWidth="1.5">
              <line x1="35" y1="165" x2="205" y2="165" /><line x1="35" y1="180" x2="205" y2="180" /><line x1="35" y1="195" x2="205" y2="195" />
              <line x1="35" y1="210" x2="205" y2="210" /><line x1="35" y1="225" x2="205" y2="225" /><line x1="35" y1="240" x2="205" y2="240" />

              <line x1="235" y1="165" x2="405" y2="165" /><line x1="235" y1="180" x2="405" y2="180" /><line x1="235" y1="195" x2="405" y2="195" />
              <line x1="235" y1="210" x2="405" y2="210" /><line x1="235" y1="225" x2="405" y2="225" /><line x1="235" y1="240" x2="405" y2="240" />
            </g>

            {/* Historic realization banner */}
            <rect x="25" y="270" width="390" height="70" rx="4" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <text x="220" y="295" fill="#78350f" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">
              "Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ!"
            </text>
            <text x="220" y="325" fill="#991b1b" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              ĐÂY LÀ CON ĐƯỜNG GIẢI PHÓNG CHÚNG TA!
            </text>
          </g>

          <text x="400" y="432" fill="#fde68a" fontSize="12.5" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Nguyễn Ái Quốc tìm thấy con đường cứu nước chân chính: Độc lập dân tộc gắn liền với Chủ nghĩa xã hội
          </text>
        </svg>
      )}

      {/* 11. cg-don-linh-dem: Cuộc nổi dậy bạo động vũ trang non yếu bị dập tắt (k1-c2) */}
      {assetId === "cg-don-linh-dem" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Bạo động non yếu bị dập tắt">
          <rect width="800" height="450" fill="#090a0f" />

          {/* High fortress stonewall & guard tower */}
          <polygon points="0,220 800,200 800,450 0,450" fill="#18181b" />
          <rect x="520" y="100" width="110" height="120" fill="#1c1917" stroke="#292524" strokeWidth="3" />

          {/* Sweeping colonial searchlight beam */}
          <polygon points="575,115 150,420 380,420" fill="#fef08a" opacity="0.18" />

          {/* Barbed wire fence */}
          <line x1="0" y1="280" x2="800" y2="280" stroke="#71717a" strokeWidth="3" strokeDasharray="8,6" />

          {/* Small isolated insurgent fire dying out */}
          <circle cx="360" cy="270" r="45" fill="#ef4444" opacity="0.25" />
          <polygon points="360,240 375,275 345,275" fill="#ea580c" />
          <polygon points="360,250 370,275 350,275" fill="#facc15" />

          {/* Subtitle */}
          <rect y="400" width="800" height="50" fill="#090605" opacity="0.9" />
          <text x="400" y="425" fill="#fca5a5" fontSize="15" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            BẠO ĐỘNG VŨ TRANG NON YẾU THIẾU GIÁC NGỘ QUẦN CHÚNG
          </text>
          <text x="400" y="442" fill="#d6d3d1" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Không có lý luận khoa học và lực lượng quần chúng hậu thuẫn, ngọn lửa nhanh chóng bị kẻ thù bóp nghẹt
          </text>
        </svg>
      )}

      {/* 12. cg-dam-dong-mua: Đám đông tản mát dưới mưa vì thiếu tổ chức (k1-c3) */}
      {assetId === "cg-dam-dong-mua" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Đám đông tản mát dưới mưa">
          <defs>
            <linearGradient id="rainSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          <rect width="800" height="450" fill="url(#rainSky)" />

          {/* Dense rain lines */}
          <g stroke="#38bdf8" strokeWidth="1.2" opacity="0.3">
            {Array.from({ length: 32 }).map((_, i) => (
              <line key={i} x1={i * 28} y1="0" x2={i * 28 - 50} y2="450" strokeDasharray="20,12" />
            ))}
          </g>

          {/* Wet ground puddles */}
          <path d="M0 320 Q400 290 800 325 L800 450 L0 450 Z" fill="#0b0f19" />
          <ellipse cx="400" cy="380" rx="260" ry="40" fill="#1e293b" opacity="0.5" />

          {/* Scattered figures in heavy rain */}
          {/* Group 1 left dispersing */}
          <g transform="translate(180, 260)">
            <ellipse cx="25" cy="18" rx="26" ry="10" fill="#1e293b" /> {/* Umbrella */}
            <path d="M15,25 Q25,23 35,25 L38,80 Q25,85 12,80 Z" fill="#020617" />
          </g>

          {/* Solitary lost figure center */}
          <g transform="translate(390, 280)">
            <ellipse cx="15" cy="15" rx="8" ry="10" fill="#020617" />
            <path d="M5,24 Q15,22 25,24 L28,75 Q15,80 2,75 Z" fill="#0f172a" />
          </g>

          {/* Group 2 right hurrying away */}
          <g transform="translate(600, 265)">
            <ellipse cx="25" cy="18" rx="26" ry="10" fill="#1e293b" />
            <path d="M15,25 Q25,23 35,25 L38,80 Q25,85 12,80 Z" fill="#020617" />
          </g>

          {/* Subtitle */}
          <rect y="400" width="800" height="50" fill="#090605" opacity="0.9" />
          <text x="400" y="425" fill="#93c5fd" fontSize="15" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            QUẦN CHÚNG THIẾU NGỌN CỜ LÃNH ĐẠO THỐNG NHẤT
          </text>
          <text x="400" y="442" fill="#d6d3d1" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Các cuộc bãi công, biểu tình tự phát dễ rơi vào hoang mang, chia rẽ và tản mát khi gặp bão tố
          </text>
        </svg>
      )}

      {/* 13. cg-truyen-don-trai-nguoc: Ba nhóm phát truyền đơn trái ngược nhau (k2-c1) */}
      {assetId === "cg-truyen-don-trai-nguoc" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Truyền đơn trái ngược nhau">
          <rect width="800" height="450" fill="#18110e" />

          {/* Three split crossroads */}
          <polygon points="400,90 0,450 120,450" fill="#291a13" />
          <polygon points="400,90 340,450 460,450" fill="#362219" />
          <polygon points="400,90 680,450 800,450" fill="#291a13" />

          {/* Faction 1: DDCSD (Left) */}
          <g transform="translate(120, 210)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.8))">
            <rect width="130" height="80" rx="6" fill="#b91c1c" stroke="#f87171" strokeWidth="2" transform="rotate(-12)" />
            <text x="65" y="35" fill="#fef08a" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle" transform="rotate(-12 65 35)">
              ĐÔNG DƯƠNG CSĐ
            </text>
            <text x="65" y="55" fill="#ffffff" fontSize="9" fontFamily="sans-serif" textAnchor="middle" transform="rotate(-12 65 55)">
              Truyền đơn số 1
            </text>
          </g>

          {/* Faction 2: ANCSD (Center) */}
          <g transform="translate(340, 190)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.8))">
            <rect width="130" height="80" rx="6" fill="#991b1b" stroke="#f87171" strokeWidth="2" />
            <text x="65" y="35" fill="#fef08a" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              AN NAM CSĐ
            </text>
            <text x="65" y="55" fill="#ffffff" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
              Truyền đơn số 2
            </text>
          </g>

          {/* Faction 3: DDCSLD (Right) */}
          <g transform="translate(560, 210)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.8))">
            <rect width="130" height="80" rx="6" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" transform="rotate(12)" />
            <text x="65" y="35" fill="#fef08a" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle" transform="rotate(12 65 35)">
              ĐDCS LIÊN ĐOÀN
            </text>
            <text x="65" y="55" fill="#ffffff" fontSize="9" fontFamily="sans-serif" textAnchor="middle" transform="rotate(12 65 55)">
              Truyền đơn số 3
            </text>
          </g>

          {/* Subtitle */}
          <rect y="400" width="800" height="50" fill="#090605" opacity="0.9" />
          <text x="400" y="425" fill="#fca5a5" fontSize="15" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            TRANH GIÀNH ẢNH HƯỞNG & PHÂN TÁN LỰC LƯỢNG (CUỐI NĂM 1929)
          </text>
          <text x="400" y="442" fill="#d6d3d1" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Quần chúng hoang mang trước những truyền đơn đối nghịch trên cùng một con phố
          </text>
        </svg>
      )}

      {/* 14. cg-lang-chia-re: Làng quê chia rẽ, địa chủ nhỏ yêu nước quay lưng (k2-c2) */}
      {assetId === "cg-lang-chia-re" && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Làng quê chia rẽ">
          <rect width="800" height="450" fill="#140f0c" />

          {/* Traditional Northern Village Gate & Bamboo Grove */}
          <path d="M0 310 L800 300 L800 450 L0 450 Z" fill="#241710" />

          {/* Bamboo stalks */}
          <g stroke="#166534" strokeWidth="5" opacity="0.45">
            <line x1="60" y1="120" x2="65" y2="320" /><line x1="90" y1="140" x2="92" y2="320" /><line x1="120" y1="100" x2="118" y2="320" />
            <line x1="720" y1="130" x2="715" y2="320" /><line x1="750" y1="110" x2="748" y2="320" />
          </g>

          {/* Village Brick Gate */}
          <g transform="translate(320, 160)">
            <path d="M0 150 L0 60 Q80 20 160 60 L160 150 Z" fill="#78350f" stroke="#b45309" strokeWidth="3" />
            <path d="M40 150 L40 90 Q80 70 120 90 L120 150 Z" fill="#140f0c" />
          </g>

          {/* Chasm rift down the village road */}
          <polygon points="390,240 410,240 440,450 360,450" fill="#0a0604" />

          {/* Left: Angry crowd isolated */}
          <g transform="translate(200, 230)">
            <ellipse cx="20" cy="20" rx="9" ry="12" fill="#0d0806" />
            <polygon points="10,30 30,30 35,80 5,80" fill="#0d0806" />
            <ellipse cx="60" cy="24" rx="9" ry="12" fill="#0d0806" />
            <polygon points="50,34 70,34 75,80 45,80" fill="#0d0806" />
          </g>

          {/* Right: Patriotic Small Landholder walking away into darkness */}
          <g transform="translate(560, 220)">
            {/* Traditional Khăn đóng */}
            <ellipse cx="20" cy="18" rx="10" ry="5" fill="#451a03" />
            <ellipse cx="20" cy="24" rx="9" ry="11" fill="#3b271d" />
            {/* Long traditional silk tunic (áo the) */}
            <path d="M10,34 Q20,32 30,34 L36,95 Q20,100 4,95 Z" fill="#271a12" />
          </g>

          {/* Subtitle */}
          <rect y="400" width="800" height="50" fill="#090605" opacity="0.9" />
          <text x="400" y="425" fill="#fca5a5" fontSize="15" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            SAI LẦM "TẢ" KHUYNH: CÔ LẬP ĐỒNG MINH YÊU NƯỚC
          </text>
          <text x="400" y="442" fill="#d6d3d1" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Đánh đổ tràn lan các tầng lớp tiến bộ sẽ vô tình đẩy lực lượng trung gian sang phía thực dân
          </text>
        </svg>
      )}

      {/* Neutral dignified fallback for any unlisted asset */}
      {!["cg-con-thuyen", "cg-ba-la-co-nhap-mot", "cg-ba-la-co", "cg-phong-cuu-long", "cg-vong-doan-ket", "cg-to-yeu-sach", "cg-bang-den", "cg-cang-bien-truc-xuat", "cg-chong-thue", "cg-bao-nhan-dao", "cg-don-linh-dem", "cg-dam-dong-mua", "cg-truyen-don-trai-nguoc", "cg-lang-chia-re"].includes(assetId) && (
        <svg viewBox="0 0 800 450" className="w-full h-full" role="img" aria-label="Minh họa sự kiện lịch sử">
          <rect width="800" height="450" fill="#17120e" />
          <rect x="50" y="25" width="700" height="390" rx="12" fill="#221812" stroke="#78350f" strokeWidth="3" strokeDasharray="8,8" />
          <circle cx="400" cy="180" r="45" fill="#2d1e16" stroke="#92400e" strokeWidth="2.5" />
          <text x="400" y="195" fill="#d97706" fontSize="36" textAnchor="middle">🏛️</text>
          <text x="400" y="270" fill="#fde68a" fontSize="18" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            Minh Hoạ Sự Kiện Lịch Sử
          </text>
          <text x="400" y="300" fill="#a8a29e" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Hành Trình Đỏ • 1911–1930
          </text>
        </svg>
      )}
    </div>
  );
};
