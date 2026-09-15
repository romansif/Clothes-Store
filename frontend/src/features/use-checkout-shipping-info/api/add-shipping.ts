import { v4 as uuidv4 } from 'uuid';
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { clearShippingForm } from "@/features/use-checkout-shipping-info/lib/clear-shipping.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetShipping } from "@/features/use-checkout-shipping-info/api/get-shipping.ts";
import { shippingForm } from "@/features/use-checkout-shipping-info/model/shipping.form.ts";
import { createSippingErrors } from "@/shared/lib/errors/api-create-shipping-errors.ts";

const { userData } = userStore();
const { openNotify  } = useBaseModals();
const { getShipping } = useGetShipping();

export const useAddShipping = () => {
    const addShipping = async () => {
        try{
            const newShipping = await handler(`/shipping`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.id,
                    paymentId: uuidv4(),
                    delivery: shippingForm.value.delivery,
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
            clearShippingForm();
        }catch(err){
            createSippingErrors(err)
            console.error(`Failed to register new sipping:`, err);
        }
    };

    return {
        addShipping,
    }
}