import { ApiError } from "../../api/http.ts";

import { cancelChoiceError, cancelChoiceMessage } from "@/shared/lib/base-modal.ts";

export const replaceOrderErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    cancelChoiceError.value = !!errors.cause_replace;

    cancelChoiceMessage.value = errors.cause_replace || '';
};
