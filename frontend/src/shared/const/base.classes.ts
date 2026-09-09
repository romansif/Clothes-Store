import { type Product } from "@/entities/product/model/product.types.ts";

export const baseClasses = () => {
    const getPhoneClass = (hasError: boolean) => [
        `bg-[#D9D9D9]/40 w-full outline-none px-4 py-4 rounded-sm border border-gray-300
        transition duration-400 hover:bg-gray-50 font-dm-sans`,
        hasError ? 'border border-red-500' : ''
    ];

    const productPreviewClass = (sizeImg: string, product: Product) => [
        sizeImg,
        product.variants.every(v => v.count === 0) ? 'opacity-40' : ''
    ];

    const selectedPageClass = (isPage: boolean) => [
        'text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-120',
        isPage ? 'text-black scale-120' : ''
    ];

    return {
        getPhoneClass,
        productPreviewClass,

        selectedPageClass,
    }
}