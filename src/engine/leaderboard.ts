import type { GameContent, GameState } from "./types";
import { getSummary } from "./summary";

// ==================== Lịch sử người chơi & Bảng xếp hạng ====================
// Lưu cục bộ trên thiết bị (localStorage) — phù hợp chơi tại lớp/máy trình chiếu.

const LEADERBOARD_KEY = "hanh_trinh_do_leaderboard_v1";
const PLAYER_NAME_KEY = "hanh_trinh_do_player_name";
const PLAY_TIME_KEY = "hanh_trinh_do_play_time_ms";
export const MAX_RECORDS = 100;
export const DEFAULT_PLAYER_NAME = "Người chơi";

export interface PlayerRecord {
  id: string;
  name: string;
  finishedAt: string;
  durationMs: number;
  score: number;
  correctFirstTry: number;
  totalChoices: number;
  quizCorrect: number;
  totalQuiz: number;
  unlockedCount: number;
  totalCollectibles: number;
  rankKey: string;
  rankTitle: string;
}

/** Điểm: mỗi lựa chọn đúng ngay 10đ, mỗi câu củng cố đúng 10đ, mỗi tư liệu 2đ. */
export function computeScore(s: { correctFirstTry: number; quizCorrect: number; unlockedCount: number }): number {
  return s.correctFirstTry * 10 + s.quizCorrect * 10 + s.unlockedCount * 2;
}

/** Sắp xếp: điểm cao trước; bằng điểm thì ai nhanh hơn đứng trước; sau đó ai hoàn thành sớm hơn. */
export function compareRecords(a: PlayerRecord, b: PlayerRecord): number {
  if (b.score !== a.score) return b.score - a.score;
  const da = a.durationMs > 0 ? a.durationMs : Number.MAX_SAFE_INTEGER;
  const db = b.durationMs > 0 ? b.durationMs : Number.MAX_SAFE_INTEGER;
  if (da !== db) return da - db;
  return a.finishedAt.localeCompare(b.finishedAt);
}

function isRecord(value: unknown): value is PlayerRecord {
  if (!value || typeof value !== "object") return false;
  const r = value as Record<string, unknown>;
  return (
    typeof r.id === "string" &&
    typeof r.name === "string" &&
    typeof r.finishedAt === "string" &&
    typeof r.durationMs === "number" &&
    typeof r.score === "number" &&
    typeof r.rankTitle === "string"
  );
}

export function loadLeaderboard(): PlayerRecord[] {
  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(LEADERBOARD_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter(isRecord).sort(compareRecords);
        }
      }
    }
  } catch (e) {
    console.error("Failed to load leaderboard", e);
  }
  return [];
}

function writeLeaderboard(records: PlayerRecord[]): void {
  try {
    if (typeof localStorage !== "undefined") {
      const trimmed = [...records].sort(compareRecords).slice(0, MAX_RECORDS);
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
    }
  } catch (e) {
    console.error("Failed to save leaderboard", e);
  }
}

export function addRecord(record: PlayerRecord): PlayerRecord[] {
  const existing = loadLeaderboard().filter((r) => r.id !== record.id);
  writeLeaderboard([...existing, record]);
  return loadLeaderboard();
}

export function renameRecord(id: string, name: string): PlayerRecord[] {
  const clean = sanitizeName(name);
  const list = loadLeaderboard().map((r) => (r.id === id ? { ...r, name: clean } : r));
  writeLeaderboard(list);
  savePlayerName(clean);
  return loadLeaderboard();
}

export function clearLeaderboard(): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(LEADERBOARD_KEY);
    }
  } catch (e) {
    console.error("Failed to clear leaderboard", e);
  }
}

export function sanitizeName(name: string): string {
  const trimmed = name.replace(/\s+/g, " ").trim().slice(0, 32);
  return trimmed || DEFAULT_PLAYER_NAME;
}

export function loadPlayerName(): string {
  try {
    if (typeof localStorage !== "undefined") {
      const n = localStorage.getItem(PLAYER_NAME_KEY);
      if (n) return sanitizeName(n);
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_PLAYER_NAME;
}

export function savePlayerName(name: string): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(PLAYER_NAME_KEY, sanitizeName(name));
    }
  } catch {
    /* ignore */
  }
}

/** Tạo bản ghi từ trạng thái kết thúc (đã có quizAnswers). */
export function buildRecord(
  content: GameContent,
  state: GameState,
  durationMs: number,
  name: string = loadPlayerName(),
  now: Date = new Date()
): PlayerRecord {
  const s = getSummary(content, state);
  return {
    id: `${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    name: sanitizeName(name),
    finishedAt: now.toISOString(),
    durationMs: Math.max(0, Math.round(durationMs)),
    score: computeScore(s),
    correctFirstTry: s.correctFirstTry,
    totalChoices: s.totalChoices,
    quizCorrect: s.quizCorrect,
    totalQuiz: s.totalQuiz,
    unlockedCount: s.unlockedCount,
    totalCollectibles: s.totalCollectibles,
    rankKey: s.rankKey,
    rankTitle: s.rankTitle
  };
}

export function formatDuration(ms: number): string {
  if (!ms || ms <= 0) return "--:--";
  const totalSec = Math.round(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const sec = totalSec % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

// ==================== Đồng hồ thời gian chơi thực ====================
// Chỉ đếm khi người chơi đang ở màn cảnh/câu hỏi và tab đang hiển thị;
// cộng dồn qua các lần tải lại trang (lưu localStorage).

let runningSince: number | null = null;

function readAccumulated(): number {
  try {
    if (typeof localStorage !== "undefined") {
      const v = Number(localStorage.getItem(PLAY_TIME_KEY));
      return Number.isFinite(v) && v > 0 ? v : 0;
    }
  } catch {
    /* ignore */
  }
  return 0;
}

function writeAccumulated(ms: number): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(PLAY_TIME_KEY, String(Math.round(ms)));
    }
  } catch {
    /* ignore */
  }
}

export const playTimer = {
  resume(now: number = Date.now()): void {
    if (runningSince === null) runningSince = now;
  },
  pause(now: number = Date.now()): void {
    if (runningSince !== null) {
      writeAccumulated(readAccumulated() + Math.max(0, now - runningSince));
      runningSince = null;
    }
  },
  elapsed(now: number = Date.now()): number {
    return readAccumulated() + (runningSince !== null ? Math.max(0, now - runningSince) : 0);
  },
  reset(): void {
    runningSince = null;
    writeAccumulated(0);
  },
  isRunning(): boolean {
    return runningSince !== null;
  }
};
