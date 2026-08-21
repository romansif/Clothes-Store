import type { User } from "@/feature/profile/model/users.types.ts";
import type { ColorItem, Sizes } from "@/feature/products/model/product.types.ts";
import { addToCartForm } from "@/feature/cart/model/cart.forms.ts";

const { cartForm } = addToCartForm();

export const useCartForm = () => {
    const addColor = (color: ColorItem, user: User) => {
        if(user.role !== 'Buyer'){
            return
        }
        cartForm.value.colors = { hex: color.hex, colorName: color.colorName }
    };

    const addSize = (size: Sizes, user: User) => {
        if(user.role !== 'Buyer'){
            return
        }
        cartForm.value.sizes = size.name
    }
    return {
        addColor,
        addSize,
    }
}