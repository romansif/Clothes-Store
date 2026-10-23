import { ref } from "vue";
import type { AuthPassword } from "@/entities/auth";

export const showPassword = ref<AuthPassword>({
    password: false,
});
