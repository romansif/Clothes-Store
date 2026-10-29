import { searchProductForm } from "@/features/search-product/model/search-form";

export const clearSearchProductForm = () => {
    searchProductForm.value.search = "";
};
