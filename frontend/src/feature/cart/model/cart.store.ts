import {ref} from "vue";
import { type CartItem } from "@/feature/cart/model/cart.types.ts";

export const cartStore = () => {
    const cart = ref<CartItem[]>([]);

    const unreadCount = ref<number>(0);

    return {
        cart,
        unreadCount,
    }
}