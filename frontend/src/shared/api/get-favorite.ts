import { handler } from "@/shared/api/http";
import type { FavoriteItem } from "@/entities/favroite-item";

export const getFavoriteProducts = async (userId: string) => {
    return await handler<FavoriteItem[]>(`/favorites/${userId}`, {
        method: 'GET',
    });
};