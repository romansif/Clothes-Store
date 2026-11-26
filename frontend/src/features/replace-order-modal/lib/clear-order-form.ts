import { cancelChoiceForm, cancelChoiceMessage } from "@/features/order-action/model/order-forms.ts";

export const clearReplaceForm = () => {
  cancelChoiceForm.value.cancelChoice = "";
  cancelChoiceMessage.value.cancelChoice = "";
};
