import React, { useState, useMemo, useEffect, useCallback } from "react";
import type { GameContent, Source } from "../engine/types";
import { audioManager } from "../audio";
import { CgIllustration } from "../art/cgIllustrations";

interface QuizScreenProps {
  content: GameContent;
  onFinishQuiz: (results: Record<string, boolean>) => void;
  onReturnMenu: () => void;
  onReplayScene?: (sceneId: string) => void;
  seed?: number;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  content,
  onFinishQuiz,
  onReturnMenu,
  onReplayScene,
  seed
}) => {
  const [mountSeed] = useState(() => Math.floor(Math.random() * 1000000) + 1);
  const effectiveSeed = seed ?? mountSeed;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answersMap, setAnswersMap] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);

  // States for Word Match challenge
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [wrongMatch, setWrongMatch] = useState<{ left: string; right: string } | null>(null);

  // States for Fill Blank challenge
  const [filledBlanks, setFilledBlanks] = useState<Record<string, string>>({});
  const [activeBlankId, setActiveBlankId] = useState<string | null>(null);

  const questions = content.quiz;
  const currentQ = questions[currentIdx];
  const qType = currentQ?.type || "multiple_choice";

  const sourcesMap = useMemo(() => {
    return new Map<string, Source>(content.sources.map((s) => [s.id, s]));
  }, [content.sources]);

  // Robust pseudo-random shuffle seeded by effectiveSeed and question ID hash
  const shuffledOptions = useMemo(() => {
    if (!currentQ) return [];
    if (qType === "multiple_choice" || qType === "visual_clue") {
      const all = [currentQ.answer || "", ...(currentQ.distractors || [])];

      let s = effectiveSeed;
      for (let i = 0; i < currentQ.id.length; i++) {
        s = (s * 31 + currentQ.id.charCodeAt(i)) >>> 0;
      }

      const copy = [...all];
      for (let i = copy.length - 1; i > 0; i--) {
        s = (s * 9301 + 49297) % 233280;
        const j = Math.floor((s / 233280) * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
      }
      return copy;
    }
    return [];
  }, [currentQ, qType, effectiveSeed]);

  // Shuffled right-side items for word_match
  const shuffledRightPairs = useMemo(() => {
    if (!currentQ || qType !== "word_match" || !currentQ.pairs) return [];
    const rights = currentQ.pairs.map((p) => p.right);
    let s = (effectiveSeed * 7 + currentIdx * 37) >>> 0;
    const copy = [...rights];
    for (let i = copy.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor((s / 233280) * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }, [currentQ, qType, currentIdx, effectiveSeed]);

  const currentSource = currentQ ? sourcesMap.get(currentQ.source) : undefined;

  // Handle standard option selection
  const handleSelect = useCallback(
    (opt: string) => {
      if (confirmed) return;
      audioManager.playSfx("sfx-chon");
      setSelectedOption(opt);
    },
    [confirmed]
  );

  // Handle Word Match interaction
  const handleWordMatchClick = useCallback(
    (side: "left" | "right", value: string) => {
      if (confirmed || !currentQ?.pairs) return;

      if (side === "left") {
        if (matchedPairs[value]) return;
        audioManager.playSfx("sfx-chon");
        setSelectedLeft(value);
      } else {
        if (Object.values(matchedPairs).includes(value)) return;
        if (!selectedLeft) return;

        // Check if selectedLeft and value form a valid pair
        const targetPair = currentQ.pairs.find((p) => p.left === selectedLeft);
        if (targetPair && targetPair.right === value) {
          audioManager.playSfx("sfx-match");
          const nextMatches = { ...matchedPairs, [selectedLeft]: value };
          setMatchedPairs(nextMatches);
          setSelectedLeft(null);

          // All pairs matched
          if (Object.keys(nextMatches).length === currentQ.pairs.length) {
            audioManager.playSfx("sfx-vo-tay");
          }
        } else {
          audioManager.playSfx("sfx-wrong");
          setWrongMatch({ left: selectedLeft, right: value });
          setTimeout(() => {
            setWrongMatch(null);
            setSelectedLeft(null);
          }, 600);
        }
      }
    },
    [confirmed, currentQ, matchedPairs, selectedLeft]
  );

  // Handle Fill Blank interaction
  const handleSelectWordForBlank = useCallback(
    (word: string) => {
      if (confirmed || !currentQ?.blanks) return;
      audioManager.playSfx("sfx-fill");

      const targetId =
        activeBlankId ||
        currentQ.blanks.find((b) => !filledBlanks[b.id])?.id ||
        currentQ.blanks[0].id;

      setFilledBlanks((prev) => ({
        ...prev,
        [targetId]: word
      }));

      // Focus on next empty blank
      const nextEmpty = currentQ.blanks.find((b) => b.id !== targetId && !filledBlanks[b.id]);
      setActiveBlankId(nextEmpty ? nextEmpty.id : null);
    },
    [confirmed, currentQ, activeBlankId, filledBlanks]
  );

  const handleClearBlank = useCallback(
    (blankId: string) => {
      if (confirmed) return;
      audioManager.playSfx("sfx-chon");
      setFilledBlanks((prev) => {
        const next = { ...prev };
        delete next[blankId];
        return next;
      });
      setActiveBlankId(blankId);
    },
    [confirmed]
  );

  // Determine if ready to confirm
  const isReadyToConfirm = useMemo(() => {
    if (confirmed) return false;
    if (qType === "multiple_choice" || qType === "visual_clue") {
      return Boolean(selectedOption);
    }
    if (qType === "word_match") {
      return Boolean(
        currentQ?.pairs && Object.keys(matchedPairs).length === currentQ.pairs.length
      );
    }
    if (qType === "fill_blank") {
      return Boolean(
        currentQ?.blanks &&
          currentQ.blanks.every((b) => Boolean(filledBlanks[b.id]))
      );
    }
    return false;
  }, [confirmed, qType, selectedOption, currentQ, matchedPairs, filledBlanks]);

  // Handle confirmation
  const handleConfirm = useCallback(() => {
    if (!currentQ || confirmed || !isReadyToConfirm) return;

    let isCorrect = false;
    if (qType === "multiple_choice" || qType === "visual_clue") {
      isCorrect = selectedOption === currentQ.answer;
    } else if (qType === "word_match") {
      isCorrect = Boolean(
        currentQ.pairs &&
          currentQ.pairs.every((p) => matchedPairs[p.left] === p.right)
      );
    } else if (qType === "fill_blank") {
      isCorrect = Boolean(
        currentQ.blanks &&
          currentQ.blanks.every((b) => filledBlanks[b.id] === b.answer)
      );
    }

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
  }, [
    currentQ,
    confirmed,
    isReadyToConfirm,
    qType,
    selectedOption,
    matchedPairs,
    filledBlanks,
    answersMap,
    streak
  ]);

  const handleNext = useCallback(() => {
    audioManager.playSfx("sfx-chon");
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setConfirmed(false);
      setSelectedLeft(null);
      setMatchedPairs({});
      setFilledBlanks({});
      setActiveBlankId(null);
    } else {
      onFinishQuiz(answersMap);
    }
  }, [currentIdx, questions.length, onFinishQuiz, answersMap]);

  // Keyboard shortcut listener for Quiz
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (!confirmed) {
        if (qType === "multiple_choice" || qType === "visual_clue") {
          if (key === "1" || key === "A") handleSelect(shuffledOptions[0]);
          if (key === "2" || key === "B") handleSelect(shuffledOptions[1]);
          if (key === "3" || key === "C") handleSelect(shuffledOptions[2]);
          if (key === "4" || key === "D") handleSelect(shuffledOptions[3]);
        }
        if ((e.key === "Enter" || e.key === " ") && isReadyToConfirm) {
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
  }, [confirmed, qType, shuffledOptions, isReadyToConfirm, handleSelect, handleConfirm, handleNext]);

  if (!currentQ) {
    return null;
  }

  const isCurrentCorrect = Boolean(answersMap[currentQ.id]);
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

        {/* 1. VISUAL CLUE CG ARTWORK DISPLAY */}
        {qType === "visual_clue" && currentQ.asset && (
          <div className="w-full rounded-xl overflow-hidden border-2 border-amber-800/60 bg-black/50 shadow-xl">
            <CgIllustration assetId={currentQ.asset} />
          </div>
        )}

        {/* 2. MULTIPLE CHOICE & VISUAL CLUE OPTIONS */}
        {(qType === "multiple_choice" || qType === "visual_clue") && (
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
        )}

        {/* 3. WORD MATCH INTERACTIVE COLUMNS */}
        {qType === "word_match" && currentQ.pairs && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left Column: Events / Organizations */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400/90 block pb-1">
                  Cột A: Tổ chức & Mốc sự kiện
                </span>
                {currentQ.pairs.map((pair) => {
                  const isMatched = Boolean(matchedPairs[pair.left]);
                  const isSelected = selectedLeft === pair.left;
                  const isWrong = wrongMatch?.left === pair.left;

                  let cardStyle = "bg-stone-900/90 border-stone-700 text-stone-200 hover:border-amber-400";
                  if (isMatched) {
                    cardStyle = "bg-emerald-950/90 border-emerald-500 text-emerald-200 font-medium opacity-90";
                  } else if (isWrong) {
                    cardStyle = "bg-red-950/90 border-red-500 text-red-200 animate-bounce";
                  } else if (isSelected) {
                    cardStyle = "bg-amber-950/95 border-amber-400 text-amber-200 ring-2 ring-amber-400/40";
                  }

                  return (
                    <button
                      key={pair.left}
                      disabled={confirmed || isMatched}
                      onClick={() => handleWordMatchClick("left", pair.left)}
                      className={`w-full text-left p-3.5 rounded-xl border-2 text-xs sm:text-sm font-serif transition-all shadow-md cursor-pointer flex items-center justify-between ${cardStyle}`}
                    >
                      <span>{pair.left}</span>
                      {isMatched && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Roles / Locations */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400/90 block pb-1">
                  Cột B: Địa bàn & Vai trò
                </span>
                {shuffledRightPairs.map((rightVal) => {
                  const isMatched = Object.values(matchedPairs).includes(rightVal);
                  const isWrong = wrongMatch?.right === rightVal;

                  let cardStyle = "bg-stone-900/90 border-stone-700 text-stone-200 hover:border-amber-400";
                  if (isMatched) {
                    cardStyle = "bg-emerald-950/90 border-emerald-500 text-emerald-200 font-medium opacity-90";
                  } else if (isWrong) {
                    cardStyle = "bg-red-950/90 border-red-500 text-red-200 animate-bounce";
                  }

                  return (
                    <button
                      key={rightVal}
                      disabled={confirmed || isMatched}
                      onClick={() => handleWordMatchClick("right", rightVal)}
                      className={`w-full text-left p-3.5 rounded-xl border-2 text-xs sm:text-sm font-serif transition-all shadow-md cursor-pointer flex items-center justify-between ${cardStyle}`}
                    >
                      <span>{rightVal}</span>
                      {isMatched && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-stone-400 italic text-center pt-1 font-serif">
              {Object.keys(matchedPairs).length < currentQ.pairs.length
                ? "Chọn ô Cột A rồi chọn Cột B để ghép"
                : "Đã ghép xong! Bấm Trả lời để xác nhận"}
            </p>
          </div>
        )}

        {/* 4. FILL IN THE BLANK INTERACTIVE CHALLENGE */}
        {qType === "fill_blank" && currentQ.template && currentQ.blanks && (
          <div className="space-y-4">
            {/* Document Template Container */}
            <div className="p-5 sm:p-6 rounded-xl border-2 border-amber-600/70 bg-[#1e140f] shadow-inner font-serif leading-loose text-base sm:text-lg text-amber-100">
              <span className="text-xs font-mono text-amber-400/80 block mb-2 uppercase">
                📜 Văn kiện lịch sử:
              </span>
              {(() => {
                const parts = currentQ.template!.split(/(\{blank[0-9]+\})/g);
                return parts.map((part, pIdx) => {
                  const match = part.match(/^\{blank([0-9]+)\}$/);
                  if (match) {
                    const blankId = `blank${match[1]}`;
                    const placedWord = filledBlanks[blankId];
                    const isActive = activeBlankId === blankId;

                    return (
                      <span
                        key={pIdx}
                        onClick={() => placedWord ? handleClearBlank(blankId) : setActiveBlankId(blankId)}
                        className={`inline-flex items-center px-3 py-1 mx-1.5 rounded-lg border-2 text-xs sm:text-sm font-serif cursor-pointer transition-all shadow ${
                          placedWord
                            ? "bg-amber-900/80 border-amber-400 text-amber-100 font-bold"
                            : isActive
                            ? "border-amber-400 bg-amber-950/50 text-amber-300 ring-2 ring-amber-400/40 animate-pulse"
                            : "border-dashed border-stone-600 bg-stone-900/80 text-stone-400 hover:border-amber-500"
                        }`}
                        title={placedWord ? "Bấm để rút từ khóa về" : "Bấm để chọn ô điền"}
                      >
                        {placedWord ? (
                          <>
                            <span>{placedWord}</span>
                            {!confirmed && <span className="ml-1.5 text-xs text-amber-300">✕</span>}
                          </>
                        ) : (
                          <span>[ Ô trống {match[1]} ]</span>
                        )}
                      </span>
                    );
                  }
                  return <span key={pIdx}>{part}</span>;
                });
              })()}
            </div>

            {/* Word Bank Badges */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase text-stone-400 block">
                Ngân hàng từ khóa:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {(currentQ.options || []).map((opt) => {
                  const isPlaced = Object.values(filledBlanks).includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={confirmed || isPlaced}
                      onClick={() => handleSelectWordForBlank(opt)}
                      className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-serif transition shadow cursor-pointer ${
                        isPlaced
                          ? "bg-stone-900/30 border-stone-800 text-stone-600 opacity-40 cursor-not-allowed"
                          : "bg-stone-800 hover:bg-amber-950 border-amber-700/60 text-amber-200 hover:border-amber-400 active:scale-95"
                      }`}
                    >
                      + {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

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

            {currentQ.scene && onReplayScene && (
              <div className="mt-2.5 pt-2 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs text-stone-300 font-serif italic">
                  Muốn ôn lại sự kiện lịch sử này?
                </span>
                <button
                  type="button"
                  onClick={() => onReplayScene(currentQ.scene!)}
                  className="px-3 py-1.5 rounded-lg bg-amber-700/80 hover:bg-amber-600 text-amber-100 text-xs font-serif font-semibold border border-amber-400 transition cursor-pointer flex items-center space-x-1 shadow"
                >
                  <span>📖 Ôn lại cảnh {currentQ.scene}</span>
                  <span>→</span>
                </button>
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
            disabled={!isReadyToConfirm}
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
