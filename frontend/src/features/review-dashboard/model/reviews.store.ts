import { ref } from "vue";

const RATINGS = [1, 2, 3, 4, 5];

const productId = ref<string>("");

const ratingDirection = ref<"up" | "down">("up");

const visibleReviewsCount = ref<number>(4);

export const reviewsStore = () => {
  return {
    RATINGS,
    ratingDirection,
    productId,
    visibleReviewsCount,
  };
};
