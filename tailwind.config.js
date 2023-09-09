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
        hover_follow_recommend_gray: 'rgba(255, 255, 255, 0.03)',
        hover_search_user: 'rgba(255, 255, 255, 0.07)',
        light_blue: 'rgb(102, 178, 255)',
        white_text: 'rgb(231, 233, 234)',
        warning_red: 'rgb(244, 33, 46)',
        tweet_like: 'rgb(249, 24, 128)',
        hover_tweet_settings: 'rgba(22, 113, 174, 0.4)'
      },
      boxShadow: {
        'tweet_settings_hover': '10px 10px 12px 10px rgba(22, 113, 174, 0.4)',
      },
    }
  },
  plugins: [],
}
