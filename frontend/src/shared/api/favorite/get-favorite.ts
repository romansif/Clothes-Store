import { handler } from "@/shared/api";
import type { FavoriteItem } from "@/shared/model";

export const getFavoriteProducts = async (userId: string) => {
  return await handler<FavoriteItem[]>(`/favorites/${userId}`, {
    method: "GET",
  });
};
