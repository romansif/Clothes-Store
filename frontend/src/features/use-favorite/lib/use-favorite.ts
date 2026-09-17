import { computed } from "vue";
import { favoriteStore } from "@/features/use-favorite/model/favorite.store.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import type {Product} from "@/features/use-product/model/product.types.ts";

const { userData } = userStore();
const { favorite } = favoriteStore();

export const useFavorite = () => {
    const getProductId = (product: Product) => {
        return product.productId ?? product.id;
    };

    const isFavorite = (product: Product) => {
        const user = userData.value
        if(!user) return;

        const productId = getProductId(product);

        return favorite.value?.some(
            item =>
                item.productId === productId &&
                item.userId === user.id
        ) ?? false;
    };

    const favoritesCount = computed(() => {
        return favorite.value.length;
    });

    return {
        getProductId,
        isFavorite,

        favoritesCount
    };
}