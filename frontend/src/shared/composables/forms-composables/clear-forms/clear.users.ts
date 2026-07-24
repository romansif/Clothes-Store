import { userForms } from "../users.forms.ts";
import { userFormsErrors } from "../forms-errors/users.errors.ts";

const {
    updateUserName, updateUserFormNameMessage,
    updateUserEmail, updateUserFormEmailMessage,
    updateUserPhone, updateUserFormPhoneMessage,
    updateUserSurName, updateUserFormSurNameMessage,
    updateUserPassword, updateUserFormPasswordMessages,
    updateUserCompanyName, updateUserFormCompanyNameMessage,
    updateUserFormPublicPhone, updateUserFormPublicPhoneMessage
} = userForms();

const {
    updateUserPasswordErrors,
    updateUserNameErrors, updateUserSurNameErrors,
    updateUserPhoneErrors, updateUserFormCompanyNameErrors,
    updateUserFormPublicPhoneErrors, updateUserEmailErrors
} = userFormsErrors();

export const clearUsersForms = () => {
    const clearUpdateUserFormName = () => {
        updateUserName.value.name = ''
        updateUserFormNameMessage.value.nameMessage = ''
        updateUserNameErrors.value.nameError = false
    }

    const clearUpdateUserFormSurName = () => {
        updateUserSurName.value.surName = ''
        updateUserFormSurNameMessage.value.surNameMessage = ''
        updateUserSurNameErrors.value.surNameError = false
    }

    const clearUpdateUserFormPhone = () => {
        updateUserPhone.value.phone = ''
        updateUserFormPhoneMessage.value.phoneMessage = ''
        updateUserPhoneErrors.value.phoneError = false
    }

    const clearUpdateUserFormCompanyName = () => {
        updateUserCompanyName.value.companyName = ''
        updateUserFormCompanyNameMessage.value.companyNameMessage = ''
        updateUserFormCompanyNameErrors.value.companyNameError = false
    }

    const clearUpdateUserFormPublicPhone = () => {
        updateUserFormPublicPhone.value.publicPhone = ''
        updateUserFormPublicPhoneMessage.value.publicPhoneMessage = ''
        updateUserFormPublicPhoneErrors.value.publicPhoneError = false
    }

    const clearUpdateUserFormEmail = () => {
        updateUserEmail.value.email = ''
        updateUserFormEmailMessage.value.emailMessage = ''
        updateUserEmailErrors.value.emailError = false
    }

    const clearUpdateUserFormPassword = () => {
        updateUserPassword.value.oldPassword = ''
        updateUserFormPasswordMessages.value.oldPasswordMessage = ''
        updateUserPasswordErrors.value.oldPasswordError = false

        updateUserPassword.value.newPassword = ''
        updateUserFormPasswordMessages.value.newPasswordMessage = ''
        updateUserPasswordErrors.value.newPasswordError = false
    }

    const clearUpdateUserForm = () => {
        updateUserName.value.name = ''
        updateUserSurName.value.surName = ''
        updateUserPhone.value.phone = ''
        updateUserEmail.value.email = ''
        updateUserPassword.value.oldPassword = ''
        updateUserPassword.value.newPassword = ''

        updateUserFormNameMessage.value.nameMessage = ''
        updateUserFormSurNameMessage.value.surNameMessage = ''
        updateUserFormPhoneMessage.value.phoneMessage = ''
        updateUserFormEmailMessage.value.emailMessage = ''
        updateUserFormPasswordMessages.value.oldPasswordMessage = ''
        updateUserFormPasswordMessages.value.newPasswordMessage = ''

        updateUserNameErrors.value.nameError = false
        updateUserSurNameErrors.value.surNameError = false
        updateUserPhoneErrors.value.phoneError = false
        updateUserEmailErrors.value.emailError = false
        updateUserPasswordErrors.value.oldPasswordError = false
        updateUserPasswordErrors.value.newPasswordError = false
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