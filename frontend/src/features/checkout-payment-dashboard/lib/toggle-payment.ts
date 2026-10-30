import { ref } from "vue";

import type { PaymentMethods } from "@/entities/checkout-payment-form";
import {
    paymentForm,
    paymentFormErrorMessage,
} from "@/entities/checkout-payment-form/model/payment-form";
import { isSavedPayment } from "@/entities/checkout-payment-item/model/payment.refs";

const paymentId = ref<string>("");
const isDebitCard = ref<boolean>(false);

export const togglePaymentForm = () => {
    const openCardForm = (method: PaymentMethods) => {
        isDebitCard.value = true;
        paymentForm.value.paymentMethod = method;
        paymentFormErrorMessage.value.paymentMethod = "";
    };

    const closeCardForm = (method: PaymentMethods) => {
        isDebitCard.value = false;
        paymentForm.value.paymentMethod = method;
    };

    const toggleShowPayment = () => {
        isSavedPayment.value = !isSavedPayment.value;
    };

    return {
        paymentId,
        isDebitCard,
        openCardForm,
        closeCardForm,
        toggleShowPayment,
    };
};
