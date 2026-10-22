import { computed } from "vue";
import { favoriteStore } from "@/entities/favorite/model/favorite-store";

const { favorite } = favoriteStore();

export const useFavorite = () => {
    const favoritesCount = computed(() => {
        return favorite.value.length;
    });

    return {
        favoritesCount
    };
}