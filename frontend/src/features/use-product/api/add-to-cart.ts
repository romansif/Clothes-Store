import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { clearAddToCartForm } from "@/features/use-product/lib/clear-cart.ts";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { addToCartApiErrors } from "@/shared/lib/api-errors/add-to-cart-errors.ts";
import { addToCartValidationErrors } from "@/shared/lib/validation-errors/validation-add-to-cart.ts";
import { addToCartForm } from "@/features/use-product/model/add.to.cart.form.ts";
import { addToCartSchema } from "@/features/use-product/model/add.to.cart.schemas.ts";

const { userData } = userStore();
const { product } = useGetProduct();
const { unreadCount } = cartStore();
const { openNotify } = useBaseModals();
const { getCartProducts } = useGetCart();
const { clearCartForm } = clearAddToCartForm();

export const useAddToCart = () => {
    const addToCart = async () => {
        const result = addToCartSchema.safeParse(addToCartForm.value)
        if(!result.success){
            addToCartValidationErrors(result.error);
            return
        }

        try{
            const currentProduct = product.value;
            const currentQuantity = currentProduct.variants.find(
                q => q.hex === addToCartForm.value.colors.hex);

            await handler(`/cart`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.id,
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

            await openNotify('You have successfully added the item to your cart.',
                'You will now be redirected to the "Cart" page.', 'cart');
        }catch(err){
            addToCartApiErrors(err);
            console.error(`Failed to add the cart:`, err);
        }
    };

    return {
        addToCart,
    }
}