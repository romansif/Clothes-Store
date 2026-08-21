import { ref } from "vue";
import { type AuthPassword, type SignSection } from "@/feature/auth/model/auth.types.ts";

const showPassword = ref<AuthPassword>({
    password: false,
});

const showSignSection = ref<SignSection>({
    signIn: false,
    signUp: false
});

export const authStore = () => {
    return {
        showPassword,
        showSignSection
    }
}