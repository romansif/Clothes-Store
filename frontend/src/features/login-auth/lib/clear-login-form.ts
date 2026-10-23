import { loginForm, loginFormErrorMessages } from "@/entities/auth/model/auth-form";

export const clearLoginForm = () => {
    loginForm.value.email = '';
    loginForm.value.password = '';
    loginForm.value.phone = '';
    loginForm.value.role = '';

    loginFormErrorMessages.value.email= '';
    loginFormErrorMessages.value.password= '';
    loginFormErrorMessages.value.phone= '';
    loginFormErrorMessages.value.role= '';
}

export const clearLoginFormMessages = () => {
    loginFormErrorMessages.value.email= '';
    loginFormErrorMessages.value.password= '';
    loginFormErrorMessages.value.phone= '';
    loginFormErrorMessages.value.role= '';
}