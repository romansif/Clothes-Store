import { queryClient } from "@/shared/api/query-client";
import { handler } from "@/shared/api/http";
import { useMutation } from "@tanstack/vue-query";
import { useBaseModals } from "@/widgets/notification/lib/use-notify";
import type { SellerOrderProps } from "@/entities/order";

const { openNotify } = useBaseModals();

const NEXT_STATUS: Record<string, string> = {
    "Convene": "En Route",
    "En Route": "Delivered",
}

export const useUpdateOrderStatus = () => {
    const {
        mutate: updateOrderStatus,
        isPending,
        isError
    } = useMutation({
        mutationKey: ["updateOrderStatus"],
        mutationFn: async (item: SellerOrderProps) => {
            const next = NEXT_STATUS[item.status]
            if(!item.orderId || !item.id || !next){
                throw new Error("Нельзя обновить статус позиции");
            }

            await handler(`/orders/${item.orderId}/items/${item.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: next
                })
            })
        },

        onSuccess: async () => {
            await openNotify({ variant: "update-order-status", state: "success" })

            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["orders"] }),
                queryClient.invalidateQueries({ queryKey: ["sellerOrders"] }),
            ])
        },

        onError: async () => {
            await openNotify({ variant: "update-order-status", state: "error" })
        }
    });

    return {
        updateOrderStatus,
        isPending,
        isError
    }
}