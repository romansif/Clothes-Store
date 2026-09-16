import { computed } from "vue";
import { loginFormErrorMessages } from "@/features/use-auth/model/auth.forms.ts";

export const useLoginErrorMessage = computed(() => {
    if (loginFormErrorMessages.value.email) {
        return loginFormErrorMessages.value.email
    }
    if (loginFormErrorMessages.value.password) {
        return loginFormErrorMessages.value.password
    }
    return ''
})
