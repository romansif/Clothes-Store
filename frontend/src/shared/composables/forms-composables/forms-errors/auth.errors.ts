import { ref } from 'vue'

interface RegisterFormErrors {
    nameError: boolean,
    surNameError: boolean,
    privatePhoneError: boolean,
    companyNameError: boolean,
    publicPhoneError: boolean,
    emailError: boolean,
    passwordError: boolean
}
const registerFormErrors = ref<RegisterFormErrors>({
    nameError: false,
    surNameError: false,
    privatePhoneError: false,
    companyNameError: false,
    publicPhoneError: false,
    emailError: false,
    passwordError: false
})

interface LoginFormErrors {
    emailError: boolean,
    passwordError: boolean
}
const loginFormErrors = ref<LoginFormErrors>({
    emailError: false,
    passwordError: false
})

export const authFormsErrors = () => {
    return{
        registerFormErrors,
        loginFormErrors
    }
}