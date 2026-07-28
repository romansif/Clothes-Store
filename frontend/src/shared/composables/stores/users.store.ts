import { ref } from 'vue'

interface User {
    id: string,
    role: string,
    name: string,
    surName: string,
    companyName: string,
    privatePhone: string,
    publicPhone: string,
    email: string,
    password: string,
    avatarUrl: string,
    dateCreatedAccount: string,
    refreshTokens: object,
    userId: string
}

interface UserCheckoutAddress {
    id: string,
    userId: string
    email: string,
    phone: string,
    addressName: string,
    firstName: string,
    lastName: string,
    country: string,
    stateRegion: string,
    address: string,
    city: string,
    postalCode: number,
}

interface UserCheckoutPayment {
    id: string,
    userId: string
    delivery: string,
    cardName: string,
    cardNumber: string,
    expiryDate: string,
    cardCvv: number
    paymentMethod: string,
}

const users = ref<User[]>([])
const user = ref<User>({} as User)

const usersAddresses = ref<UserCheckoutAddress[]>([])
const userAddresses = ref<UserCheckoutAddress[]>([])
const userAddress = ref<UserCheckoutAddress>({} as UserCheckoutAddress)

const usersPayments = ref<UserCheckoutPayment[]>([])
const userPayments = ref<UserCheckoutPayment[]>([])
const userPayment = ref<UserCheckoutPayment>({} as UserCheckoutPayment)

const paymentMethod = ref<string>('')

const countries = [
    {
        code: 'UZ',
        name: 'UZ (+998)',
        dialCode: '+998',
        mask: '+{998} (00) 000-00-00',
        placeholder: '+000 (00) 000-00-00'
    },
    {
        code: 'KZ',
        name: 'KZ (+7)',
        dialCode: '+7',
        mask: '+{7} (000) 000-00-00',
        placeholder: '+0 (000) 000-00-00'
    },
    {
        code: 'RU',
        name: 'RU (+7)',
        dialCode: '+7',
        mask: '+{7} (000) 000-00-00',
        placeholder: '+0 (000) 000-00-00'
    },
    {
        code: 'US',
        name: 'US (+1)',
        dialCode: '+1',
        mask: '+{1} (000) 000-0000',
        placeholder: '+0 (00) 000-0000'
    },
]

const selectedCountryCode = ref('UZ');

export const usersStore = () => {
    return {
        users,
        user,

        usersAddresses,
        userAddresses,
        userAddress,

        usersPayments,
        userPayments,
        userPayment,

        paymentMethod,
        countries,
        selectedCountryCode,
    }
}