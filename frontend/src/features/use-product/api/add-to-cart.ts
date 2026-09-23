import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { clearCartForm } from "@/features/use-product/lib/clear-cart.ts";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { applyZodErrors, applyErrors } from "@/shared/lib/helper/errors-helper.ts";
import { addToCartForm, addToCartFormErrorMessages } from "@/shared/model/add.to.cart.form.ts";
import { addToCartSchema } from "@/shared/model/add.to.cart.schemas.ts";

const { userData } = userStore();
const { product } = useGetProduct();
const { unreadCount } = cartStore();
const { openNotify } = useBaseModals();
const { getCartProducts } = useGetCart();

export const useAddToCart = () => {
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

            await getCartProducts();

            clearCartForm();

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