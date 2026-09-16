import { addToCartForm } from "@/features/use-product/model/add.to.cart.form.ts";
import type { ColorItem, Product, Size } from "@/features/use-product/model/product.types.ts";

export const addToCartClasses = () => {
    const isColorAvailable = (color: ColorItem, product: Product) =>
        product.variants.some(v => v.hex === color.hex &&
            (!addToCartForm.value.sizes || v.size === addToCartForm.value.sizes) && Number(v.count) > 0
        );

    const isSizeAvailable = (size: Size, product: Product) =>
        product.variants.some(p => p.size === size.name &&
            (!addToCartForm.value.colors?.hex || p.hex === addToCartForm.value.colors.hex) && Number(p.count) > 0
        );

    const selectedColorClass = (color: ColorItem, product: Product, role: string) => {
        const available = role !== 'Seller' && isColorAvailable(color, product);

        return [
            'w-[62px] h-[62px] transition duration-500 border-2 border-dashed border-[#A3A3A3]',
            {
                'scale-110': addToCartForm.value.colors?.hex === color.hex,
                'hover:scale-110 cursor-pointer': available,
                'opacity-70 grayscale-[0.8] cursor-not-allowed pointer-events-none scale-95 border-dashed border-gray-300 bg-gray-50 text-gray-400': !available
            },
        ];
    };

    const selectedSizesClass = (size: Size, product: Product, role: string) => {
        const available = role !== 'Seller' && isSizeAvailable(size, product);

        return [
            size.class,
            'w-[61px] h-[61px] transition duration-500 border-dashed',
            {
                'scale-110': addToCartForm.value.sizes === size.name,
                'hover:scale-110 cursor-pointer': available,
                'opacity-70 grayscale-[0.8] cursor-not-allowed pointer-events-none scale-95 border-dashed border-gray-300 bg-gray-50 text-gray-400': !available,
            },
        ];
    };

    return {
        isColorAvailable,
        isSizeAvailable,
        selectedColorClass,
        selectedSizesClass,
    }
}