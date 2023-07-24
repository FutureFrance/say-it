/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        light_black: 'rgba(15, 20, 25, 0.75)',
        mid_black: 'rgb(27, 18, 18)',
        hover_comment_blue: 'rgba(22, 113, 174, 0.4)',
        hover_like_red: 'rgba(128, 40, 35, 0.8)',
        hover_view_gray: 'rgba(38, 38, 38, 0.8)',
        hover_tweet_gray: 'rgba(59, 68, 75, 0.09)',
        hover_follow_recommend_gray: 'rgba(255, 255, 255, 0.03)'
      }
    }
  },
  plugins: [],
}
