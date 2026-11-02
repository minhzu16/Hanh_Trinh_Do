// High-fidelity Audio Manager for "Hành Trình Đỏ" Visual Novel
// Supports HTML5 Audio playback for real audio tracks with automatic fallback to Web Audio API synthesis

class AudioManager {
  private currentBgm: HTMLAudioElement | null = null;
  private currentBgmName: string | null = null;
  private muted: boolean = false;
  private masterVolume: number = 0.35;
  private bgmVolume: number = 0.35;
  private sfxVolume: number = 0.5;
  private audioCtx: AudioContext | null = null;
  private synthNodes: { stop: () => void } | null = null;

  constructor() {
    // Automatically register user interaction listener to resume AudioContext if suspended
    if (typeof window !== "undefined") {
      const unlockAudio = () => {
        if (this.audioCtx && this.audioCtx.state === "suspended") {
          this.audioCtx.resume().catch(() => {});
        }
        if (this.currentBgm && this.currentBgm.paused && this.currentBgmName && !this.muted) {
          this.currentBgm.play().catch(() => {});
        }
      };
      window.addEventListener("click", unlockAudio, { once: false });
      window.addEventListener("keydown", unlockAudio, { once: false });
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public playBgm(bgmName?: string) {
    if (!bgmName || this.muted) {
      this.stopBgm();
      return;
    }

    if (this.currentBgmName === bgmName && ((this.currentBgm && !this.currentBgm.paused) || this.synthNodes)) {
      return;
    }

    this.stopBgm();
    this.currentBgmName = bgmName;

    // 1. Try HTML5 Audio with crossfade using authentic MP3
    try {
      const audio = new Audio(`/audio/${bgmName}.mp3`);
      audio.loop = true;
      audio.volume = Math.min(1, Math.max(0, this.masterVolume));

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.currentBgm = audio;
          })
          .catch(() => {
            // If HTML5 audio is blocked by browser policy, fall back to Web Audio procedural synthesis
            this.startProceduralBgm(bgmName);
          });
      } else {
        this.currentBgm = audio;
      }
    } catch {
      this.startProceduralBgm(bgmName);
    }
  }

  private startProceduralBgm(bgmName: string) {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.stopSynth();

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, now);
    masterGain.gain.linearRampToValueAtTime(this.masterVolume * 0.7, now + 1.2);
    masterGain.connect(ctx.destination);

    const activeOscillators: OscillatorNode[] = [];

    if (bgmName === "bgm-song-bien") {
      // Ocean wave swell + D minor cello drone
      const d2 = ctx.createOscillator();
      const a2 = ctx.createOscillator();
      d2.type = "triangle";
      d2.frequency.setValueAtTime(73.42, now); // D2
      a2.type = "sine";
      a2.frequency.setValueAtTime(110.0, now); // A2

      const waveFilter = ctx.createBiquadFilter();
      waveFilter.type = "lowpass";
      waveFilter.frequency.setValueAtTime(180, now);

      d2.connect(waveFilter);
      a2.connect(waveFilter);
      waveFilter.connect(masterGain);

      d2.start(now);
      a2.start(now);
      activeOscillators.push(d2, a2);
    } else if (bgmName === "bgm-day-dan-dang") {
      // Awakening warm string pad (F major / D minor)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(174.61, now); // F3
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(220.0, now); // A3

      osc1.connect(masterGain);
      osc2.connect(masterGain);
      osc1.start(now);
      osc2.start(now);
      activeOscillators.push(osc1, osc2);
    } else if (bgmName === "bgm-hanh-quan") {
      // Resolute marching pulse in A minor
      const bass = ctx.createOscillator();
      bass.type = "triangle";
      bass.frequency.setValueAtTime(110.0, now); // A2
      bass.connect(masterGain);
      bass.start(now);
      activeOscillators.push(bass);
    } else if (bgmName === "bgm-hoi-hop") {
      // Dark suspense drone (C# minor)
      const drone = ctx.createOscillator();
      drone.type = "sine";
      drone.frequency.setValueAtTime(69.3, now); // C#2
      drone.connect(masterGain);
      drone.start(now);
      activeOscillators.push(drone);
    } else {
      // bgm-chu-de-chinh or others: Triumphant C Major hymn
      const c = ctx.createOscillator();
      const g = ctx.createOscillator();
      c.type = "triangle";
      c.frequency.setValueAtTime(130.81, now); // C3
      g.type = "triangle";
      g.frequency.setValueAtTime(196.0, now); // G3
      c.connect(masterGain);
      g.connect(masterGain);
      c.start(now);
      g.start(now);
      activeOscillators.push(c, g);
    }

    this.synthNodes = {
      stop: () => {
        try {
          const stopTime = ctx.currentTime + 0.5;
          masterGain.gain.linearRampToValueAtTime(0.001, stopTime);
          setTimeout(() => {
            activeOscillators.forEach((osc) => {
              try {
                osc.stop();
                osc.disconnect();
              } catch {}
            });
            masterGain.disconnect();
          }, 600);
        } catch {}
      }
    };
  }

  private stopSynth() {
    if (this.synthNodes) {
      this.synthNodes.stop();
      this.synthNodes = null;
    }
  }

  public stopBgm() {
    if (this.currentBgm) {
      try {
        const audio = this.currentBgm;
        // Fade out
        const fadeInterval = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume = Math.max(0, audio.volume - 0.05);
          } else {
            clearInterval(fadeInterval);
            audio.pause();
            audio.currentTime = 0;
          }
        }, 30);
      } catch {
        this.currentBgm.pause();
      }
      this.currentBgm = null;
    }
    this.stopSynth();
    this.currentBgmName = null;
  }

  public playSfx(sfxName: string) {
    if (this.muted) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (sfxName === "sfx-chon") {
        // Crisp gentle wooden click / tap
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
        gain.gain.setValueAtTime(0.14 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (sfxName === "sfx-mo-khoa") {
        // Uplifting historic bell chime fanfare for unlock
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.5, now + 0.3); // C6
        gain.gain.setValueAtTime(0.25 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
        osc.start(now);
        osc.stop(now + 0.65);
      } else if (sfxName === "sfx-vo-tay") {
        // Triumphant victory major chord
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.setValueAtTime(554.37, now + 0.08); // C#5
        osc.frequency.setValueAtTime(659.25, now + 0.16); // E5
        gain.gain.setValueAtTime(0.22 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else {
        // Subtle page-turn / narration step
        osc.type = "sine";
        osc.frequency.setValueAtTime(620, now);
        gain.gain.setValueAtTime(0.08 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    } catch {
      // AudioContext unavailable
    }
  }

  public setVolume(volume: number) {
    this.masterVolume = Math.min(1, Math.max(0, volume));
    this.bgmVolume = this.masterVolume;
    this.sfxVolume = this.masterVolume;
    if (this.currentBgm) {
      this.currentBgm.volume = this.masterVolume;
    }
  }

  public getVolume(): number {
    return this.masterVolume;
  }

  public setBgmVolume(volume: number) {
    this.bgmVolume = Math.min(1, Math.max(0, volume));
    if (this.currentBgm) {
      this.currentBgm.volume = this.bgmVolume;
    }
  }

  public getBgmVolume(): number {
    return this.bgmVolume;
  }

  public setSfxVolume(volume: number) {
    this.sfxVolume = Math.min(1, Math.max(0, volume));
  }

  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopBgm();
    } else if (this.currentBgmName) {
      this.playBgm(this.currentBgmName);
    }
    return this.muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }
}

export const audioManager = new AudioManager();
