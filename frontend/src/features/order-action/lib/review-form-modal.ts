import { ref } from "vue";

import { clearReviewForm } from "@/features/add-review";
import { reviewsStore } from "@/features/review-dashboard";
import { queryClient } from "@/shared/api";

const { productId } = reviewsStore();

export const reviewFormModal = ref<boolean>(false);

export const openReviewModal = (id: string) => {
  clearReviewForm();

  reviewFormModal.value = true;

  productId.value = id;
};

export const closeReviewModal = async () => {
  clearReviewForm();

  reviewFormModal.value = false;

  productId.value = "";

  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["reviews"] }),
    queryClient.invalidateQueries({ queryKey: ["filteredReviews"] }),
  ]);
};
