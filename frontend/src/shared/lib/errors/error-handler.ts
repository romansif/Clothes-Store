import { ref } from "vue";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";

const { getCartProducts } = useGetCart();
const { getFilteredProducts } = useGetProduct();
const { getFavoriteProducts } = useGetFavorite();

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