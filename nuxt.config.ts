// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui','@pinia/nuxt'],
  css: ['~/assets/css/nuxt.css', '@/assets/css/variables.css','~/assets/css/global.scss']
})
