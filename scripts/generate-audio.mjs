// Script to generate authentic 16-bit PCM WAV audio loops for "Hành Trình Đỏ"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "../public/audio");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const SAMPLE_RATE = 22050; // Optimized sample rate for web visual novel loops

function createWavHeader(numSamples, sampleRate = SAMPLE_RATE) {
  const numChannels = 1; // Mono
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * bytesPerSample;
  const buffer = Buffer.alloc(44);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  return buffer;
}

function writeWav(filename, generateSample, durationSec) {
  const numSamples = Math.floor(SAMPLE_RATE * durationSec);
  const header = createWavHeader(numSamples);
  const dataBuffer = Buffer.alloc(numSamples * 2);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Loop fade at the boundaries to prevent clicks
    let envelope = 1;
    const fadeLen = 0.5;
    if (t < fadeLen) {
      envelope = t / fadeLen;
    } else if (t > durationSec - fadeLen) {
      envelope = (durationSec - t) / fadeLen;
    }

    const sample = Math.max(-1, Math.min(1, generateSample(t, durationSec))) * envelope;
    const intSample = Math.floor(sample * 32767);
    dataBuffer.writeInt16LE(intSample, i * 2);
  }

  const fullBuffer = Buffer.concat([header, dataBuffer]);
  const wavPath = path.join(outDir, `${filename}.wav`);
  const mp3Path = path.join(outDir, `${filename}.mp3`); // Duplicate as mp3 filename fallback for browsers
  fs.writeFileSync(wavPath, fullBuffer);
  fs.writeFileSync(mp3Path, fullBuffer);
  console.log(`Generated: ${filename}.wav (${(fullBuffer.length / 1024).toFixed(1)} KB)`);
}

// 1. bgm-song-bien: Biển đêm Bến Nhà Rồng (1911)
// Ocean wave swells + Melancholic pentatonic cello drone
writeWav("bgm-song-bien", (t, total) => {
  // Ocean surf wave swell using modulated noise
  const swellFreq = 0.12; // 8-second wave period
  const waveCycle = 0.5 + 0.5 * Math.sin(2 * Math.PI * swellFreq * t);
  const noise = (Math.random() * 2 - 1) * waveCycle * 0.22;

  // Cello drone in D minor: D2 (73.4Hz) + A2 (110Hz) + F3 (174.6Hz)
  const d2 = Math.sin(2 * Math.PI * 73.42 * t) * 0.28;
  const a2 = Math.sin(2 * Math.PI * 110.0 * t + 0.5) * 0.18;
  const f3 = Math.sin(2 * Math.PI * 174.61 * t + 1.0) * 0.12;

  // Soft pentatonic chime note
  const chimeTime = t % 4.0;
  const chimeFreq = chimeTime < 2 ? 293.66 : 329.63; // D4 or E4
  const chimeEnv = Math.exp(-chimeTime * 1.5);
  const chime = Math.sin(2 * Math.PI * chimeFreq * t) * chimeEnv * 0.08;

  return (noise + d2 + a2 + f3 + chime) * 0.7;
}, 16.0);

// 2. bgm-day-dan-dang: Paris 1920 - Đọc Luận cương Lênin
// Awakening harmonic chords + L'Internationale gentle motif
writeWav("bgm-day-dan-dang", (t, total) => {
  // Chord progression: Dm -> Bb -> C -> F (4s each, 16s loop)
  const chordIdx = Math.floor((t % 16) / 4);
  const chords = [
    [146.83, 220.0, 261.63], // Dm (D3, A3, C4)
    [116.54, 174.61, 233.08], // Bb (Bb2, F3, Bb3)
    [130.81, 196.0, 261.63], // C (C3, G3, C4)
    [174.61, 220.0, 261.63]  // F (F3, A3, C4)
  ];
  const [f1, f2, f3] = chords[chordIdx];

  // Soft rich string pad with subtle chorus vibrato
  const vibrato = 1 + 0.004 * Math.sin(2 * Math.PI * 4 * t);
  const pad =
    Math.sin(2 * Math.PI * f1 * vibrato * t) * 0.22 +
    Math.sin(2 * Math.PI * f2 * t) * 0.18 +
    Math.sin(2 * Math.PI * f3 * vibrato * t) * 0.15;

  // Warm gentle melody motif
  const noteIdx = Math.floor((t % 4) / 0.5);
  const notes = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 392.0, 349.23];
  const melFreq = notes[noteIdx % notes.length];
  const noteTime = (t % 0.5) * 2;
  const melEnv = Math.exp(-noteTime * 2.0);
  const mel = Math.sin(2 * Math.PI * melFreq * t) * melEnv * 0.12;

  return (pad + mel) * 0.75;
}, 16.0);

// 3. bgm-hanh-quan: Hành quân vạn dặm Mátxcơva - Quảng Châu (1924)
// Resolute marching pulse + Siberian train rhythm + Brass arpeggio
writeWav("bgm-hanh-quan", (t, total) => {
  // Marching beat tempo: 100 bpm -> beat = 0.6s
  const beatTime = t % 0.6;
  const beatEnv = Math.exp(-beatTime * 8);
  const bassDrum = Math.sin(2 * Math.PI * (65 - beatTime * 50) * t) * beatEnv * 0.35;

  // Train steam rhythmic puff
  const trainPuff = (Math.random() * 2 - 1) * Math.exp(-(t % 0.3) * 15) * 0.1;

  // Stately revolutionary march melody (A minor)
  const barIdx = Math.floor((t % 12) / 3);
  const bassNotes = [110.0, 130.81, 146.83, 164.81]; // A2, C3, D3, E3
  const bassLine = Math.sin(2 * Math.PI * bassNotes[barIdx] * t) * 0.25;

  // Horn flourish
  const hornTime = (t % 1.5) / 1.5;
  const hornFreq = 220 + (Math.floor(t % 3) * 55);
  const horn = Math.sin(2 * Math.PI * hornFreq * t) * (1 - hornTime) * 0.15;

  return (bassDrum + trainPuff + bassLine + horn) * 0.75;
}, 12.0);

// 4. bgm-hoi-hop: Đêm bí mật Cửu Long (1929–1930)
// Tense clock ticking + Deep suspenseful drone + Eerie chimes
writeWav("bgm-hoi-hop", (t, total) => {
  // Clock ticking (1 tick per second)
  const tickTime = t % 1.0;
  const tick = Math.sin(2 * Math.PI * 1800 * t) * Math.exp(-tickTime * 45) * 0.18;

  // Dark brooding sub-bass drone: C#2 (69.3Hz) + G#2 (103.8Hz)
  const drone =
    Math.sin(2 * Math.PI * 69.3 * t) * 0.3 +
    Math.sin(2 * Math.PI * 103.83 * t) * 0.2;

  // Suspenseful high metallic ping
  const pingTime = t % 4.0;
  const ping = Math.sin(2 * Math.PI * 880 * t) * Math.exp(-pingTime * 1.8) * 0.08;

  return (tick + drone + ping) * 0.7;
}, 16.0);

// 5. bgm-chu-de-chinh: Khúc tráng ca mùa xuân - Thành lập Đảng 1930
// Triumphant anthem in C Major + Radiant sunrise chimes
writeWav("bgm-chu-de-chinh", (t, total) => {
  // Majestic chord sequence: C -> G -> Am -> F (4s each, 16s loop)
  const chordIdx = Math.floor((t % 16) / 4);
  const chords = [
    [130.81, 164.81, 196.0, 261.63], // C major
    [98.0, 146.83, 196.0, 246.94],   // G major
    [110.0, 130.81, 164.81, 220.0],  // A minor
    [87.31, 130.81, 174.61, 220.0]   // F major
  ];
  const [c1, c2, c3, c4] = chords[chordIdx];

  const organPad =
    Math.sin(2 * Math.PI * c1 * t) * 0.22 +
    Math.sin(2 * Math.PI * c2 * t) * 0.18 +
    Math.sin(2 * Math.PI * c3 * t) * 0.16 +
    Math.sin(2 * Math.PI * c4 * t) * 0.12;

  // Triumphant soaring melody
  const melNotes = [261.63, 329.63, 392.0, 523.25, 440.0, 392.0, 349.23, 329.63];
  const melStep = Math.floor((t % 8) / 1.0);
  const melTime = t % 1.0;
  const melEnv = Math.exp(-melTime * 1.2);
  const melLead = Math.sin(2 * Math.PI * melNotes[melStep] * t) * melEnv * 0.16;

  return (organPad + melLead) * 0.75;
}, 16.0);

console.log("All 5 historical BGM audio loops successfully generated in public/audio/");
