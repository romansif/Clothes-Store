import type { ProductColor } from "@/features/use-product-form/model/product.types.form.ts";

export interface AddForm {
    colors: ProductColor,
    sizes: string,
}

export interface AddFormErrorMessage {
    colorMessage: string,
    sizeMessage: string,
}

export interface AddFormError {
    colorError: boolean,
    sizeError: boolean,
}

export interface IsAgreeFormErrorMessage {
    agreeMessage: string,
}

export interface IsAgreeFormError {
    agreeError: boolean,
    agreeMessageError: boolean,
}