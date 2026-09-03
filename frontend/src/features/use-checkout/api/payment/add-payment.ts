import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useAddOrder } from "@/features/use-order/api/add-order.ts";
import { useCheckout } from "@/features/use-checkout/model/use-checkout.ts";
import { useUpdateCart } from "@/features/use-cart/api/update-cart.ts";
import { clearCheckoutForm } from "@/features/use-checkout/lib/clear.checkout.ts";
import { checkoutStore } from "@/entities/checkout/model/checkout.store.ts";
import type { UserCheckoutPayment } from "@/entities/checkout/model/checkout.types.ts";
import { userStore } from "@/entities/profile/model/user.store.ts";

const { userData } = userStore();
const { addOrder } = useAddOrder();
const { payment } = checkoutForm();
const { openNotify } = useBaseModals();
const { paymentMethod } = checkoutStore();
const { clearPaymentForm } = clearCheckoutForm();
const { updateCheckedQuantity } = useUpdateCart();
const { isChosenPayment, paymentId } = useCheckout();
const { createPaymentMethodError, createPaymentCardErrors } = useFormsErrors();

export const useAddPayment = () => {
    const useSavedCard = (checkout: UserCheckoutPayment) => {
        paymentId.value = checkout.id;

        payment.value.cardName = checkout.cardName;
        payment.value.cardNumber = checkout.cardNumber;
        payment.value.expiryDate = checkout.expiryDate;
        payment.value.cardCvv = String(checkout.cardCvv);

        isChosenPayment.value = true;
    }

    const useSavedPayment = async () => {
        try{
            await handler(`/payment/${paymentId.value}`, {
                method: "PUT",
                body: JSON.stringify({
                    paymentMethod: 'card',
                    cardName: payment.value.cardName,
                    cardNumber: payment.value.cardNumber,
                    expiryDate: payment.value.expiryDate,
                    cardCvv: String(payment.value.cardCvv),
                })
            });
            await updateCheckedQuantity();
            await addOrder();

            await openNotify('You have successfully paid and created order.',
                'You will now be redirected to the profile page.', 'profile')
            clearPaymentForm();
        }catch(err){
            await openNotify('You must choose.',
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
                        cardName: payment.value.cardName,
                        cardNumber: payment.value.cardNumber,
                        expiryDate: payment.value.expiryDate,
                        cardCvv: String(payment.value.cardCvv),
                    })
                });
            }else{
                await handler(`/payment`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userData.id,
                        paymentId: paymentId,
                        paymentMethod: payment.value.paymentMethod
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