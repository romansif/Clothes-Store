export type ProductTextareaVariant = 'default' | 'error'

export interface ProductTextareaProps {
    variant?: ProductTextareaVariant
    placeholder: string;
    errorMessage: string;
}