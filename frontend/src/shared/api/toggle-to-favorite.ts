import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { userStore } from "@/shared/model/user.store";
import { getFavoriteProducts } from "@/shared/api/get-favorite";
import { previewHelper } from "@/entities/product-card/lib/preview-helper";
import { favoriteStore } from "@/entities/favorite/model/favorite-store";
import type { Product } from "@/shared";

const { userData } = userStore();
const { favorite } = favoriteStore();
const { openNotify } = useBaseModals();
const { isFavorite, getProductId } = previewHelper();

export const toggleToFavorite = async (product: Product) => {
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

export const deleteFavoriteProduct = async (id: string | undefined) => {
    try{
        await handler(`/favorites/${id}`, {
            method: "DELETE",
        });
        await getFavoriteProducts();
    }catch(err){
        console.error(`Failed to delete the favorite product:`, err);
    }
};

