/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat', 'sans-serif'],
        header: ['Caveat', 'cursive']
      },
      colors: {
        primary: '#1FD35E',
        secondary: '#b3b3b3',
      },
      backgroundColor: {
        containerPrimary: '#1f1f1f',
        containerSecondary: '#2f2f2f',
      }
    }
  },
  plugins: [],
}