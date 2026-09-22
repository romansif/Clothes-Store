import { reviewForm } from "@/entities/review-form/model/review.form.ts";

import star from "@/assets/icons/products/full-star.png";
import half_star from "@/assets/icons/products/half-star.png";
import empty_star from "@/assets/icons/products/empty-star.png";

export const ratingSrc = (rating: number) => {
    return rating <= reviewForm.value.rating ? star : reviewForm.value.rating === rating - 0.5 ? half_star : empty_star
};