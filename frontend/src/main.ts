import { createApp, type Directive } from 'vue'
import GoggleSignInPlugin from 'vue3-google-signin'
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

app.use(GoggleSignInPlugin, {
    clientId: '852740655936-vj0k2mjakucfjvlgakmuatasukk769f1.apps.googleusercontent.com'
})
