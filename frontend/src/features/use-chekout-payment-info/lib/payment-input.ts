import {computed} from "vue";
import { paymentFormErrorMessage } from "@/features/use-chekout-payment-info/model/payment.form.ts";
import { paymentFormErrors } from "@/features/use-chekout-payment-info/lib/payment.errors.ts";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";

const { userPayment } = paymentStore();

export const usePaymentFormInput = () => {
    const cardNumberPlaceholder = computed(() => {
        if(paymentFormErrors.value.cardNumberError){
            return paymentFormErrorMessage.value.cardNumberMessage;
        }
        if(userPayment.value.cardNumber){
            return userPayment.value.cardNumber;
        }
        return paymentFormErrorMessage.value.cardNumberMessage = 'XXXX-XXXX-XXXX-XXXX';
    });

    const expiryDatePlaceholder = computed(() => {
        if(paymentFormErrors.value.expiryDateError){
            return paymentFormErrorMessage.value.expiryDateMessage;
        }
        if(userPayment.value.expiryDate){
            return userPayment.value.expiryDate;
        }
        return paymentFormErrorMessage.value.expiryDateMessage = 'MM / YY';
    });

    const cardCvvPlaceholder = computed(() => {
        if(paymentFormErrors.value.cardCvvError){
            return paymentFormErrorMessage.value.cardCvvMessage;
        }
        if(userPayment.value.cardCvv){
            return String(userPayment.value.cardCvv);
        }
        return paymentFormErrorMessage.value.cardCvvMessage = '•••';
    });

    return {
        cardNumberPlaceholder,
        expiryDatePlaceholder,
        cardCvvPlaceholder,
    }
}