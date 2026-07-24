import { ref } from "vue";

interface AuthPassword {
    password: boolean
}
const showPassword = ref<AuthPassword>({
    password: false,
})

interface AuthSection {
    section: boolean
}

const showSection = ref<AuthSection>({
    section: false,
})

export const authStore = () => {
    return {
        showPassword,
        showSection,
    }
}