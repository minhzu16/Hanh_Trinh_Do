import React, { useState, useMemo } from "react";
import type { GameContent, Source } from "../engine/types";

interface QuizScreenProps {
  content: GameContent;
  onFinishQuiz: (results: Record<string, boolean>) => void;
  onReturnMenu: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  content,
  onFinishQuiz,
  onReturnMenu
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answersMap, setAnswersMap] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const questions = content.quiz;
  const currentQ = questions[currentIdx];

  const sourcesMap = useMemo(() => {
    return new Map<string, Source>(content.sources.map((s) => [s.id, s]));
  }, [content.sources]);

  // Shuffle options once per question
  const shuffledOptions = useMemo(() => {
    if (!currentQ) return [];
    const all = [currentQ.answer, ...currentQ.distractors];
    // deterministic pseudo shuffle based on question id
    return all.sort((a, b) => (a.length % 2 === 0 ? 1 : -1) * (a.localeCompare(b)));
  }, [currentQ]);

  const currentSource = currentQ ? sourcesMap.get(currentQ.source) : undefined;

  const handleSelect = (opt: string) => {
    if (confirmed) return;
    setSelectedOption(opt);
  };

  const handleConfirm = () => {
    if (!selectedOption || !currentQ) return;
    const isCorrect = selectedOption === currentQ.answer;
    const updated = {
      ...answersMap,
      [currentQ.id]: isCorrect
    };
    setAnswersMap(updated);
    setConfirmed(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setConfirmed(false);
    } else {
      onFinishQuiz(answersMap);
    }
  };

  if (!currentQ) {
    return null;
  }

  const isCurrentCorrect = selectedOption === currentQ.answer;

  return (
    <div className="relative w-full h-screen flex flex-col justify-between p-6 sm:p-10 bg-gradient-to-b from-[#1c1410] to-[#110c0a] select-none overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-900/60 pb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">👩‍🎓</span>
          <div>
            <h3 className="font-serif font-bold text-amber-200 text-lg">
              {content.strings["quiz.title"] || "Lan kiểm tra bài"}
            </h3>
            <p className="text-xs text-stone-400">
              Câu hỏi củng cố kiến thức: {currentIdx + 1} / {questions.length}
            </p>
          </div>
        </div>

        <button
          onClick={onReturnMenu}
          className="px-3 py-1 rounded bg-stone-800 text-stone-300 hover:text-white text-xs border border-stone-700 cursor-pointer"
        >
          Menu
        </button>
      </div>

      {/* Main question box */}
      <div className="max-w-3xl w-full mx-auto my-auto py-6 space-y-6">
        {/* Question prompt */}
        <div className="bg-[#241a15] p-6 rounded-xl border-2 border-amber-700/70 shadow-xl">
          <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block mb-2">
            Câu số {currentIdx + 1}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f5ede0] font-semibold leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {shuffledOptions.map((opt, idx) => {
            let style = "bg-stone-900/90 border-stone-700 text-stone-200 hover:border-amber-500";
            if (confirmed) {
              if (opt === currentQ.answer) {
                style = "bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold";
              } else if (opt === selectedOption && !isCurrentCorrect) {
                style = "bg-red-950/90 border-red-500 text-red-200";
              } else {
                style = "bg-stone-900/50 border-stone-800 text-stone-500";
              }
            } else if (selectedOption === opt) {
              style = "bg-amber-950/90 border-amber-400 text-amber-200";
            }

            return (
              <button
                key={idx}
                disabled={confirmed}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all shadow-md cursor-pointer flex items-center space-x-3 ${style}`}
              >
                <span className="w-7 h-7 rounded-full bg-black/40 flex items-center justify-center text-xs font-bold font-serif flex-shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-base font-serif flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback area */}
        {confirmed && (
          <div className={`p-4 rounded-lg border animate-fadeIn ${
            isCurrentCorrect
              ? "bg-emerald-950/80 border-emerald-600 text-emerald-200"
              : "bg-red-950/80 border-red-700 text-red-200"
          }`}>
            <div className="flex items-center space-x-2 font-bold mb-1">
              <span>{isCurrentCorrect ? "✓ Chính xác!" : "✗ Chưa chính xác!"}</span>
            </div>
            {currentSource && (
              <p className="text-xs sm:text-sm italic opacity-90 mt-1">
                📖 Giáo trình Lịch sử Đảng, tr. {currentSource.pages}: {currentSource.text}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="max-w-3xl w-full mx-auto flex items-center justify-between pt-4 border-t border-amber-900/40">
        <div className="text-xs text-stone-400">
          Đúng: {Object.values(answersMap).filter(Boolean).length} / {questions.length}
        </div>

        {!confirmed ? (
          <button
            disabled={!selectedOption}
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-lg bg-[#9E1B1B] hover:bg-[#B52020] text-amber-100 font-semibold text-sm border border-amber-500/40 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
          >
            Trả lời
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm border border-emerald-400 cursor-pointer transition"
          >
            {currentIdx + 1 === questions.length ? "Xem Tổng Kết →" : "Câu tiếp theo →"}
          </button>
        )}
      </div>
    </div>
  );
};

