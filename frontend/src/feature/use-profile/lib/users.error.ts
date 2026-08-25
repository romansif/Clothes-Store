import { ref } from 'vue'
import { type UserFormErrors } from "@/entities/profile/model/user.types.form.ts";

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