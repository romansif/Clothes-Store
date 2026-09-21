import { reviewForm } from "@/entities/review-form/model/review.form.ts";

export const reviewsClasses = () => {
    const ratingStar = (rating: number) => [
        'w-12 transition duration-400',
        rating <= reviewForm.value.rating ? 'scale-145' : reviewForm.value.rating === rating - 0.5 ? 'scale-145' : 'hover:scale-120'
    ]

    return {
        ratingStar,
    }
}