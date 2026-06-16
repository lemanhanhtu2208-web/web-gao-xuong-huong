/* =====================================================================
 *  Controller xử lý form liên hệ / nhận báo giá.
 *  Validate dữ liệu phía server, làm sạch, rồi lưu qua db.saveContact.
 * ===================================================================== */
'use strict';

const db = require('../db');
const mailer = require('../mailer');

const CUSTOMER_TYPES = ['le', 'si', 'nha_hang', 'tu_thien', 'khac'];

/** Cắt khoảng trắng + giới hạn độ dài để tránh dữ liệu rác. */
function clean(value, maxLen) {
  if (value === undefined || value === null) return '';
  return String(value).trim().slice(0, maxLen);
}

/** Kiểm tra số điện thoại Việt Nam (9–12 chữ số sau khi bỏ ký tự định dạng). */
function isValidPhone(phone) {
  const digits = String(phone).replace(/[\s\-+.()]/g, '');
  return /^[0-9]{9,12}$/.test(digits);
}

function isValidEmail(email) {
  if (!email) return true; // email không bắt buộc
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** POST /api/contacts */
async function createContact(req, res) {
  const body = req.body || {};

  // Honeypot chống bot: trường ẩn "website" phải rỗng
  if (body.website) {
    return res.status(200).json({ ok: true, message: 'OK' });
  }

  const data = {
    full_name: clean(body.full_name, 150),
    phone: clean(body.phone, 20),
    email: clean(body.email, 150),
    customer_type: clean(body.customer_type, 20) || 'le',
    product_interest: clean(body.product_interest, 200),
    quantity: clean(body.quantity, 100),
    message: clean(body.message, 2000),
    ip_address: (req.headers['x-forwarded-for'] || req.ip || '').toString().slice(0, 45),
    user_agent: clean(req.headers['user-agent'], 255),
  };

  const errors = {};
  if (data.full_name.length < 2) errors.full_name = 'Vui lòng nhập họ và tên.';
  if (!isValidPhone(data.phone)) errors.phone = 'Số điện thoại không hợp lệ.';
  if (!isValidEmail(data.email)) errors.email = 'Email không hợp lệ.';
  if (!CUSTOMER_TYPES.includes(data.customer_type)) data.customer_type = 'le';

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ ok: false, errors });
  }

  try {
    const result = await db.saveContact(data);

    // Gửi email thông báo (không chặn phản hồi, không làm hỏng request nếu lỗi)
    mailer
      .sendContactNotification(data)
      .catch((e) => console.error('Mailer error:', e && e.message));

    return res.status(201).json({
      ok: true,
      storage: result.storage,
      message:
        'Cảm ơn bạn! Yêu cầu đã được ghi nhận. Xướng Hương sẽ liên hệ trong ít phút.',
    });
  } catch (err) {
    console.error('createContact error:', err);
    return res.status(500).json({
      ok: false,
      message:
        'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng gọi Hotline 0935 999 087 để được hỗ trợ ngay.',
    });
  }
}

module.exports = { createContact };
