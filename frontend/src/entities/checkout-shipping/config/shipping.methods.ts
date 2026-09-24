import type { ShippingValueTypes } from "@/entities/checkout-shipping/model/shipping.value.types.ts";

export const shippingMethods = {
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
    }
} satisfies Record<ShippingValueTypes, {
    method: string,
    title: string,
    text: string,
    price: string
}>