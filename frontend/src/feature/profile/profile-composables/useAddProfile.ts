import { useGetProfile } from "./getProfile.ts";
import { ApiError, handler } from "../../../shared/api/http.ts";
import { useAddProducts } from "../../products/composables/useAddProducts.ts";
import { usersStore } from "../../../shared/composables/stores/users.store.ts";
import { checkoutErrors } from "../../../shared/composables/forms-composables/forms-errors/checkout.errors.ts";
import { checkoutForms } from "../../../shared/composables/forms-composables/forms/checkout.forms.ts";
import { clearCheckoutForm } from "../../../shared/composables/forms-composables/clear-forms/clear.checkout.ts";
import { useProductsModals } from "../../../shared/composables/modals/products/productsModals.ts";

const { addOrder } = useAddProducts();
const { getAddresses, getPayments } = useGetProfile();
const { openNotify } = useProductsModals();
const { paymentMethod, userAddresses, userPayments } = usersStore();
const { clearInformationForm } = clearCheckoutForm();

const { informationErrors, shippingErrors, paymentErrors } = checkoutErrors();
const { information, informationMessages, shipping, shippingMessages, payment, paymentMessages } = checkoutForms();

export const useAddProfile = () => {
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

            await getAddresses();

            if(newAddress && newAddress.id) {
                localStorage.setItem("addressId", newAddress.id);
                console.log("Успешно сохранено в localStorage!");
            }else{
                console.error("Ошибка: id отсутствует в ответе сервера. Проверьте контроллер бэкенда!");
            }

            openNotify('You have successfully added the shipping address.',
                'You can click the button to the left of the "X" to go to the shipping methods.', '/checkout/ShippingPage')
            clearInformationForm();
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string>;
                if(errors){
                    informationErrors.value.emailError = !!errors.email;
                    informationErrors.value.phoneError = !!errors.phone;
                    informationErrors.value.firstNameError = !!errors.firstName;
                    informationErrors.value.lastNameError = !!errors.lastName;
                    informationErrors.value.countryError = !!errors.country;
                    informationErrors.value.stateRegionError = !!errors.stateRegion;
                    informationErrors.value.addressError = !!errors.address;
                    informationErrors.value.cityError = !!errors.city;
                    informationErrors.value.postalCodeError = !!errors.postalCode;

                    informationMessages.value.emailMessage = errors.email || '';
                    informationMessages.value.phoneMessage = errors.phone || '';
                    informationMessages.value.firstNameMessage = errors.firstName || '';
                    informationMessages.value.lastNameMessage = errors.lastName || '';
                    informationMessages.value.countryMessage = errors.country || '';
                    informationMessages.value.stateRegionMessage = errors.stateRegion || '';
                    informationMessages.value.addressMessage = errors.address || '';
                    informationMessages.value.cityMessage = errors.city || '';
                    informationMessages.value.postalCodeMessage = errors.postalCode || '';
                }
            }
            console.log('Не удалось добавить аддресс доставки', err);
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

            openNotify('You have successfully added the shipping method.',
                'You can click the button to the left of the "X" to go to the payment.', '/checkout/PaymentPage')
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string>;
                if(errors){
                    shippingErrors.value.deliveryError = !!errors.delivery;

                    shippingMessages.value.deliveryMessage = errors.delivery || '';
                }
            }
            console.log('Не удалось добавить способ доставки или оплаты', err);
        }
    };

    const addPayment = async () => {
        const userId = localStorage.getItem("userId");
        try{
            const paymentId = localStorage.getItem("paymentId");
            if (!paymentId) {
                console.error("Ошибка: ID чекаута не найден в localStorage!");
                return;
            }

            if(paymentMethod.value === 'card'){
                const cardNumber = await handler(`/checkout/payment/${paymentId}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        userId: userId,
                        cardName: payment.value.cardName,
                        cardNumber: payment.value.cardNumber,
                        expiryDate: payment.value.expiryDate,
                        cardCvv: Number(payment.value.cardCvv),
                    })
                });
                userPayments.value = cardNumber
            }

            if(paymentMethod.value === 'apple' || paymentMethod.value === 'google' || paymentMethod.value === 'paypal'){
                const paymentMethod = await handler(`/checkout/payment/${paymentId}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        paymentMethod: payment.value.paymentMethod
                    })
                })

                userPayments.value = paymentMethod
            }

            await addOrder()

            await getPayments()
            openNotify('You have successfully added the payment method.',
                'You can click the button to the left of the "X" to go to the profile.', '/profile/ProfilePage')
        }catch(err){
            if(err instanceof ApiError){
                const errors = err.response as Record<string, string>;;
                if(errors){
                    paymentErrors.value.cardNumberError = !!errors.cardNumber;
                    paymentErrors.value.expiryDateError = !!errors.expiryDate;
                    paymentErrors.value.cardCvvError = !!errors.cardCvv;
                    paymentErrors.value.paymentMethodError = !!errors.paymentMethod;

                    paymentMessages.value.cardNumberMessage = errors.cardNumber || '';
                    paymentMessages.value.expiryDateMessage = errors.expiryDate || '';
                    paymentMessages.value.cardCvvMessage = errors.cardCvv || '';
                    paymentMessages.value.paymentMethodMessage = errors.paymentMethod || '';
                }
            }
            console.log('Не удалось добавить способ доставки или оплаты', err);
        }
    };

    return {
        addAddress,
        addShipping,
        addPayment,
    }

}