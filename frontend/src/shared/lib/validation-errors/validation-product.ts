import type { z, ZodError } from "zod";
import {createProductFormErrors} from "@/features/use-product-form/model/product.error.ts";
import {createProductFormErrorMessages} from "@/features/use-product-form/model/product.forms.ts";
import {type createProductSchema, moreCreateItemsSchema} from "@/features/use-product-form/model/product.schemas.ts";

type CreateProductData = z.infer<typeof createProductSchema>;
type MoreCreateItemsData = z.infer<typeof moreCreateItemsSchema>;

export const createProductValidationErrors = (err: ZodError<CreateProductData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof createProductFormErrors.value;

        createProductFormErrors.value[field] = true;
        createProductFormErrorMessages.value[field] = issue.message;
    })
}

export const moreCreateItemsValidationErrors = (err: ZodError<MoreCreateItemsData>) => {
    err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof createProductFormErrors.value;

        createProductFormErrors.value[field] = true;
        createProductFormErrorMessages.value[field] = issue.message;
    })

}