import { ref } from 'vue'
import { type UserFormErrors } from "@/feature/profile/model/users.types.ts";

const updateUserFormErrors = ref<UserFormErrors>({
    nameError: false,
    surNameError: false,
    phoneError: false,
    companyNameError: false,
    publicPhoneError: false,
    emailError: false,
    oldPasswordError: false,
    newPasswordError: false,
})

export const userFormsErrors = () => {
    return {
        updateUserFormErrors,
    }
}