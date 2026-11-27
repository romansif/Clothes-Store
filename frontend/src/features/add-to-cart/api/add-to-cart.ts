import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Product } from "@/shared/model";

import { cartStore } from "@/widgets/cart-list";
import { useBaseModals } from "@/shared/ui/notification";
import { addToCartForm, addToCartFormErrorMessages } from "@/entities/product-info";
import { addToCartSchema } from "@/entities/product-info";
import { handler } from "@/shared/api";
import { applyErrors, applyZodErrors } from "@/shared/lib";

const { increment } = cartStore();
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
      increment()

      await openNotify({ variant: "add-to-cart", state: "success" });

      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: async (err) => {
      applyErrors(err, addToCartFormErrorMessages);

      await openNotify({ variant: "add-to-cart", state: "error" });
    },
  });

  return {
    addToCart,
    isPending,
    isError,
  };
};
