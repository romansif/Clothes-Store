import { handler } from "@/shared/api/http.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { favoriteStore } from "@/features/use-favorite/model/favorite.store.ts";

const { userData } = userStore();
const { favorite } = favoriteStore();

export const useGetFavorite = () => {
    const getFavoriteProducts = async () => {
        try{
            const res = await handler(`/favorites/${userData.id}`, {
                method: 'GET',
            })
            favorite.value = res;
        }catch(err){
            console.error(`Failed to get the favorite products:`, err);
        }
    };

    return {
        getFavoriteProducts,
    }
}