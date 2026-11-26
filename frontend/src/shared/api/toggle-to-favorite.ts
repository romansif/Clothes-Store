import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { useBaseModals } from "@/shared/ui/notification";
import { previewHelper } from "@/entities/product-card";
import { handler } from "@/shared/api";
import type { ToggleToFavoritePayload } from "@/shared/model";

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const { openNotify } = useBaseModals();
  const { isFavorite, getProductId } = previewHelper();
  const userId = localStorage.getItem("userId");

  const {
    mutate: toggleFavorite,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["toggleFavorite"],
    mutationFn: async ({ favorite, product }: ToggleToFavoritePayload) => {
      const productId = getProductId(product);

      if (!productId) {
        throw new Error("ID товара не найден");
      }

      if (!userId) {
        throw new Error("Пользователь не зарегистрирован");
      }

      if (!isFavorite(favorite, product, userId)) {
        await handler("/favorites", {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
            productId,
          }),
        });

        await queryClient.invalidateQueries({ queryKey: ["favorite"] });

        await openNotify({ variant: "add-to-favorite", state: "success" });
      } else {
        const favoriteItem = favorite.find((item) => item.productId === productId && item.userId === userId);
        await handler(`/favorites/${favoriteItem?.id}`, {
          method: "DELETE",
        });

        await queryClient.invalidateQueries({ queryKey: ["favorite"] });
      }
    },

    onError: (err) => {
      throw new Error("Ошибка при изменении состояния избранного", err);
    },
  });

  return {
    toggleFavorite,
    isPending,
    isError,
  };
};
