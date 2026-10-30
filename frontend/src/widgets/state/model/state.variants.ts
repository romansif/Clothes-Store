import type { PageVariant } from "@/widgets/state";

export const stateBoxClass = `w-full flex flex-col justify-center items-center z-50 gap-8 py-12 
    font-raleway bg-white border border-[#e5e5e5]`;

export const stateBoxVariantClass: Record<PageVariant, string> = {
    product: "",
    user: `${stateBoxClass} mt-45`,
    "season-list": `${stateBoxClass} mt-10`,
    "week-list": `${stateBoxClass} mt-10`,
    "year-list": `${stateBoxClass} mt-10`,
    products: `${stateBoxClass} mt-20`,
    "my-products": `${stateBoxClass} mt-30`,
    cart: `${stateBoxClass} mt-10`,
    favorite: `${stateBoxClass} mt-10`,
    reviews: `${stateBoxClass} my-10`,
    orders: `${stateBoxClass} mt-14`,
    addresses: `${stateBoxClass} mt-18`,
    payments: `${stateBoxClass} mt-18`,
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
};

export const loaderBoxClass = `font-montserrat inset-0 z-50 flex items-center justify-center`;

export const loaderBoxVariantClass: Record<PageVariant, string> = {
    product: `${loaderBoxClass} my-50 px-127`,
    user: `${loaderBoxClass} my-80`,
    "season-list": `${loaderBoxClass} mt-45`,
    "week-list": `${loaderBoxClass} my-40`,
    "year-list": `${loaderBoxClass} my-40`,
    products: `${loaderBoxClass} mt-45`,
    "my-products": `${loaderBoxClass} my-65 px-163`,
    cart: `${loaderBoxClass} my-50 px-163`,
    favorite: `${loaderBoxClass} my-50`,
    reviews: `${loaderBoxClass} my-45`,
    orders: `${loaderBoxClass} mt-50`,
    addresses: `${loaderBoxClass} mt-45`,
    payments: `${loaderBoxClass} mt-45`,
};
