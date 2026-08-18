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

interface LoginFormErrors {
    emailError: boolean,
    passwordError: boolean,
    phoneError?: boolean,
    validCodeError?: boolean,
    roleError: boolean,
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