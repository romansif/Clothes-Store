import { computed } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export const useMainNavBar = (route: RouteLocationNormalizedLoaded) => {
    const isHome = computed(() => route.name === "home");
    const isCart = computed(() => route.name !== "cart");
    const isProducts = computed(() => route.name === "shop");
    const isProfile = computed(() => route.name !== "profile");
    const isNewCollections = computed(() => route.name === "shop/new-collections");
    const isSeasonCollections = computed(() => route.name === "shop/seasons-catalog");

    return {
        isHome,
        isCart,
        isProducts,
        isProfile,
        isNewCollections,
        isSeasonCollections,
    }
}