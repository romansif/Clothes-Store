import { createApp } from 'vue'
import { IMaskDirective } from "vue-imask";
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from "./app/router/index";
import App from './App.vue'
import './app/styles/main.css'

const app = createApp(App)

app.directive('mask', IMaskDirective)

app
    .use(VueQueryPlugin)
    .use(router)
    .mount('#app')
