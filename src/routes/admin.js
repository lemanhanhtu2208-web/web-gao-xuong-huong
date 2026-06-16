/* =====================================================================
 *  Trang quản trị tối giản: xem danh sách liên hệ / báo giá.
 *  Bảo vệ bằng HTTP Basic Auth (cấu hình trong .env).
 * ===================================================================== */
'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db');

function basicAuth(req, res, next) {
  const user = process.env.ADMIN_USER || 'admin';
  const pass = process.env.ADMIN_PASSWORD || 'doimatkhaungay';

  const header = req.headers.authorization || '';
  const token = header.split(' ')[1] || '';
  const [u, p] = Buffer.from(token, 'base64').toString().split(':');

  if (u === user && p === pass) return next();

  res.set('WWW-Authenticate', 'Basic realm="Khu vuc quan tri Xuong Huong"');
  return res.status(401).send('Cần đăng nhập để truy cập.');
}

router.get('/lien-he', basicAuth, async (req, res) => {
  const contacts = await db.getContacts(200);
  res.render('admin-contacts', {
    page: 'admin',
    title: 'Quản trị · Danh sách liên hệ',
    description: '',
    contacts,
    storage: db.isDbReady() ? 'MySQL' : 'File (data/contacts.jsonl)',
    layoutPlain: true,
  });
});

module.exports = router;
