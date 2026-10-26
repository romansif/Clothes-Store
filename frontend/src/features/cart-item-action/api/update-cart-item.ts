import { handler } from "@/shared/api/http";
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { useBaseModals } from "@/shared/lib/use-notify";
import { deleteProductCart } from "@/features/cart-item-action/api/delete-cart";
import { useGetProducts } from "@/features/products/api/get-product";
import type { CartItem } from "@/entities/cart-item";
import type { Variant } from "@/shared";

const { openNotify } = useBaseModals();
const { getAllProducts, allProducts } = useGetProducts()

export const updateCartItem = async (type: string, id: string) => {
    const { cart } = useCartData();
    await getAllProducts();

    if(!id) return;

    try{
        const product = allProducts.value.find(
            p => p.id === id
        )
        if(!product) {
            console.log('Товар в каталоге не найден')
            return
        }

        const cartItem = cart.value.find((c: CartItem) => c.productId === id);
        if(!cartItem) {
            console.log('Товар в корзине не найден')
            return
        }

        const basePrice =  Number(product.price)
        const currentPrice = Number(cartItem.price);

        const currentItem = cartItem.variants[0]
        if(!currentItem) {
            console.log('Варианты товара в корзине не найден')
            return
        }

        const currentQuantity = Number(currentItem.count);

        const stockItem = product.variants.find(
            v => v.hex === currentItem.hex && v.size === currentItem.size)
        if(!stockItem) {
            console.log('Варианты товара каталоге не найден')
            return
        }

        const stock = Number(stockItem.count);

        if(type === 'add'){
            if(currentQuantity < stock){
                const newPrice = currentPrice + basePrice;
                const newQuantity = currentQuantity + 1;

                await handler(`/cart/${product.id}`, {
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
                await openNotify('The item is no longer in stock',
                    'The maximum stock level for the item has been reached')
                console.warn('Достигнуто максимальное количество товара на складе');
                return;
            }
        }else if(type === 'away') {
            if(currentQuantity <= 1){
                await deleteProductCart(cartItem.id);
            }else{
                const newPrice = currentPrice - basePrice;
                const newQuantity = currentQuantity - 1;

                await handler(`/cart/${cartItem.id}`, {
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
    }catch(err){
        console.error(`Failed to update the cart product variants:`, err);
    }
};