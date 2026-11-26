import { handler } from "@/shared/api";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useBaseModals } from "@/shared/ui/notification/use-notify";

const { openNotify } = useBaseModals()

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id: string) => {
      return await handler(`/products/${id}`, {
        method: "DELETE",
      });
    },

    onSuccess: async () => {
      await openNotify({ variant: "delete-product", state: "success" });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["filteredProducts"] }),
        queryClient.invalidateQueries({ queryKey: ["myProducts"] }),
        queryClient.invalidateQueries({ queryKey: ["yearProducts"] }),
        queryClient.invalidateQueries({ queryKey: ["weekProducts"] }),
        queryClient.invalidateQueries({ queryKey: ["seasonCatalog"] }),
      ]);
    },

    onError: async () => {
      await openNotify({ variant: "delete-product", state: "error" });
    },
  });

  return {
    deleteProduct,
    isPending,
    isError,
  };
};
