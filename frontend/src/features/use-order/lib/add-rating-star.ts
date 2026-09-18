import { computed } from "vue";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetReviews } from "@/features/use-product-reviews/api/get-reviews.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { reviewForm } from "@/features/use-order/model/order.forms.ts";

import star from "@/assets/icons/products/full-star.png";
import half_star from "@/assets/icons/products/half-star.png";
import empty_star from "@/assets/icons/products/empty-star.png";

const { userData } = userStore();
const { reviews } = useGetReviews();
const { ratingDirection } = orderStore();

export const addRating = (rating: number) => {
    const half = rating - 0.5
    const current = reviewForm.value.rating

    if(current < half || current > rating) {
        reviewForm.value.rating = half
        ratingDirection.value = 'up';
        return;
    }

    if(ratingDirection.value === 'up') {
        if(current === half) {
            reviewForm.value.rating = rating;
            ratingDirection.value = 'down';
        }else{
            reviewForm.value.rating = half
        }
        return;
    }

    if(current === rating){
        reviewForm.value.rating = half;
    }else{
        reviewForm.value.rating = rating - 1
        ratingDirection.value = 'up';
    }
};

export const ratingSrc = (rating: number) => {
    return rating <= reviewForm.value.rating ? star : reviewForm.value.rating === rating - 0.5 ? half_star : empty_star
};

export const isInReview = computed(() => {
    const user = userData.value;

    if (!user) return false;

    return reviews.value.some(
        review => review.userId === user.id
    );
});