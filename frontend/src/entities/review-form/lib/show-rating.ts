import empty_star from "@/assets/icons/review/empty-star.png";
import star from "@/assets/icons/review/full-star.png";
import half_star from "@/assets/icons/review/half-star.png";

import { reviewForm } from "@/entities/review-form/model/review-form";

export const ratingSrc = (rating: number) => {
    return rating <= reviewForm.value.rating
        ? star
        : reviewForm.value.rating === rating - 0.5
          ? half_star
          : empty_star;
};
