-- =====================================================================
--  CƠ SỞ DỮ LIỆU WEBSITE GẠO XƯỚNG HƯƠNG
--  Công ty TNHH MTV Xướng Hương - 111 Nguyễn Chí Diễu, Đà Nẵng
--  Hệ quản trị: MySQL 8.0+  |  Charset: utf8mb4 (hỗ trợ tiếng Việt đầy đủ)
-- =====================================================================

CREATE DATABASE IF NOT EXISTS gao_xuong_huong
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE gao_xuong_huong;

-- ---------------------------------------------------------------------
-- 1. BẢNG DANH MỤC SẢN PHẨM (categories)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT COMMENT 'Khóa chính',
    name            VARCHAR(150)    NOT NULL                COMMENT 'Tên danh mục (VD: Gạo đặc sản / Gạo thơm)',
    slug            VARCHAR(180)    NOT NULL                COMMENT 'Đường dẫn thân thiện (VD: gao-dac-san)',
    short_desc      VARCHAR(255)    DEFAULT NULL            COMMENT 'Mô tả ngắn hiển thị trên card',
    description     TEXT            DEFAULT NULL            COMMENT 'Mô tả chi tiết danh mục',
    icon            VARCHAR(100)    DEFAULT NULL            COMMENT 'Tên/đường dẫn icon đại diện',
    image           VARCHAR(255)    DEFAULT NULL            COMMENT 'Ảnh đại diện danh mục',
    sort_order      INT             NOT NULL DEFAULT 0      COMMENT 'Thứ tự hiển thị',
    is_active       TINYINT(1)      NOT NULL DEFAULT 1      COMMENT '1=hiển thị, 0=ẩn',
    meta_title      VARCHAR(255)    DEFAULT NULL            COMMENT 'Tiêu đề SEO',
    meta_description VARCHAR(320)   DEFAULT NULL            COMMENT 'Mô tả SEO',
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_categories_slug (slug),
    KEY idx_categories_active (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Danh mục các nhóm gạo';

-- ---------------------------------------------------------------------
-- 2. BẢNG SẢN PHẨM (products)
-- ---------------------------------------------------------------------
CREATE TABLE products (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT COMMENT 'Khóa chính',
    category_id     INT UNSIGNED    NOT NULL                COMMENT 'Khóa ngoại -> categories.id',
    name            VARCHAR(200)    NOT NULL                COMMENT 'Tên sản phẩm',
    slug            VARCHAR(230)    NOT NULL                COMMENT 'Đường dẫn thân thiện',
    short_desc      VARCHAR(255)    DEFAULT NULL            COMMENT 'Mô tả ngắn',
    description     TEXT            DEFAULT NULL            COMMENT 'Mô tả chi tiết sản phẩm',
    stickiness      VARCHAR(100)    DEFAULT NULL            COMMENT 'Độ dẻo',
    aroma           VARCHAR(100)    DEFAULT NULL            COMMENT 'Độ thơm',
    cooking_guide   TEXT            DEFAULT NULL            COMMENT 'Hướng dẫn cách nấu',
    packaging       VARCHAR(255)    DEFAULT NULL            COMMENT 'Quy cách đóng gói (5kg,10kg,25kg,50kg)',
    origin          VARCHAR(150)    DEFAULT NULL            COMMENT 'Xuất xứ / vùng nguyên liệu',
    suitable_for    VARCHAR(255)    DEFAULT NULL            COMMENT 'Đối tượng phù hợp',
    image           VARCHAR(255)    DEFAULT NULL            COMMENT 'Ảnh đại diện sản phẩm',
    gallery         JSON            DEFAULT NULL            COMMENT 'Bộ sưu tập ảnh (mảng JSON)',
    price_note      VARCHAR(120)    NOT NULL DEFAULT 'Liên hệ nhận báo giá' COMMENT 'Ghi chú giá (không hiển thị giá)',
    is_featured     TINYINT(1)      NOT NULL DEFAULT 0      COMMENT '1=sản phẩm nổi bật',
    is_active       TINYINT(1)      NOT NULL DEFAULT 1      COMMENT '1=hiển thị, 0=ẩn',
    sort_order      INT             NOT NULL DEFAULT 0      COMMENT 'Thứ tự hiển thị',
    view_count      INT UNSIGNED    NOT NULL DEFAULT 0      COMMENT 'Lượt xem',
    meta_title      VARCHAR(255)    DEFAULT NULL            COMMENT 'Tiêu đề SEO',
    meta_description VARCHAR(320)   DEFAULT NULL            COMMENT 'Mô tả SEO',
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_products_slug (slug),
    KEY idx_products_category (category_id),
    KEY idx_products_active (is_active, sort_order),
    KEY idx_products_featured (is_featured),
    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id) REFERENCES categories (id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Sản phẩm gạo';

-- ---------------------------------------------------------------------
-- 3. BẢNG LIÊN HỆ / YÊU CẦU BÁO GIÁ (contacts)
-- ---------------------------------------------------------------------
CREATE TABLE contacts (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT COMMENT 'Khóa chính',
    full_name       VARCHAR(150)    NOT NULL                COMMENT 'Họ và tên khách',
    phone           VARCHAR(20)     NOT NULL                COMMENT 'Số điện thoại',
    email           VARCHAR(150)    DEFAULT NULL            COMMENT 'Email (tùy chọn)',
    customer_type   ENUM('le','si','nha_hang','tu_thien','khac')
                    NOT NULL DEFAULT 'le'                   COMMENT 'Loại khách: lẻ, sỉ, nhà hàng, từ thiện, khác',
    product_interest VARCHAR(200)   DEFAULT NULL            COMMENT 'Loại gạo quan tâm',
    quantity        VARCHAR(100)    DEFAULT NULL            COMMENT 'Số lượng dự kiến',
    message         TEXT            DEFAULT NULL            COMMENT 'Lời nhắn của khách',
    status          ENUM('new','contacted','quoted','done','spam')
                    NOT NULL DEFAULT 'new'                  COMMENT 'Trạng thái xử lý',
    admin_note      TEXT            DEFAULT NULL            COMMENT 'Ghi chú nội bộ của nhân viên',
    ip_address      VARCHAR(45)     DEFAULT NULL            COMMENT 'IP người gửi (chống spam)',
    user_agent      VARCHAR(255)    DEFAULT NULL            COMMENT 'Trình duyệt người gửi',
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_contacts_status (status),
    KEY idx_contacts_phone (phone),
    KEY idx_contacts_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Yêu cầu liên hệ / báo giá từ khách hàng';

-- =====================================================================
--  DỮ LIỆU MẪU (SEED DATA)
-- =====================================================================

INSERT INTO categories (name, slug, short_desc, icon, sort_order, meta_title, meta_description) VALUES
('Gạo Đặc Sản / Gạo Thơm', 'gao-dac-san', 'Thơm dẻo tự nhiên, đậm đà cho bữa cơm gia đình.', 'rice-premium', 1,
 'Gạo Đặc Sản - Gạo Thơm Cao Cấp | Xướng Hương Đà Nẵng',
 'Gạo đặc sản, gạo thơm cao cấp dẻo mềm, hương thơm tự nhiên. Đóng gói 5kg, 10kg, 25kg, 50kg. Giá tận gốc tại Đà Nẵng.'),
('Gạo Nở Xốp', 'gao-no-xop', 'Cơm tơi xốp, nở nhiều – lựa chọn số 1 cho quán cơm & nhà hàng.', 'rice-fluffy', 2,
 'Gạo Nở Xốp Cho Quán Cơm, Nhà Hàng | Xướng Hương',
 'Gạo nở xốp chuyên dụng cho quán cơm, nhà hàng, bếp ăn tập thể. Cơm tơi xốp, nở nhiều, tiết kiệm. Báo giá sỉ tận gốc.'),
('Gạo Nếp / Gạo Tấm', 'gao-nep-gao-tam', 'Nếp dẻo thơm cho xôi chè, gạo tấm cho cơm tấm chuẩn vị.', 'rice-glutinous', 3,
 'Gạo Nếp Dẻo - Gạo Tấm Ngon | Xướng Hương Đà Nẵng',
 'Gạo nếp dẻo thơm cho xôi chè, gạo tấm chuẩn vị cơm tấm. Đóng gói linh hoạt, giá tốt nhất Đà Nẵng.'),
('Gạo Lứt / Gạo Hữu Cơ', 'gao-lut-huu-co', 'Sạch – lành – bổ dưỡng cho người ăn kiêng, sống khỏe.', 'rice-brown', 4,
 'Gạo Lứt - Gạo Hữu Cơ Sạch | Xướng Hương',
 'Gạo lứt, gạo hữu cơ giàu dinh dưỡng cho người ăn kiêng, tiểu đường, eat clean. Canh tác sạch, an toàn.'),
('Gạo Đóng Bao Từ Thiện', 'gao-tu-thien', 'Gạo chất lượng, đóng bao theo yêu cầu cho hoạt động thiện nguyện.', 'rice-charity', 5,
 'Gạo Đóng Bao Từ Thiện Giá Ưu Đãi | Xướng Hương',
 'Gạo đóng bao từ thiện chất lượng, giá ưu đãi cho chương trình thiện nguyện. Đóng bao theo yêu cầu.');

INSERT INTO products
(category_id, name, slug, short_desc, description, stickiness, aroma, cooking_guide, packaging, suitable_for, price_note, is_featured, sort_order)
VALUES
(1, 'Gạo Đặc Sản Thơm Cao Cấp', 'gao-dac-san-thom-cao-cap',
 'Gạo thơm dẻo mềm, đậm đà cho bữa cơm gia đình và tiệc trang trọng.',
 'Dòng gạo cao cấp tuyển chọn từ giống lúa thơm nổi tiếng, hạt thon dài trắng trong, đều hạt, ít gãy. Cơm thơm lừng, dẻo mềm, để nguội vẫn ngon.',
 'Dẻo mềm vừa phải', 'Thơm tự nhiên đậm đà',
 'Vo nhẹ 1-2 lần, tỉ lệ 1 gạo : 1.2 nước, ngâm 10-15 phút trước khi nấu.',
 'Túi 5kg, Bao 10kg, 25kg, 50kg', 'Hộ gia đình, nhà hàng cao cấp, quà biếu',
 'Liên hệ nhận báo giá', 1, 1),
(2, 'Gạo Nở Xốp Chuyên Quán Cơm', 'gao-no-xop-quan-com',
 'Cơm nở nhiều, tơi xốp, kinh tế cho quán cơm và nhà hàng.',
 'Gạo lựa chọn đặc biệt cho quán cơm, nhà hàng, bếp ăn tập thể. Nở nhiều, cơm tơi rời không bết dính, để lâu vẫn ngon, tối ưu chi phí kinh doanh.',
 'Dẻo nhẹ vừa phải', 'Thơm nhẹ',
 'Tỉ lệ 1 gạo : 1.3-1.4 nước, phù hợp nồi cơm công nghiệp số lượng lớn.',
 'Bao 25kg, 50kg, Túi 5kg/10kg dùng thử', 'Quán cơm, nhà hàng, bếp ăn công nghiệp, căng tin',
 'Liên hệ nhận báo giá', 1, 2),
(3, 'Gạo Nếp Dẻo Thơm', 'gao-nep-deo-thom',
 'Nếp tròn mẩy, dẻo quánh, thơm đặc trưng cho xôi chè bánh.',
 'Gạo nếp hạt tròn mẩy, dẻo quánh, thơm đặc trưng. Xôi nấu lên bóng dẻo, để lâu không cứng. Lý tưởng cho xôi, chè, bánh truyền thống.',
 'Dẻo quánh', 'Thơm đặc trưng',
 'Ngâm 4-6 tiếng hoặc qua đêm, đồ/hấp cách thủy cho xôi dẻo ngon.',
 'Túi 5kg, Bao 10kg, 25kg, 50kg', 'Hộ gia đình, quán xôi chè, cơ sở làm bánh',
 'Liên hệ nhận báo giá', 0, 3),
(3, 'Gạo Tấm Chuẩn Vị Cơm Tấm', 'gao-tam-chuan-vi',
 'Gạo tấm đều hạt, cơm mềm thơm đúng chuẩn cơm tấm.',
 'Hạt gạo tấm đều, khi nấu cho cơm mềm, thơm nhẹ - đúng chuẩn cơm tấm sườn bì chả. Lựa chọn của các quán cơm tấm.',
 'Mềm dẻo', 'Thơm nhẹ',
 'Vo nhẹ, tỉ lệ 1 gạo : 1.2 nước, nấu như cơm thường.',
 'Túi 5kg, Bao 10kg, 25kg, 50kg', 'Quán cơm tấm, hộ gia đình',
 'Liên hệ nhận báo giá', 0, 4),
(4, 'Gạo Lứt Huyết Rồng', 'gao-lut-huyet-rong',
 'Giàu chất xơ và dinh dưỡng cho người ăn kiêng, sống khỏe.',
 'Gạo lứt giữ nguyên lớp cám giàu chất xơ, vitamin nhóm B, khoáng chất. Hỗ trợ tiêu hóa, kiểm soát đường huyết và cân nặng. Vị bùi ngọt hậu tự nhiên.',
 'Chắc, dẻo bùi', 'Thơm bùi tự nhiên',
 'Ngâm 2-4 tiếng, tỉ lệ 1 gạo : 1.5-2 nước, có thể dùng nồi áp suất.',
 'Túi 5kg, Bao 10kg, 25kg', 'Người ăn kiêng, tiểu đường, người cao tuổi, quán healthy',
 'Liên hệ nhận báo giá', 1, 5),
(5, 'Gạo Đóng Bao Từ Thiện', 'gao-dong-bao-tu-thien',
 'Gạo chất lượng, đóng bao theo yêu cầu, giá ưu đãi thiện nguyện.',
 'Gạo sạch an toàn, no đủ cho bữa cơm ý nghĩa. Đóng bao theo trọng lượng yêu cầu, có thể in thông tin nhà tài trợ. Giá ưu đãi đặc biệt cho hoạt động cộng đồng.',
 'Tùy loại', 'Tùy loại',
 'Theo loại gạo được chọn cho chương trình.',
 'Bao 5kg, 10kg, 25kg, 50kg theo yêu cầu', 'Tổ chức thiện nguyện, chùa, nhà thờ, doanh nghiệp CSR',
 'Liên hệ nhận báo giá', 0, 6);

-- =====================================================================
--  CÁC TRUY VẤN MẪU (VIEW THƯỜNG DÙNG)
-- =====================================================================

-- Lấy danh sách sản phẩm nổi bật kèm tên danh mục
-- SELECT p.*, c.name AS category_name
-- FROM products p
-- JOIN categories c ON c.id = p.category_id
-- WHERE p.is_active = 1 AND p.is_featured = 1
-- ORDER BY p.sort_order ASC;

-- Đếm số liên hệ mới chưa xử lý
-- SELECT COUNT(*) AS new_contacts FROM contacts WHERE status = 'new';
