import {ref} from "vue";
import { type SearchForm } from "@/entities/navigation/model/filter.types.ts";

const searchProductForm = ref<SearchForm>({
    search: ''
})

export const searchForm = () => {
    return {
        searchProductForm
    }
}