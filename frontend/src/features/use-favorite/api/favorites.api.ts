import { handler } from "@/shared/api/http.ts";
import { productStore } from "@/entities/product/model/product.store.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { favoriteStore } from "@/entities/favorite/model/favorite.store.ts";
import { cartStore } from "@/entities/cart/model/cart.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { userData } = userStore();
const { cart } = cartStore();
const { products } = productStore();
const { favorite } = favoriteStore();
const { openNotify } = useBaseModals();

export const favoritesApi = () => {
    const getFavoriteProducts = async () => {
        try{
            const res = await handler(`/favorites/${userData.id}`, {
                method: 'GET',
            })
            console.log(res)
            favorite.value = res;
        }catch(err){
            console.error(`Failed to get the favorite products:`, err);
        }
    };

    const toggleToFavorite = async (id: string, type: string, productId: string) => {
        try{
            const sourceList = type === 'cart' ? cart?.value : products?.value;
            const currentProduct = sourceList?.find(item => item?.id === id);

            const currentId = type === 'cart' ? currentProduct?.productId : currentProduct?.id
            if (!currentId) {
                console.warn("Product ID not found for core operation");
                return;
            }

            const favoriteItem = favorite.value?.find(
                item => item?.productId === currentId);

            if(!favoriteItem?.status){
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
                        quantity: currentProduct?.quantity,
                        status: currentProduct?.status
                    })
                });
                await getFavoriteProducts();

                await openNotify('You have successfully added the item to your favorite.',
                    'You will now be redirected to the "Favorite" page.');
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
        getFavoriteProducts,

        toggleToFavorite,

        deleteFavoriteProduct,
    }
}