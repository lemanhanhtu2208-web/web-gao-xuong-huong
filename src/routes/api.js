/* =====================================================================
 *  API routes
 * ===================================================================== */
'use strict';

const express = require('express');
const rateLimit = require('express-rate-limit');
const { createContact } = require('../controllers/contacts');

const router = express.Router();

// Giới hạn 8 yêu cầu / 10 phút / IP để chống spam form
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message:
      'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút hoặc gọi Hotline 0935 999 087.',
  },
});

router.post('/contacts', contactLimiter, createContact);

module.exports = router;
