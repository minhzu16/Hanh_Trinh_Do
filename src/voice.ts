// High-fidelity Voice-over & Text-To-Speech Manager for "Hành Trình Đỏ" Visual Novel
// Uses Web Speech API with tailored character voice personas and pitch/rate modulation

export interface VoiceProfile {
  pitch: number;
  rate: number;
}

export const CHARACTER_PROFILES: Record<string, VoiceProfile> = {
  minh: { pitch: 1.08, rate: 1.02 }, // Nam thanh niên (16-34 tuổi), trẻ trung, giàu nhuệ khí
  lan: { pitch: 1.25, rate: 1.02 }, // Nữ thanh niên công nhân Hà Nội, trong trẻo, sắc sảo
  "bac-tu": { pitch: 0.82, rate: 0.94 }, // Nam thợ máy lớn tuổi, trầm ấm, từng trải
  "nguyen-ai-quoc": { pitch: 0.92, rate: 0.92 }, // Lãnh tụ: trang nghiêm, đĩnh đạc, ấm áp
  "ban-tho-anh": { pitch: 1.0, rate: 1.0 },
  "tho-viet-kieu": { pitch: 0.95, rate: 0.98 },
  narrator: { pitch: 0.96, rate: 0.98 }, // Dẫn chuyện: truyền cảm, mạch lạc
  knowledge: { pitch: 0.96, rate: 0.96 } // Hộp kiến thức giáo trình: rõ ràng, trang trọng
};

class VoiceManager {
  private enabled: boolean = true;
  private volume: number = 1.0;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
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
    // Loại bỏ mã nguồn [GT-...], số [1], ngoặc kép trang trí và markdown
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
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    try {
      this.stop();

      const cleaned = this.cleanText(text);
      if (!cleaned) return;

      this.activeText = cleaned;
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = "vi-VN";

      // Chọn voice tiếng Việt nếu hệ thống đã cài đặt
      const voices = window.speechSynthesis.getVoices();
      const viVoice = voices.find(
        (v) => v.lang.toLowerCase().startsWith("vi") || v.lang.toLowerCase().includes("vn")
      );
      if (viVoice) {
        utterance.voice = viVoice;
      }

      // Điều chỉnh pitch và rate theo nhân vật
      const profile =
        (speakerId && CHARACTER_PROFILES[speakerId]) ||
        CHARACTER_PROFILES.narrator;

      utterance.pitch = profile.pitch;
      utterance.rate = profile.rate;
      utterance.volume = this.volume;

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
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    this.currentUtterance = null;
    this.activeText = null;
  }

  public isSpeaking(): boolean {
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
