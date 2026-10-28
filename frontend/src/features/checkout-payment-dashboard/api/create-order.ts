import { handler } from "@/shared/api/http";
import { useMutation } from "@tanstack/vue-query";
import { orderStore } from "@/shared/model/order.store";
import { useBaseModals } from "@/shared/lib/use-notify";
import { orderPriceInfo } from "@/features/checkout-order-info/lib/order-price-info";
import { shippingForm } from "@/entities/checkout-shipping/model/shipping-form";

const { items } = orderStore();
const { openNotify } = useBaseModals();
const { totalPrice } = orderPriceInfo();

export const useCreateOrder = () => {
    const userId = localStorage.getItem("userId");

    const { mutateAsync: createOrder, isPending } = useMutation({mutationKey: ['createOrder'],
        mutationFn: async () => {
            return await handler(`/orders`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    orderItems: items.value,
                    orderTotal: Number(totalPrice.value),
                    delivery: shippingForm.value.delivery,
                    status: 'Convene'
                })
            })
        },

        onError: async (err) => {
            await openNotify('An error occurred.',
                'We are working on this issue please try again later.')

            console.error(`Ошибка при создании заказа`, err);
        }
    })

    return {
        createOrder,
        isPending
    }
};


