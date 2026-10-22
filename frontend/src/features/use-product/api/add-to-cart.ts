import { handler } from "@/shared/api/http";
import { product } from "@/features/use-product/api/get-product";
import { useBaseModals } from "@/shared/lib/use-notify";
import { clearCartForm } from "@/features/use-product/lib/clear-cart";
import { cartStore } from "@/features/use-cart/model/cart.store";
import { userStore } from "@/features/use-profile/model/user.store";
import { useGetCart } from "@/features/use-cart/api/get-cart";
import { applyZodErrors, applyErrors } from "@/shared/lib/errors-helper";
import { addToCartForm, addToCartFormErrorMessages } from "@/features/use-product/model/add-to-cart-form";
import { addToCartSchema } from "@/features/use-product/model/add-to-cart-schemas";

const { userData } = userStore();
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