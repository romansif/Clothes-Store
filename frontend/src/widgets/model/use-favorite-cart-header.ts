import { computed } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export const useFavoriteCartHeader = (route: RouteLocationNormalizedLoaded) => {
    const isCart = computed(() => route.name === "cart");
    const isFavorite = computed(() => route.name === "favorite");

    return {
        isCart,
        isFavorite,
    }
}