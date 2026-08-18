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

interface ShippingError {
    deliveryError: boolean
}

interface PaymentError {
    cardNumberError: boolean,
    expiryDateError: boolean,
    cardCvvError: boolean,
    paymentMethodError: boolean,
}

interface IsAgreeError {
    agreeError: boolean,
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