import { ref } from "vue";
import { productApi } from "@/features/use-product/api/add-product.ts";
import { addToCart } from "@/features/use-cart/api/add-to-cart.ts";
import { toggleToFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";

const { getCartProducts } = addToCart();
const { getFilteredProducts } = productApi();
const { getFavoriteProducts } = toggleToFavorite();

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