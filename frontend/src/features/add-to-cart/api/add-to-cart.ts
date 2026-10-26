import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { clearCartForm } from "@/features/product-info/lib/clear-cart-form";
import { cartStore } from "@/widgets/cart-list/model/cart.store";
import { userData } from "@/shared/model/user.store";
import { useProductData } from "@/features/product-info/lib/use-product-data";
import { getCartProducts } from "@/widgets/cart-list/api/get-cart";
import { applyZodErrors, applyErrors } from "@/shared/lib/errors-helper";
import { addToCartForm, addToCartFormErrorMessages } from "@/entities/product-info/model/add-to-cart-form";
import { addToCartSchema } from "@/entities/product-info/model/add-to-cart-schemas";
import type { RouteLocationNormalizedLoaded } from "vue-router";

const { unreadCount } = cartStore();
const { openNotify } = useBaseModals();

export const useAddToCart = (route: RouteLocationNormalizedLoaded) => {
    const { product } = useProductData(route)

    const userId = localStorage.getItem("userId")

    const addToCart = async () => {
        const result = addToCartSchema.safeParse(addToCartForm.value)
        if(!result.success){
            applyZodErrors(
                result.error,
                addToCartFormErrorMessages
            );
            return
        }

        try{
            if(!userData.value) return

            const currentProduct = product.value;
            if(!currentProduct) return

            const currentQuantity = currentProduct.variants.find(
                q => q.hex === addToCartForm.value.colors.hex);

            await handler(`/cart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.value.id,
                    productId: currentProduct.id,
                    images: currentProduct.images,
                    title: currentProduct.title,
                    category: currentProduct.category,
                    material: currentProduct.material,
                    price: currentProduct.price,
                    description: currentProduct.description,
                    colors: [{
                        hex: addToCartForm.value.colors.hex,
                        colorName: addToCartForm.value.colors.colorName
                    }],
                    sizes: addToCartForm.value.sizes,
                    gender: currentProduct.gender,
                    variants: [{
                        hex: currentQuantity?.hex,
                        colorName: currentQuantity?.colorName,
                        size: addToCartForm.value.sizes,
                        count: 1
                    }],
                    checked: false,
                })
            });
            unreadCount.value += 1;

            clearCartForm();

            await getCartProducts(userId);

            await openNotify('You have successfully added the item to your cart',
                'You will now be redirected to the "Cart" page');
        }catch(err){
            applyErrors(
                err,
                addToCartFormErrorMessages
            );
            console.error(`Failed to add the cart:`, err);
        }
    };

    return {
        addToCart,
    }
}