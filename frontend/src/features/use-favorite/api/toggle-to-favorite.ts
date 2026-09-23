import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { previewHelper } from "@/entities/product-card/lib/preview-helper.ts";
import { favoriteStore } from "@/entities/favorite/model/favorite.store.ts";
import type {Product} from "@/shared/model/product.types.ts";

const { userData } = userStore();
const { favorite } = favoriteStore();
const { openNotify } = useBaseModals();
const { getFavoriteProducts } = useGetFavorite();
const { isFavorite, getProductId } = previewHelper();

export const useToggleFavorite = () => {
    const toggleToFavorite = async (product: Product) => {
        const user = userData.value
        if(!user) return;

        try{
            const productId = getProductId(product);

            if(!productId){
                console.warn('Product ID not found');
                return;
            }

            if(!isFavorite(product, user)){
                await handler('/favorites', {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: user.id,
                        productId,
                        images: product.images,
                        title: product.title,
                        category: product.category,
                        material: product.material,
                        price: product.price,
                        description: product.description,
                        color: product.colors,
                        size: product.sizes,
                        gender: product.gender,
                        variants: product.variants,
                    }),
                });

                await getFavoriteProducts();

                await openNotify('You have successfully added the item to your favorite',
                    'You will now be redirected to the "Favorite" page');
            }else{

                const favoriteItem = favorite.value.find(
                    item => item.productId === productId &&
                        item.userId === user.id
                );
                await deleteFavoriteProduct(favoriteItem?.id);
            }
        }catch(err){
            console.error('Failed to toggle favorite:', err);
        }
    };

    const deleteFavoriteProduct = async (id: string | undefined) => {
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