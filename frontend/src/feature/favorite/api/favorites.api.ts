import { handler } from "@/shared/api/http.ts";
import { productStore } from "@/feature/products/model/product.store.ts";
import { cartApi } from "@/feature/cart/api/cart.api.ts";
import { useBaseModals } from "@/shared/lib/base.modals.ts";
import { productsApi } from "@/feature/products/api/products.api.ts";

const { getCartProducts } = cartApi();
const { openNotify } = useBaseModals();
const { favorite, cart, products } = productStore();
const { getFilteredProducts, updateFavorite } = productsApi();

export const favoritesApi = () => {
    const getFavoriteProducts = async () => {
        const userId = localStorage.getItem("userId")
        try{
            const res = await handler(`/favorites/${userId}`, {
                method: 'GET',
            })
            console.log(res)
            favorite.value = res;
        }catch(err){
            console.error(`Failed to get the favorite products:`, err);
        }
    };

    const toggleToFavorite = async (id: string, type: string, productId: string) => {
        const userId = localStorage.getItem("userId");
        try{
            const sourceList = type === 'cart' ? cart.value : products.value;
            const currentProduct = sourceList?.find(item => item.id === id);
            const currentId = type === 'cart' ? currentProduct?.productId : currentProduct?.id

            const status = !currentProduct?.favorite

            await updateFavorite(id, productId, status);

            if(currentProduct && status){
                await handler(`/favorites`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
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
                        status: currentProduct?.status,
                        favorite: true,
                    })
                });
                await getFavoriteProducts();
                await getFilteredProducts('ALL', 'ALL')

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

            await handler(`/products/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favorite: false,
                })
            })
            await getFilteredProducts('ALL', 'ALL');

            await handler(`/cart/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favorite: false,
                })
            });
            await getCartProducts();
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