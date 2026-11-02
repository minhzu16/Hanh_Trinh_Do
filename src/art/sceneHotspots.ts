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
      x: 18,
      y: 58,
      icon: "💡",
      description: "Ngọn đèn leo lét chao đảo theo nhịp sóng. Dưới ánh sáng này, người thanh niên Văn Ba cặm cụi quét dọn boong tàu và xúc than hầm máy.",
      historicalNote: "Văn Ba nhận việc phụ bếp trên tàu Amiral Latouche-Tréville với mức lương 45 franc mỗi tháng, chấp nhận mọi gian khổ để được ra nước ngoài quan sát."
    },
    {
      id: "phao-nam-sao",
      title: "Phao tàu Amiral Latouche-Tréville",
      x: 12,
      y: 80,
      icon: "🛟",
      description: "Phao cứu sinh gắn trên vách sắt mang dòng chữ 'AMIRAL LATOUCHE-TRÉVILLE - LE HAVRE', biểu tượng của con tàu thuộc hãng vận tải biển Chargeurs Réunis (Hãng Năm Sao).",
      historicalNote: "Con tàu hơi nước trọng tải hơn 5.500 tấn đã đưa người thanh niên Nguyễn Tất Thành rời Tổ quốc từ cảng Sài Gòn vào ngày 5/6/1911."
    },
    {
      id: "hai-trinh-bien",
      title: "Hải đăng Cần Giờ & Màn đêm",
      x: 75,
      y: 42,
      icon: "⚓",
      description: "Ánh hải đăng Cap Saint-Jacques (Cần Giờ) nhấp nháy xa xa rồi khuất dần vào bóng đêm đại dương, đánh dấu thời khắc vĩnh viễn chia xa cố hương trong hành trình tìm đường cứu nước.",
      historicalNote: "Con tàu vượt biển Đông ghé qua Singapore, Colombo, Port Said trước khi cập cảng Marseille ngày 6/7/1911."
    }
  ],
  "k0-c2": [
    {
      id: "cua-so-paris",
      title: "Cửa sổ gác xép nhìn ra Paris",
      x: 78,
      y: 35,
      icon: "🗼",
      description: "Từ căn gác xép ngõ Villa des Gobelins nhìn ra xa là tháp Eiffel. Paris hoa lệ đối lập hoàn toàn với căn phòng giá lạnh của những người thợ kiều.",
      historicalNote: "Nguyễn Ái Quốc cùng cụ Phan Châu Trinh, luật sư Phan Văn Trường thành lập Hội những người An Nam yêu nước tại Pháp."
    },
    {
      id: "vien-gach-suoi",
      title: "Viên gạch sưởi mùa đông Paris",
      x: 20,
      y: 84,
      icon: "🧱",
      description: "Viên gạch nung sưởi ấm mùa đông giá rét: Buổi sáng trước khi đi làm, Người đặt viên gạch lên bếp lò của chủ nhà; buổi tối mang về bọc tờ báo cũ 'Le Populaire' để ủ ấm chân.",
      historicalNote: "Cuộc sống gian lao, thiếu thốn tột cùng nơi đất khách quê người không làm lung lay ý chí kiên định tìm con đường giải phóng non sông."
    },
    {
      id: "ban-yeu-sach",
      title: "Bản Yêu sách 8 điểm",
      x: 48,
      y: 78,
      icon: "📜",
      description: "Bản 'Yêu sách của nhân dân An Nam' (Revendications du Peuple Annamite) gồm 8 điểm đòi các quyền tự do dân chủ tối thiểu gửi tới Hội nghị Versailles.",
      historicalNote: "Ngày 18/6/1919, bản Yêu sách ký tên Nguyễn Ái Quốc được gửi đến các đoàn đại biểu dự Hội nghị Hòa bình Versailles, gây tiếng vang lớn trong dư luận quốc tế."
    }
  ],
  "k0-c3": [
    {
      id: "to-bao-nhan-dao",
      title: "Báo L'Humanité (16–17/7/1920)",
      x: 48,
      y: 72,
      icon: "📰",
      description: "Trang báo in bài 'Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa' của V.I. Lênin gửi Đại hội II Quốc tế Cộng sản.",
      historicalNote: "Đọc Luận cương của Lênin tháng 7/1920 là bước ngoặt quyết định đưa Nguyễn Ái Quốc từ người yêu nước tiến bộ trở thành người chiến sĩ cộng sản kiên trung."
    },
    {
      id: "cafe-phap",
      title: "Cà phê phin kiểu Pháp",
      x: 65,
      y: 78,
      icon: "☕",
      description: "Tách cà phê phin tráng men dày trên bàn đá cẩm thạch của quán cà phê lao động Paris, nơi Người ngồi đọc từng câu chữ của Lênin trong niềm xúc động trào dâng.",
      historicalNote: "Nguyễn Ái Quốc hồi tưởng: 'Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Tôi vui mừng đến phát khóc lên'."
    }
  ],
  "k0-c4": [
    {
      id: "la-co-quoc-te",
      title: "Hội trường Salle du Manège, Tours",
      x: 50,
      y: 22,
      icon: "🚩",
      description: "Đại hội lần thứ XVIII Đảng Xã hội Pháp. Băng rôn đỏ rực với khẩu hiệu bất hủ: 'Prolétaires de tous les pays, unissez-vous!' (Vô sản tất cả các nước, đoàn kết lại!).",
      historicalNote: "Đại hội diễn ra từ ngày 25 đến 30/12/1920 tại thành phố Tours, quyết định sự phân liệt lịch sử và ra đời của Đảng Cộng sản Pháp."
    },
    {
      id: "the-bieu-quyet",
      title: "Lá phiếu gia nhập Quốc tế III",
      x: 35,
      y: 68,
      icon: "🗳️",
      description: "Chiếc thẻ biểu quyết màu đỏ giơ cao giữa hội trường. Nguyễn Ái Quốc là đại biểu duy nhất của các dân tộc thuộc địa Đông Dương bỏ phiếu tán thành Quốc tế Cộng sản.",
      historicalNote: "Sự kiện này đánh dấu Nguyễn Ái Quốc trở thành một trong những người sáng lập Đảng Cộng sản Pháp và là người cộng sản đầu tiên của Việt Nam."
    }
  ],
  "k1-c2": [
    {
      id: "bang-den-quang-chau",
      title: "Bảng đen số 13–13B đường Văn Minh",
      x: 42,
      y: 36,
      icon: "🏛️",
      description: "Bảng đen lớp học huấn luyện chính trị: Ghi rõ 'Cách mệnh trước hết phải có Đảng cách mệnh', 'Công nông là gốc cách mệnh'.",
      historicalNote: "Từ năm 1925 đến 1927, tại số nhà 13–13B đường Văn Minh (Quảng Châu), đồng chí Nguyễn Ái Quốc đã mở các khóa huấn luyện đào tạo 75 cán bộ cách mạng tiền bối."
    },
    {
      id: "bao-thanh-nien",
      title: "Bàn in thạch báo Thanh Niên",
      x: 18,
      y: 78,
      icon: "🗞️",
      description: "Bàn in bằng mực thạch gelatin xuất bản tuần báo 'Thanh Niên' số 1 ra ngày 21/6/1925 — cơ quan ngôn luận của Hội Việt Nam Cách mạng Thanh niên.",
      historicalNote: "Báo Thanh Niên đặt nền móng cho báo chí cách mạng Việt Nam, bí mật chuyển theo đường tàu thủy về Hải Phòng, Sài Gòn tuyên truyền chủ nghĩa Mác - Lênin."
    }
  ],
  "k1-c3": [
    {
      id: "sach-duong-kach-menh",
      title: "Tác phẩm 'Đường Kách mệnh' (1927)",
      x: 50,
      y: 40,
      icon: "📖",
      description: "Cuốn sách in bằng giấy dó tập hợp các bài giảng huấn luyện chính trị của Nguyễn Ái Quốc, chỉ rõ con đường cứu nước của dân tộc theo quỹ đạo cách mạng vô sản.",
      historicalNote: "'Đường Kách mệnh' được Bộ Tuyên truyền của Hội Liên hiệp các dân tộc bị áp bức Á Đông xuất bản đầu năm 1927, là cẩm nang lý luận gối đầu giường của các thế hệ cộng sản Việt Nam."
    }
  ],
  "k1-c4": [
    {
      id: "ao-tho-may",
      title: "Áo xanh công nhân & Phong trào Vô sản hoá",
      x: 35,
      y: 52,
      icon: "⚙️",
      description: "Chiếc áo xanh bạc màu và bi đông cơm cặp lồng. Trí thức cách mạng cởi bỏ áo dài thư sinh để trực tiếp vào hầm mỏ, xưởng dệt, xưởng xi măng lao động cùng công nhân.",
      historicalNote: "Chủ trương 'Vô sản hóa' cuối năm 1928 của Kỳ bộ Bắc Kỳ Hội Thanh niên đã đưa hội viên thâm nhập thực tế, thúc đẩy mạnh mẽ phong trào công nhân cả nước."
    }
  ],
  "k1-c5": [
    {
      id: "nha-312-kham-thien",
      title: "Căn gác số 312 Khâm Thiên, Hà Nội",
      x: 50,
      y: 48,
      icon: "🏠",
      description: "Căn gác tối trên phố Khâm Thiên — nơi ngày 17/6/1929 đại biểu các cơ sở cộng sản ở Bắc Kỳ họp quyết định thành lập Đông Dương Cộng sản Đảng và thông qua Tuyên ngôn.",
      historicalNote: "Trước đó vào cuối tháng 3/1929, Chi bộ Cộng sản đầu tiên gồm 7 đồng chí cũng đã được thành lập tại số nhà 5D Hàm Long, Hà Nội."
    }
  ],
  "k2-c1": [
    {
      id: "can-phong-cuu-long",
      title: "Vịnh Cửu Long (Kowloon), Hồng Kông",
      x: 62,
      y: 56,
      icon: "🤝",
      description: "Vịnh Victoria mù sương và bán đảo Cửu Long cuối năm 1929. Đồng chí Nguyễn Ái Quốc từ Xiêm bí mật đến Hồng Kông triệu tập đại biểu các tổ chức về họp bàn hợp nhất.",
      historicalNote: "Hội nghị hợp nhất khai mạc ngày 6/1/1930 với sự tham gia của đại biểu Đông Dương Cộng sản Đảng và An Nam Cộng sản Đảng do Nguyễn Ái Quốc chủ trì."
    }
  ],
  "k2-c2": [
    {
      id: "5-dai-bieu-cuu-long",
      title: "5 đại biểu lịch sử Hội nghị Cửu Long",
      x: 50,
      y: 58,
      icon: "👥",
      description: "Quanh chiếc bàn tròn dưới ánh đèn bão là 5 đại biểu: Nguyễn Ái Quốc (Quốc tế CS), Trịnh Đình Cửu, Nguyễn Đức Cảnh (ĐDCSĐ), Châu Văn Liêm, Nguyễn Thiệu (ANCSĐ).",
      historicalNote: "Bằng uy tín chính trị và phân tích thấu tình đạt lý, Nguyễn Ái Quốc đã xóa bỏ mọi bất đồng thành kiến cục bộ để thống nhất các tổ chức thành một chính đảng duy nhất."
    },
    {
      id: "chanh-cuong-van-tat",
      title: "Chánh cương & Sách lược vắn tắt",
      x: 48,
      y: 78,
      icon: "📜",
      description: "Cương lĩnh chính trị đầu tiên của Đảng do Nguyễn Ái Quốc soạn thảo, xác định cách mạng Việt Nam trải qua hai giai đoạn: tư sản dân quyền cách mạng và thổ địa cách mạng để tiến tới xã hội cộng sản.",
      historicalNote: "Cương lĩnh khẳng định độc lập dân tộc gắn liền với chủ nghĩa xã hội, công nông là gốc cách mạng, đồng thời đoàn kết mọi lực lượng yêu nước."
    }
  ],
  "k2-c5": [
    {
      id: "loi-keu-goi",
      title: "Lời kêu gọi nhân dịp thành lập Đảng",
      x: 52,
      y: 45,
      icon: "⭐",
      description: "'Hỡi đồng bào bị áp bức bóc lột! Đảng Cộng sản Việt Nam đã được thành lập...' — Ngọn đuốc soi sáng dẫn dắt dân tộc Việt Nam bước vào kỷ nguyên độc lập tự do.",
      historicalNote: "Lời kêu gọi của Nguyễn Ái Quốc mùa xuân năm 1930 hiệu triệu toàn dân đoàn kết dưới ngọn cờ của Đảng để đánh đổ thực dân Pháp và phong kiến tay sai."
    }
  ]
};
