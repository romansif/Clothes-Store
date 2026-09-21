import { computed } from "vue";
import { useGetReviews } from "@/features/use-product-reviews/api/get-reviews.ts";
import type {Review} from "@/features/use-product-reviews/model/reviews.types.ts";
import star from "@/assets/icons/products/full-star.png";
import half_star from "@/assets/icons/products/half-star.png";

const { reviews, visibleReviewsCount } = useGetReviews();

export const reviewsHelper = () => {
    const starCountSrc = (index: number, rating: number) => {
        const isHalf = index === Math.ceil(rating) &&
            !Number.isInteger(rating)

        return isHalf ? half_star : star;
    };

    const averageRating = () => {
        const mediumRating = reviews.value.reduce((num, rat) => num + rat.rating, 0);

        return Math.round((mediumRating / reviews.value.length) * 2) / 2;
    };

    const ratingCount = (rating: number) => {
        const review = reviews.value.filter(review => review.rating === rating);

        return review.length;
    };

    const percentage = (rating: number) => {
        return (ratingCount(rating) / reviews.value.length) * 100
    };

    const reviewAngel = (review: Review): string[] => {
        if(!review?.images?.length){
            console.log('Product not found');
            return [];
        }

        if(review && review.images && review.images.length > 0){
            return review.images.slice(0).map(img => `${import.meta.env.VITE_BASE_URL}/${img}`);
        }
        return [];
    };

    const visibleReviews = computed(() => {
        return reviews.value.slice(0, visibleReviewsCount.value);
    })

    const loadFiveReviews = () => {
        visibleReviewsCount.value += 5
    };

    const closeFiveReviews = () => {
        visibleReviewsCount.value -= 5
    };

    return {
        visibleReviews,
        visibleReviewsCount,
        starCountSrc,
        averageRating,
        ratingCount,
        percentage,
        reviewAngel,
        loadFiveReviews,
        closeFiveReviews
    }
}