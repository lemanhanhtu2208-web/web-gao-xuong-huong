/* =====================================================================
 *  DANH MỤC SẢN PHẨM - nguồn dữ liệu để render giao diện.
 *  Mirror với database/schema.sql (bảng categories). Khi có DB, db.js sẽ
 *  ưu tiên đọc từ MySQL; nếu không, dùng dữ liệu tĩnh đầy đủ dưới đây.
 *
 *  Cấu trúc mỗi danh mục:
 *    - image       : ảnh đại diện (card)
 *    - gallery     : mảng ảnh cho slider trang chi tiết (thay file cùng tên là xong)
 *    - intro       : mô tả ngắn
 *    - longDesc    : mảng đoạn văn mô tả chi tiết (chuẩn SEO)
 *    - ratings     : bảng thông số đặc tính (điểm 0–5) để vẽ thanh đánh giá
 *    - features    : đặc tính dạng nhãn–giá trị
 *    - varieties   : các giống gạo tiêu biểu trong nhóm (ST25, Đài Thơm 8, 504...)
 *    - cooking     : hướng dẫn nấu
 *    - packaging   : quy cách đóng gói
 *    - suitableFor : đối tượng phù hợp
 *    - highlights  : từ khóa nổi bật
 * ===================================================================== */
'use strict';

const categories = [
  {
    id: 1,
    slug: 'gao-dac-san',
    name: 'Gạo Đặc Sản / Gạo Thơm',
    shortName: 'Gạo Đặc Sản',
    tagline: 'Thơm dẻo tự nhiên, đậm đà cho bữa cơm gia đình.',
    icon: '🌾',
    image: '/img/san-pham/gao-dac-san.jpg',
    gallery: [
      '/img/san-pham/gao-dac-san.jpg',
      '/img/san-pham/gao-dac-san-2.jpg',
      '/img/san-pham/gao-dac-san-3.jpg',
      '/img/san-pham/gao-dac-san-4.jpg',
    ],
    color: '#C98A3B',
    intro:
      'Dòng gạo cao cấp được tuyển chọn từ những giống lúa thơm nổi tiếng như ST25, Đài Thơm 8, Hương Lài. Hạt thon dài, cơm dẻo mềm, thơm lừng và ngọt hậu — lựa chọn lý tưởng cho bữa cơm gia đình và những bữa tiệc trang trọng.',
    longDesc: [
      'Gạo đặc sản – gạo thơm là dòng sản phẩm chủ lực và cao cấp nhất của Xướng Hương, quy tụ những giống lúa thơm ngon hàng đầu Việt Nam. Mỗi hạt gạo đều được tuyển chọn kỹ lưỡng, sàng lọc kỹ tạp chất, đảm bảo độ đồng đều, ít gãy và giữ trọn hương thơm tự nhiên vốn có.',
      'Khi nấu chín, cơm dẻo mềm vừa phải, bóng đẹp, tỏa hương thơm dịu đặc trưng — có giống thơm mùi lá dứa, có giống thoảng hương hoa lài. Đặc biệt, cơm để nguội vẫn giữ được độ mềm dẻo, không bị khô cứng, rất thích hợp cho bữa cơm gia đình hằng ngày lẫn mâm cỗ đãi khách.',
      'Tất cả gạo đặc sản tại Xướng Hương đều có nguồn gốc rõ ràng, được bảo quản trong kho khô ráo, thoáng mát đạt chuẩn an toàn thực phẩm. Khách mua lẻ có túi 5kg tiện lợi, khách sỉ và nhà hàng có bao thương mại 10kg, 25kg, 50kg với mức giá tận gốc tốt nhất.',
    ],
    ratings: [
      { label: 'Độ dẻo', score: 4 },
      { label: 'Độ thơm', score: 5 },
      { label: 'Độ mềm khi nguội', score: 4 },
      { label: 'Độ nở', score: 3 },
    ],
    features: [
      { label: 'Độ dẻo', value: 'Dẻo mềm vừa phải, để nguội vẫn ngon' },
      { label: 'Độ thơm', value: 'Hương thơm tự nhiên, dậy mùi khi mở nắp nồi' },
      { label: 'Hạt gạo', value: 'Thon dài, trắng trong, đều hạt, ít gãy' },
      { label: 'Vị cơm', value: 'Ngọt hậu, đậm đà, ăn không ngán' },
    ],
    varieties: [
      {
        name: 'Gạo ST25',
        note: 'Giống gạo từng đạt "Gạo ngon nhất thế giới". Hạt dài, cơm dẻo mềm, thơm mùi lá dứa, ngọt hậu — đẳng cấp nhất trong nhóm.',
      },
      {
        name: 'Gạo Đài Thơm 8',
        note: 'Hạt thon dài, cơm dẻo vừa, thơm nhẹ, để nguội vẫn mềm. Bán chạy nhất nhờ ngon – giá hợp lý.',
      },
      {
        name: 'Gạo Hương Lài (Lài Sữa)',
        note: 'Cơm trắng dẻo, thoảng hương hoa lài, hợp bữa cơm hằng ngày với mức giá dễ chịu.',
      },
      {
        name: 'Gạo Nàng Hoa 9',
        note: 'Dẻo thơm, hạt đẹp, hợp khẩu vị người miền Trung – Đà Nẵng.',
      },
    ],
    cooking:
      'Vo gạo nhẹ nhàng 1–2 lần, tỉ lệ nước khoảng 1 gạo : 1.2 nước. Ngâm 10–15 phút trước khi nấu để cơm dẻo và thơm hơn. Khi cơm cạn, hạ nhỏ lửa/ủ thêm 10 phút cho hạt chín đều.',
    packaging: ['Túi 5kg', 'Bao 10kg', 'Bao 25kg', 'Bao 50kg'],
    suitableFor: 'Hộ gia đình, nhà hàng cao cấp, quán ăn, làm quà biếu.',
    highlights: ['Dẻo mềm', 'Thơm đậm', 'Để nguội không khô'],
  },
  {
    id: 2,
    slug: 'gao-no-xop',
    name: 'Gạo Nở Xốp',
    shortName: 'Gạo Nở Xốp',
    tagline: 'Cơm tơi xốp, nở nhiều – lựa chọn số 1 cho quán cơm & nhà hàng.',
    icon: '🍚',
    image: '/img/san-pham/gao-no-xop.jpg',
    gallery: [
      '/img/san-pham/gao-no-xop.jpg',
      '/img/san-pham/gao-no-xop-2.jpg',
      '/img/san-pham/gao-no-xop-3.jpg',
      '/img/san-pham/gao-no-xop-4.jpg',
    ],
    color: '#B98044',
    intro:
      'Dòng gạo chuyên dụng cho quán cơm, nhà hàng, bếp ăn tập thể cần cơm nở nhiều, tơi xốp và tiết kiệm chi phí. Quy tụ các giống gạo nở "kinh điển" như 504, Hàm Châu — một ký gạo cho lượng cơm tối ưu.',
    longDesc: [
      'Gạo nở xốp là giải pháp kinh tế dành riêng cho hoạt động kinh doanh ăn uống. Đặc điểm nổi bật là khả năng nở bung khi nấu, cho lượng cơm nhiều hơn hẳn so với gạo dẻo — giúp các quán cơm, nhà hàng, bếp ăn công nghiệp tối ưu chi phí nguyên liệu mà vẫn đảm bảo bữa ăn đầy đặn cho khách.',
      'Khi nấu, cơm chín tơi, hạt rời, ráo và không bị bết dính, để lâu trên khay vẫn ngon, rất phù hợp với mô hình cơm phần, cơm bình dân, cơm tấm hay buffet. Gạo cũng dễ nấu với nồi cơm công nghiệp số lượng lớn, chín đều, không sống sượng.',
      'Xướng Hương cung ứng gạo nở xốp số lượng lớn, ổn định quanh năm với giá tận xưởng. Quy cách bao 25kg, 50kg tối ưu cho khách sỉ; vẫn có túi 5kg, 10kg để quán mới mở dùng thử trước khi đặt số lượng lớn.',
    ],
    ratings: [
      { label: 'Độ nở', score: 5 },
      { label: 'Độ tơi xốp', score: 5 },
      { label: 'Tiết kiệm chi phí', score: 5 },
      { label: 'Độ dẻo', score: 2 },
    ],
    features: [
      { label: 'Độ nở', value: 'Nở nhiều, tăng khối lượng cơm đáng kể' },
      { label: 'Độ xốp', value: 'Cơm tơi, hạt rời, ráo, không bết dính' },
      { label: 'Độ dẻo', value: 'Dẻo nhẹ vừa phải, hợp khẩu vị số đông' },
      { label: 'Để lâu', value: 'Giữ ngon trên khay nhiều giờ, ít thiu' },
    ],
    varieties: [
      {
        name: 'Gạo 504 (IR50404)',
        note: 'Giống nở "huyền thoại" của quán cơm: nở bung, cơm tơi khô, giá tốt nhất trong các loại.',
      },
      {
        name: 'Gạo Hàm Châu',
        note: 'Nở vừa, cơm ráo, hạt dài đẹp, rất hợp cơm tấm và cơm phần văn phòng.',
      },
      {
        name: 'Gạo Sa Mơ / Bụi Sữa',
        note: 'Cân bằng giữa độ nở và độ ngon — nở nhiều nhưng cơm vẫn mềm dễ ăn.',
      },
    ],
    cooking:
      'Tỉ lệ nước khoảng 1 gạo : 1.3–1.4 nước (gạo nở "ăn" ít nước hơn gạo dẻo). Phù hợp nồi cơm công nghiệp số lượng lớn; khi cơm sôi nên đảo nhẹ để chín đều, tơi xốp.',
    packaging: ['Túi 5kg', 'Túi 10kg', 'Bao 25kg', 'Bao 50kg'],
    suitableFor: 'Quán cơm bình dân, nhà hàng, bếp ăn công nghiệp, căng tin, quán cơm tấm.',
    highlights: ['Nở nhiều', 'Tơi xốp', 'Tiết kiệm chi phí'],
  },
  {
    id: 3,
    slug: 'gao-nep-gao-tam',
    name: 'Gạo Nếp / Gạo Tấm',
    shortName: 'Gạo Nếp & Tấm',
    tagline: 'Nếp dẻo thơm cho xôi chè, gạo tấm cho cơm tấm chuẩn vị.',
    icon: '🍙',
    image: '/img/san-pham/gao-nep-tam.jpg',
    gallery: [
      '/img/san-pham/gao-nep-tam.jpg',
      '/img/san-pham/gao-nep-tam-2.jpg',
      '/img/san-pham/gao-nep-tam-3.jpg',
      '/img/san-pham/gao-nep-tam-4.jpg',
    ],
    color: '#CDA15A',
    intro:
      'Bộ đôi sản phẩm cho những món ăn đậm chất Việt. Gạo nếp dẻo thơm (nếp cái hoa vàng, nếp ngỗng) cho xôi, chè, bánh; gạo tấm cho món cơm tấm sườn bì chả chuẩn vị.',
    longDesc: [
      'Gạo nếp của Xướng Hương được chọn từ các giống nếp ngon như nếp cái hoa vàng, nếp ngỗng — hạt tròn mẩy, đều, dẻo quánh và thơm đặc trưng. Khi đồ xôi, hạt nếp bóng dẻo, kết dính vừa phải, để nguội vẫn mềm, là nguyên liệu lý tưởng cho xôi, chè, bánh chưng, bánh ú và cả nấu rượu nếp.',
      'Gạo tấm là phần hạt gạo gãy thu được trong quá trình xay xát gạo thơm, mang hương vị riêng rất được ưa chuộng. Khi nấu, cơm tấm mềm, tơi, thơm nhẹ — đúng "chất" của đĩa cơm tấm sườn bì chả mà các quán cơm tấm luôn tìm kiếm.',
      'Cả gạo nếp và gạo tấm đều có quy cách đóng gói linh hoạt: túi 5kg cho gia đình, bao 10kg–50kg cho quán xôi, quán cơm tấm và cơ sở làm bánh. Tất cả đều được bảo quản khô ráo, sạch sẽ, giá tận gốc.',
    ],
    ratings: [
      { label: 'Độ dẻo (nếp)', score: 5 },
      { label: 'Độ thơm', score: 4 },
      { label: 'Độ mềm (tấm)', score: 5 },
      { label: 'Độ nở', score: 2 },
    ],
    features: [
      { label: 'Gạo nếp', value: 'Hạt tròn mẩy, dẻo quánh, xôi bóng dẻo' },
      { label: 'Gạo tấm', value: 'Hạt gãy đều, cơm mềm, thơm nhẹ' },
      { label: 'Để lâu', value: 'Xôi để lâu không cứng, giữ độ dẻo' },
      { label: 'Ứng dụng', value: 'Xôi, chè, bánh, cơm tấm, rượu nếp' },
    ],
    varieties: [
      {
        name: 'Nếp Cái Hoa Vàng',
        note: 'Hạt to tròn, dẻo thơm đặc trưng — chuẩn để gói bánh chưng, đồ xôi đãi tiệc.',
      },
      {
        name: 'Nếp Ngỗng / Nếp Thái',
        note: 'Dẻo quánh, thơm, hợp xôi chè, làm rượu nếp và các loại bánh truyền thống.',
      },
      {
        name: 'Tấm Thơm (tấm Đài / ST)',
        note: 'Hạt tấm từ gạo thơm, cho cơm tấm mềm, thơm nhẹ, đúng vị quán cơm tấm.',
      },
    ],
    cooking:
      'Nếp: ngâm 4–6 tiếng (hoặc qua đêm), để ráo rồi đồ/hấp cách thủy cho xôi dẻo ngon, thỉnh thoảng rưới chút nước. Tấm: vo nhẹ, tỉ lệ 1 gạo : 1.2 nước, nấu như cơm thường, cơm mềm dễ ăn.',
    packaging: ['Túi 5kg', 'Bao 10kg', 'Bao 25kg', 'Bao 50kg'],
    suitableFor: 'Hộ gia đình, quán xôi – chè, quán cơm tấm, cơ sở làm bánh, nấu rượu nếp.',
    highlights: ['Nếp dẻo quánh', 'Tấm chuẩn vị', 'Đa dụng'],
  },
  {
    id: 4,
    slug: 'gao-lut-huu-co',
    name: 'Gạo Lứt / Gạo Hữu Cơ',
    shortName: 'Gạo Lứt & Hữu Cơ',
    tagline: 'Sạch – lành – bổ dưỡng cho người ăn kiêng, sống khỏe.',
    icon: '🌿',
    image: '/img/san-pham/gao-lut.jpg',
    gallery: [
      '/img/san-pham/gao-lut.jpg',
      '/img/san-pham/gao-lut-2.jpg',
      '/img/san-pham/gao-lut-3.jpg',
      '/img/san-pham/gao-lut-4.jpg',
    ],
    color: '#8C6A3A',
    intro:
      'Dòng gạo dành cho người ăn kiêng, người tập gym, người tiểu đường và những ai theo đuổi lối sống lành mạnh. Gạo lứt (huyết rồng, lứt đen, lứt ST25) giữ nguyên lớp cám giàu dinh dưỡng; gạo hữu cơ canh tác sạch, không hóa chất.',
    longDesc: [
      'Gạo lứt là gạo chỉ xay bỏ lớp vỏ trấu, giữ lại lớp cám và mầm giàu dinh dưỡng — nguồn chất xơ, vitamin nhóm B, magie và các chất chống oxy hóa dồi dào. Đây là lựa chọn được các chuyên gia dinh dưỡng khuyên dùng cho người muốn giảm cân, kiểm soát đường huyết, hỗ trợ tiêu hóa và duy trì vóc dáng.',
      'Xướng Hương cung cấp đa dạng các loại: gạo lứt huyết rồng đỏ nâu giàu sắt, gạo lứt đen (nếp cẩm) giàu anthocyanin chống oxy hóa, và gạo lứt ST25 mềm dẻo dễ ăn cho người mới bắt đầu. Bên cạnh đó là dòng gạo hữu cơ canh tác theo quy trình không phân bón – thuốc hóa học, an toàn cho cả gia đình, đặc biệt là trẻ nhỏ và người lớn tuổi.',
      'Để cơm gạo lứt mềm ngon, nên ngâm gạo trước khi nấu và thêm nước nhiều hơn gạo trắng. Sản phẩm đóng túi 5kg hút chân không tiện bảo quản cho gia đình, và bao 10kg–25kg cho các quán chay, cửa hàng thực phẩm sạch, mô hình eat-clean.',
    ],
    ratings: [
      { label: 'Dinh dưỡng', score: 5 },
      { label: 'Chất xơ', score: 5 },
      { label: 'Độ dẻo bùi', score: 3 },
      { label: 'Độ mềm', score: 2 },
    ],
    features: [
      { label: 'Dinh dưỡng', value: 'Giàu chất xơ, vitamin nhóm B, khoáng chất' },
      { label: 'Độ dẻo', value: 'Hạt chắc, dẻo bùi khi nấu đúng cách' },
      { label: 'Hương vị', value: 'Thơm bùi tự nhiên, vị ngọt hậu' },
      { label: 'Lợi ích', value: 'Hỗ trợ giảm cân, ổn định đường huyết' },
    ],
    varieties: [
      {
        name: 'Gạo Lứt Huyết Rồng',
        note: 'Màu đỏ nâu, vị bùi, giàu sắt — hợp người thiếu máu, người ăn kiêng giảm cân.',
      },
      {
        name: 'Gạo Lứt Đen (Nếp Cẩm)',
        note: 'Màu tím than, giàu anthocyanin chống oxy hóa, dẻo thơm, hợp nấu cháo – sữa hạt.',
      },
      {
        name: 'Gạo Lứt ST25',
        note: 'Lứt từ giống ST25 nên mềm dẻo, dễ ăn hơn — lựa chọn cho người mới tập ăn gạo lứt.',
      },
      {
        name: 'Gạo Hữu Cơ',
        note: 'Canh tác không hóa chất, có chứng nhận, an toàn cho trẻ nhỏ và người lớn tuổi.',
      },
    ],
    cooking:
      'Ngâm gạo 2–4 tiếng trước khi nấu để hạt mềm. Tỉ lệ 1 gạo : 1.5–2 nước. Nấu lâu hơn gạo trắng; dùng nồi áp suất hoặc chế độ "gạo lứt" của nồi cơm điện sẽ cho cơm mềm dẻo hơn.',
    packaging: ['Túi 5kg', 'Bao 10kg', 'Bao 25kg'],
    suitableFor: 'Người ăn kiêng – eat clean, người tiểu đường, người cao tuổi, quán chay – healthy, cửa hàng thực phẩm sạch.',
    highlights: ['Giàu chất xơ', 'Canh tác sạch', 'Hỗ trợ sống khỏe'],
  },
  {
    id: 5,
    slug: 'gao-tu-thien',
    name: 'Gạo Đóng Bao Từ Thiện',
    shortName: 'Gạo Từ Thiện',
    tagline: 'Gạo chất lượng, đóng bao theo yêu cầu cho hoạt động thiện nguyện.',
    icon: '🤝',
    image: '/img/san-pham/gao-tu-thien.jpg',
    gallery: [
      '/img/san-pham/gao-tu-thien.jpg',
      '/img/san-pham/gao-tu-thien-2.jpg',
      '/img/san-pham/gao-tu-thien-3.jpg',
      '/img/san-pham/gao-tu-thien-4.jpg',
    ],
    color: '#A56B3A',
    intro:
      'Giải pháp gạo dành riêng cho các chương trình thiện nguyện, phát quà, hỗ trợ cộng đồng. Xướng Hương cung cấp gạo chất lượng, đóng bao sẵn theo trọng lượng và in thông tin đoàn từ thiện theo yêu cầu, với mức giá ưu đãi đặc biệt.',
    longDesc: [
      'Thấu hiểu ý nghĩa của những phần quà sẻ chia, Xướng Hương dành riêng một dòng sản phẩm phục vụ hoạt động từ thiện. Gạo được chọn là loại gạo trắng thông dụng, no đủ, sạch và an toàn — đảm bảo mỗi phần quà đến tay người nhận đều là một bữa cơm trọn vẹn, ấm áp.',
      'Chúng tôi hỗ trợ đóng bao sẵn theo đúng trọng lượng mà chương trình cần (5kg, 10kg, 25kg, 50kg), có thể in hoặc dán thông tin nhà tài trợ, tên đoàn thiện nguyện lên bao bì để hoạt động thêm trang trọng và lan tỏa. Đội xe của xưởng hỗ trợ vận chuyển tận điểm phát quà trong khu vực Đà Nẵng.',
      'Với vai trò là xưởng cung ứng trực tiếp, Xướng Hương áp dụng chính sách giá ưu đãi nhất cho các đơn hàng từ thiện, đồng hành cùng các chùa, nhà thờ, câu lạc bộ thiện nguyện và doanh nghiệp làm hoạt động CSR.',
    ],
    ratings: [
      { label: 'Chất lượng', score: 4 },
      { label: 'Giá ưu đãi', score: 5 },
      { label: 'Linh hoạt đóng bao', score: 5 },
      { label: 'Hỗ trợ vận chuyển', score: 5 },
    ],
    features: [
      { label: 'Chất lượng', value: 'Gạo sạch, an toàn, no đủ cho bữa cơm ý nghĩa' },
      { label: 'Linh hoạt', value: 'Đóng bao theo trọng lượng, in thông tin nhà tài trợ' },
      { label: 'Giá', value: 'Chính sách ưu đãi đặc biệt cho cộng đồng' },
      { label: 'Vận chuyển', value: 'Hỗ trợ giao tận điểm phát quà tại Đà Nẵng' },
    ],
    varieties: [
      {
        name: 'Combo bao 5kg / 10kg đóng sẵn',
        note: 'Bao đẹp, đóng sẵn, có thể in thông tin đoàn — sẵn sàng trao tặng ngay.',
      },
      {
        name: 'Gạo trắng thông dụng số lượng lớn',
        note: 'No đủ, giá ưu đãi nhất cho các đơn hàng từ thiện số lượng lớn.',
      },
    ],
    cooking:
      'Theo loại gạo được chọn cho chương trình (thường là gạo trắng thông dụng: vo nhẹ, tỉ lệ 1 gạo : 1.3 nước, nấu như cơm thường).',
    packaging: ['Bao 5kg', 'Bao 10kg', 'Bao 25kg', 'Bao 50kg'],
    suitableFor: 'Tổ chức – câu lạc bộ thiện nguyện, chùa, nhà thờ, doanh nghiệp CSR, cá nhân hảo tâm.',
    highlights: ['Giá ưu đãi', 'Đóng bao tùy chọn', 'Sẻ chia yêu thương'],
  },
];

/** Lấy 1 danh mục theo slug */
function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}

module.exports = { categories, getCategoryBySlug };
