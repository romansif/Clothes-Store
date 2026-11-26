import { searchProductForm } from "@/features/search-product";

export const clearSearchProductForm = () => {
  searchProductForm.value.search = "";
};
