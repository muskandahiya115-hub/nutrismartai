/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0FAF4',
          100: '#DCF3E5',
          200: '#B9E7CB',
          300: '#86D5A6',
          400: '#4DBB7D',
          500: '#2A9D5F',
          600: '#1E7F4B',
          700: '#1A6540',
          800: '#185134',
          900: '#15432C',
        },
        cream: {
          50: '#FFFDF7',
          100: '#FBF8F1',
          200: '#F5EFE1',
          300: '#EBE2CC',
        },
        accent: {
          100: '#FDF1D6',
          400: '#F5B942',
          500: '#E9A21E',
          600: '#C98410',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(21, 67, 44, 0.18)',
        lift: '0 24px 50px -20px rgba(21, 67, 44, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
