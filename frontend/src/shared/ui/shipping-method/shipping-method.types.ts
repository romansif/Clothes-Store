export type ShippingMethod = "standard" | "express";
export type ShippingMethodVariant = "default" | "checked" | "error";

export interface ShippingMethodProps {
    method: string;
    title: string;
    text: string;
    price: string;
}

export interface ShippingInputProps {
    variant?: ShippingMethodVariant;
    method: ShippingMethod;
    errorMessage: string;
}
