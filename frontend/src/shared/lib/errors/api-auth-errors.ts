import {ApiError} from "@/shared/api/http.ts";
import {loginFormErrors, registerFormErrors} from "@/features/use-auth/model/auth.errors.ts";
import {loginFormErrorMessages, registerFormErrorMessages} from "@/features/use-auth/model/auth.forms.ts";

export const registerErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    registerFormErrors.value.name = !!errors.name;
    registerFormErrors.value.surName = !!errors.surName;
    registerFormErrors.value.phone = !!errors.phone;
    registerFormErrors.value.email = !!errors.email;
    registerFormErrors.value.password = !!errors.password;

    registerFormErrorMessages.value.name = errors.name || '';
    registerFormErrorMessages.value.surName = errors.surName || '';
    registerFormErrorMessages.value.phone = errors.phone || '';
    registerFormErrorMessages.value.email = errors.email || '';
    registerFormErrorMessages.value.password = errors.password || '';
};

export const loginErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    loginFormErrors.value.email = !!errors.email;
    loginFormErrors.value.password = !!errors.password;
    loginFormErrors.value.role = !!errors.role;

    loginFormErrorMessages.value.email = errors.email || '';
    loginFormErrorMessages.value.password = errors.password || '';
    loginFormErrorMessages.value.role = errors.role || '';
};