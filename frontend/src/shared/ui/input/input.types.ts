export type InputVariant = "auth" | "createProduct" | "confidentialityData";

export interface InputProps {
    variant?: InputVariant;
    maxLength?: number;
    errorMessage: string;
}
