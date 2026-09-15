/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Space Mono"', 'monospace'],
      serif: ['"Space Mono"', 'monospace'],
      mono: ['"Space Mono"', 'monospace'],
      anton: ['"Anton SC"', 'sans-serif'],
    },
    extend: {
      colors: {
        // ELARA color direction: electric blue (#168BFF), deep space navy (#06152F), metallic silver, white
        electric: '#168BFF',
        'electric-glow': 'rgba(22, 139, 255, 0.4)',
        navy: {
          DEFAULT: '#06152F',
          dark: '#030B17',
          light: '#0c224a',
          card: 'rgba(6, 21, 47, 0.75)',
        },
        silver: {
          DEFAULT: '#C0C7D6',
          light: '#E2E8F0',
          dark: '#8A99AD',
        },
      },
      boxShadow: {
        'electric': '0 0 25px rgba(22, 139, 255, 0.35)',
        'electric-lg': '0 0 40px rgba(22, 139, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
