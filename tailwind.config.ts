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
      },
    },
  },
  plugins: [],
};
