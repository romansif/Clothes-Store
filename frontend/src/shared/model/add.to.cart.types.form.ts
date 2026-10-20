import type { ProductColor } from "@/entities/product-form/model/product-form.types.ts";

export interface AddForm {
    colors: ProductColor,
    sizes: string,
}

export interface AddFormErrorMessage {
    colors: string,
    sizes: string,
}

export interface IsAgreeFormErrorMessage {
    agree: string,
}

export interface IsAgreeFormError {
    agree: boolean,
    agreeMessage: boolean,
}