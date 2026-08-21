import { ref } from "vue";
import { IMask } from "vue-imask";
import { type UserCheckoutAddress,
    type UserCheckoutShipping, type UserCheckoutPayment } from "@/feature/checkout/model/checkout.types.ts";

const userAddresses = ref<UserCheckoutAddress[]>([])
const userAddress = ref<UserCheckoutAddress>({} as UserCheckoutAddress)

const userShipping = ref<UserCheckoutShipping[]>([])

const userPayments = ref<UserCheckoutPayment[]>([])
const userPayment = ref<UserCheckoutPayment>({} as UserCheckoutPayment)

const deliveryPrice = ref<number>(0);
const paymentMethod = ref<string>('')

const postalCode = {
    mask: '0000[00]',
    lazy: false
}

const cardNumberMask = {
    mask: '0000-0000-0000-0000',
    lazy: false,
}

const expiryDateMask = {
    mask: '00/00',
    blocks: {
        MM:{
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2
        },
        YY:{
            mask: IMask.MaskedRange,
            from: 26,
            to: 32,
            maxLength: 2
        }
    },
    lazy: false
}

const cardCvvMask = {
    mask: '000[0]',
    lazy: false
}

export const checkoutStore = () => {
    return {
        userAddresses,
        userAddress,

        userShipping,

        userPayments,
        userPayment,

        deliveryPrice,
        paymentMethod,

        postalCode,
        cardNumberMask,
        expiryDateMask,
        cardCvvMask
    }
}