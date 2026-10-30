import type { Product } from "@/shared";

import type { FavoriteItem } from "@/entities/favorite-item";

export const previewHelper = () => {
    const getProductId = (product: Product): string => {
        return product.productId ?? product.id ?? "";
    };

    const productPreview = (id: string, array: Product[] | undefined) => {
        if (!id) {
            throw new Error("Id не найден");
        }

        const product = array?.find((p: Product) => p.id === id);
        if (product && product.images && product.images[0]) {
            return `${import.meta.env.VITE_SERVER_URL}/${product.images[0]}`;
        }

        return undefined;
    };

    const isOutOfStack = (product: Product) => {
        return product.variants.every((v) => v.count === 0);
    };

    const isFavorite = (favorite: FavoriteItem[], product: Product, userId: string) => {
        const productId = getProductId(product);

        if (!favorite) return;

        return (
            favorite.some((item) => item.productId === productId && item.userId === userId) ?? false
        );
    };

    return {
        getProductId,
        productPreview,
        isOutOfStack,
        isFavorite,
    };
};
