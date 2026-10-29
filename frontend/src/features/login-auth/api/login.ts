import router from "@/app/router";
import { handler } from "@/shared/api/http";
import { useMutation } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify";
import { clearLoginForm, clearLoginFormMessages } from "@/features/login-auth/lib/clear-login-form";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import { loginSchema } from "@/entities/login-form/model/login.schemas";
import { loginForm, loginFormErrorMessages } from "@/entities/login-form/model/login-form";

const { openNotify } = useBaseModals();

export const signIn = () => {
    const { mutateAsync: login, isPending, isError } = useMutation({mutationKey: ['login'],
        mutationFn: async () => {
            clearLoginFormMessages();

            const result = loginSchema.safeParse(loginForm.value)
            if(!result.success){
                applyZodErrors(result.error, loginFormErrorMessages)

                throw new Error('Ошибка валидации авторизации')
            }

            return await handler('/auth/signIn', {
                method: "POST",
                body: JSON.stringify({
                    email: loginForm.value.email,
                    password: loginForm.value.password,
                    role: loginForm.value.role,
                })
            })
        },

        onSuccess: async (data) => {
            clearLoginForm()

            localStorage.setItem("userId", data.id);

            await openNotify('You have successfully sign in',
                'You will now be taken to your profile page');
            await router.push({name: 'profile'})
        },

        onError: (err) => {
            applyErrors(err, loginFormErrorMessages)

            console.log(`Ошибка входа`, err);
        }
    })

    return {
        login,
        isPending,
        isError
    }
};