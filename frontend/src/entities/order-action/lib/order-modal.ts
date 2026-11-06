import { ref } from "vue";

import { clearReplaceForm } from "@/features/replace-order-modal/lib/clear-order-form";
import { cancelChoiceForm } from "@/entities/order/model/order-forms";
import { orderStore } from "@/shared/model/order.store";

const { orderId, itemId } = orderStore();

export const replaceOrder = ref<boolean>(false);
export const replaceItem = ref<boolean>(false);

export const openReplaceOrder = (order_id: string) => {
  replaceOrder.value = true;
  orderId.value = order_id;
};

export const closeReplaceOrder = () => {
  clearReplaceForm();

  replaceOrder.value = false;
  orderId.value = "";
  cancelChoiceForm.value.cancelChoice = "";
};

export const openReplaceItem = (order_id: string, item_id: string) => {
  replaceItem.value = true;
  orderId.value = order_id;
  itemId.value = item_id;
};

export const closeReplaceItem = () => {
  clearReplaceForm();

  replaceItem.value = false;
  orderId.value = "";
  itemId.value = "";
  cancelChoiceForm.value.cancelChoice = "";
};
