export type AuthFormVariant = "login" | "register";

export interface AuthFormProps {
    role: string;
    variant?: AuthFormVariant;
    errorMessage: string;
}
