import type { ShippingMethod, ShippingMethodProps } from "@/shared/ui/shipping-method/shipping-method.types.ts";

export const shippingMethods: Record<ShippingMethod, ShippingMethodProps> = {
  standard: {
    method: "standard",
    title: "shippingMethods.standard.title",
    text: "shippingMethods.standard.description",
    price: "shippingMethods.free",
  },
  express: {
    method: "express",
    title: "shippingMethods.express.title",
    text: "shippingMethods.express.description",
    price: "shippingMethods.free",
  },
};
