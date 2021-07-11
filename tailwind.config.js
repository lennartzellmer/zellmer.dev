const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        gray: colors.warmGray,
        green: colors.green,
        yellow: colors.yellow,
        primary: {
          100: '#F8FAF0',
          200: '#EBF1D5',
          300: '#DDE8B9',
          400: '#A4AD86',
          500: '#6A7152',
          600: '#565C43',
          700: '#424733',
          800: '#2C3022',
          900: '#161811',
        },
        action: {
          red: '#F34616',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
