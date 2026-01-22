/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
  safelist: [
    {
      pattern:
        /bg-(blue|green|red|yellow|purple|pink|indigo|orange|teal|cyan|lime|emerald|sky|violet|fuchsia|rose|amber|gray)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /text-(blue|green|red|yellow|purple|pink|indigo|orange|teal|cyan|lime|emerald|sky|violet|fuchsia|rose|amber|gray)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /border-(blue|green|red|yellow|purple|pink|indigo|orange|teal|cyan|lime|emerald|sky|violet|fuchsia|rose|amber|gray)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
};

