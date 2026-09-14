import { ref } from "vue";
import type { UserForm, UserFormMessage } from "@/features/use-profile-form/model/user.update.types.form.ts";

export const updateUserForm = ref<UserForm>({
    name: '',
    surName: '',
    phone: '',
    email: '',
    oldPassword: '',
    newPassword: '',
})

export const updateUserFormMessage = ref<UserFormMessage>({
    nameMessage: '',
    surNameMessage: '',
    phoneMessage: '',
    emailMessage: '',
    oldPasswordMessage: '',
    newPasswordMessage: '',
})