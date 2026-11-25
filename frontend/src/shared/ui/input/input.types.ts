export type InputVariant = "auth" | "createProduct" | "confidentialityData" | "editAddress" | "editCard";

export interface InputProps {
  variant?: InputVariant;
  maxLength?: number;
  errorMessage?: string;
}
