import {ref} from "vue";
import type {InformationFormError} from "@/features/use-checkout-contact-info/model/address.types.form.ts";

export const informationFormErrors = ref<InformationFormError>({
    email: false,
    phone: false,
    firstName: false,
    lastName: false,
    country: false,
    stateRegion: false,
    address: false,
    city: false,
    postalCode: false,
})
