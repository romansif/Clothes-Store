import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { useMutation, useQueryClient} from "@tanstack/vue-query";
import { clearUsersForms } from "@/features/change-user-data-from/lib/clear-user-update";
import { applyErrors, applyZodErrors } from "@/shared/lib/errors-helper";
import {
    updateUserNameSchema, updateUserSurNameSchema, updateUserPhoneSchema,
    updateUserEmailSchema, updateUserPasswordSchema
} from "@/entities/profile-form/model/user-update-schemas";
import { updateUserForm, updateUserFormErrorMessages } from "@/entities/profile-form/model/user-update-form";
import { useBaseEditUser } from "@/features/change-user-data-from/api/update-profile";

const {
    clearUpdateUserFormPhone, clearUpdateUserFormEmail, clearUpdateUserFormName,
    clearUpdateUserFormSurName, clearUpdateUserFormPassword
} = clearUsersForms();

export const useEditUserName = () => {
    const { baseEditUser } = useBaseEditUser()

    const { mutateAsync: editUserName, isPending, isError } = useMutation({mutationKey: ['editUserName'],
        mutationFn: async () => {
            const result = updateUserNameSchema.safeParse(updateUserForm.value)
            if (!result.success) {
                applyZodErrors(result.error, updateUserFormErrorMessages)
                throw result.error
            }

            return await baseEditUser({
                dataToUpdate: { name: updateUserForm.value.name },
                type: 'name',
                title: 'You have successfully changed your name.',
            })
        },

        onSuccess: () => {
            clearUpdateUserFormName()
        },
    })

    return {
        editUserName,
        isPending,
        isError
    }
}

export const useEditUserSurName = () => {
    const { baseEditUser } = useBaseEditUser()

    const { mutateAsync: editUserSurName, isPending, isError } = useMutation({mutationKey: ['editUserSurName'],
        mutationFn: async () => {
            const result = updateUserSurNameSchema.safeParse(updateUserForm.value)
            if (!result.success) {
                applyZodErrors(result.error, updateUserFormErrorMessages)
                throw result.error
            }

            return await baseEditUser({
                dataToUpdate: { name: updateUserForm.value.surName },
                type: 'surname',
                title: 'You have successfully changed your surname.',
            })
        },

        onSuccess: () => {
            clearUpdateUserFormSurName()
        },
    })

    return {
        editUserSurName,
        isPending,
        isError
    }
}

export const useEditUserPhone = () => {
    const { baseEditUser } = useBaseEditUser()

    const { mutateAsync: editUserPhone, isPending, isError } = useMutation({mutationKey: ['editUserPhone'],
        mutationFn: async () => {
            const result = updateUserPhoneSchema.safeParse(updateUserForm.value)
            if (!result.success) {
                applyZodErrors(result.error, updateUserFormErrorMessages)
                throw result.error
            }

            return await baseEditUser({
                dataToUpdate: { name: updateUserForm.value.surName },
                type: 'phone',
                title: 'You have successfully changed your phone.',
            })
        },

        onSuccess: () => {
            clearUpdateUserFormPhone()
        },
    })

    return {
        editUserPhone,
        isPending,
        isError
    }
}

export const useEditUserEmail = () => {
    const { baseEditUser } = useBaseEditUser()

    const { mutateAsync: editUserEmail, isPending, isError } = useMutation({mutationKey: ['editUserEmail'],
        mutationFn: async () => {
            const result = updateUserEmailSchema.safeParse(updateUserForm.value)
            if (!result.success) {
                applyZodErrors(result.error, updateUserFormErrorMessages)
                throw result.error
            }

            return await baseEditUser({
                dataToUpdate: { name: updateUserForm.value.surName },
                type: 'email',
                title: 'You have successfully changed your email.',
            })
        },

        onSuccess: () => {
            clearUpdateUserFormEmail()
        },
    })

    return {
        editUserEmail,
        isPending,
        isError
    }
}

export const useEditUserPassword = () => {
    const queryClient = useQueryClient()
    const { openNotify } = useBaseModals();
    const userId = localStorage.getItem("userId");

    const { mutateAsync: editUserPassword, isPending, isError } = useMutation({mutationKey: ['editUserPassword'],
        mutationFn: async () => {
            const result = updateUserPasswordSchema.safeParse(updateUserForm.value)
            if(!result.success){
                applyZodErrors(result.error, updateUserFormErrorMessages)
                return
            }

            return await handler(`/password/${userId}`, {
                method: "POST",
                body: JSON.stringify({
                    oldPassword: updateUserForm.value.oldPassword,
                    newPassword: updateUserForm.value.newPassword,
                })
            });
        },

        onSuccess: async () => {
            clearUpdateUserFormPassword();

            await queryClient.invalidateQueries({queryKey: ['user']})

            await openNotify('You have successfully changed your password.', '')
        },

        onError: (err) => {
            applyErrors(err, updateUserFormErrorMessages)

            console.error(`Failed to the change password:`, err);
        }
    })

    return {
        editUserPassword,
        isPending,
        isError
    }
}