import React, { useState } from "react";
import type { ChoiceOption } from "../engine/types";

interface ChoicePanelProps {
  prompt: string;
  options: ChoiceOption[];
  onSelect: (key: "A" | "B" | "C") => void;
  title?: string;
}

export const ChoicePanel: React.FC<ChoicePanelProps> = ({
  prompt,
  options,
  onSelect,
  title = "Bạn sẽ chọn"
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (key: "A" | "B" | "C") => {
    if (isSubmitting) return; // UI-02: prevent double click
    setIsSubmitting(true);
    onSelect(key);
    // Reset after a brief delay
    setTimeout(() => setIsSubmitting(false), 500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 animate-fadeIn">
      {/* Choice Prompt Title */}
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-stone-900/90 px-3 py-1 rounded-full border border-amber-500/30">
          {title}
        </span>
        <h3 className="mt-2 text-xl sm:text-2xl font-serif font-bold text-amber-100 drop-shadow">
          {prompt}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mt-4">
        {options.map((opt, idx) => (
          <button
            key={opt.key}
            disabled={isSubmitting}
            onClick={() => handleSelect(opt.key)}
            className="w-full text-left group relative p-4 sm:p-5 rounded-lg border-2 border-[#8b6f47]/80 bg-[#1e1916]/95 hover:bg-[#2b221d] hover:border-[#c8a24a] hover:scale-[1.01] transition-all duration-150 shadow-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className="flex items-start space-x-3.5">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3d1a18] group-hover:bg-[#8B1A1A] border border-amber-600/50 flex items-center justify-center font-serif font-bold text-amber-300 transition-colors">
                {opt.key}
              </span>
              <div className="flex-1 pt-0.5">
                <p className="text-base sm:text-lg text-[#f3ead7] group-hover:text-amber-100 font-serif leading-snug">
                  {opt.text}
                </p>
              </div>
              <span className="text-xs text-stone-500 group-hover:text-amber-400 hidden sm:inline-block pt-1">
                Phím [{idx + 1}]
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

