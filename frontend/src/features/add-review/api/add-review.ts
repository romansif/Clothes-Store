import { useMutation } from "@tanstack/vue-query";

import { closeReviewModal, reviewForm, reviewFormMessages, reviewFormSchema } from "@/features/add-review";
import { handler } from "@/shared/api";
import { applyErrors, applyZodErrors, imageFiles } from "@/shared/lib";
import { reviewsStore } from "@/shared/model";
import type { User } from "@/shared/model";
import { useBaseModals } from "@/shared/ui/notification";

const { productId } = reviewsStore();
const { openNotify } = useBaseModals();

export const useCreateReview = () => {
  const {
    mutate: createReview,
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
      await openNotify({ variant: "add-review", state: "success" });

      await closeReviewModal();
    },

    onError: async (err) => {
      applyErrors(err, reviewFormMessages);

      await openNotify({ variant: "add-review", state: "error" });
    },
  });

  return {
    createReview,
    isPending,
    isError,
  };
};
