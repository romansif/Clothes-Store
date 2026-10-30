import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { getYearProducts } from "@/widgets/year-list/api/get-year-product";

export const useYearProductData = (
    type: MaybeRefOrGetter<string>,
    filter: MaybeRefOrGetter<string>,
) => {
    const {
        data: yearProducts,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useQuery({
        queryKey: computed(() => ["yearProducts", type, filter]),
        queryFn: () => getYearProducts(toValue(type), toValue(filter)),
    });

    return {
        yearProducts: computed(() => yearProducts.value ?? []),
        isLoading,
        isFetching,
        isError,
        refetch,
    };
};
