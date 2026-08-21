import {ref} from "vue";
import { type FavoriteItem } from "@/feature/favorite/model/favorite.types.ts";

const favorite = ref<FavoriteItem[]>([]);

const favoriteItem = ref<FavoriteItem>({} as FavoriteItem);

export const favoriteStore = () => {

    return {
        favorite,
        favoriteItem,
    }
}