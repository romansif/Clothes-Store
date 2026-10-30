import { ref } from "vue";

import type { OrderItem } from "@/entities/order";

const orderItems = ref<OrderItem[]>([]);
const items = ref<OrderItem[]>(JSON.parse(localStorage.getItem("orderItems") || "[]"));

const orderId = ref<string>("");

export const orderStore = () => {
    return {
        orderItems,
        items,
        orderId,
    };
};
