import { computed } from 'vue';
import { refDebounced } from "@vueuse/core";
import { handler } from "@/shared/api/http";
import { searchProductForm } from "@/features/search-product/model/search-form";
import type { Product } from "@/shared";

export const search = computed(() => searchProductForm.value.search);
export const debouncedSearch = refDebounced(search, 700);

export const activeSearch = computed(() =>
    search.value.trim() ? debouncedSearch.value.trim() : ''
);
export const getSearchedProducts = async (search: string) => {
    return await handler<Product[]>(`/searched?search=${encodeURIComponent(search)}`, {
        method: 'GET',
    })
};

