import { handler } from "@/shared/api/http";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { orderStore } from "@/shared/model/order.store";

const { orderItems } = orderStore();

export const useUnCheckCartItem = () => {
    const queryClient = useQueryClient()
    const userId = localStorage.getItem("userId");

    const { mutateAsync: unCheckCartItem, isPending } = useMutation({mutationKey: ['unCheckCartItem'],
        mutationFn: async () => {
            const allCartItems = await handler(`/cart/${userId}`, {
                method: "GET"
            });
            for(const item of allCartItems) {
                await handler(`/cart/${item.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        checked: false
                    })
                })
            }
        },

        onSuccess: async () => {
            orderItems.value = [];

            await queryClient.invalidateQueries({queryKey: ['cart']})
        },

        onError: (err) => {
            console.error(`Ошибка при изменения статуса товаров корзины`, err);
        }
    })

    return {
        unCheckCartItem,
        isPending
    }
};
