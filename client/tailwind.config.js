/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4c7cb4',
        'primary-light': '#5f8dc1',
        secondary: '#fdd202',
      },
    },
  },
  plugins: [],
}
