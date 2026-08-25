import { checkoutForm } from "@/feature/use-checkout/model/checkout.form.ts";
import { checkoutErrors } from "@/feature/use-checkout/lib/checkout.errors.ts";

const { informationErrors, shippingErrors, paymentErrors } = checkoutErrors();
const { information, informationMessages, shipping, shippingMessages, payment, paymentMessages} = checkoutForm();

export const clearCheckoutForm = () => {
    const clearInformationForm = () => {
        information.value.addressName = '';
        information.value.email = '';
        information.value.phone = '';
        information.value.firstName = '';
        information.value.lastName = '';
        information.value.country = '';
        information.value.stateRegion = '';
        information.value.address = '';
        information.value.city = '';
        information.value.postalCode = '';

        informationMessages.value.emailMessage = '';
        informationMessages.value.phoneMessage = '';
        informationMessages.value.firstNameMessage = '';
        informationMessages.value.lastNameMessage = '';
        informationMessages.value.countryMessage = '';
        informationMessages.value.stateRegionMessage = '';
        informationMessages.value.addressMessage = '';
        informationMessages.value.cityMessage = '';
        informationMessages.value.postalCodeMessage = '';


        informationErrors.value.emailError = false;
        informationErrors.value.phoneError = false;
        informationErrors.value.firstNameError = false;
        informationErrors.value.lastNameError = false;
        informationErrors.value.countryError = false;
        informationErrors.value.stateRegionError = false;
        informationErrors.value.addressError = false;
        informationErrors.value.cityError = false;
        informationErrors.value.postalCodeError = false;
    };

    const clearShippingForm = () => {
        shipping.value.delivery = '';

        shippingMessages.value.deliveryMessage = '';

        shippingErrors.value.deliveryError = false;
    };

    const clearPaymentForm = () => {
        payment.value.cardName = '';
        payment.value.cardNumber = '';
        payment.value.expiryDate = '';
        payment.value.cardCvv = '';
        payment.value.paymentMethod = '';

        paymentMessages.value.cardNumberMessage = '';
        paymentMessages.value.expiryDateMessage = '';
        paymentMessages.value.cardCvvMessage = '';
        paymentMessages.value.paymentMethodMessage = '';

        paymentErrors.value.cardNumberError = false;
        paymentErrors.value.expiryDateError = false;
        paymentErrors.value.cardCvvError = false;
        paymentErrors.value.paymentMethodError = false;
    };

    return {
        clearInformationForm,
        clearShippingForm,
        clearPaymentForm
    }
}