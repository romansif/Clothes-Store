import { reviewsStore } from "@/features/review-dashboard";

const { visibleReviewsCount } = reviewsStore();

export const reviewsHelper = () => {
  const loadFiveReviews = () => {
    visibleReviewsCount.value += 4;
  };

  const closeFiveReviews = () => {
    visibleReviewsCount.value -= 4;
  };

  return {
    loadFiveReviews,
    closeFiveReviews,
  };
};
