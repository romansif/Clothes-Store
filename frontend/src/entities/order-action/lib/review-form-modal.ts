import { ref } from "vue";
import { clearReviewForm } from "@/features/add-review/lib/clear-review-form";
import { reviewsStore } from "@/features/review-dashboard/model/reviews.store";

const { productId } = reviewsStore();

export const reviewFormModal = ref<boolean>(false);

export const toggleReviewModal = (id: string) => {
    clearReviewForm();

    reviewFormModal.value = !reviewFormModal.value;

    productId.value = id;
};
