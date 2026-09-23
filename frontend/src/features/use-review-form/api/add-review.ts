import { handler } from "@/shared/api/http.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { clearReviewForm } from "@/features/use-review-form/lib/clear-review-form.ts";
import { toggleReviewModal } from "@/features/use-review-form/lib/review-form-modal.ts";
import { reviewsStore } from "@/features/use-product-review/model/reviews.store.ts";
import { applyErrors, applyZodErrors } from "@/shared/lib/helper/errors-helper.ts";
import { imageFiles } from "@/shared/lib/helper/product-helper.ts";
import { reviewFormSchema } from "@/entities/review-form/model/review.schemas.ts";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review.form.ts";

const { userData } = userStore();
const { productId } = reviewsStore();
const { openNotify } = useBaseModals();

export const useAddReview = () => {
    const createReview = async () => {
        if(!userData.value) return;

        const result1 = reviewFormSchema.safeParse(reviewForm.value)
        if(!result1.success){
            applyZodErrors(
                result1.error,
                reviewFormMessages
            );
        }

        if (!result1.success) return;

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

            await openNotify('You have successfully add review for product',
                'Thank you for providing your feedback helps other customers make the right choice')
            toggleReviewModal('')
        }catch(err){
            applyErrors(
                err,
                reviewFormMessages,
            );
            console.error(`Failed to create the order:`, err);
        }
    };

    return {
        createReview
    }
}