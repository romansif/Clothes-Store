import { ref } from "vue";

import type { AuthPassword } from "@/features/toggle-password";

export const showPassword = ref<AuthPassword>({
  password: false,
});
