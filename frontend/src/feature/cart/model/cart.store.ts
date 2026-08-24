import {ref} from "vue";
import { type CartItem } from "@/feature/cart/model/cart.types.ts";

const cart = ref<CartItem[]>([]);

const unreadCount = ref<number>(0);

export const cartStore = () => {
    return {
        cart,
        unreadCount,
    }
}