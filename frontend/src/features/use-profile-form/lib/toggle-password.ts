import {ref} from "vue";

const showOldPassword = ref(false)
const showNewPassword = ref(false)

export const useTogglePassword = () => {
    const toggleOldPassword = () => {
        showOldPassword.value = !showOldPassword.value
    }

    const toggleNewPassword = () => {
        showNewPassword.value = !showNewPassword.value
    }

    return {
        showOldPassword,
        showNewPassword,

        toggleOldPassword,
        toggleNewPassword,
    }
}