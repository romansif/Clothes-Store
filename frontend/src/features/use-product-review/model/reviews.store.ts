import { ref } from "vue";

const ratings = [
    1,
    2,
    3,
    4,
    5,
];

const reverseRatings = [
    5,
    4,
    3,
    2,
    1
];

const productId = ref<string>('');

const ratingDirection = ref<'up' | 'down'>('up');

export const reviewsStore = () => {
    return {
        ratings,
        ratingDirection,
        reverseRatings,
        productId,
    }
}