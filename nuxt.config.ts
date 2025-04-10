// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  css: [ 
    './assets/styles.css' 
  ],
  app: {
    head: {
      script: [
        // {
        //   // src: '/scripts/plain-draggable.min.js'
        //   src: '/scripts/interact.min.js'
        // },
        // {
        //   src: '/scripts/plain-draggable.js'
        // }
      ],
    }
  }
})
