import type { z, ZodError } from "zod";
import type {addToCartSchema} from "@/features/use-product/model/add.to.cart.schemas.ts";
import {addToCartFormErrors} from "@/features/use-product/model/add.to.cart.errors.ts";
import {addToCartFormErrorMessages} from "@/features/use-product/model/add.to.cart.form.ts";

type AddToCartData = z.infer<typeof addToCartSchema>;

export const addToCartValidationErrors = (err: ZodError<AddToCartData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof addToCartFormErrors.value;

        addToCartFormErrors.value[field] = true;
        addToCartFormErrorMessages.value[field] = issue.message;

    })
}