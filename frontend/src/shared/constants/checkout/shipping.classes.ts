import { checkoutErrors } from "@/feature/use-checkout/lib/checkout.errors.ts";
import { checkoutForm } from "@/feature/use-checkout/model/checkout.form.ts";

const { shipping } = checkoutForm();
const { shippingErrors } = checkoutErrors();

export const shippingClasses = () => {
    const shippingMethodClass = (method: string) => [
        `flex justify-between items-center px-3 py-6 border border-gray-300 rounded-xl
        transition duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50`, shipping.value.delivery === method ? 'bg-gray-50' : '',
        shippingErrors.value.deliveryError ? 'border-red-400' : ''
    ];

    return {
        shippingMethodClass,
    }
}