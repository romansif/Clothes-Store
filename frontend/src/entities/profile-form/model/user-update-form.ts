import { ref } from "vue";
import type {
    UserForm,
    UserFormErrorMessages,
} from "@/entities/profile-form/model/user-update-form.types.ts";

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


