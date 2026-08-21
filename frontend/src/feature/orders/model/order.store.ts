import {ref} from "vue";
import type { OrderItem, Order } from "@/feature/orders/model/order.types.ts";

export const orderStore = () => {
    const orders = ref<Order[]>([]);

    const orderItems = ref<OrderItem[]>([]);

    const items = ref<OrderItem[]>(JSON.parse(localStorage.getItem('orderItems') || '[]'));

    return {
        orders,
        orderItems,
        items,
    }
}