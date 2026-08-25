import {ref} from "vue";
import type { OrderItem, Order } from "@/entities/order/model/order.types.ts";

const orders = ref<Order[]>([]);

const orderItems = ref<OrderItem[]>([]);

const items = ref<OrderItem[]>(JSON.parse(localStorage.getItem('orderItems') || '[]'));

export const orderStore = () => {
    return {
        orders,
        orderItems,
        items,
    }
}