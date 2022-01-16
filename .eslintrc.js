module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier-vue/recommended',
    'prettier',
  ],
  plugins: ['prettier', 'tailwindcss'],
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/singleline-html-element-content-newline': 0,
    'tailwindcss/no-custom-classname': 0,
    'vue/multi-word-component-names': 0,
  },
  settings: {
    'vue-i18n': {
      localeDir: './locales/de-DE.json',
      messageSyntaxVersion: '^8.23.0',
    },
    tailwindcss: {
      groupByResponsive: true,
    },
  },
}
