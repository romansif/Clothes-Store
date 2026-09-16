import {
    updateUserForm, updateUserFormErrorMessages, updateUserFormErrors
} from "@/features/use-profile-form/model/user.update.form";

export const clearUsersForms = () => {
    const clearUpdateUserFormName = () => {
        updateUserForm.value.name = '';
        updateUserFormErrorMessages.value.name = '';
        updateUserFormErrors.value.name = false;
    }

    const clearUpdateUserFormSurName = () => {
        updateUserForm.value.surName = '';
        updateUserFormErrorMessages.value.surName = '';
        updateUserFormErrors.value.surName = false;
    }

    const clearUpdateUserFormPhone = () => {
        updateUserForm.value.phone = '';
        updateUserFormErrorMessages.value.phone = '';
        updateUserFormErrors.value.phone = false;
    }


    const clearUpdateUserFormEmail = () => {
        updateUserForm.value.email = '';
        updateUserFormErrorMessages.value.email = '';
        updateUserFormErrors.value.email = false;
    }

    const clearUpdateUserFormPassword = () => {
        updateUserForm.value.oldPassword = '';
        updateUserFormErrorMessages.value.oldPassword = '';
        updateUserFormErrors.value.oldPassword = false;

        updateUserForm.value.newPassword = '';
        updateUserFormErrorMessages.value.newPassword = '';
        updateUserFormErrors.value.newPassword = false;
    }

    const clearUpdateUserForm = () => {
        updateUserForm.value.name = '';
        updateUserForm.value.phone = '';
        updateUserForm.value.email = '';
        updateUserForm.value.surName = '';
        updateUserForm.value.newPassword = '';
        updateUserForm.value.oldPassword = '';

        updateUserFormErrorMessages.value.name = '';
        updateUserFormErrorMessages.value.phone = '';
        updateUserFormErrorMessages.value.email = '';
        updateUserFormErrorMessages.value.surName = '';
        updateUserFormErrorMessages.value.newPassword = '';
        updateUserFormErrorMessages.value.oldPassword = '';

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