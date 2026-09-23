import { favoriteStore } from "@/entities/favorite/model/favorite.store.ts";
import type {Product} from "@/shared/model/product.types.ts";
import type {User} from "@/entities/profile/model/user.types.ts";

const { favorite } = favoriteStore();

export const previewHelper = () => {
    const getProductId = (product: Product): string => {
        return product.productId ?? product.id ?? '';
    };

    const productPreview = (id: string, array: Product[]) => {
        if(!id){
            console.log('Id не найден')
            return
        }

        const product = array?.find((p: Product) => p.id === id)
        if(product && product.images && product.images[0]){
            return `${import.meta.env.VITE_BASE_URL}/${product.images[0]}`
        }

        return undefined
    };

    const isOutOfStack = (product: Product) => {
        return product.variants.every(v => v.count === 0)
    };

    const isFavorite = (product: Product, user: User | null) => {
        if(!user) return;

        const productId = getProductId(product);

        return favorite.value?.some(
            item =>
                item.productId === productId &&
                item.userId === user.id
        ) ?? false;
    };

    return {
        getProductId,
        productPreview,
        isOutOfStack,
        isFavorite,
    }
}