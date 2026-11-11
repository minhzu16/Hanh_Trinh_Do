import React, { useMemo, useState } from "react";
import {
  loadLeaderboard,
  renameRecord,
  clearLeaderboard,
  formatDuration,
  DEFAULT_PLAYER_NAME,
  type PlayerRecord
} from "../engine/leaderboard";
import { audioManager } from "../audio";

interface LeaderboardPanelProps {
  strings: Record<string, string>;
  latestRecordId?: string | null;
  topN?: number;
}

const MEDALS = ["🥇", "🥈", "🥉"];

function rankBadgeClass(rankKey: string): string {
  if (rankKey === "summary.rank.7") return "bg-amber-900/70 text-amber-200 border-amber-500/60";
  if (rankKey === "summary.rank.5") return "bg-emerald-950/70 text-emerald-200 border-emerald-700/60";
  return "bg-stone-800 text-stone-300 border-stone-600";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export const LeaderboardPanel: React.FC<LeaderboardPanelProps> = ({ strings, latestRecordId, topN = 10 }) => {
  const [records, setRecords] = useState<PlayerRecord[]>(() => loadLeaderboard());
  const latest = latestRecordId ? records.find((r) => r.id === latestRecordId) ?? null : null;
  const latestPos = latest ? records.findIndex((r) => r.id === latest.id) + 1 : 0;
  const [nameDraft, setNameDraft] = useState<string>(
    latest && latest.name !== DEFAULT_PLAYER_NAME ? latest.name : ""
  );
  const [savedName, setSavedName] = useState(false);

  const stats = useMemo(() => {
    if (records.length === 0) return null;
    const timed = records.filter((r) => r.durationMs > 0);
    return {
      plays: records.length,
      best: records[0].score,
      fastest: timed.length ? Math.min(...timed.map((r) => r.durationMs)) : 0
    };
  }, [records]);

  const visible = records.slice(0, topN);
  const showLatestBelow = latest && latestPos > topN;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!latest) return;
    audioManager.playSfx("sfx-chon");
    setRecords(renameRecord(latest.id, nameDraft));
    setSavedName(true);
  };

  const handleClear = () => {
    if (typeof window !== "undefined" && !window.confirm(strings["leaderboard.clear.confirm"] || "Xoá toàn bộ lịch sử?")) {
      return;
    }
    clearLeaderboard();
    setRecords([]);
  };

  const renderRow = (r: PlayerRecord, pos: number) => {
    const isMe = r.id === latestRecordId;
    return (
      <tr
        key={r.id}
        data-testid={isMe ? "leaderboard-row-me" : "leaderboard-row"}
        className={`border-t border-stone-800/70 ${isMe ? "bg-amber-900/30" : pos <= 3 ? "bg-stone-900/60" : ""}`}
      >
        <td className="py-2 px-2 text-center font-bold text-amber-300 whitespace-nowrap">
          {pos <= 3 ? <span className="text-lg">{MEDALS[pos - 1]}</span> : `#${pos}`}
        </td>
        <td className="py-2 px-2 font-serif text-amber-100 max-w-[9rem] truncate" title={r.name}>
          {r.name}
          {isMe && (
            <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-amber-600 text-black font-sans font-bold">
              {strings["leaderboard.you"] || "Bạn"}
            </span>
          )}
        </td>
        <td className="py-2 px-2">
          <span className={`inline-block text-[11px] px-2 py-0.5 rounded-full border font-serif ${rankBadgeClass(r.rankKey)}`}>
            {r.rankTitle}
          </span>
        </td>
        <td className="py-2 px-2 text-center font-bold text-amber-200 tabular-nums">{r.score}</td>
        <td className="py-2 px-2 text-center text-stone-300 font-mono tabular-nums">⏱ {formatDuration(r.durationMs)}</td>
        <td className="py-2 px-2 text-center text-stone-400 tabular-nums hidden sm:table-cell">
          {r.correctFirstTry}/{r.totalChoices} · {r.quizCorrect}/{r.totalQuiz}
        </td>
        <td className="py-2 px-2 text-right text-stone-500 text-[11px] whitespace-nowrap hidden md:table-cell">
          {formatDate(r.finishedAt)}
        </td>
      </tr>
    );
  };

  return (
    <section
      aria-label={strings["leaderboard.title"] || "Bảng vinh danh"}
      className="p-4 sm:p-5 rounded-2xl bg-[#1c120c]/95 border-2 border-amber-600/50 shadow-2xl space-y-4"
    >
      <div className="flex items-center justify-between gap-2 border-b border-amber-900/60 pb-3">
        <div>
          <h3 className="text-lg font-serif font-bold text-amber-200">
            🏆 {strings["leaderboard.title"] || "Bảng vinh danh"}
          </h3>
          <p className="text-xs text-stone-400 font-serif mt-0.5">
            {strings["leaderboard.subtitle"] || "Xếp theo điểm và thời gian"}
          </p>
        </div>
        {records.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] text-stone-500 hover:text-rose-400 underline cursor-pointer flex-shrink-0"
          >
            {strings["leaderboard.clear"] || "Xoá lịch sử"}
          </button>
        )}
      </div>

      {latest && (
        <form
          onSubmit={handleSaveName}
          className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60 flex flex-col sm:flex-row sm:items-center gap-2 text-xs"
        >
          <div className="text-amber-200 font-serif flex-1">
            <span className="font-bold">
              {(strings["leaderboard.position"] || "Bạn xếp hạng #{pos} / {total}")
                .replace("{pos}", String(latestPos))
                .replace("{total}", String(records.length))}
            </span>
            <span className="text-stone-400">
              {" · "}
              {latest.score} {strings["leaderboard.points"] || "điểm"} · ⏱ {formatDuration(latest.durationMs)}
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={nameDraft}
              maxLength={32}
              onChange={(e) => {
                setNameDraft(e.target.value);
                setSavedName(false);
              }}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder={strings["leaderboard.name.placeholder"] || "Nhập tên của bạn"}
              aria-label={strings["leaderboard.name.placeholder"] || "Nhập tên của bạn"}
              className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-amber-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-600 text-white font-semibold cursor-pointer transition flex-shrink-0"
            >
              {savedName ? `✓ ${strings["leaderboard.name.saved"] || "Đã lưu"}` : strings["leaderboard.name.save"] || "Ghi danh"}
            </button>
          </div>
        </form>
      )}

      {stats && (
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
            <span className="block text-[10px] uppercase tracking-wider text-stone-400">
              {strings["leaderboard.stats.plays"] || "Lượt chơi"}
            </span>
            <span className="block text-lg font-bold text-amber-200 tabular-nums">{stats.plays}</span>
          </div>
          <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
            <span className="block text-[10px] uppercase tracking-wider text-stone-400">
              {strings["leaderboard.stats.best"] || "Điểm cao nhất"}
            </span>
            <span className="block text-lg font-bold text-amber-200 tabular-nums">{stats.best}</span>
          </div>
          <div className="p-2 rounded-lg bg-stone-900/80 border border-stone-800">
            <span className="block text-[10px] uppercase tracking-wider text-stone-400">
              {strings["leaderboard.stats.fastest"] || "Nhanh nhất"}
            </span>
            <span className="block text-lg font-bold text-amber-200 font-mono tabular-nums">
              {formatDuration(stats.fastest)}
            </span>
          </div>
        </div>
      )}

      {records.length === 0 ? (
        <p className="text-center text-xs text-stone-400 font-serif py-4">
          {strings["leaderboard.empty"] || "Chưa có lượt chơi nào"}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-stone-400">
                <th className="py-1.5 px-2 text-center font-medium">{strings["leaderboard.col.rank"] || "Hạng"}</th>
                <th className="py-1.5 px-2 text-left font-medium">{strings["leaderboard.col.name"] || "Người chơi"}</th>
                <th className="py-1.5 px-2 text-left font-medium">{strings["leaderboard.col.title"] || "Danh hiệu"}</th>
                <th className="py-1.5 px-2 text-center font-medium">{strings["leaderboard.col.score"] || "Điểm"}</th>
                <th className="py-1.5 px-2 text-center font-medium">{strings["leaderboard.col.time"] || "Thời gian"}</th>
                <th className="py-1.5 px-2 text-center font-medium hidden sm:table-cell">
                  {strings["leaderboard.col.detail"] || "Chọn · Hỏi"}
                </th>
                <th className="py-1.5 px-2 text-right font-medium hidden md:table-cell">
                  {strings["leaderboard.col.date"] || "Ngày"}
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r, i) => renderRow(r, i + 1))}
              {showLatestBelow && latest && renderRow(latest, latestPos)}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
