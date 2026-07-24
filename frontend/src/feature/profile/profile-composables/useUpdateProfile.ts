import { ApiError, handler } from "../../../shared/api/http.ts";
import { usersStore } from "../../../shared/composables/stores/users.store.ts";
import { userForms } from "../../../shared/composables/forms-composables/forms/users.forms.ts";
import { clearUsersForms } from "../../../shared/composables/forms-composables/clear-forms/clear.users.ts";
import { userFormsErrors } from "../../../shared/composables/forms-composables/forms-errors/users.errors.ts";

const { user } = usersStore();
const {
    updateUserName, updateUserFormNameMessage,
    updateUserEmail, updateUserFormEmailMessage,
    updateUserPhone, updateUserFormPhoneMessage,
    updateUserSurName, updateUserFormSurNameMessage,
    updateUserPassword, updateUserFormPasswordMessages,
    updateUserCompanyName, updateUserFormCompanyNameMessage,
    updateUserFormPublicPhone, updateUserFormPublicPhoneMessage,
} = userForms();
const {
    clearUpdateUserFormPublicPhone,
    clearUpdateUserFormPhone, clearUpdateUserFormEmail,
    clearUpdateUserFormName, clearUpdateUserFormSurName,
    clearUpdateUserFormPassword, clearUpdateUserFormCompanyName,
} = clearUsersForms();
const {
    updateUserPasswordErrors,
    updateUserNameErrors, updateUserSurNameErrors,
    updateUserPhoneErrors, updateUserFormCompanyNameErrors,
    updateUserFormPublicPhoneErrors, updateUserEmailErrors
} = userFormsErrors()


export const useUpdateProfile = () => {
    const updateAvatarAccount = async (event: Event) => {
        const userId = localStorage.getItem("userId");

        const target = event.target as HTMLInputElement;
        if(!target.files || target.files.length === 0) return
        const selectedFile = target.files[0]

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try{
            const newAvatar = await handler(`/users/avatar/${userId}`, {
                method: "PATCH",
                body: formData,
            })
            user.value.avatarUrl = newAvatar.avatarUrl
        }catch(err){
            console.log('Failed to change the avatar', err)
        }
    };

    const updateNameAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updateName = await handler(`/users/name/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: updateUserName.value.name,
                })
            });
            user.value.name = updateName.name;
            clearUpdateUserFormName()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserNameErrors.value.nameError = !!errors.name;
                    updateUserFormNameMessage.value.nameMessage = errors.name || '';
                }
            }
            console.log('Не удалось обновить данные пользователя')
        }
    };

    const updateSurNameAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updateSurName = await handler(`/users/surName/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    surName: updateUserSurName.value.surName,
                })
            })
            user.value.surName = updateSurName.surName
            clearUpdateUserFormSurName()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserSurNameErrors.value.surNameError = !!errors.surName;
                    updateUserFormSurNameMessage.value.surNameMessage = errors.surName || '';
                }
            }
        }
    };

    const updatePhoneAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updatePhone = await handler(`/users/phone/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    privatePhone: updateUserPhone.value.phone,
                })
            })
            user.value.privatePhone = updatePhone.privatePhone
            clearUpdateUserFormPhone()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserPhoneErrors.value.phoneError = !!errors.phone;
                    updateUserFormPhoneMessage.value.phoneMessage = errors.phone || '';
                }
            }
        }
    };

    const updateCompanyName = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updateCompanyName = await handler(`/users/company/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    companyName: updateUserCompanyName.value.companyName,
                })
            })
            user.value.companyName = updateCompanyName.companyName
            clearUpdateUserFormCompanyName()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserFormCompanyNameErrors.value.companyNameError = !!errors.companyName;
                    updateUserFormCompanyNameMessage.value.companyNameMessage = errors.companyName || '';
                }
            }
        }
    };

    const updatePublicPhoneAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updatePublic = await handler(`/users/public/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    publicPhone: updateUserFormPublicPhone.value.publicPhone,
                })
            })
            user.value.publicPhone = updatePublic.publicPhone
            clearUpdateUserFormPublicPhone()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserFormPublicPhoneErrors.value.publicPhoneError = !!errors.publicPhone;
                    updateUserFormPublicPhoneMessage.value.publicPhoneMessage = errors.publicPhone || '';
                }
            }
        }
    };

    const updateEmailAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updateEmail = await handler(`/users/email/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    email: updateUserEmail.value.email,
                })
            })
            user.value.email = updateEmail.email
            clearUpdateUserFormEmail()
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserEmailErrors.value.emailError = !!errors.email;
                    updateUserFormEmailMessage.value.emailMessage = errors.email || '';
                }
            }
        }
    };

    const updatePasswordAccount = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const updatePassword = await handler(`/users/password/${userId}`, {
                method: "POST",
                body: JSON.stringify({
                    oldPassword: updateUserPassword.value.oldPassword,
                    newPassword: updateUserPassword.value.newPassword,
                })
            });
            user.value.password = updatePassword.password;
            clearUpdateUserFormPassword();
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string> | undefined;
                if(errors){
                    updateUserPasswordErrors.value.oldPasswordError = !!errors.oldPassword;
                    updateUserPasswordErrors.value.newPasswordError = !!errors.newPassword;

                    updateUserFormPasswordMessages.value.oldPasswordMessage = errors.oldPassword || '';
                    updateUserFormPasswordMessages.value.newPasswordMessage = errors.newPassword || '';
                }
            }
        }
    };

    return {
        updateAvatarAccount,
        updateNameAccount,
        updateSurNameAccount,
        updateCompanyName,
        updatePublicPhoneAccount,
        updatePhoneAccount,
        updateEmailAccount,
        updatePasswordAccount,
    }
}