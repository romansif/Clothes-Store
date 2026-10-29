import { ref } from "vue";
import type { CancelChoiceForm, CancelChoiceFormMessage } from "@/entities/order";

export const cancelChoiceForm = ref<CancelChoiceForm>({
    cancelChoice: "",
});

export const cancelChoiceMessage = ref<CancelChoiceFormMessage>({
    cancelChoice: "",
});
