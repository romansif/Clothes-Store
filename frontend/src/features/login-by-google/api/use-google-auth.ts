import router from "@/app/router";
import { handler } from "@/shared/api/http";
import { useMutation } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify";
import { loginForm } from "@/entities/login-form/model/login-from";

const { openNotify } = useBaseModals();

export const signGoogleAuth = () => {
    const { mutateAsync: OAuth, isPending, isError } = useMutation({mutationKey: ['OAuth'],
        mutationFn: async (response: any) => {
            const date = new Date();

            return await handler('/auth/google', {
                method: "POST",
                body: JSON.stringify({
                    role: loginForm.value.role || 'Buyer',
                    credential: response.credential,
                    created_at: date,
                })
            });
        },

        onSuccess: async (data) => {
            localStorage.setItem("userId", data.id);

            await openNotify('You have successfully sign in',
                'You will now be taken to your profile page');
            await router.push({name: 'profile'})
        },

        onError: async (err) => {
            await openNotify('You were unable to login with google', '')

            console.log(`Ошибка входа google`, err);
        }
    })

    return {
        OAuth,
        isPending,
        isError
    }
};