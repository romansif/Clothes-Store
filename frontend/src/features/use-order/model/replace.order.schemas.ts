import { z } from "zod";

export const replaceOrderSchema = z.object({
    cancelChoiceError: z
        .string()
        .trim()
        .min(1, 'Select a reason for cancellation')
})