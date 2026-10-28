import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/lib/use-notify";
import { applyErrors } from "@/shared/lib/errors-helper";
import { updateUserFormErrorMessages } from "@/entities/profile-form/model/user-update-form";
import type { EditUserPayload } from "@/features/change-user-data-from/model/edit-user.types";

const { openNotify } = useBaseModals();

export const useBaseEditUser = () => {
    const queryClient = useQueryClient()
    const useId = localStorage.getItem("userId")

    const { mutateAsync: baseEditUser, isPending } = useMutation({mutationKey: ['baseEditUser'],
        mutationFn: async ({ dataToUpdate, type }: EditUserPayload) => {
            return await handler(`/${type}/${useId}`, {
                method: 'PATCH',
                body: JSON.stringify(dataToUpdate),
            })
        },

        onSuccess: async (variables) => {
            await queryClient.invalidateQueries({ queryKey: ['user'] })

            await openNotify(variables.title, '')
        },

        onError: (err) => {
            applyErrors(err, updateUserFormErrorMessages)
        },
    })

    return {
        baseEditUser,
        isPending
    }
}