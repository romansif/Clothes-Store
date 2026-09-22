import {ref} from "vue";
import { type SearchForm } from "@/widgets/model/filter.types.ts";

export const searchProductForm = ref<SearchForm>({
    search: ''
})

