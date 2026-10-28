import { debouncedSearch } from "@/features/search-product/api/search-product";
import { useFilteredProductData } from "@/widgets/product-list/lib/use-product-data";

export const useSearchData = () => {
    return useFilteredProductData('ALL', 'ALL', debouncedSearch)
}