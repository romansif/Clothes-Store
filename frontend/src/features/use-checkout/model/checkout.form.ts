import { ref } from 'vue'
import { type Information, type Shipping, type Payment, type IsAgree,
    type InformationMessages, type ShippingMessage, type PaymentMessage } from "@/entities/checkout/model/checkout.types.form.ts";

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

export const checkoutForm = () => {
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