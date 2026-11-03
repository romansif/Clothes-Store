import { useRoute } from "vue-router";
import { useMutation } from "@tanstack/vue-query";

import router from "@/app/router";
import { useBaseModals } from "@/widgets/notification/lib/use-notify";
import { clearLoginForm, clearLoginFormMessages } from "@/features/login-auth/lib/clear-login-form";
import { loginForm, loginFormErrorMessages } from "@/entities/login-form/model/login-form";
import { loginSchema } from "@/entities/login-form/model/login.schemas";
import { handler } from "@/shared/api/http";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";

const { openNotify } = useBaseModals();

export const signIn = () => {
  const route = useRoute();

  const {
    mutateAsync: login,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      clearLoginFormMessages();

      const result = loginSchema.safeParse(loginForm.value);
      if (!result.success) {
        applyZodErrors(result.error, loginFormErrorMessages);

        throw new Error("Ошибка валидации авторизации");
      }

      return await handler("/auth/signIn", {
        method: "POST",
        body: JSON.stringify({
          email: loginForm.value.email,
          password: loginForm.value.password,
          role: loginForm.value.role,
        }),
      });
    },

    onSuccess: async (data) => {
      clearLoginForm();

      localStorage.setItem("userId", data.id);

      await openNotify({ variant: "login", state: "success" });
      await router.push((route.query.redirect as string) || "/");
    },

    onError: async (err) => {
      applyErrors(err, loginFormErrorMessages);
      await openNotify({ variant: "login", state: "error" });

      throw new Error(`Ошибка входа`, err);
    },
  });

  return {
    login,
    isPending,
    isError,
  };
};
