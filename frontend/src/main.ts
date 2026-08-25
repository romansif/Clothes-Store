import { createApp, type Directive } from 'vue'
import App from '@/app/App.vue';

import '@/app/styles/main.css';
import '@/app/styles/transition.list.css';
import '@/app/styles/transition.modal.css';
import '@/app/styles/transition.sidebar.css'
import '@/app/styles/transition.view-list.css'

import { IMaskDirective } from "vue-imask";
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from "./app/router/index";

const app = createApp(App)

app.directive('mask', IMaskDirective as Directive)

app
    .use(VueQueryPlugin)
    .use(router)
    .mount('#app')

