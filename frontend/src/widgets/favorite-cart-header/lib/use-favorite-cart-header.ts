import { computed } from "vue";
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { favoriteStore } from "@/entities/favorite/model/favorite-store";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const { favorite } = favoriteStore();

export const useFavoriteCartHeader = (route: RouteLocationNormalizedLoaded) => {
    const { cart } = useCartData()

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