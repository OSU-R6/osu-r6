/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          'osu': {
            'light': '#E05B24',
            DEFAULT: '#DC4405',
            'dark': '#C13C04'
          }
        },
        fontFamily: {
          scoutCB: "Scout Condensed Bold",
          scoutCR: "Scout Condensed Regular",
        },
      }
    },
    plugins: [],
  }