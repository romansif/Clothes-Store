import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { userData } from "@/shared/model/user.store";
import { getProduct } from "@/features/product-info/api/get-product";
import type { RouteLocationNormalizedLoaded } from "vue-router";

export const useProductData = (route: RouteLocationNormalizedLoaded) => {
    const { data: product } = useQuery({
        queryKey: computed(() => ['product', route.params.id]),

        queryFn: () => {
            const productId =  route.params.id;

            if (!productId) {
                throw new Error('User is not authenticated');
            }

            return getProduct(productId);
        },

        enabled: computed(() => Boolean(userData.value?.id)),
    });

    const productItem = computed(() => product.value ?? null);


    return {
        product: productItem,

    }
}