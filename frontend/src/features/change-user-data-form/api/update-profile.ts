import { useMutation, useQueryClient } from "@tanstack/vue-query";

import type { EditUserPayload } from "@/features/change-user-data-form/model/edit-user.types";
import { updateUserFormErrorMessages } from "@/entities/profile-form/model/user-update-form";
import { handler } from "@/shared/api/http";
import { applyErrors } from "@/shared/lib/errors-helper";
import { useBaseModals } from "@/shared/lib/use-notify";

const { openNotify } = useBaseModals();

export const useBaseEditUser = () => {
    const queryClient = useQueryClient();
    const useId = localStorage.getItem("userId");

    const {
        mutateAsync: baseEditUser,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["baseEditUser"],
        mutationFn: async ({ dataToUpdate, type }: EditUserPayload) => {
            return await handler(`/${type}/${useId}`, {
                method: "PATCH",
                body: JSON.stringify(dataToUpdate),
            });
        },

        onSuccess: async (variables) => {
            await queryClient.invalidateQueries({ queryKey: ["user"] });

            await openNotify(variables.title, "");
        },

        onError: (err) => {
            applyErrors(err, updateUserFormErrorMessages);
        },
    });

    return {
        baseEditUser,
        isPending,
        isError,
    };
};
