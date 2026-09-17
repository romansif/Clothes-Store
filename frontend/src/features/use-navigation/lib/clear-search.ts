import { searchProductForm } from "@/widgets/navigation/model/search.form.ts";

export const clearSearchProductForm = () => {
    searchProductForm.value.search = '';
}