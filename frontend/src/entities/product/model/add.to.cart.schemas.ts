import { z } from "zod";

export const addToCartSchema = z.object({
    colors: z.object({
        hex: z
            .string()
            .trim()
            .min(1, 'Color is required'),

        colorName: z
            .string()
            .trim()
            .min(1, 'Color is required'),
    }),

    sizes: z
        .string()
        .trim()
        .min(1, 'Size is required')
})