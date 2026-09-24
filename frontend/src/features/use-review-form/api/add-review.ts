import { handler } from "@/shared/api/http.ts";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { reviewsStore } from "@/features/use-product-review/model/reviews.store.ts";
import { clearReviewForm } from "@/features/use-review-form/lib/clear-review-form.ts";
import { toggleReviewModal } from "@/features/use-review-form/lib/review-form-modal.ts";
import { applyErrors, applyZodErrors } from "@/shared/lib/helper/errors-helper.ts";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review.form.ts";
import { reviewFormSchema } from "@/entities/review-form/model/review.schemas.ts";
import { imageFiles } from "@/shared/lib/helper/product-helper.ts";

const { userData } = userStore();
const { productId } = reviewsStore();
const { openNotify } = useBaseModals();

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    const addReview = (formData: FormData) => {
        return handler('/reviews', {
            method: "POST",
            body: formData,
        });
    };

    const {
        mutateAsync: addReviewMutation,
        isPending
    } = useMutation({
        mutationFn: addReview,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['reviews', productId.value],
            });

            clearReviewForm();

            await openNotify(
                'You have successfully add review for product',
                'Thank you for providing your feedback helps other customers make the right choice'
            );

            toggleReviewModal('');
        },

        onError: (err) => {
            applyErrors(
                err,
                reviewFormMessages
            );

            console.error('Failed to create review:', err);
        }
    });

    const createReview = async () => {
        if (!userData.value) return;

        const result = reviewFormSchema.safeParse(reviewForm.value);

        if (!result.success) {
            applyZodErrors(
                result.error,
                reviewFormMessages
            );

            return;
        }

        const formData = new FormData();

        const reviewData = {
            productId: productId.value,
            user: {
                name: userData.value.name,
                surName: userData.value.surName,
                avatar: userData.value.avatarUrl,
            },
            rating: result.data.rating,
            comment: result.data.comment,
        };

        formData.append(
            'review',
            JSON.stringify(reviewData)
        );

        imageFiles.value.forEach(file => {
            if (file) {
                formData.append('images', file);
            }
        });

        await addReviewMutation(formData);
    };

    return {
        createReview,
        isPending,
    };
};