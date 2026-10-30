import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { previewHelper } from "@/entities/product-card/lib/preview-helper";
import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import type { ToggleToFavoritePayload } from "@/shared/model/favorite-payload.types";

export const useToggleFavorite = () => {
    const queryClient = useQueryClient();
    const { openNotify } = useBaseModals();
    const { isFavorite, getProductId } = previewHelper();
    const userId = localStorage.getItem("userId");

    const {
        mutateAsync: toggleFavorite,
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
                        images: product.images,
                        title: product.title,
                        category: product.category,
                        material: product.material,
                        price: product.price,
                        description: product.description,
                        color: product.colors,
                        size: product.sizes,
                        gender: product.gender,
                        variants: product.variants,
                    }),
                });

                await queryClient.invalidateQueries({ queryKey: ["favorite"] });

                await openNotify(
                    "You have successfully added the item to your favorite",
                    'You will now be redirected to the "Favorite" page',
                );
            } else {
                const favoriteItem = favorite.find(
                    (item) => item.productId === productId && item.userId === userId,
                );
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
