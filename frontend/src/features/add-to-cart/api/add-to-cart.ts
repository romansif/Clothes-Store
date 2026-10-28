import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { clearCartForm } from "@/features/product-info/lib/clear-cart-form";
import { cartStore } from "@/widgets/cart-list/model/cart.store";
import { applyZodErrors, applyErrors } from "@/shared/lib/errors-helper";
import { addToCartForm, addToCartFormErrorMessages } from "@/entities/product-info/model/add-to-cart-form";
import { addToCartSchema } from "@/entities/product-info/model/add-to-cart-schemas";
import type { Product } from "@/shared";

const { unreadCount } = cartStore();
const { openNotify } = useBaseModals();

export const useAddToCart = () => {
    const queryClient = useQueryClient()
    const userId = localStorage.getItem("userId");

    const { mutateAsync: addToCart, isPending } = useMutation({mutationKey: ['addToCart'],
        mutationFn: async (product: Product) => {
            const result = addToCartSchema.safeParse(addToCartForm.value)

            if(!result.success){
                applyZodErrors(result.error, addToCartFormErrorMessages);

                throw new Error('Ошибка валидации добавления товара в корзину');
            }

            const currentProduct = product;
            if(!currentProduct){
                throw new Error('Товар который вы хотите добавить в корзину не найден')
            }

            const currentQuantity = currentProduct.variants.find(
                q => q.hex === addToCartForm.value.colors.hex);

            return await handler(`/cart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    productId: currentProduct.id,
                    images: currentProduct.images,
                    title: currentProduct.title,
                    category: currentProduct.category,
                    material: currentProduct.material,
                    price: currentProduct.price,
                    description: currentProduct.description,
                    colors: [{
                        hex: addToCartForm.value.colors.hex,
                        colorName: addToCartForm.value.colors.colorName
                    }],
                    sizes: addToCartForm.value.sizes,
                    gender: currentProduct.gender,
                    variants: [{
                        hex: currentQuantity?.hex,
                        colorName: currentQuantity?.colorName,
                        size: addToCartForm.value.sizes,
                        count: 1
                    }],
                    checked: false,
                })
            });
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['cart'] })

            unreadCount.value += 1;

            clearCartForm();

            await openNotify('You have successfully added the item to your cart',
                'You will now be redirected to the "Cart" page');
        },

        onError: (err) => {
            applyErrors(err, addToCartFormErrorMessages);


            console.error(`Ошибка валидации добавления товара в корзину`, err);
        }
    })

    return {
        addToCart,
        isPending,
    };
}

