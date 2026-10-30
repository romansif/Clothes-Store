import { ref } from "vue";

import type { UserForm, UserFormErrorMessages } from "@/entities/profile-form";

export const updateUserForm = ref<UserForm>({
    name: "",
    surName: "",
    phone: "",
    email: "",
    oldPassword: "",
    newPassword: "",
});

export const updateUserFormErrorMessages = ref<UserFormErrorMessages>({
    name: "",
    surName: "",
    phone: "",
    email: "",
    oldPassword: "",
    newPassword: "",
});
