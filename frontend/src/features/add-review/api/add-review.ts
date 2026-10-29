import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify";
import { reviewsStore } from "@/features/review-dashboard/model/reviews.store";
import { clearReviewForm } from "@/features/add-review/lib/clear-review-form";
import { toggleReviewModal } from "@/entities/order-action/lib/review-form-modal";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";
import { reviewFormSchema } from "@/entities/review-form/model/review-schemas";
import { imageFiles } from "@/shared/lib/product-helper";
import type { User } from "@/entities/profile";

const { productId } = reviewsStore();
const { openNotify } = useBaseModals();

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: createReview,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["createReview"],
        mutationFn: async (user: User | undefined) => {
            if (!user) {
                throw new Error("Вы должны быть зарегистрированы что бы написать отзыв");
            }

            const result = reviewFormSchema.safeParse(reviewForm.value);

            if (!result.success) {
                applyZodErrors(result.error, reviewFormMessages);

                throw new Error("Ошибка валидации отзыва");
            }

            const formData = new FormData();

            formData.append(
                "review",
                JSON.stringify({
                    productId: productId.value,
                    user: {
                        name: user.name,
                        surName: user.surName,
                        avatar: user.avatarUrl,
                    },
                    rating: result.data.rating,
                    comment: result.data.comment,
                }),
            );

            imageFiles.value.forEach((file) => {
                if (file) {
                    formData.append("images", file);
                }
            });

            return await handler("/reviews", {
                method: "POST",
                body: formData,
            });
        },

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["reviews"] }),
                queryClient.invalidateQueries({ queryKey: ["filteredReviews"] }),
            ]);

            clearReviewForm();

            await openNotify(
                "You have successfully added a review for this product",
                "Thank you for your feedback. It helps other customers make the right choice.",
            );

            toggleReviewModal("");
        },

        onError: (err) => {
            applyErrors(err, reviewFormMessages);

            throw new Error("Ошибка валидации отзыва", err);
        },
    });

    return {
        createReview,
        isPending,
        isError,
    };
};
