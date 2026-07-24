import { ref } from 'vue'

interface Information {
    addressName: string
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    country: string,
    stateRegion: string,
    address: string,
    city: string,
    postalCode: string,
}

const information = ref<Information>({
    addressName: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    stateRegion: '',
    address: '',
    city: '',
    postalCode: '',
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
    emailMessage: 'example@gmail.com',
    phoneMessage: '+000 (00) 000-00-00',
    firstNameMessage: 'FirstName',
    lastNameMessage: 'LastName',
    countryMessage: 'Country',
    stateRegionMessage: 'State/Region',
    addressMessage: 'Address',
    cityMessage: 'City',
    postalCodeMessage: 'Postal Code',
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
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cardCvv: string,
    paymentMethod: string,
}

const payment = ref<Payment>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cardCvv: '',
    paymentMethod: '',
})

interface PaymentMessage {
    cardNumberMessage: string,
    expiryDateMessage: string,
    cardCvvMessage: string,
    paymentMethodMessage: string,
}

const paymentMessages = ref<PaymentMessage>({
    cardNumberMessage: '',
    expiryDateMessage: '',
    cardCvvMessage: '',
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