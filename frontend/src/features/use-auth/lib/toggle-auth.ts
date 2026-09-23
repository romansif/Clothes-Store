import { authStore } from "@/features/use-auth/model/auth.store.ts";
import { clearAuthForms } from "@/features/use-auth/lib/clear-auth.ts";
import { registerForm } from "@/entities/auth/model/auth.forms.ts";

const { showPassword, showSignSection, currentRole, isRole } = authStore();
const { clearRegisterForm, clearLoginForm } = clearAuthForms();

export const toggleAuth = () => {
    const togglePassword = () => {
        showPassword.value.password = !showPassword.value.password;
    };

    const toggleSignIn = () => {
        showSignSection.value.signIn = !showSignSection.value.signIn;

        clearLoginForm();
    };

    const toggleSignUp = () => {
        currentRole.value = currentRole.value ===  'Buyer' ? 'Seller' : 'Buyer';
        isRole.value = !isRole.value

        clearRegisterForm();
    };

    const changeCountry = () => {
        registerForm.value.phone = '';
    }

    return {
        togglePassword,
        toggleSignUp,
        toggleSignIn,
        changeCountry
    }
}