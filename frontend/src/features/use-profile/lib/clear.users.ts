import { userForms } from "@/features/use-profile/model/user.form.ts";
import { userFormsErrors } from "@/features/use-profile/lib/users.error.ts";

const { updateUserFormErrors } = userFormsErrors();
const { updateUserForm, updateUserFormMessage } = userForms();

export const clearUsersForms = () => {
    const clearUpdateUserFormName = () => {
        updateUserForm.value.name = '';
        updateUserFormMessage.value.nameMessage = '';
        updateUserFormErrors.value.nameError = false;
    }

    const clearUpdateUserFormSurName = () => {
        updateUserForm.value.surName = '';
        updateUserFormMessage.value.surNameMessage = '';
        updateUserFormErrors.value.surNameError = false;
    }

    const clearUpdateUserFormPhone = () => {
        updateUserForm.value.phone = '';
        updateUserFormMessage.value.phoneMessage = '';
        updateUserFormErrors.value.phoneError = false;
    }


    const clearUpdateUserFormEmail = () => {
        updateUserForm.value.email = '';
        updateUserFormMessage.value.emailMessage = '';
        updateUserFormErrors.value.emailError = false;
    }

    const clearUpdateUserFormPassword = () => {
        updateUserForm.value.oldPassword = '';
        updateUserFormMessage.value.oldPasswordMessage = '';
        updateUserFormErrors.value.oldPasswordError = false;

        updateUserForm.value.newPassword = '';
        updateUserFormMessage.value.newPasswordMessage = '';
        updateUserFormErrors.value.newPasswordError = false;
    }

    const clearUpdateUserForm = () => {
        updateUserForm.value.name = '';
        updateUserForm.value.phone = '';
        updateUserForm.value.email = '';
        updateUserForm.value.surName = '';
        updateUserForm.value.newPassword = '';
        updateUserForm.value.oldPassword = '';

        updateUserFormMessage.value.nameMessage = '';
        updateUserFormMessage.value.phoneMessage = '';
        updateUserFormMessage.value.emailMessage = '';
        updateUserFormMessage.value.surNameMessage = '';
        updateUserFormMessage.value.newPasswordMessage = '';
        updateUserFormMessage.value.oldPasswordMessage = '';

        updateUserFormErrors.value.nameError = false;
        updateUserFormErrors.value.phoneError = false;
        updateUserFormErrors.value.emailError = false;
        updateUserFormErrors.value.surNameError = false;
        updateUserFormErrors.value.oldPasswordError = false;
        updateUserFormErrors.value.newPasswordError = false;
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