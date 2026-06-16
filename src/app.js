/* =====================================================================
 *  Cấu hình ứng dụng Express
 * ===================================================================== */
'use strict';

const path = require('path');
const express = require('express');

const site = require('./data/site');
const pagesRouter = require('./routes/pages');
const apiRouter = require('./routes/api');
const adminRouter = require('./routes/admin');

const app = express();

// View engine: EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Tin tưởng proxy (lấy đúng IP khi deploy sau reverse proxy như Nginx)
app.set('trust proxy', 1);

// Body parsers
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// Static files (CSS, JS, ảnh) — cache 7 ngày ở production
app.use(
  express.static(path.join(__dirname, '..', 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
  })
);

// Biến dùng chung cho mọi view
app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.currentPath = req.path;
  res.locals.layoutPlain = false;
  next();
});

// Routes
app.use('/', pagesRouter);
app.use('/api', apiRouter);
app.use('/admin', adminRouter);

// 404
app.use((req, res) => {
  res.status(404).render('404', {
    page: '404',
    title: 'Không tìm thấy trang | Gạo Xướng Hương',
    description: '',
  });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Lỗi máy chủ:', err);
  res.status(500).render('500', {
    page: '500',
    title: 'Lỗi máy chủ | Gạo Xướng Hương',
    description: '',
  });
});

module.exports = app;
