import { handler } from "@/shared/api/http.ts";
import { useCheckout } from "@/features/use-checkout/model/use-checkout.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { orderStore } from "@/entities/order/model/order.store.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { items } = orderStore();
const { userData } = userStore();
const { shipping } = checkoutForm();
const { totalPrice } = useCheckout();

export const useAddOrder = () => {
    const addOrder = async () => {
        try{
            await handler(`/orders`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.id,
                    orderItems: items.value,
                    orderTotal: Number(totalPrice.value),
                    delivery: shipping.value.delivery,
                    status: 'Convene'
                })
            })
        }catch(err){
            console.error(`Failed to create the order:`, err);
        }
    };

    return{
        addOrder,
    }
}

