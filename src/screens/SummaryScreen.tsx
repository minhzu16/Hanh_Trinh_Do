import React, { useEffect, useState } from "react";
import type { GameContent, GameState, ChoiceNode } from "../engine/types";
import { getSummary } from "../engine/summary";
import { audioManager } from "../audio";
import { LeaderboardPanel } from "../components/LeaderboardPanel";

interface SummaryScreenProps {
  content: GameContent;
  state: GameState;
  latestRecordId?: string | null;
  onRestart: () => void;
  onOpenCollection: () => void;
  onReturnMenu: () => void;
  onReplayScene?: (sceneId: string) => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  content,
  state,
  latestRecordId,
  onRestart,
  onOpenCollection,
  onReturnMenu,
  onReplayScene,
  isMuted,
  onToggleMute
}) => {
  const summary = getSummary(content, state);
  const strings = content.strings;
  const [showFlowchart, setShowFlowchart] = useState(false);

  useEffect(() => {
    audioManager.playSfx("sfx-vo-tay");
  }, []);

  const choicesList = content.scenes.flatMap((sc) =>
    sc.nodes
      .filter((n): n is ChoiceNode => n.type === "choice" && n.kind !== "personal")
      .map((c) => ({ scene: sc, choice: c }))
  );

  // Find most-missed choice to recommend review
  let mostMissedChoiceId: string | null = null;
  let maxAttempts = 1;
  for (const [cId, attempts] of Object.entries(state.choiceAttempts || {})) {
    if (attempts > maxAttempts) {
      maxAttempts = attempts;
      mostMissedChoiceId = cId;
    }
  }

  // Find corresponding scene for this choice
  let reviewScene: { id: string; title: string; prompt: string } | null = null;
  if (mostMissedChoiceId) {
    for (const sc of content.scenes) {
      for (const node of sc.nodes) {
        if (node.type === "choice" && node.id === mostMissedChoiceId) {
          reviewScene = { id: sc.id, title: sc.title, prompt: node.prompt };
          break;
        }
      }
      if (reviewScene) break;
    }
  }

  return (
    <div className="relative w-full h-screen flex flex-col justify-between p-6 sm:p-12 bg-gradient-to-b from-[#1c120c] via-[#26140e] to-[#120a06] select-none overflow-y-auto">
      {/* Background ambient pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c8a24a_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top right mute button */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        {onToggleMute && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            className="px-3 py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-700 text-sm cursor-pointer transition flex items-center space-x-1.5 shadow-md"
            title="Bật/Tắt âm thanh"
          >
            <span>{isMuted ? "🔇" : "🔊"}</span>
            <span className="font-sans text-xs">{isMuted ? "Âm: Tắt" : "Âm: Bật"}</span>
          </button>
        )}
      </div>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto z-10 pt-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 bg-red-950/80 px-4 py-1 rounded-full border border-red-700/60 inline-block mb-3">
          Hành Trình Hoàn Thành
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100 drop-shadow">
          {strings["summary.title"] || "Tổng kết Chương 1"}
        </h1>
        <p className="text-stone-300 font-serif text-sm sm:text-base mt-2">
          Bạn đã đồng hành cùng Minh và các thế hệ thanh niên yêu nước qua chặng đường lịch sử 1911 – 1930.
        </p>
      </div>

      {/* Center rank card */}
      <div className="max-w-2xl w-full mx-auto my-auto py-6 z-10 space-y-6">
        {/* Honor Badge */}
        <div className="text-center p-6 rounded-2xl bg-[#281b16] border-2 border-amber-500/70 shadow-2xl space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-3xl shadow-lg">
            ⭐
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-medium">
              Danh hiệu đạt được
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-300 mt-1">
              {summary.rankTitle}
            </h2>
          </div>
        </div>

        {/* 3 Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 1. Choices */}
          <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
            <span className="text-2xl mb-1 block">🎯</span>
            <span className="text-xs text-stone-400 font-medium block">
              Lựa chọn đúng ngay
            </span>
            <span className="text-2xl font-bold font-serif text-amber-200 mt-1 block">
              {summary.correctFirstTry} / {summary.totalChoices}
            </span>
          </div>

          {/* 2. Quiz */}
          <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
            <span className="text-2xl mb-1 block">📝</span>
            <span className="text-xs text-stone-400 font-medium block">
              Câu hỏi củng cố
            </span>
            <span className="text-2xl font-bold font-serif text-amber-200 mt-1 block">
              {summary.quizCorrect} / {summary.totalQuiz}
            </span>
          </div>

          {/* 3. Collectibles */}
          <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
            <span className="text-2xl mb-1 block">🏛️</span>
            <span className="text-xs text-stone-400 font-medium block">
              Tư liệu đã mở
            </span>
            <span className="text-2xl font-bold font-serif text-amber-200 mt-1 block">
              {summary.unlockedCount} / {summary.totalCollectibles}
            </span>
          </div>
        </div>

        {/* Educational Review Recommendation if player missed any choice */}
        {reviewScene && onReplayScene && (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-amber-400 font-bold uppercase tracking-wider block">
                💡 Gợi ý củng cố lịch sử
              </span>
              <p className="text-stone-300 font-serif">
                Bạn đã thử lại {maxAttempts} lần ở ngã rẽ:{" "}
                <span className="text-amber-200 font-semibold">"{reviewScene.prompt}"</span> ({reviewScene.title}).
              </p>
            </div>
            <button
              onClick={() => {
                audioManager.playSfx("sfx-chon");
                onReplayScene(reviewScene!.id);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-semibold transition cursor-pointer flex-shrink-0"
            >
              Ôn lại cảnh này ➔
            </button>
          </div>
        )}

        {/* Personal Choice Outcome (Đời tư Kỳ 1) */}
        {(state.flags["k1-l-doi-tu:A"] || state.flags["k1-l-doi-tu:B"]) && (
          <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center gap-3 text-xs">
            <span className="text-2xl">✉️</span>
            <div>
              <span className="text-amber-400 font-bold uppercase tracking-wider block">
                {strings["summary.personal.title"] || "Ngã rẽ đời tư (Kỳ 1)"}
              </span>
              <p className="text-stone-300 font-serif mt-0.5">
                {state.flags["k1-l-doi-tu:A"]
                  ? strings["summary.personal.letter"]
                  : strings["summary.personal.factory"]}
              </p>
            </div>
          </div>
        )}

        {/* Bảng vinh danh: lịch sử người chơi xếp theo điểm, thời gian, danh hiệu */}
        <LeaderboardPanel strings={strings} latestRecordId={latestRecordId} />

        {/* Flowchart Toggle Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              audioManager.playSfx("sfx-chon");
              setShowFlowchart(!showFlowchart);
            }}
            className="px-4 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/60 text-amber-200 text-xs font-serif font-bold transition cursor-pointer flex items-center justify-center space-x-2 mx-auto shadow-lg"
          >
            <span>📜</span>
            <span>{strings["summary.flowchart.title"] || "Sơ đồ các ngã rẽ lịch sử"}</span>
            <span>{showFlowchart ? "▲" : "▼"}</span>
          </button>
        </div>

        {/* Interactive Flowchart Panel */}
        {showFlowchart && (
          <div className="p-4 sm:p-6 rounded-2xl bg-[#1c120c]/95 border-2 border-amber-600/60 shadow-2xl space-y-4 max-h-[60vh] overflow-y-auto animate-fadeIn">
            <div className="border-b border-amber-900/60 pb-3">
              <h3 className="text-lg font-serif font-bold text-amber-200">
                {strings["summary.flowchart.title"] || "Sơ đồ các ngã rẽ lịch sử"}
              </h3>
              <p className="text-xs text-stone-300 font-serif mt-1">
                {strings["summary.flowchart.subtitle"] || "Xem lại 7 quyết định lịch sử"}
              </p>
            </div>

            <div className="space-y-4">
              {choicesList.map(({ scene, choice }, idx) => (
                <div key={choice.id} className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800/60">
                        {idx + 1}/7 • {choice.id}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-amber-100">
                        {choice.prompt}
                      </h4>
                    </div>
                    <span className="text-xs text-stone-400 font-serif">
                      {scene.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    {choice.options.map((opt) => {
                      const isVisited = !!state.flags[`${choice.id}:${opt.key}`];
                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-lg border flex flex-col justify-between transition ${
                            opt.correct
                              ? isVisited
                                ? "bg-emerald-950/40 border-emerald-600/70 text-emerald-100"
                                : "bg-emerald-950/20 border-emerald-900/40 text-stone-400"
                              : isVisited
                              ? "bg-rose-950/40 border-rose-600/70 text-rose-100"
                              : "bg-stone-900/50 border-stone-800 text-stone-500"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold">Phương án {opt.key}</span>
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                                  opt.correct ? "bg-emerald-900/70 text-emerald-300" : "bg-rose-900/70 text-rose-300"
                                }`}
                              >
                                {opt.correct
                                  ? strings["summary.flowchart.correct"] || "Đúng"
                                  : strings["summary.flowchart.alt"] || "Giả định"}
                              </span>
                            </div>
                            <p className="line-clamp-3 text-xs leading-relaxed font-serif">
                              {opt.text}
                            </p>
                          </div>
                          <div className="mt-2 pt-2 border-t border-stone-800/50 flex items-center justify-between text-[11px]">
                            <span className={isVisited ? (opt.correct ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold") : "text-stone-500"}>
                              {isVisited
                                ? `✓ ${strings["summary.flowchart.visited"] || "Đã đi"}`
                                : strings["summary.flowchart.unvisited"] || "Chưa đi"}
                            </span>
                            {onReplayScene && (
                              <button
                                onClick={() => {
                                  audioManager.playSfx("sfx-chon");
                                  onReplayScene(scene.id);
                                }}
                                className="hover:underline text-amber-300 font-medium cursor-pointer"
                              >
                                {strings["summary.flowchart.replay"] || "Xem lại"} ➔
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="max-w-xl w-full mx-auto z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button
          onClick={() => {
            audioManager.playSfx("sfx-chon");
            onRestart();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#9E1B1B] to-[#7A1515] hover:from-[#B52020] hover:to-[#8E1818] text-amber-100 font-serif font-bold text-sm border border-amber-500/50 shadow-md cursor-pointer transition"
        >
          🔄 {strings["menu.restart"] || "Chơi lại từ đầu"}
        </button>

        <button
          onClick={() => {
            audioManager.playSfx("sfx-chon");
            onOpenCollection();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-stone-900/90 hover:bg-stone-800 text-amber-200 font-serif font-semibold text-sm border border-amber-800/60 shadow-md cursor-pointer transition"
        >
          🏛️ {strings["menu.collection"] || "Bộ sưu tập tư liệu"}
        </button>

        <button
          onClick={() => {
            audioManager.playSfx("sfx-chon");
            onReturnMenu();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 font-serif text-sm border border-stone-700 cursor-pointer transition"
        >
          Về Menu
        </button>
      </div>
    </div>
  );
};
