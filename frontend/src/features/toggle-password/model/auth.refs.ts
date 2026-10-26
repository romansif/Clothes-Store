import { ref } from "vue";
import type { AuthPassword } from "@/entities/auth-password";

export const showPassword = ref<AuthPassword>({
    password: false,
});
