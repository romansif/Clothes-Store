import {ref} from "vue";
import { clearReviewForm } from "@/features/use-review-form/lib/clear-review-form.ts";
import { productId } from "@/features/use-product-reviews/model/reviews.store.ts";
import { choiceModal } from "@/features/use-order/lib/order-modal.ts";

export const reviewModal = ref<boolean>(false);

export const toggleReviewChoice = (id: string) => {
    clearReviewForm();

    reviewModal.value = !reviewModal.value;
    choiceModal.value = !choiceModal.value;

    productId.value = id
};