import { authForms } from "../auth.forms.ts";
import { authFormsErrors } from "../forms-errors/auth.errors.ts";

const { registerForm, loginForm } = authForms()
const { registerFormErrors, loginFormErrors } = authFormsErrors()

export const clearUsersForms = () => {
    const clearRegisterForm = () => {
        registerForm.value.name = ''
        registerForm.value.email = ''
        registerForm.value.password = ''

        registerFormErrors.value.nameError = false
        registerFormErrors.value.emailError = false
        registerFormErrors.value.passwordError = false
    }

    const clearLoginForm = () => {
        loginForm.value.email = ''
        loginForm.value.password = ''

        loginFormErrors.value.emailError = false
        loginFormErrors.value.passwordError = false
    }

    return{
        clearRegisterForm,
        clearLoginForm
    }
}