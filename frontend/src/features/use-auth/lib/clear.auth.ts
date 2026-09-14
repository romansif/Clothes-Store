import { loginForm, registerForm, loginFormErrorMessages, registerFormErrorMessages } from "@/features/use-auth/model/auth.forms.ts";
import { loginFormErrors, registerFormErrors } from "@/features/use-auth/lib/auth.errors.ts";

export const clearAuthForms = () => {
    const clearRegisterForm = () => {
        registerForm.value.name = '';
        registerForm.value.surName = '';
        registerForm.value.phone = '';
        registerForm.value.email = '';
        registerForm.value.password = '';

        registerFormErrorMessages.value.nameMessage = '';
        registerFormErrorMessages.value.surNameMessage = '';
        registerFormErrorMessages.value.emailMessage = '';
        registerFormErrorMessages.value.passwordMessage = '';

        registerFormErrors.value.nameError = false;
        registerFormErrors.value.surNameError = false;
        registerFormErrors.value.phoneError = false;
        registerFormErrors.value.emailError = false;
        registerFormErrors.value.passwordError = false;

    };

    const clearRegisterFormMessages = () => {
        registerFormErrorMessages.value.nameMessage = '';
        registerFormErrorMessages.value.surNameMessage = '';
        registerFormErrorMessages.value.emailMessage = '';
        registerFormErrorMessages.value.passwordMessage = '';
    }

    const clearLoginForm = () => {
        loginForm.value.email = '';
        loginForm.value.password = '';
        loginForm.value.phone = '';
        loginForm.value.role = '';

        loginFormErrorMessages.value.emailMessage = '';
        loginFormErrorMessages.value.passwordMessage = '';
        loginFormErrorMessages.value.phoneMessage = '';
        loginFormErrorMessages.value.roleMessage = '';

        loginFormErrors.value.emailError = false;
        loginFormErrors.value.passwordError = false;
        loginFormErrors.value.phoneError = false;
        loginFormErrors.value.roleError = false;
    }

    const clearLoginFormMessages = () => {
        loginFormErrorMessages.value.emailMessage = '';
        loginFormErrorMessages.value.passwordMessage = '';
        loginFormErrorMessages.value.phoneMessage = '';
        loginFormErrorMessages.value.roleMessage = '';
    }

    return{
        clearRegisterForm,
        clearRegisterFormMessages,
        clearLoginForm,
        clearLoginFormMessages
    }
}