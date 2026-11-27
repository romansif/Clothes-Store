import type { FavoriteItem } from "@/shared/model";
import { handler } from "@/shared/api";

export const getFavoriteProducts = async (userId: string) => {
  return await handler<FavoriteItem[]>(`/favorites/${userId}`, {
    method: "GET",
  });
};
