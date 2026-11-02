import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useProductsData } from "@/widgets/product-list/lib/use-product-data";
import { useDeleteCartItem } from "@/features/cart-item-action/api/delete-cart";
import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import type { UpdateCartItemPayload } from "@/features/cart-item-action";

const { openNotify } = useBaseModals();

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();
    const { deleteCartItem } = useDeleteCartItem();
    const { products } = useProductsData();

    const {
        mutate: updateCartItemQuantity,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["updateCartItemQuantity"],
        mutationFn: async ({ type, cartItem }: UpdateCartItemPayload) => {
            if (!cartItem.id || !cartItem.productId) {
                throw new Error(`В корзине нет id или productId ${cartItem.productId}`);
            }

            const product = products.value.find((p) => p.id === cartItem.productId);
            if (!product) throw new Error("Товар не найден");

            if (!cartItem) throw new Error("Вариант товара в корзине не найден");

            const stockItem = product.variants.find(
                (v) => v.hex === cartItem.color.hex && String(v.size) === String(cartItem.size),
            );
            if (!stockItem) throw new Error("Вариант товара не найден");

            const currentQuantity = Number(cartItem.quantity);
            const stock = Number(stockItem.count);

            if (type === "remove" && currentQuantity <= 1) {
                return await deleteCartItem(cartItem.id);
            }

            if (type === "add" && currentQuantity >= stock) {
                await openNotify(
                    "The item is no longer in stock",
                    "The maximum stock level for the item has been reached",
                );
                return;
            }

            const newQuantity = type === "add" ? currentQuantity + 1 : currentQuantity - 1;

            return await handler(`/cart/${cartItem.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    quantity: newQuantity,
                }),
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["cart"] });
        },

        onError: (err) => {
            console.error("Ошибка при изменении количества товара в корзине:", err);
        },
    });

    return { updateCartItemQuantity, isPending, isError };
};