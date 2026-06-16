/* =====================================================================
 *  Điểm khởi động server - Gạo Xướng Hương
 * ===================================================================== */
'use strict';

require('dotenv').config();

const app = require('./src/app');
const { initDb } = require('./src/db');
const { initMailer } = require('./src/mailer');

const PORT = process.env.PORT || 3000;

(async function start() {
  await initDb(); // thử kết nối MySQL (không chặn nếu thất bại)
  initMailer(); // khởi tạo gửi email (SMTP hoặc chế độ mô phỏng)

  app.listen(PORT, () => {
    console.log('');
    console.log('  🌾  GẠO XƯỚNG HƯƠNG');
    console.log('  ───────────────────────────────────');
    console.log(`  ▶  Server chạy tại:  http://localhost:${PORT}`);
    console.log(`  ▶  Môi trường:       ${process.env.NODE_ENV || 'development'}`);
    console.log(`  ▶  Quản trị liên hệ: http://localhost:${PORT}/admin/lien-he`);
    console.log('');
  });
})();
