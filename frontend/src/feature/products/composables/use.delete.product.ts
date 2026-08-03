import { handler } from "@/shared//api/http.ts";
import { useGetProducts } from "./get.products.ts";

const { getFilteredProducts, getCartProducts, getFavoriteProducts, getOrders } = useGetProducts();

export const useDeleteProduct = () => {
    const deleteProduct = async (id: string) => {
        try{
            await handler(`/products/${id}`, {
                method: "DELETE",
            });
            await getFilteredProducts('ALL', 'ALL');
            window.location.reload();
        }catch(err){
            console.error(`Failed to delete the product:`, err);
        }
    };

    const deleteProductCart = async (id: string) => {
        try{
            await handler(`/cart/${id}`, {
                method: "DELETE",
            });
            await getCartProducts();
        }catch(err){
            console.error(`Failed to delete the cart product:`, err);
        }
    };

    const deleteFavoriteProduct = async (id: string) => {
        try{
            await handler(`/favorites/${id}`, {
                method: "DELETE",
            });
            await getFavoriteProducts();

            await handler(`/cart/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favorite: false,
                })
            });
            await getCartProducts();

            await handler(`/products/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    favorite: false,
                })
            })
            await getFilteredProducts('ALL', 'ALL');
        }catch(err){
            console.error(`Failed to delete the favorite product:`, err);
        }
    };

    const deleteOrderProducts = async (id: string) => {
        try{
            await handler(`/order/${id}`, {
                method: "DELETE",
            });
            await getOrders();
        }catch(err){
            console.error(`Failed to delete the order:`, err);
        }
    };

    return{
        deleteProduct,
        deleteProductCart,
        deleteFavoriteProduct,
        deleteOrderProducts,
    }
}