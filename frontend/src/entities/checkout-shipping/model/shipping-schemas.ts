import { z } from "zod";

export const addShippingSchema = z.object({
    delivery: z
        .string()
        .trim()
        .min(1, 'Shipping Method Code required to order')
})