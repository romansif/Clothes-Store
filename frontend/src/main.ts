import { createApp, type Directive } from 'vue'
import App from './App.vue';
import '@/app/styles/main.css';
import '@/app/styles/transition.modal.css';
import '@/app/styles/transition.notify.css';
import { IMaskDirective } from "vue-imask";
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from "./app/router/index";

const app = createApp(App)

app.directive('mask', IMaskDirective as Directive)

app
    .use(VueQueryPlugin)
    .use(router)
    .mount('#app')

