export interface SceneHotspot {
  id: string;
  title: string;
  x: number; // Percentage from left (0 - 100)
  y: number; // Percentage from top (0 - 100)
  icon: string;
  description: string;
  historicalNote: string;
}

export const SCENE_HOTSPOTS: Record<string, SceneHotspot[]> = {
  "k0-c1": [
    {
      id: "den-bao",
      title: "Ngọn đèn bão boong tàu",
      x: 22,
      y: 58,
      icon: "💡",
      description: "Ngọn đèn leo lét chao đảo theo nhịp sóng. Dưới ánh sáng này, người thanh niên Văn Ba cặm cụi quét dọn boong tàu và xúc than hầm máy.",
      historicalNote: "Văn Ba nhận việc phụ bếp trên tàu Amiral Latouche-Tréville với mức lương 45 franc mỗi tháng, chấp nhận mọi gian khổ để được ra nước ngoài quan sát."
    },
    {
      id: "hai-trinh-bien",
      title: "Màn đêm đại dương",
      x: 75,
      y: 42,
      icon: "⚓",
      description: "Đại dương mênh mông mở ra trước mũi tàu. Phía sau lưng là Tổ quốc thân yêu đang rên xiết dưới gót giày thực dân Pháp.",
      historicalNote: "Con tàu rời bến cảng Sài Gòn ngày 5/6/1911, ghé qua Singapore, Colombo, Port Said trước khi cập cảng Marseille ngày 6/7/1911."
    }
  ],
  "k0-c2": [
    {
      id: "cua-so-paris",
      title: "Cửa sổ nhìn ra Paris",
      x: 78,
      y: 35,
      icon: "🗼",
      description: "Từ căn gác xép ngõ Villa des Gobelins nhìn ra xa là tháp Eiffel. Paris hoa lệ đối lập hoàn toàn với căn phòng giá lạnh của những người thợ kiều.",
      historicalNote: "Nguyễn Ái Quốc cùng cụ Phan Châu Trinh, luật sư Phan Văn Trường thành lập Hội những người An Nam yêu nước tại Pháp."
    },
    {
      id: "ban-yeu-sach",
      title: "Bản Yêu sách 8 điểm",
      x: 44,
      y: 72,
      icon: "📜",
      description: "Tập tài liệu vừa in xong còn thơm mùi mực. Bản Yêu sách đòi quyền tự do hội họp, tự do ngôn luận và bình đẳng pháp lý cho nhân dân Việt Nam.",
      historicalNote: "Ngày 18/6/1919, bản 'Yêu sách của nhân dân An Nam' gửi tới Hội nghị Versailles đã tạo tiếng vang chấn động trong dư luận nước Pháp."
    }
  ],
  "k0-c3": [
    {
      id: "to-bao-nhan-dao",
      title: "Báo L'Humanité (Nhân đạo)",
      x: 48,
      y: 65,
      icon: "📰",
      description: "Tờ báo xã hội chủ nghĩa nước Pháp trên bàn cà phê. Trang báo đăng 'Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa' của Lênin.",
      historicalNote: "Đọc Luận cương của Lênin tháng 7/1920 là bước ngoặt quyết định đưa Nguyễn Ái Quốc từ người yêu nước trở thành người cộng sản chân chính."
    }
  ],
  "k0-c4": [
    {
      id: "la-co-quoc-te",
      title: "Lá cờ Quốc tế III",
      x: 50,
      y: 25,
      icon: "🚩",
      description: "Đại hội lần thứ XVIII Đảng Xã hội Pháp tại thành phố Tours. Căn phòng vang dội những cuộc tranh luận nảy lửa về việc đi theo Quốc tế II hay Quốc tế III.",
      historicalNote: "Nguyễn Ái Quốc bỏ phiếu tán thành gia nhập Quốc tế Cộng sản và tham gia sáng lập Đảng Cộng sản Pháp vào tháng 12/1920."
    }
  ],
  "k1-c2": [
    {
      id: "bang-den-quang-chau",
      title: "Bảng đen lớp học đường Văn Minh",
      x: 42,
      y: 36,
      icon: "🏛️",
      description: "Bảng đen ghi lại những nội dung huấn luyện cốt lõi: đạo đức người cách mệnh, phương pháp tổ chức bí mật và lịch sử phong trào công nhân thế giới.",
      historicalNote: "Từ năm 1925 đến 1927, đồng chí Nguyễn Ái Quốc đã mở các lớp huấn luyện chính trị tại số nhà 13–13B đường Văn Minh, đào tạo 75 cán bộ cách mạng tiền bối."
    },
    {
      id: "bao-thanh-nien",
      title: "Cơ quan báo Thanh Niên",
      x: 74,
      y: 66,
      icon: "🗞️",
      description: "Số báo đầu tiên phát hành ngày 21/6/1925. Báo in bằng mực thạch, bí mật chuyển theo tàu biển về trong nước tuyên truyền.",
      historicalNote: "Báo Thanh Niên là cơ quan ngôn luận của Tổng bộ Hội Việt Nam Cách mạng Thanh niên, đặt nền móng cho báo chí cách mạng Việt Nam."
    }
  ],
  "k1-c4": [
    {
      id: "ao-tho-may",
      title: "Áo xanh công nhân dệt",
      x: 35,
      y: 52,
      icon: "⚙️",
      description: "Chiếc áo bạc màu lấm lem than đá và dầu mỡ. Những thanh niên trí thức cởi bỏ áo dài thư sinh để trực tiếp lao động hầm lò cùng công nhân.",
      historicalNote: "Chủ trương 'Vô sản hóa' cuối năm 1928 của Kỳ bộ Bắc Kỳ Hội Thanh niên đã thúc đẩy nhanh chóng sự giác ngộ giai cấp của công nhân Việt Nam."
    }
  ],
  "k1-c5": [
    {
      id: "nha-312-kham-thien",
      title: "Căn gác số 312 Khâm Thiên",
      x: 38,
      y: 42,
      icon: "🏠",
      description: "Căn gác tối giữa lòng Hà Nội cổ kính. Nơi những người cộng sản trẻ tuổi họp đại hội thành lập Đông Dương Cộng sản Đảng.",
      historicalNote: "Ngày 17/6/1929, đại biểu các cơ sở cộng sản ở Bắc Kỳ họp tại 312 Khâm Thiên tuyên bố thành lập Đông Dương Cộng sản Đảng và thông qua Tuyên ngôn."
    }
  ],
  "k2-c1": [
    {
      id: "can-phong-cuu-long",
      title: "Chiếc bàn họp bí mật Cửu Long",
      x: 62,
      y: 56,
      icon: "🤝",
      description: "Chiếc bàn gỗ nhỏ đơn sơ tại bán đảo Cửu Long (Hồng Kông). Quanh bàn là đại biểu của các tổ chức cộng sản đang lắng nghe lời phân tích chân tình của đồng chí Nguyễn Ái Quốc.",
      historicalNote: "Hội nghị hợp nhất khai mạc ngày 6/1/1930 với sự tham gia của đại biểu Đông Dương Cộng sản Đảng và An Nam Cộng sản Đảng do Nguyễn Ái Quốc chủ trì."
    }
  ],
  "k2-c5": [
    {
      id: "loi-keu-goi",
      title: "Bản Lời kêu gọi thành lập Đảng",
      x: 52,
      y: 45,
      icon: "⭐",
      description: "'Hỡi đồng bào bị áp bức bóc lột! Đảng Cộng sản Việt Nam đã được thành lập...' — Ngọn cờ dẫn đường cho toàn thể dân tộc bước vào mùa xuân mới.",
      historicalNote: "Lời kêu gọi của Nguyễn Ái Quốc nhân dịp thành lập Đảng xác định rõ mục tiêu: Đánh đổ đế quốc, đánh đổ phong kiến, làm cho nước Việt Nam hoàn toàn độc lập."
    }
  ]
};

