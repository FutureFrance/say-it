/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light_black: 'rgba(15, 20, 25, 0.75)',
        mid_black: 'rgb(27, 18, 18)'
      }
    }
  },
  plugins: [],
}
