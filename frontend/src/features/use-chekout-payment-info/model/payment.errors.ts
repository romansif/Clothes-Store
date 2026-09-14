import {ref} from "vue";
import type { PaymentFormError } from "@/features/use-chekout-payment-info/model/payment.type.form.ts";

export const paymentFormErrors = ref<PaymentFormError>({
    cardNumber: false,
    expiryDate: false,
    cardCvv: false,
    paymentMethod: false,
})

