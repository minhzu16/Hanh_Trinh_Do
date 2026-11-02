import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { KnowledgeBox } from "./KnowledgeBox";
import { ChoicePanel } from "./ChoicePanel";
import { DialogBox } from "./DialogBox";
import { SpriteView } from "./SpriteView";
import { SceneBackground } from "../art/sceneBackgrounds";
import { CgIllustration } from "../art/cgIllustrations";
import { App } from "../App";
import type { Source, Character, ChoiceOption } from "../engine/types";

describe("UI Components", () => {
  it("UI-01 Component test KnowledgeBox với nguồn GT-49-RA-DI: Hiện 'Giáo trình, tr. 49–50'", () => {
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

    expect(screen.getByText(/Giáo trình, tr\. 49–50/i)).toBeInTheDocument();
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

  it("UI-03 Câu thoại nguyen-ai-quoc: Có dòng số trang", () => {
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

    expect(screen.getByText(/tr\. 61/i)).toBeInTheDocument();
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
    expect(screen.getByText("Lãnh tụ Nguyễn Ái Quốc")).toBeInTheDocument();
  });

  it("UI-06 Minh hoạ vector: SceneBackground và CgIllustration render chuẩn xác", () => {
    const { container: bgContainer } = render(<SceneBackground bgId="bg-boong-tau-dem" />);
    expect(bgContainer.querySelector("svg")).not.toBeNull();

    const { container: cgContainer } = render(<CgIllustration assetId="cg-con-thuyen" />);
    expect(cgContainer.querySelector("svg")).not.toBeNull();
  });
});
