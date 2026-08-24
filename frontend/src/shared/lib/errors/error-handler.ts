import { ref } from "vue";
import { productApi } from "@/feature/product/api/product.api.ts";
import { cartApi } from "@/feature/cart/api/cart.api.ts";
import { favoritesApi } from "@/feature/favorite/api/favorites.api.ts";

const { getCartProducts } = cartApi();
const { getFilteredProducts } = productApi();
const { getFavoriteProducts } = favoritesApi();

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