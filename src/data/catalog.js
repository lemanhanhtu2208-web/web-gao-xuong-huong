/* =====================================================================
 *  DANH MỤC SẢN PHẨM - nguồn dữ liệu để render giao diện.
 *  Mirror với database/schema.sql (bảng categories). Khi có DB, db.js sẽ
 *  ưu tiên đọc từ MySQL; nếu không, dùng dữ liệu tĩnh đầy đủ dưới đây.
 *
 *  Ảnh đặt placeholder trong /img — bạn chỉ cần thay file cùng tên là xong.
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
    color: '#C98A3B',
    intro:
      'Dòng gạo cao cấp được tuyển chọn từ những giống lúa thơm nổi tiếng, mang đến bữa cơm thơm lừng, dẻo mềm và đậm đà. Đây là lựa chọn lý tưởng cho bữa cơm gia đình hàng ngày và những bữa tiệc trang trọng.',
    features: [
      { label: 'Độ dẻo', value: 'Dẻo mềm vừa phải, để nguội vẫn ngon' },
      { label: 'Độ thơm', value: 'Hương thơm tự nhiên, dậy mùi khi mở nắp nồi' },
      { label: 'Hạt gạo', value: 'Thon dài, trắng trong, đều hạt, ít gãy' },
    ],
    cooking:
      'Vo gạo nhẹ nhàng 1–2 lần, tỉ lệ nước khoảng 1 gạo : 1.2 nước. Ngâm 10–15 phút trước khi nấu để cơm dẻo và thơm hơn.',
    packaging: ['Túi 5kg', 'Bao 10kg', 'Bao 25kg', 'Bao 50kg'],
    suitableFor: 'Hộ gia đình, nhà hàng cao cấp, quà biếu.',
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
    color: '#B98044',
    intro:
      'Dòng gạo được lựa chọn đặc biệt cho các quán cơm, nhà hàng, bếp ăn tập thể cần cơm nở nhiều, tơi xốp và tiết kiệm chi phí. Một ký gạo cho lượng cơm tối ưu, giúp tối đa hóa hiệu quả kinh doanh.',
    features: [
      { label: 'Độ nở', value: 'Nở nhiều, tăng khối lượng cơm đáng kể' },
      { label: 'Độ xốp', value: 'Cơm tơi, hạt rời, không bết dính' },
      { label: 'Độ dẻo', value: 'Dẻo nhẹ vừa phải, hợp khẩu vị số đông' },
    ],
    cooking:
      'Tỉ lệ nước khoảng 1 gạo : 1.3–1.4 nước. Phù hợp nấu nồi cơm công nghiệp số lượng lớn, cơm chín đều, tơi xốp.',
    packaging: ['Túi 5kg', 'Túi 10kg', 'Bao 25kg', 'Bao 50kg'],
    suitableFor: 'Quán cơm bình dân, nhà hàng, bếp ăn công nghiệp, căng tin.',
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
    color: '#CDA15A',
    intro:
      'Bộ đôi sản phẩm cho những món ăn đậm chất Việt. Gạo nếp dẻo thơm cho xôi, chè, bánh; gạo tấm cho món cơm tấm sườn bì chả chuẩn vị.',
    features: [
      { label: 'Gạo nếp', value: 'Hạt tròn mẩy, dẻo quánh, xôi bóng dẻo' },
      { label: 'Gạo tấm', value: 'Hạt gãy đều, cơm mềm, thơm nhẹ' },
      { label: 'Để lâu', value: 'Xôi để lâu không cứng, giữ độ dẻo' },
    ],
    cooking:
      'Nếp: ngâm 4–6 tiếng (hoặc qua đêm), đồ/hấp cách thủy cho xôi dẻo ngon. Tấm: vo nhẹ, tỉ lệ 1 : 1.2, nấu như cơm thường.',
    packaging: ['Túi 5kg', 'Bao 10kg', 'Bao 25kg', 'Bao 50kg'],
    suitableFor: 'Hộ gia đình, quán xôi – chè, quán cơm tấm, cơ sở làm bánh.',
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
    color: '#8C6A3A',
    intro:
      'Dòng gạo dành cho người ăn kiêng, người tập gym, người tiểu đường và những ai theo đuổi lối sống lành mạnh. Gạo lứt giữ nguyên lớp cám giàu dinh dưỡng; gạo hữu cơ canh tác sạch, không hóa chất.',
    features: [
      { label: 'Dinh dưỡng', value: 'Giàu chất xơ, vitamin nhóm B, khoáng chất' },
      { label: 'Độ dẻo', value: 'Hạt chắc, dẻo bùi khi nấu đúng cách' },
      { label: 'Hương vị', value: 'Thơm bùi tự nhiên, vị ngọt hậu' },
    ],
    cooking:
      'Ngâm gạo 2–4 tiếng trước khi nấu để hạt mềm. Tỉ lệ 1 gạo : 1.5–2 nước. Nấu lâu hơn gạo trắng, có thể dùng nồi áp suất để cơm mềm dẻo hơn.',
    packaging: ['Túi 5kg', 'Bao 10kg', 'Bao 25kg'],
    suitableFor: 'Người ăn kiêng – eat clean, người tiểu đường, người cao tuổi, quán chay – healthy.',
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
    color: '#A56B3A',
    intro:
      'Giải pháp gạo dành riêng cho các chương trình thiện nguyện, phát quà, hỗ trợ cộng đồng. Xướng Hương cung cấp gạo chất lượng đảm bảo, đóng bao theo đúng quy cách và số lượng yêu cầu, với mức giá ưu đãi đặc biệt cho hoạt động từ thiện.',
    features: [
      { label: 'Chất lượng', value: 'Gạo sạch, an toàn, no đủ cho bữa cơm ý nghĩa' },
      { label: 'Linh hoạt', value: 'Đóng bao theo trọng lượng, in thông tin nhà tài trợ' },
      { label: 'Giá', value: 'Chính sách ưu đãi đặc biệt cho cộng đồng' },
    ],
    cooking: 'Theo loại gạo được chọn cho chương trình.',
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
