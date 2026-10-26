import { computed } from "vue";
import { cartStore } from "@/widgets/cart-list/model/cart.store";
import { favoriteStore } from "@/entities/favorite/model/favorite-store";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const { cart } = cartStore()
const { favorite } = favoriteStore();

export const useFavoriteCartHeader = (route: RouteLocationNormalizedLoaded) => {
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