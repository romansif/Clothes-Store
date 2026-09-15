import { handler } from "@/shared/api/http.ts";
import { shippingForm } from "@/features/use-checkout-shipping-info/model/shipping.form.ts";
import { orderStore } from "@/features/use-order/model/order.store.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { orderPriceInfo } from "@/features/use-checkout-order/lib/order-price-info.ts";

const { items } = orderStore();
const { userData } = userStore();
const { openNotify } = useBaseModals();
const { totalPrice } = orderPriceInfo();

export const useAddOrder = () => {
    const addOrder = async () => {
        try{
            await handler(`/orders`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.id,
                    orderItems: items.value,
                    orderTotal: Number(totalPrice.value),
                    delivery: shippingForm.value.delivery,
                    status: 'Convene'
                })
            })
        }catch(err){
            await openNotify('An error occurred',
                'We are working on this issue please try again later', '')
            console.error(`Failed to create the order:`, err);
        }
    };

    return{
        addOrder,
    }
}

