import type { FavoriteItem } from "@/entities/favorite-item";
import { handler } from "@/shared/api/http";

export const getFavoriteProducts = async (userId: string) => {
    return await handler<FavoriteItem[]>(`/favorites/${userId}`, {
        method: "GET",
    });
};
