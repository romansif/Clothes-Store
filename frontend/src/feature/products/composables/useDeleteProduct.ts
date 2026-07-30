import { handler } from "@/shared//api/http.ts";
import { useGetProducts } from "./getProducts.ts";

const { getFilteredProducts, getCartProducts, getFavoriteProducts } = useGetProducts();

export const useDeleteProduct = () => {
    const deleteProduct = async (id: string) => {
        try{
            await handler(`/products/${id}`, {
                method: "DELETE",
            });

            await getFilteredProducts('ALL', 'ALL');
        }catch(err){
            console.log('Не удалось удалить товар', err);
        }
    };

    const deleteProductCart = async (id: string) => {
        try{
            await handler(`/cart/${id}`, {
                method: "DELETE",
            });

            await getCartProducts();
        }catch(err){
            console.log('Не удалось удалить товар', err);
        }
    };

    const deleteFavoriteProduct = async (id: string) => {
        try{
            await handler(`/favorites/${id}`, {
                method: "DELETE",
            });

            await handler(`/cart/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favorite: false,
                })
            });

            await handler(`/products/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favorite: false,
                })
            })

            await getCartProducts();
            await getFavoriteProducts();
        }catch(err){
            console.log('Не удалось удалить товар', err);
        }
    };

    const deleteOrderProducts = async (id: string) => {
        try{
            await handler(`/order/${id}`, {
                method: "DELETE",
            });
        }catch(err){
            console.log('Не удалось удалить товары из заказа', err);
        }
    };

    return{
        deleteProduct,
        deleteProductCart,
        deleteFavoriteProduct,
        deleteOrderProducts,
    }
}