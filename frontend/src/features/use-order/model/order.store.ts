import { ref } from "vue";
import type { OrderItem, Order } from "@/features/use-order/model/order.types.ts";

const orders = ref<Order[]>([]);

const orderItems = ref<OrderItem[]>([]);

const items = ref<OrderItem[]>(JSON.parse(localStorage.getItem('orderItems') || '[]'));

const orderId = ref<string>('');
const productId = ref<string>('');

const ratingDirection = ref<'up' | 'down'>('up');

const ratings = [
    1,
    2,
    3,
    4,
    5,
]

export const orderStore = () => {
    return {
        orders,
        orderItems,
        items,
        orderId,
        productId,
        ratings,
        ratingDirection
    }
}