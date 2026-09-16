import { z } from "zod";
import { watch } from "vue";
import type { Ref } from "vue";

export const applyErrors = <T extends z.ZodRawShape>(
    schema: z.ZodObject<T>,
    errors: Record<string, string>,
    formErrors: Record<string, boolean>,
    formErrorMessages: Record<string, string>
) => {
    schema.keyof().options.forEach((field) => {
        const errorEntry = Object.entries(errors).find(
            ([key]) =>
                key === field ||
                key.startsWith(`${field}[`) ||
                key.startsWith(`${field}.`)
        );

        formErrors[field] = !!errorEntry;
        formErrorMessages[field] = errorEntry?.[1] ?? '';
    });
};

export const refClearErrorsOnChange = <T extends Record<string, any>>(
    form: Ref<T>,
    formErrors: Ref<Partial<Record<keyof T, boolean>>>,
    formErrorMessages: Ref<Partial<Record<keyof T, string>>>
) => {
    (Object.keys(form.value) as Array<keyof T>).forEach((field) => {
        watch(
            () => form.value[field],
            () => {
                formErrors.value[field] = false;
                formErrorMessages.value[field] = '';
            }
        );
    });
};

export const reactiveClearErrorsOnChange = (
    form: Record<string, any>,
    formErrors: Ref<Partial<Record<string, boolean | undefined>>>,
    formErrorMessages: Ref<Partial<Record<string, string | undefined>>>
) => {
    Object.keys(form).forEach((field) => {
        if(!(field in formErrors.value)) return;

        watch(
            () => form[field as keyof typeof form],
            () => {
                formErrors.value[field] = false;
                formErrorMessages.value[field] = '';
            }, { deep: true }
        );
    });
};