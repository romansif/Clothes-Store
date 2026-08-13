import { handler } from "@/shared/api/http";
import { useFormsErrors } from "@/shared/composables/errors/errors-middleware/forms.errors";
import { usersStore } from "@/shared/composables/stores/users.store";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { useBaseModals } from "@/shared/composables/modals/base.modals";
import { useOrders } from "@/feature/products/composables/use.orders.ts";
import { checkout } from "@/feature/checkout/composables/checkout.ts";
import { useCart } from "@/feature/products/composables/use.cart.ts";
import { clearCheckoutForm } from "@/shared/composables/clear-forms/clear.checkout.ts";

const { addOrder } = useOrders();
const { payment } = checkoutForms();
const { openNotify, loading } = useBaseModals();
const { updateCheckedQuantity } = useCart();
const { isChosenPayment, paymentId } = checkout();
const { clearPaymentForm } = clearCheckoutForm();
const { paymentMethod, userPayments, userPayment } = usersStore();
const { createPaymentMethodError, createPaymentCardErrors } = useFormsErrors();

export const usePayment = () => {
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

    const useSavedCard = (
        cardName: string, cardNumber: string, expiryDate: string, cardCvv: number, id: string) => {

        paymentId.value = id;

        payment.value.cardName = cardName;
        payment.value.cardNumber = cardNumber;
        payment.value.expiryDate = expiryDate;
        payment.value.cardCvv = String(cardCvv);

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