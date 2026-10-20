import { z } from "zod";

export const replaceOrderSchema = z.object({
    cancelChoice: z
        .string()
        .trim()
        .min(1, 'Select a reason for cancellation')
})