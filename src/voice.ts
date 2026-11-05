// High-fidelity Voice-over & Text-To-Speech Manager for "Hành Trình Đỏ" Visual Novel
// Studio-grade Human Vietnamese Neural Audio (Nam Minh & Hoài My) with zero-compromise fallback

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

export const CHARACTER_PROFILES: Record<string, VoiceProfile> = {
  minh: { pitch: 1.02, rate: 1.0 }, // Nam thanh niên (16-34 tuổi), trẻ trung, giàu nhuệ khí
  lan: { pitch: 1.05, rate: 1.0 }, // Nữ thanh niên công nhân Hà Nội, trong trẻo, sắc sảo
  "bac-tu": { pitch: 0.95, rate: 0.98 }, // Nam thợ máy lớn tuổi, trầm ấm, từng trải
  "nguyen-ai-quoc": { pitch: 0.98, rate: 0.98 }, // Lãnh tụ: trang nghiêm, đĩnh đạc, ấm áp
  "ban-tho-anh": { pitch: 1.0, rate: 1.0 },
  "tho-viet-kieu": { pitch: 0.98, rate: 1.0 },
  narrator: { pitch: 1.0, rate: 1.0 }, // Dẫn chuyện: truyền cảm, mạch lạc
  knowledge: { pitch: 1.0, rate: 0.98 } // Hộp kiến thức giáo trình: rõ ràng, trang trọng
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
    _speakerId?: string,
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
    const entry = voiceManifest[cleaned];
    if (entry && entry.url && typeof window !== "undefined" && typeof Audio !== "undefined") {
      try {
        const audio = new Audio(entry.url);
        audio.volume = this.volume;
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

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.voice = viVoice;
      utterance.lang = "vi-VN";
      utterance.volume = this.volume;
      // Bảo tồn trọn vẹn 6 thanh điệu tiếng Việt tự nhiên (ngang, huyền, sắc, hỏi, ngã, nặng)
      utterance.pitch = 1.0;
      utterance.rate = 1.0;

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
