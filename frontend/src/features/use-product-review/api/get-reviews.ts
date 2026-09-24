import { handler } from "@/shared/api/http.ts";
import type {Review} from "@/entities/product-review/model/reviews.types.ts";

export const useGetReviews = () => {
    const getReviews = () => {
        return handler<Review[]>('/reviews', {
            method: 'GET',
        });
    };

    const getFilteredReviews = (id: string | string[], filter: string) => {
        return handler<Review[]>(`/reviews/${id}/${filter}`, {
            method: 'GET',
        });
    };

    return {
        getReviews,
        getFilteredReviews,
    }
}