import { ref, watch } from "vue";

import router from "@/app/router";

const unreadCount = ref<number>(0);

export const cartStore = () => {
  watch(
    () => router.currentRoute.value.name,
    (name) => {
      if (name === "cart") unreadCount.value = 0;
    },
    { immediate: true },
  );

  return {
    unreadCount,
  };
};
