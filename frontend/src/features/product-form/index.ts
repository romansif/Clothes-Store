export { default as ProductBaseInfo } from "./ui/ProductBaseInfo.vue";

export type * from "./model/product-form.types";

export {
  createProductForm,
  createProductFormErrorMessages,
  moreCreateItemForm,
  moreCreateItemFormErrorMessages,
} from "./model/product-forms";
export { baseSelectClass, PRODUCT_FORM_ERROR_CLASS, SKU_CLASS } from "./model/product-form.variants";
export { createProductSchema, moreCreateItemsSchema } from "./model/product-schemas";
export { productSpecific } from "./model/product-specific";
export { clearProductForm } from "./lib/clear-product-form";
export { productFormHelper } from "./lib/product-form-helper";
export { MODES, useProductForm } from "./lib/use-product-form";
