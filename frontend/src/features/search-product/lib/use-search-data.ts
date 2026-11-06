import { debouncedSearch } from "@/features/search-product/api/search-product";
import { useFilteredProductData } from "@/shared/lib/use-product-data";

export const useSearchData = () => {
  return useFilteredProductData("ALL", "ALL", debouncedSearch);
};
