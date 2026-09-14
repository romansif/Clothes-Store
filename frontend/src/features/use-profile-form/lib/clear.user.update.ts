import { updateUserForm, updateUserFormMessage } from "@/features/use-profile-form/model/user.update.form";
import { updateUserFormErrors } from "@/features/use-profile-form/model/user.update.error.ts";

export const clearUsersForms = () => {
    const clearUpdateUserFormName = () => {
        updateUserForm.value.name = '';
        updateUserFormMessage.value.name = '';
        updateUserFormErrors.value.name = false;
    }

    const clearUpdateUserFormSurName = () => {
        updateUserForm.value.surName = '';
        updateUserFormMessage.value.surName = '';
        updateUserFormErrors.value.surName = false;
    }

    const clearUpdateUserFormPhone = () => {
        updateUserForm.value.phone = '';
        updateUserFormMessage.value.phone = '';
        updateUserFormErrors.value.phone = false;
    }


    const clearUpdateUserFormEmail = () => {
        updateUserForm.value.email = '';
        updateUserFormMessage.value.email = '';
        updateUserFormErrors.value.email = false;
    }

    const clearUpdateUserFormPassword = () => {
        updateUserForm.value.oldPassword = '';
        updateUserFormMessage.value.oldPassword = '';
        updateUserFormErrors.value.oldPassword = false;

        updateUserForm.value.newPassword = '';
        updateUserFormMessage.value.newPassword = '';
        updateUserFormErrors.value.newPassword = false;
    }

    const clearUpdateUserForm = () => {
        updateUserForm.value.name = '';
        updateUserForm.value.phone = '';
        updateUserForm.value.email = '';
        updateUserForm.value.surName = '';
        updateUserForm.value.newPassword = '';
        updateUserForm.value.oldPassword = '';

        updateUserFormMessage.value.name = '';
        updateUserFormMessage.value.phone = '';
        updateUserFormMessage.value.email = '';
        updateUserFormMessage.value.surName = '';
        updateUserFormMessage.value.newPassword = '';
        updateUserFormMessage.value.oldPassword = '';

        updateUserFormErrors.value.name = false;
        updateUserFormErrors.value.phone = false;
        updateUserFormErrors.value.email = false;
        updateUserFormErrors.value.surName = false;
        updateUserFormErrors.value.oldPassword = false;
        updateUserFormErrors.value.newPassword = false;
    }

    return{
        clearUpdateUserFormName,
        clearUpdateUserFormSurName,
        clearUpdateUserFormPhone,
        clearUpdateUserFormEmail,
        clearUpdateUserFormPassword,
        clearUpdateUserForm
    }
}