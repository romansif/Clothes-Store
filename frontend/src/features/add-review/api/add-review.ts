import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { useBaseModals } from "@/widgets/notification/lib/use-notify";
import { clearReviewForm } from "@/features/add-review/lib/clear-review-form";
import { reviewsStore } from "@/features/review-dashboard/model/reviews.store";
import { toggleReviewModal } from "@/entities/order-action/lib/review-form-modal";
import type { User } from "@/entities/profile";
import { reviewForm, reviewFormMessages } from "@/entities/review-form/model/review-form";
import { reviewFormSchema } from "@/entities/review-form/model/review-schemas";
import { handler } from "@/shared/api/http";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { imageFiles } from "@/shared/lib/product-helper";

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
      clearReviewForm();

      await openNotify({ variant: "add-review", state: "success" });

      toggleReviewModal("");

      await Promise.all([queryClient.invalidateQueries({ queryKey: ["reviews"] }), queryClient.invalidateQueries({ queryKey: ["filteredReviews"] })]);
    },

    onError: async (err) => {
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
