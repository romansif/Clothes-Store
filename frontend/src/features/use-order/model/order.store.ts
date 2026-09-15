import {ref} from "vue";
import type { OrderItem, Order } from "@/features/use-order/model/order.types.ts";

const orders = ref<Order[]>([]);

const orderItems = ref<OrderItem[]>([]);

const items = ref<OrderItem[]>(JSON.parse(localStorage.getItem('orderItems') || '[]'));

const choiceModal = ref<boolean>(false);
const cancelChoice = ref<string>('');

export const cancelChoiceMessage = ref({
    cancelChoice: ''
});

export const cancelChoiceError = ref({
    cancelChoice: false
});

export const orderStore = () => {
    return {
        orders,
        orderItems,
        items,

        cancelChoice,
        choiceModal
    }
}