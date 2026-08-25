import { type User } from "@/entities/profile/model/user.types.ts";
import { type ColorItem, type Sizes } from "@/entities/product/model/product.types.ts";
import { addToCartForm } from "@/feature/use-cart/model/cart.form.ts";

const { cartForm } = addToCartForm();

export const useCart = () => {
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
    };

    return {
        addColor,
        addSize,
    }
}