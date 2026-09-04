import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { addToCartForm } from "@/features/use-cart/model/cart.form.ts";
import { clearAddToCartForm } from "@/features/use-cart/lib/clear.cart.ts";
import { cartStore } from "@/entities/cart/model/cart.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";

const { userData } = userStore();
const { product } = productStore();
const { unreadCount } = cartStore();
const { cartForm } = addToCartForm();
const { getCartProducts } = useGetCart();
const { openNotify } = useBaseModals();
const { addToCartErrors } = useFormsErrors();
const { clearCartForm } = clearAddToCartForm();

export const useAddToCart = () => {
    const addToCart = async () => {
        try{
            const currentProduct = product.value;
            const currentQuantity = product.value.variants.find(
                q => q.hex === cartForm.value.colors.hex);

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
                        hex: cartForm.value.colors.hex,
                        colorName: cartForm.value.colors.colorName
                    }],
                    sizes: cartForm.value.sizes,
                    gender: currentProduct.gender,
                    variants: [{
                        hex: currentQuantity?.hex,
                        colorName: currentQuantity?.colorName,
                        size: cartForm.value.sizes,
                        count: 1
                    }],
                    status: currentProduct.status,
                    checked: false,
                })
            });
            unreadCount.value += 1;

            await getCartProducts();

            clearCartForm();

            await openNotify('You have successfully added the item to your cart.',
                'You will now be redirected to the "Cart" page.', 'cart');
        }catch(err){
            addToCartErrors(err);
            console.error(`Failed to add the cart:`, err);
        }
    };

    return {
        addToCart,
    }
}