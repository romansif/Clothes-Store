import {ref} from "vue";
import type {InformationFormError} from "@/features/use-information/model/address.types.form.ts";

export const informationFormErrors = ref<InformationFormError>({
    emailError: false,
    phoneError: false,
    firstNameError: false,
    lastNameError: false,
    countryError: false,
    stateRegionError: false,
    addressError: false,
    cityError: false,
    postalCodeError: false,

})
