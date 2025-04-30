/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './views/**/*.ejs',
      './public/**/*.js'
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/line-clamp'),
    ],
  }