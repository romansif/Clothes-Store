import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify";
import { userData } from "@/shared/model/user.store";
import { reviewsStore } from "@/features/review-dashboard/model/reviews.store";
import { clearReviewForm } from "@/features/add-review-form/lib/clear-review-form";
import { toggleReviewModal } from "@/entities/order-action/lib/review-form-modal";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";
import { reviewFormSchema } from "@/entities/review-form/model/review-schemas";
import { imageFiles } from "@/shared/lib/product-helper";

const { productId } = reviewsStore();
const { openNotify } = useBaseModals();

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    const { mutateAsync: createReview, isPending } = useMutation({mutationKey: ['createReview'],
        mutationFn: async () => {
            if (!userData.value) {
                throw new Error('You must be logged in to leave a review');
            }

            const result = reviewFormSchema.safeParse(reviewForm.value);

            if (!result.success) {
                applyZodErrors(
                    result.error,
                    reviewFormMessages,
                );

                throw new Error('Invalid review form');
            }

            const formData = new FormData();

            formData.append(
                'review',
                JSON.stringify({
                    productId: productId.value,
                    user: {
                        name: userData.value.name,
                        surName: userData.value.surName,
                        avatar: userData.value.avatarUrl,
                    },
                    rating: result.data.rating,
                    comment: result.data.comment,
                }),
            );

            imageFiles.value.forEach(file => {
                if (file) {
                    formData.append('images', file);
                }
            });

            return handler('/reviews', {
                method: 'POST',
                body: formData,
            });
        },

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['reviews'],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['filteredReviews'],
                }),
            ]);

            clearReviewForm();

            await openNotify(
                'You have successfully added a review for this product',
                'Thank you for your feedback. It helps other customers make the right choice.',
            );

            toggleReviewModal('');
        },

        onError: (err) => {
            if (err.message !== 'Invalid review form') {
                applyErrors(err, reviewFormMessages);
            }

            console.error('Failed to create review:', err);
        },
    });

    return {
        createReview,
        isPending,
    };
};