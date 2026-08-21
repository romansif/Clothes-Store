import { favoriteStore } from "@/feature/favorite/model/favorite.store.ts";

const { favorite } = favoriteStore()
export const useFavorite = () => {
    const isFavorite = (id: string) => {
        return favorite.value.some(f => f.productId === id)
    };

    return {
        isFavorite,
    }
}