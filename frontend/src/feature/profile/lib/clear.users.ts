import { userForms } from "@/feature/profile/model/user.form.ts";
import { userFormsErrors } from "@/feature/profile/lib/users.error.ts";

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

    const clearUpdateUserFormCompanyName = () => {
        updateUserForm.value.companyName = '';
        updateUserFormMessage.value.companyNameMessage = '';
        updateUserFormErrors.value.companyNameError = false;
    }

    const clearUpdateUserFormPublicPhone = () => {
        updateUserForm.value.publicPhone = '';
        updateUserFormMessage.value.publicPhoneMessage = '';
        updateUserFormErrors.value.publicPhoneError = false;
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
        updateUserForm.value.companyName = '';
        updateUserForm.value.publicPhone = '';

        updateUserFormMessage.value.nameMessage = '';
        updateUserFormMessage.value.phoneMessage = '';
        updateUserFormMessage.value.emailMessage = '';
        updateUserFormMessage.value.surNameMessage = '';
        updateUserFormMessage.value.newPasswordMessage = '';
        updateUserFormMessage.value.oldPasswordMessage = '';
        updateUserFormMessage.value.companyNameMessage = '';
        updateUserFormMessage.value.publicPhoneMessage = '';

        updateUserFormErrors.value.nameError = false;
        updateUserFormErrors.value.phoneError = false;
        updateUserFormErrors.value.emailError = false;
        updateUserFormErrors.value.surNameError = false;
        updateUserFormErrors.value.oldPasswordError = false;
        updateUserFormErrors.value.newPasswordError = false;
        updateUserFormErrors.value.companyNameError = false;
        updateUserFormErrors.value.publicPhoneError = false;
    }

    return{
        clearUpdateUserFormName,
        clearUpdateUserFormSurName,
        clearUpdateUserFormPhone,
        clearUpdateUserFormCompanyName,
        clearUpdateUserFormPublicPhone,
        clearUpdateUserFormEmail,
        clearUpdateUserFormPassword,
        clearUpdateUserForm
    }
}