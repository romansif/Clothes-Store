import { handler } from "@/shared/api/http.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { clearReviewForm } from "@/features/use-review-form/lib/clear-review-form.ts";
import { productId } from "@/features/use-product-reviews/model/reviews.store.ts";
import { reviewForm } from "@/features/use-review-form/model/review.form.ts";
import { imageFiles } from "@/shared/lib/helper/product-helper.ts";

const { userData } = userStore();
const { openNotify } = useBaseModals();

export const useAddReview = () => {
    const createReview = async () => {
        if(!userData.value) return;

        try{
            const formData = new FormData();

            const reviewData = {
                productId: productId.value,
                user: {
                    name: userData.value.name,
                    surName: userData.value.surName,
                    avatar: userData.value.avatarUrl,
                },
                rating: reviewForm.value.rating,
                comment: reviewForm.value.comment,
            };

            formData.append('review', JSON.stringify(reviewData));

            imageFiles.value.forEach((file) => {
                if (file) {
                    formData.append('images', file);
                }
            })

            await handler('/reviews', {
                method: 'POST',
                body: formData,
            });

            clearReviewForm();
            await openNotify('You have successfully add review for product.',
                'Thank you for providing your feedback helps other customers make the right choice', '')

        }catch(err){
            await openNotify('An error occurred.',
                'We are working on this issue please try again later.', '')
            console.error(`Failed to create the order:`, err);
        }
    };

    return {
        createReview
    }
}