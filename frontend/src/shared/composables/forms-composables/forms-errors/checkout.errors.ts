import { ref } from 'vue'

interface InformationErrors {
    emailError: boolean,
    phoneError: boolean,
    firstNameError: boolean,
    lastNameError: boolean,
    countryError: boolean,
    stateRegionError: boolean,
    addressError: boolean,
    cityError: boolean,
    postalCodeError: boolean,
}

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

interface ShippingError {
    deliveryError: boolean
}

const shippingErrors = ref<ShippingError>({
    deliveryError: false
})

interface PaymentError {
    cardNumberError: boolean,
    expiryDateError: boolean,
    cvvError: boolean,
    paymentMethodError: boolean,
}

const paymentErrors = ref<PaymentError>({
    cardNumberError: false,
    expiryDateError: false,
    cvvError: false,
    paymentMethodError: false,
})

interface IsAgreeError {
    agreeError: boolean,
}

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