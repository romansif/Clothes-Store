import { clearLoginForm } from "@/features/login-auth/lib/clear-login-form";
import { showSignSection } from "@/features/login-auth/model/login-auth.refs";

export const toggleSignIn = () => {
    showSignSection.value.signIn = !showSignSection.value.signIn;

    clearLoginForm();
};
