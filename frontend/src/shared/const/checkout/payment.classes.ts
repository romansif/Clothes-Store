import { computed } from "vue";
import { checkoutClasses } from "@/shared/const/checkout/checkout.classes.ts";
import { togglePaymentForm } from "@/features/use-chekout-payment-info/lib/toggle.payment.ts";
import { paymentForm } from "@/features/use-chekout-payment-info/model/payment.form.ts";
import { paymentFormErrors } from "@/features/use-chekout-payment-info/lib/payment.errors.ts";

const { isChosenPayment } = togglePaymentForm();
const { getSavedInfoClass } = checkoutClasses();

export const paymentClasses = () => {
    const carNameClass = () => [
        `border border-gray-300 rounded-xl outline-none px-4 py-4 text-xs transition duration-400 
        bg-gray-50 hover:bg-white appearance-none`
    ];

    const paymentMethodClass = (method: string) => [
        `flex justify-between items-center px-3 border border-gray-400 rounded-xl h-[80px] 
        transition duration-400 bg-gray-50 hover:bg-white`,
        paymentForm.value.paymentMethod === method ? 'bg-white' : '',
        paymentFormErrors.value.paymentMethodError ? 'border-red-500' : ''
    ];

    const cardNumberClass = computed(() => [
        `border border-gray-300 rounded-xl outline-none px-4 py-4 text-xs transition duration-400
        font-dm-sans bg-gray-50 hover:bg-white appearance-none placeholder:text-sm`,
        paymentFormErrors.value.cardNumberError ? 'placeholder:text-red-500 border-red-500 placeholder:text-xs' : 'placeholder:text-gray-600'
    ]);

    const expiryDateClass = computed(() => [
        `border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
        font-dm-sans outline-none px-4 py-4 text-xs transition duration-400 bg-gray-50 hover:bg-white`,
        paymentFormErrors.value.expiryDateError ? 'placeholder:text-red-500 border-red-500 placeholder:text-xs' : 'placeholder:text-gray-600'
    ]);

    const cardCvvClass = computed(() => [
        `border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
        font-dm-sans outline-none px-4 py-4 text-xs transition duration-400 bg-gray-50 hover:bg-white placeholder:text-lg`,
        paymentFormErrors.value.cardCvvError ? 'placeholder:text-red-500 border-red-500 placeholder:text-xs' : 'placeholder:text-gray-600'
    ]);

    const savedPaymentClass = computed(() => getSavedInfoClass(isChosenPayment.value));

    return {
        cardNumberClass,
        expiryDateClass,
        cardCvvClass,

        savedPaymentClass,

        carNameClass,
        paymentMethodClass,
    }
}