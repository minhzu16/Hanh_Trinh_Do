import React from "react";

interface CollectibleIllustrationProps {
  collectibleId: string;
  className?: string;
}

const IllustrationFrame: React.FC<{
  className: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={`${className} flex items-center justify-center overflow-hidden rounded-xl bg-[#110b08] border-2 border-amber-600/60 shadow-2xl select-none pointer-events-none`}>
    {children}
  </div>
);

// 1. tl-bao-nhan-dao: Báo L'Humanité (16-17/7/1920)
function BaoNhanDaoIllustration({ className }: { className: string }) {
  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 350" className="w-full h-full" role="img" aria-label="Báo L'Humanité 1920">
        <rect width="600" height="350" fill="#17100d" />
        <circle cx="300" cy="160" r="140" fill="#fef08a" opacity="0.1" />
        <g transform="translate(130, 20)">
          <rect width="340" height="300" rx="4" fill="#fbf8ee" stroke="#cbb994" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.7))" />
          <rect x="15" y="14" width="310" height="30" fill="#991b1b" rx="2" />
          <text x="170" y="35" fill="#fef08a" fontSize="17" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="3">
            L'HUMANITÉ
          </text>
          <text x="170" y="55" fill="#57534e" fontSize="9" fontFamily="serif" textAnchor="middle">
            VENDREDI 16 & SAMEDI 17 JUILLET 1920
          </text>
          <line x1="15" y1="62" x2="325" y2="62" stroke="#78716c" strokeWidth="1" />
          <rect x="15" y="70" width="310" height="32" fill="#292524" rx="2" />
          <text x="170" y="85" fill="#fde047" fontSize="10" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            PREMIÈRE ÉBAUCHE DES THÈSES
          </text>
          <text x="170" y="96" fill="#fef08a" fontSize="8.5" fontFamily="serif" textAnchor="middle">
            SUR LES QUESTIONS NATIONALES ET COLONIALES
          </text>
          <text x="170" y="118" fill="#991b1b" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            Par V. I. LÉNINE
          </text>
          <g stroke="#a8a29e" strokeWidth="1" opacity="0.8">
            <line x1="25" y1="135" x2="160" y2="135" /><line x1="25" y1="145" x2="160" y2="145" /><line x1="25" y1="155" x2="160" y2="155" />
            <line x1="25" y1="165" x2="160" y2="165" /><line x1="25" y1="175" x2="160" y2="175" /><line x1="25" y1="185" x2="160" y2="185" />
            <line x1="180" y1="135" x2="315" y2="135" /><line x1="180" y1="145" x2="315" y2="145" /><line x1="180" y1="155" x2="315" y2="155" />
            <line x1="180" y1="165" x2="315" y2="165" /><line x1="180" y1="175" x2="315" y2="175" /><line x1="180" y1="185" x2="315" y2="185" />
          </g>
          <rect x="20" y="215" width="300" height="65" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
          <text x="170" y="238" fill="#78350f" fontSize="10.5" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            "Luận cương của Lênin chỉ rõ con đường giải phóng"
          </text>
          <text x="170" y="262" fill="#991b1b" fontSize="12" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            BẢO VẬT LỊCH SỬ • BÁO L'HUMANITÉ
          </text>
        </g>
        <text x="300" y="338" fill="#fde68a" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Báo L'Humanité (Nhân đạo) — Paris, tháng 7 năm 1920
        </text>
      </svg>
    </IllustrationFrame>
  );
}

// 2. tl-ban-yeu-sach: Bản Yêu sách 8 điểm (18/6/1919)
function BanYeuSachIllustration({ className }: { className: string }) {
  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 350" className="w-full h-full" role="img" aria-label="Bản Yêu sách của nhân dân An Nam">
        <rect width="600" height="350" fill="#18110d" />
        <g transform="translate(110, 15)">
          <rect width="380" height="305" rx="4" fill="#faf6ea" stroke="#cbb994" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.7))" />
          <rect x="15" y="12" width="350" height="26" fill="#8f1d2c" rx="2" />
          <text x="190" y="29" fill="#fef08a" fontSize="12" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
            REVENDICATIONS DU PEUPLE ANNAMITE
          </text>
          <text x="190" y="52" fill="#3b2011" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            YÊU SÁCH CỦA NHÂN DÂN AN NAM (18/6/1919)
          </text>
          <line x1="40" y1="60" x2="340" y2="60" stroke="#b48b55" strokeWidth="1" />
          <g transform="translate(25, 75)" fontSize="9" fontFamily="serif" fill="#2d1a0e" opacity="0.95">
            <text y="0">1. Tổng ân xá cho tất cả tù chính trị</text>
            <text y="16">2. Cải cách nền pháp lý ở Đông Dương</text>
            <text y="32">3. Tự do báo chí và tự do ngôn luận</text>
            <text y="48">4. Tự do lập hội và tự do hội họp</text>
            <text y="64">5. Tự do cư trú và xuất ngoại</text>
            <text y="80">6. Tự do học tập, mở các trường kỹ thuật</text>
            <text y="96">7. Thay chế độ sắc lệnh bằng chế độ luật</text>
            <text y="112">8. Có đại biểu thường trực tại Nghị viện Pháp</text>
          </g>
          <g transform="translate(260, 215)">
            <circle cx="35" cy="35" r="22" fill="#991b1b" opacity="0.85" />
            <text x="35" y="38" fill="#fef08a" fontSize="7.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">VERSAILLES</text>
            <text x="-40" y="28" fill="#78350f" fontSize="9.5" fontFamily="serif" fontStyle="italic">Thay mặt Nhóm người An Nam yêu nước</text>
            <text x="-40" y="46" fill="#991b1b" fontSize="13" fontFamily="serif" fontWeight="bold">Nguyễn Ái Quốc</text>
          </g>
        </g>
        <text x="300" y="338" fill="#fde68a" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Bản Yêu sách của nhân dân An Nam gửi Hội nghị Versailles — 1919
        </text>
      </svg>
    </IllustrationFrame>
  );
}

// 3. tl-dai-hoi-tours: Đại hội Tours (12/1920)
function DaiHoiToursIllustration({ className }: { className: string }) {
  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 350" className="w-full h-full" role="img" aria-label="Đại hội Tours 1920">
        <defs>
          <linearGradient id="toursHall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a0f18" />
            <stop offset="60%" stopColor="#2c1724" />
            <stop offset="100%" stopColor="#0f070e" />
          </linearGradient>
        </defs>
        <rect width="600" height="350" fill="url(#toursHall)" />
        {/* French Socialist Congress Banner */}
        <g transform="translate(100, 20)">
          <rect width="400" height="42" fill="#8f1d2c" stroke="#ca8a04" strokeWidth="2" rx="4" />
          <text x="200" y="26" fill="#fef08a" fontSize="12.5" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="1.5">
            18E CONGRÈS NATIONAL DU PARTI SOCIALISTE
          </text>
          <text x="200" y="38" fill="#fde68a" fontSize="9" fontFamily="serif" textAnchor="middle">
            SALLE DU MANÈGE • TOURS (25–30 DÉCEMBRE 1920)
          </text>
        </g>
        {/* Hall columns and crowd silhouettes */}
        <line x1="60" y1="60" x2="60" y2="280" stroke="#3b1f32" strokeWidth="12" />
        <line x1="540" y1="60" x2="540" y2="280" stroke="#3b1f32" strokeWidth="12" />
        <ellipse cx="300" cy="270" rx="220" ry="40" fill="#140a12" />
        {/* Nguyễn Ái Quốc proudly raising delegate voting card for the Third International */}
        <g transform="translate(275, 110)">
          {/* Raised voting card */}
          <rect x="42" y="-15" width="22" height="32" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="53" y="6" fill="#991b1b" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">III</text>
          {/* Hand & arm */}
          <line x1="28" y1="40" x2="50" y2="15" stroke="#fde68a" strokeWidth="6" strokeLinecap="round" />
          {/* Silhouette of Nguyễn Ái Quốc */}
          <ellipse cx="22" cy="30" rx="13" ry="17" fill="#fde68a" />
          <path d="M12 25 Q22 15 32 25 Q28 17 12 25 Z" fill="#0d0806" />
          <path d="M8 45 Q22 42 36 45 L42 120 Q22 125 2 120 Z" fill="#2b1424" />
          {/* Collar */}
          <path d="M18 45 L22 55 L26 45" stroke="#fde68a" strokeWidth="2" fill="none" />
        </g>
        {/* Historic Vote Result Banner */}
        <rect x="120" y="240" width="360" height="50" rx="6" fill="#1a0c16" stroke="#ca8a04" strokeWidth="2" />
        <text x="300" y="260" fill="#fef08a" fontSize="12" fontFamily="serif" fontWeight="bold" textAnchor="middle">
          BỎ PHIẾU TÁN THÀNH QUỐC TẾ III (LÊNIN)
        </text>
        <text x="300" y="278" fill="#fde68a" fontSize="10" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Nguyễn Ái Quốc trở thành một trong những người sáng lập Đảng Cộng sản Pháp
        </text>
        <text x="300" y="338" fill="#fde68a" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Đại hội Tours — Thành phố Tours, nước Pháp, tháng 12 năm 1920
        </text>
      </svg>
    </IllustrationFrame>
  );
}

// 4. tl-bao-thanh-nien: Báo Thanh Niên số 1 (21/6/1925)
function BaoThanhNienIllustration({ className }: { className: string }) {
  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 350" className="w-full h-full" role="img" aria-label="Báo Thanh Niên 1925">
        <rect width="600" height="350" fill="#19110d" />
        <g transform="translate(130, 20)">
          <rect width="340" height="295" rx="4" fill="#faf4e6" stroke="#cbb994" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.7))" />
          {/* Historic Chinese & Vietnamese Masthead */}
          <rect x="20" y="15" width="300" height="42" fill="#8f1d2c" rx="2" />
          <text x="170" y="36" fill="#fef08a" fontSize="18" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="4">
            THANH NIÊN
          </text>
          <text x="170" y="50" fill="#fde68a" fontSize="10" fontFamily="serif" textAnchor="middle">
            (青年) • SỐ 1 • NGÀY 21 THÁNG 6 NĂM 1925
          </text>
          <line x1="20" y1="62" x2="320" y2="62" stroke="#78350f" strokeWidth="1.5" />
          <text x="170" y="78" fill="#3b2011" fontSize="10.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            CƠ QUAN NGÔN LUẬN HỘI VN CÁCH MẠNG THANH NIÊN
          </text>
          <text x="170" y="93" fill="#78350f" fontSize="9.5" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Xuất bản tại Quảng Châu do đồng chí Nguyễn Ái Quốc sáng lập
          </text>
          {/* Lithograph stone-printed articles */}
          <g stroke="#78716c" strokeWidth="1.2" opacity="0.8">
            <line x1="30" y1="110" x2="160" y2="110" /><line x1="30" y1="122" x2="160" y2="122" /><line x1="30" y1="134" x2="160" y2="134" />
            <line x1="30" y1="146" x2="160" y2="146" /><line x1="30" y1="158" x2="160" y2="158" /><line x1="30" y1="170" x2="160" y2="170" />
            <line x1="180" y1="110" x2="310" y2="110" /><line x1="180" y1="122" x2="310" y2="122" /><line x1="180" y1="134" x2="310" y2="134" />
            <line x1="180" y1="146" x2="310" y2="146" /><line x1="180" y1="158" x2="310" y2="158" /><line x1="180" y1="170" x2="310" y2="170" />
          </g>
          {/* Slogan banner */}
          <rect x="25" y="195" width="290" height="75" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
          <text x="170" y="220" fill="#78350f" fontSize="10.5" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Ngọn cờ truyền bá Chủ nghĩa Mác - Lênin vào Việt Nam
          </text>
          <text x="170" y="245" fill="#991b1b" fontSize="13" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            BÁO THANH NIÊN SỐ 1 (1925)
          </text>
        </g>
        <text x="300" y="338" fill="#fde68a" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Báo Thanh Niên — Cội nguồn nền báo chí cách mạng Việt Nam, Quảng Châu 1925
        </text>
      </svg>
    </IllustrationFrame>
  );
}

// 5. tl-duong-cach-menh: Cuốn sách Đường kách mệnh (1927)
function DuongCachMenhIllustration({ className }: { className: string }) {
  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 350" className="w-full h-full" role="img" aria-label="Cuốn Đường cách mệnh 1927">
        <rect width="600" height="350" fill="#150f0c" />
        <g transform="translate(150, 15)">
          <rect width="300" height="305" rx="6" fill="#e9d8b4" stroke="#a47843" strokeWidth="3" filter="drop-shadow(0 10px 25px rgba(0,0,0,0.85))" />
          {/* Book spine line */}
          <line x1="28" y1="0" x2="28" y2="305" stroke="#78350f" strokeWidth="3" />
          <line x1="24" y1="0" x2="24" y2="305" stroke="#a47843" strokeWidth="1.5" />
          {/* Historic title in woodblock stamp typography */}
          <rect x="50" y="35" width="225" height="50" fill="#8f1d2c" rx="3" />
          <text x="162" y="66" fill="#fef08a" fontSize="17" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="3">
            ĐƯỜNG KÁCH MỆNH
          </text>
          <text x="162" y="115" fill="#451a03" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            NGUYỄN ÁI QUỐC (1927)
          </text>
          <line x1="60" y1="125" x2="265" y2="125" stroke="#78350f" strokeWidth="1" />
          {/* Famous opening quotation from Lenin */}
          <rect x="45" y="145" width="235" height="110" rx="3" fill="#f8eed3" stroke="#b48b55" strokeWidth="1.5" />
          <text x="162" y="172" fill="#78350f" fontSize="10.5" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            "Không có lý luận cách mệnh,
          </text>
          <text x="162" y="192" fill="#78350f" fontSize="10.5" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            thì không có phong trào cách mệnh..."
          </text>
          <text x="162" y="214" fill="#991b1b" fontSize="10" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            — Lênin —
          </text>
          <text x="162" y="242" fill="#991b1b" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            CÔNG NÔNG LÀ GỐC CÁCH MỆNH
          </text>
        </g>
        <text x="300" y="338" fill="#fde68a" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Tác phẩm Đường Kách mệnh — Xuất bản tại Quảng Châu năm 1927
        </text>
      </svg>
    </IllustrationFrame>
  );
}

// 6. tl-so-nha-5d-ham-long: Nhà 5D Hàm Long
function HamLongIllustration({ className }: { className: string }) {
  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 350" className="w-full h-full" role="img" aria-label="Nhà 5D Hàm Long">
        <defs>
          <linearGradient id="hamLongSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="100%" stopColor="#3f2418" />
          </linearGradient>
          <linearGradient id="hamLongWall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b7794b" />
            <stop offset="100%" stopColor="#5a3024" />
          </linearGradient>
        </defs>
        <rect width="600" height="350" fill="url(#hamLongSky)" />
        <circle cx="480" cy="58" r="32" fill="#fef3c7" opacity="0.35" />
        <rect y="250" width="600" height="100" fill="#17100d" />
        <path d="M75 250V140L120 100H475L525 140V250Z" fill="url(#hamLongWall)" stroke="#d6a15f" strokeWidth="3" />
        <path d="M65 142L300 65L535 142" fill="#3b2119" stroke="#e0b36b" strokeWidth="4" />
        <rect x="105" y="155" width="88" height="95" fill="#251612" stroke="#d6a15f" strokeWidth="3" />
        <rect x="225" y="150" width="150" height="100" fill="#291711" stroke="#d6a15f" strokeWidth="3" />
        <rect x="407" y="155" width="88" height="95" fill="#251612" stroke="#d6a15f" strokeWidth="3" />
        <g fill="#fef08a" opacity="0.85">
          <rect x="122" y="170" width="20" height="26" /><rect x="156" y="170" width="20" height="26" />
          <rect x="248" y="168" width="24" height="30" /><rect x="292" y="168" width="24" height="30" /><rect x="336" y="168" width="24" height="30" />
          <rect x="425" y="170" width="20" height="26" /><rect x="459" y="170" width="20" height="26" />
        </g>
        <line x1="300" y1="65" x2="300" y2="30" stroke="#d6a15f" strokeWidth="3" />
        <path d="M302 32H360L350 58H302Z" fill="#991b1b" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="300" y="130" fill="#fef3c7" fontSize="16" fontFamily="serif" fontWeight="bold" textAnchor="middle">5D HÀM LONG</text>
        <text x="300" y="325" fill="#fde68a" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Nơi thành lập Chi bộ cộng sản đầu tiên ở Việt Nam — Hà Nội, cuối tháng 3 năm 1929
        </text>
      </svg>
    </IllustrationFrame>
  );
}

// 7. tl-so-nha-312-kham-thien: Nhà 312 Khâm Thiên
function KhamThienIllustration({ className }: { className: string }) {
  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 350" className="w-full h-full" role="img" aria-label="Nhà 312 Khâm Thiên">
        <defs>
          <linearGradient id="khamThienSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#4a261a" />
          </linearGradient>
        </defs>
        <rect width="600" height="350" fill="url(#khamThienSky)" />
        <rect y="250" width="600" height="100" fill="#15100d" />
        <path d="M70 250V130L110 90H420L480 135V250Z" fill="#8f5737" stroke="#d6a15f" strokeWidth="3" />
        <path d="M55 132L110 90H420L495 135" fill="none" stroke="#e2b875" strokeWidth="5" />
        <rect x="105" y="145" width="120" height="105" fill="#271710" stroke="#d6a15f" strokeWidth="3" />
        <rect x="255" y="145" width="80" height="105" fill="#21130e" stroke="#d6a15f" strokeWidth="3" />
        <rect x="365" y="150" width="75" height="100" fill="#21130e" stroke="#d6a15f" strokeWidth="3" />
        <g fill="#fef08a" opacity="0.8">
          <rect x="125" y="165" width="28" height="35" /><rect x="175" y="165" width="28" height="35" />
          <rect x="278" y="165" width="28" height="35" /><rect x="388" y="170" width="28" height="32" />
        </g>
        <rect x="430" y="45" width="112" height="70" rx="3" fill="#f4ead2" stroke="#b45309" strokeWidth="3" transform="rotate(7 430 45)" />
        <text x="486" y="78" fill="#991b1b" fontSize="15" fontFamily="serif" fontWeight="bold" textAnchor="middle" transform="rotate(7 486 78)">BÚA LIỀM</text>
        <line x1="450" y1="90" x2="520" y2="98" stroke="#57534e" strokeWidth="2" transform="rotate(7 450 90)" />
        <text x="275" y="125" fill="#fef3c7" fontSize="16" fontFamily="serif" fontWeight="bold" textAnchor="middle">312 KHÂM THIÊN</text>
        <text x="300" y="325" fill="#fde68a" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Nơi thành lập Đông Dương Cộng sản Đảng và ra báo Búa Liềm — Hà Nội, 17/6/1929
        </text>
      </svg>
    </IllustrationFrame>
  );
}

// 8. tl-chanh-cuong-sach-luoc: Chánh cương vắn tắt & Sách lược vắn tắt (1930)
function ChanhCuongSachLuocIllustration({ className }: { className: string }) {
  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 350" className="w-full h-full" role="img" aria-label="Chánh cương vắn tắt và Sách lược vắn tắt">
        <rect width="600" height="350" fill="#180e0c" />
        <circle cx="300" cy="150" r="140" fill="#fef08a" opacity="0.12" />
        <g transform="translate(100, 20)">
          {/* Two Document Folios Side-by-Side */}
          {/* 1. Chánh cương vắn tắt */}
          <rect x="0" y="0" width="195" height="280" rx="4" fill="#faf5e8" stroke="#cbb994" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.7))" />
          <rect x="10" y="12" width="175" height="26" fill="#8f1d2c" rx="2" />
          <text x="97" y="29" fill="#fef08a" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            CHÁNH CƯƠNG VẮN TẮT
          </text>
          <text x="97" y="55" fill="#451a03" fontSize="9.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            CỦA ĐẢNG (3/2/1930)
          </text>
          <line x1="25" y1="64" x2="170" y2="64" stroke="#78350f" strokeWidth="1" />
          <g stroke="#78716c" strokeWidth="1.2" opacity="0.8">
            <line x1="20" y1="80" x2="175" y2="80" /><line x1="20" y1="94" x2="175" y2="94" /><line x1="20" y1="108" x2="175" y2="108" />
            <line x1="20" y1="122" x2="175" y2="122" /><line x1="20" y1="136" x2="175" y2="136" />
          </g>
          <rect x="15" y="160" width="165" height="95" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
          <text x="97" y="180" fill="#991b1b" fontSize="10.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            LÀM TƯ SẢN DÂN QUYỀN
          </text>
          <text x="97" y="196" fill="#991b1b" fontSize="10.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            CÁCH MỆNH & THỔ ĐỊA
          </text>
          <text x="97" y="214" fill="#78350f" fontSize="9" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            để đi tới xã hội cộng sản
          </text>

          {/* 2. Sách lược vắn tắt */}
          <rect x="205" y="0" width="195" height="280" rx="4" fill="#faf5e8" stroke="#cbb994" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.7))" />
          <rect x="215" y="12" width="175" height="26" fill="#8f1d2c" rx="2" />
          <text x="302" y="29" fill="#fef08a" fontSize="11" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            SÁCH LƯỢC VẮN TẮT
          </text>
          <text x="302" y="55" fill="#451a03" fontSize="9.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            CỦA ĐẢNG (3/2/1930)
          </text>
          <line x1="230" y1="64" x2="375" y2="64" stroke="#78350f" strokeWidth="1" />
          <g stroke="#78716c" strokeWidth="1.2" opacity="0.8">
            <line x1="225" y1="80" x2="380" y2="80" /><line x1="225" y1="94" x2="380" y2="94" /><line x1="225" y1="108" x2="380" y2="108" />
            <line x1="225" y1="122" x2="380" y2="122" /><line x1="225" y1="136" x2="380" y2="136" />
          </g>
          <rect x="220" y="160" width="165" height="95" rx="3" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
          <text x="302" y="180" fill="#991b1b" fontSize="10.5" fontFamily="serif" fontWeight="bold" textAnchor="middle">
            ĐẢNG LÀ ĐỘI TIÊN PHONG
          </text>
          <text x="302" y="196" fill="#78350f" fontSize="9.5" fontFamily="serif" textAnchor="middle">
            Công - Nông là gốc cách mạng
          </text>
          <text x="302" y="214" fill="#78350f" fontSize="9" fontFamily="serif" fontStyle="italic" textAnchor="middle">
            Đoàn kết toàn dân tộc
          </text>
        </g>
        <text x="300" y="338" fill="#fde68a" fontSize="12" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          Cương lĩnh chính trị đầu tiên của Đảng Cộng sản Việt Nam — Soạn thảo bởi Nguyễn Ái Quốc (1930)
        </text>
      </svg>
    </IllustrationFrame>
  );
}

export const CollectibleIllustration: React.FC<CollectibleIllustrationProps> = ({
  collectibleId,
  className = "w-full h-56 sm:h-64"
}) => {
  switch (collectibleId) {
    case "tl-bao-nhan-dao":
      return <BaoNhanDaoIllustration className={className} />;
    case "tl-ban-yeu-sach":
      return <BanYeuSachIllustration className={className} />;
    case "tl-dai-hoi-tours":
      return <DaiHoiToursIllustration className={className} />;
    case "tl-bao-thanh-nien":
      return <BaoThanhNienIllustration className={className} />;
    case "tl-duong-cach-menh":
      return <DuongCachMenhIllustration className={className} />;
    case "tl-so-nha-5d-ham-long":
      return <HamLongIllustration className={className} />;
    case "tl-so-nha-312-kham-thien":
      return <KhamThienIllustration className={className} />;
    case "tl-chanh-cuong-sach-luoc":
      return <ChanhCuongSachLuocIllustration className={className} />;
    default:
      return (
        <IllustrationFrame className={className}>
          <svg viewBox="0 0 600 350" className="w-full h-full" role="img" aria-label="Tư liệu lịch sử">
            <rect width="600" height="350" fill="#17120e" />
            <path d="M170 250V70H430V250Z" fill="#f4ead2" stroke="#b45309" strokeWidth="4" />
            <text x="300" y="160" fill="#991b1b" fontSize="22" fontFamily="serif" fontWeight="bold" textAnchor="middle">
              TƯ LIỆU LỊCH SỬ
            </text>
            <text x="300" y="195" fill="#78350f" fontSize="13" fontFamily="serif" textAnchor="middle">
              HÀNH TRÌNH ĐỎ • 1911–1930
            </text>
          </svg>
        </IllustrationFrame>
      );
  }
};
