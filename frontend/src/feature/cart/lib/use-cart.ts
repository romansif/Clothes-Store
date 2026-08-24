import { type User } from "@/feature/profile/model/users.types.ts";
import { type ColorItem, type Sizes } from "@/feature/products/model/product.types.ts";
import { addToCartForm } from "@/feature/cart/model/cart.forms.ts";
import { cartStore } from "@/feature/cart/model/cart.store.ts";

const { cart } = cartStore();
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

    const isChecked = (id: string) => {
        return cart.value.some(f => f.productId === id)
    };

    return {
        addColor,
        addSize,
        isChecked
    }
}