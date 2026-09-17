import {ref} from "vue";
import { type FavoriteItem } from "@/features/use-favorite/model/favorite.types.ts";

const favorite = ref<FavoriteItem[]>([]);

const favoriteItem = ref<FavoriteItem | null>(null);

export const favoriteStore = () => {
    return {
        favorite,
        favoriteItem,
    }
}