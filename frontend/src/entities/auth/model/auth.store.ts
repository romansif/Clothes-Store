import { ref } from "vue";
import {type AuthPassword, type Role, type SignSection} from "@/entities/auth/model/auth.types.ts";

const showPassword = ref<AuthPassword>({
    password: false,
});

const showSignSection = ref<SignSection>({
    signIn: false,
});

const isRole = ref<boolean>(false);
const currentRole = ref<Role>('Buyer');

export const authStore = () => {
    return {
        showPassword,
        showSignSection,
        currentRole,
        isRole
    }
}