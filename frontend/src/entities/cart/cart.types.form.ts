import type { ProductColor } from "@/entities/product/product.types.form";

export interface AddForm {
    colors: ProductColor,
    sizes: string,
}

export interface AddFormMessage {
    colorMessage: string,
    sizeMessage: string,
}

export interface AddFormError {
    colorError: boolean,
    sizeError: boolean,
}
