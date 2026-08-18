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

interface Shipping {
    delivery: string,
}

interface Payment {
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cardCvv: string,
    paymentMethod: string,
}

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

interface ShippingMessage {
    deliveryMessage: string,
}

interface PaymentMessage {
    cardNumberMessage: string,
    expiryDateMessage: string,
    cardCvvMessage: string,
    paymentMethodMessage: string,
}

interface IsAgree {
    agreeMessage: string,
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


const shipping = ref<Shipping>({
    delivery: '',
})


const payment = ref<Payment>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cardCvv: '',
    paymentMethod: '',
})

const isAgreeForm = ref<IsAgree>({
    agreeMessage: ''
})

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

const shippingMessages = ref<ShippingMessage>({
    deliveryMessage: ''
})

const paymentMessages = ref<PaymentMessage>({
    cardNumberMessage: '',
    expiryDateMessage: '',
    cardCvvMessage: '',
    paymentMethodMessage: '',
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