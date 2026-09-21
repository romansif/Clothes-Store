import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type {Review} from "@/features/use-product-reviews/model/reviews.types.ts";

const reviews = ref<Review[]>([]);
const filteredReviews = ref<Review[]>([]);

export const useGetReviews = () => {
    const getReviews = async (id: string | string[], filter: string) => {
        try{
            reviews.value = await handler(`/reviews/${id}/ALL`, {
                method: "GET",
            });

            filteredReviews.value = await handler(`/reviews/${id}/${filter}`, {
                method: "GET",
            });
        }catch(err){
            console.error(`Failed to get the reviews:`, err);
        }
    };

    return {
        getReviews,
        reviews,
        filteredReviews,
    }
}