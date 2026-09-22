import { paymentFormErrorMessage } from "@/entities/checkout-payment/model/payment.form.ts";

export const cardNumberPlaceholder = (cardNumber: string | undefined) => {
    if (!cardNumber) return;

    if(paymentFormErrorMessage.value.cardNumber){
        return paymentFormErrorMessage.value.cardNumber;
    }
    if(cardNumber){
        return cardNumber;
    }
    return paymentFormErrorMessage.value.cardNumber = 'XXXX-XXXX-XXXX-XXXX';
};

export const expiryDatePlaceholder = (expiryDate: string | undefined) => {
    if (!expiryDate) return;

    if(paymentFormErrorMessage.value.expiryDate){
        return paymentFormErrorMessage.value.expiryDate;
    }
    if(expiryDate){
        return expiryDate;
    }
    return paymentFormErrorMessage.value.expiryDate = 'MM / YY';
};

export const cardCvvPlaceholder = (cardCvv: number | undefined) => {
    if (!cardCvv) return;

    if(paymentFormErrorMessage.value.cardCvv){
        return paymentFormErrorMessage.value.cardCvv;
    }
    if(cardCvv){
        return String(cardCvv);
    }
    return paymentFormErrorMessage.value.cardCvv = '•••';
};
