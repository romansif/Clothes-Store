import { useMutation } from "@tanstack/vue-query";

import router from "@/app/router";
import { useBaseModals } from "@/shared/ui/notification";
import { clearRegisterForm, clearRegisterFormMessages } from "@/features/register-auth";
import { registerForm, registerFormErrorMessages } from "@/features/register-auth";
import { registerSchema } from "@/features/register-auth";
import { handler } from "@/shared/api";
import { applyErrors, applyZodErrors } from "@/shared/lib";

const { openNotify } = useBaseModals();

export const signUp = () => {
  const {
    mutate: register,
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

      await openNotify({ variant: 'register', state: 'success' });
      await router.push({ name: "profile" });
    },

    onError: async (err) => {
      applyErrors(err, registerFormErrorMessages);

      await openNotify({ variant: 'register', state: 'error' });
    },
  });

  return {
    register,
    isPending,
    isError,
  };
};
