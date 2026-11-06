// High-fidelity Voice-over & Text-To-Speech Manager for "Hành Trình Đỏ" Visual Novel
// Studio-grade Human Vietnamese Neural Audio (Nam Minh & Hoài My) with character differentiation

import voiceManifestJson from "./engine/voiceManifest.json";

export interface VoiceProfile {
  pitch: number;
  rate: number;
}

export interface VoiceManifestEntry {
  url: string;
  speaker: string;
  type: string;
  hash: string;
}

export const voiceManifest = voiceManifestJson as Record<string, VoiceManifestEntry>;

// Cấu hình âm sắc đặc thù cho từng nhân vật (phân tầng tính cách, độ tuổi, vai trò lịch sử, tránh đi ngang)
export const CHARACTER_PROFILES: Record<string, VoiceProfile> = {
  // Minh (16-35 tuổi): Nam thanh niên yêu nước, nhiệt huyết, tươi sáng, nhịp nói hoạt bát
  minh: { pitch: 1.10, rate: 1.04 },
  // Minh (Nội tâm): Trầm tư, sâu lắng, chậm rãi, tự sự
  "minh-thought": { pitch: 1.02, rate: 0.97 },
  // Lan: Nữ thanh niên công nhân dệt Hà Nội, trong trẻo, sắc sảo, kiên định
  lan: { pitch: 1.18, rate: 1.03 },
  // Bác Tư: Thợ máy lão thành (~55 tuổi), giọng trầm khàn gió sương biển cả, dày dặn, ấm áp
  "bac-tu": { pitch: 0.78, rate: 0.92 },
  // Nguyễn Ái Quốc (Bác Hồ / Văn Ba): Lãnh tụ, đĩnh đạc, ấm áp, uy nghiêm, truyền cảm
  "nguyen-ai-quoc": { pitch: 0.90, rate: 0.96 },
  // Bạn thợ ảnh (Ngõ Compoint, Paris): Đồng nghiệp thân thiện, cởi mở
  "ban-tho-anh": { pitch: 1.04, rate: 1.0 },
  // Thợ Việt kiều: Mộc mạc, chân chất, cùng cảnh ngộ viễn xứ
  "tho-viet-kieu": { pitch: 0.96, rate: 0.98 },
  // Người dẫn chuyện: Thuyết minh tư liệu lịch sử, trầm ấm, truyền cảm, khúc chiết
  narrator: { pitch: 0.94, rate: 0.97 },
  // Hộp kiến thức: Giáo trình lịch sử chính thống, rõ ràng, đĩnh đạc, chắc chắn
  knowledge: { pitch: 0.88, rate: 0.93 }
};

class VoiceManager {
  private enabled: boolean = true;
  private volume: number = 1.0;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private activeText: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        const savedMute = localStorage.getItem("hanh_trinh_do_muted");
        if (savedMute !== null) {
          this.isMuted = savedMute === "true";
        }
      } catch {}
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  public isVoiceEnabled(): boolean {
    return this.enabled;
  }

  public setVolume(volume: number) {
    this.volume = Math.min(1, Math.max(0, volume));
    if (this.currentAudio) {
      this.currentAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    }
  }

  public cleanText(rawText: string): string {
    // Loại bỏ mã nguồn [GT-...], số [1], ngoặc kép trang trí và khoảng trắng thừa
    return rawText
      .replace(/\[GT-[^\]]+\]/g, "")
      .replace(/\[\d+\]/g, "")
      .replace(/["“”«»*]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  public speak(
    text: string,
    speakerId?: string,
    onEnd?: () => void
  ) {
    if (!this.enabled || this.isMuted || this.volume <= 0) {
      return;
    }

    this.stop();

    const cleaned = this.cleanText(text);
    if (!cleaned) return;
    this.activeText = cleaned;

    // 1. ƯU TIÊN SỐ 1: Phát tệp âm thanh giọng đọc người Việt thực tế (Studio-grade Neural Voice MP3)
    // Tra cứu ưu tiên theo speakerId:text, fallback theo text thuần
    const entry = (speakerId && voiceManifest[`${speakerId}:${cleaned}`]) || voiceManifest[cleaned];
    if (entry && entry.url && typeof window !== "undefined" && typeof Audio !== "undefined") {
      try {
        const audio = new Audio(entry.url);
        // Tinh chỉnh âm lượng cho từng trạng thái nhân vật (nội tâm nhẹ nhàng, sâu lắng hơn)
        const volMultiplier = (speakerId === "minh-thought" || entry.speaker === "minh-thought") ? 0.88 : 1.0;
        audio.volume = Math.min(1, Math.max(0, this.volume * volMultiplier));
        this.currentAudio = audio;

        audio.onended = () => {
          if (this.currentAudio === audio) {
            this.currentAudio = null;
            this.activeText = null;
          }
          onEnd?.();
        };

        audio.onerror = () => {
          if (this.currentAudio === audio) {
            this.currentAudio = null;
            this.activeText = null;
          }
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay policy chặn khi người dùng chưa tương tác lần đầu
          });
        }
        return;
      } catch {
        // Fallback qua Web Speech API bên dưới nếu Audio element gặp sự cố
      }
    }

    // 2. DỰ PHÒNG AN TOÀN: Web Speech API (Chỉ chạy khi máy khách có giọng tiếng Việt thực thụ)
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    try {
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("vi") ||
          v.lang.toLowerCase().includes("vn") ||
          v.name.toLowerCase().includes("vietnam") ||
          v.name.toLowerCase().includes("hoaimy") ||
          v.name.toLowerCase().includes("namminh")
      );

      // NGUYÊN TẮC BẢO VỆ TUYỆT ĐỐI: Không bao giờ đọc tiếng Việt bằng giọng máy ngoại quốc/tiếng Anh
      if (!viVoice) {
        return;
      }

      const profile = (speakerId && CHARACTER_PROFILES[speakerId]) || CHARACTER_PROFILES.narrator;
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.voice = viVoice;
      utterance.lang = "vi-VN";
      utterance.volume = this.volume;
      // Phân tầng cao độ và nhịp điệu riêng biệt cho từng nhân vật, tránh đi ngang
      utterance.pitch = profile.pitch;
      utterance.rate = profile.rate;

      utterance.onend = () => {
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null;
          this.activeText = null;
        }
        onEnd?.();
      };

      utterance.onerror = () => {
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null;
          this.activeText = null;
        }
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      // SpeechSynthesis unavailable or blocked
    }
  }

  public stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {}
      this.currentAudio = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.currentUtterance = null;
    this.activeText = null;
  }

  public isSpeaking(): boolean {
    if (this.currentAudio && !this.currentAudio.paused) {
      return true;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      return window.speechSynthesis.speaking;
    }
    return false;
  }

  public getActiveText(): string | null {
    return this.activeText;
  }
}

export const voiceManager = new VoiceManager();
