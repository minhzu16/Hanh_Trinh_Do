import React from "react";

interface CgIllustrationProps {
  assetId: string;
}

export const CgIllustration: React.FC<CgIllustrationProps> = ({ assetId }) => {
  return (
    <div className="w-full h-48 sm:h-64 my-2 flex items-center justify-center overflow-hidden rounded-xl bg-black/60 border border-amber-500/40 shadow-inner select-none pointer-events-none">
      {/* 1. cg-con-thuyen: Con thuyền giữa sóng, người cầm lái đứng vững */}
      {assetId === "cg-con-thuyen" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <defs>
            <linearGradient id="stormSea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a2e3b" />
              <stop offset="100%" stopColor="#0b151c" />
            </linearGradient>
            <linearGradient id="helmSun" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </linearGradient>
          </defs>
          <rect width="600" height="300" fill="#0f172a" />
          <polygon points="300,0 380,0 460,300 240,300" fill="#fef08a" opacity="0.12" />
          <path d="M0 240 Q150 160 300 240 Q450 180 600 240 L600 300 L0 300 Z" fill="url(#stormSea)" />
          <path d="M-50 260 Q100 200 280 260 Q460 210 650 270 L650 300 L-50 300 Z" fill="#081017" />
          <polygon points="200,240 380,240 430,210 160,225" fill="#3e271a" />
          <line x1="280" y1="230" x2="280" y2="70" stroke="#78350f" strokeWidth="6" />
          <polygon points="285,80 370,160 285,190" fill="#f8fafc" opacity="0.9" />
          <circle cx="230" cy="195" r="8" fill="#fbcfe8" />
          <polygon points="222,203 238,203 245,235 215,235" fill="#991b1b" />
          <circle cx="230" cy="195" r="14" fill="#fbbf24" opacity="0.3" />
        </svg>
      )}

      {/* 2. cg-ba-la-co-nhap-mot: Ba lá cờ đỏ nhập làm một */}
      {assetId === "cg-ba-la-co-nhap-mot" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#180e0c" />
          <circle cx="300" cy="150" r="160" fill="#eab308" opacity="0.18" />
          <circle cx="300" cy="150" r="100" fill="#ef4444" opacity="0.25" />
          <rect x="220" y="70" width="180" height="120" fill="#dc2626" rx="4" />
          <line x1="220" y1="60" x2="220" y2="240" stroke="#ca8a04" strokeWidth="6" />
          <circle cx="220" cy="58" r="7" fill="#facc15" />
          <circle cx="265" cy="115" r="22" stroke="#fef08a" strokeWidth="5" fill="none" strokeDasharray="38,25" transform="rotate(-30 265 115)" />
          <line x1="250" y1="135" x2="295" y2="90" stroke="#fef08a" strokeWidth="5" strokeLinecap="round" />
          <rect x="240" y="125" width="22" height="10" fill="#fef08a" rx="2" transform="rotate(45 240 125)" />
          <text x="300" y="240" fill="#fef08a" fontSize="20" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            ĐẢNG CỘNG SẢN VIỆT NAM (1930)
          </text>
        </svg>
      )}

      {/* 3. cg-ba-la-co: Ba lá cờ đỏ rời nhau trên 3 kỳ (1929) */}
      {assetId === "cg-ba-la-co" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#17110f" />
          <path d="M260 40 Q320 60 300 110 Q280 160 330 200 Q310 260 270 270" stroke="#78350f" strokeWidth="8" fill="none" opacity="0.4" />
          <rect x="120" y="50" width="90" height="60" fill="#b91c1c" rx="3" />
          <line x1="120" y1="45" x2="120" y2="135" stroke="#a16207" strokeWidth="4" />
          <text x="165" y="145" fill="#fde047" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Đông Dương CSĐ</text>

          <rect x="360" y="115" width="90" height="60" fill="#b91c1c" rx="3" />
          <line x1="360" y1="110" x2="360" y2="200" stroke="#a16207" strokeWidth="4" />
          <text x="405" y="210" fill="#fde047" fontSize="11" fontFamily="sans-serif" textAnchor="middle">ĐDCS Liên đoàn</text>

          <rect x="180" y="180" width="90" height="60" fill="#b91c1c" rx="3" />
          <line x1="180" y1="175" x2="180" y2="265" stroke="#a16207" strokeWidth="4" />
          <text x="225" y="275" fill="#fde047" fontSize="11" fontFamily="sans-serif" textAnchor="middle">An Nam CSĐ</text>
        </svg>
      )}

      {/* 4. cg-phong-cuu-long: Căn phòng nhỏ ở Cửu Long, 5 bóng người */}
      {assetId === "cg-phong-cuu-long" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#120c09" />
          <circle cx="300" cy="140" r="140" fill="#f59e0b" opacity="0.25" />
          <circle cx="300" cy="140" r="30" fill="#fef3c7" opacity="0.8" />
          <ellipse cx="300" cy="220" rx="190" ry="50" fill="#3b2318" />
          <ellipse cx="300" cy="105" rx="18" ry="24" fill="#090504" />
          <polygon points="275,130 325,130 335,210 265,210" fill="#090504" />
          <ellipse cx="190" cy="145" rx="16" ry="22" fill="#140c08" />
          <polygon points="170,170 210,170 220,230 160,230" fill="#140c08" />
          <ellipse cx="235" cy="130" rx="16" ry="22" fill="#140c08" />
          <polygon points="215,155 255,155 265,220 205,220" fill="#140c08" />
          <ellipse cx="365" cy="130" rx="16" ry="22" fill="#140c08" />
          <polygon points="345,155 385,155 395,220 335,220" fill="#140c08" />
          <ellipse cx="410" cy="145" rx="16" ry="22" fill="#140c08" />
          <polygon points="390,170 430,170 440,230 380,230" fill="#140c08" />
        </svg>
      )}

      {/* 5. cg-vong-doan-ket: Vòng đại đoàn kết toàn dân tộc */}
      {assetId === "cg-vong-doan-ket" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#18100e" />
          <circle cx="300" cy="150" r="120" stroke="#3b82f6" strokeWidth="3" fill="#1e3a8a" opacity="0.15" />
          <circle cx="300" cy="150" r="85" stroke="#eab308" strokeWidth="3" fill="#854d0e" opacity="0.25" />
          <circle cx="300" cy="150" r="50" stroke="#ef4444" strokeWidth="4" fill="#991b1b" opacity="0.4" />
          <text x="300" y="146" fill="#fef08a" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle">CÔNG - NÔNG</text>
          <text x="300" y="162" fill="#fde047" fontSize="11" fontFamily="sans-serif" textAnchor="middle">(Gốc cách mạng)</text>
          <text x="300" y="90" fill="#fef08a" fontSize="12" fontFamily="serif" textAnchor="middle">Tiểu tư sản, Trí thức, Trung nông (Bầu bạn)</text>
          <text x="300" y="245" fill="#93c5fd" fontSize="12" fontFamily="serif" textAnchor="middle">Phú nông, Địa chủ, Tư sản yêu nước (Trung lập / Lợi dụng)</text>
        </svg>
      )}

      {/* 6. cg-to-yeu-sach: Bản Yêu sách của nhân dân An Nam */}
      {assetId === "cg-to-yeu-sach" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#1c1917" />
          <rect x="180" y="25" width="240" height="250" fill="#f5eedc" rx="4" />
          <rect x="200" y="45" width="200" height="20" fill="#9e1b1b" rx="2" />
          <text x="300" y="59" fill="#fef08a" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            REVENDICATIONS DU PEUPLE ANNAMITE
          </text>
          <text x="300" y="80" fill="#44403c" fontSize="12" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            YÊU SÁCH CỦA NHÂN DÂN AN NAM (1919)
          </text>
          <line x1="210" y1="100" x2="390" y2="100" stroke="#78716c" strokeWidth="2" />
          <line x1="210" y1="120" x2="390" y2="120" stroke="#a8a29e" strokeWidth="1.5" />
          <line x1="210" y1="140" x2="390" y2="140" stroke="#a8a29e" strokeWidth="1.5" />
          <line x1="210" y1="160" x2="390" y2="160" stroke="#a8a29e" strokeWidth="1.5" />
          <line x1="210" y1="180" x2="390" y2="180" stroke="#a8a29e" strokeWidth="1.5" />
          <text x="350" y="245" fill="#7f1d1d" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="end">
            Nguyễn Ái Quốc
          </text>
        </svg>
      )}

      {/* 7. cg-bang-den: Dòng chữ trên bảng đen */}
      {assetId === "cg-bang-den" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#131915" stroke="#78350f" strokeWidth="12" />
          <text x="300" y="100" fill="#fef08a" fontSize="22" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            "CÔNG NÔNG LÀ GỐC CÁCH MỆNH"
          </text>
          <text x="300" y="155" fill="#e2e8f0" fontSize="16" fontFamily="serif" textAnchor="middle">
            Còn học trò, nhà buôn nhỏ, điền chủ nhỏ...
          </text>
          <text x="300" y="185" fill="#e2e8f0" fontSize="16" fontFamily="serif" textAnchor="middle">
            là bầu bạn cách mệnh của công nông!
          </text>
          <text x="300" y="235" fill="#facc15" fontSize="14" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            — Trích Đường cách mệnh (1927) —
          </text>
        </svg>
      )}

      {/* 8. cg-cang-bien-truc-xuat: Nhóm du học sinh bị lính áp giải xuống tàu (Kỳ 0 - F-11) */}
      {assetId === "cg-cang-bien-truc-xuat" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <defs>
            <linearGradient id="pierFog" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#292524" />
              <stop offset="100%" stopColor="#0c0a09" />
            </linearGradient>
          </defs>
          <rect width="600" height="300" fill="#1c1917" />
          {/* Cold misty sea & huge steamship silhouette */}
          <path d="M0 160 L600 150 L600 300 L0 300 Z" fill="url(#pierFog)" />
          <polygon points="340,60 580,90 600,240 280,240" fill="#17120e" opacity="0.9" />
          {/* Steam funnel */}
          <rect x="420" y="30" width="45" height="50" fill="#292524" />
          <path d="M410 25 Q440 5 490 10 Q450 30 430 30 Z" fill="#78716c" opacity="0.3" />
          {/* Wooden pier and gangplank */}
          <rect x="0" y="230" width="360" height="70" fill="#291a13" />
          <polygon points="180,240 340,170 355,178 190,250" fill="#442a1d" />
          <line x1="180" y1="230" x2="340" y2="160" stroke="#78350f" strokeWidth="3" />
          {/* Silhouette: Colonial guards and deported students */}
          {/* Guard with bayonet rifle */}
          <ellipse cx="140" cy="195" rx="9" ry="11" fill="#0c0a09" />
          <polygon points="130,205 150,205 155,245 125,245" fill="#0c0a09" />
          <line x1="150" y1="200" x2="158" y2="160" stroke="#0c0a09" strokeWidth="2.5" />
          {/* Student 1 bowed head walking up gangplank */}
          <ellipse cx="230" cy="178" rx="8" ry="10" fill="#0c0a09" />
          <polygon points="222,188 238,188 244,220 218,220" fill="#0c0a09" />
          {/* Student 2 carrying bundle looking back */}
          <ellipse cx="270" cy="160" rx="8" ry="10" fill="#0c0a09" />
          <polygon points="262,170 278,170 284,200 258,200" fill="#0c0a09" />
          <circle cx="282" cy="178" r="6" fill="#44403c" />
          {/* Caption banner overlay */}
          <text x="300" y="275" fill="#fde68a" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Phong trào Đông Du tan rã (1908–1909) — Du học sinh bị trục xuất, con đường cầu viện ngoại bang bế tắc
          </text>
        </svg>
      )}

      {/* 9. cg-chong-thue: Đoàn biểu tình chống thuế bị đàn áp (Kỳ 0 - F-11) */}
      {assetId === "cg-chong-thue" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <defs>
            <linearGradient id="dustSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="50%" stopColor="#291307" />
              <stop offset="100%" stopColor="#0c0a09" />
            </linearGradient>
          </defs>
          <rect width="600" height="300" fill="url(#dustSky)" />
          {/* Arid landscape with dust and smoke */}
          <path d="M0 210 Q200 190 400 215 Q500 200 600 220 L600 300 L0 300 Z" fill="#1c1109" />
          {/* Broken wooden fences & fallen placards */}
          <line x1="80" y1="220" x2="140" y2="245" stroke="#78350f" strokeWidth="4" />
          <line x1="110" y1="210" x2="105" y2="240" stroke="#78350f" strokeWidth="3" />
          {/* Crowd of peasants with conical hats (nón lá) facing barrier */}
          {[120, 160, 195, 230, 265].map((x, i) => (
            <g key={i}>
              <polygon points={`${x-14},${195+i%2*6} ${x+14},${195+i%2*6} ${x},${180+i%2*6}`} fill="#ca8a04" opacity="0.85" />
              <polygon points={`${x-8},${195+i%2*6} ${x+8},${195+i%2*6} ${x+10},235 ${x-10},235`} fill="#0c0a09" />
            </g>
          ))}
          {/* Colonial troops line with rifles leveled */}
          <line x1="380" y1="205" x2="520" y2="205" stroke="#991b1b" strokeWidth="2" strokeDasharray="4,4" />
          {[420, 460, 500].map((x, i) => (
            <g key={i}>
              <ellipse cx={x} cy={185} rx="8" ry="10" fill="#1e293b" />
              <polygon points={`${x-7},195 ${x+7},195 ${x+9},235 ${x-9},235`} fill="#0f172a" />
              <line x1={x-5} y1="198" x2={x-30} y2="198" stroke="#cbd5e1" strokeWidth="2.5" />
            </g>
          ))}
          <text x="300" y="275" fill="#fde68a" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Phong trào chống sưu thuế Trung Kỳ (1908) — Cuộc đấu tranh tự phát bị thực dân đàn áp đẫm máu
          </text>
        </svg>
      )}

      {/* 10. cg-bao-nhan-dao: Tờ báo L'Humanité số 16-17/7/1920 (Kỳ 0 - F-11) */}
      {assetId === "cg-bao-nhan-dao" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#1c1917" />
          {/* Radiant light beam from newspaper */}
          <circle cx="300" cy="140" r="150" fill="#eab308" opacity="0.12" />
          <polygon points="300,10 180,280 420,280" fill="#fef08a" opacity="0.08" />
          {/* Vintage French Newspaper Page */}
          <rect x="170" y="20" width="260" height="255" fill="#f6f0df" rx="3" stroke="#d6c7a7" strokeWidth="2" />
          {/* Header Bar */}
          <rect x="185" y="32" width="230" height="22" fill="#991b1b" rx="2" />
          <text x="300" y="48" fill="#fef08a" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="2">
            L'HUMANITÉ
          </text>
          <text x="300" y="65" fill="#57534e" fontSize="9" fontFamily="serif" textAnchor="middle">
            JOURNAL SOCIALISTE QUOTIDIEN • 16-17 JUILLET 1920
          </text>
          <line x1="185" y1="72" x2="415" y2="72" stroke="#78716c" strokeWidth="1.5" />
          {/* Historic Article Title */}
          <rect x="185" y="80" width="230" height="28" fill="#292524" rx="2" />
          <text x="300" y="93" fill="#fde047" fontSize="9.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            PREMIÈRE ÉBAUCHE DES THÈSES
          </text>
          <text x="300" y="104" fill="#fef08a" fontSize="8" fontFamily="serif" textAnchor="middle">
            SUR LES QUESTIONS NATIONALES ET COLONIALES
          </text>
          {/* Columns of French newsprint */}
          <g opacity="0.75">
            <line x1="190" y1="120" x2="290" y2="120" stroke="#78716c" strokeWidth="1.5" />
            <line x1="190" y1="130" x2="290" y2="130" stroke="#a8a29e" strokeWidth="1" />
            <line x1="190" y1="140" x2="290" y2="140" stroke="#a8a29e" strokeWidth="1" />
            <line x1="190" y1="150" x2="290" y2="150" stroke="#a8a29e" strokeWidth="1" />
            <line x1="190" y1="160" x2="290" y2="160" stroke="#a8a29e" strokeWidth="1" />
            <line x1="190" y1="170" x2="290" y2="170" stroke="#a8a29e" strokeWidth="1" />

            <line x1="310" y1="120" x2="410" y2="120" stroke="#78716c" strokeWidth="1.5" />
            <line x1="310" y1="130" x2="410" y2="130" stroke="#a8a29e" strokeWidth="1" />
            <line x1="310" y1="140" x2="410" y2="140" stroke="#a8a29e" strokeWidth="1" />
            <line x1="310" y1="150" x2="410" y2="150" stroke="#a8a29e" strokeWidth="1" />
            <line x1="310" y1="160" x2="410" y2="160" stroke="#a8a29e" strokeWidth="1" />
            <line x1="310" y1="170" x2="410" y2="170" stroke="#a8a29e" strokeWidth="1" />
          </g>
          {/* Lenin Byline */}
          <text x="300" y="200" fill="#991b1b" fontSize="12" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            V. I. LÉNINE
          </text>
          <text x="300" y="245" fill="#78350f" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            "Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta!"
          </text>
        </svg>
      )}

      {/* 11. cg-don-linh-dem: Cuộc nổi dậy bạo động vũ trang non yếu bị dập tắt (Kỳ 1 - F-11) */}
      {assetId === "cg-don-linh-dem" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#09090b" />
          {/* Night fortress wall & barbed wire */}
          <polygon points="0,170 600,160 600,300 0,300" fill="#18181b" />
          <rect x="360" y="80" width="80" height="90" fill="#1c1917" stroke="#292524" strokeWidth="2" />
          {/* Searchlight sweeping through darkness */}
          <polygon points="400,90 100,280 250,280" fill="#fef08a" opacity="0.15" />
          {/* Smoke and red embers */}
          <circle cx="280" cy="190" r="35" fill="#dc2626" opacity="0.2" />
          <circle cx="280" cy="190" r="15" fill="#ea580c" opacity="0.3" />
          {/* Fallen staves and barricade */}
          <line x1="160" y1="230" x2="220" y2="250" stroke="#78350f" strokeWidth="4" />
          <line x1="190" y1="215" x2="175" y2="255" stroke="#78350f" strokeWidth="3" />
          {/* Guard silhouette on tower */}
          <ellipse cx="400" cy="68" rx="7" ry="9" fill="#09090b" />
          <line x1="400" y1="77" x2="400" y2="85" stroke="#09090b" strokeWidth="3" />
          <line x1="400" y1="73" x2="380" y2="65" stroke="#71717a" strokeWidth="2" />
          <text x="300" y="275" fill="#fca5a5" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Bạo động non yếu không có giác ngộ quần chúng — Ngọn lửa lẻ loi nhanh chóng bị dập tắt
          </text>
        </svg>
      )}

      {/* 12. cg-dam-dong-mua: Đám đông tản mát dưới mưa vì thiếu tổ chức (Kỳ 1 - F-11) */}
      {assetId === "cg-dam-dong-mua" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#0f172a" />
          {/* Heavy rain lines */}
          <g stroke="#38bdf8" strokeWidth="1" opacity="0.25">
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={i} x1={i * 26} y1="0" x2={i * 26 - 40} y2="300" strokeDasharray="15,10" />
            ))}
          </g>
          {/* Muddy ground and puddles */}
          <path d="M0 220 Q300 200 600 225 L600 300 L0 300 Z" fill="#0b1120" />
          <ellipse cx="300" cy="245" rx="140" ry="25" fill="#1e293b" opacity="0.6" />
          {/* Scattered people hurrying away with umbrellas or hands over heads */}
          {/* Person 1 left */}
          <ellipse cx="120" cy="200" rx="20" ry="8" fill="#1e293b" />
          <polygon points="112,208 128,208 132,240 108,240" fill="#020617" />
          {/* Person 2 right */}
          <ellipse cx="480" cy="195" rx="22" ry="9" fill="#1e293b" />
          <polygon points="472,204 488,204 492,238 468,238" fill="#020617" />
          {/* Solitary lost figure center */}
          <ellipse cx="300" cy="205" rx="7" ry="9" fill="#020617" />
          <polygon points="293,214 307,214 310,248 290,248" fill="#020617" />
          <text x="300" y="275" fill="#93c5fd" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Quần chúng thiếu ngọn cờ dẫn đường — Phong trào tự phát dễ hoang mang và tản mát
          </text>
        </svg>
      )}

      {/* 13. cg-truyen-don-trai-nguoc: Ba nhóm phát truyền đơn trái ngược nhau (Kỳ 2 - F-11) */}
      {assetId === "cg-truyen-don-trai-nguoc" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#18110e" />
          {/* Three dividing diagonal road paths */}
          <polygon points="300,60 0,300 60,300" fill="#261a15" />
          <polygon points="300,60 260,300 340,300" fill="#2d1e18" />
          <polygon points="300,60 540,300 600,300" fill="#261a15" />
          {/* Three flutter of conflicting red leaflets */}
          {/* Group 1 Left: DDCSD */}
          <rect x="80" y="150" width="35" height="25" fill="#dc2626" rx="2" transform="rotate(-15 80 150)" />
          <text x="95" y="165" fill="#fef08a" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">ĐDCSĐ</text>
          <ellipse cx="140" cy="195" rx="8" ry="10" fill="#0c0a09" />
          <polygon points="132,205 148,205 152,240 128,240" fill="#0c0a09" />

          {/* Group 2 Center: ANCSD */}
          <rect x="285" y="130" width="35" height="25" fill="#b91c1c" rx="2" transform="rotate(10 285 130)" />
          <text x="302" y="145" fill="#fef08a" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">ANCSĐ</text>
          <ellipse cx="300" cy="180" rx="8" ry="10" fill="#0c0a09" />
          <polygon points="292,190 308,190 312,230 288,230" fill="#0c0a09" />

          {/* Group 3 Right: DDCSLD */}
          <rect x="470" y="155" width="35" height="25" fill="#991b1b" rx="2" transform="rotate(25 470 155)" />
          <text x="487" y="170" fill="#fef08a" fontSize="7" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">ĐDCSLĐ</text>
          <ellipse cx="450" cy="195" rx="8" ry="10" fill="#0c0a09" />
          <polygon points="442,205 458,205 462,240 438,240" fill="#0c0a09" />

          <text x="300" y="275" fill="#fde68a" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Ba tổ chức cộng sản tranh giành ảnh hưởng — Nguy cơ phân tán lực lượng trước mắt kẻ thù
          </text>
        </svg>
      )}

      {/* 14. cg-lang-chia-re: Làng quê chia rẽ, địa chủ nhỏ yêu nước quay lưng bỏ đi (Kỳ 2 - F-11) */}
      {assetId === "cg-lang-chia-re" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <defs>
            <linearGradient id="splitSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#292524" />
              <stop offset="100%" stopColor="#14110f" />
            </linearGradient>
          </defs>
          <rect width="600" height="300" fill="url(#splitSky)" />
          {/* Traditional bamboo thicket & village gate */}
          <path d="M0 220 L600 215 L600 300 L0 300 Z" fill="#1c140e" />
          {/* Bamboo stalks on edges */}
          <g stroke="#14532d" strokeWidth="4" opacity="0.5">
            <line x1="40" y1="90" x2="45" y2="230" />
            <line x1="60" y1="110" x2="62" y2="230" />
            <line x1="80" y1="80" x2="78" y2="230" />
          </g>
          {/* Divide chasm in center */}
          <polygon points="285,150 315,150 330,300 270,300" fill="#0a0705" />
          {/* Left: Villagers meeting */}
          <ellipse cx="200" cy="180" rx="9" ry="11" fill="#0c0a09" />
          <polygon points="190,191 210,191 215,235 185,235" fill="#0c0a09" />
          <ellipse cx="160" cy="185" rx="8" ry="10" fill="#0c0a09" />
          <polygon points="152,195 168,195 172,235 148,235" fill="#0c0a09" />
          {/* Right: Solitary patriotic small landholder walking away into shadow */}
          <ellipse cx="430" cy="175" rx="9" ry="11" fill="#3b271d" />
          <polygon points="420,186 440,186 448,238 412,238" fill="#261710" />
          <polygon points="418,175 442,175 430,165" fill="#523b2b" /> {/* Khăn đóng */}
          <text x="300" y="275" fill="#fde68a" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Cô lập lực lượng tiến bộ yêu nước — Sai lầm tả khuynh đẩy đồng minh sang phía kẻ thù
          </text>
        </svg>
      )}

      {/* Neutral dignified fallback for any unlisted asset */}
      {!["cg-con-thuyen", "cg-ba-la-co-nhap-mot", "cg-ba-la-co", "cg-phong-cuu-long", "cg-vong-doan-ket", "cg-to-yeu-sach", "cg-bang-den", "cg-cang-bien-truc-xuat", "cg-chong-thue", "cg-bao-nhan-dao", "cg-don-linh-dem", "cg-dam-dong-mua", "cg-truyen-don-trai-nguoc", "cg-lang-chia-re"].includes(assetId) && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#17120e" />
          <rect x="50" y="25" width="500" height="250" rx="8" fill="#221812" stroke="#78350f" strokeWidth="2" strokeDasharray="6,6" />
          <circle cx="300" cy="120" r="35" fill="#2d1e16" stroke="#92400e" strokeWidth="2" />
          <text x="300" y="132" fill="#d97706" fontSize="28" textAnchor="middle">🏛️</text>
          <text x="300" y="190" fill="#fde68a" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            Minh Họa Sự Kiện Lịch Sử
          </text>
          <text x="300" y="215" fill="#a8a29e" fontSize="11" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Hành Trình Đỏ • 1911–1930
          </text>
        </svg>
      )}
    </div>
  );
};
