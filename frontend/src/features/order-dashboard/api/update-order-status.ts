import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { handler } from "@/shared/api";
import type { SellerOrderProps } from "@/shared/model";
import { useBaseModals } from "@/shared/ui/notification";

const { openNotify } = useBaseModals();

const NEXT_STATUS: Record<string, string> = {
  Convene: "En Route",
  "En Route": "Delivered",
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateOrderStatus,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["updateOrderStatus"],
    mutationFn: async (item: SellerOrderProps) => {
      const next = NEXT_STATUS[item.status];
      if (!item.orderId || !item.id || !next) {
        throw new Error("Нельзя обновить статус позиции");
      }

      await handler(`/orders/${item.orderId}/items/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: next,
        }),
      });
    },

    onSuccess: async () => {
      await openNotify({ variant: "update-order-status", state: "success" });

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["orders"] }),
        queryClient.invalidateQueries({ queryKey: ["orderItems"] }),
        queryClient.invalidateQueries({ queryKey: ["sellerItems"] }),
      ]);
    },

    onError: async () => {
      await openNotify({ variant: "update-order-status", state: "error" });
    },
  });

  return {
    updateOrderStatus,
    isPending,
    isError,
  };
};
