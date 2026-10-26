import { ref } from "vue";
import { orderStore } from "@/shared/model/order.store";
import { clearReplaceForm } from "@/features/order-modals/lib/clear-order-form";
import { cancelChoiceForm } from "@/entities/order/model/order-forms";

const { orderId } = orderStore();

export const choiceModal = ref<boolean>(false);

export const toggleReplaceChoice = (id: string) => {
    clearReplaceForm();

    choiceModal.value = !choiceModal.value;
    orderId.value = id;
    cancelChoiceForm.value.cancelChoice = '';
}