import { handler } from "@/shared/api/http";
import { useFormsErrors } from "@/shared/composables/errors/errors-middleware/forms.errors";
import { usersStore } from "@/shared/composables/stores/users.store";
import { userForms } from "@/shared/composables/forms/users.forms";
import { clearUsersForms } from "@/shared/composables/clear-forms/clear.users";
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";
import { useGetUsers } from "@/feature/auth/auth-composables/get.users.ts";

interface UserDataUpdate {
    name?: string;
    surName?: string;
    phone?: string;
    email?: string;
    publicPhone?: string;
    companyName?: string;
}

const { user } = usersStore();
const { getUser } = useGetUsers();
const { openNotify } = useBaseModals();
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
    updateUserPassword, updateUserCompanyName, updateUserPublicPhone,
} = userForms();

export const useProfile = () => {
    const updateAvatarAccount = async (event: Event) => {
        const userId = localStorage.getItem("userId");

        const target = event.target as HTMLInputElement;
        if(!target.files || target.files.length === 0) return;
        const selectedFile = target.files[0];

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try{
            const newAvatar = await handler(`/avatar/${userId}`, {
                method: "PATCH",
                body: formData,
            });
            user.value.avatarUrl = newAvatar.avatarUrl;
        }catch(err){
            console.log('Failed to change the avatar', err);
        }
    };

    const baseUpdateAccount = async (dataToUpdate: UserDataUpdate, type: string, title: string) => {
        const userId = localStorage.getItem("userId");

        await handler(`/${type}/${userId}`, {
            method: "PATCH",
            body: JSON.stringify(dataToUpdate),
        });
        await getUser();

        await openNotify(title, '', '')
    }

    const updateNameAccount = async () => {
        try{
            await baseUpdateAccount({name: updateUserName.value.name}, 'name',
                'You have successfully changed your name.')
            clearUpdateUserFormName();
        }catch(err){
            updateNameErrors(err);
            console.error(`Failed to the change user name:`, err);
        }
    };

    const updateSurNameAccount = async () => {
        try{
            await baseUpdateAccount({surName: updateUserSurName.value.surName}, 'surname',
                'You have successfully changed your surname.')
            clearUpdateUserFormSurName();
        }catch(err){
            updateSurNameErrors(err);
            console.error(`Failed to the change user surname:`, err);
        }
    };

    const updatePhoneAccount = async () => {
        try{
            await baseUpdateAccount({phone: updateUserPhone.value.phone}, 'phone',
                'You have successfully changed your phone number.')
            clearUpdateUserFormPhone();
        }catch(err){
            updatePhoneErrors(err);
            console.error(`Failed to the change user phone:`, err);
        }
    };

    const updateCompanyName = async () => {
        try{
            await baseUpdateAccount({companyName: updateUserCompanyName.value.companyName}, 'companyName',
                'You have successfully changed your company name.')
            clearUpdateUserFormCompanyName();
        }catch(err){
            updateCompanyNameErrors(err);
            console.error(`Failed to the change company name:`, err);
        }
    };

    const updatePublicPhoneAccount = async () => {
        try{
            await baseUpdateAccount({publicPhone: updateUserPublicPhone.value.publicPhone}, 'publicPhone',
                'You have successfully changed your public phone number.')
            clearUpdateUserFormPublicPhone();
        }catch(err){
            updatePublicPhoneErrors(err);
            console.error(`Failed to the change phone company:`, err);
        }
    };

    const updateEmailAccount = async () => {
        try{
            await baseUpdateAccount({email: updateUserEmail.value.email}, 'email',
                'You have successfully changed your email address.')
            clearUpdateUserFormEmail();
        }catch(err){
            updateEmailErrors(err);
            console.error(`Failed to the change email:`, err);
        }
    };

    const updatePasswordAccount = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const updatePassword = await handler(`/password/${userId}`, {
                method: "POST",
                body: JSON.stringify({
                    oldPassword: updateUserPassword.value.oldPassword,
                    newPassword: updateUserPassword.value.newPassword,
                })
            });
            user.value.password = updatePassword.password;
            clearUpdateUserFormPassword();
            await openNotify('You have successfully changed your password.', '', '')
        }catch(err){
            updatePasswordErrors(err);
            console.error(`Failed to the change password:`, err);
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