import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify";
import { useProductsData } from "@/widgets/product-list/lib/use-product-data";
import { useDeleteCartItem } from "@/features/cart-item-action/api/delete-cart";
import type { Variant } from "@/shared";
import type { UpdateCartItemPayload } from "@/features/cart-item-action";

const { openNotify } = useBaseModals();

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient()
    const { deleteCartItem } = useDeleteCartItem()
    const { products } = useProductsData()

    const { mutateAsync: updateCartItemQuantity, isPending, isError } = useMutation({mutationKey: ['updateCartItemQuantity'],
        mutationFn: async ({ type, cartItem }: UpdateCartItemPayload) => {
            if(!cartItem.productId) {
                throw new Error('ID товара для изменения количества в корзине не найден')
            }

            const product = products.value.find(
                p => p.id === cartItem.productId
            )
            if(!product) {
                throw new Error('Товар не найден')
            }

            if(!cartItem) {
                throw new Error('Товар в корзине не найден')
            }

            const basePrice =  Number(product.price)
            const currentPrice = Number(cartItem.price);

            const currentItem = cartItem.variants[0]
            if(!currentItem) {
                throw new Error('Варианты товара в корзине не найден')
            }

            const currentQuantity = Number(currentItem.count);

            const stockItem = product.variants.find(
                v => v.hex === currentItem.hex && v.size === currentItem.size)
            if(!stockItem) {
                throw new Error('Варианты товара не найден')
            }

            const stock = Number(stockItem.count);

            if(type === 'add'){
                if(currentQuantity < stock){
                    const newPrice = currentPrice + basePrice;
                    const newQuantity = currentQuantity + 1;

                    return await handler(`/cart/${product.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            price: newPrice,
                            variants: cartItem.variants.map((item: Variant) => ({
                                ...item,
                                count: newQuantity,
                            })),
                        })
                    });
                }else{
                    return await openNotify('The item is no longer in stock',
                        'The maximum stock level for the item has been reached')
                }
            }else if(type === 'remove') {
                if(currentQuantity <= 1){
                    return await deleteCartItem(cartItem.id);
                }else{
                    const newPrice = currentPrice - basePrice;
                    const newQuantity = currentQuantity - 1;

                    return await handler(`/cart/${cartItem.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                            price: newPrice,
                            variants: cartItem.variants.map((item: Variant) => ({
                                ...item,
                                count: newQuantity,
                            })),
                        })
                    });
                }
            }
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['cart'] })
        },

        onError: (err) => {
            console.error(`Ошибка при изменении количества товара в корщзине`, err);
        }
    })

    return {
        updateCartItemQuantity,
        isPending,
        isError
    }
}
