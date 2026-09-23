import type {ProductCardVariant} from "@/entities/product-card/model/product.class.types.ts";

export const productCardVariants = {
    "main&favorite&Cart": {
        size: "w-83.75 h-45 sm:h-78.5 xl:h-100",
        stack: "absolute top-41 -left-12 text-7xl font-semibold -rotate-50 w-110",
        button: "absolute top-0.5 left-75.5 w-8 cursor-pointer",
    },

    myProduct: {
        size: "w-83.75 h-78.5 md:h-[314px] xl:h-100",
        stack: "absolute top-41 -left-12 text-7xl font-semibold -rotate-50 w-110",
        button: "absolute top-0.5 left-75.5 w-8 cursor-pointer",
    },

    season: {
        size: "w-83.75 h-45 sm:h-78.5 xl:h-95",
        stack: "absolute top-35 -left-6 text-6xl font-semibold -rotate-50 w-110",
        button: "absolute top-0.5 left-75.5 w-8 cursor-pointer"
    },

    week: {
        size: "w-full h-50 md:h-60 lg:h-85",
        stack: "absolute top-28 -left-13 text-6xl font-semibold -rotate-52 w-110",
        button: "absolute top-0.5 left-63 w-8 cursor-pointer"
    },

    year: {
        size: "w-full h-50 md:h-70 lg:h-105",
        stack: "absolute top-45 -left-10 text-7xl font-semibold -rotate-50 w-110",
        button: "absolute top-0.5 left-79.5 w-8 cursor-pointer"
    }

} satisfies Record<ProductCardVariant, {
    size: string,
    stack: string
    button: string
}>