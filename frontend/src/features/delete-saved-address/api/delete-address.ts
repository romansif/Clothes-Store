import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/widgets/notification/lib/use-notify";

const { openNotify } = useBaseModals()

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAddressItem,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["deleteAddressItem"],
    mutationFn: async (id: string) => {
      await handler(`/address/${id}`, {
        method: "DELETE",
      });
    },

    onSuccess: async () => {
      await openNotify({ variant: 'delete-address', state: 'success' });

      await queryClient.invalidateQueries({ queryKey: ["userAddresses"] });
    },

    onError: async () => {
      await openNotify({ variant: 'delete-address', state: 'error' });
    },
  });

  return {
    deleteAddressItem,
    isPending,
    isError,
  };
};
