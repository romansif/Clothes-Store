import {ref} from "vue";
import {paymentStore} from "@/features/use-payment/model/payment.store.ts";
import { paymentFormErrors } from "@/features/use-payment/lib/payment.errors.ts";

const { paymentMethod } = paymentStore();

const paymentId = ref<string>('');

const isDebitCard = ref<boolean>(false);
const isSavedPayment = ref<boolean>(false);
const isChosenPayment = ref<boolean>(false);

export const togglePaymentForm = () => {
    const openCardForm = (method: string) => {
        isDebitCard.value = true;
        paymentMethod.value = method;
        paymentFormErrors.value.paymentMethodError = false
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