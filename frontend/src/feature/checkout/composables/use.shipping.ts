import { v4 as uuidv4 } from 'uuid';
import { handler } from "@/shared/api/http.ts";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms.ts";
import { useFormsErrors } from "@/shared/composables/errors/errors-middleware/forms.errors.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";
import { clearCheckoutForm } from "@/shared/composables/clear-forms/clear.checkout.ts";

const { shipping } = checkoutForms();
const { userShipping } = usersStore();
const { openNotify  } = useBaseModals();
const { clearPaymentForm } = clearCheckoutForm();
const { createSippingErrors } = useFormsErrors();

export const useShipping = () => {
    const getShipping = async () => {
        const paymentId = localStorage.getItem("paymentId");
        try{
            const res = await handler(`/shipping/${paymentId}`, {
                method: "GET",
            });
            console.log(res);
            userShipping.value = res;
        }catch(error){}
    };

    const addShipping = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const newShipping = await handler(`/shipping`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
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
            console.error(`Failed to register new payment:`, err);
        }
    };

    return {
        getShipping,
        addShipping,
    }
}