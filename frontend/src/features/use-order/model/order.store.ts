import {ref} from "vue";
import type { OrderItem, Order } from "@/features/use-order/model/order.types.ts";

const orders = ref<Order[]>([]);

const orderItems = ref<OrderItem[]>([]);

const items = ref<OrderItem[]>(JSON.parse(localStorage.getItem('orderItems') || '[]'));

const choiceModal = ref<boolean>(false);

export const cancelChoiceForm = ref({
    cancelChoice: ''
})

export const cancelChoiceMessage = ref({
    cancelChoice: ''
});

export const orderStore = () => {
    return {
        orders,
        orderItems,
        items,

        choiceModal
    }
}