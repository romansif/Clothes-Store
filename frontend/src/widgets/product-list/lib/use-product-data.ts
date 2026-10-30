import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useGetProducts } from "@/widgets/product-list/api/get-product";
import { getSearchedProducts } from "@/features/search-product/api/search-product";
import { activeFilter } from "@/features/filter-products/model/active-filter";
import { activeSearch } from "@/features/search-product/api/search-product";

const { getAllProducts, getFilteredProducts } = useGetProducts();

export const useProductsData = () => {
    const {
        data: products,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: () => getAllProducts(),
    });

    return {
        products: computed(() => products.value ?? []),
        isLoading,
        isError,
    };
};

export const useFilteredProductData = (
    type: MaybeRefOrGetter<string>,
    filter: MaybeRefOrGetter<string>,
    search: MaybeRefOrGetter<string> = "",
) => {
    const term = computed(() => toValue(search).trim());

    const { data, isLoading, isFetching, isError, refetch } = useQuery({
        queryKey: computed(() => ["filteredProducts", toValue(type), toValue(filter), term.value]),
        queryFn: () =>
            term.value
                ? getSearchedProducts(term.value)
                : getFilteredProducts(toValue(type), toValue(filter)),
        enabled: computed(
            () => Boolean(term.value) || (Boolean(toValue(type)) && toValue(type) !== "COLLECTION"),
        ),
        placeholderData: keepPreviousData,
    });

    return {
        filteredProducts: computed(() => data.value ?? []),
        isLoading,
        isFetching,
        isError,
        refetch
    };
};

export const useProductListData = () => {
    return useFilteredProductData(
        () => activeFilter.value.type,
        () => activeFilter.value.value,
        activeSearch,
    );
};
