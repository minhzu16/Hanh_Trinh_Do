import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { App } from "../App";
import { MenuScreen } from "../screens/MenuScreen";
import { QuizScreen } from "../screens/QuizScreen";
import { SummaryScreen } from "../screens/SummaryScreen";
import { CollectionScreen } from "../screens/CollectionScreen";
import { SettingsModal, type SettingsConfig } from "../components/SettingsModal";
import { LogModal } from "../components/LogModal";
import { JournalModal } from "../components/JournalModal";
import { HistoricalVideoModal } from "../components/HistoricalVideoModal";
import { PresenterModal } from "../components/PresenterModal";
import { ChoicePanel } from "../components/ChoicePanel";
import { KnowledgeBox } from "../components/KnowledgeBox";
import { CardsView } from "../components/CardsView";
import { TimelineView } from "../components/TimelineView";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { content } from "../content";
import { clearSave } from "./save";
import { start } from "./step";
import type { GameState } from "./types";

describe("Simulated Player: Full Button Monkey & UI Interactive Exploration", () => {
  beforeEach(() => {
    clearSave(true);
    window.history.pushState({}, "Test", "/");
  });

  // --------------------------------------------------------------------------
  // 1. MENU SCREEN BUTTONS
  // --------------------------------------------------------------------------
  it("PLAYER-BTN-01 Người chơi kiểm tra toàn bộ nút trên Màn hình chính (MenuScreen)", () => {
    const onStartNew = vi.fn();
    const onContinue = vi.fn();
    const onOpenCollection = vi.fn();
    const onToggleMute = vi.fn();
    const onSelectChapter = vi.fn();

    // Render MenuScreen khi đã từng hoàn thành game (hiện cả Chọn kỳ lịch sử)
    const { rerender } = render(
      <MenuScreen
        content={content}
        hasSave={true}
        onStartNew={onStartNew}
        onContinue={onContinue}
        onOpenCollection={onOpenCollection}
        isMuted={false}
        onToggleMute={onToggleMute}
        hasCompletedGame={true}
        onSelectChapter={onSelectChapter}
      />
    );

    // 1. Nút Bật/Tắt âm thanh
    const muteBtn = screen.getByTitle(/Bật\/Tắt âm thanh/i);
    expect(muteBtn).toBeInTheDocument();
    fireEvent.click(muteBtn);
    expect(onToggleMute).toHaveBeenCalledTimes(1);

    // 2. Nút Chơi tiếp
    const continueBtn = screen.getByRole("button", { name: /Chơi tiếp/i });
    expect(continueBtn).toBeInTheDocument();
    fireEvent.click(continueBtn);
    expect(onContinue).toHaveBeenCalledTimes(1);

    // 3. Nút Chơi lại từ đầu
    const restartBtn = screen.getByRole("button", { name: /Chơi lại từ đầu/i });
    expect(restartBtn).toBeInTheDocument();
    fireEvent.click(restartBtn);
    expect(onStartNew).toHaveBeenCalledTimes(1);

    // 4. Nút Bộ sưu tập tư liệu
    const collectionBtn = screen.getByRole("button", { name: /Bộ sưu tập tư liệu/i });
    expect(collectionBtn).toBeInTheDocument();
    fireEvent.click(collectionBtn);
    expect(onOpenCollection).toHaveBeenCalledTimes(1);

    // 5. Các nút Chọn kỳ lịch sử (Kỳ 0, Kỳ 1, Kỳ 2)
    const chapterButtons = content.chapters.map((ch) =>
      screen.getByRole("button", { name: new RegExp(ch.title, "i") })
    );
    expect(chapterButtons.length).toBe(3);
    fireEvent.click(chapterButtons[0]);
    expect(onSelectChapter).toHaveBeenCalledWith(content.chapters[0].scenes[0]);
    fireEvent.click(chapterButtons[1]);
    expect(onSelectChapter).toHaveBeenCalledWith(content.chapters[1].scenes[0]);
    fireEvent.click(chapterButtons[2]);
    expect(onSelectChapter).toHaveBeenCalledWith(content.chapters[2].scenes[0]);

    // 6. Test trạng thái khi chưa có save -> Nút Bắt đầu hành trình
    rerender(
      <MenuScreen
        content={content}
        hasSave={false}
        onStartNew={onStartNew}
        onContinue={onContinue}
        onOpenCollection={onOpenCollection}
        isMuted={true}
        onToggleMute={onToggleMute}
        hasCompletedGame={false}
      />
    );
    const startNewBtn = screen.getByRole("button", { name: /Bắt đầu hành trình/i });
    expect(startNewBtn).toBeInTheDocument();
    fireEvent.click(startNewBtn);
    expect(onStartNew).toHaveBeenCalledTimes(2);
  });

  // --------------------------------------------------------------------------
  // 2. COLLECTION SCREEN BUTTONS
  // --------------------------------------------------------------------------
  it("PLAYER-BTN-02 Người chơi kiểm tra toàn bộ nút trên Màn hình Bộ sưu tập (CollectionScreen)", () => {
    const onBack = vi.fn();
    const unlockedAll = content.collectibles.map((c) => c.id);

    render(
      <CollectionScreen
        content={content}
        unlockedIds={unlockedAll}
        onBack={onBack}
      />
    );

    // Nút Trở lại
    const backBtn = screen.getByRole("button", { name: /Trở lại/i });
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(onBack).toHaveBeenCalledTimes(1);

    // Người chơi nhấp qua từng tư liệu trong danh sách 8 tư liệu
    for (const item of content.collectibles) {
      const itemBtn = screen.getAllByText(item.title)[0];
      expect(itemBtn).toBeInTheDocument();
      fireEvent.click(itemBtn);
      // Kiểm tra chi tiết tư liệu đã cập nhật tương ứng
      expect(screen.getAllByText(item.title).length).toBeGreaterThan(0);
    }
  });

  // --------------------------------------------------------------------------
  // 3. SETTINGS MODAL BUTTONS & TABS
  // --------------------------------------------------------------------------
  it("PLAYER-BTN-03 Người chơi kiểm tra toàn bộ nút trên Hộp thoại Cài đặt (SettingsModal)", () => {
    const onClose = vi.fn();
    const onUpdateSettings = vi.fn();
    const onSaveSlot = vi.fn();
    const onLoadSlot = vi.fn();

    const mockSettings: SettingsConfig = {
      textSpeed: "normal",
      bgmVolume: 0.8,
      sfxVolume: 0.8,
      autoPlay: false,
      skipRead: false,
      showCitations: true
    };

    render(
      <SettingsModal
        settings={mockSettings}
        onUpdateSettings={onUpdateSettings}
        onClose={onClose}
        onSaveSlot={onSaveSlot}
        onLoadSlot={onLoadSlot}
      />
    );

    // 1. Nút Đóng (✕)
    const closeIconBtn = screen.getByTitle(/Đóng \(ESC\)/i);
    fireEvent.click(closeIconBtn);
    expect(onClose).toHaveBeenCalledTimes(1);

    // 2. Chuyển tab giữa "Tùy chọn âm thanh & Chữ" và "3 Ô lưu tiến trình"
    const savesTabBtn = screen.getByRole("button", { name: /3 Ô lưu tiến trình/i });
    const settingsTabBtn = screen.getByRole("button", { name: /Tùy chọn âm thanh/i });
    fireEvent.click(savesTabBtn);
    expect(screen.getAllByText(/Ô lưu #/i).length).toBe(3);
    fireEvent.click(settingsTabBtn);

    // 3. 4 Nút Tốc độ xuất hiện chữ (Chậm, Chuẩn, Nhanh, Tức thì)
    const speedSlow = screen.getByRole("button", { name: "Chậm" });
    const speedNormal = screen.getByRole("button", { name: "Chuẩn" });
    const speedFast = screen.getByRole("button", { name: "Nhanh" });
    const speedInstant = screen.getByRole("button", { name: "Tức thì" });

    fireEvent.click(speedSlow);
    expect(onUpdateSettings).toHaveBeenCalled();
    fireEvent.click(speedNormal);
    expect(onUpdateSettings).toHaveBeenCalled();
    fireEvent.click(speedFast);
    expect(onUpdateSettings).toHaveBeenCalled();
    fireEvent.click(speedInstant);
    expect(onUpdateSettings).toHaveBeenCalled();

    // 4. Các nút checkbox trợ năng
    const autoPlayCheckbox = screen.getByLabelText(/Tự chạy/i);
    fireEvent.click(autoPlayCheckbox);
    expect(onUpdateSettings).toHaveBeenCalled();

    const skipReadCheckbox = screen.getByLabelText(/Bỏ qua nhanh/i);
    fireEvent.click(skipReadCheckbox);
    expect(onUpdateSettings).toHaveBeenCalled();

    // 5. Nút Lưu ở tab 3 Ô lưu tiến trình
    fireEvent.click(savesTabBtn);
    const saveSlot1Btn = screen.getAllByRole("button", { name: /Lưu vào ô/i })[0];
    expect(saveSlot1Btn).toBeInTheDocument();
    fireEvent.click(saveSlot1Btn);
    expect(onSaveSlot).toHaveBeenCalledWith(1);

    // 6. Nút Đóng chân trang
    const footerCloseBtn = screen.getByRole("button", { name: "Đóng" });
    fireEvent.click(footerCloseBtn);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  // --------------------------------------------------------------------------
  // 4. LOG MODAL, JOURNAL MODAL, VIDEO MODAL, PRESENTER MODAL BUTTONS
  // --------------------------------------------------------------------------
  it("PLAYER-BTN-04 Người chơi kiểm tra toàn bộ nút trên các Hộp thoại phụ (Log, Journal, Video, Presenter)", () => {
    // 1. LogModal
    const onLogClose = vi.fn();
    const { unmount: unmountLog } = render(
      <LogModal
        log={[{ speaker: "Minh", text: "Thử nghiệm lời thoại" }]}
        onClose={onLogClose}
      />
    );
    const logCloseX = screen.getByRole("button", { name: "✕" });
    fireEvent.click(logCloseX);
    expect(onLogClose).toHaveBeenCalledTimes(1);
    const logCloseFooter = screen.getByRole("button", { name: /Đóng \(Esc\)/i });
    fireEvent.click(logCloseFooter);
    expect(onLogClose).toHaveBeenCalledTimes(2);
    unmountLog();

    // 2. JournalModal
    const onJournalClose = vi.fn();
    const onJournalProceed = vi.fn();
    const { unmount: unmountJournal } = render(
      <JournalModal
        journals={content.journal || []}
        currentChapterId="k0"
        isOpen={true}
        onClose={onJournalClose}
        onProceed={onJournalProceed}
        isEndOfChapter={false}
      />
    );
    // Nhấp qua các tab K0, K1, K2
    const tabK0 = screen.getByRole("button", { name: "K0" });
    const tabK1 = screen.getByRole("button", { name: "K1" });
    const tabK2 = screen.getByRole("button", { name: "K2" });
    fireEvent.click(tabK1);
    fireEvent.click(tabK2);
    fireEvent.click(tabK0);
    // Đóng bằng nút chân trang
    const journalCloseFooter = screen.getByRole("button", { name: /Đóng nhật ký/i });
    fireEvent.click(journalCloseFooter);
    expect(onJournalClose).toHaveBeenCalledTimes(1);
    unmountJournal();

    // 3. HistoricalVideoModal
    const onVideoClose = vi.fn();
    const testVideo = content.videos![0];
    const { unmount: unmountVideo } = render(
      <HistoricalVideoModal video={testVideo} onClose={onVideoClose} />
    );
    // Nút Play / Pause
    const playPauseBtn = screen.getByRole("button", { name: /Tạm dừng|Phát tiếp/i });
    fireEvent.click(playPauseBtn);
    // Nút Tốc độ chiếu (16fps / 24fps)
    const fpsBtn = screen.getByRole("button", { name: /16fps|24fps/i });
    fireEvent.click(fpsBtn);
    // Nút Đóng (✕)
    const videoCloseBtn = screen.getByTitle(/Đóng \(ESC\)/i);
    fireEvent.click(videoCloseBtn);
    expect(onVideoClose).toHaveBeenCalledTimes(1);
    unmountVideo();

    // 4. PresenterModal
    const onPresenterClose = vi.fn();
    const onPresenterJump = vi.fn();
    const { unmount: unmountPresenter } = render(
      <PresenterModal
        isOpen={true}
        onClose={onPresenterClose}
        onJump={onPresenterJump}
        currentSceneId="k0-c1"
      />
    );
    // Nút chọn mốc trình chiếu
    const milestoneItemBtn = screen.getByText("1. Bến cảng Sài Gòn (1911)");
    fireEvent.click(milestoneItemBtn);
    expect(onPresenterJump).toHaveBeenCalledWith("k0-c1");
    // Nút Đóng chân trang
    const presenterFooterClose = screen.getByRole("button", { name: /Đóng \(Esc\)/i });
    fireEvent.click(presenterFooterClose);
    expect(onPresenterClose).toHaveBeenCalled();
    unmountPresenter();
  });

  // --------------------------------------------------------------------------
  // 5. SCENE SCREEN HEADER BUTTONS & CANVAS CONTROLS (IN LIVE APP)
  // --------------------------------------------------------------------------
  it("PLAYER-BTN-05 Người chơi bấm toàn bộ nút trên Header và Stage của SceneScreen trong Live App", () => {
    render(<App />);

    // Bắt đầu game từ Menu
    const startBtn = screen.getByText(/Bắt đầu hành trình/i);
    fireEvent.click(startBtn);

    // Xác nhận đã vào SceneScreen (k0-c1 có video và hotspots)
    expect(screen.getByText(/HÀNH TRÌNH ĐỎ/i)).toBeInTheDocument();

    // 1. Header: Nút Phim tư liệu (🎞️)
    const videoHeaderBtn = screen.getByTitle(/Xem thước phim tư liệu lịch sử/i);
    expect(videoHeaderBtn).toBeInTheDocument();
    fireEvent.click(videoHeaderBtn);
    expect(screen.getAllByText(/Tàu viễn dương & Cảng Marseille 1911/i).length).toBeGreaterThan(0);
    // Đóng video modal
    const closeVideo = screen.getByTitle(/Đóng \(ESC\)/i);
    fireEvent.click(closeVideo);

    // 2. Header: Nút Bật/Tắt điểm khám phá Hotspots (🔍)
    const hotspotHeaderBtn = screen.getByTitle(/Bật\/Tắt điểm khám phá bối cảnh/i);
    expect(hotspotHeaderBtn).toBeInTheDocument();
    fireEvent.click(hotspotHeaderBtn); // Tắt
    fireEvent.click(hotspotHeaderBtn); // Bật lại

    // Khám phá điểm sáng Hotspot trên màn hình
    const hotspotPin = screen.getAllByTitle(/Khám phá:/i)[0];
    expect(hotspotPin).toBeInTheDocument();
    fireEvent.click(hotspotPin);
    // Hộp thoại Hotspot bật lên -> Bấm "Đã ghi nhận (Esc)" để đóng
    const dismissHotspotBtn = screen.getByRole("button", { name: /Đã ghi nhận \(Esc\)/i });
    fireEvent.click(dismissHotspotBtn);

    // 3. Header: Nút Ẩn UI (👁️) & các nút Canvas Zoom
    const hideUiBtn = screen.getByTitle(/Ẩn giao diện ngắm tranh bối cảnh/i);
    fireEvent.click(hideUiBtn);
    // Khi đang ẩn UI, xuất hiện các nút điều khiển góc nhìn Canvas
    const zoomInBtn = screen.getByTitle(/Phóng to/i);
    const zoomOutBtn = screen.getByTitle(/Thu nhỏ/i);
    const resetZoomBtn = screen.getByTitle(/Đặt lại góc nhìn/i);
    const showUiBtn = screen.getByTitle(/Hiện lại giao diện/i);

    fireEvent.click(zoomInBtn);
    fireEvent.click(zoomOutBtn);
    fireEvent.click(resetZoomBtn);
    fireEvent.click(showUiBtn); // Trở lại giao diện bình thường

    // 4. Header: Nút Lời thoại (📜)
    const logHeaderBtn = screen.getByTitle(/Xem lại lời thoại/i);
    fireEvent.click(logHeaderBtn);
    expect(screen.getAllByText(/Xem lại lời thoại/i).length).toBeGreaterThan(0);
    const closeLogBtn = screen.getByRole("button", { name: /Đóng \(Esc\)/i });
    fireEvent.click(closeLogBtn);

    // 5. Header: Nút Nhật ký (📖)
    const journalHeaderBtn = screen.getByTitle(/Nhật ký của Minh/i);
    fireEvent.click(journalHeaderBtn);
    expect(screen.getAllByText(/Nhật ký của Minh/i).length).toBeGreaterThan(0);
    const closeJournalBtn = screen.getByRole("button", { name: /Đóng nhật ký/i });
    fireEvent.click(closeJournalBtn);

    // 6. Header: Nút Tư liệu (🏛️)
    const collectionHeaderBtn = screen.getByTitle(/Bộ sưu tập tư liệu/i);
    fireEvent.click(collectionHeaderBtn);
    expect(screen.getAllByText(/Bộ Sưu Tập Tư Liệu Lịch Sử/i).length).toBeGreaterThan(0);
    // Quay lại cảnh chơi từ Collection
    const backFromColl = screen.getByRole("button", { name: /Trở lại/i });
    fireEvent.click(backFromColl);

    // 7. Header: Nút Bật/Tắt âm thanh (🔊/🔇)
    const muteHeaderBtn = screen.getByTitle(/Bật\/Tắt âm thanh \(M\)/i);
    fireEvent.click(muteHeaderBtn);

    // 8. Header: Nút Cài đặt (⚙️)
    const settingsHeaderBtn = screen.getByTitle(/Cài đặt & Trợ năng/i);
    fireEvent.click(settingsHeaderBtn);
    expect(screen.getAllByText(/Cài đặt Trải nghiệm & Trợ năng/i).length).toBeGreaterThan(0);
    const closeSettingsBtn = screen.getByTitle(/Đóng \(ESC\)/i);
    fireEvent.click(closeSettingsBtn);

    // 9. Header: Nút Diễn giả (🎤)
    const presenterHeaderBtn = screen.getByTitle(/Bảng điều khiển diễn giả/i);
    fireEvent.click(presenterHeaderBtn);
    expect(screen.getByText(/Bảng điều khiển diễn giả \(Phím P\)/i)).toBeInTheDocument();
    const closePresenterBtn = screen.getByRole("button", { name: /Đóng \(Esc\)/i });
    fireEvent.click(closePresenterBtn);

    // 10. Nút Nhảy cảnh góc phải dưới màn hình (⚡ Cảnh Ctrl+P)
    const quickJumperPill = screen.getByTitle(/Trình chiếu: Nhảy nhanh tới cảnh/i);
    fireEvent.click(quickJumperPill);
    expect(screen.getByText(/Chế độ Trình chiếu: Chọn cảnh giảng dạy/i)).toBeInTheDocument();
    const closeJumperBtn = screen.getByRole("button", { name: "✕" });
    fireEvent.click(closeJumperBtn);

    // 11. Các nút diễn hoạt: Auto (▶ Auto) và Skip (⏩ Bỏ qua)
    const autoBtn = screen.getByTitle(/Tự động chạy lời thoại/i);
    fireEvent.click(autoBtn); // Bật
    expect(screen.getByText(/Tắt Auto/i)).toBeInTheDocument();
    fireEvent.click(autoBtn); // Tắt lại

    const skipBtn = screen.getByTitle(/Bỏ qua các đoạn đã đọc/i);
    fireEvent.click(skipBtn); // Bật
    expect(screen.getByText(/Dừng Skip/i)).toBeInTheDocument();
    fireEvent.click(skipBtn); // Tắt lại

    // 12. Tiến 1 bước thoại rồi thử nút Lùi lại (⏮ Lùi)
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    });
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
    });
    const rewindBtn = screen.getByTitle(/Lùi lại một câu thoại/i);
    expect(rewindBtn).toBeInTheDocument();
    fireEvent.click(rewindBtn);

    // 13. Header: Nút Menu -> Quay lại Menu và Chơi tiếp
    const menuBtn = screen.getByRole("button", { name: "Menu" });
    fireEvent.click(menuBtn);
    expect(screen.getByText(/Hành Trình Đỏ/i)).toBeInTheDocument();
    const continueGameBtn = screen.getByRole("button", { name: /Chơi tiếp/i });
    fireEvent.click(continueGameBtn);
    expect(screen.getByText(/HÀNH TRÌNH ĐỎ/i)).toBeInTheDocument();
  }, 15000);

  // --------------------------------------------------------------------------
  // 6. QUIZ SCREEN BUTTONS
  // --------------------------------------------------------------------------
  it("PLAYER-BTN-06 Người chơi kiểm tra toàn bộ nút trên Màn hình Củng cố kiến thức (QuizScreen)", () => {
    const onFinishQuiz = vi.fn();
    const onReturnMenu = vi.fn();
    const onReplayScene = vi.fn();

    render(
      <QuizScreen
        content={content}
        onFinishQuiz={onFinishQuiz}
        onReturnMenu={onReturnMenu}
        onReplayScene={onReplayScene}
      />
    );

    // 1. Nút Menu thoát Quiz
    const menuBtn = screen.getByRole("button", { name: "Menu" });
    expect(menuBtn).toBeInTheDocument();
    fireEvent.click(menuBtn);
    expect(onReturnMenu).toHaveBeenCalledTimes(1);

    // 2. Trả lời câu 1: Multiple choice
    const q1 = content.quiz[0];
    const q1AnswerBtn = screen.getByText(q1.answer!);
    fireEvent.click(q1AnswerBtn);

    const submitBtn = screen.getByRole("button", { name: /Trả lời/i });
    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);

    // Nút Câu tiếp theo
    const nextBtn = screen.getByRole("button", { name: /Câu tiếp theo/i });
    expect(nextBtn).toBeInTheDocument();
    fireEvent.click(nextBtn);

    // Xác nhận đã chuyển sang câu 2 thành công
    expect(screen.getByText(/Câu hỏi 2/i)).toBeInTheDocument();
  });

  // --------------------------------------------------------------------------
  // 7. SUMMARY SCREEN BUTTONS & FLOWCHART
  // --------------------------------------------------------------------------
  it("PLAYER-BTN-07 Người chơi kiểm tra toàn bộ nút trên Màn hình Tổng kết (SummaryScreen)", () => {
    const onRestart = vi.fn();
    const onOpenCollection = vi.fn();
    const onReturnMenu = vi.fn();
    const onReplayScene = vi.fn();

    const mockState: GameState = {
      ...start(content),
      screen: "summary",
      choiceScores: {
        "k0-l1": "dung_ngay",
        "k0-l2": "dung_ngay",
        "k1-l1": "dung_ngay",
        "k1-l2": "dung_ngay",
        "k2-l1": "dung_ngay",
        "k2-l2": "dung_ngay",
        "k2-l3": "dung_ngay"
      },
      choiceAttempts: {
        "k0-l1": 2 // Thử lại 2 lần để gợi ý ôn tập xuất hiện
      },
      flags: {
        "k1-l-doi-tu:A": true,
        "k0-l1:A": true
      },
      quizAnswers: { q1: true, q2: true, q3: true, q4: true, q5: true, q6: true }
    };

    render(
      <SummaryScreen
        content={content}
        state={mockState}
        onRestart={onRestart}
        onOpenCollection={onOpenCollection}
        onReturnMenu={onReturnMenu}
        onReplayScene={onReplayScene}
      />
    );

    // 1. Nút Gợi ý củng cố lịch sử: "Ôn lại cảnh này ➔"
    const reviewReplayBtn = screen.getByRole("button", { name: /Ôn lại cảnh này ➔/i });
    expect(reviewReplayBtn).toBeInTheDocument();
    fireEvent.click(reviewReplayBtn);
    expect(onReplayScene).toHaveBeenCalledWith("k0-c1");

    // 2. Nút Mở / Đóng Sơ đồ ngã rẽ lịch sử (Flowchart)
    const flowchartToggleBtn = screen.getByRole("button", { name: /Sơ đồ các ngã rẽ lịch sử/i });
    expect(flowchartToggleBtn).toBeInTheDocument();
    fireEvent.click(flowchartToggleBtn); // Mở
    expect(screen.getByText(/Xem lại 7 quyết định lịch sử/i)).toBeInTheDocument();

    // Các nút "Xem lại cảnh ➔" bên trong Flowchart
    const replayInFlowchart = screen.getAllByRole("button", { name: /Xem lại cảnh ➔/i });
    expect(replayInFlowchart.length).toBeGreaterThan(0);
    fireEvent.click(replayInFlowchart[0]);
    expect(onReplayScene).toHaveBeenCalled();

    // Đóng Flowchart
    fireEvent.click(flowchartToggleBtn);

    // 3. Nút Chơi lại từ đầu
    const restartBtn = screen.getByRole("button", { name: /Chơi lại từ đầu/i });
    fireEvent.click(restartBtn);
    expect(onRestart).toHaveBeenCalledTimes(1);

    // 4. Nút Bộ sưu tập tư liệu
    const collBtn = screen.getByRole("button", { name: /Bộ sưu tập tư liệu/i });
    fireEvent.click(collBtn);
    expect(onOpenCollection).toHaveBeenCalledTimes(1);

    // 5. Nút Về Menu
    const returnMenuBtn = screen.getByRole("button", { name: /Về Menu/i });
    fireEvent.click(returnMenuBtn);
    expect(onReturnMenu).toHaveBeenCalledTimes(1);
  });

  // --------------------------------------------------------------------------
  // 8. ERROR BOUNDARY FALLBACK BUTTONS
  // --------------------------------------------------------------------------
  it("PLAYER-BTN-08 Người chơi kiểm tra các nút khôi phục sự cố trên ErrorBoundary", () => {
    // Component ném lỗi có chủ đích để kích hoạt màn hình bắt lỗi
    const CrashingComponent = () => {
      throw new Error("Lỗi mô phỏng kiểm thử giao diện");
    };

    // Tắt tạm log lỗi console của ErrorBoundary để sạch test output
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <CrashingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Đã xảy ra sự cố hiển thị/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tải lại trang/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Khôi phục & Chơi lại/i })).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  // --------------------------------------------------------------------------
  // 9. IN-SCENE CHOICE, KNOWLEDGE, CARDS & TIMELINE BUTTONS
  // --------------------------------------------------------------------------
  it("PLAYER-BTN-09 Người chơi kiểm tra toàn bộ nút trên ChoicePanel, KnowledgeBox, CardsView và TimelineView", () => {
    // 1. ChoicePanel
    const onChoose = vi.fn();
    const mockChoiceNode = {
      prompt: "Lựa chọn hướng đi",
      options: [
        { key: "A" as const, text: "Phương án A", correct: true, nodes: [] },
        { key: "B" as const, text: "Phương án B", correct: false, nodes: [] }
      ]
    };
    const { unmount: unmountChoice } = render(
      <ChoicePanel
        prompt={mockChoiceNode.prompt}
        options={mockChoiceNode.options}
        onSelect={onChoose}
      />
    );
    const optionABtn = screen.getByRole("button", { name: /Phương án A/i });
    const optionBBtn = screen.getByRole("button", { name: /Phương án B/i });
    expect(optionABtn).toBeInTheDocument();
    expect(optionBBtn).toBeInTheDocument();
    fireEvent.click(optionABtn);
    expect(onChoose).toHaveBeenCalledWith("A");
    unmountChoice();

    // Kiểm tra bấm lựa chọn B (render mới để tránh UI-02 double-click debounce 500ms)
    const onChooseB = vi.fn();
    const { unmount: unmountChoiceB } = render(
      <ChoicePanel
        prompt={mockChoiceNode.prompt}
        options={mockChoiceNode.options}
        onSelect={onChooseB}
      />
    );
    const optionBBtn2 = screen.getByRole("button", { name: /Phương án B/i });
    fireEvent.click(optionBBtn2);
    expect(onChooseB).toHaveBeenCalledWith("B");
    unmountChoiceB();

    // 2. KnowledgeBox
    const onProceed = vi.fn();
    const mockKnowledgeNode = {
      title: "Hộp kiến thức lịch sử",
      text: "Nội dung kiến thức cốt lõi"
    };
    const { unmount: unmountKb } = render(
      <KnowledgeBox
        text={mockKnowledgeNode.text}
        title={mockKnowledgeNode.title}
        sources={[content.sources[0]]}
        initialCountdown={0}
        onContinue={onProceed}
      />
    );
    const kbProceedBtn = screen.getByRole("button", { name: /Hiểu rồi/i });
    expect(kbProceedBtn).toBeInTheDocument();
    expect(kbProceedBtn).not.toBeDisabled();
    fireEvent.click(kbProceedBtn);
    expect(onProceed).toHaveBeenCalledTimes(1);
    unmountKb();

    // 3. CardsView
    const onCardsNext = vi.fn();
    const mockCards = [
      { title: "Thẻ 1", text: "Nội dung thẻ 1", source: "GT-49-RA-DI" },
      { title: "Thẻ 2", text: "Nội dung thẻ 2", source: "GT-49-RA-DI" }
    ];
    const { unmount: unmountCards } = render(
      <CardsView
        items={mockCards}
        sourcesMap={new Map()}
        onNext={onCardsNext}
      />
    );
    const tab2 = screen.getByRole("button", { name: "Thẻ 2" });
    fireEvent.click(tab2);
    expect(screen.getByText("Nội dung thẻ 2")).toBeInTheDocument();
    const cardStepBtn = screen.getByRole("button", { name: /Tiếp tục/i });
    fireEvent.click(cardStepBtn);
    expect(onCardsNext).toHaveBeenCalledTimes(1);
    unmountCards();

    // 4. TimelineView
    const onTimelineNext = vi.fn();
    const mockTimeline = [
      { date: "1911", text: "Khởi hành từ Bến Nhà Rồng" },
      { date: "1920", text: "Đại hội Tours" }
    ];
    const { unmount: unmountTimeline } = render(
      <TimelineView
        items={mockTimeline}
        onNext={onTimelineNext}
      />
    );
    const timelineNextBtn = screen.getByRole("button", { name: /Tiếp tục/i });
    expect(timelineNextBtn).toBeInTheDocument();
    fireEvent.click(timelineNextBtn);
    expect(onTimelineNext).toHaveBeenCalledTimes(1);
    unmountTimeline();
  });
});
