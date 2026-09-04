import { v4 as uuidv4 } from 'uuid';
import { handler } from "@/shared/api/http.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { clearCheckoutForm } from "@/features/use-checkout/lib/clear.checkout.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";
import { useGetShipping } from "@/features/use-checkout/api/shipping/get-shipping.ts";

const { userData } = userStore();
const { shipping } = checkoutForm();
const { openNotify  } = useBaseModals();
const { getShipping } = useGetShipping();
const { clearPaymentForm } = clearCheckoutForm();
const { createSippingErrors } = useFormsErrors();

export const useAddShipping = () => {
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
            if(newShipping){
                localStorage.setItem("paymentId", newShipping.paymentId);
            }else{
                console.log('Не удалос получить id оплаты')
            }

            await getShipping();

            await openNotify('You have successfully added the shipping method.',
                'You will now be redirected to the payment method selection page.', 'payment')
            clearPaymentForm();
        }catch(err){
            createSippingErrors(err)
            console.error(`Failed to register new sipping:`, err);
        }
    };

    return {
        addShipping,
    }
}