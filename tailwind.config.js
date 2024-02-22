/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"blue"
      },
      fontFamily: {
        sans: ['Inter'],
      },
      aspectRatio: {
        '4/3': '4 / 3',
      }
    },
  },
  plugins: [
  ],
}