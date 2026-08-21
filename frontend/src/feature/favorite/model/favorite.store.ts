import {ref} from "vue";
import { type FavoriteItem } from "@/feature/favorite/model/favorite.types.ts";

export const favoriteStore = () => {
    const favorite = ref<FavoriteItem[]>;

    return {
        favorite,
    }
}