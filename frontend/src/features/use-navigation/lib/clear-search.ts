import { searchProductForm } from "@/features/use-navigation/lib/search.form";

export const clearSearchProductForm = () => {
    searchProductForm.value.search = '';
}