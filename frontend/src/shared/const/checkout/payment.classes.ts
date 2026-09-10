import { computed } from "vue";
import { checkoutErrors } from "@/features/use-checkout/lib/checkout.errors.ts";
import { useCheckout } from "@/features/use-checkout/lib/use-checkout.ts";
import { checkoutClasses } from "@/shared/const/checkout/checkout.classes.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";

const { payment } = checkoutForm()
const { isChosenPayment } = useCheckout();
const { paymentErrors } = checkoutErrors();
const { getSavedInfoClass } = checkoutClasses();

export const paymentClasses = () => {
    const carNameClass = () => [
        `border border-gray-300 rounded-xl outline-none px-4 py-4 text-xs transition duration-400 
        bg-gray-50 hover:bg-white appearance-none`
    ];

    const paymentMethodClass = (method: string) => [
        `flex justify-between items-center px-3 border border-gray-400 rounded-xl h-[80px] 
        transition duration-400 bg-gray-50 hover:bg-white`,
        payment.value.paymentMethod === method ? 'bg-white' : '',
        paymentErrors.value.paymentMethodError ? 'border-red-500' : ''
    ];

    const cardNumberClass = computed(() => [
        `border border-gray-300 rounded-xl outline-none px-4 py-4 text-xs transition duration-400
        font-dm-sans bg-gray-50 hover:bg-white appearance-none placeholder:text-sm`,
        paymentErrors.value.cardNumberError ? 'placeholder:text-red-500 border-red-500 placeholder:text-xs' : 'placeholder:text-gray-600'
    ]);

    const expiryDateClass = computed(() => [
        `border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
        font-dm-sans outline-none px-4 py-4 text-xs transition duration-400 bg-gray-50 hover:bg-white`,
        paymentErrors.value.expiryDateError ? 'placeholder:text-red-500 border-red-500 placeholder:text-xs' : 'placeholder:text-gray-600'
    ]);

    const cardCvvClass = computed(() => [
        `border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
        font-dm-sans outline-none px-4 py-4 text-xs transition duration-400 bg-gray-50 hover:bg-white placeholder:text-lg`,
        paymentErrors.value.cardCvvError ? 'placeholder:text-red-500 border-red-500 placeholder:text-xs' : 'placeholder:text-gray-600'
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