import React, { useEffect } from "react";
import { audioManager } from "../audio";
import type { Chapter } from "../engine/types";

interface PresenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJump: (targetId: string) => void;
  currentSceneId?: string;
  chapters?: Chapter[];
}

interface MilestoneItem {
  id: string;
  keyNum: string;
  title: string;
  cue: string;
  tag: string;
}

const PRESENTATION_MILESTONES: MilestoneItem[] = [
  {
    id: "k0-c1",
    keyNum: "1",
    title: "1. Bến cảng Sài Gòn (1911)",
    cue: "Gợi ý: Hoàn cảnh và con đường mới",
    tag: "Kỳ 0 • Mở đầu"
  },
  {
    id: "k0-c5",
    keyNum: "2",
    title: "2. Đại hội Tua (12/1920)",
    cue: "Gợi ý: Bỏ phiếu tán thành Quốc tế III",
    tag: "Kỳ 0 • Bước ngoặt"
  },
  {
    id: "k1-c2",
    keyNum: "3",
    title: "3. Lớp huấn luyện Quảng Châu",
    cue: "Gợi ý: Tổ chức tiền thân của Đảng",
    tag: "Kỳ 1 • Chuẩn bị"
  },
  {
    id: "k1-c5",
    keyNum: "4",
    title: "4. Ba tổ chức cộng sản (1929)",
    cue: "Gợi ý: Nhu cầu cấp thiết thống nhất",
    tag: "Kỳ 1 • Phân hóa"
  },
  {
    id: "k2-c2",
    keyNum: "5",
    title: "5. Hội nghị hợp nhất Đảng (1930)",
    cue: "Gợi ý: Vai trò đồng chí Nguyễn Ái Quốc",
    tag: "Kỳ 2 • Mốc son"
  },
  {
    id: "k2-c4",
    keyNum: "6",
    title: "6. Cương lĩnh chính trị đầu tiên",
    cue: "Gợi ý: Chánh cương và Sách lược vắn tắt",
    tag: "Kỳ 2 • Văn kiện"
  },
  {
    id: "quiz",
    keyNum: "7",
    title: "7. Trò chơi củng cố kiến thức",
    cue: "Gợi ý: Ghép từ, điền ô khuyết, tư liệu",
    tag: "Tương tác • Đa dạng"
  },
  {
    id: "summary",
    keyNum: "8",
    title: "8. Sơ đồ các ngã rẽ & Tổng kết",
    cue: "Gợi ý: Flowchart 21 nhánh lịch sử giả",
    tag: "Tổng kết • Đánh giá"
  }
];

export const PresenterModal: React.FC<PresenterModalProps> = ({
  isOpen,
  onClose,
  onJump,
  currentSceneId,
  chapters
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key.toLowerCase() === "p") {
        e.preventDefault();
        onClose();
        return;
      }

      const found = PRESENTATION_MILESTONES.find((m) => m.keyNum === e.key);
      if (found) {
        e.preventDefault();
        audioManager.playSfx("sfx-chon");
        onJump(found.id);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onJump]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="presenter-modal-title"
        className="relative w-full max-w-2xl bg-[#1b120c] border-2 border-amber-500/80 rounded-2xl shadow-2xl p-5 sm:p-7 text-stone-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-900/60">
          <div className="flex items-center space-x-2.5">
            <span className="text-2xl">🎤</span>
            <div>
              <h2 id="presenter-modal-title" className="font-serif font-bold text-amber-200 text-base sm:text-lg">
                Bảng điều khiển diễn giả (Phím P)
              </h2>
              <p className="text-xs text-stone-400 font-serif">
                Chế độ Trình chiếu: Chọn cảnh giảng dạy
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 flex items-center justify-center text-sm cursor-pointer transition"
            title="Đóng (Esc hoặc P)"
          >
            ✕
          </button>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4 max-h-[60vh] overflow-y-auto pr-1">
          {PRESENTATION_MILESTONES.map((item) => {
            const isActive = currentSceneId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  audioManager.playSfx("sfx-chon");
                  onJump(item.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-red-950/80 border-amber-400 ring-2 ring-amber-400/30 text-amber-100"
                    : "bg-stone-900/80 hover:bg-amber-950/60 border-stone-800 hover:border-amber-700/60 text-stone-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/60 border border-amber-500/30 text-amber-400 font-bold">
                    Phím [{item.keyNum}]
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {item.tag}
                  </span>
                </div>

                <p className="font-serif font-bold text-xs sm:text-sm text-amber-200 leading-snug">
                  {item.title}
                </p>

                <p className="text-[11px] font-serif text-stone-400 italic mt-1">
                  {item.cue}
                </p>
              </button>
            );
          })}
          {chapters?.map((chapter) => (
            <div key={chapter.id} className="sm:col-span-2 space-y-2 border-t border-amber-900/40 pt-3">
              <h3 className="text-sm font-serif font-bold text-amber-400">
                {chapter.title} ({chapter.period})
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {chapter.scenes.map((sceneId) => (
                  <button
                    key={sceneId}
                    onClick={() => {
                      audioManager.playSfx("sfx-chon");
                      onJump(sceneId);
                      onClose();
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded border transition cursor-pointer ${
                      currentSceneId === sceneId
                        ? "bg-red-950/80 border-amber-400 text-amber-100"
                        : "bg-stone-900/80 border-stone-800 hover:border-amber-700/60 text-stone-300"
                    }`}
                  >
                    {sceneId}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-3 border-t border-amber-900/40 text-xs text-stone-400">
          <span>Gõ phím 1–8 để nhảy ngay</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 cursor-pointer text-xs"
          >
            Đóng (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};
