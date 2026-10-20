import { ref } from "vue";
import type {
    InformationForm,
    InformationFormErrorMessage
} from "@/entities/checkout-contact-info/model/information-form.types.ts";

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
});

export const informationFormErrorMessages = ref<InformationFormErrorMessage>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    stateRegion: '',
    address: '',
    city: '',
    postalCode: '',
});


