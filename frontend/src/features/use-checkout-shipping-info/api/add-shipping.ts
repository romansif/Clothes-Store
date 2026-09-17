import { v4 as uuidv4 } from 'uuid';
import { handler } from "@/shared/api/http.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { clearShippingForm } from "@/features/use-checkout-shipping-info/lib/clear-shipping.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useGetShipping } from "@/features/use-checkout-shipping-info/api/get-shipping.ts";
import { applyZodErrors, applyErrors } from "@/shared/lib/helper/errors-helper.ts";
import { shippingForm, shippingFormErrorMessage } from "@/features/use-checkout-shipping-info/model/shipping.form.ts";
import { addShippingSchema } from "@/features/use-checkout-shipping-info/model/shipping.schemas.ts";

const { userData } = userStore();
const { openNotify  } = useBaseModals();
const { getShipping } = useGetShipping();

export const useAddShipping = () => {
    const addShipping = async () => {
        const result = addShippingSchema.safeParse(shippingForm.value)
        if(!result.success){
            applyZodErrors(
                result.error,
                shippingFormErrorMessage
            );
            return
        }

        try{
            if(!userData.value) return

            const newShipping = await handler(`/shipping`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.value.id,
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
            applyErrors(
                err,
                shippingFormErrorMessage
            )
            console.error(`Failed to register new sipping:`, err);
        }
    };

    return {
        addShipping,
    }
}