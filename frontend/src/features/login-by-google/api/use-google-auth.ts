import { useMutation } from "@tanstack/vue-query";

import router from "@/app/router";
import { clearLoginForm, clearLoginFormMessages } from "@/features/login-auth/lib/clear-login-form";
import { loginForm } from "@/entities/login-form/model/login-form";
import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/widgets/notification/lib/use-notify";
import {useRoute} from "vue-router";

const { openNotify } = useBaseModals();

export const signGoogleAuth = () => {
    const route = useRoute()

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

            await openNotify({variant: "OAuth", state: "success"});
            await router.push((route.query.redirect as string) || "/")
        },

        onError: async (err) => {
            await openNotify({variant: "OAuth", state: "error"});

            throw new Error(`Ошибка входа google`, err);
        },
    });

    return {
        OAuth,
        isPending,
        isError,
    };
};
