import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { App } from "../App";
import { content } from "../content";
import { clearSave } from "./save";

describe("E2E Integration Test: Full Game Playthrough (DEP-05 & P8)", () => {
  beforeEach(() => {
    clearSave(true);
    window.history.pushState({}, "Test", "/");
  });

  it(
    "E2E-01 Người chơi chơi từ Menu -> Vượt qua 3 kỳ -> Trả lời Quiz -> Nhận danh hiệu tại màn Tổng kết",
    async () => {
    render(<App />);

    // 1. MÀN HÌNH CHÍNH (MENU)
    expect(screen.getByText(/Hành Trình Đỏ/i)).toBeInTheDocument();
    const startBtn = screen.getByText(/Bắt đầu hành trình/i);
    expect(startBtn).toBeInTheDocument();

    // Bắt đầu game
    fireEvent.click(startBtn);

    // 2. CHƠI XUYÊN SUỐT CÁC CẢNH (KỲ 0, KỲ 1, KỲ 2)
    let maxSteps = 400;
    while (maxSteps > 0) {
      maxSteps--;

      // Nếu đã sang màn Quiz thì dừng bước cảnh
      if (screen.queryByText(/Câu hỏi củng cố kiến thức/i)) {
        break;
      }

      // Xử lý 7 lựa chọn nếu ChoicePanel đang hiện
      const correctPatterns = [
        /Sang tận phương Tây/i,
        /Gia nhập Quốc tế Ba/i,
        /Công nông là gốc cách mạng/i,
        /đảng cách mạng vững vàng/i,
        /Bỏ mọi thành kiến/i,
        /Đánh đổ đế quốc Pháp/i,
        /Công nông là nòng cốt/i
      ];

      let choiceHandled = false;
      for (const pattern of correctPatterns) {
        const btn = screen.queryByRole("button", { name: pattern });
        if (btn) {
          fireEvent.click(btn);
          choiceHandled = true;
          break;
        }
      }
      if (choiceHandled) continue;

      // Nút Tiếp tục / Hiểu rồi của Hộp kiến thức hoặc Modal nhật ký
      const continueBtns = screen.queryAllByRole("button", { name: /Hiểu rồi|Tiếp tục/i });
      if (continueBtns.length > 0) {
        const activeBtn = continueBtns[continueBtns.length - 1];
        if (!activeBtn.hasAttribute("disabled")) {
          fireEvent.click(activeBtn);
          continue;
        }
      }

      // Mặc định: gõ Space để đi tiếp thoại / lời dẫn / CG
      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
      });
    }

    // 3. MÀN HÌNH QUIZ (Củng cố kiến thức)
    expect(screen.getByText(/Câu hỏi củng cố kiến thức/i)).toBeInTheDocument();

    // Trả lời lần lượt 6 câu hỏi Quiz
    for (let q = 0; q < content.quiz.length; q++) {
      const qData = content.quiz[q];

      // Tìm và click phương án đúng bằng chuỗi chính xác (không dùng RegExp vì có dấu ngoặc đơn)
      const optionBtn = screen.getByText(qData.answer);
      fireEvent.click(optionBtn);

      // Bấm nút Trả lời
      const confirmBtn = screen.getByRole("button", { name: /Trả lời/i });
      fireEvent.click(confirmBtn);

      // Bấm nút chuyển sang câu tiếp theo hoặc xem tổng kết
      const nextBtn = screen.getByRole("button", { name: /Câu tiếp theo|Xem Tổng Kết/i });
      fireEvent.click(nextBtn);
    }

    // 4. MÀN HÌNH TỔNG KẾT (SUMMARY)
    expect(screen.getByText(/Hành Trình Hoàn Thành/i)).toBeInTheDocument();
    expect(screen.getByText(/Người đi cùng lịch sử/i)).toBeInTheDocument();
    expect(screen.getByText("7 / 7")).toBeInTheDocument(); // 7/7 lựa chọn đúng ngay lần đầu
  }, 30000);
});
