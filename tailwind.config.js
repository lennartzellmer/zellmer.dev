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
        slate: {
          1: '#fbfcfd',
          2: '#f8f9fa',
          3: '#f1f3f5',
          4: '#eceef0',
          5: '#e6e8eb',
          6: '#dfe3e6',
          7: '#d7dbdf',
          8: '#c1c8cd',
          9: '#889096',
          10: '#7e868c',
          11: '#687076',
          12: '#11181c',
        },
        sand: {
          1: '#fdfdfc',
          2: '#f9f9f8',
          3: '#f3f3f2',
          4: '#eeeeec',
          5: '#e9e9e6',
          6: '#e3e3e0',
          7: '#dbdbd7',
          8: '#c8c7c1',
          9: '#90908c',
          10: '#868682',
          11: '#706f6c',
          12: '#1b1b18',
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
