import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  saveState,
  loadState,
  clearSave,
  migrateSavedState,
  savePermanentCollectibles,
  loadPermanentCollectibles,
  SAVE_SCHEMA_VERSION
} from "./save";
import { start } from "./step";
import { content } from "../content";
import type { GameState } from "./types";

describe("Backend: Save, Load & State Migration (SM)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("SM-01 saveState: Tạo bản lưu có envelope chứa version và timestamp", () => {
    const s = start(content);
    saveState(s);
    const raw = localStorage.getItem(`hanh_trinh_do_save_v${SAVE_SCHEMA_VERSION}`);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.version).toBe(SAVE_SCHEMA_VERSION);
    expect(parsed.savedAt).toBeTruthy();
    expect(parsed.state.currentSceneId).toBe(s.currentSceneId);
  });

  it("SM-02 loadState: Khôi phục chính xác toàn bộ trường của GameState", () => {
    const s: GameState = {
      ...start(content),
      currentChapterId: "k1",
      currentSceneId: "k1-c2",
      nodeIndex: 3,
      choiceScores: { "k0-l1": "dung_ngay" },
      choiceAttempts: { "k0-l1": 1 },
      unlockedCollectibles: ["tl-bao-nhan-dao"],
      dialogLog: [{ speaker: "Minh", text: "Thử nghiệm" }]
    };
    saveState(s);
    const restored = loadState();
    expect(restored).not.toBeNull();
    expect(restored?.currentChapterId).toBe("k1");
    expect(restored?.currentSceneId).toBe("k1-c2");
    expect(restored?.nodeIndex).toBe(3);
    expect(restored?.choiceScores["k0-l1"]).toBe("dung_ngay");
    expect(restored?.choiceAttempts["k0-l1"]).toBe(1);
    expect(restored?.unlockedCollectibles).toContain("tl-bao-nhan-dao");
    expect(restored?.dialogLog[0].text).toBe("Thử nghiệm");
  });

  it("SM-03 loadState: Trả về null khi localStorage hoàn toàn trống", () => {
    const restored = loadState();
    expect(restored).toBeNull();
  });

  it("SM-04 loadState: Trả về null và không crash khi dữ liệu lưu bị hỏng (corrupted string)", () => {
    localStorage.setItem(`hanh_trinh_do_save_v${SAVE_SCHEMA_VERSION}`, "INVALID_JSON_{{{");
    const restored = loadState();
    expect(restored).toBeNull();
  });

  it("SM-05 migrateSavedState: Tự động điền giá trị mặc định cho các trường bị thiếu", () => {
    const partialRaw = {
      currentSceneId: "k0-c1"
    };
    const migrated = migrateSavedState(partialRaw);
    expect(migrated).not.toBeNull();
    expect(migrated?.currentChapterId).toBe("k0");
    expect(migrated?.nodeIndex).toBe(0);
    expect(migrated?.screen).toBe("scene");
    expect(migrated?.activeOption).toBeNull();
    expect(migrated?.choiceScores).toEqual({});
    expect(migrated?.choiceAttempts).toEqual({});
    expect(Array.isArray(migrated?.dialogLog)).toBe(true);
  });

  it("SM-06 migrateSavedState: Trả về null nếu scene trong bản lưu không còn tồn tại trong game", () => {
    const invalidSceneRaw = {
      currentSceneId: "scene-khong-ton-tai-trong-game"
    };
    const migrated = migrateSavedState(invalidSceneRaw);
    expect(migrated).toBeNull();
  });

  it("SM-07 migrateSavedState: Tự bóc tách dữ liệu nếu được bọc trong envelope", () => {
    const envelope = {
      version: 1,
      savedAt: "2026-01-01T00:00:00.000Z",
      state: {
        currentSceneId: "k0-c2",
        nodeIndex: 2
      }
    };
    const migrated = migrateSavedState(envelope);
    expect(migrated).not.toBeNull();
    expect(migrated?.currentSceneId).toBe("k0-c2");
    expect(migrated?.nodeIndex).toBe(2);
  });

  it("SM-08 clearSave(true): Xóa bản lưu màn chơi nhưng giữ lại bộ sưu tập vĩnh viễn", () => {
    const s = start(content);
    s.unlockedCollectibles = ["tl-bao-nhan-dao", "tl-ban-yeu-sach"];
    saveState(s);

    clearSave(true);
    expect(loadState()).toBeNull();
    const perm = loadPermanentCollectibles();
    expect(perm).toContain("tl-bao-nhan-dao");
    expect(perm).toContain("tl-ban-yeu-sach");
  });

  it("SM-09 clearSave(false): Xóa sạch toàn bộ bao gồm cả bộ sưu tập vĩnh viễn", () => {
    const s = start(content);
    s.unlockedCollectibles = ["tl-bao-nhan-dao"];
    saveState(s);

    clearSave(false);
    expect(loadState()).toBeNull();
    expect(loadPermanentCollectibles()).toEqual([]);
  });

  it("SM-10 savePermanentCollectibles: Hợp nhất không làm trùng lặp các mã tư liệu", () => {
    savePermanentCollectibles(["tl-bao-nhan-dao"]);
    savePermanentCollectibles(["tl-bao-nhan-dao", "tl-ban-yeu-sach"]);
    const list = loadPermanentCollectibles();
    expect(list.length).toBe(2);
    expect(list).toContain("tl-bao-nhan-dao");
    expect(list).toContain("tl-ban-yeu-sach");
  });

  it("SM-11 Migration từ legacy v1: Tự động nạp từ hanh_trinh_do_save_v1 nếu chưa có v2", () => {
    const v1State = {
      version: 1,
      savedAt: "2025-01-01T00:00:00.000Z",
      state: {
        currentChapterId: "k0",
        currentSceneId: "k0-c3",
        nodeIndex: 1
      }
    };
    localStorage.setItem("hanh_trinh_do_save_v1", JSON.stringify(v1State));

    const loaded = loadState();
    expect(loaded).not.toBeNull();
    expect(loaded?.currentSceneId).toBe("k0-c3");
  });

  it("SM-12 Migration từ legacy collection v1: Nạp bộ sưu tập từ khóa cũ nếu có", () => {
    localStorage.setItem("hanh_trinh_do_collection_v1", JSON.stringify(["tl-dai-hoi-tours"]));
    const items = loadPermanentCollectibles();
    expect(items).toContain("tl-dai-hoi-tours");
  });

  it("SM-13 An toàn ngoại lệ khi Storage bị vô hiệu hóa hoặc vượt Quota", () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    const s = start(content);
    // Không ném lỗi ra ngoài khi localStorage lỗi
    expect(() => saveState(s)).not.toThrow();
    setItemSpy.mockRestore();
  });

  it("SM-14 migrateSavedState: Trả về null khi input là null, undefined, số hoặc chuỗi", () => {
    expect(migrateSavedState(null)).toBeNull();
    expect(migrateSavedState(undefined)).toBeNull();
    expect(migrateSavedState(12345)).toBeNull();
    expect(migrateSavedState("string-data")).toBeNull();
  });

  it("SM-15 Đảm bảo lưu và tải giữ nguyên danh sách dialogLog", () => {
    const s = start(content);
    s.dialogLog = [
      { speaker: "bac-tu", text: "Câu 1" },
      { text: "Lời dẫn truyện" },
      { speaker: "Minh", text: "Độc thoại nội tâm" }
    ];
    saveState(s);
    const loaded = loadState();
    expect(loaded?.dialogLog.length).toBe(3);
    expect(loaded?.dialogLog[0].speaker).toBe("bac-tu");
    expect(loaded?.dialogLog[1].speaker).toBeUndefined();
    expect(loaded?.dialogLog[2].speaker).toBe("Minh");
  });
});

