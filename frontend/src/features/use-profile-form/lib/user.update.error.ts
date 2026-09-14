import {ref} from "vue";
import { type UserFormErrors} from "@/features/use-profile-form/model/user.update.types.form.ts";

export const updateUserFormErrors = ref<UserFormErrors>({
    nameError: false,
    surNameError: false,
    phoneError: false,
    emailError: false,
    oldPasswordError: false,
    newPasswordError: false,
})
