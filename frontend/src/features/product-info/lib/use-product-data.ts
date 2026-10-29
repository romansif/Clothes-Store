import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { getProduct } from "@/features/product-info/api/get-product";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export const useProductData = (route: RouteLocationNormalizedLoaded) => {
    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: computed(() => ["product", route.params.id]),

        queryFn: () => {
            const productId = route.params.id;

            if (!productId) {
                throw new Error("User is not authenticated");
            }

            return getProduct(productId);
        },

        enabled: computed(() => Boolean(route.params.id)),
    });

    const productItem = computed(() => product.value ?? null);

    return {
        product: productItem,
        isLoading,
        isError,
    };
};
