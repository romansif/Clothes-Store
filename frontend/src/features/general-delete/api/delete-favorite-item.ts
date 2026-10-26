import { handler } from "@/shared/api/http";
import { getFavoriteProducts } from "@/shared/api/get-favorite";

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