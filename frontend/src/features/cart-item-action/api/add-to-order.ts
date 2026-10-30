import { useMutation, useQueryClient } from "@tanstack/vue-query";

import type { AddToOrderPayload } from "@/features/cart-item-action";
import { saveOrderItems } from "@/features/cart-item-action/lib/save-order-items";
import { handler } from "@/shared/api/http";

export const useAddToOrder = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: addToOrder,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["addToOrder"],
        mutationFn: async ({ product }: AddToOrderPayload) => {
            return handler(`/cart/${product.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    checked: !product.checked,
                }),
            });
        },

        onSuccess: async (_data, { product, orderItems }) => {
            saveOrderItems(orderItems, product);

            await queryClient.invalidateQueries({ queryKey: ["cart"] });
        },

        onError: (err) => {
            throw new Error(`Ошибка при добавлении товара к заказу`, err);
        },
    });

    return {
        addToOrder,
        isPending,
        isError,
    };
};
