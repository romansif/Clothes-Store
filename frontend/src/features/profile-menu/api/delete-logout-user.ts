import { useMutation, useQueryClient } from "@tanstack/vue-query";

import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/widgets/notification/lib/use-notify.ts";

const { openNotify } = useBaseModals();

export const useDeleteAccount = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");

    const {
        mutate: deleteAccount,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["deleteAccount"],
        mutationFn: async () => {
            return await handler(`/users/${userId}`, {
                method: "DELETE",
            });
        },

        onSuccess: async () => {
            queryClient.clear();

            await openNotify({variant: "delete-user", state: "success"});
            await router.push({ name: "signIn" });
        },

        onError: (err) => {
            throw new Error(`Ошибка при удалении аккаунта`, err);
        },
    });

    return {
        deleteAccount,
        isPending,
        isError,
    };
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    const {
        mutate: logout,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            return await handler("/auth/logout", {
                method: "POST",
            });
        },

        onSuccess: async () => {
            localStorage.clear();

            queryClient.clear();

            await openNotify({variant: "logout", state: "success"});
            await router.push({ name: "signIn" });
        },

        onError: (err) => {
            throw new Error(`Ошибка при выходе`, err);
        },
    });

    return {
        logout,
        isPending,
        isError,
    };
};
