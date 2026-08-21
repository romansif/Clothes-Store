import { filterProducts } from "@/feature/navigation/lib/filter-products.ts";
import { productForms } from "@/feature/products/model/product.forms.ts";
import { type Product, type ColorItem, type Sizes } from "@/feature/products/model/product.store.ts";
import { type User } from "@/feature/profile/model/users.store.ts";

const { selectedGender } = filterProducts();
const { addToCartForm } = productForms();

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

    const selectedColorClass = (color: ColorItem, product: Product, user: User) => [
        'w-15 h-15',
        {
            'scale-110': addToCartForm.value.colors?.colorName === color.colorName,
            'hover:scale-110 transition duration-400 cursor-pointer': product.status !== 'Exhausted' && user.role !== 'Seller'
        }
    ];

    const selectedSizesClass = (size: Sizes, product: Product, user: User) => [
        size.class, 'w-15 h-15',
            {
                'scale-110' : addToCartForm.value.sizes === size.name,
                'hover:scale-110 transition duration-400 cursor-pointer': product.status !== 'Exhausted' &&
                    user.role !== 'Seller'
            }
    ];

    return {
        selectGenderClass,
        selectedSizeClass,
        selectedFilterClass,
        selectedCategoryClass,
        selectedColorClass,
        selectedSizesClass,
    }
}