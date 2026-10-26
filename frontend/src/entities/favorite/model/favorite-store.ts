import { ref } from "vue";
import { type FavoriteItem } from "@/entities/favorite";

const favorite = ref<FavoriteItem[]>([]);

const favoriteItem = ref<FavoriteItem | null>(null);

export const favoriteStore = () => {
    return {
        favorite,
        favoriteItem,
    }
}