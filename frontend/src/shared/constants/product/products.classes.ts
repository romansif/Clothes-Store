import { addToCartForm } from "@/feature/cart/model/cart.form.ts";
import { type ColorItem, type Sizes } from "@/entities/product/product.types.ts";
import { type CartItem } from "@/entities/cart/cart.types.ts";

const { cartForm } = addToCartForm();

export const productsClasses = () => {
    const selectedSizeClass = (style: string, isActive: boolean) => [
        style, 'w-10 transition duration-400 hover:scale-120 cursor-pointer', isActive ? 'scale-120' : ''
    ];

    const selectedFilterClass = (isActive: boolean) => [
        'w-5.75 h-h-5.75 transition duration-400 hover:scale-120 cursor-pointer', isActive ? 'scale-120' : ''
    ];

    const selectedCategoryClass = (isActive: boolean) => [
        `cursor-pointer border-2 sm:px-2 sm:py-1 md:px-5 text-lg transition duration-400 hover:border-black
        hover:text-black hover:scale-105`, isActive ? ' border-black scale-105' : 'text-[#A3A3A3] border-[#A3A3A3]'
    ];

    const selectedCollectionsClass = (isActive: boolean) => [
        `cursor-pointer border-2 px-6 py-1 text-lg transition duration-400 hover:border-black
        hover:text-black hover:scale-105`, isActive ? ' border-black scale-105' : 'text-[#A3A3A3] border-[#A3A3A3]'
    ]

    const selectedColorClass = (color: ColorItem, product: CartItem, role: String) => [
        'w-[62px] h-[62px] transition duration-400',
        {
            'scale-110': cartForm.value.colors?.hex === color.hex,
            'hover:scale-110 cursor-pointer': product.status !== 'Exhausted' && role !== 'Seller'
        },
    ];

    const selectedSizesClass = (size: Sizes, product: CartItem, role: String) => [
        size.class, 'w-[61px] h-[61px] transition duration-400',
            {
                'scale-110' : cartForm.value.sizes === size.name,
                'hover:scale-110 cursor-pointer': product.status !== 'Exhausted' && role !== 'Seller'
            }
    ];

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
        selectedSidebarCategoryClass
    }
}