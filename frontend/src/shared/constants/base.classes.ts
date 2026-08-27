import { type Product } from "@/entities/product/model/product.types.ts";

export const baseClasses = () => {
    const getPhoneClass = (hasError: boolean) => [
        `bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm border border-gray-300
        transition duration-400 hover:bg-gray-50 font-dm-sans`,
        hasError ? 'border border-red-500' : ''
    ];

    const productPreviewClass = (size: string, product: Product) => [
        size, product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : ''
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