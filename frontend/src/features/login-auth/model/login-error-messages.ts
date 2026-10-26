import { computed } from "vue";
import { loginFormErrorMessages } from "@/entities/login-form/model/login-from";

export const useLoginErrorMessage = computed(() => {
    return loginFormErrorMessages.value.email || loginFormErrorMessages.value.password
})
