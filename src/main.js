import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router/router'
import i18n from './i18n'

require('@/styles/color.scss')

loadFonts()

createApp(App).use(router).use(vuetify).use(i18n).mount('#app')
