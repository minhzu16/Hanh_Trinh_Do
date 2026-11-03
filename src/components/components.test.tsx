import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { KnowledgeBox } from "./KnowledgeBox";
import { ChoicePanel } from "./ChoicePanel";
import { DialogBox } from "./DialogBox";
import { SpriteView } from "./SpriteView";
import { Header } from "./Header";
import { HistoricalVideoModal } from "./HistoricalVideoModal";
import { TimelineView } from "./TimelineView";
import { CardsView } from "./CardsView";
import { SettingsModal, type SettingsConfig } from "./SettingsModal";
import { SceneBackground } from "../art/sceneBackgrounds";
import { CgIllustration } from "../art/cgIllustrations";
import { HISTORICAL_VIDEOS } from "../art/historicalVideos";
import { App } from "../App";
import type { Source, Character, ChoiceOption } from "../engine/types";

describe("UI Components", () => {
  it("UI-01 Component test KnowledgeBox: Hiển thị nội dung kiến thức lịch sử đầy đủ và trang trọng, không có số trang giáo trình", () => {
    const mockSource: Source = {
      id: "GT-49-RA-DI",
      pages: "49–50",
      kind: "quote",
      text: "Ra đi tìm đường cứu nước"
    };

    render(
      <KnowledgeBox
        text="Nội dung kiến thức mẫu"
        sources={[mockSource]}
        onContinue={() => {}}
      />
    );

    expect(screen.getByText("Nội dung kiến thức mẫu")).toBeInTheDocument();
    expect(screen.queryByText(/Giáo trình/i)).toBeNull();
    expect(screen.queryByText(/tr\./i)).toBeNull();
    expect(screen.queryByText(/GT-/i)).toBeNull();
  });

  it("UI-02 ChoicePanel: Bấm 2 lần liên tiếp chỉ tính một lần", () => {
    const handleSelect = vi.fn();
    const options: ChoiceOption[] = [
      { key: "A", text: "Phương án A", correct: false, nodes: [] },
      { key: "B", text: "Phương án B", correct: false, nodes: [] },
      { key: "C", text: "Phương án C", correct: true, nodes: [] }
    ];

    render(
      <ChoicePanel
        prompt="Câu hỏi lựa chọn"
        options={options}
        onSelect={handleSelect}
      />
    );

    const btnA = screen.getByText("Phương án A");
    fireEvent.click(btnA);
    fireEvent.click(btnA);

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("UI-03 Câu thoại nguyen-ai-quoc: Hiển thị chính xác tên nhân vật và nội dung, không lộ số trang và mã đối chứng trên giao diện", () => {
    const mockSpeaker: Character = {
      id: "nguyen-ai-quoc",
      name: "Nguyễn Ái Quốc",
      kind: "historical",
      description: "Lãnh tụ",
      sprites: ["binh-thuong"]
    };

    const mockSource: Source = {
      id: "GT-61-BAO-CAO",
      pages: "61",
      kind: "quote",
      text: "Chúng tôi họp vào ngày mồng 6/1..."
    };

    render(
      <DialogBox
        speaker={mockSpeaker}
        speakerId="nguyen-ai-quoc"
        source={mockSource}
        text="Chúng tôi họp vào ngày mồng 6/1..."
        onNext={() => {}}
        instant={true}
      />
    );

    expect(screen.getByText("Chúng tôi họp vào ngày mồng 6/1...")).toBeInTheDocument();
    expect(screen.getByText("Nguyễn Ái Quốc")).toBeInTheDocument();
    expect(screen.queryByText(/tr\. 61/i)).toBeNull();
    expect(screen.queryByText(/GT-61/i)).toBeNull();
    expect(screen.queryByText(/Giáo trình/i)).toBeNull();
  });

  it("UI-03b DialogBox khi độc thoại nội tâm: Hiện bảng tên Minh (Nội tâm)", () => {
    render(
      <DialogBox
        text="Ta phải tìm một con đường mới..."
        isThought={true}
        onNext={() => {}}
        instant={true}
      />
    );

    expect(screen.getByText("Minh (Nội tâm)")).toBeInTheDocument();
    expect(screen.getByText(/Ta phải tìm một con đường mới/i)).toBeInTheDocument();
  });

  it("DEP-04 Mở ?canh=k2-c2: Vào thẳng cảnh Chánh cương", () => {
    window.history.pushState({}, "Test", "?canh=k2-c2");
    render(<App />);
    expect(screen.getAllByText("Bản Chánh cương: kẻ thù nào trước?").length).toBeGreaterThan(0);
  });

  it("UI-05 SpriteView: Hiển thị đầy đủ sprite đứng và nhãn nhân vật lịch sử", () => {
    const mockSpeaker: Character = {
      id: "nguyen-ai-quoc",
      name: "Nguyễn Ái Quốc",
      kind: "historical",
      description: "Lãnh tụ",
      sprites: ["binh-thuong"]
    };

    render(
      <SpriteView
        speaker={mockSpeaker}
        speakerId="nguyen-ai-quoc"
        chapterId="k0"
        sceneId="k0-c1"
      />
    );

    expect(screen.getByText("Nguyễn Ái Quốc")).toBeInTheDocument();
    expect(screen.getByText("Lịch sử")).toBeInTheDocument();
  });

  it("A-05 Component test SpriteView với 3 biểu cảm: binh-thuong, lo-lang, quyet-tam ra 3 hình khác nhau (P12)", () => {
    const mockMinh: Character = {
      id: "minh",
      name: "Minh",
      kind: "fictional",
      description: "Nhân vật chính",
      sprites: ["binh-thuong", "vui", "lo-lang", "quyet-tam"]
    };

    const { container: c1 } = render(
      <SpriteView speaker={mockMinh} speakerId="minh" expression="binh-thuong" />
    );
    expect(c1.querySelector('[data-testid="expr-binh-thuong"]')).not.toBeNull();

    const { container: c2 } = render(
      <SpriteView speaker={mockMinh} speakerId="minh" expression="lo-lang" />
    );
    expect(c2.querySelector('[data-testid="expr-lo-lang"]')).not.toBeNull();

    const { container: c3 } = render(
      <SpriteView speaker={mockMinh} speakerId="minh" expression="quyet-tam" />
    );
    expect(c3.querySelector('[data-testid="expr-quyet-tam"]')).not.toBeNull();

    // Cả 3 biểu cảm đều cho SVG khác nhau
    expect(c1.innerHTML).not.toEqual(c2.innerHTML);
    expect(c2.innerHTML).not.toEqual(c3.innerHTML);
    expect(c1.innerHTML).not.toEqual(c3.innerHTML);
  });

  it("UI-06 Minh hoạ vector: SceneBackground và CgIllustration render chuẩn xác", () => {
    const { container: bgContainer } = render(<SceneBackground bgId="bg-boong-tau-dem" />);
    expect(bgContainer.querySelector("svg")).not.toBeNull();

    const { container: cgContainer } = render(<CgIllustration assetId="cg-con-thuyen" />);
    expect(cgContainer.querySelector("svg")).not.toBeNull();
  });

  it("UI-07 Tương tác DialogBox: Bấm vào hộp thoại để tiếp tục mạch truyện", () => {
    const mockSpeaker: Character = {
      id: "nguyen-ai-quoc",
      name: "Nguyễn Ái Quốc",
      kind: "historical",
      description: "Lãnh tụ",
      sprites: ["binh-thuong"]
    };

    const handleNext = vi.fn();

    render(
      <DialogBox
        speaker={mockSpeaker}
        speakerId="nguyen-ai-quoc"
        text="Chúng tôi họp vào ngày mồng 6/1..."
        onNext={handleNext}
        instant={true}
      />
    );

    const dialogText = screen.getByText("Chúng tôi họp vào ngày mồng 6/1...");
    fireEvent.click(dialogText);

    expect(handleNext).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/Giáo trình/i)).toBeNull();
    expect(screen.queryByText(/Soi tư liệu gốc/i)).toBeNull();
  });

  it("UI-08 Tất cả 14 bối cảnh lịch sử trong SceneBackground render SVG thành công", () => {
    const allBgIds = [
      "bg-boong-tau-dem",
      "bg-phong-tro-paris",
      "bg-quan-ca-phe",
      "bg-hoi-truong-tours",
      "bg-ga-paris-tuyet",
      "bg-ban-do-hanh-trinh",
      "bg-lop-hoc-van-minh",
      "bg-lop-hoc-chieu",
      "bg-xuong-may",
      "bg-pho-kham-thien-dem",
      "bg-ben-cang-hong-kong",
      "bg-goc-phong-den-dau",
      "bg-phong-rang-sang",
      "bg-boong-tau-binh-minh"
    ];

    for (const bgId of allBgIds) {
      const { container } = render(<SceneBackground bgId={bgId} />);
      const svg = container.querySelector("svg");
      expect(svg).not.toBeNull();
      expect(svg?.getAttribute("viewBox")).toBe("0 0 1920 1080");
    }
  });

  it("UI-09 HistoricalVideoModal: Render tư liệu lịch sử, điều chỉnh tốc độ khung hình và đóng modal", () => {
    const video = HISTORICAL_VIDEOS["k0-c4"];
    expect(video).toBeDefined();

    const handleClose = vi.fn();
    render(<HistoricalVideoModal video={video} onClose={handleClose} />);

    // Kiểm tra thông tin phim Tours 1920
    expect(screen.getByText(/MINH HOẠ TÁI HIỆN LỊCH SỬ 12\/1920/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Minh hoạ bối cảnh: Nguyễn Ái Quốc tại Đại hội Tours 1920/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Bối cảnh Đại hội Tours/i)).toBeInTheDocument();
    expect(screen.queryByText(/Giáo trình/i)).toBeNull();

    // Kiểm tra nút chuyển tốc độ máy quay (16fps -> 24fps)
    const speedBtn = screen.getByTitle(/Tốc độ máy quay phim câm thời kỳ 1920/i);
    expect(speedBtn).toHaveTextContent("Tốc độ: 16fps");
    fireEvent.click(speedBtn);
    expect(speedBtn).toHaveTextContent("Tốc độ: 24fps");

    // Kiểm tra nút đóng
    const closeBtn = screen.getByTitle("Đóng (ESC)");
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("UI-10 Header: Hiện nút Phim tư liệu khi cảnh có video và kích hoạt onOpenVideo", () => {
    const handleOpenVideo = vi.fn();
    const { rerender } = render(
      <Header
        isMuted={false}
        onToggleMute={() => {}}
        hasVideo={false}
      />
    );

    // Khi hasVideo = false thì không có nút Phim tư liệu
    expect(screen.queryByText(/Phim tư liệu/i)).toBeNull();

    // Rerender với hasVideo = true
    rerender(
      <Header
        isMuted={false}
        onToggleMute={() => {}}
        hasVideo={true}
        onOpenVideo={handleOpenVideo}
      />
    );

    const videoBtn = screen.getByTitle(/Xem thước phim tư liệu lịch sử \(V\)/i);
    expect(videoBtn).toBeInTheDocument();
    fireEvent.click(videoBtn);
    expect(handleOpenVideo).toHaveBeenCalledTimes(1);
  });

  it("UI-11 TimelineView: Hiển thị các sự kiện theo dòng thời gian và ngày tháng", () => {
    const mockItems = [
      { date: "6/1/1930", text: "Khai mạc Hội nghị hợp nhất tại Cửu Long" },
      { date: "7/2/1930", text: "Bế mạc Hội nghị, thông qua Chánh cương và Sách lược vắn tắt" }
    ];
    const onNext = vi.fn();
    render(<TimelineView items={mockItems} onNext={onNext} />);

    expect(screen.getByText("6/1/1930")).toBeInTheDocument();
    expect(screen.getByText(/Khai mạc Hội nghị hợp nhất/i)).toBeInTheDocument();
    expect(screen.getByText("7/2/1930")).toBeInTheDocument();

    const continueBtn = screen.getByRole("button", { name: /Tiếp tục/i });
    fireEvent.click(continueBtn);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("UI-12 CardsView: Hiển thị các thẻ so sánh và cho phép chuyển tab", () => {
    const mockCards = [
      { title: "Đông Dương Cộng sản Đảng", text: "Thành lập 17/6/1929 tại Hà Nội", source: "GT-59-BA-TO-CHUC" },
      { title: "An Nam Cộng sản Đảng", text: "Thành lập mùa thu 1929 tại Nam Kỳ", source: "GT-60-DDCSLD" }
    ];
    const onNext = vi.fn();
    render(<CardsView items={mockCards} sourcesMap={new Map()} onNext={onNext} />);

    expect(screen.getByRole("button", { name: "Đông Dương Cộng sản Đảng" })).toBeInTheDocument();
    expect(screen.getByText(/Thành lập 17\/6\/1929/i)).toBeInTheDocument();

    // Chuyển sang tab thứ 2
    const tab2 = screen.getByRole("button", { name: "An Nam Cộng sản Đảng" });
    fireEvent.click(tab2);
    expect(screen.getByText(/Thành lập mùa thu 1929/i)).toBeInTheDocument();

    // Bấm nút tiếp tục
    const nextBtn = screen.getByRole("button", { name: /Tiếp tục/i });
    fireEvent.click(nextBtn);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("UI-13 SettingsModal: Hiển thị các thanh điều chỉnh âm lượng và phản hồi thay đổi", () => {
    const initialSettings: SettingsConfig = {
      textSpeed: "normal",
      bgmVolume: 0.6,
      sfxVolume: 0.5,
      autoPlay: false,
      skipRead: false,
      showCitations: false
    };
    const onUpdate = vi.fn();
    const onClose = vi.fn();

    render(
      <SettingsModal
        settings={initialSettings}
        onUpdateSettings={onUpdate}
        onClose={onClose}
      />
    );

    expect(screen.getByText("Cài đặt Trải nghiệm & Trợ năng")).toBeInTheDocument();
    expect(screen.getByText(/Âm lượng Nhạc nền \(BGM\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Âm lượng Hiệu ứng \(SFX\)/i)).toBeInTheDocument();

    // Bấm nút đóng modal
    const closeBtn = screen.getByTitle("Đóng (ESC)");
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("UI-14 SettingsModal: Nhấn phím Escape đóng modal cài đặt", () => {
    const onClose = vi.fn();
    render(
      <SettingsModal
        settings={{
          textSpeed: "normal",
          bgmVolume: 0.5,
          sfxVolume: 0.5,
          autoPlay: false,
          skipRead: false,
          showCitations: false
        }}
        onUpdateSettings={() => {}}
        onClose={onClose}
      />
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("UI-15 ChoicePanel: Nhấn phím tắt 1 hoặc A kích hoạt chọn phương án A", () => {
    const handleSelect = vi.fn();
    const options: ChoiceOption[] = [
      { key: "A", text: "Phương án số 1", correct: true, nodes: [] },
      { key: "B", text: "Phương án số 2", correct: false, nodes: [] }
    ];

    render(
      <ChoicePanel
        prompt="Câu hỏi phím tắt"
        options={options}
        onSelect={handleSelect}
      />
    );

    fireEvent.keyDown(window, { key: "1" });
    expect(handleSelect).toHaveBeenCalledWith("A");
  });

  it("UI-16 ChoicePanel: Nhấn phím tắt 2 hoặc B kích hoạt chọn phương án B", () => {
    const handleSelect = vi.fn();
    const options: ChoiceOption[] = [
      { key: "A", text: "Phương án số 1", correct: false, nodes: [] },
      { key: "B", text: "Phương án số 2", correct: true, nodes: [] }
    ];

    render(
      <ChoicePanel
        prompt="Câu hỏi phím tắt B"
        options={options}
        onSelect={handleSelect}
      />
    );

    fireEvent.keyDown(window, { key: "B" });
    expect(handleSelect).toHaveBeenCalledWith("B");
  });

  it("UI-17 KnowledgeBox: Hộp cảnh báo Lịch sử giả định hiển thị nhãn cảnh báo", () => {
    render(
      <KnowledgeBox
        text="Đây là kết quả của một ngã rẽ sai trong quá khứ"
        altHistoryBadge={true}
        onContinue={() => {}}
      />
    );

    expect(screen.getByText("⚠️ Lịch sử giả định")).toBeInTheDocument();
  });

  it("UI-18 KnowledgeBox: Bấm nút Tiếp tục gọi hàm onContinue sau khi hết thời gian đọc (F-06)", () => {
    vi.useFakeTimers();
    const onContinue = vi.fn();
    render(
      <KnowledgeBox
        text="Kiến thức lịch sử Đảng mẫu"
        onContinue={onContinue}
      />
    );

    // Tiến hết 3 giây countdown
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    const btn = screen.getByRole("button", { name: /Hiểu rồi/i });
    expect(btn).not.toBeDisabled();
    fireEvent.click(btn);
    expect(onContinue).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("UI-19 Header: Bấm nút loa chuyển đổi trạng thái âm thanh", () => {
    const onToggleMute = vi.fn();
    render(
      <Header
        isMuted={false}
        onToggleMute={onToggleMute}
        hasVideo={false}
      />
    );

    const muteBtn = screen.getByTitle(/Bật\/Tắt âm thanh \(M\)/i);
    fireEvent.click(muteBtn);
    expect(onToggleMute).toHaveBeenCalledTimes(1);
  });

  it("UI-20 DialogBox: Hiển thị đúng câu thoại và biểu tượng khi nhân vật nói", () => {
    const mockSpeaker: Character = {
      id: "lan",
      name: "Lan",
      kind: "fictional",
      description: "Nữ sinh",
      sprites: ["binh-thuong"]
    };

    render(
      <DialogBox
        speaker={mockSpeaker}
        speakerId="lan"
        text="Anh Minh ơi, chúng ta đi thôi!"
        onNext={() => {}}
        instant={true}
      />
    );

    expect(screen.getByText("Lan")).toBeInTheDocument();
    expect(screen.getByText("Anh Minh ơi, chúng ta đi thôi!")).toBeInTheDocument();
  });

  it("UI-21 KnowledgeBox: Khóa nút tiếp tục khi countdown > 0 và hiển thị thời gian còn lại (F-06)", () => {
    const onContinue = vi.fn();
    render(
      <KnowledgeBox
        text="Kiến thức có khóa thời gian"
        onContinue={onContinue}
        initialCountdown={3}
      />
    );

    expect(screen.getByText(/3s/i)).toBeInTheDocument();
    const btn = screen.getByRole("button", { name: /Hiểu rồi/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onContinue).not.toHaveBeenCalled();
  });

  it("UI-25 Component test: hai hộp kiến thức liền nhau thì hộp thứ hai vẫn khóa 3 giây (F-07)", () => {
    const ConsecutiveWithoutKey = ({ text }: { text: string }) => {
      return <KnowledgeBox text={text} onContinue={() => {}} initialCountdown={3} />;
    };
    const { rerender } = render(<ConsecutiveWithoutKey text="Nội dung hộp 1" />);
    expect(screen.getByText("Nội dung hộp 1")).toBeInTheDocument();
    expect(screen.getByText(/3s/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Hiểu rồi/i })).toBeDisabled();

    // Khi chuyển tiếp sang hộp kiến thức thứ 2, bộ đếm countdown lập tức tái lập và khóa tiếp
    rerender(<ConsecutiveWithoutKey text="Nội dung hộp 2" />);
    expect(screen.getByText("Nội dung hộp 2")).toBeInTheDocument();
    expect(screen.getByText(/3s/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Hiểu rồi/i })).toBeDisabled();
  });

  it("UI-24 KnowledgeBox: Bấm 'Hiểu rồi' trước khi hết 3 giây, không truyền initialCountdown (dùng fake timers): Không có tác dụng (F-06)", () => {
    vi.useFakeTimers();
    const onContinue = vi.fn();
    render(
      <KnowledgeBox
        text="Kiến thức lịch sử Đảng thử nghiệm fake timers"
        onContinue={onContinue}
      />
    );

    // Không truyền initialCountdown -> mặc định countdown = 3
    expect(screen.getByText(/3s/i)).toBeInTheDocument();
    const btn = screen.getByRole("button", { name: /Hiểu rồi/i });
    expect(btn).toBeDisabled();

    // Bấm nút trước khi hết giờ -> không kích hoạt onContinue
    fireEvent.click(btn);
    expect(onContinue).not.toHaveBeenCalled();

    // Tiến thêm 1 giây -> còn 2s
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/2s/i)).toBeInTheDocument();
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onContinue).not.toHaveBeenCalled();

    // Tiến nốt 2 giây -> hết giờ (0s)
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(btn).not.toBeDisabled();
    fireEvent.click(btn);
    expect(onContinue).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("A-07 CgIllustration: mọi mã cg dùng trong scenes.json đều có hình minh họa riêng, không rơi vào fallback (F-11)", () => {
    const cgAssetIds = [
      "cg-cang-bien-truc-xuat",
      "cg-chong-thue",
      "cg-to-yeu-sach",
      "cg-bao-nhan-dao",
      "cg-don-linh-dem",
      "cg-bang-den",
      "cg-con-thuyen",
      "cg-dam-dong-mua",
      "cg-ba-la-co",
      "cg-phong-cuu-long",
      "cg-truyen-don-trai-nguoc",
      "cg-lang-chia-re",
      "cg-vong-doan-ket",
      "cg-ba-la-co-nhap-mot"
    ];

    cgAssetIds.forEach((id) => {
      const { container } = render(<CgIllustration assetId={id} />);
      const svg = container.querySelector("svg");
      expect(svg).not.toBeNull();
      expect(screen.queryByText("Minh Họa Sự Kiện Lịch Sử")).toBeNull();
    });
  });
});
