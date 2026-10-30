import { useFilteredProductData } from "@/widgets/product-list/lib/use-product-data";
import { debouncedSearch } from "@/features/search-product/api/search-product";

export const useSearchData = () => {
    return useFilteredProductData("ALL", "ALL", debouncedSearch);
};
