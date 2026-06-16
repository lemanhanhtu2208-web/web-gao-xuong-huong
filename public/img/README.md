# Thư mục ảnh — Gạo Xướng Hương

Đặt ảnh thật của xưởng vào đây, **giữ đúng tên file** bên dưới là website tự
hiển thị (không cần sửa code). Khi thiếu ảnh, site tự dùng `placeholder.svg`.

## Danh sách ảnh cần có

| Tên file | Vị trí dùng | Gợi ý kích thước |
|---|---|---|
| `canh-dong.mp4` | **Nền video cánh đồng lúa (toàn site)** — glass hấp thụ màu | 1920×1080, 8–15s, loop, nén < 5MB |
| `canh-dong-poster.jpg` | Ảnh poster hiện khi video đang tải | 1920×1080 |
| `hero.jpg` | (Tùy chọn) ảnh dự phòng | 1920×1080 (ngang) |
| `kho-gao.jpg` | Khối giới thiệu (trang chủ) + hero trang Giới thiệu | 1000×600 |
| `xuong-gao.jpg` | Ảnh xưởng (trang Giới thiệu) | 1000×900 |
| `kho-1.jpg`, `kho-2.jpg` | Lưới chứng nhận/kho (trang Giới thiệu) | 600×400 |
| `chung-nhan-vietgap.jpg` | Ảnh giấy chứng nhận VietGAP | 600×400 |
| `chung-nhan-atvstp.jpg` | Ảnh giấy chứng nhận ATVSTP | 600×400 |
| `san-pham-banner.jpg` | Banner trang Sản phẩm | 1920×700 |
| `lien-he-banner.jpg` | Banner trang Liên hệ | 1920×700 |
| `og-cover.jpg` | Ảnh chia sẻ mạng xã hội (Open Graph) | 1200×630 |
| **Thư mục `san-pham/`** | | |
| `san-pham/gao-dac-san.jpg` | Card + slider gạo đặc sản | 800×600 |
| `san-pham/gao-no-xop.jpg` | Card + slider gạo nở xốp | 800×600 |
| `san-pham/gao-nep-tam.jpg` | Card + slider gạo nếp / tấm | 800×600 |
| `san-pham/gao-lut.jpg` | Card + slider gạo lứt / hữu cơ | 800×600 |
| `san-pham/gao-tu-thien.jpg` | Card + slider gạo từ thiện | 800×600 |

### Ảnh slider trang chi tiết (tùy chọn — thêm để slider có nhiều ảnh)
Mỗi danh mục có slider 4 ảnh. Ảnh đầu là file ở trên; thêm 3 ảnh phụ theo
mẫu tên `-2`, `-3`, `-4` (nếu thiếu sẽ tự dùng `placeholder.svg`):

```
san-pham/gao-dac-san-2.jpg, gao-dac-san-3.jpg, gao-dac-san-4.jpg
san-pham/gao-no-xop-2.jpg,  gao-no-xop-3.jpg,  gao-no-xop-4.jpg
san-pham/gao-nep-tam-2.jpg, gao-nep-tam-3.jpg, gao-nep-tam-4.jpg
san-pham/gao-lut-2.jpg,     gao-lut-3.jpg,     gao-lut-4.jpg
san-pham/gao-tu-thien-2.jpg, gao-tu-thien-3.jpg, gao-tu-thien-4.jpg
```

> 💡 Gợi ý: dùng ảnh chụp **kho bãi, bao gạo, hạt gạo cận cảnh, đang đóng gói**
> để slider sinh động và tạo niềm tin.

## Mẹo
- Ưu tiên ảnh **thật của kho bãi & sản phẩm** — đây là yếu tố tạo niềm tin lớn nhất.
- Nén ảnh trước khi upload (TinyPNG, Squoosh) để web tải nhanh.
- Định dạng `.jpg` cho ảnh chụp, `.png`/`.svg` cho logo.
- Sau này muốn thêm **video xưởng**: đặt file vào đây và nhúng bằng thẻ
  `<video>` trong `views/home.ejs` (mục Hero hoặc Giới thiệu).
