import {computed} from "vue";
import {loginFormErrors} from "@/features/use-auth/model/auth.errors.ts";
import {loginFormErrorMessages} from "@/features/use-auth/model/auth.forms.ts";

export const useLoginErrorMessage = computed(() => {
    if (loginFormErrors.value.email) {
        return loginFormErrorMessages.value.email
    }
    if (loginFormErrors.value.password) {
        return loginFormErrorMessages.value.password
    }
    return ''
})

export const useLoginError = computed(() => {
    if (loginFormErrors.value.email) {
        return loginFormErrors.value.email
    }if (loginFormErrors.value.password) {
        return loginFormErrors.value.password
    }

    return false
})