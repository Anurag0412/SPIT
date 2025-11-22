/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#FF6B9D',
          dark: '#FF4D7A',
          light: '#FF8FB3'
        },
        dark: {
          bg: '#0A0E27',
          card: '#141B2D',
          hover: '#1A2332'
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0A0E27 0%, #1A1F3A 100%)',
        'grid-pattern': 'linear-gradient(rgba(255, 107, 157, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 157, 0.1) 1px, transparent 1px)'
      },
      backgroundSize: {
        'grid': '50px 50px'
      }
    },
  },
  plugins: [],
}

