import { ref } from "vue";

import { clearReviewForm } from "@/features/add-review/lib/clear-review-form";
import { reviewsStore } from "@/features/review-dashboard/model/reviews.store";
import { queryClient } from "@/shared/api/query-client";

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
