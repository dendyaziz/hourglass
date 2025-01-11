// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],

  pwa: {
    registerType: 'autoUpdate', // Automatically updates the service worker
    manifest: {
      id: '/',
      name: 'Hourglass',
      short_name: 'Hourglass',
      description: 'Clock and countdown app',
      theme_color: '#1D232A',
      background_color: '#1D232A',
      icons: [
        {
          src: '/hourglass-logo-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/hourglass-logo-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      screenshots: [
        {
          src: '/screenshot-wide.png',
          sizes: '1280x720',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Desktop',
        },
        {
          src: '/screenshot-narrow.png',
          sizes: '720x1280',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'Mobile',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true, // Enables PWA during development for testing
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          href: '/favicon.ico?v=3',
        },
      ],
    },
  },

  plugins: [
    '~/plugins/device',
  ],
})
