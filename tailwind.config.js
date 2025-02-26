/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      backgroundColor: {
        backgroud: '#354138',
        success: '#68BA7F',
      },
      fontFamily: {
        bold: ["notoSansThai-Bold", "sans-serif"],
        regular: ["notoSansThai-Regular", "sans-serif"],
      }
    },
  },
  plugins: [],
};
