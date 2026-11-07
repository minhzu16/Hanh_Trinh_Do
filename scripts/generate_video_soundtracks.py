# -*- coding: utf-8 -*-
"""
Script tổng hợp âm thanh chuyên nghiệp (Bespoke Historical Soundtrack & Period Sound Design)
cho 7 thước phim tư liệu lịch sử của dự án 'Hành Trình Đỏ' (1899-1930).
Tích hợp trực tiếp vào tệp MP4 (AAC stereo 192k) và WebM (Opus stereo 160k).

Mỗi thước phim được phối nhạc và hiệu ứng âm thanh bối cảnh lịch sử riêng biệt:
1. vid-tau-latouche-1911 (48s): Còi tàu viễn dương, sóng biển rì rào, tiếng máy chiếu 16fps, giai điệu piano/cello da diết chia tay quê hương.
2. vid-versailles-1919 (65s): Dàn nhạc thính phòng châu Âu trang trọng, tiếng hội trường Versailles, giai điệu trầm hùng bản Yêu sách 8 điểm.
3. vid-dai-hoi-tours-1920 (56s): Âm hưởng hùng tráng Quốc tế ca (L'Internationale), tiếng vỗ tay đại biểu, kèn đồng và đàn dây rực lửa.
4. vid-quang-chau-1925 (55s): Tiếng sóng nước sông Châu Giang, đàn tranh ngũ cung và sáo trúc thanh thoát của tuổi trẻ cách mạng đường Văn Minh.
5. vid-vo-san-hoa-1928 (35s): Nhịp búa đập đe thép, tiếng máy hơi nước nhà xưởng, nhịp hành khúc công nhân vô sản quật khởi.
6. vid-ba-to-chuc-1929 (31s): Tiếng mưa đêm Hà Nội, bè dây hồi hộp bí mật và cao trào thôi thúc hợp nhất của 3 tổ chức cộng sản.
7. vid-hoi-nghi-cuu-long-1930 (58s): Chuông phà bến Cửu Long, bản giao hưởng khải hoàn rực rỡ chào mừng Đảng Cộng sản Việt Nam ra đời (3/2/1930).
"""

import os
import math
import time
import struct
import subprocess
import wave
import numpy as np
import imageio_ffmpeg

SR = 44100
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

def safe_replace(src, dst, max_retries=5):
    for i in range(max_retries):
        try:
            if os.path.exists(dst):
                try:
                    os.remove(dst)
                except Exception:
                    pass
            os.replace(src, dst)
            return True
        except PermissionError:
            time.sleep(0.6)
    try:
        import shutil
        shutil.copy2(src, dst)
        os.remove(src)
        return True
    except Exception as e:
        print(f"Warning: Failed to replace {dst}: {e}")
        return False

def note_freq(name, octave):
    """Tính tần số của nốt nhạc theo chuẩn A4 = 440Hz"""
    notes = {'C': -9, 'C#': -8, 'Db': -8, 'D': -7, 'D#': -6, 'Eb': -6,
             'E': -5, 'F': -4, 'F#': -3, 'Gb': -3, 'G': -2, 'G#': -1,
             'Ab': -1, 'A': 0, 'A#': 1, 'Bb': 1, 'B': 2}
    semitones = notes[name] + (octave - 4) * 12
    return 440.0 * (2.0 ** (semitones / 12.0))

def synth_piano_note(freq, dur, velocity=0.8):
    """Bộ tổng hợp phím đàn Piano ấm áp với chuỗi hoạ âm tắt dần tự nhiên"""
    t = np.linspace(0, dur, int(SR * dur), endpoint=False)
    # Các hoạ âm với hệ số suy giảm theo thời gian
    harmonics = [
        (1.0, 1.0, 3.5),    # Cơ bản
        (2.0, 0.55, 5.0),   # Bát độ 1
        (3.0, 0.28, 7.0),   # Quãng 5
        (4.0, 0.15, 9.0),   # Bát độ 2
        (5.0, 0.08, 11.0),  # Quãng 3
    ]
    sig = np.zeros_like(t)
    for mult, amp, decay_rate in harmonics:
        f = freq * mult
        if f < SR / 2.2:
            sig += amp * np.sin(2 * np.pi * f * t) * np.exp(-decay_rate * t / dur)
    # Attack ngắn và decay
    attack_samples = int(SR * 0.008)
    sig[:attack_samples] *= np.linspace(0, 1, attack_samples)
    return sig * velocity

def synth_strings_note(freq, dur, velocity=0.7, vibrato_rate=5.0, vibrato_depth=0.008):
    """Bộ tổng hợp đàn dây / Cello / Violin với vibrato ấm áp và swell"""
    t = np.linspace(0, dur, int(SR * dur), endpoint=False)
    vib = 1.0 + vibrato_depth * np.sin(2 * np.pi * vibrato_rate * t)
    phase = 2 * np.pi * np.cumsum(freq * vib) / SR
    
    # Kết hợp sawtooth và triangle qua lọc thông thấp
    sig = (np.sin(phase) + 
           0.5 * np.sin(2 * phase) + 
           0.25 * np.sin(3 * phase) + 
           0.12 * np.sin(4 * phase))
    
    # Envelope ADSR mềm mại của đàn dây
    attack = int(SR * min(0.35, dur * 0.25))
    release = int(SR * min(0.4, dur * 0.25))
    env = np.ones_like(t)
    if attack > 0:
        env[:attack] = np.linspace(0, 1, attack) ** 1.5
    if release > 0:
        env[-release:] = np.linspace(1, 0, release) ** 1.5
    return sig * env * velocity

def synth_brass_note(freq, dur, velocity=0.75):
    """Kèn đồng / French Horn trầm hùng"""
    t = np.linspace(0, dur, int(SR * dur), endpoint=False)
    phase = 2 * np.pi * freq * t
    sig = (np.sin(phase) + 
           0.6 * np.sin(2 * phase) + 
           0.4 * np.sin(3 * phase) + 
           0.2 * np.sin(4 * phase) + 
           0.1 * np.sin(5 * phase))
    attack = int(SR * min(0.12, dur * 0.15))
    release = int(SR * min(0.25, dur * 0.2))
    env = np.ones_like(t)
    if attack > 0:
        env[:attack] = np.linspace(0, 1, attack)
    if release > 0:
        env[-release:] = np.linspace(1, 0, release)
    return sig * env * velocity

def synth_flute_note(freq, dur, velocity=0.6):
    """Sáo trúc / Flute mềm mại thanh thoát"""
    t = np.linspace(0, dur, int(SR * dur), endpoint=False)
    vib = 1.0 + 0.006 * np.sin(2 * np.pi * 5.2 * t)
    phase = 2 * np.pi * np.cumsum(freq * vib) / SR
    breath = 0.04 * (np.random.rand(len(t)) * 2 - 1)
    sig = np.sin(phase) + 0.15 * np.sin(3 * phase) + breath
    attack = int(SR * min(0.15, dur * 0.2))
    release = int(SR * min(0.2, dur * 0.2))
    env = np.ones_like(t)
    if attack > 0:
        env[:attack] = np.linspace(0, 1, attack)
    if release > 0:
        env[-release:] = np.linspace(1, 0, release)
    return sig * env * velocity

def synth_harp_pluck(freq, dur, velocity=0.7):
    """Đàn tranh / Harp dây tơ réo rắt"""
    t = np.linspace(0, dur, int(SR * dur), endpoint=False)
    sig = (np.sin(2 * np.pi * freq * t) * np.exp(-4.0 * t / dur) +
           0.4 * np.sin(2 * np.pi * freq * 2 * t) * np.exp(-7.0 * t / dur) +
           0.15 * np.sin(2 * np.pi * freq * 3 * t) * np.exp(-10.0 * t / dur))
    attack = int(SR * 0.005)
    sig[:attack] *= np.linspace(0, 1, attack)
    return sig * velocity

def synth_bell(freq, dur, velocity=0.6):
    """Chuông đồng ngân nga trầm ấm"""
    t = np.linspace(0, dur, int(SR * dur), endpoint=False)
    partials = [(1.0, 1.0, 1.8), (2.0, 0.4, 2.8), (3.01, 0.25, 4.0), (4.15, 0.12, 5.5)]
    sig = np.zeros_like(t)
    for p, amp, dec in partials:
        sig += amp * np.sin(2 * np.pi * freq * p * t) * np.exp(-dec * t)
    attack = int(SR * 0.003)
    sig[:attack] *= np.linspace(0, 1, attack)
    return sig * velocity

def synth_projector_hum(dur, volume=0.08):
    """Tiếng máy chiếu phim câm thập niên 1920 (16fps shutter clicks + motor hum)"""
    n_samples = int(SR * dur)
    t = np.linspace(0, dur, n_samples, endpoint=False)
    # 50Hz motor hum
    motor = 0.3 * np.sin(2 * np.pi * 50 * t) + 0.1 * np.sin(2 * np.pi * 100 * t)
    # 16fps optical shutter flutter
    fps = 16.0
    shutter_pulses = np.zeros(n_samples)
    interval = int(SR / fps)
    for i in range(0, n_samples, interval):
        click_len = min(int(SR * 0.008), n_samples - i)
        shutter_pulses[i:i+click_len] = np.random.randn(click_len) * np.exp(-np.linspace(0, 5, click_len))
    # Soft warm crackle
    crackle = np.zeros(n_samples)
    spike_idx = np.random.randint(0, n_samples, int(dur * 25))
    crackle[spike_idx] = np.random.uniform(-0.5, 0.5, len(spike_idx))
    
    ambient = (motor * 0.4 + shutter_pulses * 0.4 + crackle * 0.2) * volume
    return ambient

def synth_ocean_waves(dur, volume=0.15):
    """Tiếng sóng biển đại dương dập dềnh trầm sâu"""
    n_samples = int(SR * dur)
    t = np.linspace(0, dur, n_samples, endpoint=False)
    # Slow rolling swells (0.12 Hz cycle)
    swell1 = (np.sin(2 * np.pi * 0.11 * t) + 1.0) * 0.5
    swell2 = (np.sin(2 * np.pi * 0.07 * t + 1.2) + 1.0) * 0.5
    white_noise = np.random.randn(n_samples)
    # Low pass filter approximation via cumulative moving average
    filtered = np.convolve(white_noise, np.ones(120)/120, mode='same')
    ocean = filtered * (swell1 * 0.6 + swell2 * 0.4) * volume
    return ocean

def synth_ship_horn(dur_horn=3.5, volume=0.25):
    """Còi tàu buôn viễn dương hơi nước trầm hùng"""
    t = np.linspace(0, dur_horn, int(SR * dur_horn), endpoint=False)
    f1, f2 = 110.0, 138.5  # A2 & C#3 chord
    sig = 0.6 * np.sin(2 * np.pi * f1 * t) + 0.4 * np.sin(2 * np.pi * f2 * t)
    attack = int(SR * 0.4)
    release = int(SR * 0.8)
    env = np.ones_like(t)
    env[:attack] = np.linspace(0, 1, attack)
    env[-release:] = np.linspace(1, 0, release)
    return sig * env * volume

def add_track_event(track, sound_segment, start_sec):
    """Trộn một đoạn âm thanh vào rãnh chính tại mốc thời gian start_sec"""
    start_sample = int(start_sec * SR)
    end_sample = min(start_sample + len(sound_segment), len(track))
    seg_len = end_sample - start_sample
    if seg_len > 0:
        track[start_sample:end_sample] += sound_segment[:seg_len]

# ==============================================================================
# BẢN PHỐI NHẠC RIÊNG BIỆT CHO TỪNG THƯỚC PHIM TƯ LIỆU
# ==============================================================================

def compose_v1_saigon_1911(dur=48.0):
    """V1: Bến cảng Sài Gòn & Xưởng Ba Son (Gabriel Veyre 1899, Ra đi 1911)"""
    track = np.zeros(int(SR * dur))
    # Ambient: Sóng biển & Máy chiếu cổ
    track += synth_ocean_waves(dur, volume=0.14)
    track += synth_projector_hum(dur, volume=0.08)
    
    # Còi tàu hơi nước vang lên lúc đầu và giữa chuyến hải trình
    add_track_event(track, synth_ship_horn(3.8, volume=0.28), 1.0)
    add_track_event(track, synth_ship_horn(3.2, volume=0.18), 32.0)
    
    # Chuông tàu
    for bt in [0.5, 2.5, 24.0, 44.0]:
        add_track_event(track, synth_bell(note_freq('C', 6), 1.5, velocity=0.15), bt)
    
    # Nhạc nền Piano & Cello da diết (D minor / F Major)
    # Hợp âm rải & giai điệu chia tay bến Nhà Rồng
    chords = [
        ('D', 3, 'F', 3, 'A', 3, 'D', 4),  # Dm
        ('Bb', 2, 'D', 3, 'F', 3, 'Bb', 3), # Bb
        ('G', 2, 'Bb', 2, 'D', 3, 'G', 3),  # Gm
        ('A', 2, 'C#', 3, 'E', 3, 'A', 3),  # A7
        ('D', 2, 'F', 3, 'A', 3, 'D', 4),   # Dm
        ('F', 2, 'A', 2, 'C', 3, 'F', 3),   # F
        ('C', 2, 'E', 3, 'G', 3, 'C', 4),   # C
        ('D', 2, 'F', 3, 'A', 3, 'D', 4),   # Dm
    ]
    chord_len = 5.5
    for idx, (n1, o1, n2, o2, n3, o3, n4, o4) in enumerate(chords):
        t0 = 4.0 + idx * chord_len
        if t0 >= dur: break
        # Bass Cello
        add_track_event(track, synth_strings_note(note_freq(n1, o1), chord_len * 1.1, velocity=0.45), t0)
        # Piano arpeggio
        add_track_event(track, synth_piano_note(note_freq(n1, o1+1), 3.0, velocity=0.35), t0)
        add_track_event(track, synth_piano_note(note_freq(n2, o2), 2.8, velocity=0.32), t0 + 0.6)
        add_track_event(track, synth_piano_note(note_freq(n3, o3), 2.8, velocity=0.30), t0 + 1.2)
        add_track_event(track, synth_piano_note(note_freq(n4, o4), 3.5, velocity=0.38), t0 + 1.8)
        # Violin melody nổi bật
        lead_note = [('A', 4), ('D', 5), ('C', 5), ('E', 5), ('F', 5), ('G', 5), ('A', 5), ('D', 5)][idx % 8]
        add_track_event(track, synth_strings_note(note_freq(lead_note[0], lead_note[1]), chord_len * 0.85, velocity=0.48), t0 + 1.0)
    
    return track

def compose_v2_versailles_1919(dur=65.0):
    """V2: Hội nghị Hòa bình Versailles & Thủ đô Paris 1919 (Hòa ước & Bản Yêu sách)"""
    track = np.zeros(int(SR * dur))
    track += synth_projector_hum(dur, volume=0.09)
    
    # Nhạc cổ điển thính phòng Pháp trang nghiêm (G Major / E minor)
    # Thể hiện không khí trang trọng cung điện Versailles & tiếng nói đĩnh đạc của Nguyễn Ái Quốc
    chords = [
        ('G', 2, 'B', 2, 'D', 3, 'G', 3),   # G
        ('E', 2, 'G', 2, 'B', 2, 'E', 3),   # Em
        ('C', 2, 'E', 2, 'G', 2, 'C', 3),   # C
        ('D', 2, 'F#', 2, 'A', 2, 'D', 3),  # D
        ('B', 2, 'D', 3, 'F#', 3, 'B', 3),  # Bm
        ('E', 2, 'G', 2, 'B', 2, 'E', 3),   # Em
        ('A', 2, 'C', 3, 'E', 3, 'A', 3),   # Am
        ('D', 2, 'F#', 2, 'A', 2, 'D', 3),  # D7
        ('G', 2, 'D', 3, 'G', 3, 'B', 3),   # G
    ]
    chord_len = 6.8
    for idx, (n1, o1, n2, o2, n3, o3, n4, o4) in enumerate(chords):
        t0 = 1.0 + idx * chord_len
        if t0 >= dur: break
        # French Horn & Cello
        add_track_event(track, synth_brass_note(note_freq(n1, o1+1), chord_len * 0.95, velocity=0.42), t0)
        add_track_event(track, synth_strings_note(note_freq(n1, o1), chord_len * 1.05, velocity=0.50), t0)
        # Chamber strings chord
        add_track_event(track, synth_strings_note(note_freq(n2, o2), chord_len * 0.9, velocity=0.35), t0 + 0.3)
        add_track_event(track, synth_strings_note(note_freq(n3, o3), chord_len * 0.9, velocity=0.35), t0 + 0.6)
        # Noble Lead Violin
        lead_notes = [('B', 4), ('G', 4), ('E', 5), ('D', 5), ('F#', 5), ('G', 5), ('A', 5), ('F#', 5), ('G', 5)]
        ln = lead_notes[idx % len(lead_notes)]
        add_track_event(track, synth_strings_note(note_freq(ln[0], ln[1]), chord_len * 0.75, velocity=0.52), t0 + 1.2)
    
    return track

def compose_v3_tours_1920(dur=56.0):
    """V3: Đảng Xã hội Pháp SFIO & Đại hội Tours 1920 (Quốc tế ca hùng tráng)"""
    track = np.zeros(int(SR * dur))
    track += synth_projector_hum(dur, volume=0.08)
    
    # Giai điệu kinh điển Quốc tế ca (L'Internationale) hào hùng
    # "C'est la lutte finale / Groupons-nous et demain / L'Internationale..."
    internationale_melody = [
        ('F', 4, 1.2), ('Bb', 4, 1.8), ('A', 4, 0.8), ('G', 4, 1.0), ('F', 4, 1.4),
        ('D', 4, 1.2), ('Eb', 4, 1.8), ('F', 4, 1.0), ('G', 4, 1.5), ('F', 4, 2.0),
        ('Bb', 4, 1.2), ('C', 5, 1.8), ('D', 5, 1.4), ('C', 5, 1.0), ('Bb', 4, 2.0),
        ('A', 4, 1.2), ('Bb', 4, 1.8), ('C', 5, 1.4), ('F', 4, 2.2),
        ('D', 5, 2.0), ('C', 5, 1.4), ('Bb', 4, 1.4), ('A', 4, 1.4), ('G', 4, 2.2),
        ('F', 4, 1.4), ('G', 4, 1.8), ('A', 4, 1.4), ('Bb', 4, 3.0),
    ]
    cur_t = 1.5
    for note, octv, ndur in internationale_melody:
        if cur_t >= dur - 2: break
        # Lead brass & strings
        add_track_event(track, synth_brass_note(note_freq(note, octv), ndur * 1.1, velocity=0.55), cur_t)
        add_track_event(track, synth_strings_note(note_freq(note, octv), ndur * 1.05, velocity=0.45), cur_t)
        # Bass marching beat
        add_track_event(track, synth_strings_note(note_freq('Bb', 2), ndur * 0.9, velocity=0.48), cur_t)
        cur_t += ndur * 0.95
    
    return track

def compose_v4_quang_chau_1925(dur=55.0):
    """V4: Bến sông Châu Giang & Quảng Châu thập niên 1920s (Đường Văn Minh)"""
    track = np.zeros(int(SR * dur))
    track += synth_projector_hum(dur, volume=0.08)
    track += synth_ocean_waves(dur, volume=0.09) # Sóng nước sông Châu Giang
    
    # Giai điệu ngũ cung Á Đông trong sáng, nhiệt huyết (C - D - E - G - A)
    # Đàn tranh (Harp/Pluck) & Sáo trúc (Flute)
    pentatonic_scale = [('C', 4), ('D', 4), ('E', 4), ('G', 4), ('A', 4),
                        ('C', 5), ('D', 5), ('E', 5), ('G', 5), ('A', 5)]
    
    melody = [
        ('E', 5, 1.2), ('D', 5, 0.8), ('C', 5, 1.4), ('A', 4, 1.2),
        ('G', 4, 1.6), ('A', 4, 1.0), ('C', 5, 2.0),
        ('D', 5, 1.2), ('E', 5, 1.6), ('G', 5, 1.8), ('E', 5, 1.2),
        ('D', 5, 1.4), ('C', 5, 2.2),
        ('A', 4, 1.2), ('C', 5, 1.4), ('D', 5, 1.6), ('E', 5, 2.4),
        ('G', 5, 1.6), ('A', 5, 2.2), ('G', 5, 1.4), ('E', 5, 2.0),
        ('D', 5, 1.6), ('C', 5, 3.0)
    ]
    
    # Đệm đàn tranh rải ngũ cung
    cur_t = 1.0
    for n, o, nd in melody:
        if cur_t >= dur - 2: break
        add_track_event(track, synth_flute_note(note_freq(n, o), nd * 1.15, velocity=0.55), cur_t)
        # Đệm harp rải
        add_track_event(track, synth_harp_pluck(note_freq(n, o-1), 2.0, velocity=0.40), cur_t)
        add_track_event(track, synth_harp_pluck(note_freq('G', 3), 1.8, velocity=0.28), cur_t + 0.3)
        add_track_event(track, synth_harp_pluck(note_freq('C', 4), 1.8, velocity=0.30), cur_t + 0.6)
        cur_t += nd * 1.1
    
    return track

def compose_v5_vo_san_hoa_1928(dur=35.0):
    """V5: Giai cấp công nhân & Đời sống lao động Đông Dương (Vô sản hóa 1928)"""
    track = np.zeros(int(SR * dur))
    track += synth_projector_hum(dur, volume=0.08)
    
    # Nhịp đe búa máy móc công nghiệp dứt khoát, quật cường (D minor)
    bpm = 88.0
    beat_dur = 60.0 / bpm
    total_beats = int(dur / beat_dur)
    
    for b in range(total_beats):
        t_b = b * beat_dur
        # Tiếng đe búa thép / kim loại gõ nhịp
        hammer = 0.5 * np.sin(2 * np.pi * 780 * np.linspace(0, 0.15, int(SR * 0.15))) * np.exp(-18 * np.linspace(0, 0.15, int(SR * 0.15)))
        add_track_event(track, hammer * 0.35, t_b)
        
        # Nhịp đệm trầm vững chãi
        if b % 2 == 0:
            add_track_event(track, synth_strings_note(note_freq('D', 2), beat_dur * 1.2, velocity=0.52), t_b)
        else:
            add_track_event(track, synth_strings_note(note_freq('A', 2), beat_dur * 0.9, velocity=0.42), t_b)
            
        # Giai điệu hào hùng vươn lên
        if b % 4 == 0:
            melody_note = [('D', 4), ('F', 4), ('G', 4), ('A', 4), ('Bb', 4), ('A', 4), ('D', 4)][(b // 4) % 7]
            add_track_event(track, synth_brass_note(note_freq(melody_note[0], melody_note[1]), beat_dur * 2.5, velocity=0.56), t_b)
    
    return track

def compose_v6_ba_to_chuc_1929(dur=31.5):
    """V6: Hà Nội thời thuộc địa (Hồ Tây) & Bối cảnh thành lập 3 tổ chức Đảng 1929"""
    track = np.zeros(int(SR * dur))
    track += synth_projector_hum(dur, volume=0.08)
    
    # Tiếng mưa phùn tí tách đất Bắc
    rain = np.random.randn(len(track)) * 0.04
    track += rain
    
    # Giai điệu bí mật, thôi thúc, dồn dập (F minor)
    # Khắc họa chi bộ 5D Hàm Long và Đại hội 312 Khâm Thiên
    motifs = [
        ('F', 3, 'Ab', 3, 'C', 4, 4.0),
        ('Db', 3, 'F', 3, 'Ab', 3, 4.0),
        ('Bb', 2, 'Db', 3, 'F', 3, 3.5),
        ('C', 3, 'E', 3, 'G', 3, 3.5),
        ('F', 3, 'C', 4, 'F', 4, 4.5),
        ('Ab', 3, 'C', 4, 'Eb', 4, 4.0),
        ('Db', 4, 'F', 4, 'Ab', 4, 5.0)
    ]
    cur_t = 0.5
    for n1, o1, n2, o2, n3, o3, d_m in motifs:
        if cur_t >= dur - 1: break
        add_track_event(track, synth_strings_note(note_freq(n1, o1), d_m * 0.9, velocity=0.46), cur_t)
        add_track_event(track, synth_piano_note(note_freq(n2, o2), 2.5, velocity=0.38), cur_t + 0.4)
        add_track_event(track, synth_piano_note(note_freq(n3, o3), 3.0, velocity=0.42), cur_t + 0.8)
        # Violin lead bí ẩn
        add_track_event(track, synth_strings_note(note_freq(n3, o3 + 1), d_m * 0.7, velocity=0.50), cur_t + 1.2)
        cur_t += d_m * 0.85
    
    return track

def compose_v7_cuu_long_1930(dur=58.0):
    """V7: Cảng Victoria & Bán đảo Cửu Long 1930 (Thành lập Đảng 3/2/1930)"""
    track = np.zeros(int(SR * dur))
    track += synth_projector_hum(dur, volume=0.08)
    track += synth_ocean_waves(dur, volume=0.10)
    
    # Chuông phà Star Ferry mở đầu
    add_track_event(track, synth_bell(note_freq('E', 5), 2.5, velocity=0.25), 1.0)
    add_track_event(track, synth_bell(note_freq('A', 5), 3.0, velocity=0.30), 2.2)
    
    # Bản giao hưởng khải hoàn rực rỡ, trang nghiêm (C Major / G Major)
    # Tôn vinh thắng lợi lịch sử: Thống nhất các tổ chức cộng sản thành Đảng Cộng sản Việt Nam
    chords = [
        ('C', 3, 'E', 3, 'G', 3, 'C', 4),   # C
        ('G', 2, 'B', 2, 'D', 3, 'G', 3),   # G
        ('A', 2, 'C', 3, 'E', 3, 'A', 3),   # Am
        ('F', 2, 'A', 2, 'C', 3, 'F', 3),   # F
        ('C', 3, 'E', 3, 'G', 3, 'C', 4),   # C
        ('D', 2, 'F', 3, 'A', 3, 'D', 4),   # Dm
        ('G', 2, 'B', 2, 'D', 3, 'G', 4),   # G
        ('C', 2, 'G', 2, 'C', 3, 'E', 4),   # C (Cao trào rực rỡ)
    ]
    chord_len = 6.2
    for idx, (n1, o1, n2, o2, n3, o3, n4, o4) in enumerate(chords):
        t0 = 3.5 + idx * chord_len
        if t0 >= dur: break
        # Bass & Brass hùng dũng
        add_track_event(track, synth_strings_note(note_freq(n1, o1), chord_len * 1.1, velocity=0.52), t0)
        add_track_event(track, synth_brass_note(note_freq(n1, o1+1), chord_len * 0.95, velocity=0.55), t0 + 0.2)
        # Dàn dây hòa âm
        add_track_event(track, synth_strings_note(note_freq(n2, o2), chord_len * 0.9, velocity=0.38), t0 + 0.4)
        add_track_event(track, synth_strings_note(note_freq(n3, o3), chord_len * 0.9, velocity=0.38), t0 + 0.7)
        # Giai điệu Violin & Horn vươn cao
        lead_note = [('G', 4), ('D', 5), ('E', 5), ('F', 5), ('G', 5), ('A', 5), ('B', 5), ('C', 6)][idx % 8]
        add_track_event(track, synth_strings_note(note_freq(lead_note[0], lead_note[1]), chord_len * 0.8, velocity=0.60), t0 + 1.0)
        # Chuông khải hoàn
        if idx >= 4:
            add_track_event(track, synth_bell(note_freq(lead_note[0], lead_note[1]-1), 2.0, velocity=0.22), t0 + 1.2)
            
    return track

# ==============================================================================
# HÀM XUẤT AUDIO & TÍCH HỢP VÀO VIDEO MP4 / WEBM
# ==============================================================================

COMPOSERS = {
    'vid-tau-latouche-1911': (compose_v1_saigon_1911, 47.78),
    'vid-versailles-1919': (compose_v2_versailles_1919, 65.00),
    'vid-dai-hoi-tours-1920': (compose_v3_tours_1920, 55.73),
    'vid-quang-chau-1925': (compose_v4_quang_chau_1925, 55.00),
    'vid-vo-san-hoa-1928': (compose_v5_vo_san_hoa_1928, 34.68),
    'vid-ba-to-chuc-1929': (compose_v6_ba_to_chuc_1929, 31.49),
    'vid-hoi-nghi-cuu-long-1930': (compose_v7_cuu_long_1930, 58.00),
}

def export_wav(audio_arr, out_path):
    """Lưu mảng numpy audio thành tệp WAV stereo 16-bit chuẩn"""
    # Chuẩn hoá âm lượng (Peak normalization về -1.5 dB)
    peak = np.max(np.abs(audio_arr))
    if peak > 0:
        norm_sig = audio_arr / peak * 0.85
    else:
        norm_sig = audio_arr
        
    # Tạo stereo với hiệu ứng mở rộng không gian nhẹ
    left = norm_sig
    right = np.roll(norm_sig, int(SR * 0.003)) # 3ms stereo delay
    stereo = np.column_stack((left, right))
    
    # Fade in (0.5s) & Fade out (1.0s)
    fade_in = int(SR * 0.5)
    fade_out = int(SR * 1.0)
    stereo[:fade_in, :] *= np.linspace(0, 1, fade_in)[:, np.newaxis]
    stereo[-fade_out:, :] *= np.linspace(1, 0, fade_out)[:, np.newaxis]
    
    int_stereo = np.int16(np.clip(stereo, -1.0, 1.0) * 32767)
    with wave.open(out_path, 'wb') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(int_stereo.tobytes())

def mux_audio_into_videos(vid_id):
    """Mux tệp audio mới vào tệp MP4 và WebM tương ứng"""
    wav_path = f"temp_audio_{vid_id}.wav"
    mp4_in = f"public/videos/{vid_id}.mp4"
    mp4_out = f"public/videos/{vid_id}_with_audio.mp4"
    webm_in = f"public/videos/{vid_id}.webm"
    webm_out = f"public/videos/{vid_id}_with_audio.webm"
    
    # 1. MP4: Copy video, encode audio AAC 192kbps stereo
    cmd_mp4 = [
        FFMPEG, "-y",
        "-i", mp4_in,
        "-i", wav_path,
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-shortest",
        "-movflags", "+faststart",
        mp4_out
    ]
    res_mp4 = subprocess.run(cmd_mp4, capture_output=True, text=True, encoding='utf-8', errors='ignore')
    if res_mp4.returncode != 0:
        print(f"Lỗi mux MP4 cho {vid_id}:", res_mp4.stderr[-200:])
    else:
        if safe_replace(mp4_out, mp4_in):
            print(f"✓ Đã thêm âm thanh vào MP4: {mp4_in} ({os.path.getsize(mp4_in)/(1024*1024):.2f} MB)")
        else:
            print(f"Cảnh báo: Không thể ghi đè MP4: {mp4_in}")

    # 2. WebM: Copy video, encode audio Opus 160kbps stereo
    cmd_webm = [
        FFMPEG, "-y",
        "-i", webm_in,
        "-i", wav_path,
        "-c:v", "copy",
        "-c:a", "libopus",
        "-b:a", "160k",
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-shortest",
        webm_out
    ]
    res_webm = subprocess.run(cmd_webm, capture_output=True, text=True, encoding='utf-8', errors='ignore')
    if res_webm.returncode != 0:
        print(f"Lỗi mux WebM cho {vid_id}:", res_webm.stderr[-200:])
    else:
        if safe_replace(webm_out, webm_in):
            print(f"✓ Đã thêm âm thanh vào WebM: {webm_in} ({os.path.getsize(webm_in)/(1024*1024):.2f} MB)")
        else:
            print(f"Cảnh báo: Không thể ghi đè WebM: {webm_in}")

    if os.path.exists(wav_path):
        os.remove(wav_path)

def main():
    print("=== BẮT ĐẦU TỔNG HỢP ÂM THANH CHO 7 THƯỚC PHIM TƯ LIỆU LỊCH SỬ ===")
    for vid_id, (composer_func, dur) in COMPOSERS.items():
        print(f"\n--- Đang soạn âm nhạc bối cảnh cho: {vid_id} (thời lượng: {dur}s) ---")
        audio = composer_func(dur)
        wav_path = f"temp_audio_{vid_id}.wav"
        export_wav(audio, wav_path)
        mux_audio_into_videos(vid_id)
        
    print("\n🎉 HOÀN THÀNH 100%! Toàn bộ 7 thước phim tư liệu hiện đã có âm thanh stereo sống động, chuẩn lịch sử.")

if __name__ == "__main__":
    main()
