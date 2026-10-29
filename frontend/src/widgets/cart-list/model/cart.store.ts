import { ref } from "vue";

const unreadCount = ref<number>(0);

export const cartStore = () => {
    return {
        unreadCount,
    };
};
