import type { ProductColor } from "@/entities/products/product.types.ts";

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
