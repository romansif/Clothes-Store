import { ref } from "vue";
import type { OrderItem } from "@/entities/order";

const orderItems = ref<OrderItem[]>([]);

const orderId = ref<string>("");

export const orderStore = () => {
    return {
        orderItems,
        orderId,
    };
};
