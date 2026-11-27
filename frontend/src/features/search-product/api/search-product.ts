import { computed } from "vue";
import { refDebounced } from "@vueuse/core";

import { searchProductForm } from "@/features/search-product";
import { handler } from "@/shared/api";
import type { Product } from "@/shared/model";

export const search = computed(() => searchProductForm.value.search);
export const debouncedSearch = refDebounced(search, 700);

export const activeSearch = computed(() => (search.value.trim() ? debouncedSearch.value.trim() : ""));

export const getSearchedProducts = async (search: string) => {
  return await handler<Product[]>(`/searched?search=${encodeURIComponent(search)}`, {
    method: "GET",
  });
};
