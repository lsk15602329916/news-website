import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { loadFonts } from './plugins/webfontloader'
import '@/assets/css/h.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

loadFonts()

const app = createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .use(ElementPlus)
    .use(VueAxios, axios);

app.mount('#app')