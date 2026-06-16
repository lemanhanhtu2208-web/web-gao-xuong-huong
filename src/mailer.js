/* =====================================================================
 *  GỬI EMAIL THÔNG BÁO LIÊN HỆ / BÁO GIÁ
 *  - Khi đã cấu hình SMTP trong .env  -> gửi email thật tới MAIL_TO.
 *  - Khi CHƯA cấu hình SMTP           -> chạy chế độ "mô phỏng" (in nội
 *    dung email ra console), web vẫn hoạt động bình thường.
 *
 *  Gợi ý cấu hình Gmail (dùng "Mật khẩu ứng dụng" 16 ký tự, KHÔNG dùng
 *  mật khẩu đăng nhập thường):
 *    SMTP_HOST=smtp.gmail.com
 *    SMTP_PORT=465
 *    SMTP_SECURE=true
 *    SMTP_USER=gaodanang@gmail.com
 *    SMTP_PASS=xxxx xxxx xxxx xxxx
 *    MAIL_TO=gaodanang@gmail.com
 * ===================================================================== */
'use strict';

let nodemailer = null;
try {
  // require trong try để web vẫn chạy nếu chưa cài nodemailer
  nodemailer = require('nodemailer');
} catch (e) {
  nodemailer = null;
}

const CUSTOMER_TYPE_LABEL = {
  le: 'Mua lẻ (gia đình)',
  si: 'Mua sỉ',
  nha_hang: 'Nhà hàng / Quán ăn',
  tu_thien: 'Từ thiện',
  khac: 'Khác',
};

let transporter = null;
let mode = 'mock'; // 'smtp' | 'mock'

function initMailer() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (nodemailer && host && user && pass) {
    transporter = nodemailer.createTransport({
      host: host,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true') === 'true',
      auth: { user: user, pass: pass },
    });
    mode = 'smtp';
    console.log('✅ Mailer: gửi email qua SMTP (' + host + ').');
  } else {
    mode = 'mock';
    console.log(
      'ℹ️  Mailer: chế độ MÔ PHỎNG (chưa cấu hình SMTP). Nội dung email sẽ in ra console.'
    );
  }
}

/** Thoát ký tự HTML để tránh lỗi hiển thị/chèn mã. */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Dựng nội dung email HTML từ dữ liệu liên hệ. */
function buildHtml(data) {
  const typeLabel = CUSTOMER_TYPE_LABEL[data.customer_type] || data.customer_type || '';
  const time = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const rows = [
    ['Họ và tên', data.full_name],
    ['Số điện thoại', data.phone],
    ['Email', data.email || '—'],
    ['Loại khách hàng', typeLabel],
    ['Loại gạo quan tâm', data.product_interest || '—'],
    ['Số lượng dự kiến', data.quantity || '—'],
    ['Lời nhắn', data.message || '—'],
    ['Thời gian gửi', time],
  ];

  const tr = rows
    .map(function (r) {
      return (
        '<tr>' +
        '<td style="padding:10px 14px;background:#F3EADD;font-weight:600;color:#4A2F1A;white-space:nowrap;border-bottom:1px solid #DDD0BE;">' +
        esc(r[0]) +
        '</td>' +
        '<td style="padding:10px 14px;color:#2E2117;border-bottom:1px solid #DDD0BE;">' +
        esc(r[1]) +
        '</td>' +
        '</tr>'
      );
    })
    .join('');

  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #DDD0BE;border-radius:12px;overflow:hidden;">' +
    '<div style="background:#6B4226;color:#FAF6F0;padding:18px 22px;">' +
    '<h2 style="margin:0;font-size:18px;">🌾 Yêu cầu báo giá mới — Gạo Xướng Hương</h2>' +
    '<p style="margin:6px 0 0;font-size:13px;color:#E8D9C0;">Có khách hàng vừa để lại thông tin trên website.</p>' +
    '</div>' +
    '<table style="width:100%;border-collapse:collapse;font-size:14px;">' +
    tr +
    '</table>' +
    '<div style="padding:14px 22px;background:#FAF6F0;font-size:12px;color:#6F6256;">' +
    'Gọi lại cho khách: <a href="tel:' +
    esc(String(data.phone).replace(/\s/g, '')) +
    '" style="color:#6B4226;font-weight:600;">' +
    esc(data.phone) +
    '</a></div>' +
    '</div>'
  );
}

/** Dựng nội dung email dạng text thuần (fallback). */
function buildText(data) {
  const typeLabel = CUSTOMER_TYPE_LABEL[data.customer_type] || data.customer_type || '';
  return [
    'YÊU CẦU BÁO GIÁ MỚI — GẠO XƯỚNG HƯƠNG',
    '----------------------------------------',
    'Họ và tên: ' + data.full_name,
    'Số điện thoại: ' + data.phone,
    'Email: ' + (data.email || '—'),
    'Loại khách hàng: ' + typeLabel,
    'Loại gạo quan tâm: ' + (data.product_interest || '—'),
    'Số lượng dự kiến: ' + (data.quantity || '—'),
    'Lời nhắn: ' + (data.message || '—'),
    'Thời gian: ' + new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
  ].join('\n');
}

/**
 * Gửi email thông báo liên hệ. Không bao giờ ném lỗi ra ngoài
 * (để không làm hỏng phản hồi cho khách dù email lỗi).
 * @returns {Promise<{ok:boolean, mode:string}>}
 */
async function sendContactNotification(data) {
  const to = process.env.MAIL_TO || process.env.SITE_EMAIL || 'gaodanang@gmail.com';
  const from =
    process.env.MAIL_FROM ||
    '"Website Gạo Xướng Hương" <' + (process.env.SMTP_USER || to) + '>';
  const subject =
    '🌾 [Báo giá] ' +
    (data.full_name || 'Khách hàng') +
    ' - ' +
    (data.phone || '') +
    (data.product_interest ? ' - ' + data.product_interest : '');

  if (mode === 'smtp' && transporter) {
    try {
      await transporter.sendMail({
        from: from,
        to: to,
        replyTo: data.email || undefined,
        subject: subject,
        text: buildText(data),
        html: buildHtml(data),
      });
      return { ok: true, mode: 'smtp' };
    } catch (err) {
      console.error('⚠️  Gửi email thất bại:', err.message);
      return { ok: false, mode: 'smtp' };
    }
  }

  // Chế độ mô phỏng
  console.log('\n📧 [MÔ PHỎNG EMAIL] Gửi tới: ' + to);
  console.log('   Tiêu đề: ' + subject);
  console.log(buildText(data).replace(/^/gm, '   '));
  console.log('');
  return { ok: true, mode: 'mock' };
}

module.exports = { initMailer, sendContactNotification };
