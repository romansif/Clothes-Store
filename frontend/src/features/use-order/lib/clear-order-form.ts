import {
    cancelChoiceForm,
    cancelChoiceMessage,
} from "@/features/use-order/model/order.forms.ts";

export const clearReplaceForm = () => {
    cancelChoiceForm.value.cancelChoice = '';
    cancelChoiceMessage.value.cancelChoice = '';
}