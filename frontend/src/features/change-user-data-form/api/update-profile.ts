import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { useBaseModals } from "@/shared/ui/notification/lib/use-notify";
import { updateUserFormErrorMessages } from "@/features/change-user-data-form/model/user-update-form";
import { handler } from "@/shared/api/http";
import { applyErrors } from "@/shared/lib/errors-helper";
import type { EditUserPayload } from "@/features/change-user-data-form/model/edit-user.types";

const { openNotify } = useBaseModals();

export const useBaseEditUser = () => {
  const queryClient = useQueryClient();
  const useId = localStorage.getItem("userId");

  const {
    mutate: baseEditUser,
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

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      await openNotify({ variant: "profile", state: "success" });
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
