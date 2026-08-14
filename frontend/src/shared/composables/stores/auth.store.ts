import { ref } from "vue";

interface AuthPassword {
    password: boolean
}
const showPassword = ref<AuthPassword>({
    password: false,
})

interface SignInSection {
    section: boolean
}

interface SignUpSection {
    section: boolean
}

const showSignInSection = ref<SignInSection>({
    section: false,
})

const showSignUpSection = ref<SignUpSection>({
    section: false,
})

export const authStore = () => {
    return {
        showPassword,
        showSignInSection,
        showSignUpSection,
    }
}