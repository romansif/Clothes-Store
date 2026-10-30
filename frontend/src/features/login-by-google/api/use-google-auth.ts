import { useMutation } from "@tanstack/vue-query";

import router from "@/app/router";
import { clearLoginForm, clearLoginFormMessages } from "@/features/login-auth/lib/clear-login-form";
import { loginForm } from "@/entities/login-form/model/login-form";
import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";

const { openNotify } = useBaseModals();

export const signGoogleAuth = () => {
    const {
        mutateAsync: OAuth,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["OAuth"],
        mutationFn: async (response: any) => {
            clearLoginFormMessages();

            const date = new Date();

            return await handler("/auth/google", {
                method: "POST",
                body: JSON.stringify({
                    role: loginForm.value.role || "Buyer",
                    credential: response.credential,
                    created_at: date,
                }),
            });
        },

        onSuccess: async (data) => {
            clearLoginForm();

            localStorage.setItem("userId", data.id);

            await openNotify(
                "You have successfully sign in",
                "You will now be taken to your profile page",
            );
            await router.push({ name: "profile" });
        },

        onError: async (err) => {
            await openNotify("You were unable to login with google", "");

            throw new Error(`Ошибка входа google`, err);
        },
    });

    return {
        OAuth,
        isPending,
        isError,
    };
};
