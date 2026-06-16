# Website Gạo Xướng Hương 🌾

Website giới thiệu năng lực B2B kết hợp trưng bày sản phẩm bán lẻ B2C cho
**Công ty TNHH MTV Xướng Hương** – xưởng gạo tại 111 Nguyễn Chí Diễu, Đà Nẵng.

Ứng dụng **Node.js + Express + EJS**, giao diện **Tailwind CSS (biên dịch sẵn)**,
backend lưu form báo giá vào **MySQL** (có cơ chế dự phòng ghi file khi chưa có DB).

## 📞 Thông tin liên hệ
- **Hotline:** 0935 999 087
- **Zalo:** 0905 057 146
- **Email:** gaodanang@gmail.com
- **Địa chỉ:** 111 Nguyễn Chí Diễu, Đà Nẵng

## 🚀 Khởi chạy nhanh

```bash
# 1. Cài thư viện
npm install

# 2. Tạo file cấu hình
cp .env.example .env        # rồi sửa thông tin DB nếu có

# 3. (Tùy chọn) build lại CSS sau khi đổi giao diện
npm run build:css

# 4. Chạy server
npm start                   # http://localhost:3000
# hoặc chế độ tự reload khi sửa code:
npm run dev
```

> 💡 Website chạy được **ngay cả khi chưa cài MySQL**. Khi đó, các yêu cầu báo
> giá được lưu tạm vào `data/contacts.jsonl` để không thất lạc dữ liệu.

## 🗄️ Kết nối cơ sở dữ liệu (tùy chọn nhưng khuyến nghị)

```bash
# Tạo database + bảng + dữ liệu mẫu
mysql -u root -p < database/schema.sql
```

Sau đó điền thông tin vào `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=matkhau
DB_NAME=gao_xuong_huong
```
Khởi động lại server — log sẽ hiện `✅ Kết nối MySQL thành công.`

## 📁 Cấu trúc dự án

```
web-gao-xuong-huong/
├── server.js                  # Điểm khởi động
├── tailwind.config.js         # Cấu hình Tailwind (màu thương hiệu)
├── .env.example               # Mẫu biến môi trường
├── src/
│   ├── app.js                 # Cấu hình Express, view engine, static, routes
│   ├── db.js                  # Pool MySQL + fallback ghi file JSONL
│   ├── data/
│   │   ├── site.js            # Thông tin liên hệ, số liệu (đọc từ .env)
│   │   └── catalog.js         # 5 danh mục gạo (nguồn render giao diện)
│   ├── controllers/
│   │   └── contacts.js        # Validate + lưu form báo giá
│   ├── routes/
│   │   ├── pages.js           # Route các trang
│   │   ├── api.js             # POST /api/contacts (có rate-limit)
│   │   └── admin.js           # /admin/lien-he (Basic Auth)
│   └── styles/input.css       # Nguồn biên dịch Tailwind
├── views/                     # Giao diện EJS
│   ├── partials/              # head, header, footer, floating, quote-form, scripts
│   ├── home.ejs               # Trang chủ
│   ├── about.ejs              # Giới thiệu (câu chuyện, timeline, chứng nhận)
│   ├── products.ejs           # Danh sách 5 dòng gạo
│   ├── product-detail.ejs     # Chi tiết từng dòng gạo
│   ├── contact.ejs            # Liên hệ + bản đồ + form
│   ├── admin-contacts.ejs     # Bảng quản trị liên hệ
│   └── 404.ejs / 500.ejs
├── public/
│   ├── css/tailwind.css       # Tailwind đã biên dịch (commit sẵn)
│   ├── css/styles.css         # CSS tùy biến + hiệu ứng chuyển động
│   ├── js/main.js             # Menu, reveal, đếm số, submit form AJAX
│   └── img/                   # ẢNH THẬT đặt vào đây (xem img/README.md)
├── database/schema.sql        # Schema MySQL + seed
└── docs/                      # Tài liệu thiết kế UI/UX & copywriting
```

## 🌐 Các trang & API

| Đường dẫn | Mô tả |
|---|---|
| `/` | Trang chủ |
| `/gioi-thieu` | Giới thiệu xưởng, hành trình, chứng nhận |
| `/san-pham` | Danh sách 5 dòng gạo |
| `/san-pham/:slug` | Chi tiết dòng gạo (vd: `/san-pham/gao-dac-san`) |
| `/lien-he` | Liên hệ + bản đồ + form báo giá |
| `POST /api/contacts` | Nhận & lưu yêu cầu báo giá (JSON) |
| `/admin/lien-he` | Xem danh sách liên hệ (Basic Auth, cấu hình trong `.env`) |

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

## 📧 Gửi email thông báo khi có khách để lại form
Mỗi khi khách gửi form báo giá, hệ thống tự gửi email tới `gaodanang@gmail.com`.
- **Chưa cấu hình SMTP** → chạy chế độ *mô phỏng*: in nội dung email ra console (web vẫn chạy bình thường).
- **Gửi email thật**: điền `SMTP_*` trong `.env`. Với Gmail, tạo **Mật khẩu ứng dụng** 16 ký tự
  tại https://myaccount.google.com/apppasswords rồi điền vào `SMTP_USER` / `SMTP_PASS`.

Xem chi tiết hướng dẫn trong `.env.example` và `src/mailer.js`.

## 🛍️ Trang chi tiết sản phẩm
Mỗi dòng gạo (`/san-pham/:slug`) có: **slider ảnh** (mũi tên, thumbnail, vuốt trên mobile,
tự chạy), **bảng thông số đặc tính** (thanh đánh giá 0–5), **mô tả chi tiết chuẩn SEO**,
**các giống gạo tiêu biểu** (ST25, Đài Thơm 8, gạo 504, nếp cái hoa vàng, gạo lứt huyết rồng...),
quy cách đóng gói và nút **Báo giá qua Zalo / Gọi ngay**.

## ✨ Hiệu ứng chuyển động
- Hero ảnh nền hiệu ứng **Ken Burns** (zoom chậm), chữ xuất hiện so le (stagger).
- **Reveal khi cuộn** (fade-up) cho mọi khối nội dung qua IntersectionObserver.
- **Đếm số** năng lực (count-up) khi khối thống kê vào màn hình.
- Header **thu gọn** khi cuộn, gạch chân menu động, nút hiệu ứng **shine**.
- Card sản phẩm **zoom ảnh** khi hover, icon nảy, nút Zalo có **vòng sóng**.
- Hamburger biến thành **dấu X**, menu mobile trượt mượt.
- Tôn trọng `prefers-reduced-motion` (tắt hiệu ứng cho người nhạy cảm chuyển động).

## 🖼️ Thêm ảnh & video xưởng
Đặt ảnh thật vào `public/img/` theo đúng tên file liệt kê trong
[`public/img/README.md`](public/img/README.md) — website tự hiển thị, không cần
sửa code. Khi thiếu ảnh, site tự dùng `placeholder.svg` nên không bao giờ bị vỡ layout.

## 🚢 Triển khai (gợi ý)
- Chạy `npm start` sau reverse proxy (Nginx) hoặc deploy lên Render/Railway/VPS.
- Đặt `NODE_ENV=production` để bật cache static 7 ngày.
- Đổi `ADMIN_PASSWORD` trong `.env` trước khi lên production.
