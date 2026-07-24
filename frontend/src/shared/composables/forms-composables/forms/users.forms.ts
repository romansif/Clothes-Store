import { ref } from 'vue'

interface UserFormName {
    name: string,
}
const updateUserName = ref<UserFormName>({
    name: '',
})

interface UserFormNameMessage {
    nameMessage: string,
}
const updateUserFormNameMessage = ref<UserFormNameMessage>({
    nameMessage: '',
})

interface UserFormSurName {
    surName: string,
}
const updateUserSurName = ref<UserFormSurName>({
    surName: '',
})

interface UserFormSurNameMessage {
    surNameMessage: string,
}
const updateUserFormSurNameMessage = ref<UserFormSurNameMessage>({
    surNameMessage: '',
})

interface UserFormPhone {
    phone: string,
}
const updateUserPhone = ref<UserFormPhone>({
    phone: '',
})

interface UserFormCompanyName {
    companyName: string,
}
const updateUserCompanyName = ref<UserFormCompanyName>({
    companyName: '',
})

interface UserFormCompanyNameMessage {
    companyNameMessage: string,
}
const updateUserFormCompanyNameMessage = ref<UserFormCompanyNameMessage>({
    companyNameMessage: '',
})

interface UserFormPublicPhone {
    publicPhone: string,
}
const updateUserFormPublicPhone = ref<UserFormPublicPhone>({
    publicPhone: '',
})

interface UserFormPublicPhoneMessage {
    publicPhoneMessage: string,
}
const updateUserFormPublicPhoneMessage = ref<UserFormPublicPhoneMessage>({
    publicPhoneMessage: '',
})

interface UserFormEmail {
    email: string,
}
const updateUserEmail = ref<UserFormEmail>({
    email: '',
})

interface UserFormPhoneMessage {
    phoneMessage: string,
}
const updateUserFormPhoneMessage = ref<UserFormPhoneMessage>({
    phoneMessage: '',
})

interface UserFormEmailMessage {
    emailMessage: string,
}
const updateUserFormEmailMessage = ref<UserFormEmailMessage>({
    emailMessage: '',
})

interface UserFormPassword {
    oldPassword: string,
    newPassword: string,
}
const updateUserPassword = ref<UserFormPassword>({
    oldPassword: '',
    newPassword: '',
})

interface UserFormPasswordMessage {
    oldPasswordMessage: string,
    newPasswordMessage: string,
}
const updateUserFormPasswordMessages = ref<UserFormPasswordMessage>({
    oldPasswordMessage: '',
    newPasswordMessage: '',
})

export const userForms = () => {
    return {
        updateUserName,
        updateUserFormNameMessage,
        updateUserSurName,
        updateUserFormSurNameMessage,
        updateUserCompanyName,
        updateUserFormCompanyNameMessage,
        updateUserFormPublicPhone,
        updateUserFormPublicPhoneMessage,
        updateUserPhone,
        updateUserFormPhoneMessage,
        updateUserEmail,
        updateUserFormEmailMessage,
        updateUserPassword,
        updateUserFormPasswordMessages
    }
}