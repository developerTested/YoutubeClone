/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
      },
      animation: {
        'play-fade': 'play-fade .5s linear 1 normal forwards',
        'pause-fade': 'pause-fade .5s linear 1 normal forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}