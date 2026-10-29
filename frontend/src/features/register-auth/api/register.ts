import router from "@/app/router";
import { handler } from "@/shared/api/http";
import { useMutation } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import {
    clearRegisterForm,
    clearRegisterFormMessages,
} from "@/features/register-auth/lib/clear-register-form";
import { registerSchema } from "@/entities/register-form/model/register.schemas";
import {
    registerForm,
    registerFormErrorMessages,
} from "@/entities/register-form/model/register-from";

const { openNotify } = useBaseModals();

export const signUp = () => {
    const {
        mutateAsync: register,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["register"],
        mutationFn: async (role: string) => {
            clearRegisterFormMessages();

            const result = registerSchema.safeParse(registerForm.value);
            if (!result.success) {
                applyZodErrors(result.error, registerFormErrorMessages);
                throw new Error("Ошибка валидации регистрации");
            }

            const date = new Date();

            return await handler("/auth/signUp", {
                method: "POST",
                body: JSON.stringify({
                    role: role,
                    name: registerForm.value.name,
                    surName: registerForm.value.surName,
                    phone: registerForm.value.phone,
                    email: registerForm.value.email,
                    password: registerForm.value.password,
                    created_at: date,
                }),
            });
        },

        onSuccess: async (data) => {
            clearRegisterForm();

            localStorage.setItem("userId", data.id);

            await openNotify(
                "You have successfully sign up",
                "You will now be taken to your profile page",
            );
            await router.push({ name: "profile" });
        },

        onError: (err) => {
            applyErrors(err, registerFormErrorMessages);

            throw new Error(`Ошибка при регистрации`, err);
        },
    });

    return {
        register,
        isPending,
        isError,
    };
};
