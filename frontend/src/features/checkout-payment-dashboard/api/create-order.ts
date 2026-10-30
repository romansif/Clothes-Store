import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { orderPriceInfo } from "@/features/checkout-order-info/lib/order-price-info";
import { shippingForm } from "@/entities/checkout-shipping/model/shipping-form";
import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { orderStore } from "@/shared/model/order.store";

const { items } = orderStore();
const { openNotify } = useBaseModals();
const { totalPrice } = orderPriceInfo();

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");

    const {
        mutateAsync: createOrder,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ["createOrder"],
        mutationFn: async () => {
            return await handler(`/orders`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    orderItems: items.value,
                    orderTotal: Number(totalPrice.value),
                    delivery: shippingForm.value.delivery,
                    status: "Convene",
                }),
            });
        },

        onError: async (err) => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["orders"] }),
                queryClient.invalidateQueries({ queryKey: ["activeOrders"] }),
            ]);

            await openNotify(
                "An error occurred.",
                "We are working on this issue please try again later.",
            );

            throw new Error(`Ошибка при создании заказа`, err);
        },
    });

    return {
        createOrder,
        isPending,
        isError,
    };
};
