import { ref } from "vue";
import { clearReviewForm } from "@/features/use-review-form/lib/clear-review-form";
import { reviewsStore } from "@/features/use-product-review/model/reviews.store";
import { choiceModal } from "@/features/use-order/lib/order-modal";

const { productId } = reviewsStore();

export const reviewFormModal = ref<boolean>(false);

export const toggleReviewModal = (id: string) => {
    clearReviewForm();

    reviewFormModal.value = !reviewFormModal.value;
    choiceModal.value = !choiceModal.value;

    productId.value = id
};