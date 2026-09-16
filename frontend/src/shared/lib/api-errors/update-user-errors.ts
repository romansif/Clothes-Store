import {ApiError} from "@/shared/api/http.ts";
import {applyErrors} from "@/shared/lib/error-helper/errors-helper.ts";
import {updateUserFormErrors} from "@/features/use-profile-form/model/user.update.error.ts";
import {updateUserFormErrorMessages} from "@/features/use-profile-form/model/user.update.form.ts";
import {
    updateUserEmailSchema,
    updateUserNameSchema, updateUserPasswordSchema,
    updateUserPhoneSchema,
    updateUserSurNameSchema
} from "@/features/use-profile-form/model/user.update.schemas.ts";

export const updateNameApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        updateUserNameSchema,
        errors,
        updateUserFormErrors.value,
        updateUserFormErrorMessages.value
    )
};

export const updateSurNameApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        updateUserSurNameSchema,
        errors,
        updateUserFormErrors.value,
        updateUserFormErrorMessages.value
    )
};

export const updatePhoneApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        updateUserPhoneSchema,
        errors,
        updateUserFormErrors.value,
        updateUserFormErrorMessages.value
    )
};

export const updateEmailApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        updateUserEmailSchema,
        errors,
        updateUserFormErrors.value,
        updateUserFormErrorMessages.value
    )
};

export const updatePasswordApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        updateUserPasswordSchema,
        errors,
        updateUserFormErrors.value,
        updateUserFormErrorMessages.value
    )
};