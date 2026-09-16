import { ApiError } from "../../api/http.ts";
import { applyErrors } from "@/shared/lib/error-helper/errors-helper.ts";
import { cancelChoiceError, cancelChoiceMessage } from "@/features/use-order/model/order.store.ts";
import { replaceOrderSchema } from "@/features/use-order/model/replace.order.schemas.ts";

export const replaceOrderApiErrors = (err: any) => {
    if(!(err instanceof ApiError)) return

    const errors = err.response?.errors
    if (!errors) return

    applyErrors(
        replaceOrderSchema,
        errors,
        cancelChoiceError.value,
        cancelChoiceMessage.value
    )
};
