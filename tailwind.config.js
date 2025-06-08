// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",  
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#0D1321",
        navyBlue: "#1D2D44",
        steelBlue: "#3E5C76",
        grayBlue: "#748CAB",
        lightBeige: "#F0EBD8",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
}
