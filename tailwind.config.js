/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        15: '15',
      },
    },
  },
  plugins: [],
};
