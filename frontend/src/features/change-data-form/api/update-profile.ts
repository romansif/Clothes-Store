import type { ZodError } from "zod";
import { handler } from "@/shared/api/http";
import { userData } from "@/shared/model/user.store";
import { clearUsersForms } from "@/features/change-data-form/lib/clear-user-update";
import { useBaseModals } from "@/shared/lib/use-notify";
import { useGetUsers } from "@/widgets/profile/api/get-users";
import { applyZodErrors, applyErrors } from "@/shared/lib/errors-helper";
import { updateUserForm, updateUserFormErrorMessages } from "@/entities/profile-form/model/user-update-form";
import {
    updateUserNameSchema, updateUserSurNameSchema, updateUserPhoneSchema,
    updateUserEmailSchema, updateUserPasswordSchema
} from "@/entities/profile-form/model/user-update-schemas";
import type { UserDataUpdate } from "@/entities/profile-form";

const { getUser } = useGetUsers();
const { openNotify } = useBaseModals();
const {
    clearUpdateUserFormPhone, clearUpdateUserFormEmail, clearUpdateUserFormName,
    clearUpdateUserFormSurName, clearUpdateUserFormPassword
} = clearUsersForms();

export const profileApi = () => {
    const baseUpdateAccount = async (dataToUpdate: UserDataUpdate, type: string, title: string) => {
        if(!userData.value) return

        await handler(`/${type}/${userData.value.id}`, {
            method: "PATCH",
            body: JSON.stringify(dataToUpdate),
        });
        await getUser();

        await openNotify(title, '')
    };

    const updateUserApplyZodErrors = (err: ZodError) => {
        applyZodErrors(
            err,
            updateUserFormErrorMessages
        )
    };

    const updateUserApplyErrors = (err: unknown) => {
        applyErrors(
            err,
            updateUserFormErrorMessages
        )
    };

    const updateNameAccount = async () => {
        const result = updateUserNameSchema.safeParse(updateUserForm.value)
        if(!result.success){
            updateUserApplyZodErrors(result.error)
            return
        }

        try{
            await baseUpdateAccount({name: updateUserForm.value.name}, 'name',
                'You have successfully changed your name.')
            clearUpdateUserFormName();
        }catch(err){
            updateUserApplyErrors(err);
            console.error(`Failed to the change user name:`, err);
        }
    };

    const updateSurNameAccount = async () => {
        const result = updateUserSurNameSchema.safeParse(updateUserForm.value)
        if(!result.success){
            updateUserApplyZodErrors(result.error)
            return
        }

        try{
            await baseUpdateAccount({surName: updateUserForm.value.surName}, 'surname',
                'You have successfully changed your surname.')
            clearUpdateUserFormSurName();
        }catch(err){
            updateUserApplyErrors(err);
            console.error(`Failed to the change user surname:`, err);
        }
    };

    const updatePhoneAccount = async () => {
        const result = updateUserPhoneSchema.safeParse(updateUserForm.value)
        if(!result.success){
            updateUserApplyZodErrors(result.error)
            return
        }

        try{
            await baseUpdateAccount({phone: updateUserForm.value.phone}, 'phone',
                'You have successfully changed your phone number.')
            clearUpdateUserFormPhone();
        }catch(err){
            updateUserApplyErrors(err);
            console.error(`Failed to the change user phone:`, err);
        }
    };

    const updateEmailAccount = async () => {
        const result = updateUserEmailSchema.safeParse(updateUserForm.value)
        if(!result.success){
            updateUserApplyZodErrors(result.error)
            return
        }

        try{
            await baseUpdateAccount({email: updateUserForm.value.email}, 'email',
                'You have successfully changed your email address.')
            clearUpdateUserFormEmail();
        }catch(err){
            updateUserApplyErrors(err);
            console.error(`Failed to the change email:`, err);
        }
    };

    const updatePasswordAccount = async () => {
        const result = updateUserPasswordSchema.safeParse(updateUserForm.value)
        if(!result.success){
            updateUserApplyZodErrors(result.error)
            return
        }

        try{
            if(!userData.value) return

            userData.value.password =  await handler(`/password/${userData.value.id}`, {
                method: "POST",
                body: JSON.stringify({
                    oldPassword: updateUserForm.value.oldPassword,
                    newPassword: updateUserForm.value.newPassword,
                })
            });
            clearUpdateUserFormPassword();
            await openNotify('You have successfully changed your password.', '')
        }catch(err){
            updateUserApplyErrors(err);
            console.error(`Failed to the change password:`, err);
        }
    };

    return {
        updateNameAccount,
        updateSurNameAccount,
        updatePhoneAccount,
        updateEmailAccount,
        updatePasswordAccount,
    }
}