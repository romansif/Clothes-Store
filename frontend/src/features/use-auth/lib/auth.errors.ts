import { ref } from 'vue'
import { type RegisterFormErrors, type LoginFormErrors} from "@/features/use-auth/model/auth.types.form.ts";

const registerFormErrors = ref<RegisterFormErrors>({
    nameError: false,
    surNameError: false,
    phoneError: false,
    emailError: false,
    passwordError: false
})

const loginFormErrors = ref<LoginFormErrors>({
    emailError: false,
    passwordError: false,
    phoneError: false,
    validCodeError: false,
    roleError: false,
})

export const authFormsErrors = () => {
    return{
        registerFormErrors,
        loginFormErrors
    }
}