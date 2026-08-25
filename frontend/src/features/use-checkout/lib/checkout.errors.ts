import { ref } from 'vue'
import { type InformationErrors, type ShippingError,
    type PaymentError, type IsAgreeError } from "@/entities/checkout/model/checkout.types.form.ts";

const informationErrors = ref<InformationErrors>({
    emailError: false,
    phoneError: false,
    firstNameError: false,
    lastNameError: false,
    countryError: false,
    stateRegionError: false,
    addressError: false,
    cityError: false,
    postalCodeError: false,

})

const shippingErrors = ref<ShippingError>({
    deliveryError: false
})

const paymentErrors = ref<PaymentError>({
    cardNumberError: false,
    expiryDateError: false,
    cardCvvError: false,
    paymentMethodError: false,
})

const isAgreeFormError = ref<IsAgreeError>({
    agreeError: false,
})

export const checkoutErrors = () => {
    return {
        informationErrors,
        shippingErrors,
        paymentErrors,
        isAgreeFormError
    }
}