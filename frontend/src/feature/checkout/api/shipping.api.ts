import { v4 as uuidv4 } from 'uuid';
import { handler } from "@/shared/api/http.ts";
import { checkoutForm } from "@/feature/checkout/model/checkout.form.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { clearCheckoutForm } from "@/feature/checkout/lib/clear.checkout.ts";
import { checkoutStore } from "@/entities/checkout/checkout.store.ts";
import { userStore } from "@/entities/profile/user.store.ts";

const { userData } = userStore();
const { shipping } = checkoutForm();
const { userShipping } = checkoutStore();
const { openNotify  } = useBaseModals();
const { clearPaymentForm } = clearCheckoutForm();
const { createSippingErrors } = useFormsErrors();

export const shippingApi = () => {
    const getShipping = async () => {
        const paymentId = localStorage.getItem("paymentId");
        try{
            const res = await handler(`/shipping/${paymentId}`, {
                method: "GET",
            });
            console.log(res);
            userShipping.value = res;
        }catch(err){
            console.error(`Failed to get the shipping:`, err);
        }
    };

    const addShipping = async () => {
        try{
            const newShipping = await handler(`/shipping`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.id,
                    paymentId: uuidv4(),
                    delivery: shipping.value.delivery,
                })
            });
            userShipping.value = newShipping;

            if(newShipping){
                localStorage.setItem("paymentId", newShipping.paymentId);
            }else{
                console.log('Не удалос получить id оплаты')
            }

            await openNotify('You have successfully added the shipping method.',
                'You will now be redirected to the payment method selection page.', 'payment')
            clearPaymentForm();
        }catch(err){
            createSippingErrors(err)
            console.error(`Failed to register new sipping:`, err);
        }
    };

    return {
        getShipping,

        addShipping,
    }
}