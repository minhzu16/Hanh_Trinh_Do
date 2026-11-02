// Safe audio player with Web Audio fallback
class AudioManager {
  private currentBgm: HTMLAudioElement | null = null;
  private currentBgmName: string | null = null;
  private muted: boolean = false;

  public playBgm(bgmName?: string) {
    if (!bgmName || this.muted) {
      this.stopBgm();
      return;
    }

    if (this.currentBgmName === bgmName && this.currentBgm && !this.currentBgm.paused) {
      return;
    }

    this.stopBgm();

    try {
      const audio = new Audio(`/audio/${bgmName}.mp3`);
      audio.loop = true;
      audio.volume = 0.35;
      audio.play().catch(() => {
        // Autoplay policy or file not found - ignore silently
      });
      this.currentBgm = audio;
      this.currentBgmName = bgmName;
    } catch {
      // Audio element not supported or file missing
    }
  }

  public stopBgm() {
    if (this.currentBgm) {
      this.currentBgm.pause();
      this.currentBgm.currentTime = 0;
      this.currentBgm = null;
      this.currentBgmName = null;
    }
  }

  public playSfx(sfxName: string) {
    if (this.muted) return;
    try {
      const audio = new Audio(`/audio/${sfxName}.mp3`);
      audio.volume = 0.5;
      audio.play().catch(() => {
        // ignore silently
      });
    } catch {
      // ignore
    }
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopBgm();
    }
    return this.muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }
}

export const audioManager = new AudioManager();

