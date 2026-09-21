import {
    cancelChoiceForm,
    cancelChoiceMessage,
} from "@/entities/order/model/order.forms.ts";

export const clearReplaceForm = () => {
    cancelChoiceForm.value.cancelChoice = '';
    cancelChoiceMessage.value.cancelChoice = '';
}