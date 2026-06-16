/* =====================================================================
 *  Cấu hình chung của website (đọc từ .env, có giá trị mặc định)
 *  Dùng chung cho mọi trang qua res.locals.site
 * ===================================================================== */
'use strict';

const hotline = process.env.SITE_HOTLINE || '0935999087';
const zalo = process.env.SITE_ZALO || '0905057146';

/** Định dạng số điện thoại 0935999087 -> 0935 999 087 */
function prettyPhone(num) {
  const d = String(num).replace(/\D/g, '');
  if (d.length === 10) return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return num;
}

const site = {
  name: 'Công ty TNHH MTV Xướng Hương',
  brand: 'Xướng Hương',
  slogan: 'Gạo sạch tận gốc · Đà Nẵng',
  domain: 'https://gaoxuonghuong.vn',

  hotline,
  hotlinePretty: prettyPhone(hotline),
  zalo,
  zaloPretty: prettyPhone(zalo),
  zaloLink: `https://zalo.me/${zalo}`,

  email: process.env.SITE_EMAIL || 'gaodanang@gmail.com',
  address: process.env.SITE_ADDRESS || '111 Nguyễn Chí Diễu, Đà Nẵng',
  openHours: '7:00 – 19:00 (Thứ 2 – Chủ Nhật)',

  // Bản đồ Google Maps nhúng (theo địa chỉ); thay bằng link nhúng thật khi có
  mapEmbed:
    'https://www.google.com/maps?q=111+Nguy%E1%BB%85n+Ch%C3%AD+Di%E1%BB%83u,+%C4%90%C3%A0+N%E1%BA%B5ng&output=embed',
  mapDirection:
    'https://www.google.com/maps/dir/?api=1&destination=111+Nguy%E1%BB%85n+Ch%C3%AD+Di%E1%BB%83u,+%C4%90%C3%A0+N%E1%BA%B5ng',

  year: new Date().getFullYear(),

  // Số liệu năng lực (hiển thị khối thống kê)
  stats: [
    { value: 10, suffix: '+', label: 'Năm kinh nghiệm' },
    { value: 500, suffix: '+', label: 'Tấn gạo / tháng' },
    { value: 300, suffix: '+', label: 'Nhà hàng tin dùng' },
    { value: 100, suffix: '%', label: 'Nguồn gốc rõ ràng' },
  ],
};

module.exports = site;
