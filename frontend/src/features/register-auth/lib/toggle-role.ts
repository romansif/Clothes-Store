import { clearRegisterForm } from "@/features/register-auth";
import { currentRole, isRole } from "@/features/register-auth";

export const toggleSignUp = () => {
  currentRole.value = currentRole.value === "Buyer" ? "Seller" : "Buyer";
  isRole.value = !isRole.value;

  clearRegisterForm();
};
