import "@/app/styles/index";
import { createApp, type Directive } from "vue";
import { IMaskDirective } from "vue-imask";
import { VueQueryPlugin } from "@tanstack/vue-query";

import App from "@/app/App.vue";
import { queryClient } from "@/shared/api";
import { i18n } from "@/shared/i18n";

import router from "@/app/router";

import { setUnauthorizedHandler } from "@/shared/api/http";
import { resetCheckoutSession } from "@/entities/checkout-session";

setUnauthorizedHandler(async () => {
    resetCheckoutSession();

    const current = router.currentRoute.value;
    if (current.name !== "signIn") {
        await router.replace({ name: "signIn", query: { redirect: current.fullPath } });
    }
});

const app = createApp(App);

app.directive("mask", IMaskDirective as Directive);

app
  .use(i18n)
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
