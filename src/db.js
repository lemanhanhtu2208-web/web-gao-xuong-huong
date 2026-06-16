/* =====================================================================
 *  Lớp kết nối cơ sở dữ liệu (MySQL) với cơ chế fallback an toàn.
 *  - Nếu kết nối được MySQL: lưu/đọc trực tiếp.
 *  - Nếu KHÔNG (chưa cài DB, sai cấu hình): web vẫn chạy bình thường,
 *    liên hệ được ghi tạm vào data/contacts.jsonl để không mất dữ liệu.
 * ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

let pool = null;
let dbReady = false;

const FALLBACK_DIR = path.join(__dirname, '..', 'data');
const FALLBACK_FILE = path.join(FALLBACK_DIR, 'contacts.jsonl');

/** Khởi tạo pool kết nối; thử ping để xác định DB có sẵn sàng không. */
async function initDb() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'gao_xuong_huong',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4',
      timezone: '+07:00',
    });

    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    dbReady = true;
    console.log('✅ Kết nối MySQL thành công.');
  } catch (err) {
    dbReady = false;
    console.warn(
      '⚠️  Không kết nối được MySQL (' +
        err.code +
        '). Web vẫn chạy; liên hệ sẽ được lưu tạm vào data/contacts.jsonl'
    );
  }
}

function isDbReady() {
  return dbReady;
}

/** Ghi 1 liên hệ vào file JSONL dự phòng. */
function saveContactToFile(record) {
  if (!fs.existsSync(FALLBACK_DIR)) {
    fs.mkdirSync(FALLBACK_DIR, { recursive: true });
  }
  fs.appendFileSync(FALLBACK_FILE, JSON.stringify(record) + '\n', 'utf8');
}

/** Đọc các liên hệ từ file JSONL dự phòng (mới nhất trước). */
function readContactsFromFile(limit = 100) {
  if (!fs.existsSync(FALLBACK_FILE)) return [];
  const lines = fs
    .readFileSync(FALLBACK_FILE, 'utf8')
    .split('\n')
    .filter(Boolean);
  const rows = lines
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean)
    .reverse()
    .slice(0, limit);
  return rows;
}

/**
 * Lưu 1 yêu cầu liên hệ/báo giá.
 * @returns {Promise<{ok:boolean, storage:'mysql'|'file'}>}
 */
async function saveContact(data) {
  const record = {
    full_name: data.full_name,
    phone: data.phone,
    email: data.email || null,
    customer_type: data.customer_type || 'le',
    product_interest: data.product_interest || null,
    quantity: data.quantity || null,
    message: data.message || null,
    ip_address: data.ip_address || null,
    user_agent: data.user_agent || null,
    created_at: new Date().toISOString(),
  };

  if (dbReady && pool) {
    try {
      await pool.execute(
        `INSERT INTO contacts
          (full_name, phone, email, customer_type, product_interest, quantity, message, ip_address, user_agent)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          record.full_name,
          record.phone,
          record.email,
          record.customer_type,
          record.product_interest,
          record.quantity,
          record.message,
          record.ip_address,
          record.user_agent,
        ]
      );
      return { ok: true, storage: 'mysql' };
    } catch (err) {
      console.error('Lỗi ghi MySQL, chuyển sang file:', err.message);
      saveContactToFile(record);
      return { ok: true, storage: 'file' };
    }
  }

  saveContactToFile(record);
  return { ok: true, storage: 'file' };
}

/** Lấy danh sách liên hệ (cho trang admin). */
async function getContacts(limit = 100) {
  if (dbReady && pool) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM contacts ORDER BY created_at DESC LIMIT ?',
        [limit]
      );
      return rows;
    } catch (err) {
      console.error('Lỗi đọc MySQL:', err.message);
    }
  }
  return readContactsFromFile(limit);
}

/**
 * Lấy danh mục sản phẩm. Ưu tiên DB; nếu không có thì trả null để
 * caller dùng dữ liệu tĩnh trong catalog.js.
 */
async function getCategoriesFromDb() {
  if (dbReady && pool) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM categories WHERE is_active = 1 ORDER BY sort_order ASC'
      );
      if (rows && rows.length) return rows;
    } catch (err) {
      console.error('Lỗi đọc categories:', err.message);
    }
  }
  return null;
}

module.exports = {
  initDb,
  isDbReady,
  saveContact,
  getContacts,
  getCategoriesFromDb,
};
