import { ref } from "vue";
import type { UserPayment } from "@/entities/checkout-payment/model/payment.type.ts";

const userPayments = ref<UserPayment[]>([])
const userPayment = ref<UserPayment | null>(null)
const paymentMethod = ref<string>('')

export const paymentStore = () => {
    return {
        userPayments,
        userPayment,
        paymentMethod,
    }
}