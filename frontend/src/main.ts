import { createApp, type Directive } from "vue";

import App from "@/app/App.vue";
import { i18n } from "@/app/i18n";

import "@/app/styles/index";

import { IMaskDirective } from "vue-imask";
import { VueQueryPlugin } from "@tanstack/vue-query";

import { queryClient } from "@/shared/api/query-client";

import router from "./app/router/index";

const app = createApp(App);

app.directive("mask", IMaskDirective as Directive);

app.use(i18n);

app
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
