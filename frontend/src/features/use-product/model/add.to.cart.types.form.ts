import type { ProductColor } from "@/features/use-product-form/model/product.types.form.ts";

export interface AddForm {
    colors: ProductColor,
    sizes: string,
}

export interface AddFormErrorMessage {
    color: string,
    size: string,
}

export interface AddFormError {
    color: boolean,
    size: boolean,
}

export interface IsAgreeFormErrorMessage {
    agree: string,
}

export interface IsAgreeFormError {
    agree: boolean,
    agreeMessage: boolean,
}