import { handler } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/ui/notification";

const { openNotify } = useBaseModals()

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deletePaymentCard,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["deletePaymentCard"],
    mutationFn: async (id: string) => {

      return await handler(`/payment/${id}`, {
        method: "DELETE",
      });
    },

    onSuccess: async () => {
      await openNotify({ variant: 'delete-payment', state: 'success' });

      await queryClient.invalidateQueries({ queryKey: ["userPaymentCards"] });
    },

    onError: async () => {
      await openNotify({ variant: 'delete-payment', state: 'error' });
    },
  });

  return {
    deletePaymentCard,
    isPending,
    isError,
  };
};
