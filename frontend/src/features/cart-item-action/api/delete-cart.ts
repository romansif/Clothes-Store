import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCartItem,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["deleteCartItem"],
    mutationFn: async (id: string) => {
      return await handler(`/cart/${id}`, {
        method: "DELETE",
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    deleteCartItem,
    isPending,
    isError,
  };
};
