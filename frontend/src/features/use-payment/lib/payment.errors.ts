import {ref} from "vue";
import type { PaymentFormError } from "@/features/use-payment/model/payment.type.form.ts";

export const paymentFormErrors = ref<PaymentFormError>({
    cardNumberError: false,
    expiryDateError: false,
    cardCvvError: false,
    paymentMethodError: false,
})

