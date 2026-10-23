import { ref } from "vue";
import type { CartItem } from "@/entities/cart-item";

const cart = ref<CartItem[]>([]);

const cartItem = ref<CartItem | null>(null);

const unreadCount = ref<number>(0);

export const cartStore = () => {
    return {
        cart,
        cartItem,
        unreadCount,
    }
}