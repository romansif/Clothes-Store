import { searchProductForm } from "@/widgets/model/search.form.ts";

export const clearSearchProductForm = () => {
    searchProductForm.value.search = '';
}