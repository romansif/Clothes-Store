import { shippingForm } from "@/features/use-shipping/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-shipping/lib/shipping.errors.ts";

export const shippingClasses = () => {
    const shippingMethodClass = (method: string) => [
        `flex justify-between items-center px-3 py-6 border border-gray-400 rounded-xl
        transition duration-400 bg-gray-50 hover:bg-white`, shippingForm.value.delivery === method ? 'bg-white' : '',
        shippingFormError.value.deliveryError ? 'border-red-500' : ''
    ];

    return {
        shippingMethodClass,
    }
}