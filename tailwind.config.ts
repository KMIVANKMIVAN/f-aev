/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  /* theme: {
    extend: {},
  }, */
  theme: {
    extend: {
      colors: {
        "mi-color-primario": "#11435b",
        "mi-color-secundario": "#004f81",
        "mi-color-terceario": "#0058a9",
        "mi-color-cuartario": "#005ccd",
        "mi-color-quintario": "#4c5aea",
        "mi-color-sextario": "#44a4a6",
        "c1p": "#FF5F5D",
        "c2p": "#3F7C85",
        "c3p": "#00CCBF",
        "c4p": "#72F2EB",
        "c5p": "#747E7E",
        "c1p2": "#003840",
        "c2p2": "#005A5B",
        "c3p2": "#007369",
        "c4p2": "#008C72",
        "c5p2": "#02A676",
      },
      zIndex: {
        "500": "500",
      },
    },
  },
  plugins: [],
};
