import {ref} from "vue";
import { type CartItem } from "@/entities/cart/model/cart.types.ts";

const cart = ref<CartItem[]>([]);

const cartItem = ref<CartItem>({} as CartItem);

const unreadCount = ref<number>(0);

export const cartStore = () => {
    return {
        cart,
        cartItem,
        unreadCount,
    }
}