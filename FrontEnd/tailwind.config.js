/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brownDark: '#74512D', // Example: dark brown
        brownLight: '#AF8F6F', // Example: light brown
      },
    },
  },
  plugins: [],
}

