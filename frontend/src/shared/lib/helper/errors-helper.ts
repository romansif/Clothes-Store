import { watch } from "vue";
import type { Ref } from "vue";
import { type ZodError } from "zod";
import {ApiError} from "@/shared/api/http.ts";

export const applyErrors = (
    err: any,

    formErrorMessages: Ref<Record<string, string>>
) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    Object.keys(formErrorMessages.value).forEach((field) => {
        const errorEntry = Object.entries(errors).find(
            ([key]) =>
                key === field ||
                key.startsWith(`${field}[`) ||
                key.startsWith(`${field}.`)
        );


        formErrorMessages.value[field] = errorEntry?.[1] || '';
    });
};

export const applyZodErrors = (
    errors: ZodError,
    formErrorMessages: Ref<Record<string, string>>
) => {
    errors.issues.forEach((issue) => {
        const field = issue.path[0];

        if (typeof field !== 'string') return;

        formErrorMessages.value[field] = issue.message;
    })
};

export const refClearErrorsOnChange = <T extends Record<string, any>>(
    form: Ref<T>,

    formErrorMessages: Ref<Partial<Record<keyof T, string>>>
) => {
    (Object.keys(form.value) as Array<keyof T>).forEach((field) => {
        watch(
            () => form.value[field],
            () => {
                formErrorMessages.value[field] = '';
            }
        );
    });
};

export const reactiveClearErrorsOnChange = (
    form: Record<string, any>,
    formErrorMessages: Ref<Partial<Record<string, string | undefined>>>
) => {
    Object.keys(form).forEach((field) => {
        if(!(field in formErrorMessages.value)) return;

        watch(
            () => form[field as keyof typeof form],
            () => {
                formErrorMessages.value[field] = '';
            }, { deep: true }
        );
    });
};