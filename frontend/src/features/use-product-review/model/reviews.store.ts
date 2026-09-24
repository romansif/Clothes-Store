import { ref } from "vue";

const ratings = [
    1,
    2,
    3,
    4,
    5,
];

const productId = ref<string>('');

const ratingDirection = ref<'up' | 'down'>('up');

const reviewFilter = ref<string>('ALL');

const visibleReviewsCount = ref<number>(4);

export const reviewsStore = () => {
    return {
        ratings,
        ratingDirection,
        productId,
        reviewFilter,
        visibleReviewsCount,
    }
}