import "@/app/styles/index";
import router from "./app/router/index";
import { IMaskDirective } from "vue-imask";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { queryClient } from "@/shared/api/query-client";
import { createApp, type Directive } from "vue";
import { i18n } from "@/shared/i18n";

import App from "@/app/App.vue";

const app = createApp(App);

app.directive("mask", IMaskDirective as Directive);

app.use(i18n)
    .use(VueQueryPlugin, {
        queryClientConfig: {
          defaultOptions: {
            queries: { retry: 1, staleTime: 30_000, refetchOnWindowFocus: false },
          },
        },
        queryClient,
    })
    .use(router)
    .mount("#app");
