import { type User } from "@/features/use-profile/model/user.types.ts";
import {type ColorItem, type Product, type Size} from "@/features/use-product/model/product.types.ts";
import { addToCartForm } from "@/features/use-cart/model/cart.form.ts";

const { cartForm } = addToCartForm();

export const useCart = () => {
    const addColor = (color: ColorItem, user: User, product: Product) => {
        const isNotBuyer = user.role !== 'Buyer';
        const hasStock = product.variants.some(v => v.hex === color.hex &&
            (!cartForm.value.sizes || v.size === cartForm.value.sizes) && Number(v.count) < 0
        );

        if(isNotBuyer || hasStock) {
            return;
        }
        cartForm.value.colors = { hex: color.hex, colorName: color.colorName };
    };

    const addSize = (size: Size, user: User, product: Product) => {
        const isNotBuyer = user.role !== 'Buyer';
        const hasStock = product.variants.some(p => p.size === size.name &&
            (!cartForm.value.colors?.hex || p.hex === cartForm.value.colors.hex) && Number(p.count) < 0
        );

        if(isNotBuyer || hasStock) {
            return;
        }
        cartForm.value.sizes = size.name;
    };

    return {
        addColor,
        addSize,
    }
}