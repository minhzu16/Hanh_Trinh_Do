import { describe, it, expect, beforeEach } from "vitest";
import { content } from "../content";
import { start, next, choose, getCurrentNode, getCurrentScene } from "./step";
import { saveState, loadState, clearSave, loadPermanentCollectibles } from "./save";
import { getSummary } from "./summary";
import type { GameState } from "./types";

describe("Visual Novel Engine", () => {
  beforeEach(() => {
    clearSave();
  });

  it("E-01 start: State ở nút đầu của k0-c1", () => {
    const s = start(content);
    expect(s.currentChapterId).toBe("k0");
    expect(s.currentSceneId).toBe("k0-c1");
    expect(s.nodeIndex).toBe(0);
    expect(s.activeOption).toBeNull();
    const node = getCurrentNode(content, s);
    expect(node?.type).toBe("narration");
  });

  it("E-02 next đến hết cảnh: Sang cảnh kế tiếp theo chapters[].scenes", () => {
    let s = start(content);
    const scene1 = getCurrentScene(content, s);
    expect(scene1?.id).toBe("k0-c1");

    // Đi đến nút choice
    while (getCurrentNode(content, s)?.type !== "choice") {
      s = next(content, s);
    }
    expect(getCurrentNode(content, s)?.type).toBe("choice");

    // Chọn phương án đúng C
    s = choose(content, s, "C");
    // Duyệt hết các node trong C
    while (s.activeOption !== null) {
      s = next(content, s);
    }

    // Sau khi hết k0-c1, chuyển sang k0-c2
    expect(s.currentSceneId).toBe("k0-c2");
    expect(s.nodeIndex).toBe(0);
  });

  it("E-03 Chọn phương án sai ở k0-l1: Đi qua CG, hộp kiến thức rồi quay về k0-l1", () => {
    let s = start(content);
    while (getCurrentNode(content, s)?.type !== "choice") {
      s = next(content, s);
    }
    expect(getCurrentNode(content, s)?.type).toBe("choice");

    // Chọn phương án sai A
    s = choose(content, s, "A");
    expect(s.activeOption).not.toBeNull();
    expect(s.activeOption?.optionKey).toBe("A");
    expect(getCurrentNode(content, s)?.type).toBe("cg");

    s = next(content, s); // sang narration
    expect(getCurrentNode(content, s)?.type).toBe("narration");

    s = next(content, s); // sang knowledge
    expect(getCurrentNode(content, s)?.type).toBe("knowledge");

    s = next(content, s); // gặp retry -> quay lại choice!
    expect(s.activeOption).toBeNull();
    expect(getCurrentNode(content, s)?.type).toBe("choice");
  });

  it("E-04 Sai một lần rồi đúng: Lựa chọn ghi chon_lai", () => {
    let s = start(content);
    while (getCurrentNode(content, s)?.type !== "choice") {
      s = next(content, s);
    }

    // Chọn sai
    s = choose(content, s, "A");
    s = next(content, s); // cg -> narration
    s = next(content, s); // narration -> knowledge
    s = next(content, s); // retry -> về choice

    // Giờ chọn đúng C
    s = choose(content, s, "C");
    expect(s.choiceScores["k0-l1"]).toBe("chon_lai");
  });

  it("E-05 Đúng ngay: Ghi dung_ngay", () => {
    let s = start(content);
    while (getCurrentNode(content, s)?.type !== "choice") {
      s = next(content, s);
    }

    s = choose(content, s, "C");
    expect(s.choiceScores["k0-l1"]).toBe("dung_ngay");
  });

  it("E-06 Gọi choose khi nút hiện tại không phải choice: Ném lỗi, state không đổi", () => {
    const s = start(content);
    expect(getCurrentNode(content, s)?.type).toBe("narration");
    expect(() => choose(content, s, "A")).toThrow();
  });

  it("E-07 Nút unlock: Tư liệu vào danh sách, không trùng khi đi lại", () => {
    let s = start(content);
    // Nhảy tới cảnh k0-c3 có unlock tl-bao-nhan-dao
    s = {
      ...s,
      currentSceneId: "k0-c3",
      nodeIndex: 0
    };

    while (s.currentSceneId === "k0-c3") {
      s = next(content, s);
      if (s.unlockedCollectibles.includes("tl-bao-nhan-dao")) break;
    }
    expect(s.unlockedCollectibles).toContain("tl-bao-nhan-dao");

    // Đi lại lần nữa
    const countBefore = s.unlockedCollectibles.length;
    s = {
      ...s,
      currentSceneId: "k0-c3",
      nodeIndex: 0
    };
    while (s.currentSceneId === "k0-c3") {
      s = next(content, s);
      if (s.unlockedCollectibles.includes("tl-bao-nhan-dao")) break;
    }
    expect(s.unlockedCollectibles.length).toBe(countBefore);
  });

  it("E-08 Hết kỳ cuối: Chuyển sang trạng thái quiz", () => {
    let s = start(content);
    // Đặt state ở cảnh cuối cùng k2-c5, nút cuối
    const lastScene = content.scenes.find((sc) => sc.id === "k2-c5")!;
    s = {
      ...s,
      currentChapterId: "k2",
      currentSceneId: "k2-c5",
      nodeIndex: lastScene.nodes.length - 1
    };

    s = next(content, s);
    expect(s.screen).toBe("quiz");
  });

  it("E-09 summary với 7/7, 5/7, 4/7: Đúng ba xếp loại ở 03 mục 8", () => {
    const baseState: GameState = start(content);

    // 7/7
    const s7: GameState = {
      ...baseState,
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
    expect(getSummary(content, s7).rankKey).toBe("summary.rank.7");
    expect(getSummary(content, s7).rankTitle).toBe("Người đi cùng lịch sử");

    // 5/7
    const s5: GameState = {
      ...baseState,
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
    expect(getSummary(content, s5).rankKey).toBe("summary.rank.5");
    expect(getSummary(content, s5).rankTitle).toBe("Người học trò chăm chỉ");

    // 4/7
    const s4: GameState = {
      ...baseState,
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
    expect(getSummary(content, s4).rankKey).toBe("summary.rank.0");
    expect(getSummary(content, s4).rankTitle).toBe("Người đang tìm đường");
  });

  it("E-10 Lưu rồi khôi phục giữa cảnh: Tiếp tục đúng nút", () => {
    let s = start(content);
    s = next(content, s);
    s = next(content, s);
    saveState(s);

    const loaded = loadState();
    expect(loaded).not.toBeNull();
    expect(loaded?.currentSceneId).toBe(s.currentSceneId);
    expect(loaded?.nodeIndex).toBe(s.nodeIndex);
  });

  it("E-11 Bộ sưu tập tư liệu được bảo lưu vĩnh viễn khi chơi lại từ đầu", () => {
    let s = start(content);
    s.unlockedCollectibles = ["tl-bao-nhan-dao", "tl-ban-yeu-sach"];
    saveState(s);

    // Chơi lại từ đầu (clearSave story state, keep collectibles)
    clearSave(true);
    const fresh = start(content);
    fresh.unlockedCollectibles = loadPermanentCollectibles();

    expect(fresh.unlockedCollectibles).toContain("tl-bao-nhan-dao");
    expect(fresh.unlockedCollectibles).toContain("tl-ban-yeu-sach");
  });
});

