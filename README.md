# Website Gạo Xướng Hương 🌾

Website giới thiệu năng lực B2B kết hợp trưng bày sản phẩm bán lẻ B2C cho
**Công ty TNHH MTV Xướng Hương** – xưởng gạo tại 111 Nguyễn Chí Diễu, Đà Nẵng.

## 📞 Thông tin liên hệ
- **Hotline:** 0935 999 087
- **Zalo:** 0905 057 146
- **Email:** gaodanang@gmail.com
- **Địa chỉ:** 111 Nguyễn Chí Diễu, Đà Nẵng

## 📁 Cấu trúc dự án
```
web-gao-xuong-huong/
├── index.html                      # Trang chủ hoàn chỉnh (HTML5 + Tailwind CDN)
├── assets/
│   └── js/
│       └── main.js                 # Menu mobile, xử lý form báo giá
├── database/
│   └── schema.sql                  # Schema MySQL: categories, products, contacts + seed data
├── docs/
│   ├── 01-thiet-ke-ui-ux.md        # PHẦN 1: Logo, bảng màu, sitemap, UX
│   └── 02-noi-dung-copywriting.md  # PHẦN 2: Toàn bộ nội dung văn bản (copywriting)
└── README.md
```

## 🎨 Bảng màu thương hiệu
| Vai trò | Hex |
|---|---|
| Primary (Nâu đất) | `#6B4226` |
| Primary Dark | `#4A2F1A` |
| Secondary (Nâu gỗ) | `#8B5E34` |
| Accent (Vàng lúa) | `#D9A441` |
| Background (Trắng ngà) | `#FAF6F0` |
| Text | `#2E2117` |
| Zalo/Call | `#2FAE60` |

## 🚀 Chạy thử
Đây là trang tĩnh, mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy server tĩnh:
```bash
python3 -m http.server 8000
# Mở http://localhost:8000
```

## 🗄️ Khởi tạo cơ sở dữ liệu
```bash
mysql -u root -p < database/schema.sql
```

## ✨ Tính năng trang chủ
- Header sticky (menu + Hotline + nút Zalo), top-bar thông tin liên hệ.
- Hero banner với 2 nút CTA (Báo giá / Zalo) + badge chứng nhận.
- Lưới 5 danh mục sản phẩm — tất cả dùng nút "Liên hệ nhận báo giá" (không hiển thị giá).
- Khối USP: giá tận gốc, năng lực cung ứng, giao tận nơi.
- Khối số liệu năng lực + quy trình giao hàng 4 bước.
- Form nhận báo giá sỉ (validate phía client, sẵn sàng nối backend `/api/contacts`).
- Footer 4 cột đầy đủ thông tin + địa chỉ 111 Nguyễn Chí Diễu.
- Nút Zalo nổi (desktop) + sticky bottom bar Gọi/Zalo (mobile).
- Chuẩn SEO: meta tags, Open Graph, structured data LocalBusiness.

## 📝 Ghi chú triển khai backend (gợi ý)
Form báo giá đã chuẩn bị sẵn `payload` JSON. Để lưu vào bảng `contacts`,
tạo endpoint `POST /api/contacts` (Node/Express, PHP, Laravel...) nhận các
trường: `full_name, phone, email, customer_type, product_interest, quantity, message`.
