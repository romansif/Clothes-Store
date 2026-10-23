import router from "@/app/router";
import { v4 as uuidv4 } from 'uuid';
import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { clearShippingForm } from "@/features/checkout-shipping-info/lib/clear-shipping";
import { userStore } from "@/shared/model/user.store";
import { applyZodErrors, applyErrors } from "@/shared/lib/errors-helper";
import { shippingForm, shippingFormErrorMessage } from "@/entities/checkout-shipping/model/shipping-form";
import { addShippingSchema } from "@/entities/checkout-shipping/model/shipping-schemas";

const { userData } = userStore();
const { openNotify  } = useBaseModals();

export const addShipping = async () => {
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
            console.log('Не удалось получить id оплаты')
        }

        await openNotify('You have successfully added the shipping method',
            'You will now be redirected to the payment method selection page')
        await router.push({name: 'payment'})

        clearShippingForm();
    }catch(err){
        applyErrors(
            err,
            shippingFormErrorMessage
        )
        console.error(`Failed to register new sipping:`, err);
    }
};