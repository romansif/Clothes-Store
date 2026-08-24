import { ref } from 'vue'
import { type RegisterFormErrors, type LoginFormErrors} from "@/entities/auth/auth.types.form.ts";

const registerFormErrors = ref<RegisterFormErrors>({
    nameError: false,
    surNameError: false,
    privatePhoneError: false,
    companyNameError: false,
    publicPhoneError: false,
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