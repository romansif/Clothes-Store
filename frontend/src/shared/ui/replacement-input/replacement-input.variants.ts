import type { ReplacementInputVariant } from "@/shared/ui/replacement-input";

export const BASE_REPLACEMENT_INPUT_CLASS = `flex items-center gap-5 w-full p-4 transition duration-400`;

export const REPLACEMENT_INPUT_CLASSES: Record<ReplacementInputVariant, string> = {
  default: `hover:scale-105`,
  checked: `scale-105`,
};
