import { handler } from "@/shared/api/http";
import { favoriteStore } from "@/entities/favorite/model/favorite-store";
import { useBaseModals } from "@/shared/lib/use-notify";

const { loading } = useBaseModals();
const { favorite } = favoriteStore();

export const getFavoriteProducts = async () => {
    loading.value = true;

    const userId = localStorage.getItem("userId");

    try{
        if(!userId) return

        favorite.value = await handler(`/favorites/${userId}`, {
            method: 'GET',
        });

        return favorite.value
    }catch(err){
        console.error(`Failed to get the favorite products:`, err);
    }finally {
        loading.value = false;
    }
};