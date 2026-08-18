import { ref } from 'vue'

interface UserForm {
    name: string,
    surName: string,
    phone: string,
    companyName: string,
    publicPhone: string,
    email: string,
    oldPassword: string,
    newPassword: string,
}

interface UserFormMessage {
    nameMessage: string,
    surNameMessage: string,
    phoneMessage: string,
    companyNameMessage: string,
    publicPhoneMessage: string,
    emailMessage: string,
    oldPasswordMessage: string,
    newPasswordMessage: string,
}


const updateUserForm = ref<UserForm>({
    name: '',
    surName: '',
    phone: '',
    companyName: '',
    publicPhone: '',
    email: '',
    oldPassword: '',
    newPassword: '',
})

const updateUserFormMessage = ref<UserFormMessage>({
    nameMessage: '',
    surNameMessage: '',
    phoneMessage: '',
    companyNameMessage: '',
    publicPhoneMessage: '',
    emailMessage: '',
    oldPasswordMessage: '',
    newPasswordMessage: '',
})

export const userForms = () => {
    return {
        updateUserForm,
        updateUserFormMessage,
    }
}