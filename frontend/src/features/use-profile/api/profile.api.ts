import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { userForms } from "@/features/use-profile/model/user.form.ts";
import { clearUsersForms } from "@/features/use-profile/lib/clear.users.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useGetUsers } from "@/features/use-auth/api/users.api.ts";
import type { UserDataUpdate } from "@/entities/profile/model/user.types.ts";

const { user, userData } = userStore();
const { getUser } = useGetUsers();
const { openNotify } = useBaseModals();
const { updateUserForm } = userForms();
const { updateNameErrors, updateSurNameErrors, updateEmailErrors, updatePhoneErrors, updatePasswordErrors } = useFormsErrors();
const {
    clearUpdateUserFormPhone, clearUpdateUserFormEmail, clearUpdateUserFormName,
    clearUpdateUserFormSurName, clearUpdateUserFormPassword
} = clearUsersForms();

export const profileApi = () => {
    const updateAvatarAccount = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if(!target.files || target.files.length === 0) return;
        const selectedFile = target.files[0];

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try{
            const newAvatar = await handler(`/avatar/${userData.id}`, {
                method: "PATCH",
                body: formData,
            });
            user.value.avatarUrl = newAvatar.avatarUrl;
        }catch(err){
            console.log('Failed to change the avatar', err);
        }
    };

    const baseUpdateAccount = async (dataToUpdate: UserDataUpdate, type: string, title: string) => {
        await handler(`/${type}/${userData.id}`, {
            method: "PATCH",
            body: JSON.stringify(dataToUpdate),
        });
        await getUser();

        await openNotify(title, '', '')
    }

    const updateNameAccount = async () => {
        try{
            await baseUpdateAccount({name: updateUserForm.value.name}, 'name',
                'You have successfully changed your name.')
            clearUpdateUserFormName();
        }catch(err){
            updateNameErrors(err);
            console.error(`Failed to the change user name:`, err);
        }
    };

    const updateSurNameAccount = async () => {
        try{
            await baseUpdateAccount({surName: updateUserForm.value.surName}, 'surname',
                'You have successfully changed your surname.')
            clearUpdateUserFormSurName();
        }catch(err){
            updateSurNameErrors(err);
            console.error(`Failed to the change user surname:`, err);
        }
    };

    const updatePhoneAccount = async () => {
        try{
            await baseUpdateAccount({phone: updateUserForm.value.phone}, 'phone',
                'You have successfully changed your phone number.')
            clearUpdateUserFormPhone();
        }catch(err){
            updatePhoneErrors(err);
            console.error(`Failed to the change user phone:`, err);
        }
    };

    const updateEmailAccount = async () => {
        try{
            await baseUpdateAccount({email: updateUserForm.value.email}, 'email',
                'You have successfully changed your email address.')
            clearUpdateUserFormEmail();
        }catch(err){
            updateEmailErrors(err);
            console.error(`Failed to the change email:`, err);
        }
    };

    const updatePasswordAccount = async () => {
        try{
            const updatePassword = await handler(`/password/${userData.id}`, {
                method: "POST",
                body: JSON.stringify({
                    oldPassword: updateUserForm.value.oldPassword,
                    newPassword: updateUserForm.value.newPassword,
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
        updatePhoneAccount,
        updateEmailAccount,
        updatePasswordAccount,
    }
}