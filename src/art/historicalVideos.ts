export interface HistoricalVideoRecord {
  id: string;
  sceneId: string;
  title: string;
  year: string;
  archiveSource: string;
  duration: string;
  summary: string;
  description: string;
  historicalSignificance: string;
  videoUrl?: string; // Optional direct video URL or embed
  thumbnailColor: string;
}

export const HISTORICAL_VIDEOS: Record<string, HistoricalVideoRecord> = {
  "k0-c1": {
    id: "vid-tau-latouche-1911",
    sceneId: "k0-c1",
    title: "Tàu viễn dương đầu thế kỷ 20 & Cảng Marseille 1911",
    year: "1911",
    archiveSource: "Lưu trữ Hãng phim Gaumont - Pathé Frères (Pháp) & Cục Hàng hải",
    duration: "1:45",
    summary: "Thước phim thời sự ghi lại quang cảnh những chuyến tàu buôn hơi nước vượt đại dương và cảnh bến cảng Marseille khi tàu Latouche-Tréville cập bến tháng 7/1911.",
    description: "Những thước phim đen trắng với tốc độ 16 khung hình/giây ghi lại cuộc sống gian khổ của người phụ bếp và công nhân xúc than dưới hầm tàu hỏa xa hoa, tương phản sâu sắc với khoang khách hạng nhất của người Pháp.",
    historicalSignificance: "Chuyến hải trình kéo dài hơn 1 tháng đã đưa người thanh niên Nguyễn Tất Thành 21 tuổi lần đầu tiên tận mắt chứng kiến xã hội tư bản phương Tây và cuộc sống của người lao động ở các thuộc địa châu Phi, châu Á.",
    thumbnailColor: "#172554"
  },
  "k0-c2": {
    id: "vid-versailles-1919",
    sceneId: "k0-c2",
    title: "Paris 1919 & Hội nghị Hòa bình Versailles",
    year: "1919",
    archiveSource: "Lưu trữ Quốc gia Pháp (Archives Nationales) & British Pathé",
    duration: "2:10",
    summary: "Quang cảnh thủ đô Paris sau Thế chiến thứ I và các phái đoàn cường quốc thế giới đến dự Hội nghị Versailles ký kết hòa ước.",
    description: "Tại thời điểm này, bản 'Yêu sách của nhân dân An Nam' gồm 8 điểm do Nguyễn Ái Quốc thay mặt những người Việt Nam yêu nước ký tên đã được gửi trực tiếp tới các đoàn đại biểu và lan truyền khắp các tòa soạn báo Paris.",
    historicalSignificance: "Lần đầu tiên trên trường quốc tế, tiếng nói độc lập, tự do và bình đẳng pháp lý của nhân dân Việt Nam được cất lên đĩnh đạc giữa thủ đô hoa lệ của chính nước thực dân đang đô hộ.",
    thumbnailColor: "#3b0764"
  },
  "k0-c4": {
    id: "vid-dai-hoi-tours-1920",
    sceneId: "k0-c4",
    title: "Thước phim vô giá: Nguyễn Ái Quốc tại Đại hội Tours 1920",
    year: "12/1920",
    archiveSource: "Viện Tư liệu Âm thanh - Hình ảnh Quốc gia Pháp (INA) & Viện Phim Việt Nam",
    duration: "2:40",
    summary: "Thước phim tài liệu lịch sử quý hiếm ghi lại hình ảnh đồng chí Nguyễn Ái Quốc 30 tuổi đứng phát biểu tại bục diễn đàn Đại hội lần thứ XVIII Đảng Xã hội Pháp ở thành phố Tours.",
    description: "Hình ảnh người thanh niên An Nam gầy gò, mặc âu phục sẫm màu, quàng khăn len sọc, cử chỉ đĩnh đạc, ánh mắt kiên định. Người đứng lên vạch trần tội ác dã man của thực dân Pháp tại Đông Dương và giơ cao thẻ biểu quyết thành lập Đảng Cộng sản Pháp.",
    historicalSignificance: "Đây là tư liệu hình ảnh chuyển động đầu tiên trong lịch sử ghi lại chân dung Chủ tịch Hồ Chí Minh. Người trở thành một trong những người sáng lập Đảng Cộng sản Pháp và là người cộng sản Việt Nam đầu tiên.",
    thumbnailColor: "#7f1d1d"
  },
  "k1-c2": {
    id: "vid-quang-chau-1925",
    sceneId: "k1-c2",
    title: "Quảng Châu thập niên 1920 & Trụ sở số 13–13B đường Văn Minh",
    year: "1925–1926",
    archiveSource: "Lưu trữ Lịch sử Quảng Đông (Trung Quốc) & Bảo tàng Lịch sử Quốc gia",
    duration: "2:05",
    summary: "Cảnh tượng sầm uất bên bờ Chu Giang và nhịp sống của trung tâm cách mạng Quảng Châu — nơi Hội Việt Nam Cách mạng Thanh niên đào tạo thế hệ cán bộ tiền bối.",
    description: "Thước phim tái hiện quang cảnh những con phố Kỵ lâu (nhà phố vòm che), thanh niên trí thức khắp ba kỳ lặn lội sang dự các khóa huấn luyện chính trị bí mật và những tờ báo 'Thanh Niên' in thạch chuyển về nước.",
    historicalSignificance: "Quảng Châu chính là cái nôi ươm mầm cho phong trào cách mạng vô sản Việt Nam, trực tiếp chuẩn bị về mặt chính trị, tư tưởng và tổ chức cho sự ra đời của Đảng Cộng sản.",
    thumbnailColor: "#78350f"
  },
  "k1-c4": {
    id: "vid-vo-san-hoa-1928",
    sceneId: "k1-c4",
    title: "Công nhân xưởng máy, hầm mỏ Đông Dương thời kỳ Vô sản hoá",
    year: "1928–1929",
    archiveSource: "Viện Phim Việt Nam & Lưu trữ Phim Thuộc địa Pháp (Archives d'Outre-mer)",
    duration: "2:15",
    summary: "Thước phim tư liệu về đời sống thợ máy tại Nhà máy Xi măng Hải Phòng, Nhà máy Dệt Nam Định và phu mỏ than Hòn Gai dưới chế độ cai trị thuộc địa.",
    description: "Hình ảnh những công nhân Việt Nam lam lũ, cởi trần xúc than bên lò máy rực lửa. Trong dòng người lao động ấy có các trí thức cách mạng của Hội Thanh niên đang thực hiện chủ trương 'Vô sản hóa' để cùng ăn, cùng ở, cùng rèn luyện giai cấp.",
    historicalSignificance: "Phong trào 'Vô sản hóa' cuối năm 1928 đã thúc đẩy sự giác ngộ giai cấp công nhân nhảy vọt, biến phong trào đấu tranh tự phát thành tự giác và là động lực quyết định dẫn tới sự phân hóa thành các tổ chức cộng sản năm 1929.",
    thumbnailColor: "#1e293b"
  },
  "k2-c1": {
    id: "vid-hong-kong-1929",
    sceneId: "k2-c1",
    title: "Bán đảo Cửu Long & Vịnh Victoria (Hồng Kông 1929–1930)",
    year: "1929–1930",
    archiveSource: "Lưu trữ Công cộng Hồng Kông (Hong Kong Public Records) & Pathé News",
    duration: "2:20",
    summary: "Quang cảnh bến cảng Cửu Long (Kowloon) và những chuyến phà Star Ferry trong làn sương mù mùa đông cuối năm 1929 khi Nguyễn Ái Quốc bí mật đặt chân tới Hương Cảng.",
    description: "Thước phim tái hiện không gian thuộc địa Anh tại Hồng Kông với các thuyền buồm ba buồm của người Hoa, xe điện và những căn phòng trọ nghèo bí mật nơi các đại biểu cộng sản Việt Nam cải trang họp bàn hợp nhất.",
    historicalSignificance: "Nơi diễn ra bước ngoặt lịch sử: triệu tập Hội nghị hợp nhất Đảng đầu năm 1930, chấm dứt tình trạng phân liệt chia rẽ của ba tổ chức cộng sản trong nước.",
    thumbnailColor: "#064e3b"
  },
  "k2-c4": {
    id: "vid-thanh-lap-dang-1930",
    sceneId: "k2-c4",
    title: "Cao trào cách mạng 1930–1931 & Khúc ca thành lập Đảng",
    year: "1930",
    archiveSource: "Viện Lịch sử Quân sự & Hãng phim Tài liệu Khoa học Trung ương",
    duration: "3:00",
    summary: "Hình ảnh tư liệu lịch sử về phong trào đấu tranh của công nông sau ngày 3/2/1930, cờ đỏ búa liềm xuất hiện khắp ba miền và đỉnh cao Xô Viết Nghệ Tĩnh.",
    description: "Từ hội nghị Cửu Long ngày 3/2/1930, ngọn đuốc của Đảng Cộng sản Việt Nam đã thổi bùng ngọn lửa cách mạng trên toàn cõi Đông Dương, làm rung chuyển bộ máy cai trị thực dân phong kiến.",
    historicalSignificance: "Khẳng định chân lý lịch sử: 'Đảng có vững cách mệnh mới thành công, cũng như người cầm lái có vững thuyền mới chạy'. Mùa xuân năm 1930 đã mở ra kỷ nguyên vẻ vang nhất của lịch sử dân tộc Việt Nam.",
    thumbnailColor: "#991b1b"
  }
};
