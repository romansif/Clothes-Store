import { ref } from "vue";
import { handler } from "@/shared/api/http.ts";
import type {Review} from "@/features/use-product-reviews/model/reviews.types.ts";

const reviews = ref<Review[]>([]);

export const useGetReviews = () => {
    const getReviews = async (id: string | string[]) => {
        try{
            reviews.value = await handler(`/reviews/${id}`, {
                method: "GET",
            });
        }catch(err){
            console.error(`Failed to get the reviews:`, err);
        }
    };

    return {
        getReviews,
        reviews,
    }
}