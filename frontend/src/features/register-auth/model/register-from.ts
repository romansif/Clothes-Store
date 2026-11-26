import { ref } from "vue";

import type { RegisterFormModel, RegisterFormErrorMessage } from "@/features/register-auth";

export const registerForm = ref<RegisterFormModel>({
  name: "",
  surName: "",
  phone: "",
  email: "",
  password: "",
});

export const registerFormErrorMessages = ref<RegisterFormErrorMessage>({
  name: "",
  surName: "",
  phone: "",
  email: "",
  password: "",
});
