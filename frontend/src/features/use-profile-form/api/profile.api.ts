import { handler } from "@/shared/api/http.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { clearUsersForms } from "@/features/use-profile-form/lib/clear-user-update.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { useGetUsers } from "@/features/use-profile/api/get-users.ts";
import {
    updateNameApiErrors, updateSurNameApiErrors, updateEmailApiErrors,
    updatePhoneApiErrors, updatePasswordApiErrors
} from "@/shared/lib/api-errors/update-user-errors.ts";
import {
    updateUserNameValidationErrors, updateUserSurNameValidationErrors, updateUserPhoneValidationErrors,
    updateUserEmailValidationErrors, updateUserPasswordValidationErrors
} from "@/shared/lib/validation-errors/validation-update-user.ts";
import type { UserDataUpdate } from "@/features/use-profile-form/model/user.update.types.ts";
import { updateUserForm } from "@/features/use-profile-form/model/user.update.form.ts";
import {
    updateUserNameSchema, updateUserSurNameSchema, updateUserPhoneSchema,
    updateUserEmailSchema, updateUserPasswordSchema
} from "@/features/use-profile-form/model/user.update.schemas.ts";

const { getUser } = useGetUsers();
const { user, userData } = userStore();
const { openNotify } = useBaseModals();
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
        const result = updateUserNameSchema.safeParse(updateUserForm.value)
        if(!result.success){
            updateUserNameValidationErrors(result.error);
            return
        }

        try{
            await baseUpdateAccount({name: updateUserForm.value.name}, 'name',
                'You have successfully changed your name.')
            clearUpdateUserFormName();
        }catch(err){
            updateNameApiErrors(err);
            console.error(`Failed to the change user name:`, err);
        }
    };

    const updateSurNameAccount = async () => {
        const result = updateUserSurNameSchema.safeParse(updateUserForm.value)
        if(!result.success){
            updateUserSurNameValidationErrors(result.error);
            return
        }

        try{
            await baseUpdateAccount({surName: updateUserForm.value.surName}, 'surname',
                'You have successfully changed your surname.')
            clearUpdateUserFormSurName();
        }catch(err){
            updateSurNameApiErrors(err);
            console.error(`Failed to the change user surname:`, err);
        }
    };

    const updatePhoneAccount = async () => {
        const result = updateUserPhoneSchema.safeParse(updateUserForm.value)
        if(!result.success){
            updateUserPhoneValidationErrors(result.error);
            return
        }

        try{
            await baseUpdateAccount({phone: updateUserForm.value.phone}, 'phone',
                'You have successfully changed your phone number.')
            clearUpdateUserFormPhone();
        }catch(err){
            updatePhoneApiErrors(err);
            console.error(`Failed to the change user phone:`, err);
        }
    };

    const updateEmailAccount = async () => {
        const result = updateUserEmailSchema.safeParse(updateUserForm.value)
        if(!result.success){
            updateUserEmailValidationErrors(result.error);
            return
        }

        try{
            await baseUpdateAccount({email: updateUserForm.value.email}, 'email',
                'You have successfully changed your email address.')
            clearUpdateUserFormEmail();
        }catch(err){
            updateEmailApiErrors(err);
            console.error(`Failed to the change email:`, err);
        }
    };

    const updatePasswordAccount = async () => {
        const result = updateUserPasswordSchema.safeParse(updateUserForm.value)
        console.log(result)
        if(!result.success){
            updateUserPasswordValidationErrors(result.error);
            return
        }

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
            updatePasswordApiErrors(err);
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