import { searchForm } from "@/entities/navigation/model/search.form.ts";

const { searchProductForm } = searchForm();

export const clearSearchProductForm = () => {
    searchProductForm.value.search = '';
}