import {useQuery, useQueryClient} from "@tanstack/vue-query";
import { computed } from "vue";
import { getProduct } from "@/features/product-info/api/get-product";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import type { Product } from "@/shared";

export const useProductData = (route: RouteLocationNormalizedLoaded) => {
    const queryClient = useQueryClient()
    const queryKey = computed(() => ["product", route.params.id]);

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useQuery({
        queryKey,

        queryFn: () => {
            const productId = route.params.id;

            if (!productId) {
                throw new Error("User is not authenticated");
            }

            return getProduct(productId);
        },

        enabled: computed(() => Boolean(route.params.id)),
    });

    const product = computed<Product | null>({
        get: () => data.value ?? null,
        set: (value) => {
            queryClient.setQueryData(queryKey.value, value);
        },
    });


    return {
        product,
        isLoading,
        isFetching,
        isError,
        refetch
    };
};
