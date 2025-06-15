/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'text-blue-900', 'border-blue-100', 'from-blue-400', 'to-blue-600', 'bg-blue-200',
    'text-rose-900', 'border-rose-100', 'from-rose-400', 'to-rose-600', 'bg-rose-200',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}