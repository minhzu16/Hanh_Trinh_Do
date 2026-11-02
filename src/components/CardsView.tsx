import React, { useState } from "react";
import type { CardItem, Source } from "../engine/types";

interface CardsViewProps {
  items: CardItem[];
  sourcesMap: Map<string, Source>;
  onNext: () => void;
  nextLabel?: string;
}

export const CardsView: React.FC<CardsViewProps> = ({
  items,
  sourcesMap,
  onNext,
  nextLabel = "Tiếp tục"
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const activeCard = items[activeTab] || items[0];
  const activeSource = activeCard ? sourcesMap.get(activeCard.source) : undefined;
  const isLastCard = activeTab === items.length - 1;

  const handleStep = () => {
    if (!isLastCard) {
      setActiveTab((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-5 sm:p-6 rounded-xl bg-[#1d1815]/95 border-2 border-amber-600/70 shadow-2xl animate-fadeIn flex flex-col max-h-[75vh]">
      {/* Tabs */}
      <div className="flex border-b border-amber-900/50 pb-2 gap-2 overflow-x-auto flex-shrink-0">
        {items.map((card, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-1.5 rounded-t-lg text-sm font-semibold transition cursor-pointer whitespace-nowrap ${
              activeTab === idx
                ? "bg-[#8B1A1A] text-amber-200 border-t-2 border-x-2 border-amber-500"
                : "bg-stone-900/70 text-stone-400 hover:text-stone-200"
            }`}
          >
            {card.title}
          </button>
        ))}
      </div>

      {/* Card Content */}
      <div className="p-5 mt-3 min-h-[160px] bg-stone-900/80 rounded-lg border border-stone-800 flex flex-col justify-between overflow-y-auto flex-1">
        <div>
          <h4 className="text-lg font-serif font-bold text-amber-300 mb-2">
            {activeCard?.title}
          </h4>
          <p className="text-base sm:text-lg text-stone-200 font-serif leading-relaxed">
            {activeCard?.text}
          </p>
        </div>

        {activeSource && (
          <div className="mt-4 pt-2 border-t border-stone-800 text-xs text-amber-400/80 italic flex justify-between">
            <span>Giáo trình, tr. {activeSource.pages}</span>
            <span className="text-stone-500">{activeSource.id}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-2 border-t border-stone-800 flex items-center justify-between flex-shrink-0">
        <div className="text-xs text-stone-400">
          Thẻ {activeTab + 1} / {items.length}
        </div>
        <button
          onClick={handleStep}
          className="px-6 py-2 rounded-lg bg-[#9E1B1B] hover:bg-[#B52020] text-amber-100 font-semibold text-sm border border-amber-500/40 transition cursor-pointer"
        >
          {isLastCard ? `${nextLabel} ↵` : "Xem thẻ kế tiếp →"}
        </button>
      </div>
    </div>
  );
};
