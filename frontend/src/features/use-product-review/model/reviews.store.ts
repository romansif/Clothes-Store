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

export const reviewsStore = () => {
    return {
        ratings,
        ratingDirection,
        productId,
    }
}