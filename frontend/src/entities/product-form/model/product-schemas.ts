import { z } from "zod";

export const createProductSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, 'Title is required'),

    collections: z.object({
        name: z
            .string()
            .trim()
            .min(1, 'Collection name is required'),

        season: z
            .string()
            .trim()
            .min(1, 'Season is required'),

        condition: z
            .string()
            .trim()
            .min(1, 'Condition is required')
    }),

    category: z
        .string()
        .trim()
        .min(1, 'Category is required'),

    material: z
        .string()
        .trim()
        .min(1, 'Material is required'),

    gender: z
        .string()
        .trim()
        .min(1, 'Gender is required'),

    sku: z
        .string()
        .trim()
        .min(1, 'SKU is required'),

    price: z
        .number()
        .min(1, 'Price is required'),

    description: z
        .string()
        .trim()
        .min(1, 'Description is required'),
})

export const moreCreateItemsSchema = z.object({
    colors: z
        .array(
            z.object({
                hex: z
                    .string()
                    .trim()
                    .min(1, 'Color hex is required'),

                colorName: z
                    .string()
                    .trim()
                    .min(1, 'Color name is required'),
            })
        )
        .min(1, 'Colors are required'),

    sizes: z
        .array(
            z
                .string()
                .trim()
                .min(1, 'Size is required'),

        )
        .min(1, 'Sizes are required'),

    variants: z
        .array(
            z.object({
                hex: z
                    .string()
                    .trim()
                    .min(1, 'Variant hex is required'),

                colorName: z
                    .string()
                    .trim()
                    .min(1, 'Variant color name is required'),

                size: z
                    .string()
                    .trim()
                    .min(1, 'Variant size is required'),

                count: z
                    .number({
                        message: 'Count must be a number',
                    })
                    .min(0, 'Count must be a positive number'),
            })
        )
        .min(1, 'Variants are required'),
})