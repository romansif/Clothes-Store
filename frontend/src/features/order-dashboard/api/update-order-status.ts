import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { useBaseModals } from "@/shared/ui/notification";
import type { SellerOrderProps } from "@/entities/order";
import { handler } from "@/shared/api";

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
