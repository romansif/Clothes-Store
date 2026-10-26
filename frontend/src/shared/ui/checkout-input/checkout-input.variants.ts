import type { CheckoutInputVariant } from "@/shared/ui/checkout-input";

export const checkoutInputClasses: Record<CheckoutInputVariant, string> = {
    contactInfo: `bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white focus:bg-white
                rounded-xl outline-none px-4 py-3 text-xs w-full font-dm-sans`,
    payment: `border border-gray-300 rounded-xl outline-none px-4 py-4 text-xs transition duration-400
        bg-gray-50 hover:bg-white appearance-none font-dm-sans placeholder:text-gray-600`,
}

export const checkoutInputErrorClass = `placeholder:text-red-500 border-red-500`