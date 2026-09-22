import {computed, ref} from "vue";
import { useGetReviews } from "@/features/use-product-review/api/get-reviews.ts";

const { filteredReviews } = useGetReviews();

const visibleReviewsCount = ref<number>(4)

export const reviewsHelper = () => {


    const loadFiveReviews = () => {
        visibleReviewsCount.value += 4
    };

    const closeFiveReviews = () => {
        visibleReviewsCount.value -= 4
    };

    const visibleReviews = computed(() => {
        return filteredReviews.value.slice(0, visibleReviewsCount.value);
    })

    return {
        visibleReviews,
        visibleReviewsCount,
        loadFiveReviews,
        closeFiveReviews
    }
}