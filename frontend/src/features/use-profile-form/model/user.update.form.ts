import { ref } from "vue";
import type {
    UserForm,
    UserFormErrorMessages,
    UserFormErrors
} from "@/features/use-profile-form/model/user.update.types.form.ts";

export const updateUserForm = ref<UserForm>({
    name: '',
    surName: '',
    phone: '',
    email: '',
    oldPassword: '',
    newPassword: '',
});

export const updateUserFormErrorMessages = ref<UserFormErrorMessages>({
    name: '',
    surName: '',
    phone: '',
    email: '',
    oldPassword: '',
    newPassword: '',
});

export const updateUserFormErrors = ref<UserFormErrors>({
    name: false,
    surName: false,
    phone: false,
    email: false,
    oldPassword: false,
    newPassword: false,
})
