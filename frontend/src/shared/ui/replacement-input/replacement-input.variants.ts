import type {ReplacementInputVariant} from "@/shared/ui/replacement-input/replacement-input.types.ts";

export const replacementInputClasses: Record<ReplacementInputVariant, string> = {
    default: 'flex items-center gap-5 w-full p-4 transition duration-400 hover:scale-105',
    checked: 'scale-103'
}
