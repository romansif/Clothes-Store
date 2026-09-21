import { ref } from "vue";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { clearReplaceForm } from "@/features/use-order/lib/clear-order-form.ts";
import { cancelChoiceForm } from "@/features/use-order/model/order.forms.ts";

const { orderId } = orderStore();

export const choiceModal = ref<boolean>(false);

export const toggleReplaceChoice = (id: string) => {
    clearReplaceForm();

    choiceModal.value = !choiceModal.value;
    orderId.value = id;
    cancelChoiceForm.value.cancelChoice = '';
}