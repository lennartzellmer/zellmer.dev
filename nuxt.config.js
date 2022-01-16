export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - zellmer.dev',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'I share things with a half-life period of > 3 years.',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'alternate icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'mask-icon',
        color: '#5bbad5',
        href: '/safari-pinned-tab.svg',
      },
    ],
  },

  router: {
    prefetchLinks: false,
  },

  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/tailwind.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['plugins/anime.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  prismic: {
    endpoint: 'https://zellmer-dev.cdn.prismic.io/api/v2',
    modern: true,
  },

  image: {
    provider: 'prismic',
    prismic: {},
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },

  fontLoader: {
    // Paste a google link here
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@200;300;400;500;600;700;800&display=swap',

    // Enable options
    prefetch: true,
    preconnect: true,
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-vite',
    '@nuxt/postcss8',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/prismic',
    '@nuxt/image',
    'nuxt-animejs',
    '@nuxt/typescript-build',
    'nuxt-font-loader',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
