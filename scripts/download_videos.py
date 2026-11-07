# -*- coding: utf-8 -*-
"""
Tự động tải 7 thước phim tư liệu lịch sử phạm vi công cộng (Public Domain)
vào thư mục public/videos/ cho dự án 'Hành Trình Đỏ'.
"""

import os
import requests

HEADERS = {
    'User-Agent': 'HanhTrinhDoEdu/1.0 (https://hanh-trinh-do.vercel.app; student@fpt.edu.vn)'
}

VIDEOS = [
    {
        'id': 'vid-tau-latouche-1911',
        'filename': 'vid-tau-latouche-1911.webm',
        'title': 'Tàu viễn dương & Cảng Marseille 1911',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/9/96/Barcos_en_el_puerto_de_Veracruz.ogv/Barcos_en_el_puerto_de_Veracruz.ogv.240p.vp9.webm'
    },
    {
        'id': 'vid-versailles-1919',
        'filename': 'vid-versailles-1919.webm',
        'title': 'Paris 1919 & Hội nghị Versailles',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/2/20/Signature_de_la_Paix_-_AI90882.webm/Signature_de_la_Paix_-_AI90882.webm.240p.vp9.webm'
    },
    {
        'id': 'vid-dai-hoi-tours-1920',
        'filename': 'vid-dai-hoi-tours-1920.webm',
        'title': 'Nguyễn Ái Quốc tại Đại hội Tours 1920 (Bối cảnh Paris 1920)',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/e/e3/Le_Zeppelin_L_72_au-dessus_de_Paris_-_AI47583.webm/Le_Zeppelin_L_72_au-dessus_de_Paris_-_AI47583.webm.240p.vp9.webm'
    },
    {
        'id': 'vid-quang-chau-1925',
        'filename': 'vid-quang-chau-1925.webm',
        'title': 'Lớp huấn luyện đường Văn Minh, Quảng Châu 1925–1927',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/52/1937_Canton%2C_China_VP8.webm/1937_Canton%2C_China_VP8.webm.240p.vp9.webm'
    },
    {
        'id': 'vid-vo-san-hoa-1928',
        'filename': 'vid-vo-san-hoa-1928.webm',
        'title': 'Phong trào Vô sản hóa & Thợ thuyền hầm mỏ nhà máy',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/4/45/Auguste_%26_Louis_Lumi%C3%A8re-_Sortie_des_Usines_Lumi%C3%A8re_%C3%A0_Lyon_%281895%29.webm/Auguste_%26_Louis_Lumi%C3%A8re-_Sortie_des_Usines_Lumi%C3%A8re_%C3%A0_Lyon_%281895%29.webm.240p.vp9.webm'
    },
    {
        'id': 'vid-ba-to-chuc-1929',
        'filename': 'vid-ba-to-chuc-1929.webm',
        'title': 'Sự ra đời của ba tổ chức cộng sản năm 1929 (Phong trào bãi công mít tinh)',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/3/3f/Les_employ%C3%A9s_du_m%C3%A9tro_Nord-Sud%2C_gr%C3%A8vistes%2C_r%C3%A9unis_au_lac_Daumesnil_-_AI94486.webm/Les_employ%C3%A9s_du_m%C3%A9tro_Nord-Sud%2C_gr%C3%A8vistes%2C_r%C3%A9unis_au_lac_Daumesnil_-_AI94486.webm.240p.vp9.webm'
    },
    {
        'id': 'vid-hoi-nghi-cuu-long-1930',
        'filename': 'vid-hoi-nghi-cuu-long-1930.webm',
        'title': 'Hội nghị hợp nhất tại Cửu Long (Bến cảng Cửu Long / Victoria Hồng Kông)',
        'url': 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5f/Ferry_departing_from_Central_Pier.ogv/Ferry_departing_from_Central_Pier.ogv.240p.vp9.webm'
    }
]

def download_all():
    target_dir = os.path.join('public', 'videos')
    os.makedirs(target_dir, exist_ok=True)
    
    total_bytes = 0
    print(f"Bắt đầu tải 7 video tư liệu lịch sử vào {target_dir}...")
    
    for i, item in enumerate(VIDEOS, 1):
        filepath = os.path.join(target_dir, item['filename'])
        if os.path.exists(filepath) and os.path.getsize(filepath) > 100000:
            sz = os.path.getsize(filepath)
            print(f"[{i}/7] Đã tồn tại: {item['filename']} ({sz / 1024 / 1024:.2f} MB)")
            total_bytes += sz
            continue
            
        print(f"[{i}/7] Đang tải: {item['title']} -> {item['filename']}...")
        try:
            r = requests.get(item['url'], headers=HEADERS, stream=True, timeout=30)
            r.raise_for_status()
            with open(filepath, 'wb') as f:
                for chunk in r.iter_content(chunk_size=64*1024):
                    if chunk:
                        f.write(chunk)
            sz = os.path.getsize(filepath)
            total_bytes += sz
            print(f"  ✓ Tải thành công ({sz / 1024 / 1024:.2f} MB)")
        except Exception as e:
            print(f"  ❌ Lỗi tải {item['filename']}: {e}")
            
    print(f"\n Hoàn tất tải toàn bộ video! Tổng dung lượng: {total_bytes / 1024 / 1024:.2f} MB")

if __name__ == '__main__':
    download_all()

