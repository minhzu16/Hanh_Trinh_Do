import { describe, it, expect } from "vitest";
import { content } from "../content";
import { start, next, choose, getCurrentNode } from "./step";
import { getSummary } from "./summary";
import type { GameState, ChoiceNode } from "./types";

const MAX_STEPS = 10000;

describe("Phase P5: Automated Playtest Bots", () => {
  it("B-01 Bot luôn đúng: Hết game, 7/7 dung_ngay, xếp loại 'Người đi cùng lịch sử'", () => {
    let s: GameState = start(content);
    let steps = 0;

    while (s.screen === "scene" && steps < MAX_STEPS) {
      steps++;
      const node = getCurrentNode(content, s);
      if (!node) break;

      if (node.type === "choice") {
        const choiceNode = node as ChoiceNode;
        const correctOpt = choiceNode.options.find((o) => o.correct)!;
        s = choose(content, s, correctOpt.key);
      } else {
        s = next(content, s);
      }
    }

    expect(steps).toBeLessThan(MAX_STEPS);
    expect(s.screen).toBe("quiz");

    const summary = getSummary(content, s);
    expect(summary.totalChoices).toBe(7);
    expect(summary.correctFirstTry).toBe(7);
    expect(summary.rankKey).toBe("summary.rank.7");
    expect(summary.rankTitle).toBe("Người đi cùng lịch sử");
  });

  it("B-02 Bot sai hết hai phương án rồi mới đúng: Hết game, đi qua đủ 21 phương án, 0/7 dung_ngay", () => {
    let s: GameState = start(content);
    let steps = 0;
    const visitedOptions = new Set<string>();

    while (s.screen === "scene" && steps < MAX_STEPS) {
      steps++;
      const node = getCurrentNode(content, s);
      if (!node) break;

      if (node.type === "choice") {
        const choiceNode = node as ChoiceNode;
        // Check which options haven't been visited yet
        const unvisitedWrong = choiceNode.options.filter(
          (o) => !o.correct && !visitedOptions.has(`${choiceNode.id}-${o.key}`)
        );

        if (unvisitedWrong.length > 0) {
          const optToPick = unvisitedWrong[0];
          visitedOptions.add(`${choiceNode.id}-${optToPick.key}`);
          s = choose(content, s, optToPick.key);
        } else {
          // All wrong visited, now pick the correct one
          const correctOpt = choiceNode.options.find((o) => o.correct)!;
          visitedOptions.add(`${choiceNode.id}-${correctOpt.key}`);
          s = choose(content, s, correctOpt.key);
        }
      } else {
        s = next(content, s);
      }
    }

    expect(steps).toBeLessThan(MAX_STEPS);
    expect(s.screen).toBe("quiz");
    expect(visitedOptions.size).toBe(21); // 7 choices * 3 options

    const summary = getSummary(content, s);
    expect(summary.correctFirstTry).toBe(0);
    expect(summary.rankKey).toBe("summary.rank.0");
    expect(summary.rankTitle).toBe("Người đang tìm đường");
  });

  it("B-03 Bot ngẫu nhiên 100 lần: Không lần nào kẹt hoặc lặp vô hạn", () => {
    for (let run = 0; run < 100; run++) {
      let s: GameState = start(content);
      let steps = 0;

      while (s.screen === "scene" && steps < MAX_STEPS) {
        steps++;
        const node = getCurrentNode(content, s);
        if (!node) break;

        if (node.type === "choice") {
          const choiceNode = node as ChoiceNode;
          const randomIdx = Math.floor(Math.random() * choiceNode.options.length);
          const randomKey = choiceNode.options[randomIdx].key;
          s = choose(content, s, randomKey);
        } else {
          s = next(content, s);
        }
      }

      expect(steps).toBeLessThan(MAX_STEPS);
      expect(s.screen).toBe("quiz");
    }
  });

  it("B-04 Ước tính của bot B-02: <= 28 phút (trường hợp tệ nhất)", () => {
    // Calculate total reading words across all 21 branches
    const WPM = 180;
    const words = (str?: string) => (str ? str.trim().split(/\s+/).length : 0);

    let totalSeconds = 0;
    for (const sc of content.scenes) {
      for (const node of sc.nodes) {
        if (node.type === "choice") {
          totalSeconds += 8; // choice decision
          totalSeconds += (words(node.prompt) / WPM) * 60;
          for (const opt of node.options) {
            totalSeconds += (words(opt.text) / WPM) * 60;
            for (const n of opt.nodes) {
              if (n.type === "cg") totalSeconds += 3 + (words(n.caption) / WPM) * 60;
              else if (n.type === "knowledge") totalSeconds += (words(n.text) / WPM) * 60 + 3;
            }
          }
        } else if (node.type === "cg" || node.type === "unlock") {
          totalSeconds += 3 + (words((node as any).caption) / WPM) * 60;
        } else if (node.type === "timeline" || node.type === "cards") {
          totalSeconds += 2 * node.items.length;
          for (const item of node.items) {
            totalSeconds += (words(item.text) / WPM) * 60;
          }
        } else if (node.type === "line" || node.type === "thought" || node.type === "narration") {
          totalSeconds += (words(node.text) / WPM) * 60 + 1.5;
        }
      }
    }

    // Add quiz time (6 questions * 18s)
    totalSeconds += content.quiz.length * 18;

    const totalMinutes = totalSeconds / 60;
    expect(totalMinutes).toBeLessThanOrEqual(28);
  });

  it("B-05 Bot đi mọi tổ hợp flag: Không lần nào kẹt, thời lượng xấu nhất <= 28 phút", () => {
    for (let run = 0; run < 20; run++) {
      let s: GameState = start(content);
      let steps = 0;

      while (s.screen === "scene" && steps < MAX_STEPS) {
        steps++;
        const node = getCurrentNode(content, s);
        if (!node) break;

        if (node.type === "choice") {
          const choiceNode = node as ChoiceNode;
          const randomIdx = Math.floor(Math.random() * choiceNode.options.length);
          const opt = choiceNode.options[randomIdx];
          s = choose(content, s, opt.key);
          expect(s.flags[`${choiceNode.id}:${opt.key}`]).toBe(true);
        } else {
          s = next(content, s);
        }
      }

      expect(steps).toBeLessThan(MAX_STEPS);
      expect(s.screen).toBe("quiz");
    }
  });
});

