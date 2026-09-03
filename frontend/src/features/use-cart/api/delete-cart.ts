import { handler } from "@/shared/api/http.ts";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";

const { getCartProducts } = useGetCart();

export const useDeleteCart = () => {
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

    return {
        deleteProductCart,
    }
}