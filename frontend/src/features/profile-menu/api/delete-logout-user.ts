import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify.ts";

const { openNotify } = useBaseModals();

export const useDeleteAccount = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");

    const {
        mutateAsync: deleteAccount,
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

            await openNotify(
                "You have successfully delete account",
                "You will now be taken to sign in page",
            );
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
        mutateAsync: logout,
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
