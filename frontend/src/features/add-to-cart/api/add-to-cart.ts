import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { cartStore } from "@/widgets/cart-list/model/cart.store";
import {
    addToCartForm,
    addToCartFormErrorMessages,
} from "@/entities/product-info/model/add-to-cart-form";
import { addToCartSchema } from "@/entities/product-info/model/add-to-cart-schemas";
import { handler } from "@/shared/api/http";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { useBaseModals } from "@/widgets/notification/lib/use-notify";
import type { Product } from "@/shared";

const { unreadCount } = cartStore();
const { openNotify } = useBaseModals();

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    const {
        mutate: addToCart,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["addToCart"],
        mutationFn: async (product: Product) => {
            const result = addToCartSchema.safeParse(addToCartForm.value);

            if (!result.success) {
                applyZodErrors(result.error, addToCartFormErrorMessages);

                throw new Error("Ошибка валидации добавления товара в корзину");
            }

            const currentProduct = product;
            if (!currentProduct) {
                throw new Error("Товар который вы хотите добавить в корзину не найден");
            }

            return await handler(`/cart`, {
                method: "POST",
                body: JSON.stringify({
                    productId: currentProduct.id,
                    color: {
                        hex: addToCartForm.value.colors.hex,
                        colorName: addToCartForm.value.colors.colorName,
                    },
                    size: addToCartForm.value.sizes,
                    checked: false,
                }),
            });
        },

        onSuccess: async () => {
            unreadCount.value += 1;

            await openNotify({variant: "add-to-cart", state: "success"});

            await queryClient.invalidateQueries({ queryKey: ["cart"] });
        },

        onError: async (err) => {
            applyErrors(err, addToCartFormErrorMessages);

            throw new Error(`Ошибка валидации добавления товара в корзину`, err);
        },
    });

    return {
        addToCart,
        isPending,
        isError,
    };
};
