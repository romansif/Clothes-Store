import { useQuery } from "@tanstack/vue-query";
import { userStore } from "@/shared/model/user.store";
import { useGetReviews } from "@/shared/api/get-reviews";
import type { Review } from "@/entities/product-review";

const { userData } = userStore();
const { getReviews } = useGetReviews()

export const useReviewButton = () => {
    const user = userData.value;
    if (!user) return false;

    const { data: reviews } = useQuery({
        queryKey: ["reviews"],
        queryFn: () => getReviews(),
        initialData: []
    });

    return reviews.value.some((review: Review) => review.userId === user.id);
};