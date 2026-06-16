/* =====================================================================
 *  Page routes - render các trang giao diện bằng EJS.
 * ===================================================================== */
'use strict';

const express = require('express');
const router = express.Router();

const { categories, getCategoryBySlug } = require('../data/catalog');
const db = require('../db');

/** Lấy danh mục: ưu tiên DB, fallback dữ liệu tĩnh (giữ cùng cấu trúc hiển thị). */
async function loadCategories() {
  const fromDb = await db.getCategoriesFromDb();
  if (fromDb) {
    // Bổ sung các trường hiển thị mà bảng categories không có, dựa theo catalog tĩnh
    return fromDb.map((row) => {
      const fallback = getCategoryBySlug(row.slug) || {};
      return { ...fallback, ...row, tagline: row.short_desc || fallback.tagline };
    });
  }
  return categories;
}

// Trang chủ
router.get('/', async (req, res) => {
  const cats = await loadCategories();
  res.render('home', {
    page: 'home',
    title:
      'Gạo Xướng Hương Đà Nẵng | Xưởng Gạo Sỉ & Lẻ Giá Tận Gốc – Giao Tận Nơi',
    description:
      'Xưởng gạo Xướng Hương tại 111 Nguyễn Chí Diễu, Đà Nẵng. Cung cấp gạo đặc sản, gạo nở xốp, gạo nếp – tấm, gạo lứt hữu cơ cho nhà hàng, quán ăn và hộ gia đình. Giá tận gốc, giao tận nơi. Hotline 0935 999 087.',
    categories: cats,
  });
});

// Trang giới thiệu
router.get('/gioi-thieu', (req, res) => {
  res.render('about', {
    page: 'about',
    title: 'Giới Thiệu Xưởng Gạo Xướng Hương | Hành Trình & Chứng Nhận Chất Lượng',
    description:
      'Câu chuyện hơn 10 năm của Gạo Xướng Hương Đà Nẵng: cam kết gạo sạch tận gốc, chứng nhận VietGAP & An toàn thực phẩm, năng lực kho bãi quy mô lớn tại 111 Nguyễn Chí Diễu.',
  });
});

// Trang danh sách sản phẩm
router.get('/san-pham', async (req, res) => {
  const cats = await loadCategories();
  res.render('products', {
    page: 'products',
    title: 'Sản Phẩm Gạo | 5 Dòng Gạo Chủ Lực – Xướng Hương Đà Nẵng',
    description:
      'Khám phá 5 dòng gạo chủ lực của Xướng Hương: gạo đặc sản, gạo nở xốp, gạo nếp – tấm, gạo lứt – hữu cơ, gạo từ thiện. Đóng gói 5kg, 10kg, 25kg, 50kg. Liên hệ nhận báo giá tận gốc.',
    categories: cats,
  });
});

// Chi tiết danh mục sản phẩm
router.get('/san-pham/:slug', (req, res, next) => {
  const cat = getCategoryBySlug(req.params.slug);
  if (!cat) return next(); // -> 404
  const related = categories.filter((c) => c.slug !== cat.slug).slice(0, 3);
  res.render('product-detail', {
    page: 'products',
    title: `${cat.name} | Gạo Xướng Hương Đà Nẵng`,
    description: `${cat.tagline} ${cat.intro}`.slice(0, 300),
    category: cat,
    related,
  });
});

// Trang liên hệ
router.get('/lien-he', (req, res) => {
  res.render('contact', {
    page: 'contact',
    title: 'Liên Hệ Nhận Báo Giá | Gạo Xướng Hương – 111 Nguyễn Chí Diễu, Đà Nẵng',
    description:
      'Liên hệ Xướng Hương để nhận báo giá gạo sỉ & lẻ tận gốc tại Đà Nẵng. Hotline 0935 999 087, Zalo 0905 057 146, email gaodanang@gmail.com. Địa chỉ: 111 Nguyễn Chí Diễu.',
    sent: req.query.sent === '1',
  });
});

module.exports = router;
