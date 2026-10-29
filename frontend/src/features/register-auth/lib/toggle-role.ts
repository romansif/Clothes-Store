import { clearRegisterForm } from "@/features/register-auth/lib/clear-register-form";
import { currentRole, isRole } from "@/features/register-auth/model/register-auth.refs";

export const toggleSignUp = () => {
    currentRole.value = currentRole.value === "Buyer" ? "Seller" : "Buyer";
    isRole.value = !isRole.value;

    clearRegisterForm();
};
