import {ref} from "vue";
import type {
    PaymentForm,
    PaymentFormError,
    PaymentFormErrorMessage
} from "@/features/use-chekout-payment-info/model/payment.type.form.ts";

export const paymentForm = ref<PaymentForm>({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cardCvv: '',
    paymentMethod: '',
});

export const paymentFormErrorMessage = ref<PaymentFormErrorMessage>({
    cardNumber: '',
    expiryDate: '',
    cardCvv: '',
    paymentMethod: '',
});

export const paymentFormErrors = ref<PaymentFormError>({
    cardNumber: false,
    expiryDate: false,
    cardCvv: false,
    paymentMethod: false,
})