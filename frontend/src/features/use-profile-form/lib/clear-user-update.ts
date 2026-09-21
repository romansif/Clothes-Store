import { updateUserForm, updateUserFormErrorMessages }from "@/entities/profile-form/model/user.update.form";

export const clearUsersForms = () => {
    const clearUpdateUserFormName = () => {
        updateUserForm.value.name = '';
        updateUserFormErrorMessages.value.name = '';
    }

    const clearUpdateUserFormSurName = () => {
        updateUserForm.value.surName = '';
        updateUserFormErrorMessages.value.surName = '';
    }

    const clearUpdateUserFormPhone = () => {
        updateUserForm.value.phone = '';
        updateUserFormErrorMessages.value.phone = '';
    }


    const clearUpdateUserFormEmail = () => {
        updateUserForm.value.email = '';
        updateUserFormErrorMessages.value.email = '';
    }

    const clearUpdateUserFormPassword = () => {
        updateUserForm.value.oldPassword = '';
        updateUserFormErrorMessages.value.oldPassword = '';

        updateUserForm.value.newPassword = '';
        updateUserFormErrorMessages.value.newPassword = '';
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