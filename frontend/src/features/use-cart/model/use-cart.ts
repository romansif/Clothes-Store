import { type User } from "@/entities/profile/model/user.types.ts";
import {type ColorItem, type Product, type Size} from "@/entities/product/model/product.types.ts";
import { addToCartForm } from "@/features/use-cart/model/cart.form.ts";

const { cartForm } = addToCartForm();

export const useCart = () => {
    const addColor = (color: ColorItem, user: User, product: Product) => {
        const isNotBuyer = user.role !== 'Buyer';
        const hasStock = product.status === 'Exhausted'

        if(isNotBuyer || hasStock) {
            return;
        }
        cartForm.value.colors = { hex: color.hex, colorName: color.colorName };
    };

    const addSize = (size: Size, user: User, product: Product) => {
        const isNotBuyer = user.role !== 'Buyer';
        const hasStock = product.status === 'Exhausted'

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