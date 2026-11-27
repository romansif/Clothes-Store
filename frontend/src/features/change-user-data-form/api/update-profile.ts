import { useMutation, useQueryClient } from "@tanstack/vue-query";

import type { EditUserPayload } from "@/features/change-user-data-form/model/edit-user.types";
import { updateUserFormErrorMessages } from "@/features/change-user-data-form/model/user-update-form";
import { handler } from "@/shared/api";
import { applyErrors } from "@/shared/lib";
import { useBaseModals } from "@/shared/ui/notification";

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
