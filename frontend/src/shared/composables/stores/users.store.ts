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

        paymentMethod
    }
}