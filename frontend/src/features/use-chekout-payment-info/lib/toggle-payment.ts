import { ref } from "vue";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";
import { paymentFormErrorMessage } from "@/entities/checkout-payment/model/payment.form.ts";

const { paymentMethod } = paymentStore();

const paymentId = ref<string>('');

const isDebitCard = ref<boolean>(false);
const isSavedPayment = ref<boolean>(false);
const isChosenPayment = ref<boolean>(false);

export const togglePaymentForm = () => {
    const openCardForm = (method: string) => {
        isDebitCard.value = true;
        paymentMethod.value = method;
        paymentFormErrorMessage.value.paymentMethod= ''
    };

    const closeCardForm = (method: string) => {
        isDebitCard.value = false;
        paymentMethod.value = method
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