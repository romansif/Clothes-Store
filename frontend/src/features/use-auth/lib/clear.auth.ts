import { authForms } from "@/features/use-auth/model/auth.forms.ts";
import { authFormsErrors } from "@/features/use-auth/lib/auth.errors.ts";

const { registerFormErrors, loginFormErrors } = authFormsErrors();
const { registerForm, loginForm, registerFormMessages, loginFormMessages } = authForms();

export const clearAuthForms = () => {
    const clearRegisterForm = () => {
        registerForm.value.name = '';
        registerForm.value.surName = '';
        registerForm.value.phone = '';
        registerForm.value.email = '';
        registerForm.value.password = '';

        registerFormMessages.value.nameMessage = '';
        registerFormMessages.value.surNameMessage = '';

        registerFormMessages.value.emailMessage = '';
        registerFormMessages.value.passwordMessage = '';

        registerFormErrors.value.nameError = false;
        registerFormErrors.value.surNameError = false;
        registerFormErrors.value.phoneError = false;
        registerFormErrors.value.emailError = false;
        registerFormErrors.value.passwordError = false;

    };

    const clearRegisterFormMessages = () => {
        registerFormMessages.value.nameMessage = '';
        registerFormMessages.value.surNameMessage = '';
        registerFormMessages.value.emailMessage = '';
        registerFormMessages.value.passwordMessage = '';
    }

    const clearLoginForm = () => {
        loginForm.value.email = '';
        loginForm.value.password = '';
        loginForm.value.phone = '';
        loginForm.value.role = '';

        loginFormMessages.value.emailMessage = '';
        loginFormMessages.value.passwordMessage = '';
        loginFormMessages.value.phoneMessage = '';
        loginFormMessages.value.roleMessage = '';

        loginFormErrors.value.emailError = false;
        loginFormErrors.value.passwordError = false;
        loginFormErrors.value.phoneError = false;
        loginFormErrors.value.roleError = false;
    }

    const clearLoginFormMessages = () => {
        loginFormMessages.value.emailMessage = '';
        loginFormMessages.value.passwordMessage = '';
        loginFormMessages.value.phoneMessage = '';
        loginFormMessages.value.roleMessage = '';
    }

    return{
        clearRegisterForm,
        clearRegisterFormMessages,
        clearLoginForm,
        clearLoginFormMessages
    }
}