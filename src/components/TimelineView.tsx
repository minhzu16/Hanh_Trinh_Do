import React from "react";
import type { TimelineItem } from "../engine/types";

interface TimelineViewProps {
  items: TimelineItem[];
  onNext: () => void;
  nextLabel?: string;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  items,
  onNext,
  nextLabel = "Tiếp tục"
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-5 sm:p-6 rounded-xl bg-[#1d1815]/95 border-2 border-[#8b6f47] shadow-2xl animate-fadeIn flex flex-col max-h-[75vh]">
      <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-amber-900/40 flex-shrink-0">
        <span className="text-xl">⏳</span>
        <h4 className="text-sm uppercase tracking-wider font-bold text-amber-300">
          Dòng thời gian các sự kiện
        </h4>
      </div>

      <div className="space-y-3.5 my-2 overflow-y-auto pr-2 flex-1 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-amber-900/60">
        {items.map((item, idx) => (
          <div key={idx} className="relative flex items-start space-x-3.5 pl-1">
            <div className="w-6 h-6 rounded-full bg-[#8B1A1A] border-2 border-amber-400 flex items-center justify-center text-xs font-bold text-amber-200 z-10 flex-shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <div className="flex-1 bg-stone-900/80 p-3 rounded-lg border border-stone-800">
              <span className="inline-block text-xs font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/40 mb-1">
                {item.date}
              </span>
              <p className="text-sm sm:text-base text-stone-200 font-serif leading-relaxed">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-2 border-t border-stone-800 flex justify-end flex-shrink-0">
        <button
          onClick={onNext}
          className="px-6 py-2 rounded-lg bg-[#9E1B1B] hover:bg-[#B52020] text-amber-100 font-semibold text-sm border border-amber-500/40 transition cursor-pointer"
        >
          {nextLabel} ↵
        </button>
      </div>
    </div>
  );
};
