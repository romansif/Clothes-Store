import { addToCartForm, addToCartFormErrorMessages } from "@/entities/product-info";

export const clearCartForm = () => {
  addToCartForm.value.colors = {
    hex: "",
    colorName: "",
  };
  addToCartForm.value.sizes = "";

  addToCartFormErrorMessages.value.colors = "";
  addToCartFormErrorMessages.value.sizes = "";
};
