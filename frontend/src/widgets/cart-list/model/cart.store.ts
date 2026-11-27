import { ref } from "vue";

const unreadCount = ref<number>(0);

export const cartStore = () => ({
  unreadCount,
  increment: () => { unreadCount.value++ },
  reset: () => { unreadCount.value = 0 },
});
