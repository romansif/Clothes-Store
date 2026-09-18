import { useGetReviews } from "@/features/use-product-reviews/api/get-reviews.ts";
import star from "@/assets/icons/products/full-star.png";
import half_star from "@/assets/icons/products/half-star.png";

const { reviews } = useGetReviews();

export const starCountSrc = (index: number, rating: number) => {
    const isHalf = index === Math.ceil(rating) &&
        !Number.isInteger(rating)

    return isHalf ? half_star : star;
}

export const averageRating = () => {
    const mediumRating = reviews.value.reduce((num, rat) => num + rat.rating, 0);

    return Math.round((mediumRating / reviews.value.length) * 2) / 2;
}

export const ratingCount = (rating: number) => {
    const review = reviews.value.filter(review => review.rating === rating);

    return review.length;
}

export const percentage = (rating: number) => {
    return (ratingCount(rating) / reviews.value.length) * 100
}
