import { ref } from "vue";
import { useProducts } from "@/feature/products/products-actions/use.products.ts";
import { useCart } from "@/feature/cart/cart-actions/use.cart.ts";
import { useFavorites } from "@/feature/favorite/favorite-actions/use.favorites.ts";

const { getCartProducts } = useCart();
const { getFilteredProducts } = useProducts();
const { getFavoriteProducts } = useFavorites();

export const errorHandler = () => {
    const componentError = ref<string | null>(null);

    const resetError = async (getter: string) => {
        componentError.value = null;
        switch(getter) {
            case "FILTER":
                await getFilteredProducts('ALL', 'ALL');
                break;
            case "CART_FAVORITE":
                await getCartProducts();
                await getFavoriteProducts();
                break;
        }
    };

    return {
        componentError,
        resetError
    }
}