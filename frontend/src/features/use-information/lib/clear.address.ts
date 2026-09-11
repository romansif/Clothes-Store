import { informationForm, informationFormErrorMessages } from "@/features/use-information/model/address.form.ts";
import { informationFormErrors } from "@/features/use-information/lib/address.errors.ts";

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

    informationFormErrorMessages.value.emailMessage = '';
    informationFormErrorMessages.value.phoneMessage = '';
    informationFormErrorMessages.value.firstNameMessage = '';
    informationFormErrorMessages.value.lastNameMessage = '';
    informationFormErrorMessages.value.countryMessage = '';
    informationFormErrorMessages.value.stateRegionMessage = '';
    informationFormErrorMessages.value.addressMessage = '';
    informationFormErrorMessages.value.cityMessage = '';
    informationFormErrorMessages.value.postalCodeMessage = '';

    informationFormErrors.value.emailError = false;
    informationFormErrors.value.phoneError = false;
    informationFormErrors.value.firstNameError = false;
    informationFormErrors.value.lastNameError = false;
    informationFormErrors.value.countryError = false;
    informationFormErrors.value.stateRegionError = false;
    informationFormErrors.value.addressError = false;
    informationFormErrors.value.cityError = false;
    informationFormErrors.value.postalCodeError = false;
};
