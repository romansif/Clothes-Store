import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type {Review} from "@/features/use-product-reviews/model/reviews.types.ts";

const reviews = ref<Review[]>([]);

const visibleReviewsCount = ref<number>(5)

export const useGetReviews = () => {
    const getReviews = async (id: string | string[], filter: string) => {
        try{
            reviews.value = await handler(`/reviews/${id}/${filter}`, {
                method: "GET",
            });
        }catch(err){
            console.error(`Failed to get the reviews:`, err);
        }
    };

    const filteredReviews = async (id: string | string[], filter: string) => {
        switch (filter) {
            case "ALL":
                await getReviews(id, filter);
                break;
            case "Photos":
                await getReviews(id, filter);
                break;
            case "Latest":
                await getReviews(id, filter);
                break;
            case "Highest":
                await getReviews(id, filter);
                break;
            case "Lowest":
                await getReviews(id, filter);
                break;
        }
    }

    return {
        filteredReviews,
        reviews,
        visibleReviewsCount,
    }
}