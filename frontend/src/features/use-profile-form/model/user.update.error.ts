import {ref} from "vue";
import { type UserFormErrors} from "@/features/use-profile-form/model/user.update.types.form.ts";

export const updateUserFormErrors = ref<UserFormErrors>({
    name: false,
    surName: false,
    phone: false,
    email: false,
    oldPassword: false,
    newPassword: false,
})
