import { ref } from "vue";
import type { InformationForm, InformationFormErrorMessage } from "@/entities/checkout-info-form";

export const informationForm = ref<InformationForm>({
    addressName: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    stateRegion: "",
    address: "",
    city: "",
    postalCode: "",
});

export const informationFormErrorMessages = ref<InformationFormErrorMessage>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    country: "",
    stateRegion: "",
    address: "",
    city: "",
    postalCode: "",
});
