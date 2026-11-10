/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#173D32',
          50: '#F2F7F5',
          100: '#E1EDE8',
          200: '#C0DCD2',
          300: '#94C3B4',
          400: '#5A9C87',
          500: '#2D6B57',
          600: '#1E5041',
          700: '#173D32',
          800: '#102B23',
          900: '#0B1D18',
          950: '#060F0C',
        },
        ivory: {
          DEFAULT: '#FFF9EF',
          light: '#FFFDF8',
          dark: '#F5ECDB',
        },
        gold: {
          DEFAULT: '#C49A52',
          light: '#DFC085',
          dark: '#9E7835',
          pale: '#F8F1E2',
        },
        sage: {
          DEFAULT: '#A6B49B',
          light: '#CDD7C6',
          dark: '#7D8C72',
        },
        charcoal: {
          DEFAULT: '#252824',
          light: '#4C504A',
          dark: '#141613',
        },
        cream: {
          DEFAULT: '#F7F3EA',
          50: '#FCFAF6',
          100: '#F7F3EA',
          200: '#EDE4D2',
          300: '#DFCDB0',
        }
      },
      fontFamily: {
        royal: ['Marcellus', 'Cinzel', 'serif'],
        display: ['"Rozha One"', 'Marcellus', 'Cinzel', 'serif'],
        serif: ['"Cormorant Garamond"', 'Marcellus', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'royal': '0 10px 30px -10px rgba(23, 61, 50, 0.15)',
        'royal-gold': '0 8px 25px -5px rgba(196, 154, 82, 0.25)',
        'soft-card': '0 4px 20px -2px rgba(37, 40, 36, 0.05)',
      }
    },
  },
  plugins: [],
}
