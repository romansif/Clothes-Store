import router from "@/app/router";
import { handler } from "@/shared/api/http";
import { useBaseModals } from "@/shared/lib/use-notify";
import { createOrder } from "@/features/checkout-payment-dashboard/api/create-order";
import { clearPaymentForm } from "@/features/checkout-payment-dashboard/lib/clear-payment";
import { userStore } from "@/shared/model/user.store";
import { updateCheckedQuantity } from "@/features/checkout-payment-dashboard/api/update-order-item";
import { togglePaymentForm } from "@/features/checkout-payment-dashboard/lib/toggle-payment";
import { applyZodErrors, applyErrors } from "@/shared/lib/errors-helper";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment-form/model/payment-form";
import { isChosenPayment } from "@/entities/checkout-payment-item/model/payment.refs";
import { addPaymentSchema } from "@/entities/checkout-payment-form/model/payment-schemas";
import type { UserPayment } from "@/entities/checkout-payment-item";

const { userData } = userStore();
const { openNotify } = useBaseModals();
const { paymentId } = togglePaymentForm();

export const useAddPayment = () => {
    const useSavedCard = (card: UserPayment) => {
        paymentId.value = card.id;

        paymentForm.value.cardName = card.cardName;
        paymentForm.value.cardNumber = card.cardNumber;
        paymentForm.value.expiryDate = card.expiryDate;
        paymentForm.value.cardCvv = String(card.cardCvv);

        isChosenPayment.value = true;
    }

    const useSavedPayment = async () => {
        try{
            await handler(`/payment/${paymentId.value}`, {
                method: "PUT",
                body: JSON.stringify({
                    paymentMethod: 'card',
                    cardName: paymentForm.value.cardName,
                    cardNumber: paymentForm.value.cardNumber,
                    expiryDate: paymentForm.value.expiryDate,
                    cardCvv: String(paymentForm.value.cardCvv),
                })
            });
            await updateCheckedQuantity();
            await createOrder();

            await openNotify('You have successfully paid and created order',
                'You will now be redirected to the profile page')
            await router.push({name: 'profile'})

            clearPaymentForm();
        }catch(err){
            await openNotify('You must choose',
                'Which card and payment method should we use for payment?')
            console.error(`Failed to register new payment:`, err);
        }
    }

    const addPayment = async () => {
        console.log('1 START');

        const paymentId =  localStorage.getItem("paymentId");

        const result = addPaymentSchema.safeParse(paymentForm.value)
        if(!result.success){
            applyZodErrors(
                result.error,
                paymentFormErrorMessage
            );
            return
        }

        try{
            if(!userData.value) return

            console.log('2 BEFORE PAYMENT');

            if(paymentForm.value.paymentMethod === 'card'){
                await handler(`/payment`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userData.value.id,
                        paymentId: paymentId,
                        paymentMethod: 'card',
                        cardName: paymentForm.value.paymentMethod,
                        cardNumber: paymentForm.value.cardNumber,
                        expiryDate: paymentForm.value.expiryDate,
                        cardCvv: String(paymentForm.value.cardCvv),
                    })
                });
            }else{
                await handler(`/payment`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userData.value.id,
                        paymentId: paymentId,
                        paymentMethod: paymentForm.value.paymentMethod
                    })
                });
            }
            await updateCheckedQuantity();
            await createOrder();

            await openNotify('You have successfully paid and created order',
                'You will now be redirected to the profile page')
            await router.push({name: 'profile'})

            clearPaymentForm();
        }catch(err){
            applyErrors(
                err,
                paymentFormErrorMessage
            );
            console.error(`Failed to register new payment:`, err);
        }
    };

    return {
        useSavedCard,
        useSavedPayment,
        addPayment,
    }
}