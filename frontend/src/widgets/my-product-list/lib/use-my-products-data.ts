import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { userData } from "@/shared/model/user.store";
import { getMyProducts } from "@/widgets/my-product-list/api/get-my-product";

export const useMyProductsData = () => {
    const { data: myProducts } = useQuery({
        queryKey: computed(() => ['myProducts', userData.value?.id]),

        queryFn: () => {
            const userId = userData.value?.id;

            if (!userId) {
                throw new Error('User is not authenticated');
            }

            return getMyProducts(userId);
        },

        enabled: computed(() => Boolean(userData.value?.id)),
    });

    const myProductItems = computed(() => myProducts.value ?? []);

    return {
        myProducts: myProductItems,
    };
};
