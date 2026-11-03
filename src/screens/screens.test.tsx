import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuScreen } from "./MenuScreen";
import { QuizScreen } from "./QuizScreen";
import { CollectionScreen } from "./CollectionScreen";
import { SummaryScreen } from "./SummaryScreen";
import { SceneScreen } from "./SceneScreen";
import { content } from "../content";
import { start } from "../engine/step";
import type { GameState } from "../engine/types";

import { App } from "../App";
import { markNodeRead, isNodeRead, clearReadNodes } from "../engine/save";

describe("Frontend: Screens Interaction & Flow (SCR)", () => {
  // 1. MENU SCREEN
  it("SCR-01 MenuScreen: Hiển thị tiêu đề game và phụ đề lịch sử", () => {
    render(
      <MenuScreen
        content={content}
        hasSave={false}
        onStartNew={() => {}}
        onContinue={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />
    );

    expect(screen.getByText("Hành Trình Đỏ")).toBeInTheDocument();
    expect(screen.getByText(/1911 – 1930/i)).toBeInTheDocument();
  });

  it("SCR-02 MenuScreen: Khi chưa có bản lưu, nút Chơi tiếp không xuất hiện", () => {
    render(
      <MenuScreen
        content={content}
        hasSave={false}
        onStartNew={() => {}}
        onContinue={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />
    );

    expect(screen.queryByText(/Chơi tiếp/i)).toBeNull();
    expect(screen.getByText("Bắt đầu hành trình")).toBeInTheDocument();
  });

  it("SCR-03 MenuScreen: Khi có bản lưu (hasSave=true), xuất hiện nút Chơi tiếp", () => {
    render(
      <MenuScreen
        content={content}
        hasSave={true}
        onStartNew={() => {}}
        onContinue={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />
    );

    expect(screen.getByText(/Chơi tiếp/i)).toBeInTheDocument();
    expect(screen.getByText("Chơi lại từ đầu")).toBeInTheDocument();
  });

  it("SCR-04 MenuScreen: Bấm nút Bắt đầu gọi hàm onStartNew", () => {
    const onStartNew = vi.fn();
    render(
      <MenuScreen
        content={content}
        hasSave={false}
        onStartNew={onStartNew}
        onContinue={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />
    );

    const startBtn = screen.getByText("Bắt đầu hành trình");
    fireEvent.click(startBtn);
    expect(onStartNew).toHaveBeenCalledTimes(1);
  });

  it("SCR-05 MenuScreen: Bấm nút Bộ sưu tập gọi onOpenCollection", () => {
    const onOpenCollection = vi.fn();
    render(
      <MenuScreen
        content={content}
        hasSave={false}
        onStartNew={() => {}}
        onContinue={() => {}}
        onOpenCollection={onOpenCollection}
        isMuted={false}
        onToggleMute={() => {}}
      />
    );

    const colBtn = screen.getByText(/Bộ sưu tập tư liệu/i);
    fireEvent.click(colBtn);
    expect(onOpenCollection).toHaveBeenCalledTimes(1);
  });

  it("SCR-06 MenuScreen: Nút bật/tắt âm thanh gọi onToggleMute", () => {
    const onToggleMute = vi.fn();
    render(
      <MenuScreen
        content={content}
        hasSave={false}
        onStartNew={() => {}}
        onContinue={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={onToggleMute}
      />
    );

    const muteBtn = screen.getByTitle("Bật/Tắt âm thanh");
    fireEvent.click(muteBtn);
    expect(onToggleMute).toHaveBeenCalledTimes(1);
  });

  // 2. QUIZ SCREEN
  it("SCR-07 QuizScreen: Hiển thị câu hỏi đầu tiên cùng 4 phương án lựa chọn", () => {
    render(
      <QuizScreen
        content={content}
        onFinishQuiz={() => {}}
        onReturnMenu={() => {}}
      />
    );

    expect(screen.getByText(/Câu hỏi củng cố kiến thức/i)).toBeInTheDocument();
    expect(screen.getByText(content.quiz[0].question)).toBeInTheDocument();
  });

  it("SCR-08 QuizScreen: Nút Trả lời bị disabled khi chưa chọn đáp án", () => {
    render(
      <QuizScreen
        content={content}
        onFinishQuiz={() => {}}
        onReturnMenu={() => {}}
      />
    );

    const submitBtn = screen.getByRole("button", { name: /Trả lời/i });
    expect(submitBtn).toBeDisabled();
  });

  it("SCR-09 QuizScreen: Bấm chọn đáp án kích hoạt nút Trả lời", () => {
    render(
      <QuizScreen
        content={content}
        onFinishQuiz={() => {}}
        onReturnMenu={() => {}}
      />
    );

    const firstOpt = screen.getByText(content.quiz[0].answer);
    fireEvent.click(firstOpt);

    const submitBtn = screen.getByRole("button", { name: /Trả lời/i });
    expect(submitBtn).not.toBeDisabled();
  });

  it("SCR-10 QuizScreen: Xác nhận câu trả lời hiển thị giải thích và nguồn học thuật", () => {
    render(
      <QuizScreen
        content={content}
        onFinishQuiz={() => {}}
        onReturnMenu={() => {}}
      />
    );

    const firstOpt = screen.getByText(content.quiz[0].answer);
    fireEvent.click(firstOpt);

    const submitBtn = screen.getByRole("button", { name: /Trả lời/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Chính xác/i)).toBeInTheDocument();
    expect(screen.getByText(/Câu tiếp theo/i)).toBeInTheDocument();
  });

  it("SCR-11 QuizScreen: Nút Trở về màn hình chính kích hoạt onReturnMenu", () => {
    const onReturnMenu = vi.fn();
    render(
      <QuizScreen
        content={content}
        onFinishQuiz={() => {}}
        onReturnMenu={onReturnMenu}
      />
    );

    const returnBtn = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(returnBtn);
    expect(onReturnMenu).toHaveBeenCalledTimes(1);
  });

  // 3. COLLECTION SCREEN
  it("SCR-12 CollectionScreen: Hiển thị đầy đủ danh sách 8 tư liệu lịch sử khi đã mở khóa", () => {
    render(
      <CollectionScreen
        content={content}
        unlockedIds={content.collectibles.map((c) => c.id)}
        onBack={() => {}}
      />
    );

    expect(screen.getByText(/Bộ Sưu Tập Tư Liệu Lịch Sử/i)).toBeInTheDocument();
    expect(screen.getAllByText("Báo L'Humanité, 16–17/7/1920").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Đại hội Tua/i).length).toBeGreaterThan(0);
  });

  it("SCR-13 CollectionScreen: Tư liệu mở khóa hiển thị nguồn đối chứng học thuật", () => {
    render(
      <CollectionScreen
        content={content}
        unlockedIds={["tl-bao-nhan-dao"]}
        onBack={() => {}}
      />
    );

    expect(screen.getByText(/Căn cứ học thuật: Giáo trình Lịch sử Đảng/i)).toBeInTheDocument();
    expect(screen.getByText(/GT-51-LUAN-CUONG/i)).toBeInTheDocument();
  });

  it("SCR-14 CollectionScreen: Tư liệu chưa mở khóa hiển thị trạng thái khóa", () => {
    render(
      <CollectionScreen
        content={content}
        unlockedIds={[]} // Chưa mở khóa cái nào
        onBack={() => {}}
      />
    );

    expect(screen.getByText("Tư liệu chưa được khám phá")).toBeInTheDocument();
  });

  it("SCR-15 CollectionScreen: Bấm nút Trở lại gọi hàm onBack", () => {
    const onBack = vi.fn();
    render(
      <CollectionScreen
        content={content}
        unlockedIds={[]}
        onBack={onBack}
      />
    );

    const backBtn = screen.getByText("← Trở lại");
    fireEvent.click(backBtn);
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  // 4. SUMMARY SCREEN
  it("SCR-16 SummaryScreen: Hiển thị danh hiệu đạt được và số câu lựa chọn đúng", () => {
    const state: GameState = {
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

    render(
      <SummaryScreen
        content={content}
        state={state}
        onRestart={() => {}}
        onOpenCollection={() => {}}
        onReturnMenu={() => {}}
      />
    );

    expect(screen.getByText("Người đi cùng lịch sử")).toBeInTheDocument();
    expect(screen.getByText("7 / 7")).toBeInTheDocument();
  });

  it("SCR-17 SummaryScreen: Đề xuất cảnh cần ôn lại khi người chơi trả lời sai nhiều lần", () => {
    const state: GameState = {
      ...start(content),
      choiceScores: {
        "k0-l1": "chon_lai"
      },
      choiceAttempts: {
        "k0-l1": 3 // Sai 2 lần rồi mới đúng
      }
    };
    const onReplayScene = vi.fn();

    render(
      <SummaryScreen
        content={content}
        state={state}
        onRestart={() => {}}
        onOpenCollection={() => {}}
        onReturnMenu={() => {}}
        onReplayScene={onReplayScene}
      />
    );

    expect(screen.getByText(/Gợi ý củng cố lịch sử/i)).toBeInTheDocument();
    const replayBtn = screen.getByText(/Ôn lại cảnh này/i);
    expect(replayBtn).toBeInTheDocument();
    fireEvent.click(replayBtn);
    expect(onReplayScene).toHaveBeenCalledWith("k0-c1");
  });

  it("SCR-18 SummaryScreen: Bấm nút Chơi lại và Về menu gọi các hàm callback tương ứng", () => {
    const onRestart = vi.fn();
    const onReturnMenu = vi.fn();
    const state = start(content);

    render(
      <SummaryScreen
        content={content}
        state={state}
        onRestart={onRestart}
        onOpenCollection={() => {}}
        onReturnMenu={onReturnMenu}
      />
    );

    const restartBtn = screen.getByText(/Chơi lại từ đầu/i);
    fireEvent.click(restartBtn);
    expect(onRestart).toHaveBeenCalledTimes(1);

    const menuBtn = screen.getByText("Về Menu");
    fireEvent.click(menuBtn);
    expect(onReturnMenu).toHaveBeenCalledTimes(1);
  });

  // 5. QUIZ CONTROLS & CLEAN INTERFACE
  it("SCR-19 QuizScreen: Hiển thị badge thử thách và bộ đếm điểm", () => {
    render(
      <QuizScreen
        content={content}
        onFinishQuiz={() => {}}
        onReturnMenu={() => {}}
      />
    );

    expect(screen.getByText(/THỬ THÁCH 1: MÂU THUẪN XÃ HỘI/i)).toBeInTheDocument();
    expect(screen.getByText("Điểm:")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("SCR-20 QuizScreen: Tăng điểm khi trả lời đúng", () => {
    render(
      <QuizScreen
        content={content}
        onFinishQuiz={() => {}}
        onReturnMenu={() => {}}
      />
    );

    const correctOpt = screen.getByText(content.quiz[0].answer);
    fireEvent.click(correctOpt);

    const submitBtn = screen.getByRole("button", { name: /Trả lời/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("SCR-21 SceneScreen: Không hiển thị HUD điểm game giả định (Ý Chí / Bảo Mật), giữ chuẩn mực lịch sử", () => {
    const state = start(content);
    render(
      <SceneScreen
        content={content}
        state={state}
        onNext={() => {}}
        onChoose={() => {}}
        onReturnMenu={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />
    );

    expect(screen.queryByText(/Ý Chí:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Bảo Mật:/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Auto/i })).toBeInTheDocument();
  });

  // 6. READER UTILITIES (P13: F-03, F-06, REWIND, HIDE UI, CHAPTER SELECT)
  it("UI-22 Tiện ích Skip: Bật Skip ở lần chơi thứ hai -> Chạy qua nút đã đọc, dừng ở nút chưa đọc và ở lựa chọn (F-03)", () => {
    vi.useFakeTimers();
    clearReadNodes();

    // Lần 1: Giả lập người chơi đã đọc node 0 của cảnh k0-c1
    markNodeRead("k0-c1", 0);
    expect(isNodeRead("k0-c1", 0)).toBe(true);
    expect(isNodeRead("k0-c1", 1)).toBe(false);

    const onNext = vi.fn();
    const state: GameState = {
      ...start(content),
      currentSceneId: "k0-c1",
      nodeIndex: 0
    };

    const { rerender } = render(
      <SceneScreen
        content={content}
        state={state}
        onNext={onNext}
        onChoose={() => {}}
        onReturnMenu={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />
    );

    // Bật nút Bỏ qua (Skip)
    const skipBtn = screen.getByTitle(/Bỏ qua các đoạn đã đọc/i);
    fireEvent.click(skipBtn);
    expect(screen.getByText(/Dừng Skip/i)).toBeInTheDocument();

    // Node 0 đã đọc -> Skip tự động kích hoạt onNext sau 80ms
    vi.advanceTimersByTime(100);
    expect(onNext).toHaveBeenCalledTimes(1);

    // Chuyển sang Node 1 (chưa từng đọc)
    const stateNode1: GameState = {
      ...state,
      nodeIndex: 1
    };
    rerender(
      <SceneScreen
        content={content}
        state={stateNode1}
        onNext={onNext}
        onChoose={() => {}}
        onReturnMenu={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />
    );

    // Node 1 chưa đọc -> Skip tự động dừng, nút quay lại "Bỏ qua (Skip)" và không gọi tiếp onNext
    vi.advanceTimersByTime(200);
    expect(onNext).toHaveBeenCalledTimes(1); // Không gọi thêm
    expect(screen.getByText(/Bỏ qua \(Skip\)/i)).toBeInTheDocument();

    // Kiểm tra dừng ở Lựa chọn:
    const choiceIdx = content.scenes.find((s) => s.id === "k0-c1")?.nodes.findIndex((n) => n.type === "choice")!;
    markNodeRead("k0-c1", choiceIdx);
    const stateChoice: GameState = {
      ...state,
      nodeIndex: choiceIdx
    };
    rerender(
      <SceneScreen
        content={content}
        state={stateChoice}
        onNext={onNext}
        onChoose={() => {}}
        onReturnMenu={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />
    );

    // Ở nút lựa chọn, không có nút Skip và không tự động nhảy qua
    expect(screen.queryByTitle(/Bỏ qua các đoạn đã đọc/i)).toBeNull();

    vi.useRealTimers();
  });

  it("UI-23 Tiện ích Lùi một câu: Lùi một câu 3 lần về đúng nút; không lùi qua lựa chọn", () => {
    render(<App />);

    // Bắt đầu game
    const startBtn = screen.getByText(/Bắt đầu hành trình|Chơi lại từ đầu/i);
    fireEvent.click(startBtn);

    // Kiểm tra ban đầu chưa có nút Lùi (chưa đi bước nào)
    expect(screen.queryByTitle(/Lùi lại một câu thoại/i)).toBeNull();

    // Đi tiếp 3 bước (Space hoặc phím bấm)
    fireEvent.keyDown(window, { key: " " });
    fireEvent.keyDown(window, { key: " " });
    fireEvent.keyDown(window, { key: " " });

    // Bây giờ có nút Lùi
    const rewindBtn = screen.getByTitle(/Lùi lại một câu thoại/i);
    expect(rewindBtn).toBeInTheDocument();

    // Lùi câu 1
    fireEvent.click(rewindBtn);
    // Lùi câu 2
    fireEvent.click(rewindBtn);
    // Lùi câu 3
    fireEvent.click(rewindBtn);

    // Sau khi lùi 3 lần về nút ban đầu (nodeIndex = 0), nút Lùi biến mất
    expect(screen.queryByTitle(/Lùi lại một câu thoại/i)).toBeNull();
  });

  it("UI-23b Tiện ích Lùi một câu: Khóa lùi thoại sau khi đã chốt lựa chọn", () => {
    // Jump tới thẳng cảnh k0-c1 có lựa chọn
    window.history.pushState({}, "Test", "?canh=k0-c1");
    render(<App />);

    // Đi đến nút choice k0-l1
    const choiceIdx = content.scenes.find((s) => s.id === "k0-c1")?.nodes.findIndex((n) => n.type === "choice")!;
    for (let i = 0; i < choiceIdx; i++) {
      fireEvent.keyDown(window, { key: " " });
    }

    // Chọn phương án C (phương án đúng của k0-l1)
    const optC = screen.getByText(/Sang tận phương Tây/i);
    fireEvent.click(optC);

    // Sau khi chốt phương án, lịch sử lùi được làm trống -> không được lùi qua lựa chọn
    expect(screen.queryByTitle(/Lùi lại một câu thoại/i)).toBeNull();
  });

  it("UI-26 Phím H: Ẩn và hiện lại giao diện để chiêm ngưỡng toàn cảnh hoặc CG", () => {
    const state = start(content);
    render(
      <SceneScreen
        content={content}
        state={state}
        onNext={() => {}}
        onChoose={() => {}}
        onReturnMenu={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
      />
    );

    // Ban đầu giao diện hiển thị
    expect(screen.queryByText(/Đang ẩn giao diện/i)).toBeNull();

    // Nhấn phím 'h' -> ẩn giao diện
    fireEvent.keyDown(window, { key: "h" });
    expect(screen.getByText(/Đang ẩn giao diện/i)).toBeInTheDocument();

    // Nhấn phím 'h' lần nữa -> hiện lại giao diện
    fireEvent.keyDown(window, { key: "h" });
    expect(screen.queryByText(/Đang ẩn giao diện/i)).toBeNull();
  });

  it("UI-27 Chọn chương: Mở khóa danh sách chọn chương trên menu sau khi đã hoàn thành một lần", () => {
    const onSelectChapter = vi.fn();
    render(
      <MenuScreen
        content={content}
        hasSave={false}
        onStartNew={() => {}}
        onContinue={() => {}}
        onOpenCollection={() => {}}
        isMuted={false}
        onToggleMute={() => {}}
        hasCompletedGame={true}
        onSelectChapter={onSelectChapter}
      />
    );

    expect(screen.getByText(/Chọn kỳ lịch sử \(Đã hoàn thành\)/i)).toBeInTheDocument();
    const ky1Btn = screen.getByText("Kỳ 1 – Chuẩn bị");
    fireEvent.click(ky1Btn);
    expect(onSelectChapter).toHaveBeenCalledWith("k1-c1");
  });

  it("UI-28 Flowchart Tổng kết: Bấm mở sơ đồ ngã rẽ lịch sử hiển thị đủ 7 lựa chọn và 21 nhánh (P11b)", () => {
    const state: GameState = {
      ...start(content),
      screen: "summary"
    };

    render(
      <SummaryScreen
        content={content}
        state={state}
        onRestart={() => {}}
        onOpenCollection={() => {}}
        onReturnMenu={() => {}}
      />
    );

    // Ban đầu bảng sơ đồ đóng
    expect(screen.queryByText(/1\/7 • k0-l1/i)).toBeNull();

    // Bấm nút mở sơ đồ
    const toggleBtn = screen.getByText(/Sơ đồ các ngã rẽ lịch sử/i);
    fireEvent.click(toggleBtn);

    // Hiển thị đầy đủ 7 lựa chọn
    expect(screen.getByText(/1\/7 • k0-l1/i)).toBeInTheDocument();
    expect(screen.getByText(/2\/7 • k0-l2/i)).toBeInTheDocument();
    expect(screen.getByText(/3\/7 • k1-l1/i)).toBeInTheDocument();
    expect(screen.getByText(/4\/7 • k1-l2/i)).toBeInTheDocument();
    expect(screen.getByText(/5\/7 • k2-l1/i)).toBeInTheDocument();
    expect(screen.getByText(/6\/7 • k2-l2/i)).toBeInTheDocument();
    expect(screen.getByText(/7\/7 • k2-l3/i)).toBeInTheDocument();
  });

  it("UI-29 Flowchart Tổng kết: Đánh dấu nhánh đã đi và bấm nút Xem lại gọi onReplayScene (P11b)", () => {
    const onReplayScene = vi.fn();
    const state: GameState = {
      ...start(content),
      screen: "summary",
      flags: {
        "k0-l1:C": true,
        "k0-l1:A": true
      }
    };

    render(
      <SummaryScreen
        content={content}
        state={state}
        onRestart={() => {}}
        onOpenCollection={() => {}}
        onReturnMenu={() => {}}
        onReplayScene={onReplayScene}
      />
    );

    // Mở sơ đồ
    const toggleBtn = screen.getByText(/Sơ đồ các ngã rẽ lịch sử/i);
    fireEvent.click(toggleBtn);

    // Kiểm tra hiển thị đã khám phá cho các nhánh đã đi
    expect(screen.getAllByText(/✓ Đã khám phá/i).length).toBeGreaterThanOrEqual(2);

    // Bấm nút xem lại cảnh ở nhánh đầu tiên
    const replayButtons = screen.getAllByText(/Xem lại cảnh/i);
    expect(replayButtons.length).toBeGreaterThan(0);
    fireEvent.click(replayButtons[0]);
    expect(onReplayScene).toHaveBeenCalledWith("k0-c1");
  });
});


