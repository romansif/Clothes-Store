import { z } from "zod";

export const addToCartSchema = z.object({
    colors: z
        .array(
            z.object({
                hex: z
                    .string()
                    .trim()
                    .min(1, 'Color is required'),

                colorName: z
                    .string()
                    .trim()
                    .min(1, 'Color is required'),
            })
        )
        .min(1, 'Color is required'),
})