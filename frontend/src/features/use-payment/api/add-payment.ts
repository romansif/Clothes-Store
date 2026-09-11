import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useAddOrder } from "@/features/use-order/api/add-order.ts";
import { useCheckout } from "@/features/use-checkout/lib/use-checkout.ts";
import { useUpdateCart } from "@/features/use-cart/api/update-cart.ts";
import { paymentForm } from "@/features/use-payment/model/payment.form.ts";
import { clearPaymentForm } from "@/features/use-payment/lib/clear.payment.ts";
import type { UserPayment } from "@/features/use-payment/model/payment.type.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { paymentStore } from "@/features/use-payment/model/payment.store.ts";

const { userData } = userStore();
const { addOrder } = useAddOrder();
const { openNotify } = useBaseModals();
const { paymentMethod } = paymentStore();
const { updateCheckedQuantity } = useUpdateCart();
const { isChosenPayment, paymentId } = useCheckout();
const { createPaymentMethodError, createPaymentCardErrors } = useFormsErrors();

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
            await addOrder();

            await openNotify('You have successfully paid and created order.',
                'You will now be redirected to the profile page.', 'profile')
            clearPaymentForm();
        }catch(err){
            await openNotify('You must choose',
                'Which card and payment method should we use for payment?', '')
            console.error(`Failed to register new payment:`, err);
        }
    }

    const addPayment = async () => {
        const paymentId =  localStorage.getItem("paymentId");
        try{
            if(paymentMethod.value === 'card'){
                await handler(`/payment`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userData.id,
                        paymentId: paymentId,
                        paymentMethod: 'card',
                        cardName: paymentForm,
                        cardNumber: paymentForm.value.cardNumber,
                        expiryDate: paymentForm.value.expiryDate,
                        cardCvv: String(paymentForm.value.cardCvv),
                    })
                });
            }else{
                await handler(`/payment`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userData.id,
                        paymentId: paymentId,
                        paymentMethod: paymentForm.value.paymentMethod
                    })
                });
            }
            await updateCheckedQuantity();
            await addOrder();

            await openNotify('You have successfully paid and created order.',
                'You will now be redirected to the profile page.', 'profile')
            clearPaymentForm();
        }catch(err){
            if (paymentMethod.value === 'card'){
                createPaymentCardErrors(err);
            }else{
                createPaymentMethodError(err);
            }
            console.error(`Failed to register new payment:`, err);
        }
    };

    return {
        useSavedCard,
        useSavedPayment,
        addPayment,
    }
}