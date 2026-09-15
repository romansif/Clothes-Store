import { z } from "zod";

export const applyErrors = <T extends z.ZodRawShape>(
    schema: z.ZodObject<T>,
    errors: Record<string, string>,
    formErrors: Record<string, boolean>,
    formErrorMessages: Record<string, string>
) => {
    schema.keyof().options.forEach((field) => {
        formErrors[field] = !!errors[field];
        formErrorMessages[field] = errors[field] ?? '';
    });
};