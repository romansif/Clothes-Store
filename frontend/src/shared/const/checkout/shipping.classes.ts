import { shippingForm, shippingFormErrorMessage } from "@/features/use-checkout-shipping-info/model/shipping.form.ts";

export const shippingClasses = () => {
    const shippingMethodClass = (method: string) => [
        `flex justify-between items-center px-3 py-6 border border-gray-400 rounded-xl
        transition duration-400 bg-gray-50 hover:bg-white font-dm-sans`, shippingForm.value.delivery === method ? 'bg-white' : '',
        shippingFormErrorMessage.value.delivery ? 'border-red-500' : ''
    ];

    return {
        shippingMethodClass,
    }
}