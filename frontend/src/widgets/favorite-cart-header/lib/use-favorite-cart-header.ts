import { computed } from "vue";
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { useFavoriteData } from "@/widgets/favorite-list/lib/use-favorite-data";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export const useFavoriteCartHeader = (route: RouteLocationNormalizedLoaded) => {
    const { cart } = useCartData()
    const { favorite } = useFavoriteData()

    const cartCount = computed(() => {
        return cart.value.length;
    });

    const favoritesCount = computed(() => {
        return favorite.value.length;
    });

    const isCart = computed(() => route.name === "cart");
    const isFavorite = computed(() => route.name === "favorite");

    return {
        isCart,
        isFavorite,
        favoritesCount,
        cartCount
    }
}