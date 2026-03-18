/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "xs":"450px"
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #7A2E1D, #9B7A2F)',
        'gradient-color': 'linear-gradient(to right, var(--themeColor), var(--accent-color))',
      },
    },
  },
  plugins: [],
}