import { handler } from "@/shared/api/http";
import { useFormsErrors } from "@/shared/lib/errors/api-errors.ts";
import { checkoutForms } from "@/feature/checkout/model/checkout.forms.ts";
import { useBaseModals } from "@/shared/lib/base.modals.ts";
import { ordersApi } from "@/feature/orders/api/orders.api.ts";
import { checkoutApi } from "@/feature/checkout/api/checkout.api.ts";
import { cartApi } from "@/feature/cart/api/cart.api.ts";
import { clearCheckoutForm } from "@/feature/checkout/lib/clear.checkout.ts";
import { checkoutStore } from "@/feature/checkout/model/checkout.store.ts";
import type { UserCheckoutPayment } from "@/feature/checkout/model/checkout.types.ts";

const { addOrder } = ordersApi();
const { payment } = checkoutForms();
const { updateCheckedQuantity } = cartApi();
const { openNotify, loading } = useBaseModals();
const { clearPaymentForm } = clearCheckoutForm();
const { isChosenPayment, paymentId } = checkoutApi();
const { userPayments, userPayment, paymentMethod } = checkoutStore();
const { createPaymentMethodError, createPaymentCardErrors } = useFormsErrors();

export const paymentApi = () => {
    const getPayments = async () => {
        loading.value = true;

        const userId = localStorage.getItem("userId");
        try{
            const res = await handler(`/payment/${userId}`, {
                method: "GET",
            });
            console.log(res);
            userPayments.value = res;

            loading.value = false;
        }catch(err){
            console.error(`Failed to get the user res:`, err);
        }
    };

    const getPayment = async () => {
        loading.value = true;

        const paymentId = localStorage.getItem("paymentId");
        try{
            const res = await handler(`/payment/item/${paymentId}`, {
                method: "GET",
            });
            console.log(res);
            userPayment.value = res;

            loading.value = false;
        }catch(err){
            console.error(`Failed to get the user payment:`, err);
        }
    };

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
                'You will now be redirected to the useProfile page.', 'useProfile')
            clearPaymentForm();
        }catch(err){
            await openNotify('You must choose.',
                'Which card and payment method should we use for payment?', '')
            console.error(`Failed to register new payment:`, err);
        }
    }

    const addPayment = async () => {
        const userId = localStorage.getItem("userId");
        const paymentId =  localStorage.getItem("paymentId");
        try{
            if(paymentMethod.value === 'card'){
                await handler(`/payment`, {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
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
                        userId: userId,
                        paymentId: paymentId,
                        paymentMethod: payment.value.paymentMethod
                    })
                });
            }
            await updateCheckedQuantity();
            await addOrder();

            await openNotify('You have successfully paid and created order.',
                'You will now be redirected to the useProfile page.', 'useProfile')
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

    const deletePayment = async (id: string) => {
        try{
            await handler(`/payment/${id}`, {
                method: "DELETE",
            });

            await getPayments();
        }catch(err){
            console.error(`Failed to delete the user payment:`, err);
        }
    };

    return {
        getPayments,
        getPayment,

        useSavedCard,
        useSavedPayment,
        addPayment,

        deletePayment,
    }
}