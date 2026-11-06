// High-fidelity Audio Manager for "Hành Trình Đỏ" Visual Novel
// Supports HTML5 Audio playback for real audio tracks with automatic fallback to Web Audio API synthesis
import { voiceManager } from "./voice";

class AudioManager {
  private currentBgm: HTMLAudioElement | null = null;
  private pendingAudio: HTMLAudioElement | null = null;
  private playRequestId: number = 0;
  private currentBgmName: string | null = null;
  private targetBgmName: string | null = null; // Luôn lưu track mục tiêu kể cả khi đang mute
  private muted: boolean = false;
  private masterVolume: number = 0.8;
  private bgmVolume: number = 0.8;
  private sfxVolume: number = 0.85;
  private audioCtx: AudioContext | null = null;
  private synthGain: GainNode | null = null;
  private synthNodes: { stop: () => void } | null = null;
  private hasUnlocked: boolean = false;

  constructor() {
    // Đọc trạng thái mute đã lưu từ localStorage nếu có
    if (typeof window !== "undefined") {
      try {
        const savedMute = localStorage.getItem("hanh_trinh_do_muted");
        if (savedMute !== null) {
          this.muted = savedMute === "true";
          voiceManager.setMuted(this.muted);
        }
      } catch {}

      // Tự động lắng nghe tương tác đầu tiên để kích hoạt AudioContext khi trình duyệt yêu cầu
      const unlockAudio = () => {
        if (this.audioCtx && this.audioCtx.state === "suspended") {
          this.audioCtx.resume().catch(() => {});
        }
        if (!this.hasUnlocked) {
          this.hasUnlocked = true;
          if (this.targetBgmName && !this.muted) {
            if (!this.currentBgm || this.currentBgm.paused) {
              this.playBgm(this.targetBgmName);
            }
          }
        }
        window.removeEventListener("click", unlockAudio);
        window.removeEventListener("keydown", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
      };
      window.addEventListener("click", unlockAudio, { passive: true });
      window.addEventListener("keydown", unlockAudio, { passive: true });
      window.addEventListener("touchstart", unlockAudio, { passive: true });
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
    if (!bgmName) {
      this.stopBgm(true);
      return;
    }

    this.targetBgmName = bgmName;

    // Nếu đang tắt âm thì không phát, nhưng vẫn ghi nhớ track mục tiêu để khi bật lại phát ngay
    if (this.muted) {
      this.stopActiveAudio();
      return;
    }

    // Nếu track hiện tại đang phát đúng bài này thì giữ nguyên
    if (this.currentBgmName === bgmName && this.currentBgm && !this.currentBgm.paused) {
      return;
    }

    this.stopActiveAudio();
    this.currentBgmName = bgmName;
    const requestId = ++this.playRequestId;

    // 1. Thử phát bằng HTML5 Audio với file MP3 thực tế
    try {
      const audio = new Audio(`/audio/${bgmName}.mp3`);
      audio.loop = true;
      audio.volume = Math.min(1, Math.max(0, this.bgmVolume * this.masterVolume));
      this.pendingAudio = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Nếu đã bị tắt âm hoặc đã có yêu cầu track mới khác trong thời gian chờ tải
            if (this.muted || this.playRequestId !== requestId || this.targetBgmName !== bgmName) {
              try {
                audio.pause();
                audio.currentTime = 0;
              } catch {}
              if (this.pendingAudio === audio) {
                this.pendingAudio = null;
              }
              return;
            }

            if (this.currentBgm && this.currentBgm !== audio) {
              try {
                this.currentBgm.pause();
                this.currentBgm.currentTime = 0;
              } catch {}
            }
            this.currentBgm = audio;
            this.pendingAudio = null;
          })
          .catch(() => {
            if (this.pendingAudio === audio) {
              this.pendingAudio = null;
            }
            if (this.muted || this.playRequestId !== requestId) {
              return;
            }
            // Nếu bị chính sách autoplay của trình duyệt chặn, dùng tạm Web Audio API synthesis
            this.startProceduralBgm(bgmName);
          });
      } else {
        this.currentBgm = audio;
        this.pendingAudio = null;
      }
    } catch {
      if (this.muted || this.playRequestId !== requestId) {
        return;
      }
      this.startProceduralBgm(bgmName);
    }
  }

  private stopActiveAudio() {
    this.playRequestId++;
    if (this.pendingAudio) {
      try {
        this.pendingAudio.pause();
        this.pendingAudio.currentTime = 0;
      } catch {}
      this.pendingAudio = null;
    }
    if (this.currentBgm) {
      try {
        this.currentBgm.pause();
        this.currentBgm.currentTime = 0;
      } catch {}
      this.currentBgm = null;
    }
    this.stopSynth();
    this.currentBgmName = null;
  }

  private startProceduralBgm(bgmName: string) {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.stopSynth();

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    this.synthGain = masterGain;
    const effectiveBgmVol = Math.min(1, Math.max(0, this.bgmVolume * this.masterVolume * 0.75));
    masterGain.gain.setValueAtTime(0.01, now);
    masterGain.gain.linearRampToValueAtTime(effectiveBgmVol, now + 0.6);
    masterGain.connect(ctx.destination);

    // Audio frequency definitions (Hz)
    const N = {
      D1: 36.71, E1: 41.20, F1: 43.65, G1: 49.00, A1: 55.00, Bb1: 58.27, C2: 65.41,
      D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.0, Bb2: 116.54, C3: 130.81,
      D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, Bb3: 233.08, C4: 261.63,
      D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, C5: 523.25,
      D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, C6: 1046.50
    };

    // Synthesize kick drum
    const playKick = (t: number) => {
      try {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(130, t);
        osc.frequency.exponentialRampToValueAtTime(32, t + 0.08);
        g.gain.setValueAtTime(0.35, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
        osc.connect(g);
        g.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.11);
      } catch {}
    };

    // Synthesize marching snare
    const playSnare = (t: number, accent = false) => {
      try {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(280, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);
        g.gain.setValueAtTime(accent ? 0.28 : 0.16, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
        osc.connect(g);
        g.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.09);
      } catch {}
    };

    // Synthesize hi-hat / tick
    const playHihat = (t: number) => {
      try {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(3500, t);
        osc.frequency.exponentialRampToValueAtTime(1500, t + 0.03);
        g.gain.setValueAtTime(0.05, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        osc.connect(g);
        g.connect(masterGain);
        osc.start(t);
        osc.stop(t + 0.03);
      } catch {}
    };

    // Synthesize bass note
    const playBass = (freq: number, t: number, dur: number) => {
      try {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const g = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, t);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(350, t);
        g.gain.setValueAtTime(0.22, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.connect(filter);
        filter.connect(g);
        g.connect(masterGain);
        osc.start(t);
        osc.stop(t + dur);
      } catch {}
    };

    // Synthesize lead melody / brass / strings note
    const playLead = (freq: number, t: number, dur: number) => {
      try {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const g = ctx.createGain();
        osc1.type = "triangle";
        osc2.type = "sine";
        osc1.frequency.setValueAtTime(freq, t);
        osc2.frequency.setValueAtTime(freq * 1.003, t);
        g.gain.setValueAtTime(0.16, t);
        g.gain.exponentialRampToValueAtTime(0.002, t + dur);
        osc1.connect(g);
        osc2.connect(g);
        g.connect(masterGain);
        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + dur);
        osc2.stop(t + dur);
      } catch {}
    };

    // Synthesize ship bell chime (for ocean voyage)
    const playShipBell = (t: number) => {
      try {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1046.5, t); // C6
        g.gain.setValueAtTime(0.12, t);
        g.gain.exponentialRampToValueAtTime(0.0005, t + 1.2);
        osc.connect(g);
        g.connect(masterGain);
        osc.start(t);
        osc.stop(t + 1.2);
      } catch {}
    };

    // Sequencer configuration based on track
    let bpm = 118;
    if (bgmName === "bgm-song-bien") bpm = 100;
    else if (bgmName === "bgm-day-dan-dang") bpm = 112;
    else if (bgmName === "bgm-hanh-quan") bpm = 126;
    else if (bgmName === "bgm-hoi-hop") bpm = 94;

    const stepDuration = 60 / (bpm * 4); // 16th note duration in seconds
    let currentStep = 0;
    let nextStepTime = ctx.currentTime + 0.05;

    const schedule = () => {
      try {
        while (nextStepTime < ctx.currentTime + 0.25) {
          const s = currentStep % 32;
          const t = nextStepTime;

          if (bgmName === "bgm-song-bien") {
            // Nautical voyage with energetic rolling waves & ship bell
            if (s === 0) playShipBell(t);
            if (s % 8 === 0 || s === 14) playKick(t);
            if (s % 4 === 2) playHihat(t);

            // Ocean pentatonic wave harp arpeggio (D minor / F Major)
            const oceanArp = [N.D3, N.F3, N.A3, N.C4, N.D4, N.C4, N.A3, N.F3];
            const note = oceanArp[s % oceanArp.length];
            playLead(note, t, stepDuration * 2);

            // Gentle deep ocean bass
            if (s % 8 === 0) {
              const bassNotes = [N.D2, N.F2, N.G2, N.A2];
              const bassNote = bassNotes[Math.floor(s / 8) % bassNotes.length];
              playBass(bassNote, t, stepDuration * 6);
            }
          } else if (bgmName === "bgm-day-dan-dang") {
            // Uplifting dawn of revolutionary truth (Lenin's Theses)
            if (s % 4 === 0 || s === 14) playKick(t);
            if (s % 8 === 4 || s === 28) playSnare(t, true);
            if (s % 2 === 0) playHihat(t);

            // Rising inspiration chord progression (F -> C -> Dm -> Bb)
            const chords = [
              [N.F3, N.A3, N.C4, N.F4],
              [N.C3, N.E3, N.G3, N.C4],
              [N.D3, N.F3, N.A3, N.D4],
              [N.Bb2, N.D3, N.F3, N.Bb3]
            ];
            const chordIdx = Math.floor(s / 8) % 4;
            const noteIdx = s % 4;
            playLead(chords[chordIdx][noteIdx], t, stepDuration * 2.8);

            if (s % 4 === 0) {
              const bassLine = [N.F2, N.C2, N.D2, N.Bb1];
              playBass(bassLine[chordIdx], t, stepDuration * 3.5);
            }
          } else if (bgmName === "bgm-hanh-quan") {
            // Driving martial proletarian march with heroic brass & rhythmic roll
            if (s % 4 === 0 || s === 14 || s === 22 || s === 30) playKick(t);
            if (s % 4 === 2 || s === 7 || s === 23) playSnare(t, true);
            if (s % 2 === 1) playHihat(t);

            // Heroic resolute bassline (A minor)
            const marchBass = [N.A2, N.A2, N.C3, N.D3, N.E3, N.D3, N.C3, N.E2];
            if (s % 4 === 0) {
              const bNote = marchBass[Math.floor(s / 4) % marchBass.length];
              playBass(bNote, t, stepDuration * 3.5);
            }

            // Brass cadence with heroic counter-melody
            if (s % 4 === 0) {
              const brassFanfare = [N.A4, N.C5, N.D5, N.E5, N.G5, N.E5, N.D5, N.A4];
              playLead(brassFanfare[Math.floor(s / 4) % brassFanfare.length], t, stepDuration * 3);
            }
          } else if (bgmName === "bgm-hoi-hop") {
            // Heartbeat pulse & tense espionage clock tick
            if (s === 0 || s === 2 || s === 16 || s === 18) playKick(t);
            if (s % 4 === 0) playHihat(t);

            // Dark suspense staccato minor bass
            if (s === 0 || s === 8 || s === 16 || s === 24) {
              const tenseBass = [N.C2, N.C2, N.D2, N.C2];
              playBass(tenseBass[Math.floor(s / 8) % 4], t, stepDuration * 2);
            }

            // High violin suspense tremor
            if (s % 16 === 8) {
              playLead(N.F5, t, stepDuration * 3);
            }
          } else {
            // bgm-chu-de-chinh: Triumphant revolutionary march hymn (D minor / F Major)
            if (s % 4 === 0 || s === 14) playKick(t);
            if (s % 4 === 2) playSnare(t, true);
            if (s === 15) playSnare(t, false);
            playHihat(t);

            // Resolute marching bass
            if (s % 4 === 0) {
              const bassNotes = [N.D2, N.F2, N.G2, N.A2, N.Bb2, N.A2, N.G2, N.F2];
              playBass(bassNotes[Math.floor(s / 4) % bassNotes.length], t, stepDuration * 3);
            }

            // Memorable heroic revolutionary lead motif
            const marchMelody = [
              N.D4, N.F4, N.A4, N.G4, N.F4, N.E4, N.D4, N.A3,
              N.F4, N.G4, N.A4, N.C5, N.D5, N.C5, N.A4, N.D4
            ];
            if (s % 2 === 0) {
              const mNote = marchMelody[Math.floor(s / 2) % marchMelody.length];
              playLead(mNote, t, stepDuration * 1.8);
            }
          }

          nextStepTime += stepDuration;
          currentStep++;
        }
      } catch {}
    };

    const timer = setInterval(schedule, 60);

    this.synthNodes = {
      stop: () => {
        try {
          clearInterval(timer);
          masterGain.gain.setValueAtTime(0, ctx.currentTime);
          masterGain.disconnect();
        } catch {}
        if (this.synthGain === masterGain) {
          this.synthGain = null;
        }
      }
    };
  }

  private stopSynth() {
    if (this.synthNodes) {
      this.synthNodes.stop();
      this.synthNodes = null;
    }
    this.synthGain = null;
  }

  public stopBgm(clearTarget: boolean = true) {
    if (clearTarget) {
      this.targetBgmName = null;
    }
    this.stopActiveAudio();
  }

  public playSfx(sfxName: string) {
    if (this.muted || this.sfxVolume <= 0 || this.masterVolume <= 0) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const effectiveVolume = this.sfxVolume * this.masterVolume;

      if (sfxName === "sfx-chon" || sfxName === "sfx-page-turn") {
        // Crisp gentle wooden click / paper turn tap
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
        gain.gain.setValueAtTime(0.18 * effectiveVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (sfxName === "sfx-typewriter") {
        // Ultra-short subtle mechanical key tap
        osc.type = "triangle";
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.025);
        gain.gain.setValueAtTime(0.06 * effectiveVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
        osc.start(now);
        osc.stop(now + 0.025);
      } else if (sfxName === "sfx-choice-open") {
        // Dramatic suspense resonance gong
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, now); // A3
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.4); // A2
        gain.gain.setValueAtTime(0.25 * effectiveVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (sfxName === "sfx-correct") {
        // Uplifting two-tone major chime
        osc.type = "triangle";
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880.0, now + 0.1); // A5
        gain.gain.setValueAtTime(0.25 * effectiveVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.002, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (sfxName === "sfx-wrong") {
        // Somber warning low tone
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(146.83, now); // D3
        osc.frequency.exponentialRampToValueAtTime(73.42, now + 0.35); // D2
        gain.gain.setValueAtTime(0.2 * effectiveVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.002, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (sfxName === "sfx-mo-khoa") {
        // Uplifting historic bell chime fanfare for unlock
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.5, now + 0.3); // C6
        gain.gain.setValueAtTime(0.3 * effectiveVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
        osc.start(now);
        osc.stop(now + 0.65);
      } else if (sfxName === "sfx-vo-tay") {
        // Triumphant victory major chord
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.setValueAtTime(554.37, now + 0.08); // C#5
        osc.frequency.setValueAtTime(659.25, now + 0.16); // E5
        gain.gain.setValueAtTime(0.25 * effectiveVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (sfxName === "sfx-match") {
        // Crisp resonant harmonic chime for successful word match
        osc.type = "sine";
        osc.frequency.setValueAtTime(880.0, now); // A5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(0.24 * effectiveVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (sfxName === "sfx-fill") {
        // Warm tactile lock sound for blank slot placement
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now); // A4
        osc.frequency.setValueAtTime(659.25, now + 0.05); // E5
        gain.gain.setValueAtTime(0.22 * effectiveVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (sfxName === "sfx-fanfare") {
        // Triumphant four-note fanfare for completing challenge
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.5, now + 0.24); // C6
        gain.gain.setValueAtTime(0.3 * effectiveVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else {
        // Subtle page-turn / narration step
        osc.type = "sine";
        osc.frequency.setValueAtTime(620, now);
        gain.gain.setValueAtTime(0.1 * effectiveVolume, now);
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
    this.updateActiveVolume();
  }

  public getVolume(): number {
    return this.masterVolume;
  }

  public setBgmVolume(volume: number) {
    this.bgmVolume = Math.min(1, Math.max(0, volume));
    this.updateActiveVolume();
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

  private updateActiveVolume() {
    const effVol = Math.min(1, Math.max(0, this.bgmVolume * this.masterVolume));
    if (this.currentBgm) {
      this.currentBgm.volume = effVol;
    }
    if (this.synthGain && this.audioCtx) {
      try {
        this.synthGain.gain.setValueAtTime(effVol * 0.75, this.audioCtx.currentTime);
      } catch {}
    }
  }

  public resumeContext() {
    const ctx = this.getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    voiceManager.setMuted(this.muted);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("hanh_trinh_do_muted", String(this.muted));
      } catch {}
    }

    if (this.muted) {
      this.stopActiveAudio();
    } else {
      // Bật lại âm: kích hoạt AudioContext nếu bị suspended và nạp lại track mục tiêu
      const ctx = this.getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      if (this.targetBgmName) {
        this.playBgm(this.targetBgmName);
      }
    }
    return this.muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public getTargetBgmName(): string | null {
    return this.targetBgmName;
  }
}

export const audioManager = new AudioManager();
