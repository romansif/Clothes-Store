import { useFilteredProductData } from "@/widgets/product-list/lib/use-product-data";
import { activeFilter } from "@/features/filter-products/model/active-filter";

export const useFilterData = () => {
    return useFilteredProductData(
        () => activeFilter.value.type,
        () => activeFilter.value.value,
    )
}
