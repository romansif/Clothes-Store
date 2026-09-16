import { ref } from "vue";
import type {
    UserForm,
    UserFormErrorMessages,
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


