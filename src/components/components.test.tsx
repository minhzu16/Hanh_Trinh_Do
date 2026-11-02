import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { KnowledgeBox } from "./KnowledgeBox";
import { ChoicePanel } from "./ChoicePanel";
import { DialogBox } from "./DialogBox";
import { SpriteView } from "./SpriteView";
import { Header } from "./Header";
import { HistoricalVideoModal } from "./HistoricalVideoModal";
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
      />
    );

    expect(screen.getByText("Chúng tôi họp vào ngày mồng 6/1...")).toBeInTheDocument();
    expect(screen.getByText("Nguyễn Ái Quốc")).toBeInTheDocument();
    expect(screen.queryByText(/tr\. 61/i)).toBeNull();
    expect(screen.queryByText(/GT-61/i)).toBeNull();
    expect(screen.queryByText(/Giáo trình/i)).toBeNull();
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
});
