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
          light: '#FF8FB3',
          50: '#FFF0F5',
          100: '#FFE0EB',
          200: '#FFB3D1',
          300: '#FF80B7',
          400: '#FF4D9D',
          500: '#FF1A83',
          600: '#E6006F',
          700: '#CC005B',
          800: '#B30047',
          900: '#990033'
        },
        primary: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
          light: '#818CF8'
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
          light: '#A78BFA'
        },
        success: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399'
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          light: '#FBBF24'
        },
        danger: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          light: '#F87171'
        },
        dark: {
          bg: '#0A0E27',
          card: '#141B2D',
          hover: '#1A2332',
          border: '#1E293B'
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0A0E27 0%, #1A1F3A 50%, #0F172A 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FF6B9D 0%, #FF4D7A 50%, #FF1A83 100%)',
        'gradient-primary': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(20, 27, 45, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
        'grid-pattern': 'linear-gradient(rgba(255, 107, 157, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 157, 0.05) 1px, transparent 1px)',
        'glow-accent': 'radial-gradient(circle at center, rgba(255, 107, 157, 0.3) 0%, transparent 70%)'
      },
      backgroundSize: {
        'grid': '50px 50px'
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 107, 157, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 107, 157, 0.4)',
        'glow-primary': '0 0 20px rgba(99, 102, 241, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(255, 107, 157, 0.1)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 107, 157, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}

