import type { ReplacementInputVariant } from "@/shared/ui/replacement-input";

export const baseReplacementInputClass = `flex items-center gap-5 w-full p-4 transition duration-400 `
export const replacementInputClasses: Record<ReplacementInputVariant, string> = {
    default: `${baseReplacementInputClass} hover:scale-105`,
    checked: `${baseReplacementInputClass} scale-105`,
};
