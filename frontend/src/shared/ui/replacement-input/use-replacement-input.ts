import { computed } from "vue";
import type { ReplacementInputProps } from "@/shared/ui/replacement-input";

export const useReplacementInput = (model: string, props: ReplacementInputProps) => {
    const isChecked = computed(() => model === props.value);

    return {
        isChecked,
    }
}
