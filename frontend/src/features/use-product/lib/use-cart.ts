import { type User } from "@/entities/profile/model/user.types.ts";
import {type ColorItem, type Product, type Size} from "@/entities/product/model/product.types.ts";
import { addToCartForm } from "@/entities/product/model/add.to.cart.form.ts";

export const useCart = () => {
    const addColor = (color: ColorItem, user: User, product: Product) => {
        const isNotBuyer = user.role !== 'Buyer';
        const hasStock = product.variants.some(v => v.hex === color.hex &&
            (!addToCartForm.value.sizes || v.size === addToCartForm.value.sizes) && Number(v.count) < 0
        );

        if(isNotBuyer || hasStock) {
            return;
        }
        addToCartForm.value.colors = { hex: color.hex, colorName: color.colorName };
    };

    const addSize = (size: Size, user: User, product: Product) => {
        const isNotBuyer = user.role !== 'Buyer';
        const hasStock = product.variants.some(p => p.size === size.name &&
            (!addToCartForm.value.colors?.hex || p.hex === addToCartForm.value.colors.hex) && Number(p.count) < 0
        );

        if(isNotBuyer || hasStock) {
            return;
        }
        addToCartForm.value.sizes = size.name;
    };

    return {
        addColor,
        addSize,
    }
}