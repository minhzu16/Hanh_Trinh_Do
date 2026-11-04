import type {
  GameContent,
  GameState,
  Scene,
  SceneNode,
  ChoiceNode
} from "./types";

export function isNodeConditionMet(node: SceneNode, flags: Record<string, boolean>): boolean {
  if (!("if" in node) || !node.if) return true;
  const cond = node.if.trim();
  if (cond.startsWith("!")) {
    const flagKey = cond.slice(1).trim();
    return !flags[flagKey];
  }
  return Boolean(flags[cond]);
}

export function start(content: GameContent): GameState {
  const firstChapter = content.chapters[0];
  const firstSceneId = firstChapter?.scenes[0] ?? "";
  
  const initialState: GameState = {
    screen: "scene",
    currentChapterId: firstChapter?.id ?? "",
    currentSceneId: firstSceneId,
    nodeIndex: 0,
    activeOption: null,
    flags: {},
    choiceScores: {},
    choiceAttempts: {},
    unlockedCollectibles: [],
    quizAnswers: {},
    dialogLog: []
  };

  return skipUnmetAndRecord(content, initialState);
}

export function getCurrentScene(content: GameContent, state: GameState): Scene | undefined {
  return content.scenes.find((s) => s.id === state.currentSceneId);
}

export function getCurrentNode(content: GameContent, state: GameState): SceneNode | undefined {
  const scene = getCurrentScene(content, state);
  if (!scene) return undefined;

  if (state.activeOption) {
    const choiceNode = scene.nodes[state.nodeIndex];
    if (choiceNode?.type !== "choice") return undefined;
    const option = choiceNode.options.find((o) => o.key === state.activeOption!.optionKey);
    return option?.nodes[state.activeOption.nodeIndex];
  }

  return scene.nodes[state.nodeIndex];
}

function recordCurrentNode(content: GameContent, state: GameState): GameState {
  const node = getCurrentNode(content, state);
  if (!node) return state;

  const nextState = { ...state };

  if (node.type === "unlock") {
    if (!nextState.unlockedCollectibles.includes(node.item)) {
      nextState.unlockedCollectibles = [...nextState.unlockedCollectibles, node.item];
    }
  }

  if (node.type === "line" || node.type === "thought" || node.type === "narration") {
    const speaker = node.type === "line" ? node.speaker : (node.type === "thought" ? "Minh" : undefined);
    nextState.dialogLog = [...nextState.dialogLog, { speaker, text: node.text }];
  }

  return nextState;
}

function rawAdvance(content: GameContent, state: GameState): GameState {
  const scene = getCurrentScene(content, state);
  if (!scene) return state;

  // Đang ở trong option nhánh của một choice
  if (state.activeOption) {
    const choiceNode = scene.nodes[state.nodeIndex] as ChoiceNode;
    const option = choiceNode.options.find((o) => o.key === state.activeOption!.optionKey);
    const nextOptionNodeIndex = state.activeOption.nodeIndex + 1;

    // Kiểm tra xem nút tiếp theo có phải retry không, hoặc đã hết option
    if (option && nextOptionNodeIndex < option.nodes.length) {
      const nextNode = option.nodes[nextOptionNodeIndex];
      if (nextNode.type === "retry") {
        // Nhánh sai kết thúc bằng retry -> quay lại chính nút choice đó
        return {
          ...state,
          activeOption: null
        };
      }

      return {
        ...state,
        activeOption: {
          ...state.activeOption,
          nodeIndex: nextOptionNodeIndex
        }
      };
    } else {
      // Hết các nút của option đúng -> tiếp tục các nút tiếp theo của cảnh chính
      const nextMainNodeIndex = state.nodeIndex + 1;
      const updated = advanceMainScene(content, state, scene, nextMainNodeIndex);
      return { ...updated, activeOption: null };
    }
  }

  // Đang ở luồng cảnh chính
  const nextNodeIndex = state.nodeIndex + 1;
  return advanceMainScene(content, state, scene, nextNodeIndex);
}

function skipUnmetAndRecord(content: GameContent, state: GameState): GameState {
  let curr = state;
  let safety = 0;
  while (curr.screen === "scene" && safety < 500) {
    safety++;
    const node = getCurrentNode(content, curr);
    if (!node) break;
    if (isNodeConditionMet(node, curr.flags)) {
      break;
    }
    const advanced = rawAdvance(content, curr);
    if (advanced === curr) break;
    curr = advanced;
  }
  return recordCurrentNode(content, curr);
}

export function next(content: GameContent, state: GameState): GameState {
  if (state.screen !== "scene") return state;

  const scene = getCurrentScene(content, state);
  if (!scene) return state;

  const currentNode = getCurrentNode(content, state);
  if (currentNode?.type === "choice") {
    return state; // Phải chọn đáp án, không được bấm next qua choice
  }

  const advanced = rawAdvance(content, state);
  return skipUnmetAndRecord(content, advanced);
}

function advanceMainScene(
  content: GameContent,
  state: GameState,
  currentScene: Scene,
  targetNodeIndex: number
): GameState {
  if (targetNodeIndex < currentScene.nodes.length) {
    return {
      ...state,
      nodeIndex: targetNodeIndex
    };
  }

  // Hết cảnh hiện tại -> Chuyển sang cảnh tiếp theo
  const currentChapter = content.chapters.find((c) => c.id === state.currentChapterId);
  if (!currentChapter) return state;

  const sceneIndexInChapter = currentChapter.scenes.indexOf(currentScene.id);
  if (sceneIndexInChapter >= 0 && sceneIndexInChapter + 1 < currentChapter.scenes.length) {
    const nextSceneId = currentChapter.scenes[sceneIndexInChapter + 1];
    return {
      ...state,
      currentSceneId: nextSceneId,
      nodeIndex: 0
    };
  }

  // Hết kỳ hiện tại -> Chuyển sang kỳ tiếp theo
  const chapterIndex = content.chapters.findIndex((c) => c.id === state.currentChapterId);
  if (chapterIndex >= 0 && chapterIndex + 1 < content.chapters.length) {
    const nextChapter = content.chapters[chapterIndex + 1];
    return {
      ...state,
      currentChapterId: nextChapter.id,
      currentSceneId: nextChapter.scenes[0],
      nodeIndex: 0
    };
  }

  // Hết toàn bộ kỳ -> Sang màn quiz (hoặc summary nếu không có quiz)
  return {
    ...state,
    screen: content.quiz.length > 0 ? "quiz" : "summary"
  };
}

export function choose(
  content: GameContent,
  state: GameState,
  key: "A" | "B" | "C"
): GameState {
  const currentNode = getCurrentNode(content, state);
  if (!currentNode || currentNode.type !== "choice") {
    throw new Error(`Current node is not a choice (is ${currentNode?.type})`);
  }

  const choiceNode = currentNode as ChoiceNode;
  const option = choiceNode.options.find((o) => o.key === key);
  if (!option) {
    throw new Error(`Option ${key} not found in choice ${choiceNode.id}`);
  }

  const choiceId = choiceNode.id;
  const flagKey = `${choiceId}:${key}`;
  const prevAttempts = state.choiceAttempts[choiceId] ?? 0;
  const newAttempts = prevAttempts + 1;

  const newAttemptsMap = {
    ...state.choiceAttempts,
    [choiceId]: newAttempts
  };

  const newScoresMap = { ...state.choiceScores };
  if (choiceNode.kind !== "personal" && option.correct) {
    if (newAttempts === 1) {
      newScoresMap[choiceId] = "dung_ngay";
    } else {
      newScoresMap[choiceId] = "chon_lai";
    }
  }

  const newFlags = {
    ...state.flags,
    [flagKey]: true
  };

  const nextState: GameState = {
    ...state,
    activeOption: {
      choiceId,
      optionKey: key,
      nodeIndex: 0
    },
    flags: newFlags,
    choiceAttempts: newAttemptsMap,
    choiceScores: newScoresMap
  };

  return skipUnmetAndRecord(content, nextState);
}
