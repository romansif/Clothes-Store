import { handler } from "@/shared/api/http";
import type { User } from "@/entities/profile";

export const useGetUser = () => {
    const getUsers = async () => {
        return await handler<User[]>("/users", {
            method: "GET",
        });
    };

    const getUser = async (userId: string) => {
        return await handler<User>(`/users/${userId}`, {
            method: "GET",
        });
    };

    return {
        getUsers,
        getUser,
    };
};
