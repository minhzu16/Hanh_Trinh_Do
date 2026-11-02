import React from "react";
import type { DialogLogEntry } from "../engine/types";

interface LogModalProps {
  log: DialogLogEntry[];
  onClose: () => void;
  title?: string;
}

export const LogModal: React.FC<LogModalProps> = ({
  log,
  onClose,
  title = "Xem lại lời thoại"
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="log-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl max-h-[80vh] flex flex-col bg-[#1a1512] border-2 border-amber-700/80 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/60 bg-[#251e1a]">
          <h3 id="log-modal-title" className="font-serif font-bold text-lg text-amber-200">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {log.length === 0 ? (
            <p className="text-center text-stone-500 italic">Chưa có lời thoại nào.</p>
          ) : (
            log.map((entry, idx) => (
              <div key={idx} className="border-b border-stone-800/80 pb-3">
                {entry.speaker && (
                  <span className="block text-xs font-bold text-amber-400 mb-1">
                    {entry.speaker}
                  </span>
                )}
                <p className="text-sm sm:text-base font-serif text-stone-200 leading-relaxed">
                  {entry.text}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-amber-900/60 bg-[#251e1a] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm border border-stone-700 cursor-pointer"
          >
            Đóng (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};

