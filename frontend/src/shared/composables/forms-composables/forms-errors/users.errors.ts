import { ref } from 'vue'

interface UserFormNameErrors {
    nameError: boolean,
}
const updateUserNameErrors = ref<UserFormNameErrors>({
    nameError: false,
})

interface UserFormSurNameErrors {
    surNameError: boolean,
}
const updateUserSurNameErrors = ref<UserFormSurNameErrors>({
    surNameError: false,
})

interface UserFormPhoneErrors {
    phoneError: boolean,
}
const updateUserPhoneErrors = ref<UserFormPhoneErrors>({
    phoneError: false,
})

interface UserFormCompanyNameErrors {
    companyNameError: boolean,
}
const updateUserFormCompanyNameErrors = ref<UserFormCompanyNameErrors>({
    companyNameError: false,
})

interface UserFormPublicPhoneErrors {
    publicPhoneError: boolean,
}
const updateUserFormPublicPhoneErrors = ref<UserFormPublicPhoneErrors>({
    publicPhoneError: false,
})

interface UserFormEmailErrors {
    emailError: boolean,
}
const updateUserEmailErrors = ref<UserFormEmailErrors>({
    emailError: false,
})

interface UserFormPasswordErrors {
    oldPasswordError: boolean,
    newPasswordError: boolean,
}
const updateUserPasswordErrors = ref<UserFormPasswordErrors>({
    oldPasswordError: false,
    newPasswordError: false,
})


export const userFormsErrors = () => {
    return {
        updateUserNameErrors,
        updateUserSurNameErrors,
        updateUserPhoneErrors,
        updateUserFormCompanyNameErrors,
        updateUserFormPublicPhoneErrors,
        updateUserEmailErrors,
        updateUserPasswordErrors,
    }
}