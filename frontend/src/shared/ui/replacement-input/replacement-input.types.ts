export type ReplacementInputVariant = 'default' | 'checked'

export interface ReplacementInputProps {
    name: string,
    variant?: ReplacementInputVariant;
    value: string
}