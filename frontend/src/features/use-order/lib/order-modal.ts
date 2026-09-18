import { ref } from "vue";
import { cancelChoiceForm } from "@/features/use-order/model/order.forms.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";

const { orderId, productId } = orderStore();

const choiceModal = ref<boolean>(false);
const reviewModal = ref<boolean>(false);

export const useOrderModal = () => {
    const toggleReplaceChoice = (id: string) => {
        choiceModal.value = !choiceModal.value;
        orderId.value = id;
        cancelChoiceForm.value.cancelChoice = '';
    };

    const toggleReviewChoice = (id: string) => {
        reviewModal.value = !reviewModal.value;
        productId.value = id
    };

    return {
        toggleReplaceChoice,
        toggleReviewChoice,
        choiceModal,
        reviewModal,
    }
}