/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        varyz: {
          navy: '#06162C',
          'navy-light': '#0B2240',
          'navy-surface': '#102A4E',
          lime: '#8CCB45',
          'lime-bright': '#A5E35A',
          purple: '#6B3CE8',
          'purple-light': '#8A5DF2',
          offwhite: '#F5F7F1',
          card: 'rgba(11, 34, 64, 0.7)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle at 1px 1px, rgba(140, 203, 69, 0.15) 1px, transparent 0)",
        'hero-gradient': "radial-gradient(circle at 50% 0%, rgba(107, 60, 232, 0.25) 0%, rgba(6, 22, 44, 0) 70%)",
        'card-gradient': "linear-gradient(135deg, rgba(16, 42, 78, 0.8) 0%, rgba(6, 22, 44, 0.9) 100%)",
        'lime-gradient': "linear-gradient(135deg, #8CCB45 0%, #A5E35A 100%)",
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(140, 203, 69, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(107, 60, 232, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};

