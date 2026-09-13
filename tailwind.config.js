/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,css}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
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
