import { ref } from "vue";
import type {
    PaymentForm,
    PaymentFormErrorMessage
} from "@/entities/checkout-payment";

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
