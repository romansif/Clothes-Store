import { useRoute } from "vue-router";
import { useMutation } from "@tanstack/vue-query";

import router from "@/app/router";
import { useBaseModals } from "@/shared/ui/notification/use-notify";
import { clearLoginForm, clearLoginFormMessages } from "@/features/login-auth/lib/clear-login-form";
import { loginForm } from "@/entities/login-form/model/login-form";
import { handler } from "@/shared/api";

const { openNotify } = useBaseModals();

export const signGoogleAuth = () => {
  const route = useRoute();

  const {
    mutate: OAuth,
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

      await openNotify({ variant: "OAuth", state: "success" });
      await router.push((route.query.redirect as string) || "/");
    },

    onError: async () => {
      await openNotify({ variant: "OAuth", state: "error" });
    },
  });

  return {
    OAuth,
    isPending,
    isError,
  };
};
