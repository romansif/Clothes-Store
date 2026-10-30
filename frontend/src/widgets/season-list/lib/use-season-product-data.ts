import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { getSeasonal } from "@/widgets/season-list/api/get-season-product";

export const useSeasonProductData = (season: MaybeRefOrGetter<string>) => {
    const {
        data: seasonCatalog,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useQuery({
        queryKey: computed(() => ["seasonCatalog", season]),
        queryFn: () => getSeasonal(toValue(season)),
        enabled: computed(() => Boolean(toValue(season))),
    });

    return {
        seasonCatalog: computed(() => seasonCatalog.value ?? []),
        isLoading,
        isFetching,
        isError,
        refetch,
    };
};
