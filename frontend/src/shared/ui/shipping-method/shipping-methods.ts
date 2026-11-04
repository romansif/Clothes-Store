import type { ShippingMethod, ShippingMethodProps } from "@/shared/ui/shipping-method/shipping-method.types.ts";

export const shippingMethods: Record<ShippingMethod, ShippingMethodProps> = {
  standard: {
    method: "standard",
    title: "shippingMethod.standard.title",
    text: "shippingMethod.standard.description",
    price: "shippingMethod.free",
  },
  express: {
    method: "express",
    title: "shippingMethod.express.title",
    text: "shippingMethod.express.description",
    price: "shippingMethod.price",
  },
};
