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
          {/* Breaking Light through storm */}
          <polygon points="300,0 380,0 460,300 240,300" fill="#fef08a" opacity="0.12" />
          {/* Storm waves */}
          <path d="M0 240 Q150 160 300 240 Q450 180 600 240 L600 300 L0 300 Z" fill="url(#stormSea)" />
          <path d="M-50 260 Q100 200 280 260 Q460 210 650 270 L650 300 L-50 300 Z" fill="#081017" />
          {/* The Boat navigating waves */}
          <polygon points="200,240 380,240 430,210 160,225" fill="#3e271a" />
          {/* Mast */}
          <line x1="280" y1="230" x2="280" y2="70" stroke="#78350f" strokeWidth="6" />
          {/* Sails filled with wind */}
          <polygon points="285,80 370,160 285,190" fill="#f8fafc" opacity="0.9" />
          {/* Helmsman standing steady */}
          <circle cx="230" cy="195" r="8" fill="#fbcfe8" />
          <polygon points="222,203 238,203 245,235 215,235" fill="#991b1b" />
          <circle cx="230" cy="195" r="14" fill="#fbbf24" opacity="0.3" />
        </svg>
      )}

      {/* 2. cg-ba-la-co-nhap-mot: Ba lá cờ đỏ nhập làm một */}
      {assetId === "cg-ba-la-co-nhap-mot" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#180e0c" />
          {/* Golden radial glory */}
          <circle cx="300" cy="150" r="160" fill="#eab308" opacity="0.18" />
          <circle cx="300" cy="150" r="100" fill="#ef4444" opacity="0.25" />
          {/* Massive Glorious Red Flag with Hammer & Sickle */}
          <rect x="220" y="70" width="180" height="120" fill="#dc2626" rx="4" />
          {/* Flagpole */}
          <line x1="220" y1="60" x2="220" y2="240" stroke="#ca8a04" strokeWidth="6" />
          <circle cx="220" cy="58" r="7" fill="#facc15" />
          {/* Golden Hammer & Sickle */}
          <circle cx="265" cy="115" r="22" stroke="#fef08a" strokeWidth="5" fill="none" strokeDasharray="38,25" transform="rotate(-30 265 115)" />
          <line x1="250" y1="135" x2="295" y2="90" stroke="#fef08a" strokeWidth="5" strokeLinecap="round" />
          <rect x="240" y="125" width="22" height="10" fill="#fef08a" rx="2" transform="rotate(45 240 125)" />
          {/* Heading */}
          <text x="300" y="240" fill="#fef08a" fontSize="20" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            ĐẢNG CỘNG SẢN VIỆT NAM (1930)
          </text>
        </svg>
      )}

      {/* 3. cg-ba-la-co: Ba lá cờ đỏ rời nhau trên 3 kỳ (1929) */}
      {assetId === "cg-ba-la-co" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#17110f" />
          {/* Map of Vietnam stylized */}
          <path d="M260 40 Q320 60 300 110 Q280 160 330 200 Q310 260 270 270" stroke="#78350f" strokeWidth="8" fill="none" opacity="0.4" />
          {/* Flag 1: Bắc Kỳ - Đông Dương Cộng sản Đảng */}
          <rect x="120" y="50" width="90" height="60" fill="#b91c1c" rx="3" />
          <line x1="120" y1="45" x2="120" y2="135" stroke="#a16207" strokeWidth="4" />
          <text x="165" y="145" fill="#fde047" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Đông Dương CSĐ</text>

          {/* Flag 2: Trung Kỳ - Đông Dương Cộng sản Liên đoàn */}
          <rect x="360" y="115" width="90" height="60" fill="#b91c1c" rx="3" />
          <line x1="360" y1="110" x2="360" y2="200" stroke="#a16207" strokeWidth="4" />
          <text x="405" y="210" fill="#fde047" fontSize="11" fontFamily="sans-serif" textAnchor="middle">ĐDCS Liên đoàn</text>

          {/* Flag 3: Nam Kỳ - An Nam Cộng sản Đảng */}
          <rect x="180" y="180" width="90" height="60" fill="#b91c1c" rx="3" />
          <line x1="180" y1="175" x2="180" y2="265" stroke="#a16207" strokeWidth="4" />
          <text x="225" y="275" fill="#fde047" fontSize="11" fontFamily="sans-serif" textAnchor="middle">An Nam CSĐ</text>
        </svg>
      )}

      {/* 4. cg-phong-cuu-long: Căn phòng nhỏ ở Cửu Long, 5 bóng người */}
      {assetId === "cg-phong-cuu-long" && (
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <rect width="600" height="300" fill="#120c09" />
          {/* Center warm oil-lamp glow */}
          <circle cx="300" cy="140" r="140" fill="#f59e0b" opacity="0.25" />
          <circle cx="300" cy="140" r="30" fill="#fef3c7" opacity="0.8" />
          {/* Table */}
          <ellipse cx="300" cy="220" rx="190" ry="50" fill="#3b2318" />
          {/* 5 Delegate Silhouettes around the table */}
          {/* Nguyen Ai Quoc in center presiding */}
          <ellipse cx="300" cy="105" rx="18" ry="24" fill="#090504" />
          <polygon points="275,130 325,130 335,210 265,210" fill="#090504" />
          {/* Trịnh Đình Cửu & Nguyễn Đức Cảnh */}
          <ellipse cx="190" cy="145" rx="16" ry="22" fill="#140c08" />
          <polygon points="170,170 210,170 220,230 160,230" fill="#140c08" />
          <ellipse cx="235" cy="130" rx="16" ry="22" fill="#140c08" />
          <polygon points="215,155 255,155 265,220 205,220" fill="#140c08" />
          {/* Châu Văn Liêm & Nguyễn Thiệu */}
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
          {/* Rings */}
          <circle cx="300" cy="150" r="120" stroke="#3b82f6" strokeWidth="3" fill="#1e3a8a" opacity="0.15" />
          <circle cx="300" cy="150" r="85" stroke="#eab308" strokeWidth="3" fill="#854d0e" opacity="0.25" />
          <circle cx="300" cy="150" r="50" stroke="#ef4444" strokeWidth="4" fill="#991b1b" opacity="0.4" />
          {/* Center core */}
          <text x="300" y="146" fill="#fef08a" fontSize="14" fontFamily="serif" fontWeight="bold" textAnchor="middle">CÔNG - NÔNG</text>
          <text x="300" y="162" fill="#fde047" fontSize="11" fontFamily="sans-serif" textAnchor="middle">(Gốc cách mạng)</text>
          {/* Outer ring */}
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

      {/* Default fallback for other CGs */}
      {!["cg-con-thuyen", "cg-ba-la-co-nhap-mot", "cg-ba-la-co", "cg-phong-cuu-long", "cg-vong-doan-ket", "cg-to-yeu-sach", "cg-bang-den"].includes(assetId) && (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <span className="text-4xl mb-2">🖼️</span>
          <span className="text-xs uppercase font-mono tracking-widest text-amber-400">
            {assetId}
          </span>
          <span className="text-sm font-serif text-stone-300 mt-1 max-w-sm">
            Tư liệu minh họa diễn biến lịch sử
          </span>
        </div>
      )}
    </div>
  );
};
