import { computed } from "vue";
import { loginFormErrorMessages } from "@/entities/auth/model/auth-form.ts";

export const useLoginErrorMessage = computed(() => {
    return loginFormErrorMessages.value.email || loginFormErrorMessages.value.password
})
