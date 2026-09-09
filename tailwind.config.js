/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-amber-400': colors.amber[400],
        'brand-amber-500': colors.amber[500],
        'brand-neutral-500': colors.neutral ? colors.neutral[500] : colors.gray[500],

        'text-neutral-700': colors.neutral ? colors.neutral[700] : colors.gray[700],
      },
    },
  },
  plugins: [],
}
