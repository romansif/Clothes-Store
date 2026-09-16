import { ApiError } from "@/shared/api/http.ts";
import { applyErrors } from "@/shared/lib/error-helper/errors-helper.ts";
import { loginFormErrors, registerFormErrors } from "@/features/use-auth/model/auth.errors.ts";
import { loginFormErrorMessages, registerFormErrorMessages } from "@/features/use-auth/model/auth.forms.ts";
import { loginSchema, registerSchema } from "@/features/use-auth/model/auth.schemas.ts";

export const registerApiErrors = (err: unknown) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        registerSchema,
        errors,
        registerFormErrors.value,
        registerFormErrorMessages.value
    )
};

export const loginApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        loginSchema,
        errors,
        loginFormErrors.value,
        loginFormErrorMessages.value
    )
};