export interface HistoricalPhotoMeta {
  collectibleId: string;
  photoUrl: string;
  realTitle: string;
  archiveSource: string;
  note: string;
}

export interface HistoricalPortraitMeta {
  id: string;
  name: string;
  photoUrl: string;
  period: string;
  role: string;
}

export interface HistoricalGalleryItem {
  id: string;
  title: string;
  photoUrl: string;
  year: string;
  caption: string;
  source: string;
}

export const HISTORICAL_COLLECTIBLE_PHOTOS: Record<string, HistoricalPhotoMeta> = {
  "tl-bao-nhan-dao": {
    collectibleId: "tl-bao-nhan-dao",
    photoUrl: "/images/collectibles/tl-bao-nhan-dao.webp",
    realTitle: "Trang nhất Báo L'Humanité số 16-17/7/1920",
    archiveSource: "Thư viện Quốc gia Pháp (BnF Gallica) / Báo L'Humanité",
    note: "Đăng toàn văn Sơ thảo lần thứ nhất những Luận cương về vấn đề dân tộc và thuộc địa của V.I. Lênin."
  },
  "tl-ban-yeu-sach": {
    collectibleId: "tl-ban-yeu-sach",
    photoUrl: "/images/collectibles/tl-ban-yeu-sach.webp",
    realTitle: "Bản Yêu sách Tám điểm của nhân dân An Nam (18/6/1919)",
    archiveSource: "Bảo tàng Lịch sử Quốc gia / Trung tâm Lưu trữ Quốc gia Pháp (ANOM)",
    note: "Bản in Revendications du peuple annamite do Nguyễn Ái Quốc ký tên gửi tới Hội nghị Vécxay (Versailles)."
  },
  "tl-dai-hoi-tours": {
    collectibleId: "tl-dai-hoi-tours",
    photoUrl: "/images/collectibles/tl-dai-hoi-tours.webp",
    realTitle: "Chân dung Nguyễn Ái Quốc tại Paris (thời kỳ Đại hội Tua (Tours) 1920)",
    archiveSource: "Bảo tàng Hồ Chí Minh / Kho lưu trữ Paris 1920",
    note: "Bức ảnh chụp người thanh niên yêu nước 30 tuổi thời điểm tham gia sáng lập Đảng Cộng sản Pháp tháng 12/1920."
  },
  "tl-bao-thanh-nien": {
    collectibleId: "tl-bao-thanh-nien",
    photoUrl: "/images/collectibles/tl-bao-thanh-nien.webp",
    realTitle: "Bản gốc số 1 Báo Thanh Niên ra ngày 21/6/1925",
    archiveSource: "Bảo tàng Báo chí Cách mạng Việt Nam / Bảo tàng Lịch sử Quốc gia",
    note: "Cơ quan ngôn luận của Hội Việt Nam Cách mạng Thanh niên do Nguyễn Ái Quốc sáng lập tại Quảng Châu."
  },
  "tl-duong-cach-menh": {
    collectibleId: "tl-duong-cach-menh",
    photoUrl: "/images/collectibles/tl-duong-cach-menh.webp",
    realTitle: "Bìa cuốn 'Đường Kách Mệnh' xuất bản năm 1927",
    archiveSource: "Bảo vật Quốc gia số 11 — Bảo tàng Lịch sử Quốc gia",
    note: "Tác phẩm lý luận chính trị nền tảng, tập hợp bài giảng của Nguyễn Ái Quốc cho cán bộ cách mạng tại Quảng Châu."
  },
  "tl-so-nha-5d-ham-long": {
    collectibleId: "tl-so-nha-5d-ham-long",
    photoUrl: "/images/collectibles/tl-so-nha-5d-ham-long.webp",
    realTitle: "Di tích Nhà số 5D phố Hàm Long, Hà Nội",
    archiveSource: "Ban Quản lý Di tích Danh thắng Hà Nội / Thông tấn xã Việt Nam",
    note: "Nơi thành lập Chi bộ Cộng sản đầu tiên tại Việt Nam vào cuối tháng 3 năm 1929 gồm 7 đồng chí."
  },
  "tl-so-nha-312-kham-thien": {
    collectibleId: "tl-so-nha-312-kham-thien",
    photoUrl: "/images/collectibles/tl-so-nha-312-kham-thien.webp",
    realTitle: "Di tích Nhà số 312 phố Khâm Thiên, Hà Nội",
    archiveSource: "Bảo tàng Lịch sử Quốc gia / Di tích 312 Khâm Thiên",
    note: "Nơi họp đại biểu thành lập Đông Dương Cộng sản Đảng ngày 17/6/1929, thông qua Tuyên ngôn và ra báo Búa Liềm."
  },
  "tl-chanh-cuong-sach-luoc": {
    collectibleId: "tl-chanh-cuong-sach-luoc",
    photoUrl: "/images/collectibles/tl-chanh-cuong-sach-luoc.webp",
    realTitle: "Bản thảo thủ bút Chánh cương vắn tắt & Sách lược vắn tắt",
    archiveSource: "Cục Lưu trữ Văn phòng Trung ương Đảng / Báo Quân đội Nhân dân",
    note: "Cương lĩnh chính trị đầu tiên do đồng chí Nguyễn Ái Quốc soạn thảo, được Hội nghị hợp nhất thông qua đầu năm 1930."
  }
};

export const HISTORICAL_PORTRAITS: HistoricalPortraitMeta[] = [
  {
    id: "nguyen-ai-quoc-1920",
    name: "Nguyễn Ái Quốc",
    photoUrl: "/images/portraits/nguyen-ai-quoc-1920.webp",
    period: "1919–1920",
    role: "Lãnh tụ tại Paris, gửi Yêu sách 8 điểm và sáng lập Đảng Cộng sản Pháp"
  },
  {
    id: "nguyen-ai-quoc-1930",
    name: "Nguyễn Ái Quốc (Tống Văn Sơ)",
    photoUrl: "/images/portraits/nguyen-ai-quoc-1930.webp",
    period: "1930",
    role: "Đại biểu Quốc tế Cộng sản, chủ trì Hội nghị hợp nhất thành lập Đảng tại Cửu Long"
  },
  {
    id: "phan-boi-chau",
    name: "Phan Bội Châu",
    photoUrl: "/images/portraits/phan-boi-chau.webp",
    period: "1905–1908",
    role: "Nhà chí sĩ yêu nước tiền bối, khởi xướng phong trào Đông Du"
  },
  {
    id: "phan-chau-trinh",
    name: "Phan Châu Trinh",
    photoUrl: "/images/portraits/phan-chau-trinh.webp",
    period: "1911",
    role: "Nhà chí sĩ yêu nước tiền bối, chủ trương Duy Tân nâng cao dân trí"
  },
  {
    id: "ngo-gia-tu",
    name: "Ngô Gia Tự",
    photoUrl: "/images/portraits/ngo-gia-tu.webp",
    period: "1929–1930",
    role: "Ủy viên Chi bộ 5D Hàm Long, lãnh đạo Đông Dương Cộng sản Đảng"
  },
  {
    id: "nguyen-duc-canh",
    name: "Nguyễn Đức Cảnh",
    photoUrl: "/images/portraits/nguyen-duc-canh.webp",
    period: "1929–1930",
    role: "Ủy viên Chi bộ 5D Hàm Long, Tổng Thư ký Công hội Đỏ Bắc Kỳ"
  },
  {
    id: "trinh-dinh-cuu",
    name: "Trịnh Đình Cửu",
    photoUrl: "/images/portraits/trinh-dinh-cuu.webp",
    period: "1930",
    role: "Đại biểu Đông Dương Cộng sản Đảng dự Hội nghị hợp nhất Đảng"
  },
  {
    id: "chau-van-liem",
    name: "Châu Văn Liêm",
    photoUrl: "/images/portraits/chau-van-liem.webp",
    period: "1930",
    role: "Đại biểu An Nam Cộng sản Đảng dự Hội nghị hợp nhất Đảng"
  },
  {
    id: "nguyen-thieu",
    name: "Nguyễn Thiệu",
    photoUrl: "/images/portraits/nguyen-thieu.webp",
    period: "1930",
    role: "Đại biểu An Nam Cộng sản Đảng dự Hội nghị hợp nhất Đảng"
  }
];

export const HISTORICAL_SCENE_PHOTOS: HistoricalGalleryItem[] = [
  {
    id: "ben-nha-rong",
    title: "Bến Nhà Rồng năm 1911",
    photoUrl: "/images/historical/ben-nha-rong-1911.webp",
    year: "1911",
    caption: "Nơi người thanh niên Nguyễn Tất Thành rời Tổ quốc ra đi tìm đường cứu nước.",
    source: "Bảo tàng Hồ Chí Minh — Chi nhánh TP. Hồ Chí Minh"
  },
  {
    id: "tau-latouche",
    title: "Tàu Amiral Latouche-Tréville",
    photoUrl: "/images/historical/tau-amiral-latouche-treville.webp",
    year: "1911",
    caption: "Con tàu buôn hơi nước đưa Nguyễn Tất Thành vượt trùng dương sang Pháp.",
    source: "Hãng tàu Chargeurs Réunis / Bảo tàng Lịch sử Quốc gia"
  },
  {
    id: "bao-le-paria",
    title: "Báo Le Paria (Người Cùng Khổ)",
    photoUrl: "/images/historical/bao-le-paria-1922.webp",
    year: "1922",
    caption: "Cơ quan ngôn luận của Hội Liên hiệp Thuộc địa do Nguyễn Ái Quốc làm chủ nhiệm kiêm chủ bút.",
    source: "Trung tâm Lưu trữ Quốc gia Pháp tại Aix-en-Provence (ANOM)"
  },
  {
    id: "nguyen-ai-quoc-moskva",
    title: "Nguyễn Ái Quốc tại Quốc tế Cộng sản",
    photoUrl: "/images/historical/nguyen-ai-quoc-quoc-te-cong-san-1924.webp",
    year: "1924",
    caption: "Nguyễn Ái Quốc tham dự Đại hội lần thứ V Quốc tế Cộng sản tại Mátxcơva.",
    source: "Bảo tàng Lịch sử Quốc gia"
  },
  {
    id: "the-dai-bieu-1924",
    title: "Thẻ đại biểu Quốc tế Cộng sản 1924",
    photoUrl: "/images/historical/the-dai-bieu-quoc-te-cong-san-1924.webp",
    year: "1924",
    caption: "Thẻ đại biểu chính thức cấp cho Nguyễn Ái Quốc tại Đại hội V Quốc tế Cộng sản.",
    source: "Bảo tàng Lịch sử Quốc gia"
  },
  {
    id: "lop-hoc-quang-chau",
    title: "Phòng học đường Văn Minh, Quảng Châu",
    photoUrl: "/images/historical/lop-huan-luyen-quang-chau-1926.webp",
    year: "1925–1927",
    caption: "Nơi Nguyễn Ái Quốc trực tiếp mở 3 khóa huấn luyện chính trị cho thanh niên Việt Nam.",
    source: "Khu di tích Trụ sở Hội VN Cách mạng Thanh niên tại Quảng Châu"
  },
  {
    id: "trang-ky-5d-ham-long",
    title: "Bộ tràng kỷ họp Chi bộ 5D Hàm Long",
    photoUrl: "/images/historical/trang-ky-5d-ham-long.webp",
    year: "1929",
    caption: "Hiện vật gốc nơi các đồng chí tiên phong ngồi họp thành lập Chi bộ Cộng sản đầu tiên.",
    source: "Bảo tàng Lịch sử Quốc gia"
  },
  {
    id: "bao-bua-liem-1929",
    title: "Báo Búa Liềm số 5 (11/12/1929)",
    photoUrl: "/images/historical/bao-bua-liem-1929.webp",
    year: "1929",
    caption: "Cơ quan ngôn luận trung ương của Đông Dương Cộng sản Đảng.",
    source: "Bảo tàng Lịch sử Quốc gia"
  },
  {
    id: "tranh-phan-ke-an",
    title: "Tranh Hội nghị thành lập Đảng 1930",
    photoUrl: "/images/historical/tranh-hoi-nghi-cuu-long-1930.webp",
    year: "1930",
    caption: "Tác phẩm mỹ thuật lịch sử nổi tiếng của Họa sĩ Phan Kế An.",
    source: "Bảo tàng Mỹ thuật Việt Nam"
  },
  {
    id: "bao-cao-hop-nhat",
    title: "Báo cáo về việc hợp nhất tổ chức cộng sản",
    photoUrl: "/images/historical/bao-cao-hop-nhat-1930.webp",
    year: "1930",
    caption: "Tư liệu báo cáo gửi Quốc tế Cộng sản về việc thống nhất các tổ chức cộng sản Việt Nam.",
    source: "Cục Lưu trữ Văn phòng Trung ương Đảng"
  }
];

export const HISTORICAL_COLLECTIBLE_GALLERY: HistoricalGalleryItem[] = [
  {
    id: "tl-bao-nhan-dao",
    title: "Báo L'Humanité (16-17/7/1920)",
    photoUrl: "/images/collectibles/tl-bao-nhan-dao.webp",
    year: "1920",
    caption: "Trang nhất đăng toàn văn Luận cương của Lênin về vấn đề dân tộc và thuộc địa.",
    source: "Thư viện Quốc gia Pháp (BnF Gallica)"
  },
  {
    id: "tl-ban-yeu-sach",
    title: "Bản Yêu sách của nhân dân An Nam",
    photoUrl: "/images/collectibles/tl-ban-yeu-sach.webp",
    year: "1919",
    caption: "Bản in Revendications du peuple annamite (8 điểm) gửi tới Hội nghị Vécxay (Versailles).",
    source: "Bảo tàng Lịch sử Quốc gia / ANOM"
  },
  {
    id: "tl-dai-hoi-tours",
    title: "Ảnh Nguyễn Ái Quốc tại Đại hội Tua (Tours)",
    photoUrl: "/images/collectibles/tl-dai-hoi-tours.webp",
    year: "1920",
    caption: "Người thanh niên yêu nước 30 tuổi tại thời điểm sáng lập Đảng Cộng sản Pháp.",
    source: "Bảo tàng Hồ Chí Minh"
  },
  {
    id: "tl-bao-thanh-nien",
    title: "Báo Thanh Niên số 1 (21/6/1925)",
    photoUrl: "/images/collectibles/tl-bao-thanh-nien.webp",
    year: "1925",
    caption: "Số 1 Báo Thanh Niên ra ngày 21/6/1925 tại Quảng Châu.",
    source: "Bảo tàng Báo chí Cách mạng Việt Nam"
  },
  {
    id: "tl-duong-cach-menh",
    title: "Cuốn sách 'Đường cách mệnh'",
    photoUrl: "/images/collectibles/tl-duong-cach-menh.webp",
    year: "1927",
    caption: "Bìa bản in gốc cuốn Đường Kách Mệnh (Bảo vật Quốc gia số 11).",
    source: "Bảo tàng Lịch sử Quốc gia"
  },
  {
    id: "tl-so-nha-5d-ham-long",
    title: "Nhà số 5D phố Hàm Long, Hà Nội",
    photoUrl: "/images/collectibles/tl-so-nha-5d-ham-long.webp",
    year: "1929",
    caption: "Nơi thành lập Chi bộ Cộng sản đầu tiên tại Việt Nam tháng 3/1929.",
    source: "Ban Quản lý Di tích Danh thắng Hà Nội / TTXVN"
  },
  {
    id: "tl-so-nha-312-kham-thien",
    title: "Nhà số 312 phố Khâm Thiên, Hà Nội",
    photoUrl: "/images/collectibles/tl-so-nha-312-kham-thien.webp",
    year: "1929",
    caption: "Nơi họp đại biểu thành lập Đông Dương Cộng sản Đảng ngày 17/6/1929.",
    source: "Di tích 312 Khâm Thiên / TTXVN"
  },
  {
    id: "tl-chanh-cuong-sach-luoc",
    title: "Chánh cương & Sách lược vắn tắt",
    photoUrl: "/images/collectibles/tl-chanh-cuong-sach-luoc.webp",
    year: "1930",
    caption: "Bản thảo thủ bút Cương lĩnh chính trị đầu tiên do Nguyễn Ái Quốc soạn thảo.",
    source: "Cục Lưu trữ Văn phòng Trung ương Đảng"
  }
];


