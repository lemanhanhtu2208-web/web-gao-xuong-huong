/* =====================================================================
 *  GẠO XƯỚNG HƯƠNG — main.js
 *  - Menu mobile (mở/đóng mượt)
 *  - Hiệu ứng reveal khi cuộn (IntersectionObserver)
 *  - Đếm số năng lực (counter)
 *  - Header thu gọn khi cuộn
 *  - Submit form báo giá qua AJAX (POST /api/contacts)
 *  - Tự điền loại gạo từ query ?sp=slug
 * ===================================================================== */
(function () {
  'use strict';

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. MENU MOBILE ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.style.maxHeight = '0px';
    if (menuBtn) {
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  }
  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
    if (menuBtn) {
      menuBtn.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var isOpen = menuBtn.classList.contains('is-open');
      if (isOpen) closeMenu();
      else openMenu();
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    // Đóng menu khi xoay ngang / phóng to qua breakpoint lg
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }

  /* ---------- 2. HEADER THU GỌN KHI CUỘN ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 3. REVEAL KHI CUỘN ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach(function (el) {
    var d = el.getAttribute('data-delay');
    if (d) el.style.setProperty('--reveal-delay', d + 'ms');
  });

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- 4. ĐẾM SỐ NĂNG LỰC ---------- */
  var counters = document.querySelectorAll('.counter');
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
    } else {
      var cio = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach(function (c) {
        cio.observe(c);
      });
    }
  }

  /* ---------- 5. TỰ ĐIỀN LOẠI GẠO TỪ QUERY ?sp= ---------- */
  var SLUG_TO_LABEL = {
    'gao-dac-san': 'Gạo đặc sản / Gạo thơm',
    'gao-no-xop': 'Gạo nở xốp',
    'gao-nep-gao-tam': 'Gạo nếp / Gạo tấm',
    'gao-lut-huu-co': 'Gạo lứt / Gạo hữu cơ',
    'gao-tu-thien': 'Gạo đóng bao từ thiện',
  };
  try {
    var params = new URLSearchParams(window.location.search);
    var sp = params.get('sp');
    var preselect = document.getElementById('product_interest');
    if (sp && preselect && SLUG_TO_LABEL[sp]) {
      preselect.value = SLUG_TO_LABEL[sp];
    }
  } catch (e) {}

  /* ---------- 6. SUBMIT FORM BÁO GIÁ (AJAX) ---------- */
  var form = document.getElementById('quote-form');
  if (form) {
    var submitBtn = document.getElementById('quote-submit');
    var msg = document.getElementById('form-msg');
    var labelEl = submitBtn ? submitBtn.querySelector('.btn-label') : null;
    var spinnerEl = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

    function setLoading(loading) {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      submitBtn.style.opacity = loading ? '0.8' : '1';
      if (labelEl) labelEl.classList.toggle('hidden', loading);
      if (spinnerEl) spinnerEl.classList.toggle('hidden', !loading);
    }
    function showMsg(text, ok) {
      if (!msg) return;
      msg.textContent = text;
      msg.classList.remove('hidden', 'form-msg-ok', 'form-msg-err');
      msg.classList.add(ok ? 'form-msg-ok' : 'form-msg-err');
    }
    function markInvalid(field) {
      var el = form.elements[field];
      if (el) {
        el.classList.add('invalid');
        el.addEventListener(
          'input',
          function () {
            el.classList.remove('invalid');
          },
          { once: true }
        );
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var fullName = form.full_name.value.trim();
      var phone = form.phone.value.trim();
      var phoneDigits = phone.replace(/[\s\-+.()]/g, '');

      if (fullName.length < 2) {
        showMsg('Vui lòng nhập họ và tên hợp lệ.', false);
        markInvalid('full_name');
        form.full_name.focus();
        return;
      }
      if (!/^[0-9]{9,12}$/.test(phoneDigits)) {
        showMsg('Vui lòng nhập số điện thoại hợp lệ.', false);
        markInvalid('phone');
        form.phone.focus();
        return;
      }

      var payload = {
        full_name: fullName,
        phone: phone,
        customer_type: form.customer_type ? form.customer_type.value : 'le',
        product_interest: form.product_interest ? form.product_interest.value : '',
        quantity: form.quantity ? form.quantity.value.trim() : '',
        message: form.message ? form.message.value.trim() : '',
        website: form.website ? form.website.value : '',
      };

      setLoading(true);
      if (msg) msg.classList.add('hidden');

      fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { status: res.status, data: data };
          });
        })
        .then(function (result) {
          setLoading(false);
          if (result.status >= 200 && result.status < 300 && result.data.ok) {
            showMsg(
              result.data.message ||
                'Cảm ơn bạn! Yêu cầu đã được ghi nhận. Xướng Hương sẽ liên hệ trong ít phút.',
              true
            );
            form.reset();
          } else if (result.data && result.data.errors) {
            var firstErr = Object.values(result.data.errors)[0];
            showMsg(firstErr || 'Vui lòng kiểm tra lại thông tin.', false);
          } else {
            showMsg(
              (result.data && result.data.message) ||
                'Có lỗi xảy ra. Vui lòng gọi Hotline để được hỗ trợ ngay.',
              false
            );
          }
        })
        .catch(function () {
          setLoading(false);
          showMsg(
            'Không gửi được yêu cầu (lỗi mạng). Vui lòng gọi Hotline 0935 999 087 hoặc nhắn Zalo.',
            false
          );
        });
    });
  }

  /* ---------- 7. FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var body = item.querySelector('.faq-body');
      var isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Đóng tất cả FAQ khác trước
      document.querySelectorAll('.faq-trigger[aria-expanded="true"]').forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          var otherBody = other.closest('.faq-item').querySelector('.faq-body');
          if (otherBody) otherBody.classList.remove('is-open');
        }
      });

      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      body.classList.toggle('is-open', !isOpen);
    });
  });

  /* ---------- 8. BACK TO TOP ---------- */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 9. SLIDER ẢNH (trang chi tiết sản phẩm) ---------- */
  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var track = slider.querySelector('[data-track]');
    if (!track) return;
    var slides = track.children;
    var total = slides.length;
    if (total <= 1) return;

    var dots = slider.querySelectorAll('[data-dots] .slider-dot');
    var thumbs = slider.querySelectorAll('[data-thumbs] .slider-thumb');
    var prevBtn = slider.querySelector('[data-prev]');
    var nextBtn = slider.querySelector('[data-next]');
    var index = 0;
    var timer = null;

    function render() {
      track.style.transform = 'translateX(' + -index * 100 + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === index); });
      thumbs.forEach(function (t, i) { t.classList.toggle('active', i === index); });
    }
    function goTo(i) {
      index = (i + total) % total;
      render();
    }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetAuto(); });
    slider.querySelectorAll('[data-go]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        goTo(parseInt(btn.getAttribute('data-go'), 10) || 0);
        resetAuto();
      });
    });

    // Vuốt trên điện thoại
    var startX = 0;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (dx > 40) prev();
      else if (dx < -40) next();
      resetAuto();
    }, { passive: true });

    // Tự động chạy (dừng khi rê chuột), tắt nếu người dùng muốn giảm chuyển động
    function startAuto() {
      if (prefersReduced) return;
      timer = setInterval(next, 5000);
    }
    function resetAuto() {
      if (timer) clearInterval(timer);
      startAuto();
    }
    slider.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
    slider.addEventListener('mouseleave', startAuto);

    render();
    startAuto();
  });
})();
