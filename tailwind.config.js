/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'beige': {
          50: '#faf8f5',
          100: '#f2efe9',
          200: '#e5dfd4',
          300: '#d4c9b8',
        },
      }
    },
  },
  plugins: [],
}