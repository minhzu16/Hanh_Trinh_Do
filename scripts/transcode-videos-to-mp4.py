import os
import subprocess
import imageio_ffmpeg

def transcode_all():
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    videos_dir = os.path.join(os.getcwd(), "public", "videos")
    files = [f for f in os.listdir(videos_dir) if f.endswith(".webm")]
    
    print(f"Found {len(files)} webm files in {videos_dir}")
    for f in sorted(files):
        in_path = os.path.join(videos_dir, f)
        base = os.path.splitext(f)[0]
        out_path = os.path.join(videos_dir, f"{base}.mp4")
        print(f"\nTranscoding {f} -> {base}.mp4 ...")
        cmd = [
            ff, "-y",
            "-i", in_path,
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            "-profile:v", "main",
            "-preset", "fast",
            "-crf", "22",
            "-c:a", "aac",
            "-b:a", "128k",
            "-movflags", "+faststart",
            out_path
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0:
            sz_mb = os.path.getsize(out_path) / (1024 * 1024)
            print(f"✓ Success: {base}.mp4 ({sz_mb:.2f} MB)")
        else:
            print(f"✗ Failed: {res.stderr[:300]}")

if __name__ == "__main__":
    transcode_all()

