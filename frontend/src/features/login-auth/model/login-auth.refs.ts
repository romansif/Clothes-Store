import { ref } from "vue";
import type { SignSection } from "@/entities/login-form";

export const showSignSection = ref<SignSection>({
    signIn: false,
});
