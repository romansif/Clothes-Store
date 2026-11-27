import { reviewsStore } from "@/shared/model";

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
