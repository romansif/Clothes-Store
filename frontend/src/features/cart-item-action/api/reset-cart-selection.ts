import { useMutation } from "@tanstack/vue-query";

import { handler } from "@/shared/api/http";
import { orderStore } from "@/shared/model/order.store";

const { orderItems } = orderStore();

export const useResetCartSelection = () => {
  const { mutateAsync: resetSelection, isPending } = useMutation({
    mutationKey: ["resetSelection"],
    mutationFn: async () => {
      return await handler("/reset-selection", {
        method: "POST",
      });
    },

    onSuccess: async () => {
      orderItems.value = [];
      localStorage.removeItem("orderItems");
    },
  });

  return {
    resetSelection,
    isPending,
  };
};
