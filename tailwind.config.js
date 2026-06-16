/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/js/**/*.js',
  ],
  safelist: [
    // Các lớp được thêm động bằng JavaScript
    'shadow-md',
    'py-1',
    'py-3',
    'bg-cream/95',
    'is-open',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', lg: '2rem' },
    },
    extend: {
      colors: {
        primary: '#6B4226',
        'primary-dark': '#4A2F1A',
        secondary: '#8B5E34',
        accent: '#D9A441',
        'accent-dark': '#C2912F',
        'accent-soft': '#E8D9C0',
        cream: '#FAF6F0',
        'cream-2': '#F3EADD',
        'text-main': '#2E2117',
        'text-soft': '#6F6256',
        'border-soft': '#DDD0BE',
        zalo: '#2FAE60',
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 40px -12px rgba(74,47,26,.22)',
        card: '0 10px 30px -10px rgba(74,47,26,.18)',
      },
    },
  },
  plugins: [],
};
