import { showPassword } from "@/features/toggle-password/model/auth.refs";

export const togglePassword = () => {
  showPassword.value.password = !showPassword.value.password;
};
