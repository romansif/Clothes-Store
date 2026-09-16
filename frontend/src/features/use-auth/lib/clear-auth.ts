import {
    loginForm, registerForm,
    loginFormErrors, registerFormErrors,
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

        registerFormErrors.value.name = false;
        registerFormErrors.value.surName = false;
        registerFormErrors.value.phone = false;
        registerFormErrors.value.email = false;
        registerFormErrors.value.password = false;

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

        loginFormErrors.value.email = false;
        loginFormErrors.value.password = false;
        loginFormErrors.value.phone = false;
        loginFormErrors.value.role = false;
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