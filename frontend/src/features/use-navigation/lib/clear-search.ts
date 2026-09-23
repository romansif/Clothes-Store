import { searchProductForm } from "@/features/use-navigation/lib/search.form.ts";

export const clearSearchProductForm = () => {
    searchProductForm.value.search = '';
}