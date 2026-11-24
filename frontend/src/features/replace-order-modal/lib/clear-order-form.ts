import { cancelChoiceForm, cancelChoiceMessage } from "@/entities/replacement-form/model/order-forms.ts";

export const clearReplaceForm = () => {
  cancelChoiceForm.value.cancelChoice = "";
  cancelChoiceMessage.value.cancelChoice = "";
};
