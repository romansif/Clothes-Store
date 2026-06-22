import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from "./app/router/index";
import App from './App.vue'
import './app/styles/main.css'

const app = createApp(App)
app
    .use(VueQueryPlugin)
    .use(router)
    .mount('#app')
