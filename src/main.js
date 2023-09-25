import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router/router'

require('@/styles/color.scss')
//import env from '/my.env.js'
//require('dotenv').config() //Not Working

const envKeys = Object.keys(env)
envKeys.forEach((key) => {
  process.env[key] = env[key]
})

loadFonts()

createApp(App).use(router).use(vuetify).mount('#app')
