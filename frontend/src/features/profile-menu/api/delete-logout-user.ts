import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useMutation } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify.ts";

const { openNotify } = useBaseModals();

export const useDeleteAccount = () => {
    const userId = localStorage.getItem("userId");

    const { mutateAsync: deleteAccount, isPending, isError } = useMutation({mutationKey: ['deleteAccount'],
        mutationFn: async () => {
            return await handler(`/users/${userId}`, {
                method: "DELETE",
            });
        },

        onSuccess: async () => {
            await openNotify('You have successfully delete account',
                'You will now be taken to sign in page');
            await router.push({name: 'signIn'})
        },

        onError: (err) => {
            console.error(`Ошибка при удалении аккаунта`, err);
        }
    })

    return {
        deleteAccount,
        isPending,
        isError
    }
};

export const useLogout = () => {
    const { mutateAsync: logout, isPending, isError } = useMutation({mutationKey: ['logout'],
        mutationFn: async () => {
            return await handler('/auth/logout', {
                method: "POST",
            })
        },

        onSuccess: async () => {
            localStorage.clear();

            await router.push({name: 'signIn'})
        },

        onError: (err) => {
            console.log(`Ошибка при выходе`, err);
        }
    })

    return {
        logout,
        isPending,
        isError
    }
};