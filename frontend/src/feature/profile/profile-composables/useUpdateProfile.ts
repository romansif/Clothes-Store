import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/errors/FormErrors.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { userForms } from "@/shared/composables/forms-composables/forms/users.forms.ts";
import { clearUsersForms } from "@/shared/composables/forms-composables/clear-forms/clear.users.ts";

const { user } = usersStore();
const {
    updateNameErrors, updateSurNameErrors, updateEmailErrors, updatePhoneErrors,
    updatePublicPhoneErrors, updateCompanyNameErrors, updatePasswordErrors
} = useFormsErrors();
const {
    clearUpdateUserFormPublicPhone,
    clearUpdateUserFormPhone, clearUpdateUserFormEmail,
    clearUpdateUserFormName, clearUpdateUserFormSurName,
    clearUpdateUserFormPassword, clearUpdateUserFormCompanyName,
} = clearUsersForms();
const {
    updateUserName, updateUserEmail, updateUserPhone, updateUserSurName,
    updateUserPassword, updateUserCompanyName, updateUserFormPublicPhone,
} = userForms();

export const useUpdateProfile = () => {
    const updateAvatarAccount = async (event: Event) => {
        const userId = localStorage.getItem("userId");

        const target = event.target as HTMLInputElement;
        if(!target.files || target.files.length === 0) return;
        const selectedFile = target.files[0];

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try{
            const newAvatar = await handler(`/users/avatar/${userId}`, {
                method: "PATCH",
                body: formData,
            });
            user.value.avatarUrl = newAvatar.avatarUrl;
        }catch(err){
            console.log('Failed to change the avatar', err);
        }
    };

    const updateNameAccount = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const updateName = await handler(`/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: updateUserName.value.name,
                })
            });
            user.value.name = updateName.name;
            clearUpdateUserFormName();
        }catch(err){
            updateNameErrors(err);
            console.log('Не удалось обновить имя пользователя');
        }
    };

    const updateSurNameAccount = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const updateSurName = await handler(`/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    surName: updateUserSurName.value.surName,
                })
            });
            user.value.surName = updateSurName.surName;
            clearUpdateUserFormSurName();
        }catch(err){
            updateSurNameErrors(err);
            console.log('Не удалось обновить фамилию пользователя');
        }
    };

    const updatePhoneAccount = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const updatePhone = await handler(`/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    privatePhone: updateUserPhone.value.phone,
                })
            });
            user.value.privatePhone = updatePhone.privatePhone;
            clearUpdateUserFormPhone();
        }catch(err){
            updatePhoneErrors(err);
            console.log('Не удалось обновить личный телефон пользователя');
        }
    };

    const updateCompanyName = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const updateCompanyName = await handler(`/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    companyName: updateUserCompanyName.value.companyName,
                })
            });
            user.value.companyName = updateCompanyName.companyName;
            clearUpdateUserFormCompanyName();
        }catch(err){
            updateCompanyNameErrors(err);
            console.log('Не удалось обновить название компании пользователя');
        }
    };

    const updatePublicPhoneAccount = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const updatePublic = await handler(`/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    publicPhone: updateUserFormPublicPhone.value.publicPhone,
                })
            });
            user.value.publicPhone = updatePublic.publicPhone;
            clearUpdateUserFormPublicPhone();
        }catch(err){
            updatePublicPhoneErrors(err);
            console.log('Не удалось обновить телефон компании пользователя');
        }
    };

    const updateEmailAccount = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const updateEmail = await handler(`/users/${userId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    email: updateUserEmail.value.email,
                })
            })
            user.value.email = updateEmail.email;
            clearUpdateUserFormEmail();
        }catch(err){
            updateEmailErrors(err);
            console.log('Не удалось обновить почту пользователя');
        }
    };

    const updatePasswordAccount = async () => {
        const userId = localStorage.getItem("userId");
        try{
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
            updatePasswordErrors(err);
            console.log('Не удалось обновить пароль пользователя');
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