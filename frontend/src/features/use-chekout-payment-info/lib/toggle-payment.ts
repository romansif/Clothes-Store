import { ref } from "vue";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment/model/payment.form.ts";

const paymentId = ref<string>('');

const isDebitCard = ref<boolean>(false);
const isSavedPayment = ref<boolean>(false);
const isChosenPayment = ref<boolean>(false);

export const togglePaymentForm = () => {
    const openCardForm = (method: string) => {
        isDebitCard.value = true;
        paymentForm.value.paymentMethod = method;
        paymentFormErrorMessage.value.paymentMethod= ''
    };

    const closeCardForm = (method: string) => {
        isDebitCard.value = false;
        paymentForm.value.paymentMethod = method
    };

    const toggleShowPayment = () => {
        isSavedPayment.value = !isSavedPayment.value;
    };

    return {
        paymentId,
        isDebitCard,
        isSavedPayment,
        isChosenPayment,
        openCardForm,
        closeCardForm,
        toggleShowPayment,
    }
}