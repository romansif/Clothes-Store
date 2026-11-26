<<<<<<<< HEAD:frontend/src/shared/ui/state/state.variants.ts
import type { PageVariant } from "@/shared/ui/state/index";
========
import type { PageVariant } from "@/shared/ui/state";
>>>>>>>> origin/master:frontend/src/shared/ui/state/model/state.variants.ts

export const stateSectionClass = "flex justify-center item-center w-full";

export const stateBoxClass = `flex flex-col justify-center items-center gap-8 py-12 
    font-raleway bg-white border w-full`;

export const stateBoxVariantClass: Record<PageVariant, string> = {
  product: "",
  user: `${stateBoxClass} mt-50`,
  "season-list": `${stateBoxClass} mt-10`,
  "week-list": `${stateBoxClass} mt-15`,
  "year-list": `${stateBoxClass} mt-20`,
  products: `${stateBoxClass} mt-10`,
  "my-products": `${stateBoxClass} mt-35`,
  cart: `${stateBoxClass} mt-15`,
  favorite: `${stateBoxClass} mt-15`,
  reviews: `${stateBoxClass} mb-10`,
  orders: `${stateBoxClass} mt-30`,
  addresses: `${stateBoxClass} mt-10`,
  payments: `${stateBoxClass} mt-10`,
  "seller-orders": `${stateBoxClass} my-35`,
};

export const stateBoxMessageClass = "flex flex-col items-center gap-6";

export const stateTitleClass = "font-semibold text-xl";

export const stateTextClass = "font-medium";

export const buttonBoxClass = "flex items-center gap-6";

export const stateRouteClass: Record<PageVariant, string> = {
  product: "",
  user: `hidden`,
  "season-list": `${buttonBoxClass}`,
  "week-list": `${buttonBoxClass}`,
  "year-list": `${buttonBoxClass}`,
  products: "hidden",
  "my-products": `${buttonBoxClass}`,
  cart: `${buttonBoxClass}`,
  favorite: `${buttonBoxClass}`,
  reviews: "hidden",
  orders: `${buttonBoxClass}`,
  addresses: "hidden",
  payments: "hidden",
  "seller-orders": "hidden",
};

export const loaderSectionClass = "flex justify-center item-center w-full";

export const loaderItemsClass = "flex flex-col items-center gap-8";

export const loaderBoxVariantClass: Record<PageVariant, string> = {
  product: `my-45`,
  user: `my-70`,
  "season-list": `mt-45`,
  "week-list": `my-40`,
  "year-list": `my-40`,
  products: `my-45`,
  "my-products": `my-65`,
  cart: `my-50`,
  favorite: `my-50`,
  reviews: `my-45`,
  orders: `mt-65`,
  addresses: `mt-45`,
  payments: `mt-45`,
  "seller-orders": `my-70`,
};
