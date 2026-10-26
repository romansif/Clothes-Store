import { userData } from "@/shared/model/user.store";
import { useReviewsData } from "@/features/review-dashboard/lib/use-rewiev-data";
import type { Review } from "@/entities/product-review";

export const useReviewButton = () => {
    const user = userData.value;
    if (!user) return false;

    const { reviews } = useReviewsData()

    return reviews.value.some((review: Review) => review.userId === user.id);
};