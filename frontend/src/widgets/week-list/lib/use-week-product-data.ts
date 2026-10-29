import { computed, toValue, type MaybeRefOrGetter} from "vue";
import { useQuery } from "@tanstack/vue-query";
import { getWeekProducts } from "@/widgets/week-list/api/get-week-product";

export const useWeekProductData = (
    type: MaybeRefOrGetter<string>,
    filter: MaybeRefOrGetter<string>
) => {
    const { data: weekProducts, isPending, isError } = useQuery({
        queryKey: computed(() => ['weekProducts', type, filter]),
        queryFn: () => getWeekProducts(toValue(type), toValue(filter)),
    });

    return {
        weekProducts: computed(() => weekProducts.value ?? []),
        isPending,
        isError
    };
};