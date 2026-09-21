import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review.form.ts";
import { imageFiles } from "@/shared/lib/helper/product-helper.ts";

export const clearReviewForm = () => {
    reviewForm.value.rating = 0;
    reviewForm.value.comment = '';
    imageFiles.value = []

    reviewFormMessages.value.rating = '';
    reviewFormMessages.value.comment = '';
}