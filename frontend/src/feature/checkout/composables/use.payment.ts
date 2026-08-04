import { handler } from "@/shared/api/http";
import { useFormsErrors } from "@/shared/composables/errors/errors-middleware/forms.errors";
import { usersStore } from "@/shared/composables/stores/users.store";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { useBaseModals } from "@/shared/composables/modals/base.modals";
import { useOrders } from "@/feature/products/composables/use.orders.ts";

const { addOrder } = useOrders();
const { openNotify } = useBaseModals();
const { shipping, payment } = checkoutForms();
const { paymentMethod, userPayments, userPayment } = usersStore();
const { createSippingErrors, createPaymentMethodError, createPaymentCardErrors } = useFormsErrors();

export const usePayment = () => {
    const getPayments = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const payments = await handler(`/payment/${userId}`, {
                method: "GET",
            });
            userPayments.value = payments;
        }catch(err){
            console.error(`Failed to get the user payments:`, err);
        }
    };

    const getPayment = async () => {
        const paymentId = localStorage.getItem("paymentId");
        try{
            const payments = await handler(`/payment/item/${paymentId}`, {
                method: "GET",
            });
            userPayment.value = payments
        }catch(err){
            console.error(`Failed to get the user payment:`, err);
        }
    };

    const addShipping = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const newShipping = await handler(`/payment`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    delivery: shipping.value.delivery,
                })
            });
            userPayments.value = newShipping;

            if(newShipping && newShipping.id) {
                localStorage.setItem("paymentId", newShipping.id);
                console.log("Успешно сохранено в localStorage!");
            }else{
                console.error("Ошибка: id отсутствует в ответе сервера. Проверьте контроллер бэкенда!");
            }
            await getPayments()

            await openNotify('You have successfully added the shipping method.',
                'You will now be redirected to the payment method selection page.', 'payment')
        }catch(err){
            createSippingErrors(err)
            console.error(`Failed to register new payment:`, err);
        }
    };

    const addPayment = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const paymentId = localStorage.getItem("paymentId");
            if(!paymentId){
                console.error("Ошибка: ID чекаута не найден в localStorage!");
                return;
            }

            if(paymentMethod.value === 'card'){
                const cardNumber = await handler(`/payment/${paymentId}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        userId: userId,
                        paymentMethod: 'card',
                        cardName: payment.value.cardName,
                        cardNumber: payment.value.cardNumber,
                        expiryDate: payment.value.expiryDate,
                        cardCvv: String(payment.value.cardCvv),
                    })
                });
                userPayments.value = cardNumber;
            }else{
                const paymentMethod = await handler(`/payment/${paymentId}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        paymentMethod: payment.value.paymentMethod
                    })
                });
                userPayments.value = paymentMethod;
            }
            await addOrder();
            await getPayments();

            await openNotify('You have successfully added the payment method.',
                'You will now be redirected to the profile page.', 'profile')
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
        addShipping,
        addPayment,
        deletePayment,
    }
}