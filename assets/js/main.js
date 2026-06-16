/* =====================================================================
 *  GẠO XƯỚNG HƯƠNG - main.js
 *  Xử lý: menu mobile, đóng menu khi click link, submit form báo giá.
 * ===================================================================== */
(function () {
    'use strict';

    // ---------- 1. Menu mobile ----------
    var menuBtn = document.getElementById('menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            menuBtn.textContent = mobileMenu.classList.contains('hidden') ? '☰' : '✕';
        });

        // Đóng menu khi bấm vào 1 liên kết
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                menuBtn.textContent = '☰';
            });
        });
    }

    // ---------- 2. Đổ bóng header khi cuộn ----------
    var header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 30) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        }, { passive: true });
    }

    // ---------- 3. Xử lý form báo giá ----------
    var form = document.getElementById('quote-form');
    var formMsg = document.getElementById('form-msg');

    function showMessage(text, ok) {
        if (!formMsg) return;
        formMsg.textContent = text;
        formMsg.classList.remove('hidden', 'text-zalo', 'text-red-600');
        formMsg.classList.add(ok ? 'text-zalo' : 'text-red-600');
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var fullName = form.full_name.value.trim();
            var phone = form.phone.value.trim();

            // Kiểm tra cơ bản
            if (fullName.length < 2) {
                showMessage('Vui lòng nhập họ và tên hợp lệ.', false);
                form.full_name.focus();
                return;
            }
            var phoneClean = phone.replace(/[\s\-\+]/g, '');
            if (!/^[0-9]{9,12}$/.test(phoneClean)) {
                showMessage('Vui lòng nhập số điện thoại hợp lệ.', false);
                form.phone.focus();
                return;
            }

            // Thu thập dữ liệu (sẵn sàng gửi tới backend /api/contacts)
            var payload = {
                full_name: fullName,
                phone: phone,
                customer_type: form.customer_type.value,
                product_interest: form.product_interest.value,
                quantity: form.quantity.value.trim(),
                message: form.message.value.trim()
            };

            /*
             * Khi có backend, thay phần dưới bằng:
             *
             * fetch('/api/contacts', {
             *     method: 'POST',
             *     headers: { 'Content-Type': 'application/json' },
             *     body: JSON.stringify(payload)
             * })
             * .then(function (res) { return res.json(); })
             * .then(function () { ... })
             * .catch(function () { ... });
             */

            // Demo: lưu tạm và mở Zalo với nội dung soạn sẵn
            try {
                console.log('Yêu cầu báo giá:', payload);
            } catch (err) {}

            showMessage('Cảm ơn bạn! Yêu cầu đã được ghi nhận. Xướng Hương sẽ liên hệ trong ít phút.', true);
            form.reset();

            // Gợi ý chuyển sang Zalo để được tư vấn ngay
            var zaloText = encodeURIComponent(
                'Xin chào Xướng Hương, tôi là ' + payload.full_name +
                ' (' + payload.phone + '). Tôi quan tâm: ' +
                (payload.product_interest || 'gạo các loại') +
                (payload.quantity ? (', số lượng ' + payload.quantity) : '') +
                '. Vui lòng báo giá giúp tôi.'
            );
            setTimeout(function () {
                window.open('https://zalo.me/0905057146?text=' + zaloText, '_blank');
            }, 800);
        });
    }
})();
