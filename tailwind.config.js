/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#000000',
        'secondary': '#666666',
        'accent': '#000000',
      },
    },
  },
  plugins: [],
}
