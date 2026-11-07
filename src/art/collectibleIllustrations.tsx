import React from "react";
import { CgIllustration } from "./cgIllustrations";

interface CollectibleIllustrationProps {
  collectibleId: string;
  className?: string;
}

const COLLECTIBLE_CG_ASSETS: Record<string, string> = {
  "tl-bao-nhan-dao": "cg-bao-nhan-dao",
  "tl-ban-yeu-sach": "cg-to-yeu-sach",
  "tl-dai-hoi-tours": "cg-vong-doan-ket",
  "tl-bao-thanh-nien": "cg-ba-la-co",
  "tl-duong-cach-menh": "cg-bang-den",
  "tl-chanh-cuong-sach-luoc": "cg-vong-doan-ket"
};

const IllustrationFrame: React.FC<{
  className: string;
  children: React.ReactNode;
}> = ({ className, children }) => (
  <div className={`${className} flex items-center justify-center overflow-hidden rounded-xl bg-black/60 border border-amber-500/40 shadow-inner select-none pointer-events-none`}>
    {children}
  </div>
);

function HamLongIllustration({ className }: { className: string }) {
  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 300" className="w-full h-full" role="img" aria-label="Nhà 5D Hàm Long">
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
        <rect width="600" height="300" fill="url(#hamLongSky)" />
        <circle cx="480" cy="58" r="32" fill="#fef3c7" opacity="0.35" />
        <rect y="220" width="600" height="80" fill="#17100d" />
        <path d="M75 220V115L120 80H475L525 115V220Z" fill="url(#hamLongWall)" stroke="#d6a15f" strokeWidth="3" />
        <path d="M65 118L300 45L535 118" fill="#3b2119" stroke="#e0b36b" strokeWidth="4" />
        <rect x="105" y="130" width="88" height="90" fill="#251612" stroke="#d6a15f" strokeWidth="3" />
        <rect x="225" y="125" width="150" height="95" fill="#291711" stroke="#d6a15f" strokeWidth="3" />
        <rect x="407" y="130" width="88" height="90" fill="#251612" stroke="#d6a15f" strokeWidth="3" />
        <g fill="#fef08a" opacity="0.85">
          <rect x="122" y="148" width="20" height="26" /><rect x="156" y="148" width="20" height="26" />
          <rect x="248" y="145" width="24" height="30" /><rect x="292" y="145" width="24" height="30" /><rect x="336" y="145" width="24" height="30" />
          <rect x="425" y="148" width="20" height="26" /><rect x="459" y="148" width="20" height="26" />
        </g>
        <line x1="300" y1="45" x2="300" y2="10" stroke="#d6a15f" strokeWidth="3" />
        <path d="M302 12H360L350 38H302Z" fill="#991b1b" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="300" y="108" fill="#fef3c7" fontSize="16" fontFamily="serif" fontWeight="bold" textAnchor="middle">5D HÀM LONG</text>
        <text x="300" y="270" fill="#fde68a" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">Chi bộ cộng sản đầu tiên — Hà Nội, tháng 3 năm 1929</text>
      </svg>
    </IllustrationFrame>
  );
}

function KhamThienIllustration({ className }: { className: string }) {
  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 300" className="w-full h-full" role="img" aria-label="Nhà 312 Khâm Thiên">
        <defs>
          <linearGradient id="khamThienSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#4a261a" />
          </linearGradient>
        </defs>
        <rect width="600" height="300" fill="url(#khamThienSky)" />
        <rect y="222" width="600" height="78" fill="#15100d" />
        <path d="M70 222V105L110 70H420L480 112V222Z" fill="#8f5737" stroke="#d6a15f" strokeWidth="3" />
        <path d="M55 108L110 70H420L495 112" fill="none" stroke="#e2b875" strokeWidth="5" />
        <rect x="105" y="125" width="120" height="97" fill="#271710" stroke="#d6a15f" strokeWidth="3" />
        <rect x="255" y="125" width="80" height="97" fill="#21130e" stroke="#d6a15f" strokeWidth="3" />
        <rect x="365" y="130" width="75" height="92" fill="#21130e" stroke="#d6a15f" strokeWidth="3" />
        <g fill="#fef08a" opacity="0.8">
          <rect x="125" y="145" width="28" height="35" /><rect x="175" y="145" width="28" height="35" />
          <rect x="278" y="145" width="28" height="35" /><rect x="388" y="150" width="28" height="32" />
        </g>
        <rect x="430" y="30" width="112" height="70" rx="3" fill="#f4ead2" stroke="#b45309" strokeWidth="3" transform="rotate(7 430 30)" />
        <text x="486" y="62" fill="#991b1b" fontSize="15" fontFamily="serif" fontWeight="bold" textAnchor="middle" transform="rotate(7 486 62)">BÚA LIỀM</text>
        <line x1="450" y1="73" x2="520" y2="82" stroke="#57534e" strokeWidth="2" transform="rotate(7 450 73)" />
        <text x="275" y="108" fill="#fef3c7" fontSize="16" fontFamily="serif" fontWeight="bold" textAnchor="middle">312 KHÂM THIÊN</text>
        <text x="300" y="270" fill="#fde68a" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">Nơi thông qua Tuyên ngôn và xuất bản báo Búa liềm, 17/6/1929</text>
      </svg>
    </IllustrationFrame>
  );
}

export const CollectibleIllustration: React.FC<CollectibleIllustrationProps> = ({
  collectibleId,
  className = "w-full h-48 sm:h-56"
}) => {
  if (collectibleId === "tl-so-nha-5d-ham-long") {
    return <HamLongIllustration className={className} />;
  }
  if (collectibleId === "tl-so-nha-312-kham-thien") {
    return <KhamThienIllustration className={className} />;
  }

  const assetId = COLLECTIBLE_CG_ASSETS[collectibleId];
  if (assetId) {
    return <CgIllustration assetId={assetId} className={className} />;
  }

  return (
    <IllustrationFrame className={className}>
      <svg viewBox="0 0 600 300" className="w-full h-full" role="img" aria-label="Tư liệu lịch sử">
        <rect width="600" height="300" fill="#17120e" />
        <path d="M170 230V70H430V230Z" fill="#f4ead2" stroke="#b45309" strokeWidth="4" />
        <text x="300" y="150" fill="#991b1b" fontSize="22" fontFamily="serif" fontWeight="bold" textAnchor="middle">TƯ LIỆU LỊCH SỬ</text>
        <text x="300" y="182" fill="#78350f" fontSize="13" fontFamily="serif" textAnchor="middle">HÀNH TRÌNH ĐỎ</text>
      </svg>
    </IllustrationFrame>
  );
};
