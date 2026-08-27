import { ref } from 'vue'
import { type UserForm, type UserFormMessage } from "@/entities/profile/model/user.types.form.ts";

const updateUserForm = ref<UserForm>({
    name: '',
    surName: '',
    phone: '',
    email: '',
    oldPassword: '',
    newPassword: '',
})

const updateUserFormMessage = ref<UserFormMessage>({
    nameMessage: '',
    surNameMessage: '',
    phoneMessage: '',
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