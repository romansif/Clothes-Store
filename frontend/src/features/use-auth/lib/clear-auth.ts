import {
    loginForm, registerForm,
    loginFormErrorMessages, registerFormErrorMessages
} from "@/features/use-auth/model/auth.forms.ts";

export const clearAuthForms = () => {
    const clearRegisterForm = () => {
        registerForm.value.name = '';
        registerForm.value.surName = '';
        registerForm.value.phone = '';
        registerForm.value.email = '';
        registerForm.value.password = '';

        registerFormErrorMessages.value.name = '';
        registerFormErrorMessages.value.surName = '';
        registerFormErrorMessages.value.email = '';
        registerFormErrorMessages.value.password = '';
    };

    const clearRegisterFormMessages = () => {
        registerFormErrorMessages.value.name = '';
        registerFormErrorMessages.value.surName = '';
        registerFormErrorMessages.value.email = '';
        registerFormErrorMessages.value.password = '';
    }

    const clearLoginForm = () => {
        loginForm.value.email = '';
        loginForm.value.password = '';
        loginForm.value.phone = '';
        loginForm.value.role = '';

        loginFormErrorMessages.value.email= '';
        loginFormErrorMessages.value.password= '';
        loginFormErrorMessages.value.phone= '';
        loginFormErrorMessages.value.role= '';
    }

    const clearLoginFormMessages = () => {
        loginFormErrorMessages.value.email= '';
        loginFormErrorMessages.value.password= '';
        loginFormErrorMessages.value.phone= '';
        loginFormErrorMessages.value.role= '';
    }

    return{
        clearRegisterForm,
        clearRegisterFormMessages,
        clearLoginForm,
        clearLoginFormMessages
    }
}