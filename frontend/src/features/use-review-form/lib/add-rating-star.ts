import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetReviews } from "@/features/use-product-review/api/get-reviews.ts";
import { reviewForm } from "@/entities/review-form/model/review.form.ts";
import { reviewsStore } from "@/features/use-product-review/model/reviews.store.ts";

const { userData } = userStore();
const { reviews } = useGetReviews();
const { ratingDirection } = reviewsStore();

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

export const isInReview = () => {
    const user = userData.value;

    if (!user) return false;

    return reviews.value.some(
        review => review.userId === user.id
    );
};
