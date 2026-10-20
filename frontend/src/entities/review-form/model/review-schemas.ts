import { z } from "zod";

export const reviewFormSchema = z.object({
    rating: z
        .number()
        .min(1, 'Rating is required')
        .max(5, 'Rating cannot be greater than 5'),

    comment: z
        .string()
        .trim()
        .min(1, 'Comment is required'),
})