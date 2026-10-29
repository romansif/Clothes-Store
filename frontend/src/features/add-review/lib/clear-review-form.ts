import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";
import { imageFiles, itemPreview } from "@/shared/lib/product-helper";

export const clearReviewForm = () => {
    reviewForm.value.rating = 0;
    reviewForm.value.comment = "";
    imageFiles.value = [];
    itemPreview.value = [];

    reviewFormMessages.value.rating = "";
    reviewFormMessages.value.comment = "";
};
