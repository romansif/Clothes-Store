export { default as AddressForm } from "./ui/AddressForm.vue";
export { default as ContactForm } from "./ui/ContactForm.vue";

export type * from "./model/information-form.types";

export { informationForm, informationFormErrorMessages } from "./model/information-form";
export {
  POSTAL_CODE_CLASS,
  INFORMATION_SELECT_PHONE_CLASS,
  INFORMATION_PHONE_CLASS,
} from "./model/information-form.variants";
export { postalCode } from "./model/information-mask";
export { addContactInfoSchema } from "./model/information-schemas";
