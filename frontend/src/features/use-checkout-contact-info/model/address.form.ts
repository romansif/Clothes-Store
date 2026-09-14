import {ref} from "vue";
import type {
    InformationForm,
    InformationFormErrorMessage
} from "@/features/use-checkout-contact-info/model/address.types.form.ts";

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
    email: 'example@gmail.com',
    phone: '+000 (00) 000-00-00',
    firstName: 'FirstName',
    lastName: 'LastName',
    country: 'Country',
    stateRegion: 'State/Region',
    address: 'Address',
    city: 'City',
    postalCode: 'Postal Code',
})

