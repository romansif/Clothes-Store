import router from "@/app/router";
import { handler } from "@/shared/api/http.ts";
import { useFormsErrors } from "@/shared/composables/errors/errors-middleware/forms.errors.ts";
import { usersStore } from "@/shared/composables/stores/users.store.ts";
import { useAddProducts } from "@/feature/products/composables/use-add-products.ts";
import { useGetProfile } from "@/feature/profile/profile-composables/get-profile-info.ts";
import { useProductsModals } from "@/shared/composables/modals/products.modals.ts";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms.ts";

const { addOrder } = useAddProducts();
const { openNotify } = useProductsModals();
const { getAddresses, getPayments } = useGetProfile();
const { information, shipping, payment } = checkoutForms();
const { paymentMethod, userAddresses, userPayments } = usersStore();
const { createInformationErrors, createSippingErrors, createPaymentMethodError, createPaymentCardErrors } = useFormsErrors();

export const useAddCheckout = () => {
    const addAddress = async () => {
        try{
            const userId = localStorage.getItem("userId");

            const newAddress = await handler(`/checkout/address`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    addressName: information.value.addressName,
                    email: information.value.email,
                    phone: information.value.phone,
                    firstName: information.value.firstName,
                    lastName: information.value.lastName,
                    country: information.value.country,
                    stateRegion: information.value.stateRegion,
                    address: information.value.address,
                    city: information.value.city,
                    postalCode: information.value.postalCode,
                })
            });
            userAddresses.value = newAddress;

            if(newAddress && newAddress.id) {
                localStorage.setItem("addressId", newAddress.id);
                console.log("Успешно сохранено в localStorage!");
            }else{
                console.error("Ошибка: id отсутствует в ответе сервера. Проверьте контроллер бэкенда!");
            }
            await getAddresses();

            await router.push({ name: 'shipping' })
            openNotify('You have successfully added the shipping address.',
                'You can click the button to the left of the "X" to go to the shipping methods.')
        }catch(err){
            createInformationErrors(err);
            console.error(`Failed to create the new address:`, err);
        }
    };

    const addShipping = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const newShipping = await handler(`/checkout/payment`, {
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

            await router.push({ name: 'payment' })
            openNotify('You have successfully added the shipping method.',
                'You can click the button to the left of the "X" to go to the payment.')
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
                const cardNumber = await handler(`/checkout/payment/${paymentId}`, {
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
                const paymentMethod = await handler(`/checkout/payment/${paymentId}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        paymentMethod: payment.value.paymentMethod
                    })
                });
                userPayments.value = paymentMethod;
            }
            await addOrder();
            await getPayments();

            await router.push({ name: 'profile' })
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
        addAddress,
        addShipping,
        addPayment,
    }

}