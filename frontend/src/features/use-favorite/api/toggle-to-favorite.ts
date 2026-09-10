import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import {useFavorite} from "@/features/use-favorite/lib/use-favorite.ts";

const { cart } = cartStore();
const { userData } = userStore();
const { products } = useGetProduct();
const { openNotify } = useBaseModals();
const { isFavorite } = useFavorite()
const { getFavoriteProducts } = useGetFavorite();

export const useToggleFavorite = () => {
    const toggleToFavorite = async (id: string, type: string, productId: string) => {
        try{
            const sourceList = type === 'cart' ? cart?.value : products?.value;
            const currentProduct = sourceList?.find(item => item?.id === id);

            const currentId = type === 'cart' ? currentProduct?.productId : currentProduct?.id
            if (!currentId) {
                console.warn("Product ID not found for core operation");
                return;
            }

            if(!isFavorite(currentId, userData?.id)){
                if (!userData?.id) {
                    console.error("User ID is missing");
                    return;
                }

                await handler(`/favorites`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userData?.id,
                        productId: currentId,
                        images: currentProduct?.images,
                        title: currentProduct?.title,
                        category: currentProduct?.category,
                        material: currentProduct?.material,
                        price: currentProduct?.price,
                        description: currentProduct?.description,
                        color: currentProduct?.colors,
                        size: currentProduct?.sizes,
                        gender: currentProduct?.gender,
                        variants: currentProduct?.variants,
                    })
                });
                await getFavoriteProducts();

                await openNotify('You have successfully added the item to your favorite.',
                    'You will now be redirected to the "Favorite" page.', 'favorite');
            }else{
                await deleteFavoriteProduct(productId);
            }
        }catch(err){
            console.error(`Failed to add the favorite:`, err);
        }
    };

    const deleteFavoriteProduct = async (id: string) => {
        try{
            await handler(`/favorites/${id}`, {
                method: "DELETE",
            });
            await getFavoriteProducts();
        }catch(err){
            console.error(`Failed to delete the favorite product:`, err);
        }
    };

    return{
        toggleToFavorite,
        deleteFavoriteProduct,
    }
}