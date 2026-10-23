import { handler } from "@/shared/api/http";
import { orderStore } from "@/shared/model/order.store";
import { userStore } from "@/shared/model/user.store";
import { useBaseModals } from "@/shared/lib/use-notify";
import { orderPriceInfo } from "@/features/checkout-order-info/lib/order-price-info";
import { shippingForm } from "@/entities/checkout-shipping/model/shipping-form";

const { items } = orderStore();
const { userData } = userStore();
const { openNotify } = useBaseModals();
const { totalPrice } = orderPriceInfo();

export const createOrder = async () => {
    if(!userData.value) return

    try{
        await handler(`/orders`, {
            method: "POST",
            body: JSON.stringify({
                userId: userData.value.id,
                orderItems: items.value,
                orderTotal: Number(totalPrice.value),
                delivery: shippingForm.value.delivery,
                status: 'Convene'
            })
        })
    }catch(err){
        await openNotify('An error occurred.',
            'We are working on this issue please try again later.')
        console.error(`Failed to create the order:`, err);
    }
};


