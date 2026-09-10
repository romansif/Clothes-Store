import { favoriteStore } from "@/features/use-favorite/model/favorite.store.ts";

const { favorite } = favoriteStore();

export const useFavorite = () => {
    const isFavorite = (id: string, userId: string) => {
        return favorite?.value?.some(f => f?.productId === id && f?.userId === userId);
    };

    return {
        isFavorite,
    };
}