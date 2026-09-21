import { computed } from "vue";
import { paymentStore } from "@/features/use-user-payment/model/payment.store.ts";
import { paymentFormErrorMessage } from "@/entities/checkout-payment/model/payment.form.ts";

const { userPayment } = paymentStore();

export const usePaymentFormInput = () => {
    const cardNumberPlaceholder = computed(() => {
        if(paymentFormErrorMessage.value.cardNumber){
            return paymentFormErrorMessage.value.cardNumber;
        }
        if(userPayment.value.cardNumber){
            return userPayment.value.cardNumber;
        }
        return paymentFormErrorMessage.value.cardNumber = 'XXXX-XXXX-XXXX-XXXX';
    });

    const expiryDatePlaceholder = computed(() => {
        if(paymentFormErrorMessage.value.expiryDate){
            return paymentFormErrorMessage.value.expiryDate;
        }
        if(userPayment.value.expiryDate){
            return userPayment.value.expiryDate;
        }
        return paymentFormErrorMessage.value.expiryDate = 'MM / YY';
    });

    const cardCvvPlaceholder = computed(() => {
        if(paymentFormErrorMessage.value.cardCvv){
            return paymentFormErrorMessage.value.cardCvv;
        }
        if(userPayment.value.cardCvv){
            return String(userPayment.value.cardCvv);
        }
        return paymentFormErrorMessage.value.cardCvv = '•••';
    });

    return {
        cardNumberPlaceholder,
        expiryDatePlaceholder,
        cardCvvPlaceholder,
    }
}