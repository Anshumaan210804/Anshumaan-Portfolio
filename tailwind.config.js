/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./src/**/*.{js,jsx,ts,tsx}"],
theme: {
  extend: {
    keyframes: {
      flip: {
        '0%': { transform: 'rotateY(90deg)' },
        '100%': { transform: 'rotateY(0)' },
      },
    },
    animation: {
      flip: 'flip 0.5s ease-out',
    },
  },
},
  plugins: [],
}