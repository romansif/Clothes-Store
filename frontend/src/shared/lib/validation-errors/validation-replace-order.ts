import type { z, ZodError } from "zod";
import type {replaceOrderSchema} from "@/features/use-order/model/replace.order.schemas.ts";
import { cancelChoiceError, cancelChoiceMessage } from "@/features/use-order/model/order.store.ts";

type ReplaceOrderData = z.infer<typeof replaceOrderSchema>;

export const replaceOrderValidationErrors = (err: ZodError<ReplaceOrderData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof cancelChoiceError.value;

        cancelChoiceError.value[field] = true;
        cancelChoiceMessage.value[field] = issue.message;
    })
};