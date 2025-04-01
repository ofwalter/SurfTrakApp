/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'ocean-blue': '#1A73E8',
        'deep-cerulean': '#0056B3',
        'lighter-azure': '#2F95DC',
        'surf-blue': '#4AB1FF',
      },
    },
  },
  plugins: [],
} 