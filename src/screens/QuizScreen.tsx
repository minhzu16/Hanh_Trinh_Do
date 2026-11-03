import React, { useState, useMemo, useEffect, useCallback } from "react";
import type { GameContent, Source } from "../engine/types";
import { audioManager } from "../audio";

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
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);

  const questions = content.quiz;
  const currentQ = questions[currentIdx];

  const sourcesMap = useMemo(() => {
    return new Map<string, Source>(content.sources.map((s) => [s.id, s]));
  }, [content.sources]);

  // Robust pseudo-random shuffle seeded by question ID hash
  const shuffledOptions = useMemo(() => {
    if (!currentQ) return [];
    const all = [currentQ.answer, ...currentQ.distractors];

    // Seed hash from id
    let seed = 0;
    for (let i = 0; i < currentQ.id.length; i++) {
      seed = (seed * 31 + currentQ.id.charCodeAt(i)) >>> 0;
    }

    // Fisher-Yates shuffle with simple PRNG
    const copy = [...all];
    for (let i = copy.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j = Math.floor((seed / 233280) * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }, [currentQ]);

  const currentSource = currentQ ? sourcesMap.get(currentQ.source) : undefined;

  const handleSelect = useCallback(
    (opt: string) => {
      if (confirmed) return;
      audioManager.playSfx("sfx-chon");
      setSelectedOption(opt);
    },
    [confirmed]
  );

  const handleConfirm = useCallback(() => {
    if (!selectedOption || !currentQ || confirmed) return;
    const isCorrect = selectedOption === currentQ.answer;
    const updated = {
      ...answersMap,
      [currentQ.id]: isCorrect
    };
    setAnswersMap(updated);
    setConfirmed(true);

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const earned = 100 + (newStreak - 1) * 50;
      setScore((prev) => prev + earned);
      audioManager.playSfx("sfx-vo-tay");
    } else {
      setStreak(0);
      audioManager.playSfx("sfx-wrong");
    }
  }, [selectedOption, currentQ, confirmed, answersMap, streak]);

  const handleNext = useCallback(() => {
    audioManager.playSfx("sfx-chon");
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setConfirmed(false);
    } else {
      onFinishQuiz(answersMap);
    }
  }, [currentIdx, questions.length, onFinishQuiz, answersMap]);

  // Keyboard shortcut listener for Quiz
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (!confirmed) {
        if (key === "1" || key === "A") handleSelect(shuffledOptions[0]);
        if (key === "2" || key === "B") handleSelect(shuffledOptions[1]);
        if (key === "3" || key === "C") handleSelect(shuffledOptions[2]);
        if (key === "4" || key === "D") handleSelect(shuffledOptions[3]);
        if ((e.key === "Enter" || e.key === " ") && selectedOption) {
          e.preventDefault();
          handleConfirm();
        }
      } else {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmed, selectedOption, shuffledOptions, handleSelect, handleConfirm, handleNext]);

  if (!currentQ) {
    return null;
  }

  const isCurrentCorrect = selectedOption === currentQ.answer;

  const currentBadge = currentQ.badge || `THỬ THÁCH ${currentIdx + 1}`;
  const currentTag = currentQ.tag || "Kiểm tra kiến thức";
  const currentHint = currentQ.hint || "Chọn phương án đúng nhất:";

  return (
    <div className="relative w-full h-screen flex flex-col justify-between p-4 sm:p-8 bg-gradient-to-b from-[#18110d] via-[#120c09] to-[#0a0705] select-none overflow-y-auto">
      {/* Top Header & Status HUD */}
      <div className="flex items-center justify-between border-b border-amber-900/60 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-700 to-amber-600 flex items-center justify-center text-xl shadow-lg border border-amber-400/40">
            📚
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif font-bold text-amber-200 text-base sm:text-lg">
                {content.strings["quiz.title"] || "Lan kiểm tra bài"}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-700 text-amber-300 font-mono">
                {currentBadge}
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Câu hỏi củng cố kiến thức: {currentIdx + 1} / {questions.length} • {currentTag}
            </p>
          </div>
        </div>

        {/* Dynamic Score & Streak Tracker */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-stone-900/80 px-3 py-1 rounded-lg border border-amber-900/60">
            <span className="text-xs text-stone-400">Điểm:</span>
            <span className="font-mono font-bold text-amber-400 text-sm">{score}</span>
            {streak > 1 && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-red-900/80 border border-red-500 text-red-200 font-bold animate-pulse">
                🔥 x{streak} Streak!
              </span>
            )}
          </div>

          <button
            onClick={onReturnMenu}
            className="px-3 py-1 rounded bg-stone-800 text-stone-300 hover:text-white text-xs border border-stone-700 cursor-pointer transition hover:bg-stone-700"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Main Interactive Play Area */}
      <div className="max-w-4xl w-full mx-auto my-auto py-3 space-y-4">
        {/* Visual Banner / Question Card */}
        <div className="p-5 sm:p-6 rounded-xl border-2 border-amber-700/60 bg-[#221611]/90 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block font-mono">
              Câu hỏi {currentIdx + 1} / {questions.length}
            </span>
            <span className="text-xs text-stone-400 italic font-serif">
              {currentHint}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-[#fbf4ea] font-semibold leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Options / Choice Cards */}
        <div className="grid grid-cols-1 gap-2.5">
          {shuffledOptions.map((opt, idx) => {
            let style = "bg-stone-900/80 border-stone-700 text-stone-200 hover:border-amber-400 hover:bg-stone-900";
            if (confirmed) {
              if (opt === currentQ.answer) {
                style = "bg-emerald-950/95 border-emerald-500 text-emerald-200 font-bold shadow-[0_0_15px_rgba(16,185,129,0.25)]";
              } else if (opt === selectedOption && !isCurrentCorrect) {
                style = "bg-red-950/95 border-red-500 text-red-200";
              } else {
                style = "bg-stone-900/40 border-stone-800 text-stone-500 opacity-60";
              }
            } else if (selectedOption === opt) {
              style = "bg-amber-950/90 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.2)]";
            }

            return (
              <button
                key={idx}
                disabled={confirmed}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all shadow-md cursor-pointer flex items-center space-x-3 ${style}`}
              >
                <span className="w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-xs font-bold font-serif flex-shrink-0 text-amber-300">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm sm:text-base font-serif flex-1 leading-snug">
                  {opt}
                </span>
                <span className="text-xs text-stone-500 font-mono hidden sm:inline">
                  [{idx + 1}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Result Feedback Banner */}
        {confirmed && (
          <div
            className={`p-4 rounded-xl border animate-fadeIn transition-all shadow-xl ${
              isCurrentCorrect
                ? "bg-gradient-to-r from-emerald-950/90 to-emerald-900/80 border-emerald-500 text-emerald-200"
                : "bg-gradient-to-r from-red-950/90 to-red-900/80 border-red-600 text-red-200"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2 font-bold text-base sm:text-lg">
                <span>{isCurrentCorrect ? "✓ Chính xác!" : "✗ Chưa chính xác!"}</span>
                {isCurrentCorrect && streak > 1 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400 text-black font-bold">
                    +{(streak - 1) * 50} Điểm chuỗi
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-stone-300">
                {isCurrentCorrect ? "Đã ghi nhận vào bảng vàng" : "Xem luận cứ học thuật bên dưới"}
              </span>
            </div>

            {currentSource && (
              <div className="mt-2 pt-2 border-t border-white/20 text-xs sm:text-sm">
                <p className="opacity-95 leading-relaxed font-serif">
                  💡 <strong>Luận cứ lịch sử:</strong> {currentSource.text}
                </p>
                <p className="text-stone-300/80 text-xs mt-1 font-mono">
                  [Nguồn: {currentSource.id} • Giáo trình trang {currentSource.pages}]
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pt-3 border-t border-amber-900/40">
        <div className="text-xs text-stone-400 flex items-center space-x-2">
          <span>Tiến độ:</span>
          <span className="font-bold text-amber-300">
            {Object.values(answersMap).filter(Boolean).length} / {questions.length} câu đúng
          </span>
        </div>

        {!confirmed ? (
          <button
            disabled={!selectedOption}
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-lg bg-[#9E1B1B] hover:bg-[#B52020] text-amber-100 font-semibold text-sm border border-amber-500/40 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition shadow-lg hover:shadow-red-900/50"
          >
            Trả lời (Enter)
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm border border-emerald-400 cursor-pointer transition shadow-lg hover:shadow-emerald-900/50 flex items-center space-x-1.5"
          >
            <span>{currentIdx + 1 === questions.length ? "Xem Tổng Kết →" : "Câu tiếp theo (Space) →"}</span>
          </button>
        )}
      </div>
    </div>
  );
};
