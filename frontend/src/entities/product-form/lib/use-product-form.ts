import { computed } from "vue";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export const useProductForm = (route: RouteLocationNormalizedLoaded) => {
    const isCreate = computed(() => route.name === 'create/product')

    return {
        isCreate,
    }
}