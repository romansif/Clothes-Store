import { authForms } from "@/shared/composables/forms/auth.forms.ts";
import { authFormsErrors } from "@/shared/composables/errors/errors-messages/auth.errors.ts";

const { registerFormErrors, loginFormErrors } = authFormsErrors();
const { registerBuyerForm, registerSellerForm, loginForm, registerFormMessages, loginFormMessages } = authForms();

export const clearAuthForms = () => {
    const clearRegisterBuyerForm = () => {
        registerBuyerForm.value.name = '';
        registerBuyerForm.value.surName = '';
        registerBuyerForm.value.privatePhone = '';
        registerBuyerForm.value.email = '';
        registerBuyerForm.value.password = '';

        registerFormMessages.value.nameMessage = '';
        registerFormMessages.value.surNameMessage = '';
        registerFormMessages.value.privatePhoneMessage = '';
        registerFormMessages.value.emailMessage = '';
        registerFormMessages.value.passwordMessage = '';

        registerFormErrors.value.nameError = false;
        registerFormErrors.value.surNameError = false;
        registerFormErrors.value.privatePhoneError = false;
        registerFormErrors.value.emailError = false;
        registerFormErrors.value.passwordError = false;
    };

    const clearRegisterSellerForm = () => {
        registerSellerForm.value.name = '';
        registerSellerForm.value.surName = '';
        registerSellerForm.value.companyName = '';
        registerSellerForm.value.publicPhone = '';
        registerSellerForm.value.email = '';
        registerSellerForm.value.password = '';

        registerFormMessages.value.nameMessage = '';
        registerFormMessages.value.surNameMessage = '';
        registerFormMessages.value.companyNameMessage = '';
        registerFormMessages.value.publicPhoneMessage = '';
        registerFormMessages.value.emailMessage = '';
        registerFormMessages.value.passwordMessage = '';

        registerFormErrors.value.nameError = false;
        registerFormErrors.value.surNameError = false;
        registerFormErrors.value.companyNameError = false;
        registerFormErrors.value.publicPhoneError = false;
        registerFormErrors.value.emailError = false;
        registerFormErrors.value.passwordError = false;
    }

    const clearRegisterFormMessages = () => {
        registerFormMessages.value.nameMessage = '';
        registerFormMessages.value.surNameMessage = '';
        registerFormMessages.value.emailMessage = '';
        registerFormMessages.value.passwordMessage = '';
    }

    const clearLoginForm = () => {
        loginForm.value.email = '';
        loginForm.value.password = '';

        loginFormMessages.value.emailMessage = '';
        loginFormMessages.value.passwordMessage = '';

        loginFormErrors.value.emailError = false;
        loginFormErrors.value.passwordError = false;
    }

    const clearLoginFormMessages = () => {
        loginFormMessages.value.emailMessage = '';
        loginFormMessages.value.passwordMessage = '';
    }

    return{
        clearRegisterBuyerForm,
        clearRegisterSellerForm,
        clearRegisterFormMessages,
        clearLoginForm,
        clearLoginFormMessages
    }
}