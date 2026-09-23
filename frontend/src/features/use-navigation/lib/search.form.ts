import {ref} from "vue";
import { type SearchForm } from "@/features/use-navigation/lib/filter.types.ts";

export const searchProductForm = ref<SearchForm>({
    search: ''
})

