import { ref } from "vue";
import { clearReviewForm } from "@/features/use-review-form/lib/clear-review-form.ts";
import { reviewsStore } from "@/features/use-product-review/model/reviews.store.ts";
import { choiceModal } from "@/features/use-order/lib/order-modal.ts";

const { productId } = reviewsStore();

export const reviewFormModal = ref<boolean>(false);

export const toggleReviewChoice = (id: string) => {
    clearReviewForm();

    reviewFormModal.value = !reviewFormModal.value;
    choiceModal.value = !choiceModal.value;

    productId.value = id
};