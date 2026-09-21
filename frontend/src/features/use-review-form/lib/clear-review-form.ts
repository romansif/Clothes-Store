import {reviewForm, reviewFormMessages} from "@/features/use-review-form/model/review.form.ts";

export const clearReviewForm = () => {
    reviewForm.value.rating = 0;
    reviewForm.value.comment = '';

    reviewFormMessages.value.rating = '';
    reviewFormMessages.value.comment = '';
}