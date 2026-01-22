module.exports = {
  plugins: {
    tailwindcss: {},
    '@csstools/postcss-oklab-function': {
      preserve: false, // Конвертирует oklch в rgb
    },
    autoprefixer: {},
  },
}