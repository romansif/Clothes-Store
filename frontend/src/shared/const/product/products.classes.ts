import { addToCartForm } from "@/features/use-cart/model/cart.form.ts";
import {type ColorItem, type Product, type Size} from "@/entities/product/model/product.types.ts";

const { cartForm } = addToCartForm();

export const productsClasses = () => {
    const selectedSizeClass = (style: string, isActive: boolean) => [
        style, 'w-10 transition duration-400 hover:scale-120 cursor-pointer',
        isActive ? 'scale-120' : ''
    ];

    const selectedFilterClass = (isActive: boolean) => [
        'w-5.75 h-h-5.75 transition duration-400 hover:scale-120 cursor-pointer',
        isActive ? 'scale-120' : ''
    ];

    const selectedCategoryClass = (isActive: boolean) => [
        `cursor-pointer border-2 sm:px-2 sm:py-1 md:px-5 text-lg transition duration-400 
        hover:border-black hover:text-black hover:scale-105`,
        isActive ? ' border-black scale-105' : 'text-[#A3A3A3] border-[#A3A3A3]'
    ];

    const selectedCollectionsClass = (isActive: boolean) => [
        `cursor-pointer border-2 px-8 py-1 text-lg transition duration-400 
        hover:border-black hover:text-black hover:scale-105`,
        isActive ? ' border-black scale-105' : 'text-[#A3A3A3] border-[#A3A3A3]'
    ];

    const isColorAvailable = (color: ColorItem, product: Product) =>
        product.variants.some(p => p.hex === color.hex &&
            (!cartForm.value.sizes || p.size === cartForm.value.sizes) && Number(p.count) > 0
        );

    const isSizeAvailable = (size: Size, product: Product) =>
        product.variants.some(p => p.size === size.name &&
            (!cartForm.value.colors?.hex || p.hex === cartForm.value.colors.hex) && Number(p.count) > 0
        );

    const selectedColorClass = (color: ColorItem, product: Product, role: string) => {
        const available = product.status !== 'Exhausted' && role !== 'Seller' && isColorAvailable(color, product);

        return [
            'w-[62px] h-[62px] transition duration-500 border-2 border-dashed border-[#A3A3A3]',
            {
                'scale-110': cartForm.value.colors?.hex === color.hex,
                'hover:scale-110 cursor-pointer': available,
                'opacity-70 grayscale-[0.8] cursor-not-allowed pointer-events-none scale-95 border-dashed border-gray-300 bg-gray-50 text-gray-400': !available
            },
        ];
    };

    const selectedSizesClass = (size: Size, product: Product, role: string) => {
        const available = product.status !== 'Exhausted' && role !== 'Seller' && isSizeAvailable(size, product);

        return [
            size.class,
            'w-[61px] h-[61px] transition duration-500 border-dashed',
            {
                'scale-110': cartForm.value.sizes === size.name,
                'hover:scale-110 cursor-pointer': available,
                'opacity-70 grayscale-[0.8] cursor-not-allowed pointer-events-none scale-95 border-dashed border-gray-300 bg-gray-50 text-gray-400': !available,
            },
        ];
    };

    const selectedSidebarCategoryClass = (isActive: boolean) => [
        `py-1 cursor-pointer border-2 transition duration-400 hover:border-black hover:text-black hover:scale-105`,
        isActive ? ' border-black scale-105' : 'text-[#A3A3A3] border-[#A3A3A3]'
    ];

    return {
        selectedSizeClass,
        selectedFilterClass,
        selectedCategoryClass,
        selectedCollectionsClass,
        selectedColorClass,
        selectedSizesClass,
        selectedSidebarCategoryClass,

        isColorAvailable,
        isSizeAvailable,
    }
}