import { describe, it, expect } from "vitest";
import { content } from "../content";
import type { ChoiceNode, KnowledgeNode, LineNode } from "./types";

describe("Backend: Data Integrity & Schema Validation (DV)", () => {
  it("DV-01 Chapters: Có đúng 3 kỳ lịch sử (k0, k1, k2)", () => {
    expect(content.chapters.length).toBe(3);
    const ids = content.chapters.map((c) => c.id);
    expect(ids).toEqual(["k0", "k1", "k2"]);
  });

  it("DV-02 Chapters: Mỗi kỳ đều có title và danh sách scenes hợp lệ", () => {
    for (const ch of content.chapters) {
      expect(ch.title).toBeTruthy();
      expect(ch.scenes.length).toBeGreaterThan(0);
      for (const scId of ch.scenes) {
        const found = content.scenes.some((s) => s.id === scId);
        expect(found).toBe(true);
      }
    }
  });

  it("DV-03 Scenes: Tổng số cảnh trong toàn bộ game đúng bằng 15", () => {
    expect(content.scenes.length).toBe(15);
  });

  it("DV-04 Scenes: Tất cả mã ID của 15 cảnh là duy nhất", () => {
    const ids = content.scenes.map((s) => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("DV-05 Scenes: Mỗi cảnh đều có thuộc tính chapter khớp với chapters.json", () => {
    const chapterIds = new Set(content.chapters.map((c) => c.id));
    for (const sc of content.scenes) {
      expect(chapterIds.has(sc.chapter)).toBe(true);
    }
  });

  it("DV-06 Scenes: Mọi cảnh đều có bg (background) và title không rỗng", () => {
    for (const sc of content.scenes) {
      expect(sc.bg).toBeTruthy();
      expect(sc.title).toBeTruthy();
      expect(sc.bg.startsWith("bg-")).toBe(true);
    }
  });

  it("DV-07 Scenes: Các cảnh có chỉ định bgm đều có định dạng hợp lệ", () => {
    for (const sc of content.scenes) {
      if (sc.bgm) {
        expect(sc.bgm.startsWith("bgm-")).toBe(true);
      }
    }
  });

  it("DV-08 Choices: Toàn bộ game có đúng 7 nút lựa chọn mang tính bước ngoặt và 1 lựa chọn đời tư", () => {
    let historicalChoices = 0;
    let personalChoices = 0;
    for (const sc of content.scenes) {
      for (const node of sc.nodes) {
        if (node.type === "choice") {
          const c = node as ChoiceNode;
          if (c.kind === "personal") {
            personalChoices++;
          } else {
            historicalChoices++;
          }
        }
      }
    }
    expect(historicalChoices).toBe(7);
    expect(personalChoices).toBe(1);
  });

  it("DV-09 Choices: Các mã lựa chọn đúng chuẩn k0-l1..k2-l3 và k1-l-doi-tu", () => {
    const expectedHistoricalIds = ["k0-l1", "k0-l2", "k1-l1", "k1-l2", "k2-l1", "k2-l2", "k2-l3"];
    const historicalChoiceIds: string[] = [];
    const personalChoiceIds: string[] = [];
    for (const sc of content.scenes) {
      for (const node of sc.nodes) {
        if (node.type === "choice") {
          const c = node as ChoiceNode;
          if (c.kind === "personal") {
            personalChoiceIds.push(c.id);
          } else {
            historicalChoiceIds.push(c.id);
          }
        }
      }
    }
    expect(historicalChoiceIds).toEqual(expectedHistoricalIds);
    expect(personalChoiceIds).toEqual(["k1-l-doi-tu"]);
  });

  it("DV-10 Choices: Mỗi nút choice lịch sử có đúng 3 phương án A, B, C; lựa chọn đời tư có 2 phương án A, B", () => {
    for (const sc of content.scenes) {
      for (const node of sc.nodes) {
        if (node.type === "choice") {
          const c = node as ChoiceNode;
          if (c.kind === "personal") {
            expect(c.options.length).toBe(2);
            expect(c.options.map((o) => o.key)).toEqual(["A", "B"]);
          } else {
            expect(c.options.length).toBe(3);
            expect(c.options.map((o) => o.key)).toEqual(["A", "B", "C"]);
          }
        }
      }
    }
  });

  it("DV-11 Choices: Mỗi choice lịch sử có đúng 1 phương án correct=true và 2 phương án correct=false", () => {
    for (const sc of content.scenes) {
      for (const node of sc.nodes) {
        if (node.type === "choice") {
          const c = node as ChoiceNode;
          if (c.kind !== "personal") {
            const correctCount = c.options.filter((o) => o.correct).length;
            const wrongCount = c.options.filter((o) => !o.correct).length;
            expect(correctCount).toBe(1);
            expect(wrongCount).toBe(2);
          }
        }
      }
    }
  });

  it("DV-12 Choices: Tất cả phương án sai (correct=false) đều kết thúc bằng nút retry", () => {
    for (const sc of content.scenes) {
      for (const node of sc.nodes) {
        if (node.type === "choice") {
          const c = node as ChoiceNode;
          for (const opt of c.options) {
            if (!opt.correct) {
              const lastNode = opt.nodes[opt.nodes.length - 1];
              expect(lastNode?.type).toBe("retry");
            }
          }
        }
      }
    }
  });

  it("DV-13 Choices: Mọi phương án bước ngoặt lịch sử đều chứa ít nhất 1 hộp kiến thức (knowledge)", () => {
    for (const sc of content.scenes) {
      for (const node of sc.nodes) {
        if (node.type === "choice") {
          const c = node as ChoiceNode;
          if (c.kind !== "personal") {
            for (const opt of c.options) {
              const hasKnowledge = opt.nodes.some((n) => n.type === "knowledge");
              expect(hasKnowledge).toBe(true);
            }
          }
        }
      }
    }
  });

  it("DV-14 Sources: Toàn bộ 51 mã nguồn đều có tiền tố GT- và số trang", () => {
    expect(content.sources.length).toBe(51);
    for (const s of content.sources) {
      expect(s.id.startsWith("GT-")).toBe(true);
      expect(s.pages).toBeTruthy();
      expect(s.kind === "quote" || s.kind === "fact").toBe(true);
      expect(s.text.length).toBeGreaterThan(0);
    }
  });

  it("DV-15 Knowledge: Các mã nguồn trong hộp kiến thức đều tồn tại trong sources.json", () => {
    const validSources = new Set(content.sources.map((s) => s.id));
    for (const sc of content.scenes) {
      for (const node of sc.nodes) {
        if (node.type === "knowledge") {
          for (const src of (node as KnowledgeNode).sources) {
            expect(validSources.has(src)).toBe(true);
          }
        }
        if (node.type === "choice") {
          for (const opt of (node as ChoiceNode).options) {
            for (const subNode of opt.nodes) {
              if (subNode.type === "knowledge") {
                for (const src of (subNode as KnowledgeNode).sources) {
                  expect(validSources.has(src)).toBe(true);
                }
              }
            }
          }
        }
      }
    }
  });

  it("DV-16 Characters: Có đủ 7 nhân vật với đầy đủ tên, loại và mô tả", () => {
    expect(content.characters.length).toBe(7);
    for (const char of content.characters) {
      expect(char.id).toBeTruthy();
      expect(char.name).toBeTruthy();
      expect(["historical", "fictional", "system"].includes(char.kind)).toBe(true);
      expect(char.description).toBeTruthy();
    }
  });

  it("DV-17 Characters: Nhân vật lịch sử nguyen-ai-quoc được đánh dấu kind=historical", () => {
    const bac = content.characters.find((c) => c.id === "nguyen-ai-quoc");
    expect(bac).toBeDefined();
    expect(bac?.kind).toBe("historical");
  });

  it("DV-18 Historical Dialogues: Mọi câu thoại của nhân vật lịch sử đều có trích dẫn nguồn quote", () => {
    const sourceMap = new Map(content.sources.map((s) => [s.id, s]));
    for (const sc of content.scenes) {
      for (const node of sc.nodes) {
        if (node.type === "line") {
          const l = node as LineNode;
          if (l.speaker === "nguyen-ai-quoc") {
            expect(l.source).toBeDefined();
            const src = sourceMap.get(l.source!);
            expect(src).toBeDefined();
            expect(src?.kind).toBe("quote");
          }
        }
      }
    }
  });

  it("DV-19 Collectibles: Có đúng 8 tư liệu lịch sử mở khóa", () => {
    expect(content.collectibles.length).toBe(8);
  });

  it("DV-20 Collectibles: Mỗi tư liệu có title, caption và nguồn đối chứng hợp lệ", () => {
    const sourceMap = new Map(content.sources.map((s) => [s.id, s]));
    for (const item of content.collectibles) {
      expect(item.id.startsWith("tl-")).toBe(true);
      expect(item.title).toBeTruthy();
      expect(item.caption).toBeTruthy();
      expect(item.source).toBeDefined();
      expect(sourceMap.has(item.source!)).toBe(true);
    }
  });

  it("DV-21 Quiz: Có đúng 6 câu hỏi củng cố kiến thức", () => {
    expect(content.quiz.length).toBe(6);
  });

  it("DV-22 Quiz: Đa dạng hóa câu đố hợp lệ (trắc nghiệm, tư liệu, ghép cặp, điền ô khuyết)", () => {
    for (const q of content.quiz) {
      expect(q.id).toBeTruthy();
      expect(q.question).toBeTruthy();
      const qType = q.type || "multiple_choice";
      if (qType === "multiple_choice" || qType === "visual_clue") {
        expect(q.answer).toBeTruthy();
        expect(q.distractors?.length).toBeGreaterThanOrEqual(2);
        expect(q.distractors?.includes(q.answer!)).toBe(false);
      } else if (qType === "word_match") {
        expect(q.pairs?.length).toBeGreaterThanOrEqual(2);
        for (const p of q.pairs!) {
          expect(p.left).toBeTruthy();
          expect(p.right).toBeTruthy();
        }
      } else if (qType === "fill_blank") {
        expect(q.template).toBeTruthy();
        expect(q.blanks?.length).toBeGreaterThanOrEqual(1);
        expect(q.options?.length).toBeGreaterThanOrEqual(2);
        for (const b of q.blanks!) {
          expect(q.options?.includes(b.answer)).toBe(true);
        }
      }
    }
  });

  it("DV-23 Quiz: Mỗi câu hỏi đều có nguồn đối chứng trong sources.json", () => {
    const sourceMap = new Map(content.sources.map((s) => [s.id, s]));
    for (const q of content.quiz) {
      expect(sourceMap.has(q.source)).toBe(true);
    }
  });

  it("DV-24 Hotspots: 10 điểm tương tác có tọa độ x, y hợp lệ (0-100%) và nguồn liên kết", () => {
    expect(content.hotspots).toBeDefined();
    expect(content.hotspots!.length).toBe(10);
    const sourceMap = new Map(content.sources.map((s) => [s.id, s]));
    for (const hs of content.hotspots!) {
      expect(hs.id).toBeTruthy();
      expect(hs.x).toBeGreaterThanOrEqual(0);
      expect(hs.x).toBeLessThanOrEqual(100);
      expect(hs.y).toBeGreaterThanOrEqual(0);
      expect(hs.y).toBeLessThanOrEqual(100);
      for (const sId of hs.sources) {
        expect(sourceMap.has(sId)).toBe(true);
      }
    }
  });

  it("DV-25 Contexts: 15 bối cảnh lịch sử ánh xạ đầy đủ đến từng cảnh tương ứng", () => {
    expect(content.contexts).toBeDefined();
    expect(content.contexts!.length).toBe(15);
    const sceneIds = new Set(content.scenes.map((s) => s.id));
    for (const ctx of content.contexts!) {
      expect(sceneIds.has(ctx.sceneId)).toBe(true);
      expect(ctx.time).toBeTruthy();
      expect(ctx.location).toBeTruthy();
      expect(ctx.subtitle).toBeTruthy();
    }
  });
});

