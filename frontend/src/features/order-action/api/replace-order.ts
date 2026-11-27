import { useMutation, useQueryClient } from "@tanstack/vue-query";

import {
  cancelChoiceForm,
  cancelChoiceMessage,
  closeReplaceItem,
  closeReplaceOrder,
  replaceOrderSchema,
} from "@/features/order-action";
import { clearReplaceForm } from "@/features/replace-order-modal";
import { handler } from "@/shared/api";
import { applyErrors, applyZodErrors } from "@/shared/lib";
import { orderStore } from "@/shared/model";
import { useBaseModals } from "@/shared/ui/notification";

const { orderId, itemId } = orderStore();
const { openNotify } = useBaseModals();

export const useReplaceOrder = () => {
  const queryClient = useQueryClient();

  const {
    mutate: replaceOrder,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["replaceOrder"],
    mutationFn: async () => {
      const result = replaceOrderSchema.safeParse(cancelChoiceForm.value);
      if (!result.success) {
        applyZodErrors(result.error, cancelChoiceMessage);
        return;
      }

      const date = new Date();
      const dateCreated = date.toLocaleDateString();
      const time = date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return await handler(`/orders/${orderId.value}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "Cancelled",
          cause_replace: cancelChoiceForm.value.cancelChoice,
          cancelled_at: date,
          date_cancelled_at: dateCreated,
          time_cancelled_at: time,
        }),
      });
    },

    onSuccess: async () => {
      clearReplaceForm();

      await Promise.all([
        await queryClient.invalidateQueries({ queryKey: ["orders"] }),
        await queryClient.invalidateQueries({ queryKey: ["activeOrders"] }),
      ]);

      await openNotify({ variant: "replace-order", state: "success" });

      closeReplaceOrder();
    },

    onError: async (err) => {
      applyErrors(err, cancelChoiceMessage);

      await openNotify({ variant: "replace-order", state: "error" });
    },
  });

  return {
    replaceOrder,
    isPending,
    isError,
  };
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteOrder, isPending } = useMutation({
    mutationKey: ["deleteOrder"],
    mutationFn: async (id: string) => {
      return await handler(`/orders/${id}`, {
        method: "DELETE",
      });
    },

    onSuccess: async () => {
      await openNotify({ variant: "replace-order", state: "success" });

      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: async () => {
      await openNotify({ variant: "replace-order", state: "error" });
    },
  });

  return {
    deleteOrder,
    isPending,
  };
};

export const useReplaceOrderItem = () => {
  const queryClient = useQueryClient();

  const {
    mutate: replaceItem,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["replaceItem"],
    mutationFn: async () => {
      const result = replaceOrderSchema.safeParse(cancelChoiceForm.value);
      if (!result.success) {
        applyZodErrors(result.error, cancelChoiceMessage);
        return;
      }

      const date = new Date();
      const dateCreated = date.toLocaleDateString();
      const time = date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return await handler(`/orders/${orderId.value}/items/${itemId.value}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "Cancelled",
          cause_replace: cancelChoiceForm.value.cancelChoice,
          cancelled_at: date,
          date_cancelled_at: dateCreated,
          time_cancelled_at: time,
        }),
      });
    },

    onSuccess: async () => {
      clearReplaceForm();

      await Promise.all([
        await queryClient.invalidateQueries({ queryKey: ["orders"] }),
        await queryClient.invalidateQueries({ queryKey: ["activeOrders"] }),
      ]);

      await openNotify({ variant: "replace-order", state: "success" });

      closeReplaceItem();
    },

    onError: async (err) => {
      applyErrors(err, cancelChoiceMessage);

      await openNotify({ variant: "replace-order", state: "error" });
    },
  });

  return {
    replaceItem,
    isPending,
    isError,
  };
};
