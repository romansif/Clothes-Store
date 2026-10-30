import type { Review } from "@/entities/product-review";
import { handler } from "@/shared/api/http";

export const useGetReviews = () => {
    const getReviews = () => {
        return handler<Review[]>("/reviews", {
            method: "GET",
        });
    };

    const getFilteredReviews = (id: string | string[], filter: string) => {
        return handler<Review[]>(`/reviews/${id}/${filter}`, {
            method: "GET",
        });
    };

    return {
        getReviews,
        getFilteredReviews,
    };
};
