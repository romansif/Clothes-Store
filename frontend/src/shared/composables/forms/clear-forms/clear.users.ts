import { userForms } from "../users.forms.ts";
import { userFormsErrors } from "../forms-errors/users.errors.ts";

const { updateUserName, updateUserPhone, updateUserOldPassword, updateUserNewPassword } = userForms()
const { updateUserNameErrors, updateUserPhoneErrors, updateUserOldPasswordErrors, updateUserNewPasswordErrors } = userFormsErrors()

export const clearUsersForms = () => {
    const clearUpdateUserFormName = () => {
        updateUserName.value.name = ''
        updateUser.value.phone = ''
        updateUser.value.oldPassword = ''
        updateUser.value.oldPassword = ''

        updateUserErrors.value.nameError = false
        updateUserErrors.value.phoneError = false
        updateUserErrors.value.oldPasswordError = false
        updateUserErrors.value.newPasswordError = false
    }

    return{
        clearUpdateUserForm,
    }
}