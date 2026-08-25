import { computed } from "vue";
import { checkoutErrors } from "@/feature/use-checkout/lib/checkout.errors.ts";
import { useCheckout } from "@/feature/use-checkout/model/use-checkout.ts";
import { checkoutClasses } from "@/shared/constants/checkout/checkout.classes.ts";
import { checkoutForm } from "@/feature/use-checkout/model/checkout.form.ts";

const { payment } = checkoutForm()
const { isChosenPayment } = useCheckout();
const { paymentErrors } = checkoutErrors();
const { getSavedInfoClass } = checkoutClasses();

export const paymentClasses = () => {
    const carNameClass = () => [
        `border border-gray-300 rounded-xl outline-none
            px-4 py-3 text-xs transition duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50 appearance-none`
    ];

    const paymentMethodClass = (method: string) => [
        `flex justify-between items-center px-3 border border-gray-300 rounded-xl h-[80px] 
        transition duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50`,
        payment.value.paymentMethod === method ? 'bg-gray-50' : '',
        paymentErrors.value.paymentMethodError ? 'border-red-400' : ''
    ];

    const cardNumberClass = computed(() => [
        `border border-gray-300 rounded-xl outline-none px-4 py-3 text-xs transition duration-400
            bg-[#D9D9D9]/40 hover:bg-gray-50 appearance-none placeholder:text-sm`,
        paymentErrors.value.cardNumberError ? 'placeholder:text-red-500 border-red-400 placeholder:text-xs' : 'placeholder:text-gray-600'
    ]);

    const expiryDateClass = computed(() => [
        `border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
            outline-none px-4 py-3 text-xs transition duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50`,
        paymentErrors.value.expiryDateError ? 'placeholder:text-red-500 border-red-400 placeholder:text-xs' : 'placeholder:text-gray-600'
    ]);

    const cardCvvClass = computed(() => [
        `border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
            outline-none px-4 py-3 text-xs transition duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50 placeholder:text-lg`,
        paymentErrors.value.cardCvvError ? 'placeholder:text-red-500 border-red-400 placeholder:text-xs' : 'placeholder:text-gray-600'
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