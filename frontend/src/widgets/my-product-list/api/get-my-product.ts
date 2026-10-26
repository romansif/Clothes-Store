import { handler } from "@/shared/api/http";

export const getMyProducts = async (userId: string) => {
    return await handler(`/my/products/${userId}`, {
        method: 'GET',
    });
};