export type AuthFormVariant = 'default' | 'error'

export interface AuthFormProps {
    role: string
    variant?: AuthFormVariant
    errorMessage: string
}