import { ref } from 'vue'
import { type UserForm, type UserFormMessage } from "@/feature/profile/model/users.types.ts";

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