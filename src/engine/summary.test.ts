import { describe, it, expect } from "vitest";
import { getSummary } from "./summary";
import { start } from "./step";
import { content } from "../content";
import type { GameState } from "./types";

describe("Backend: Summary & Scoring Engine (SUM)", () => {
  it("SUM-01 Tổng số lựa chọn tính toán luôn đúng bằng 7", () => {
    const s = start(content);
    const result = getSummary(content, s);
    expect(result.totalChoices).toBe(7);
  });

  it("SUM-02 Tổng số câu hỏi quiz tính toán đúng bằng 6", () => {
    const s = start(content);
    const result = getSummary(content, s);
    expect(result.totalQuiz).toBe(6);
  });

  it("SUM-03 Tổng số tư liệu mở khóa tối đa là 8", () => {
    const s = start(content);
    const result = getSummary(content, s);
    expect(result.totalCollectibles).toBe(8);
  });

  it("SUM-04 Xếp loại 7/7 đúng ngay lần đầu: Danh hiệu 'Người đi cùng lịch sử'", () => {
    const s: GameState = {
      ...start(content),
      choiceScores: {
        "k0-l1": "dung_ngay",
        "k0-l2": "dung_ngay",
        "k1-l1": "dung_ngay",
        "k1-l2": "dung_ngay",
        "k2-l1": "dung_ngay",
        "k2-l2": "dung_ngay",
        "k2-l3": "dung_ngay"
      }
    };
    const res = getSummary(content, s);
    expect(res.correctFirstTry).toBe(7);
    expect(res.rankKey).toBe("summary.rank.7");
    expect(res.rankTitle).toBe("Người đi cùng lịch sử");
  });

  it("SUM-05 Xếp loại 6/7 đúng ngay lần đầu: Danh hiệu 'Người học trò chăm chỉ'", () => {
    const s: GameState = {
      ...start(content),
      choiceScores: {
        "k0-l1": "dung_ngay",
        "k0-l2": "dung_ngay",
        "k1-l1": "dung_ngay",
        "k1-l2": "dung_ngay",
        "k2-l1": "dung_ngay",
        "k2-l2": "dung_ngay",
        "k2-l3": "chon_lai"
      }
    };
    const res = getSummary(content, s);
    expect(res.correctFirstTry).toBe(6);
    expect(res.rankKey).toBe("summary.rank.5");
    expect(res.rankTitle).toBe("Người học trò chăm chỉ");
  });

  it("SUM-06 Xếp loại 5/7 đúng ngay lần đầu: Danh hiệu 'Người học trò chăm chỉ'", () => {
    const s: GameState = {
      ...start(content),
      choiceScores: {
        "k0-l1": "dung_ngay",
        "k0-l2": "dung_ngay",
        "k1-l1": "dung_ngay",
        "k1-l2": "dung_ngay",
        "k2-l1": "dung_ngay",
        "k2-l2": "chon_lai",
        "k2-l3": "chon_lai"
      }
    };
    const res = getSummary(content, s);
    expect(res.correctFirstTry).toBe(5);
    expect(res.rankKey).toBe("summary.rank.5");
    expect(res.rankTitle).toBe("Người học trò chăm chỉ");
  });

  it("SUM-07 Xếp loại 4/7 đúng ngay: Danh hiệu 'Người đang tìm đường'", () => {
    const s: GameState = {
      ...start(content),
      choiceScores: {
        "k0-l1": "dung_ngay",
        "k0-l2": "dung_ngay",
        "k1-l1": "dung_ngay",
        "k1-l2": "dung_ngay",
        "k2-l1": "chon_lai",
        "k2-l2": "chon_lai",
        "k2-l3": "chon_lai"
      }
    };
    const res = getSummary(content, s);
    expect(res.correctFirstTry).toBe(4);
    expect(res.rankKey).toBe("summary.rank.0");
    expect(res.rankTitle).toBe("Người đang tìm đường");
  });

  it("SUM-08 Xếp loại 0/7 đúng ngay: Danh hiệu 'Người đang tìm đường'", () => {
    const s: GameState = {
      ...start(content),
      choiceScores: {
        "k0-l1": "chon_lai",
        "k0-l2": "chon_lai",
        "k1-l1": "chon_lai",
        "k1-l2": "chon_lai",
        "k2-l1": "chon_lai",
        "k2-l2": "chon_lai",
        "k2-l3": "chon_lai"
      }
    };
    const res = getSummary(content, s);
    expect(res.correctFirstTry).toBe(0);
    expect(res.rankKey).toBe("summary.rank.0");
    expect(res.rankTitle).toBe("Người đang tìm đường");
  });

  it("SUM-09 Tính toán số câu trả lời quiz đúng chính xác theo boolean map", () => {
    const s: GameState = {
      ...start(content),
      quizAnswers: {
        q1: true,
        q2: true,
        q3: false,
        q4: true,
        q5: false,
        q6: true
      }
    };
    const res = getSummary(content, s);
    expect(res.quizCorrect).toBe(4);
  });

  it("SUM-10 Tính số lượng tư liệu đã mở khóa chính xác", () => {
    const s: GameState = {
      ...start(content),
      unlockedCollectibles: ["tl-bao-nhan-dao", "tl-ban-yeu-sach", "tl-dai-hoi-tours"]
    };
    const res = getSummary(content, s);
    expect(res.unlockedCount).toBe(3);
  });

  it("SUM-11 Tính đúng khi người chơi hoàn thành 100% cả Choice, Quiz và Collectibles", () => {
    const s: GameState = {
      ...start(content),
      choiceScores: {
        "k0-l1": "dung_ngay",
        "k0-l2": "dung_ngay",
        "k1-l1": "dung_ngay",
        "k1-l2": "dung_ngay",
        "k2-l1": "dung_ngay",
        "k2-l2": "dung_ngay",
        "k2-l3": "dung_ngay"
      },
      quizAnswers: { q1: true, q2: true, q3: true, q4: true, q5: true, q6: true },
      unlockedCollectibles: content.collectibles.map((c) => c.id)
    };
    const res = getSummary(content, s);
    expect(res.correctFirstTry).toBe(7);
    expect(res.quizCorrect).toBe(6);
    expect(res.unlockedCount).toBe(8);
    expect(res.rankTitle).toBe("Người đi cùng lịch sử");
  });

  it("SUM-12 Fallback an toàn khi chuỗi strings bị thiếu key", () => {
    const customContent = {
      ...content,
      strings: {}
    };
    const s = start(content);
    const res = getSummary(customContent, s);
    expect(res.rankTitle).toBe("summary.rank.0");
  });
});

