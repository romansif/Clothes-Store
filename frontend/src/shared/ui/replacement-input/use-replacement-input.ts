import { computed, type Ref } from "vue";

import type { ReplacementInputProps } from "@/shared/ui/replacement-input";

export const useReplacementInput = (
    model: Ref<string | number | undefined>,
    props: ReplacementInputProps,
) => {
    const isChecked = computed(() => model.value === props.value);

    return {
        isChecked,
    };
};
