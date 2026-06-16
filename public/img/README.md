# Thư mục ảnh — Gạo Xướng Hương

Đặt ảnh thật của xưởng vào đây, **giữ đúng tên file** bên dưới là website tự
hiển thị (không cần sửa code). Khi thiếu ảnh, site tự dùng `placeholder.svg`.

## Danh sách ảnh cần có

| Tên file | Vị trí dùng | Gợi ý kích thước |
|---|---|---|
| `hero.jpg` | Banner lớn trang chủ | 1920×1080 (ngang) |
| `kho-gao.jpg` | Khối giới thiệu (trang chủ) + hero trang Giới thiệu | 1000×600 |
| `xuong-gao.jpg` | Ảnh xưởng (trang Giới thiệu) | 1000×900 |
| `kho-1.jpg`, `kho-2.jpg` | Lưới chứng nhận/kho (trang Giới thiệu) | 600×400 |
| `chung-nhan-vietgap.jpg` | Ảnh giấy chứng nhận VietGAP | 600×400 |
| `chung-nhan-atvstp.jpg` | Ảnh giấy chứng nhận ATVSTP | 600×400 |
| `san-pham-banner.jpg` | Banner trang Sản phẩm | 1920×700 |
| `lien-he-banner.jpg` | Banner trang Liên hệ | 1920×700 |
| `og-cover.jpg` | Ảnh chia sẻ mạng xã hội (Open Graph) | 1200×630 |
| **Thư mục `san-pham/`** | | |
| `san-pham/gao-dac-san.jpg` | Card gạo đặc sản | 800×600 |
| `san-pham/gao-no-xop.jpg` | Card gạo nở xốp | 800×600 |
| `san-pham/gao-nep-tam.jpg` | Card gạo nếp / tấm | 800×600 |
| `san-pham/gao-lut.jpg` | Card gạo lứt / hữu cơ | 800×600 |
| `san-pham/gao-tu-thien.jpg` | Card gạo từ thiện | 800×600 |

## Mẹo
- Ưu tiên ảnh **thật của kho bãi & sản phẩm** — đây là yếu tố tạo niềm tin lớn nhất.
- Nén ảnh trước khi upload (TinyPNG, Squoosh) để web tải nhanh.
- Định dạng `.jpg` cho ảnh chụp, `.png`/`.svg` cho logo.
- Sau này muốn thêm **video xưởng**: đặt file vào đây và nhúng bằng thẻ
  `<video>` trong `views/home.ejs` (mục Hero hoặc Giới thiệu).
