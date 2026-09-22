import half_star from "@/assets/icons/products/half-star.png";
import star from "@/assets/icons/products/full-star.png";
import type {ImageItem, Review} from "@/entities/product-review/model/reviews.types.ts";


export const ratingHelper = () => {
    const starCountSrc = (index: number, rating: number) => {
        const isHalf = index === Math.ceil(rating) && !Number.isInteger(rating)

        return isHalf ? half_star : star;
    };

    const averageRating = (reviews: Review[] ) => {
        const mediumRating = reviews.reduce(
            (num, rat) => num + rat.rating, 0);

        return Math.round((mediumRating / reviews.length) * 2) / 2;
    };

    const ratingCount = (reviews: Review[], rating: number) => {
        const review = reviews.filter(
            review => Math.floor(review.rating) === rating);

        return review.length;
    };

    const percentage = (reviews: Review[], rating: number) => {
        return (ratingCount(reviews, rating) / reviews.length) * 100
    };

    const reviewAngel = (images: ImageItem[] | undefined): string[] => {
        if(!images){
            console.log('Product not found');
            return [];
        }

        if(images && images.length > 0){
            return images.slice(0).map(img => `${import.meta.env.VITE_BASE_URL}/${img}`);
        }
        return [];
    };

    return {
        starCountSrc,
        averageRating,
        ratingCount,
        percentage,
        reviewAngel
    }
}