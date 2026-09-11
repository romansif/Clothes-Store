import { ref } from "vue";
import { IMask } from "vue-imask";
import type { UserPayment } from "@/features/use-payment/model/payment.type.ts";

const userPayments = ref<UserPayment[]>([])
const userPayment = ref<UserPayment>({} as UserPayment)

const paymentMethod = ref<string>('')

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

export const paymentStore = () => {
    return {
        userPayments,
        userPayment,
        paymentMethod,
        cardNumberMask,
        expiryDateMask,
        cardCvvMask
    }
}