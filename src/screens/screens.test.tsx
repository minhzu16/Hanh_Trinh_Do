import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MenuScreen } from "./MenuScreen";
import { QuizScreen } from "./QuizScreen";
import { CollectionScreen } from "./CollectionScreen";
import { SummaryScreen } from "./SummaryScreen";
import { content } from "../content";
import { start } from "../engine/step";
import type { GameState } from "../engine/types";

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
});

