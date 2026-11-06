import { ref } from "vue";

import type { OrderPosition } from "@/entities/order";

const orderItems = ref<OrderPosition[]>([]);

const orderId = ref<string>("");
const itemId = ref<string>("");

export const orderStore = () => {
  return {
    orderItems,
    orderId,
    itemId,
  };
};
