import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify";
import { userStore } from "@/shared/model/user.store";
import { reviewsStore } from "@/features/use-product-review/model/reviews.store";
import { clearReviewForm } from "@/features/use-review-form/lib/clear-review-form";
import { toggleReviewModal } from "@/entities/order-action/lib/review-form-modal";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";
import { reviewFormSchema } from "@/entities/review-form/model/review-schemas";
import { imageFiles } from "@/shared/lib/product-helper";

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
                queryKey: ['reviews']
            });
            await queryClient.invalidateQueries({
                queryKey: ['filteredReviews']
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