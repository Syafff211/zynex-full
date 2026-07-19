// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#060606',
        ivory: '#F4F0E8',
        accent: '#D8C6A4',
      },
      letterSpacing: {
        luxe: '0.35em',
        wide2: '0.18em',
      },
    },
  },
  plugins: [],
};