import { ref } from 'vue'

interface UserFormErrors {
    nameError: boolean,
    surNameError: boolean,
    phoneError: boolean,
    companyNameError: boolean,
    publicPhoneError: boolean,
    emailError: boolean,
    oldPasswordError: boolean,
    newPasswordError: boolean,
}


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