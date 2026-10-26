import { handler } from "@/shared/api/http";
import { userStore } from "@/shared/model/user.store";
import { favoriteStore } from "@/entities/favorite/model/favorite-store";
import { useBaseModals } from "@/shared/lib/use-notify";

const { userData } = userStore();
const { loading } = useBaseModals();
const { favorite } = favoriteStore();

export const getFavoriteProducts = async () => {
    loading.value = true;

    try{
        if(!userData.value) return

        favorite.value = await handler(`/favorites/${userData.value.id}`, {
            method: 'GET',
        });
    }catch(err){
        console.error(`Failed to get the favorite products:`, err);
    }finally {
        loading.value = false;
    }
};