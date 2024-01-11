/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: [
    {
      '@tailwindcss/forms': {
        strategy: 'base' // only generate global styles
      }
    }
  ]
}
