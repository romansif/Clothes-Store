import type { z, ZodError } from "zod";
import {
    updateUserEmailSchema, updateUserNameSchema, updateUserPasswordSchema,
    updateUserPhoneSchema, updateUserSurNameSchema
} from "@/features/use-profile-form/model/user.update.schemas.ts";
import {updateUserFormErrors} from "@/features/use-profile-form/model/user.update.error.ts";
import {updateUserFormErrorMessages} from "@/features/use-profile-form/model/user.update.form.ts";

type UpdateUserNameData = z.infer<typeof updateUserNameSchema>;
type UpdateUserSurNameData = z.infer<typeof updateUserSurNameSchema>;
type UpdateUserPhoneData = z.infer<typeof updateUserPhoneSchema>;
type UpdateUserEmailData = z.infer<typeof updateUserEmailSchema>;
type UpdateUserPasswordData = z.infer<typeof updateUserPasswordSchema>;

export const updateUserNameValidationErrors = (err: ZodError<UpdateUserNameData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof updateUserFormErrors.value;

        updateUserFormErrors.value[field] = true;
        updateUserFormErrorMessages.value[field] = issue.message;
    })
}

export const updateUserSurNameValidationErrors = (err: ZodError<UpdateUserSurNameData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof updateUserFormErrors.value;

        updateUserFormErrors.value[field] = true;
        updateUserFormErrorMessages.value[field] = issue.message;
    })
}

export const updateUserPhoneValidationErrors = (err: ZodError<UpdateUserPhoneData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof updateUserFormErrors.value;

        updateUserFormErrors.value[field] = true;
        updateUserFormErrorMessages.value[field] = issue.message;
    })
};

export const updateUserEmailValidationErrors = (err: ZodError<UpdateUserEmailData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof updateUserFormErrors.value;

        updateUserFormErrors.value[field] = true;
        updateUserFormErrorMessages.value[field] = issue.message;
    })
};

export const updateUserPasswordValidationErrors = (err: ZodError<UpdateUserPasswordData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof updateUserFormErrors.value;

        updateUserFormErrors.value[field] = true;
        updateUserFormErrorMessages.value[field] = issue.message;

        updateUserFormErrors.value[field] = true;
        updateUserFormErrorMessages.value[field] = issue.message;
    })
};