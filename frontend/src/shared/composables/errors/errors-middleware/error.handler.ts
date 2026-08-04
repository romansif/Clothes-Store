import { ref } from "vue";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { useCart } from "@/feature/products/composables/use.cart.ts";
import { useFavorites } from "@/feature/products/composables/use.favorites.ts";

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