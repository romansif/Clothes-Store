import { ref } from "vue";

interface AuthPassword {
    password: boolean
}

interface SignSection {
    signIn: boolean,
    signUp: boolean,
}


const showPassword = ref<AuthPassword>({
    password: false,
})

const showSignSection = ref<SignSection>({
    signIn: false,
    signUp: false
})

export const authStore = () => {
    return {
        showPassword,
        showSignSection
    }
}