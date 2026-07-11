/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          950: '#08090b',
          900: '#0c0e12',
          850: '#101318',
          800: '#161a21',
          750: '#1c2129',
          700: '#232934',
          600: '#323a48',
          500: '#4a5468',
          400: '#6b7589',
          300: '#9099ac',
          200: '#c2c8d6',
          100: '#e4e7ee',
          50: '#f5f6fa',
        },
        accent: {
          DEFAULT: '#e0533d',
          hover: '#d04530',
          soft: 'rgba(224, 83, 61, 0.12)',
        },
        match: {
          DEFAULT: '#3dba7c',
          soft: 'rgba(61, 186, 124, 0.12)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 1.8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
