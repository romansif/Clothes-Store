import { computed } from "vue";
import { useGetProducts } from "@/features/use-all-product/api/get-product.ts";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { productStore}  from "@/features/use-all-product/model/product.store.ts";

const { cart } = cartStore();
const { productId } = productStore();
const { products } = useGetProducts();

export const cartHelper = () => {
    const isInCart = computed(() => {
        const product = products.value.find(p => p.id === productId.value);
        if(!product?.id || !Array.isArray(cart.value)){
            return null;
        }
        return cart.value.find(c => c.productId === product.id)
    });

    return {
        isInCart,
    }
}