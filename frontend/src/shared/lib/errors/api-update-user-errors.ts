import {ApiError} from "@/shared/api/http.ts";
import {updateUserFormErrors} from "@/features/use-profile-form/model/user.update.error.ts";
import {updateUserFormMessage} from "@/features/use-profile-form/model/user.update.form.ts";

export const updateNameErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    updateUserFormErrors.value.name = !!errors.name;
    updateUserFormMessage.value.name = errors.name || '';
};

export const updateSurNameErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    updateUserFormErrors.value.surName = !!errors.surName;
    updateUserFormMessage.value.surName = errors.surName || '';
};

export const updatePhoneErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    updateUserFormErrors.value.phone = !!errors.phone;
    updateUserFormMessage.value.phone = errors.phone || '';
};

export const updateEmailErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    updateUserFormErrors.value.email = !!errors.email;
    updateUserFormMessage.value.email = errors.email || '';
};

export const updatePasswordErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    updateUserFormErrors.value.oldPassword = !!errors.oldPassword;
    updateUserFormErrors.value.newPassword = !!errors.newPassword;

    updateUserFormMessage.value.oldPassword = errors.oldPassword || '';
    updateUserFormMessage.value.newPassword = errors.newPassword || '';
};