import {
    informationForm, informationFormErrorMessages, informationFormErrors
} from "@/features/use-checkout-contact-info/model/address.form.ts";

export const clearInformationForm = () => {
    informationForm.value.addressName = '';
    informationForm.value.email = '';
    informationForm.value.phone = '';
    informationForm.value.firstName = '';
    informationForm.value.lastName = '';
    informationForm.value.country = '';
    informationForm.value.stateRegion = '';
    informationForm.value.address = '';
    informationForm.value.city = '';
    informationForm.value.postalCode = '';

    informationFormErrorMessages.value.email = '';
    informationFormErrorMessages.value.phone = '';
    informationFormErrorMessages.value.firstName = '';
    informationFormErrorMessages.value.lastName = '';
    informationFormErrorMessages.value.country = '';
    informationFormErrorMessages.value.stateRegion = '';
    informationFormErrorMessages.value.address = '';
    informationFormErrorMessages.value.city = '';
    informationFormErrorMessages.value.postalCode = '';

    informationFormErrors.value.email = false;
    informationFormErrors.value.phone = false;
    informationFormErrors.value.firstName = false;
    informationFormErrors.value.lastName = false;
    informationFormErrors.value.country = false;
    informationFormErrors.value.stateRegion = false;
    informationFormErrors.value.address = false;
    informationFormErrors.value.city = false;
    informationFormErrors.value.postalCode = false;
};
