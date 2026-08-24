import { filterProducts } from "@/feature/navigation/lib/filter-products.ts";
import { addToCartForm } from "@/feature/cart/model/cart.forms.ts";
import type { ColorItem, Sizes } from "@/feature/products/model/product.types.ts";
import type { CartItem } from "@/feature/cart/model/cart.types.ts";
import type { User } from "@/feature/profile/model/users.types.ts";

const { cartForm } = addToCartForm();
const { selectedGender } = filterProducts();

export const productsClasses = () => {
    const selectGenderClass = (gender: string) => [
        `text-[#A3A3A3] transition duration-400 hover:text-black hover:scale-115 cursor-pointer`,
        selectedGender.value === gender ? 'text-black scale-115' : '',
    ];

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

    const selectedColorClass = (color: ColorItem, product: CartItem, user: User) => [
        'w-[62px] h-[62px] transition duration-400',
        {
            'scale-110': cartForm.value.colors?.hex === color.hex,
            'hover:scale-110 cursor-pointer': product.status !== 'Exhausted' && user.role !== 'Seller'
        },
    ];

    const selectedSizesClass = (size: Sizes, product: CartItem, user: User) => [
        size.class, 'w-[61px] h-[61px] transition duration-400',
            {
                'scale-110' : cartForm.value.sizes === size.name,
                'hover:scale-110 cursor-pointer': product.status !== 'Exhausted' &&
                    user.role !== 'Seller'
            }
    ];

    const selectedSidebarCategoryClass = (isActive: boolean) => [
        `py-1 cursor-pointer border-2 transition duration-400 hover:border-black hover:text-black hover:scale-105`,
        isActive ? ' border-black scale-105' : 'text-[#A3A3A3] border-[#A3A3A3]'
    ]

    return {
        selectGenderClass,
        selectedSizeClass,
        selectedFilterClass,
        selectedCategoryClass,
        selectedColorClass,
        selectedSizesClass,
        selectedSidebarCategoryClass
    }
}