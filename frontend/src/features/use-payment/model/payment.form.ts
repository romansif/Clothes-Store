import {ref} from "vue";
import type { PaymentForm, PaymentFormErrorMessage } from "@/features/use-payment/model/payment.type.form.ts";

export const paymentForm = ref<PaymentForm>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cardCvv: '',
    paymentMethod: '',
})

export const paymentFormErrorMessage = ref<PaymentFormErrorMessage>({
    cardNumberMessage: '',
    expiryDateMessage: '',
    cardCvvMessage: '',
    paymentMethodMessage: '',
})