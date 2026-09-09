import { checkoutErrors } from "@/features/use-checkout/lib/checkout.errors.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";

const { shipping } = checkoutForm();
const { shippingErrors } = checkoutErrors();

export const shippingClasses = () => {
    const shippingMethodClass = (method: string) => [
        `flex justify-between items-center px-3 py-6 border border-gray-400 rounded-xl
        transition duration-400 bg-gray-50 hover:bg-white`, shipping.value.delivery === method ? 'bg-white' : '',
        shippingErrors.value.deliveryError ? 'border-red-500' : ''
    ];

    return {
        shippingMethodClass,
    }
}