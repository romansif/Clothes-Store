import { showPassword } from "@/features/toggle-password/model/auth.refs";

export const togglePassword = () => {
    const togglePassword = () => {
        showPassword.value.password = !showPassword.value.password;
    };

    return {
        togglePassword,
    }
}