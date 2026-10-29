import type { ShippingMethodVariant } from "@/shared/ui/shipping-method";

export const shippingMethod: Record<ShippingMethodVariant, string> = {
    default: `flex justify-between items-center px-3 py-6 border border-gray-400 rounded-xl
        transition duration-400 bg-gray-50 hover:bg-white font-dm-sans`,
    checked: `bg-white`,
    error: `bg-white`,
};
