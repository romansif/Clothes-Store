import { ref } from "vue";

import { type SearchForm } from "@/features/search-product";

export const searchProductForm = ref<SearchForm>({
    search: "",
});
