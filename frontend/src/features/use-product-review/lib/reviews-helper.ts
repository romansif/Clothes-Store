import { ref } from "vue";

const visibleReviewsCount = ref<number>(4);

export const reviewsHelper = () => {
    const loadFiveReviews = () => {
        visibleReviewsCount.value += 4
    };

    const closeFiveReviews = () => {
        visibleReviewsCount.value -= 4
    };

    return {
        visibleReviewsCount,
        loadFiveReviews,
        closeFiveReviews
    }
}