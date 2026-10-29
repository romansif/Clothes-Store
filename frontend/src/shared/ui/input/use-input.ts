import { computed, type Ref } from "vue";

export const useInput = (model: Ref<string | number | undefined>) => {
    const currentLength = computed(() => String(model.value ?? "").length);

    return {
        currentLength,
    };
};
