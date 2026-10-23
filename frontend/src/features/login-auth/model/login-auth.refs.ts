import { ref } from "vue";
import type { SignSection } from "@/entities/auth";

export const showSignSection = ref<SignSection>({
    signIn: false,
});
