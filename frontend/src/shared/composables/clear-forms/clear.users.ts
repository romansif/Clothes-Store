import { userForms } from "@/shared/composables/forms/users.forms.ts";
import { userFormsErrors } from "@/shared/composables/errors/errors-messages/users.errors.ts";

const {
    updateUserName, updateUserFormNameMessage,
    updateUserEmail, updateUserFormEmailMessage,
    updateUserPhone, updateUserFormPhoneMessage,
    updateUserSurName, updateUserFormSurNameMessage,
    updateUserPassword, updateUserFormPasswordMessages,
    updateUserCompanyName, updateUserFormCompanyNameMessage,
    updateUserPublicPhone, updateUserFormPublicPhoneMessage
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
        updateUserPublicPhone.value.publicPhone = ''
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
        updateUserPhone.value.phone = ''
        updateUserEmail.value.email = ''
        updateUserSurName.value.surName = ''
        updateUserPassword.value.newPassword = ''
        updateUserPassword.value.oldPassword = ''
        updateUserCompanyName.value.companyName = ''
        updateUserPublicPhone.value.publicPhone = ''

        updateUserFormNameMessage.value.nameMessage = ''
        updateUserFormPhoneMessage.value.phoneMessage = ''
        updateUserFormEmailMessage.value.emailMessage = ''
        updateUserFormSurNameMessage.value.surNameMessage = ''
        updateUserFormPasswordMessages.value.newPasswordMessage = ''
        updateUserFormPasswordMessages.value.oldPasswordMessage = ''
        updateUserFormCompanyNameMessage.value.companyNameMessage = ''
        updateUserFormPublicPhoneMessage.value.publicPhoneMessage = ''

        updateUserNameErrors.value.nameError = false
        updateUserPhoneErrors.value.phoneError = false
        updateUserEmailErrors.value.emailError = false
        updateUserSurNameErrors.value.surNameError = false
        updateUserPasswordErrors.value.oldPasswordError = false
        updateUserPasswordErrors.value.newPasswordError = false
        updateUserFormCompanyNameErrors.value.companyNameError = false
        updateUserFormPublicPhoneErrors.value.publicPhoneError = false
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