import type {
    ShippingMethod,
    ShippingMethodProps,
} from "@/shared/ui/shipping-method/shipping-method.types.ts";

export const shippingMethods: Record<ShippingMethod, ShippingMethodProps> = {
    standard: {
        method: "standard",
        title: "STANDARD SHIPPING",
        text: "Delivery in 3-5 business days",
        price: "Free",
    },
    express: {
        method: "express",
        title: "EXPRESS COURIER",
        text: "Delivery tomorrow morning",
        price: "$15.00",
    },
};
