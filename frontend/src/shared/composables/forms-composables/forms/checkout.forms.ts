import { ref } from 'vue'

interface Information {
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    country: string,
    stateRegion: string,
    address: string,
    city: string,
    postalCode: number,
}

const information = ref<Information>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    stateRegion: '',
    address: '',
    city: '',
    postalCode: 0,
})

interface InformationMessages {
    emailMessage: string,
    phoneMessage: string,
    firstNameMessage: string,
    lastNameMessage: string,
    countryMessage: string,
    stateRegionMessage: string,
    addressMessage: string,
    cityMessage: string,
    postalCodeMessage: string,
}

const informationMessages = ref<InformationMessages>({
    emailMessage: '',
    phoneMessage: '',
    firstNameMessage: '',
    lastNameMessage: '',
    countryMessage: '',
    stateRegionMessage: '',
    addressMessage: '',
    cityMessage: '',
    postalCodeMessage: '',
})

interface Shipping {
    delivery: string,
}

const shipping = ref<Shipping>({
    delivery: '',
})

interface ShippingMessage {
    deliveryMessage: string,
}

const shippingMessages = ref<ShippingMessage>({
    deliveryMessage: ''
})

interface Payment {
    cardNumber: string,
    expiryDate: string,
    cvv: number,
    paymentMethod: string,
}

const payment = ref<Payment>({
    cardNumber: '',
    expiryDate: '',
    cvv: 0,
    paymentMethod: '',
})

interface PaymentMessage {
    cardNumberMessage: string,
    expiryDateMessage: string,
    cvvMessage: string,
    paymentMethodMessage: string,
};

const paymentMessages = ref<PaymentMessage>({
    cardNumberMessage: '',
    expiryDateMessage: '',
    cvvMessage: '',
    paymentMethodMessage: '',
})

interface IsAgree {
    agreeMessage: string,
}

const isAgreeForm = ref<IsAgree>({
    agreeMessage: ''
})

export const checkoutForms = () => {
    return {
        information,
        informationMessages,
        shipping,
        shippingMessages,
        payment,
        paymentMessages,
        isAgreeForm
    }
}