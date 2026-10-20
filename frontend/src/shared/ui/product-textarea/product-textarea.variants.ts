import type { ProductTextareaVariant } from "@/shared/ui/product-textarea/product-textarea.types.ts";

export const textareaClass: Record<ProductTextareaVariant, string> = {
    default: 'h-25 border border-gray-200 rounded-sm outline-none px-6 py-5 text-sm bg-white',
    error: 'border-red-500'
}