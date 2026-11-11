import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LeaderboardPanel } from "./LeaderboardPanel";
import {
  addRecord,
  loadLeaderboard,
  type PlayerRecord
} from "../engine/leaderboard";

const mockStrings: Record<string, string> = {
  "leaderboard.title": "Bảng vinh danh",
  "leaderboard.subtitle": "Xếp theo điểm và thời gian",
  "leaderboard.empty": "Chưa có lượt chơi nào",
  "leaderboard.clear": "Xoá lịch sử",
  "leaderboard.clear.confirm": "Xoá toàn bộ lịch sử?",
  "leaderboard.position": "Bạn xếp hạng #{pos} / {total}",
  "leaderboard.points": "điểm",
  "leaderboard.name.placeholder": "Nhập tên của bạn",
  "leaderboard.name.save": "Ghi danh",
  "leaderboard.name.saved": "Đã lưu",
  "leaderboard.you": "Bạn",
  "leaderboard.col.rank": "Hạng",
  "leaderboard.col.name": "Người chơi",
  "leaderboard.col.title": "Danh hiệu",
  "leaderboard.col.score": "Điểm",
  "leaderboard.col.time": "Thời gian",
  "leaderboard.col.detail": "Chọn · Hỏi",
  "leaderboard.col.date": "Ngày",
  "leaderboard.stats.plays": "Lượt chơi",
  "leaderboard.stats.best": "Điểm cao nhất",
  "leaderboard.stats.fastest": "Nhanh nhất"
};

function createMockRecord(overrides: Partial<PlayerRecord>): PlayerRecord {
  return {
    id: "rec-" + Math.random().toString(36).slice(2, 8),
    name: "Người chơi vô danh",
    finishedAt: "2026-03-01T10:00:00.000Z",
    durationMs: 180_000, // 3 minutes
    score: 100,
    correctFirstTry: 7,
    totalChoices: 7,
    quizCorrect: 5,
    totalQuiz: 6,
    unlockedCount: 8,
    totalCollectibles: 10,
    rankKey: "summary.rank.7",
    rankTitle: "Người đi cùng lịch sử",
    ...overrides
  };
}

describe("LeaderboardPanel Component", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("hiển thị trạng thái rỗng khi chưa có lượt chơi nào", () => {
    render(<LeaderboardPanel strings={mockStrings} />);

    expect(screen.getByRole("heading", { name: /Bảng vinh danh/i })).toBeInTheDocument();
    expect(screen.getByText("Chưa có lượt chơi nào")).toBeInTheDocument();
    expect(screen.queryByText("Xoá lịch sử")).toBeNull();
    expect(screen.queryByTestId("leaderboard-row")).toBeNull();
  });

  it("hiển thị danh sách xếp hạng đúng thứ tự điểm và huy chương", () => {
    addRecord(
      createMockRecord({
        id: "p1",
        name: "Nguyễn Văn A",
        score: 150,
        durationMs: 300_000,
        rankTitle: "Nhà nghiên cứu sử học"
      })
    );
    addRecord(
      createMockRecord({
        id: "p2",
        name: "Trần Thị B",
        score: 120,
        durationMs: 240_000,
        rankTitle: "Người ghi nhớ lịch sử"
      })
    );
    addRecord(
      createMockRecord({
        id: "p3",
        name: "Lê Văn C",
        score: 110,
        durationMs: 200_000,
        rankTitle: "Người tìm hiểu lịch sử"
      })
    );
    addRecord(
      createMockRecord({
        id: "p4",
        name: "Phạm Văn D",
        score: 90,
        durationMs: 180_000,
        rankTitle: "Học giả trẻ tuổi"
      })
    );

    render(<LeaderboardPanel strings={mockStrings} />);

    // Kiểm tra hàng và huy chương
    const rows = screen.getAllByTestId("leaderboard-row");
    expect(rows).toHaveLength(4);

    expect(screen.getByText("🥇")).toBeInTheDocument();
    expect(screen.getByText("🥈")).toBeInTheDocument();
    expect(screen.getByText("🥉")).toBeInTheDocument();
    expect(screen.getByText("#4")).toBeInTheDocument();

    expect(screen.getByText("Nguyễn Văn A")).toBeInTheDocument();
    expect(screen.getByText("Trần Thị B")).toBeInTheDocument();
    expect(screen.getByText("Lê Văn C")).toBeInTheDocument();
    expect(screen.getByText("Phạm Văn D")).toBeInTheDocument();

    // Thống kê
    expect(screen.getByText("4")).toBeInTheDocument(); // Lượt chơi
    expect(screen.getAllByText("150").length).toBeGreaterThanOrEqual(1); // Điểm cao nhất
    expect(screen.getByText("03:00")).toBeInTheDocument(); // Nhanh nhất (180s)
  });

  it("làm nổi bật người chơi hiện tại và hỗ trợ ghi danh đổi tên", () => {
    const me = createMockRecord({
      id: "my-run-123",
      name: "Người chơi vô danh",
      score: 130,
      durationMs: 250_000,
      rankTitle: "Người đi cùng lịch sử"
    });
    addRecord(me);

    render(<LeaderboardPanel strings={mockStrings} latestRecordId="my-run-123" />);

    // Có hàng được highlight cho người chơi
    const meRow = screen.getByTestId("leaderboard-row-me");
    expect(meRow).toBeInTheDocument();
    expect(meRow).toHaveTextContent("Bạn");

    // Banner hiển thị vị trí
    expect(screen.getByText(/Bạn xếp hạng #1 \/ 1/)).toBeInTheDocument();

    // Form ghi danh đổi tên
    const input = screen.getByPlaceholderText("Nhập tên của bạn");
    const saveButton = screen.getByRole("button", { name: "Ghi danh" });

    fireEvent.change(input, { target: { value: "Trần Hưng Đạo" } });
    fireEvent.click(saveButton);

    // Sau khi lưu, hiển thị "✓ Đã lưu" và cập nhật tên trên hàng
    expect(screen.getByText("✓ Đã lưu")).toBeInTheDocument();
    expect(meRow).toHaveTextContent("Trần Hưng Đạo");

    // Kiểm tra đã lưu vào localStorage
    const saved = loadLeaderboard();
    expect(saved[0].name).toBe("Trần Hưng Đạo");
  });

  it("phân định thứ hạng: bằng điểm thì người chơi có thời gian ngắn hơn xếp trước", () => {
    addRecord(
      createMockRecord({
        id: "slow",
        name: "Chạy chậm",
        score: 100,
        durationMs: 600_000 // 10 phút
      })
    );
    addRecord(
      createMockRecord({
        id: "fast",
        name: "Chạy nhanh",
        score: 100,
        durationMs: 300_000 // 5 phút
      })
    );

    render(<LeaderboardPanel strings={mockStrings} />);

    const rows = screen.getAllByTestId("leaderboard-row");
    expect(rows[0]).toHaveTextContent("Chạy nhanh");
    expect(rows[1]).toHaveTextContent("Chạy chậm");
  });

  it("hiển thị người chơi ở hàng riêng bên dưới nếu xếp hạng ngoài topN", () => {
    // Tạo 12 bản ghi với điểm từ 120 giảm dần về 10
    for (let i = 12; i >= 1; i--) {
      addRecord(
        createMockRecord({
          id: `player-${i}`,
          name: `Người chơi ${i}`,
          score: i * 10,
          durationMs: 100_000
        })
      );
    }

    // Top 10 hiển thị người chơi 12 -> 3; Người chơi 2 xếp hạng #11 (ngoài top 10)
    render(<LeaderboardPanel strings={mockStrings} latestRecordId="player-2" topN={10} />);

    const regularRows = screen.getAllByTestId("leaderboard-row");
    expect(regularRows).toHaveLength(10);

    const meRow = screen.getByTestId("leaderboard-row-me");
    expect(meRow).toBeInTheDocument();
    expect(meRow).toHaveTextContent("Người chơi 2");
    expect(meRow).toHaveTextContent("#11");
  });

  it("hỗ trợ xoá toàn bộ lịch sử khi người dùng xác nhận", () => {
    addRecord(
      createMockRecord({
        id: "rec-1",
        name: "Người chơi 1",
        score: 100
      })
    );

    const confirmSpy = vi.spyOn(window, "confirm");

    // Người dùng huỷ bỏ (cancel)
    confirmSpy.mockReturnValueOnce(false);
    const { unmount } = render(<LeaderboardPanel strings={mockStrings} />);

    const clearBtn = screen.getByText("Xoá lịch sử");
    fireEvent.click(clearBtn);
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(loadLeaderboard()).toHaveLength(1);

    unmount();

    // Người dùng đồng ý (confirm)
    confirmSpy.mockReturnValueOnce(true);
    render(<LeaderboardPanel strings={mockStrings} />);

    const clearBtn2 = screen.getByText("Xoá lịch sử");
    fireEvent.click(clearBtn2);
    expect(confirmSpy).toHaveBeenCalledTimes(2);

    expect(loadLeaderboard()).toHaveLength(0);
    expect(screen.getByText("Chưa có lượt chơi nào")).toBeInTheDocument();

    confirmSpy.mockRestore();
  });
});
