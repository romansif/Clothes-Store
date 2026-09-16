import { watch } from "vue";
import type { Ref } from "vue";
import { type ZodError } from "zod";
import {ApiError} from "@/shared/api/http.ts";

export const applyErrors = (
    err: unknown,
    formErrors: Ref<Record<string, boolean>>,
    formErrorMessages: Ref<Record<string, string>>
) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    Object.keys(formErrors).forEach((field) => {
        const errorEntry = Object.entries(errors).find(
            ([key]) =>
                key === field ||
                key.startsWith(`${field}[`) ||
                key.startsWith(`${field}.`)
        );

        formErrors.value[field] = !!errorEntry;
        formErrorMessages.value[field] = errorEntry?.[1] ?? '';
    });
};

export const applyZodErrors = (
    errors: ZodError,
    formErrors: Ref<Record<string, boolean>>,
    formErrorMessages: Ref<Record<string, string>>
) => {
    errors.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field !== 'string') return;

        formErrors.value[field] = true;
        formErrorMessages.value[field] = issue.message;
    })
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