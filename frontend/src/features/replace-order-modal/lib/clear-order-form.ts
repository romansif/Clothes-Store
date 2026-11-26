import { cancelChoiceForm, cancelChoiceMessage } from "@/features/order-action";

export const clearReplaceForm = () => {
  cancelChoiceForm.value.cancelChoice = "";
  cancelChoiceMessage.value.cancelChoice = "";
};
