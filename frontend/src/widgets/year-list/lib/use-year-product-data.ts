import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { getYearProducts } from "@/widgets/year-list/api/get-year-product";

export const useYearProductData = (
    type: MaybeRefOrGetter<string>,
    filter: MaybeRefOrGetter<string>
) => {
    const { data: yearProducts, isPending, isError } = useQuery({
        queryKey: computed(() => ['yearProducts', type, filter]),
        queryFn: () => getYearProducts(toValue(type), toValue(filter)),
    });

    return {
        yearProducts: computed(() => yearProducts.value ?? []),
        isPending,
        isError
    };
}