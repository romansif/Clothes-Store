import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";
import { imageFiles } from "@/shared/lib/product-helper";

export const clearReviewForm = () => {
    reviewForm.value.rating = 0;
    reviewForm.value.comment = '';
    imageFiles.value = []

    reviewFormMessages.value.rating = '';
    reviewFormMessages.value.comment = '';
}