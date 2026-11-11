import { describe, it, expect, beforeEach } from "vitest";
import {
  addRecord,
  loadLeaderboard,
  renameRecord,
  clearLeaderboard,
  buildRecord,
  computeScore,
  formatDuration,
  playTimer,
  loadPlayerName,
  MAX_RECORDS,
  bestPerPlayer,
  type PlayerRecord
} from "./leaderboard";
import { content } from "../content";
import { start } from "./step";

function rec(id: string, score: number, durationMs: number, finishedAt = "2026-01-01T00:00:00.000Z"): PlayerRecord {
  return {
    id,
    name: id,
    finishedAt,
    durationMs,
    score,
    correctFirstTry: 0,
    totalChoices: 7,
    quizCorrect: 0,
    totalQuiz: 6,
    unlockedCount: 0,
    totalCollectibles: 10,
    rankKey: "summary.rank.0",
    rankTitle: "x"
  };
}

describe("leaderboard", () => {
  beforeEach(() => {
    localStorage.clear();
    playTimer.reset();
  });

  it("sắp xếp theo điểm giảm dần, bằng điểm thì thời gian ngắn hơn đứng trước", () => {
    addRecord(rec("a", 100, 600_000));
    addRecord(rec("b", 120, 900_000));
    addRecord(rec("c", 100, 300_000));
    expect(loadLeaderboard().map((r) => r.id)).toEqual(["b", "c", "a"]);
  });

  it("giới hạn số bản ghi và bỏ dữ liệu hỏng", () => {
    for (let i = 0; i < MAX_RECORDS + 5; i++) addRecord(rec(`r${i}`, i, 1000));
    expect(loadLeaderboard()).toHaveLength(MAX_RECORDS);
    localStorage.setItem("hanh_trinh_do_leaderboard_v2", JSON.stringify([{ bad: true }, rec("ok", 1, 1)]));
    expect(loadLeaderboard().map((r) => r.id)).toEqual(["ok"]);
  });

  it("đổi tên bản ghi và ghi nhớ tên người chơi", () => {
    addRecord(rec("a", 10, 1000));
    renameRecord("a", "  Nguyễn   Văn A  ");
    expect(loadLeaderboard()[0].name).toBe("Nguyễn Văn A");
    expect(loadPlayerName()).toBe("Nguyễn Văn A");
    clearLeaderboard();
    expect(loadLeaderboard()).toEqual([]);
  });

  it("tạo bản ghi từ trạng thái kết thúc kèm danh hiệu và điểm", () => {
    const state = { ...start(content), quizAnswers: { q1: true, q2: true, q3: false } };
    const r = buildRecord(content, state, 125_400, "Lan");
    expect(r.name).toBe("Lan");
    expect(r.quizCorrect).toBe(2);
    expect(r.durationMs).toBe(125_400);
    expect(r.score).toBe(computeScore(r));
    expect(r.rankTitle.length).toBeGreaterThan(0);
  });

  it("định dạng thời gian", () => {
    expect(formatDuration(0)).toBe("--:--");
    expect(formatDuration(65_000)).toBe("01:05");
    expect(formatDuration(3_725_000)).toBe("1:02:05");
  });

  it("đồng hồ chỉ cộng dồn khi đang chạy", () => {
    playTimer.resume(1000);
    playTimer.pause(6000);
    expect(playTimer.elapsed(99_999)).toBe(5000);
    playTimer.resume(10_000);
    expect(playTimer.elapsed(12_000)).toBe(7000);
    playTimer.pause(12_000);
    playTimer.reset();
    expect(playTimer.elapsed()).toBe(0);
  });
});

describe("leaderboard: top người chơi & làm mới lịch sử", () => {
  beforeEach(() => localStorage.clear());

  it("mỗi người chơi chỉ giữ lượt tốt nhất; người chưa ghi danh tính riêng", () => {
    const list = [
      { ...rec("a1", 80, 1000), name: "Lan" },
      { ...rec("a2", 120, 1000), name: "lan" },
      { ...rec("b", 100, 1000), name: "Minh" },
      { ...rec("u1", 50, 1000), name: "Người chơi" },
      { ...rec("u2", 50, 2000), name: "Người chơi" }
    ];
    expect(bestPerPlayer(list).map((r) => r.id)).toEqual(["a2", "b", "u1", "u2"]);
  });

  it("xoá dữ liệu bảng xếp hạng cũ (v1) khi tải", () => {
    localStorage.setItem("hanh_trinh_do_leaderboard_v1", JSON.stringify([rec("old", 1, 1)]));
    expect(loadLeaderboard()).toEqual([]);
    expect(localStorage.getItem("hanh_trinh_do_leaderboard_v1")).toBeNull();
  });
});
