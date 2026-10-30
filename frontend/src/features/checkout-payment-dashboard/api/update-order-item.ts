import { useMutation, useQueryClient } from "@tanstack/vue-query";

import type { UpdateCartAndProductPayload } from "@/features/checkout-payment-dashboard";
import { handler } from "@/shared/api/http";

export const useUpdateCheckedQuantity = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync: updateCheckedQuantity,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["updateCheckedQuantity"],
        mutationFn: async ({ cart, products }: UpdateCartAndProductPayload) => {
            const checkedItems = cart.filter((item) => item.checked);
            if (!checkedItems.length) throw new Error("No checked items in the cart");

            for (const item of checkedItems) {
                const product = products.find((p) => p.id === item.productId);
                if (!product) throw new Error(`Product ${item.productId} not found`);

                const cartObj = item.variants.find((v) => v.count !== undefined);
                if (!cartObj) throw new Error(`Cart item ${item.id} has no variant`);

                const variants = product.variants.map((v) =>
                    v.hex === cartObj.hex && String(v.size) === String(cartObj.size)
                        ? { ...v, count: Math.max(0, Number(v.count) - Number(cartObj.count)) }
                        : v,
                );

                await handler(`/products/${product.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        variants,
                    }),
                });

                await handler(`/cart/${item.id}`, {
                    method: "DELETE",
                });
            }
        },

        onSuccess: async () => {
            localStorage.removeItem("orderItems");

            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["cart"] }),
                queryClient.invalidateQueries({ queryKey: ["products"] }),
            ]);
        },

        onError: (err) => {
            console.error("Ошибка при обновлении вариантов товара", err);
        },
    });

    return {
        updateCheckedQuantity,
        isPending,
        isError,
    };
};
