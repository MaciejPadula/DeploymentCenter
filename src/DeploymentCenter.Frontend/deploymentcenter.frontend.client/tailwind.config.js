/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'not-found': "url('/src/assets/not-found.jpg')",
      }
    },
  },
  plugins: [],
}

