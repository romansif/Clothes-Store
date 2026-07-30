import { createApp, type Directive } from 'vue'
import { IMaskDirective } from "vue-imask";
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from "./app/router/index";
import App from './App.vue'
import './app/styles/main.css'

const app = createApp(App)

app.directive('mask', IMaskDirective as Directive)

app
    .use(VueQueryPlugin)
    .use(router)
    .mount('#app')
