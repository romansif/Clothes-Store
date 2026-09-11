import {ref} from "vue";
import type {
    InformationForm,
    InformationFormErrorMessage
} from "@/features/use-information/model/address.types.form.ts";

export const informationForm = ref<InformationForm>({
    addressName: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    stateRegion: '',
    address: '',
    city: '',
    postalCode: '',
})

export const informationFormErrorMessages = ref<InformationFormErrorMessage>({
    emailMessage: 'example@gmail.com',
    phoneMessage: '+000 (00) 000-00-00',
    firstNameMessage: 'FirstName',
    lastNameMessage: 'LastName',
    countryMessage: 'Country',
    stateRegionMessage: 'State/Region',
    addressMessage: 'Address',
    cityMessage: 'City',
    postalCodeMessage: 'Postal Code',
})

