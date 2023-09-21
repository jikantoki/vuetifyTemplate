import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router/router'
import VueAdsense from 'vue-adsense'

require('@/styles/color.scss')

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .component('adsense', VueAdsense)
  .mount('#app')
